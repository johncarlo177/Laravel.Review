<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', $page['props']['auth']['lang'] ?? app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <base href="{{ \Illuminate\Support\Facades\Request::getBasePath() }}">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ function_exists('getSetting') ? getSetting('titleText', config('app.name', 'Laravel')) : config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        @php
            // Check for local manifest first
            $manifestPath = public_path('build/manifest.json');
            // Root project's public folder: review is in public_html/review, root is in public_html
            $rootPublicPath = base_path('../public/build/manifest.json');
            $manifestFound = false;
            
            // Root project's base URL - only use if local manifest doesn't exist
            $currentUrl = url('/');
            $rootBaseUrl = preg_replace('/^https?:\/\/[^\.]+\./', 'https://', $currentUrl);
            // If still contains /review, remove it
            $rootBaseUrl = str_replace('/review', '', $rootBaseUrl);
        @endphp
        @if (file_exists($manifestPath))
            {{-- Local manifest exists, don't load jQuery/Ziggy from root --}}
        @else
            {{-- Only load from root if local manifest doesn't exist --}}
            <script src="{{ $rootBaseUrl }}/js/jquery.min.js"></script>
        @endif
        @if (!file_exists($manifestPath))
            {{-- Only load Ziggy if local manifest doesn't exist --}}
            @php
                // Try to generate Ziggy routes using root project's Ziggy
                $ziggyRoutes = null;
                try {
                    // Load root project's Ziggy class
                    $rootZiggyPath = base_path('../vendor/tightenco/ziggy/src/Ziggy.php');
                    if (file_exists($rootZiggyPath)) {
                        // Get routes from root project
                        $rootRoutes = include base_path('../routes/web.php');
                        // Create Ziggy instance with root project's routes
                        $ziggy = new \Tighten\Ziggy\Ziggy();
                        $ziggyRoutes = $ziggy->toArray();
                    }
                } catch (\Exception $e) {
                    // Ziggy not available, will use fallback
                }
            @endphp
            @if ($ziggyRoutes)
                <script>
                    window.Ziggy = @json($ziggyRoutes);
                </script>
                <script src="{{ $rootBaseUrl }}/vendor/tightenco/ziggy/dist/index.js"></script>
            @else
                {{-- Fallback: Try to load from root project's generated routes --}}
                <script src="{{ $rootBaseUrl }}/js/ziggy.js" defer></script>
                <script>
                    // Fallback route function if Ziggy doesn't load
                    if (typeof window.route === 'undefined') {
                        window.route = function(name, params, absolute) {
                            console.warn('Ziggy routes not loaded. Route:', name);
                            return '#';
                        };
                    }
                </script>
            @endif
        @else
            {{-- Local manifest exists, provide fallback route function --}}
            <script>
                if (typeof window.route === 'undefined') {
                    window.route = function(name, params, absolute) {
                        // Simple route helper for Inertia
                        const routes = {
                            'feedbacks.index': '/feedbacks',
                            'dashboard': '/dashboard',
                        };
                        let url = routes[name] || '#';
                        if (params) {
                            const query = new URLSearchParams(params).toString();
                            if (query) url += '?' + query;
                        }
                        return url;
                    };
                }
            </script>
        @endif
        @if (file_exists($manifestPath))
            {{-- Local Vite manifest exists --}}
            @if (app()->environment('local') && file_exists(public_path('hot')))
                @viteReactRefresh
            @endif
            @vite(['resources/css/app.css', 'resources/js/app.tsx'])
            @php $manifestFound = true; @endphp
        @elseif (file_exists($rootPublicPath))
            {{-- Use root project's Vite manifest --}}
            @php
                try {
                    $manifest = json_decode(file_get_contents($rootPublicPath), true);
                    $appEntry = $manifest['resources/js/app.tsx'] ?? null;
                    if ($appEntry) {
                        $manifestFound = true;
                    }
                } catch (\Exception $e) {
                    $appEntry = null;
                }
            @endphp
            @if ($appEntry)
                <script type="module" src="{{ $rootBaseUrl }}/build/{{ $appEntry['file'] }}"></script>
                @if (isset($appEntry['css']))
                    @foreach ($appEntry['css'] as $css)
                        <link rel="stylesheet" href="{{ $rootBaseUrl }}/build/{{ $css }}">
                    @endforeach
                @endif
            @endif
        @endif
        @if (!$manifestFound)
            {{-- Fallback: Try to load from root project's build directory --}}
            <script type="module" src="{{ $rootBaseUrl }}/build/assets/app.js"></script>
            <link rel="stylesheet" href="{{ $rootBaseUrl }}/build/assets/app.css">
        @endif
        <script>
            // Ensure base URL is correctly set for assets
            window.baseUrl = '{{ url('/') }}';
            window.APP_URL = '{{ config('app.url') }}';
            window.initialLocale = @json($page['props']['auth']['lang'] ?? 'en');
        </script>
        <script src="{{ asset('js/components/AIRecoveryWidget.js') }}"></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if(config('app.is_demo', false))
           {{-- @include('announcebar') --}}
        @endif
        @inertia
    </body>
</html>

