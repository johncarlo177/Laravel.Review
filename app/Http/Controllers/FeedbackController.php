<?php

namespace App\Http\Controllers;

use App\Models\BusinessReviewFeedback;
use App\Models\QRCode;
use App\Models\QRCodeRedirect;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    /**
     * Display the dashboard listing for customer feedback.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401);
        }

        // For super admins, show all feedbacks. For regular users, show only their QR codes' feedbacks
        $isSuperAdmin = method_exists($user, 'isSuperAdmin') && $user->isSuperAdmin();
        
        if ($isSuperAdmin) {
            $qrcodeIds = QRCode::query()->pluck('id');
        } else {
            // Get all QR codes owned by the user (either directly or through folders)
            $qrcodeIds = QRCode::query()
                ->where(function ($query) use ($user) {
                    // QR codes directly owned by user
                    $query->where('user_id', $user->id)
                        // OR QR codes in folders owned by user
                        ->orWhereHas('folder', function ($folderQuery) use ($user) {
                            $folderQuery->where('user_id', $user->id);
                        });
                })
                ->pluck('id');
        }

        $perPage = (int) $request->input('per_page', 10);
        $feedbackData = [
            'data' => [],
            'from' => null,
            'to' => null,
            'total' => 0,
            'links' => [],
            'summary' => $this->buildEmptySummary(),
        ];

        // Build feedback query - show feedbacks for user's QR codes OR feedbacks submitted by user's email
        $feedbackQuery = BusinessReviewFeedback::query();
        
        if ($isSuperAdmin) {
            // Super admins see all feedbacks
            // No additional filtering needed
        } else {
            // Regular users see:
            // 1. Feedbacks for their QR codes
            // 2. Feedbacks they submitted (matching by email)
            $feedbackQuery->where(function ($query) use ($qrcodeIds, $user) {
                // Show feedbacks for QR codes owned by user
                if ($qrcodeIds->isNotEmpty()) {
                    $query->whereIn('qrcode_id', $qrcodeIds);
                }
                
                // Also show feedbacks submitted by the logged-in user (matching by email)
                // This allows customers to see their own feedback even if QR code doesn't belong to them
                if ($user->email) {
                    if ($qrcodeIds->isNotEmpty()) {
                        $query->orWhere('email', $user->email);
                    } else {
                        $query->where('email', $user->email);
                    }
                }
            });
        }
        
        $feedbackQuery->with('qrcode');
        $this->applyFilters($feedbackQuery, $request);

        $sortField = $this->resolveSortColumn($request->input('sort_field', 'created_at'));
        $sortDirection = strtolower($request->input('sort_direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        $feedbacks = $feedbackQuery
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();

        // Get all QR code IDs for summary (including ones from user's own feedbacks)
        $allQrcodeIds = $qrcodeIds;
        if (!$isSuperAdmin && $user->email) {
            $userFeedbackQrcodeIds = BusinessReviewFeedback::where('email', $user->email)
                ->pluck('qrcode_id')
                ->unique();
            $allQrcodeIds = $qrcodeIds->merge($userFeedbackQrcodeIds)->unique();
        }

        $feedbackData = [
            'data' => $feedbacks->items(),
            'from' => $feedbacks->firstItem(),
            'to' => $feedbacks->lastItem(),
            'total' => $feedbacks->total(),
            'links' => Arr::get($feedbacks->toArray(), 'links', []),
            'summary' => $this->buildSummary($allQrcodeIds),
        ];

        // Get all QR code IDs for filter dropdown (including ones from user's own feedbacks)
        $filterQrcodeIds = $qrcodeIds;
        if (!$isSuperAdmin && $user->email) {
            $userFeedbackQrcodeIds = BusinessReviewFeedback::where('email', $user->email)
                ->pluck('qrcode_id')
                ->unique();
            $filterQrcodeIds = $qrcodeIds->merge($userFeedbackQrcodeIds)->unique();
        }

        return Inertia::render('feedbacks/index', [
            'feedbacks' => $feedbackData,
            'qrcodes' => $this->loadFilterQRCodes($filterQrcodeIds),
            'isAdmin' => $isSuperAdmin,
            'filters' => $request->only([
                'search',
                'qrcode',
                'stars',
                'sort_field',
                'sort_direction',
                'per_page',
            ]),
        ]);
    }

    /**
     * Store feedback from /dyvihb form submission
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'mobile' => 'nullable|string|max:255',
            'feedback' => 'nullable|string',
            'stars' => 'required|integer|min:1|max:5',
        ]);

        // Find the QR code with slug 'dyvihb'
        $redirect = QRCodeRedirect::whereSlug('dyvihb')->first();

        if (!$redirect || !$redirect->qrcode) {
            Log::warning('QR code with slug "dyvihb" not found');
            return response()->json([
                'success' => false,
                'message' => 'Survey page not configured properly'
            ], 404);
        }

        // Save the feedback
        $feedback = new BusinessReviewFeedback();
        $feedback->name = $request->input('name');
        $feedback->email = $request->input('email');
        $feedback->mobile = $request->input('mobile');
        $feedback->feedback = $request->input('feedback');
        $feedback->stars = $request->input('stars');
        $feedback->qrcode_id = $redirect->qrcode->id;
        $feedback->save();

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your feedback!'
        ]);
    }

    /**
     * Delete a feedback record that belongs to the authenticated user.
     */
    public function destroy(Request $request, QRCode $qrcode, BusinessReviewFeedback $feedback): RedirectResponse
    {
        $this->authorizeQRCode($qrcode, $request->user());

        if ((int) $feedback->qrcode_id !== (int) $qrcode->id) {
            abort(404);
        }

        $feedback->delete();

        return back();
    }

    private function authorizeQRCode(QRCode $qrcode, $user): void
    {
        if (!$user) {
            abort(401);
        }

        if (method_exists($user, 'isSuperAdmin') && $user->isSuperAdmin()) {
            return;
        }

        if ((int) $qrcode->user_id !== (int) $user->id) {
            abort(403);
        }
    }

    private function applyFilters(Builder $query, Request $request): void
    {
        if ($search = $request->input('search')) {
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('feedback', 'like', "%{$search}%")
                    ->orWhere('mobile', 'like', "%{$search}%");
            });
        }

        if (($qrcodeId = $request->input('qrcode')) && $qrcodeId !== 'all') {
            $query->where('qrcode_id', $qrcodeId);
        }

        if (($stars = $request->input('stars')) && $stars !== 'all') {
            $query->where('stars', $stars);
        }
    }

    private function buildSummary(Collection $qrcodeIds): array
    {
        $summary = $this->buildEmptySummary();

        if ($qrcodeIds->isEmpty()) {
            return $summary;
        }

        $totals = BusinessReviewFeedback::query()
            ->selectRaw('stars, COUNT(*) as total')
            ->whereIn('qrcode_id', $qrcodeIds)
            ->groupBy('stars')
            ->pluck('total', 'stars');

        $summary['total'] = $totals->sum();
        $summary['stars_5'] = (int) $totals->get(5, 0);
        $summary['stars_4'] = (int) $totals->get(4, 0);
        $summary['stars_3'] = (int) $totals->get(3, 0);
        $summary['stars_1_2'] = (int) (($totals->get(1, 0) ?? 0) + ($totals->get(2, 0) ?? 0));

        return $summary;
    }

    private function buildEmptySummary(): array
    {
        return [
            'total' => 0,
            'stars_5' => 0,
            'stars_4' => 0,
            'stars_3' => 0,
            'stars_1_2' => 0,
        ];
    }

    private function loadFilterQRCodes(Collection $qrcodeIds): array
    {
        if ($qrcodeIds->isEmpty()) {
            return [];
        }

        $query = QRCode::query()->whereIn('id', $qrcodeIds);
        
        // For super admins, include QR code owner info
        $user = request()->user();
        $isSuperAdmin = method_exists($user, 'isSuperAdmin') && $user->isSuperAdmin();
        
        if ($isSuperAdmin) {
            $query->with('user');
        }

        return $query
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (QRCode $qrcode) => [
                'id' => $qrcode->id,
                'title' => $qrcode->title ?? $qrcode->display_label ?? $qrcode->name,
            ])
            ->all();
    }

    private function resolveSortColumn(?string $column): string
    {
        $allowed = ['created_at', 'name', 'stars', 'email'];

        return in_array($column, $allowed, true) ? $column : 'created_at';
    }
}

