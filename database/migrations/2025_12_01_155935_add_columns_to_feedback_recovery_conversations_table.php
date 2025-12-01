<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('feedback_recovery_conversations', function (Blueprint $table) {
            // Add foreign key column for feedback
            $table->foreignId('feedback_id')
                ->after('id')
                ->constrained('business_review_feedback')
                ->cascadeOnDelete();
            
            // Add conversation history (JSON)
            $table->json('conversation_history')->nullable()->after('feedback_id');
            
            // Add status column
            $table->string('status')->default('active')->after('conversation_history');
            
            // Add sentiment column
            $table->string('sentiment')->nullable()->after('status');
            
            // Add category column
            $table->string('category')->nullable()->after('sentiment');
            
            // Add severity column
            $table->string('severity')->nullable()->after('category');
            
            // Add is_resolved column
            $table->boolean('is_resolved')->default(false)->after('severity');
            
            // Add review_requested column
            $table->boolean('review_requested')->default(false)->after('is_resolved');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('feedback_recovery_conversations', function (Blueprint $table) {
            if (Schema::hasColumn('feedback_recovery_conversations', 'feedback_id')) {
                $table->dropForeign(['feedback_id']);
            }
            $table->dropColumn([
                'feedback_id',
                'conversation_history',
                'status',
                'sentiment',
                'category',
                'severity',
                'is_resolved',
                'review_requested',
            ]);
        });
    }
};
