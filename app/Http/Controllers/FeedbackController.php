<?php

namespace App\Http\Controllers;

use App\Models\BusinessReviewFeedback;
use App\Models\FeedbackRecoveryConversation;
use App\Models\QRCode;
use App\Models\QRCodeRedirect;
use App\Support\AI\FeedbackRecoveryService;
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

        // Build summary based on the same query logic used for displaying feedbacks
        $summary = $this->buildSummary($qrcodeIds, $isSuperAdmin, $user);

        $feedbackData = [
            'data' => $feedbacks->items(),
            'from' => $feedbacks->firstItem(),
            'to' => $feedbacks->lastItem(),
            'total' => $feedbacks->total(),
            'links' => Arr::get($feedbacks->toArray(), 'links', []),
            'summary' => $summary,
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

        // Trigger AI recovery for feedback (4 stars or less)
        // 1-2 stars: High severity, negative sentiment
        // 3 stars: Medium severity, neutral sentiment
        // 4 stars: Low severity, neutral sentiment (still needs AI response)
        $aiRecoveryData = null;
        if ($feedback->stars <= 4) {
            try {
                Log::info('AI Recovery: Starting recovery process', [
                    'feedback_id' => $feedback->id,
                    'stars' => $feedback->stars
                ]);
                
                $recoveryService = new FeedbackRecoveryService();
                $aiAnalysis = $recoveryService->analyzeFeedback($feedback);
                
                Log::info('AI Recovery: Analysis complete', [
                    'message_length' => strlen($aiAnalysis['message'] ?? ''),
                    'sentiment' => $aiAnalysis['sentiment'] ?? 'unknown',
                    'category' => $aiAnalysis['category'] ?? 'unknown'
                ]);
                
                // Create conversation record
                // Determine sentiment and severity based on stars
                $sentiment = $aiAnalysis['sentiment'] ?? ($feedback->stars <= 2 ? 'negative' : ($feedback->stars == 3 ? 'neutral' : 'neutral'));
                $severity = $aiAnalysis['severity'] ?? ($feedback->stars <= 2 ? 'high' : ($feedback->stars == 3 ? 'medium' : 'low'));
                
                // Send email and SMS notification to admin if severity is high
                if ($severity === 'high') {
                    try {
                        $notificationService = new \App\Support\Notifications\AdminNotificationService();
                        $notificationService->notifyHighSeverityFeedback($feedback);
                        
                        Log::info('Admin notification sent for high severity feedback', [
                            'feedback_id' => $feedback->id,
                            'severity' => $severity
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Failed to send admin notification', [
                            'feedback_id' => $feedback->id,
                            'error' => $e->getMessage()
                        ]);
                        // Don't fail the feedback submission if notification fails
                    }
                }
                
                $conversation = FeedbackRecoveryConversation::create([
                    'feedback_id' => $feedback->id,
                    'conversation_history' => [
                        [
                            'role' => 'user',
                            'content' => $feedback->feedback ?? "Rating: {$feedback->stars}/5",
                            'timestamp' => now()->toISOString(),
                        ],
                        [
                            'role' => 'assistant',
                            'content' => $aiAnalysis['message'],
                            'timestamp' => now()->toISOString(),
                        ],
                    ],
                    'status' => 'active',
                    'sentiment' => $sentiment,
                    'category' => $aiAnalysis['category'] ?? 'general',
                    'severity' => $severity,
                ]);

                $aiRecoveryData = [
                    'conversation_id' => $conversation->id,
                    'message' => $aiAnalysis['message'],
                    'sentiment' => $aiAnalysis['sentiment'] ?? 'negative',
                    'category' => $aiAnalysis['category'] ?? 'general',
                ];
                
                Log::info('AI Recovery: Conversation created', [
                    'conversation_id' => $conversation->id,
                    'has_recovery_data' => !empty($aiRecoveryData)
                ]);
            } catch (\Exception $e) {
                Log::error('AI Recovery failed', [
                    'feedback_id' => $feedback->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                // Return error info for debugging
                $aiRecoveryData = [
                    'error' => 'AI recovery service unavailable',
                    'error_message' => $e->getMessage()
                ];
            }
        } else {
            Log::info('AI Recovery: Skipped (high rating)', [
                'feedback_id' => $feedback->id,
                'stars' => $feedback->stars
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your feedback!',
            'ai_recovery' => $aiRecoveryData,
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

    private function buildSummary(Collection $qrcodeIds, bool $isSuperAdmin = false, $user = null): array
    {
        $summary = $this->buildEmptySummary();

        // Build query using the same logic as the main feedback query
        $summaryQuery = BusinessReviewFeedback::query();
        
        if ($isSuperAdmin) {
            // Super admins see all feedbacks - no filtering needed
        } else {
            // Regular users see feedbacks for their QR codes OR feedbacks they submitted
            $summaryQuery->where(function ($query) use ($qrcodeIds, $user) {
                // Show feedbacks for QR codes owned by user
                if ($qrcodeIds->isNotEmpty()) {
                    $query->whereIn('qrcode_id', $qrcodeIds);
                }
                
                // Also show feedbacks submitted by the logged-in user (matching by email)
                if ($user && $user->email) {
                    if ($qrcodeIds->isNotEmpty()) {
                        $query->orWhere('email', $user->email);
                    } else {
                        $query->where('email', $user->email);
                    }
                }
            });
        }

        $totals = $summaryQuery
            ->selectRaw('stars, COUNT(*) as total')
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

    /**
     * Get AI recovery message for a feedback
     */
    public function getRecoveryMessage(Request $request, BusinessReviewFeedback $feedback)
    {
        $conversation = FeedbackRecoveryConversation::where('feedback_id', $feedback->id)->first();
        
        if (!$conversation) {
            return response()->json([
                'success' => false,
                'message' => 'No recovery conversation found'
            ], 404);
        }

        $lastMessage = collect($conversation->conversation_history)->last();

        return response()->json([
            'success' => true,
            'conversation_id' => $conversation->id,
            'message' => $lastMessage['content'] ?? '',
            'conversation_history' => $conversation->conversation_history,
        ]);
    }

    /**
     * Continue AI recovery conversation
     */
    public function continueRecovery(Request $request, FeedbackRecoveryConversation $conversation)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        try {
            $recoveryService = new FeedbackRecoveryService();
            
            // Add customer message to conversation
            $conversation->addMessage('user', $request->input('message'));
            
            // Get updated conversation history
            $history = $conversation->conversation_history ?? [];
            
            // Continue conversation with AI
            $aiResponse = $recoveryService->continueConversation($history, $request->input('message'));
            
            // Add AI response to conversation
            $conversation->addMessage('assistant', $aiResponse['message']);
            
            // Update conversation status
            if ($aiResponse['is_resolved'] ?? false) {
                $conversation->is_resolved = true;
                $conversation->status = 'resolved';
            }
            
            if ($aiResponse['should_request_review'] ?? false) {
                $conversation->review_requested = true;
            }
            
            $conversation->save();

            // Get Google review link from QR code if available
            $googleReviewLink = null;
            if ($conversation->feedback && $conversation->feedback->qrcode) {
                // Try to get the final review link from the QR code
                try {
                    $qrcode = $conversation->feedback->qrcode;
                    // Check if QR code has a business review type with final review link
                    if (method_exists($qrcode, 'getFinalReviewLink')) {
                        $googleReviewLink = $qrcode->getFinalReviewLink();
                    } elseif (isset($qrcode->final_review_link)) {
                        $googleReviewLink = $qrcode->final_review_link;
                    }
                } catch (\Exception $e) {
                    // Fallback to generic Google review search
                    $googleReviewLink = 'https://www.google.com/search?q=leave+a+review';
                }
            }
            
            // If no specific link, use generic Google review search
            if (!$googleReviewLink) {
                $googleReviewLink = 'https://www.google.com/search?q=leave+a+review';
            }

            // Format the message smoothly - don't append review request if already in message
            $finalMessage = $aiResponse['message'];
            
            // If review should be requested but message doesn't naturally include it, 
            // we'll handle it in the frontend with the review request section
            // This prevents duplicate or awkward sentence connections

            return response()->json([
                'success' => true,
                'message' => $finalMessage,
                'is_resolved' => $conversation->is_resolved,
                'should_request_review' => $conversation->review_requested,
                'needs_escalation' => $aiResponse['needs_escalation'] ?? false,
                'google_review_link' => $googleReviewLink,
                'conversation_history' => $conversation->conversation_history,
            ]);
        } catch (\Exception $e) {
            Log::error('AI Recovery continuation failed', [
                'conversation_id' => $conversation->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'We received your message. Our team will get back to you soon.'
            ], 500);
        }
    }

    /**
     * Get the last active conversation for the current user
     */
    public function getLastConversation(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Find the last active conversation for feedbacks submitted by this user
            // Get the most recent one (last created)
            $conversation = FeedbackRecoveryConversation::whereHas('feedback', function ($query) use ($user) {
                $query->where('email', $user->email);
            })
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc') // Secondary sort by ID to ensure most recent
            ->first();
            
            // If no active conversation, try to get the most recent one regardless of status
            if (!$conversation) {
                $conversation = FeedbackRecoveryConversation::whereHas('feedback', function ($query) use ($user) {
                    $query->where('email', $user->email);
                })
                ->orderBy('created_at', 'desc')
                ->orderBy('id', 'desc')
                ->first();
            }

            if (!$conversation) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active conversation found'
                ], 404);
            }

            $lastMessage = collect($conversation->conversation_history)->last();

            return response()->json([
                'success' => true,
                'conversation_id' => $conversation->id,
                'conversation_history' => $conversation->conversation_history,
                'last_message' => $lastMessage['content'] ?? '',
                'is_resolved' => $conversation->is_resolved,
                'review_requested' => $conversation->review_requested,
            ]);
        } catch (\Exception $e) {
            Log::error('Get last conversation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error loading conversation'
            ], 500);
        }
    }
}

