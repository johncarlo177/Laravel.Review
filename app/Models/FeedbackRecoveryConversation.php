<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeedbackRecoveryConversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'feedback_id',
        'conversation_history',
        'status',
        'sentiment',
        'category',
        'severity',
        'is_resolved',
        'review_requested',
    ];

    protected $casts = [
        'conversation_history' => 'array',
        'is_resolved' => 'boolean',
        'review_requested' => 'boolean',
    ];

    public function feedback(): BelongsTo
    {
        return $this->belongsTo(BusinessReviewFeedback::class, 'feedback_id');
    }

    public function addMessage(string $role, string $content): void
    {
        $history = $this->conversation_history ?? [];
        $history[] = [
            'role' => $role,
            'content' => $content,
            'timestamp' => now()->toISOString(),
        ];
        $this->conversation_history = $history;
        $this->save();
    }
}
