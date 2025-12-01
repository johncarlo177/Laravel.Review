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
        Schema::create('feedback_recovery_conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feedback_id')
                ->constrained('business_review_feedback')
                ->cascadeOnDelete();
            $table->json('conversation_history')->nullable(); // Store full conversation
            $table->string('status')->default('active'); // active, resolved, escalated
            $table->string('sentiment')->nullable(); // positive, negative, neutral
            $table->string('category')->nullable(); // wait_time, food_quality, service, etc.
            $table->string('severity')->nullable(); // low, medium, high
            $table->boolean('is_resolved')->default(false);
            $table->boolean('review_requested')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_recovery_conversations');
    }
};
