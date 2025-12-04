<?php

namespace App\Console\Commands;

use App\Support\AI\CategoryDetectionService;
use App\Support\AI\CategorySentenceGenerator;
use Illuminate\Console\Command;

class TestCategoryDetection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'category:test 
                            {feedback? : The feedback text to analyze}
                            {--category= : Show sentences for a specific category}
                            {--list : List all available categories}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test category detection and generate example sentences';

    protected CategoryDetectionService $categoryDetectionService;
    protected CategorySentenceGenerator $sentenceGenerator;

    public function __construct(
        CategoryDetectionService $categoryDetectionService,
        CategorySentenceGenerator $sentenceGenerator
    ) {
        parent::__construct();
        $this->categoryDetectionService = $categoryDetectionService;
        $this->sentenceGenerator = $sentenceGenerator;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if ($this->option('list')) {
            $this->listCategories();
            return 0;
        }

        if ($this->option('category')) {
            $this->showCategorySentences($this->option('category'));
            return 0;
        }

        $feedback = $this->argument('feedback');
        
        if (!$feedback) {
            $feedback = $this->ask('Enter customer feedback to analyze');
        }

        if (empty($feedback)) {
            $this->error('Please provide feedback text or use --list to see available categories');
            return 1;
        }

        $this->analyzeFeedback($feedback);
        return 0;
    }

    protected function analyzeFeedback(string $feedback): void
    {
        $this->info("Analyzing feedback: \"{$feedback}\"");
        $this->newLine();

        $category = $this->categoryDetectionService->detectCategory($feedback);
        
        $this->info("Detected Category: <fg=green>{$category}</>");
        $this->newLine();

        $this->info("Example sentences for this category:");
        $this->line('─────────────────────────────────────');
        
        $sentences = $this->sentenceGenerator->generateSentences($category, 5);
        
        if (empty($sentences)) {
            $this->warn("No example sentences available for category: {$category}");
        } else {
            foreach ($sentences as $index => $sentence) {
                $this->line(($index + 1) . ". {$sentence}");
            }
        }
    }

    protected function listCategories(): void
    {
        $this->info('Available Categories:');
        $this->line('─────────────────────────────────────');
        
        $categories = $this->categoryDetectionService->getAllCategories();
        
        foreach ($categories as $index => $category) {
            $this->line(($index + 1) . ". {$category}");
        }
        
        $this->newLine();
        $this->info('Use --category=<category_name> to see example sentences for a specific category');
    }

    protected function showCategorySentences(string $category): void
    {
        $this->info("Example sentences for category: <fg=green>{$category}</>");
        $this->line('─────────────────────────────────────');
        
        $sentences = $this->sentenceGenerator->getAllSentences($category);
        
        if (empty($sentences)) {
            $this->warn("Category '{$category}' not found or has no sentences.");
            $this->info('Use --list to see all available categories');
            return;
        }
        
        foreach ($sentences as $index => $sentence) {
            $this->line(($index + 1) . ". {$sentence}");
        }
    }
}

