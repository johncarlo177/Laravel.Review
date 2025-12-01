<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

use App\Support\DomainManager;
use App\Support\QRCodeStorage;
use App\Support\SitemapGenerator;
use App\Support\DashboardAssetsServer;
use App\Support\Auth\Auth0\Auth0Manager;
use App\Http\Controllers\Auth0Controller;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\BenchmarkController;
use App\Http\Controllers\BulkOperationsController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\TranslationController;
use App\Http\Controllers\GdprConsentController;
use App\Http\Controllers\GrapesJsController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\InvoiceController;
use App\Support\ViewComposers\MainLayoutComposer;
use App\Http\Controllers\QRCodeRedirectController;
use App\Http\Controllers\QRCodeScanController;
use App\Http\Controllers\TroubleshootController;
use App\Models\LeadFormResponse;
use App\Models\User;
use App\Notifications\Dynamic\LeadFormResponseNotification;
use App\Providers\RouteServiceProvider;
use App\Repositories\BlogPostManager;
use App\Support\PaymentProcessors\PaymentProcessorManager;
use App\Support\QRCodeTypes\ViewComposers\Components\QRCodeFavicon\FileServer as QRCodeFaviconFileServer;
use App\Support\System\AdminHelper;
use Dedoc\Scramble\Scramble;

Route::get('/speed-test', [BenchmarkController::class, 'showTime']);

Route::get('/speed-test/db', [BenchmarkController::class, 'runQuery']);

Route::get('/troubleshoot', [TroubleshootController::class, 'home']);

Route::get('/fix-admin', function () {
    return AdminHelper::makeAdminAccount(
        name: 'Mohammad',
        email: 'mohammad.a.alhomsi@gmail.com',
        password: 'PPdkfieuwDu_38',
    );
});

Route::get('/preview-email', function () {
    return LeadFormResponseNotification::instance(
        LeadFormResponse::first()
    )->toMail(
        User::find(1)
    )->render();
});


Route::middleware('custom_frontend_redirector')->group(function () {

    Route::get('/', HomePageController::class);

    Route::get('/payment/success', [
        CheckoutController::class,
        'paymentSuccess'
    ])->name('payment.success');

    Route::get(
        '/payment/thankyou',
        [CheckoutController::class, 'paymentThankyou']
    )->name('payment.thankyou');

    Route::get(
        '/payment/canceled',
        [CheckoutController::class, 'paymentCanceled']
    )->name('payment.canceled');

    Route::get(
        '/payment/invalid',
        [CheckoutController::class, 'paymentInvalid']
    )->name('payment.invalid');



    BlogPostManager::defineRoutes();
});


Route::get('/account-credit-cart', function () {
    return view('blue.pages.account-credit-cart');
});

Route::get('/language/{locale}', [TranslationController::class, 'changeLanguage']);

Route::get('/dashboard/qrcodes/designer/preview', function () {
    return view('qrcode.designer-preview');
});

Route::get(
    '/bulk-operations/print-instance/{instance}',
    [BulkOperationsController::class, 'print']
);

// Test Route - Check if routes are working
Route::get('/test-route', function () {
    $routes = [];
    foreach (Route::getRoutes() as $route) {
        if (strpos($route->uri(), 'install') !== false || strpos($route->uri(), 'test') !== false) {
            $routes[] = $route->uri() . ' (' . $route->methods()[0] . ')';
        }
    }
    return '<h1>Routes are working!</h1>
    <p>Current URL: ' . request()->url() . '</p>
    <p>Base Path: ' . base_path() . '</p>
    <p>App Path: ' . app_path() . '</p>
    <h2>Related Routes:</h2>
    <pre>' . implode("\n", $routes) . '</pre>
    <p><a href="/inertia-setup">Try Install Inertia (Absolute)</a></p>
    <p><a href="inertia-setup">Try Install Inertia (Relative)</a></p>';
});

// Clear Route Cache
Route::get('/clear-route-cache', function () {
    Artisan::call('route:clear');
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    return '<h1>Cache Cleared!</h1><p><a href="/inertia-setup">Go to Install Inertia</a></p>';
});

// Install Inertia Route - MUST BE BEFORE CATCH-ALL ROUTE
// Build route for review project assets
Route::get('/review-build', function () {
    $output = [];
    $output[] = "<h2>Review Project Build Process</h2>";
    $output[] = "<pre>";
    
    $npmPath = base_path();
    chdir($npmPath);
    
    // Try multiple npm paths including root project's node_modules
    $rootPath = dirname(base_path());
    $npmCommands = [
        'npm',
        '/usr/local/bin/npm',
        '/usr/bin/npm',
        $rootPath . '/node_modules/.bin/npm',
        '~/.nvm/versions/node/*/bin/npm',
        '/opt/nodejs/bin/npm',
        '/usr/local/lib/node_modules/npm/bin/npm-cli.js',
    ];
    
    $npmCmd = null;
    foreach ($npmCommands as $cmd) {
        // Expand ~ to home directory
        $homeDir = getenv('HOME') ?: getenv('USERPROFILE') ?: '/home/' . get_current_user();
        $expandedCmd = str_replace('~', $homeDir, $cmd);
        
        // Test if command works
        $testOutput = [];
        $testReturn = 0;
        $testCommand = $expandedCmd . ' --version 2>&1';
        exec($testCommand, $testOutput, $testReturn);
        
        if ($testReturn === 0 && !empty($testOutput)) {
            $npmCmd = $expandedCmd;
            $output[] = "Found npm: " . $expandedCmd . " (version: " . ($testOutput[0] ?? 'unknown') . ")\n";
            break;
        }
    }
    
    if (!$npmCmd) {
        // Try to find npm via which/where
        $whichOutput = [];
        exec('which npm 2>/dev/null || where npm 2>/dev/null', $whichOutput);
        if (!empty($whichOutput[0])) {
            $npmCmd = $whichOutput[0];
            $output[] = "Found npm via which: " . $npmCmd . "\n";
        } else {
            // Try using node to run npm
            $nodeOutput = [];
            exec('which node 2>/dev/null', $nodeOutput);
            if (!empty($nodeOutput[0])) {
                $nodePath = $nodeOutput[0];
                // Try to find npm in node's directory
                $nodeDir = dirname($nodePath);
                $npmPath = $nodeDir . '/npm';
                if (file_exists($npmPath)) {
                    $npmCmd = $npmPath;
                    $output[] = "Found npm in node directory: " . $npmCmd . "\n";
                } else {
                    // Try using node to run npm from common locations
                    $npmLocations = [
                        '/usr/local/lib/node_modules/npm/bin/npm-cli.js',
                        '/usr/lib/node_modules/npm/bin/npm-cli.js',
                    ];
                    foreach ($npmLocations as $npmLoc) {
                        if (file_exists($npmLoc)) {
                            $npmCmd = $nodePath . ' ' . $npmLoc;
                            $output[] = "Found npm via node: " . $npmCmd . "\n";
                            break;
                        }
                    }
                }
            }
            
            if (!$npmCmd) {
                $npmCmd = 'npm'; // Fallback
                $output[] = "⚠️ npm not found. You may need to install Node.js and npm.\n";
                $output[] = "Installation instructions:\n";
                $output[] = "1. Install Node.js: https://nodejs.org/\n";
                $output[] = "2. Or use nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash\n";
                $output[] = "3. Then: nvm install node && nvm use node\n";
            }
        }
    }
    
    $output[] = "Using npm command: " . $npmCmd . "\n";
    $output[] = "Working directory: " . getcwd() . "\n\n";
    
    // Check if package.json exists
    if (file_exists($npmPath . '/package.json')) {
        $output[] = "Found package.json. Running npm install...\n";
        $installCommand = 'cd ' . escapeshellarg($npmPath) . ' && ' . $npmCmd . ' install 2>&1';
        $output[] = "Command: " . $installCommand . "\n\n";
        exec($installCommand, $npmOutput, $npmReturn);
        $output[] = implode("\n", $npmOutput);
        
        if ($npmReturn === 0) {
            $output[] = "\n✅ npm install completed!\n";
            $output[] = "Running npm run build...\n";
            $buildCommand = 'cd ' . escapeshellarg($npmPath) . ' && ' . $npmCmd . ' run build 2>&1';
            $output[] = "Command: " . $buildCommand . "\n\n";
            exec($buildCommand, $buildOutput, $buildReturn);
            $output[] = implode("\n", $buildOutput);
            
            if ($buildReturn === 0) {
                $output[] = "\n✅ Build completed successfully!\n";
            } else {
                $output[] = "\n⚠️ Build had issues. You may need to run 'npm run build' manually.\n";
            }
        } else {
            $output[] = "\n⚠️ npm install had issues. You may need to run 'npm install' manually.\n";
            $output[] = "Try these commands via SSH:\n";
            $output[] = "cd " . $npmPath . "\n";
            $output[] = $npmCmd . " install\n";
            $output[] = $npmCmd . " run build\n";
        }
    } else {
        $output[] = "⚠️ package.json not found. Skipping build step.\n";
        $output[] = "Note: Review project needs its own Vite build to avoid loading root project's layout.\n";
    }
    
    $output[] = "</pre>";
    $output[] = "<p><a href='/feedbacks'>Test Feedbacks Page</a></p>";
    return implode('', $output);
});

// Using /inertia-setup instead of /install-inertia to avoid pattern conflict
Route::get('/inertia-setup', function () {
    $output = [];
    $output[] = "<h2>Inertia Installation Process</h2>";
    $output[] = "<pre>";
    
    // Step 1: Composer Update
    $output[] = "Step 1: Running composer update...\n";
    $composerPath = base_path('composer.json');
    if (file_exists($composerPath)) {
        chdir(base_path());
        
        // Set HOME and COMPOSER_HOME environment variables
        $basePath = base_path();
        $homeDir = $basePath; // Use project directory as HOME
        putenv('HOME=' . $homeDir);
        putenv('COMPOSER_HOME=' . $homeDir . '/.composer');
        
        // Try multiple composer paths - test each one
        $composerCommands = [
            'composer',  // System composer (most common)
            '/usr/local/bin/composer',  // Common global path
            '/usr/bin/composer',  // Alternative global path
            '~/.composer/vendor/bin/composer',  // User local composer
            '~/.config/composer/vendor/bin/composer',  // Alternative user path
            'php ' . $basePath . '/composer.phar',  // Local composer.phar
            'php composer.phar',  // Relative composer.phar
        ];
        
        $composerCmd = null;
        foreach ($composerCommands as $cmd) {
            // Expand ~ to home directory
            $expandedCmd = str_replace('~', $homeDir, $cmd);
            
            // Test if command works by running --version
            $testOutput = [];
            $testReturn = 0;
            $testCommand = $expandedCmd . ' --version 2>&1';
            exec($testCommand, $testOutput, $testReturn);
            
            if ($testReturn === 0 && !empty($testOutput)) {
                $composerCmd = $expandedCmd;
                $output[] = "Found working composer: " . $expandedCmd . " (version: " . ($testOutput[0] ?? 'unknown') . ")\n";
                break;
            }
        }
        
        if (!$composerCmd) {
            // Last resort: try to find composer in common locations
            $whichOutput = [];
            exec('which composer 2>/dev/null', $whichOutput);
            if (!empty($whichOutput[0])) {
                $composerCmd = $whichOutput[0];
                $output[] = "Found composer via which: " . $composerCmd . "\n";
            } else {
                $composerCmd = 'composer'; // Fallback - will show error if not found
                $output[] = "⚠️ Using fallback composer command. May not work.\n";
            }
        }
        
        $output[] = "Using composer command: " . $composerCmd . "\n";
        $output[] = "Working directory: " . getcwd() . "\n";
        $output[] = "HOME: " . getenv('HOME') . "\n";
        $output[] = "COMPOSER_HOME: " . getenv('COMPOSER_HOME') . "\n\n";
        
        // Run composer update with proper environment (install both Inertia and Ziggy)
        $fullCommand = 'cd ' . escapeshellarg($basePath) . ' && ' . 
                       'HOME=' . escapeshellarg($homeDir) . ' ' .
                       'COMPOSER_HOME=' . escapeshellarg($homeDir . '/.composer') . ' ' .
                       $composerCmd . ' update inertiajs/inertia-laravel tightenco/ziggy --no-interaction --no-dev 2>&1';
        
        $output[] = "Executing: " . $fullCommand . "\n\n";
        
        exec($fullCommand, $composerOutput, $composerReturn);
        $output[] = implode("\n", $composerOutput);
        $output[] = "\n\nComposer return code: " . $composerReturn;
        
        if ($composerReturn !== 0) {
            $output[] = "\n\n⚠️ Composer update had issues. Trying composer install instead...\n";
            // Check if package is in composer.json
            $composerJson = json_decode(file_get_contents($composerPath), true);
            if (isset($composerJson['require']['inertiajs/inertia-laravel']) || isset($composerJson['require']['tightenco/ziggy'])) {
                $output[] = "✅ Package is in composer.json. Running composer install...\n";
                $installCommand = 'cd ' . escapeshellarg($basePath) . ' && ' . 
                                 'HOME=' . escapeshellarg($homeDir) . ' ' .
                                 'COMPOSER_HOME=' . escapeshellarg($homeDir . '/.composer') . ' ' .
                                 $composerCmd . ' install --no-interaction --no-dev --ignore-platform-reqs 2>&1';
                $output[] = "Command: " . $installCommand . "\n\n";
                exec($installCommand, $installOutput, $installReturn);
                $output[] = implode("\n", $installOutput);
                $output[] = "\n\nInstall return code: " . $installReturn;
                
                if ($installReturn === 0) {
                    $output[] = "\n✅ Composer install completed successfully!";
                } else {
                    $output[] = "\n❌ Composer install also failed. Please check the output above.";
                }
            } else {
                $output[] = "\n❌ Package not found in composer.json. Please add it first.";
            }
        } else {
            $output[] = "\n✅ Composer update completed successfully!";
        }
    } else {
        $output[] = "ERROR: composer.json not found at: " . $composerPath;
    }
    
    // Step 2: Check if package is installed
    $output[] = "\n\nStep 2: Checking if Inertia package is installed...\n";
    $inertiaPackagePath = base_path('vendor/inertiajs/inertia-laravel');
    if (!file_exists($inertiaPackagePath)) {
        $output[] = "❌ ERROR: Inertia package is NOT installed!\n";
        $output[] = "Please run this command via SSH/Putty:\n";
        $output[] = "cd " . base_path() . "\n";
        $output[] = "composer update inertiajs/inertia-laravel --no-dev\n\n";
        $output[] = "After running composer update, refresh this page to continue installation.\n";
        $output[] = "</pre>";
        $output[] = "<p><a href='/inertia-setup'>Refresh to Retry</a></p>";
        return implode('', $output);
    }
    $output[] = "✅ Inertia package is installed!\n";
    
    // Step 3: Create Middleware if not exists
    $output[] = "\n\nStep 3: Checking Inertia Middleware...\n";
    $middlewarePath = app_path('Http/Middleware/HandleInertiaRequests.php');
    if (!file_exists($middlewarePath)) {
        $output[] = "Creating HandleInertiaRequests middleware...\n";
        $vendorPath = base_path('vendor/inertiajs/inertia-laravel/stubs/middleware.stub');
        if (file_exists($vendorPath)) {
            $middlewareContent = file_get_contents($vendorPath);
            $middlewareContent = str_replace('{{ namespace }}', 'App\\Http\\Middleware', $middlewareContent);
            file_put_contents($middlewarePath, $middlewareContent);
            $output[] = "✅ Middleware created successfully!\n";
        } else {
            $output[] = "ERROR: Middleware stub not found at: " . $vendorPath . "\n";
        }
    } else {
        $output[] = "✅ Middleware already exists.\n";
    }
    
    // Step 4: Register Middleware in Kernel
    $output[] = "\n\nStep 4: Registering Middleware in Kernel...\n";
    $kernelPath = app_path('Http/Kernel.php');
    if (file_exists($kernelPath)) {
        $kernelContent = file_get_contents($kernelPath);
        if (strpos($kernelContent, 'HandleInertiaRequests') === false) {
            // Add to web middleware group
            $kernelContent = str_replace(
                "\\App\\Http\\Middleware\\RemoveTrailingSlash::class,",
                "\\App\\Http\\Middleware\\RemoveTrailingSlash::class,\n            \\App\\Http\\Middleware\\HandleInertiaRequests::class,",
                $kernelContent
            );
            file_put_contents($kernelPath, $kernelContent);
            $output[] = "Middleware registered in Kernel!\n";
        } else {
            $output[] = "Middleware already registered.\n";
        }
    }
    
    // Step 5: Clear Cache
    $output[] = "\n\nStep 5: Clearing cache...\n";
    Artisan::call('optimize:clear');
    $output[] = Artisan::output();
    
    $output[] = "\n\n✅ Installation Complete!";
    $output[] = "</pre>";
    $output[] = "<p><a href='/review-build'>Build Review Project Assets</a></p>";
    $output[] = "<p><a href='/feedbacks'>Test Feedbacks Page</a></p>";
    
    return implode('', $output);
})->name('install.inertia');

Route::get('/{frontend}', function () {
    return view('blue.pages.dashboard');
})->where('frontend', MainLayoutComposer::PATTERN_PWA_ROUTES);

// Keeping this route for backword compatiblity.

QRCodeRedirectController::bindRoutes();

PaymentProcessorManager::registerWebRoutes();

Route::get('/sitemap.xml', function () {
    return response()->view('sitemap', [
        'urls' => SitemapGenerator::generate()
    ])->header('content-type', 'application/xml; charset="utf8"');
});

Route::get('/email/verify/{id}/{hash}', [AccountController::class, 'verifyEmail'])
    ->middleware(['signed'])
    ->name('verification.verify');

RouteServiceProvider::registerLoginRoute();

Route::get(
    '/magic-login/{user}',
    [AccountController::class, 'magicLogin']
)->name('magic-login');

Route::get('/system/cron', [SystemController::class, 'cron'])->name('cron');

Route::get('/robots.txt', function () {
    return view('robots');
});

Route::get('/' . DomainManager::DOMAIN_CONNECTION_ROUTE, function () {
    $domainManager = new DomainManager();

    return $domainManager->connectionString();
});

Route::get(Auth0Manager::loginUrl(), [Auth0Controller::class, 'login']);

Route::get(Auth0Manager::logoutUrl(), [Auth0Controller::class, 'logout']);

Route::get(Auth0Manager::callbackUrl(), [Auth0Controller::class, 'handleCallback']);

Route::get('/set-cookie-consent', [GdprConsentController::class, 'setCookieConsent']);

QRCodeStorage::registerDirectSvgRoute();

Route::get('/auto-update', function () {
    if (file_exists(public_path('update.php'))) {
        require_once public_path('update.php');
        die;
    } else {
        abort(404, 'Page not found');
    }
});

Route::get(
    QRCodeFaviconFileServer::ROUTE,
    [QRCodeController::class, 'serveFavicon']
);

Route::get(
    'system/cron/runner',
    [SystemController::class, 'cronRunner']
);

Route::get(
    '/website-builder',
    [GrapesJsController::class, 'viewWebsiteBuilderPage']
);

Route::get('/dynamic-style/{scan}', [QRCodeScanController::class, 'collectLanguage']);

Route::get(
    '/add-to-apple-wallet/{qrcode}',
    [QRCodeController::class, 'addToAppleWallet']
);

Route::get('/invoice/{uuid}', [InvoiceController::class, 'viewInvoice']);

Route::get('/feedbacks', [FeedbackController::class, 'index'])->name('feedbacks.index');
Route::post('/dyvihb', [FeedbackController::class, 'store'])->name('dyvihb.store');
Route::get('/feedbacks/{feedback}/recovery', [FeedbackController::class, 'getRecoveryMessage'])->name('feedbacks.recovery');
Route::post('/feedbacks/recovery/{conversation}/continue', [FeedbackController::class, 'continueRecovery'])->name('feedbacks.recovery.continue');
Route::get('/feedbacks/recovery/last', [FeedbackController::class, 'getLastConversation'])->name('feedbacks.recovery.last');

DashboardAssetsServer::registerWebRoute();

Scramble::registerUiRoute(path: 'docs/api')->name('scramble.docs.ui');

Scramble::registerJsonSpecificationRoute(path: 'docs/api.json')->name('scramble.docs.document');
