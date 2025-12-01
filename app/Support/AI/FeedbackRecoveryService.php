<?php

namespace App\Support\AI;

use App\Models\BusinessReviewFeedback;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FeedbackRecoveryService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openai.com/v1';

    public function __construct()
    {
        $this->apiKey = config('services.openai.secret_key');
        
        if (empty($this->apiKey)) {
            Log::warning('OpenAI API key not configured. Please set OPEN_AI_SECRET_KEY in your .env file.');
        }
    }

    /**
     * Analyze feedback and generate initial recovery message
     */
    public function analyzeFeedback(BusinessReviewFeedback $feedback): array
    {
        // First, detect category, sentiment, and severity from the feedback text and stars
        $feedbackText = $feedback->feedback ?? '';
        $stars = $feedback->stars;
        
        // Detect category from feedback text keywords
        $detectedCategory = $this->detectCategory($feedbackText);
        
        // Determine sentiment and severity based on star rating
        $detectedSentiment = $this->detectSentimentFromStars($stars);
        $detectedSeverity = $this->detectSeverityFromStars($stars);
        
        $systemPrompt = $this->getSystemPrompt();
        $userMessage = $this->buildFeedbackMessage($feedback);

        $response = $this->callOpenAI([
            [
                'role' => 'system',
                'content' => $systemPrompt
            ],
            [
                'role' => 'user',
                'content' => $userMessage
            ]
        ]);

        return [
            'message' => $response['message'] ?? $this->generateFallbackMessage($feedbackText),
            'sentiment' => $detectedSentiment,
            'category' => $detectedCategory,
            'severity' => $detectedSeverity,
            'suggested_action' => $response['suggested_action'] ?? 'apology',
        ];
    }

    protected function detectSentimentFromStars(int $stars): string
    {
        // Sentiment based on star rating
        if ($stars <= 2) {
            return 'negative';
        } elseif ($stars == 3) {
            return 'neutral';
        } elseif ($stars == 4) {
            return 'neutral';
        } else {
            return 'positive';
        }
    }

    protected function detectSeverityFromStars(int $stars): string
    {
        // Severity based on star rating
        if ($stars <= 2) {
            return 'high';
        } elseif ($stars == 3) {
            return 'medium';
        } elseif ($stars == 4) {
            return 'low';
        } else {
            return 'low';
        }
    }

    /**
     * Continue conversation with customer response
     */
    public function continueConversation(array $conversationHistory, string $customerResponse): array
    {
        $systemPrompt = $this->getFollowUpPrompt();
        
        // Build conversation context for AI
        $messages = [
            ['role' => 'system', 'content' => $systemPrompt]
        ];

        // Add conversation history (skip system messages, keep last 6 messages for context)
        $relevantHistory = array_slice(
            array_filter($conversationHistory, fn($msg) => $msg['role'] !== 'system'),
            -6
        );
        
        foreach ($relevantHistory as $msg) {
            $messages[] = [
                'role' => $msg['role'],
                'content' => $msg['content']
            ];
        }

        // Add new customer response
        $messages[] = [
            'role' => 'user',
            'content' => $customerResponse
        ];

        Log::info('AI Follow-up Conversation', [
            'customer_response' => $customerResponse,
            'history_count' => count($relevantHistory),
            'messages_count' => count($messages)
        ]);

        $response = $this->callOpenAI($messages);
        
        // Analyze customer response to determine if resolved
        $isResolved = $this->detectResolution($customerResponse);
        $shouldRequestReview = $isResolved && $this->shouldRequestReview($customerResponse);

        // If AI response is a fallback, try to generate a better contextual response
        $finalMessage = $response['message'];
        if ($this->isFallbackMessage($finalMessage)) {
            $finalMessage = $this->generateContextualResponse($customerResponse, $conversationHistory);
        }

        return [
            'message' => $finalMessage,
            'needs_escalation' => $this->needsEscalation($customerResponse),
            'is_resolved' => $isResolved,
            'should_request_review' => $shouldRequestReview,
        ];
    }

    protected function isFallbackMessage(string $message): bool
    {
        $fallbackPhrases = [
            'thank you for your feedback',
            'we will review it',
            'get back to you soon',
            'we received your message'
        ];
        
        $messageLower = strtolower($message);
        foreach ($fallbackPhrases as $phrase) {
            if (stripos($messageLower, $phrase) !== false) {
                return true;
            }
        }
        
        return false;
    }

    protected function generateContextualResponse(string $customerResponse, array $conversationHistory): string
    {
        $response = strtolower(trim($customerResponse));
        
        // Get the last AI message to understand context
        $lastAIMessage = '';
        foreach (array_reverse($conversationHistory) as $msg) {
            if ($msg['role'] === 'assistant') {
                $lastAIMessage = strtolower($msg['content'] ?? '');
                break;
            }
        }
        
        // Contextual responses based on customer input - ONE smooth sentence
        if (in_array($response, ['ok', 'okay', 'sure', 'alright', 'fine', 'yes'])) {
            if (stripos($lastAIMessage, 'discount') !== false || stripos($lastAIMessage, 'offer') !== false) {
                return "Perfect! We really appreciate your understanding, and we'll make sure the discount is applied on your next visit.";
            }
            return "Great! We really appreciate your understanding, and we'll make sure this is taken care of right away.";
        }
        
        if (stripos($response, 'thank') !== false || stripos($response, 'thanks') !== false) {
            return "You're very welcome! We're so glad we could help make things right for you.";
        }
        
        if (in_array($response, ['great', 'perfect', 'good', 'better', 'satisfied', 'happy'])) {
            // Don't mention Google review here - that's handled separately
            return "That's wonderful to hear! We're so glad we could make things right for you.";
        }
        
        if (stripos($response, 'no') !== false && stripos($response, 'problem') === false) {
            return "I understand your concern. Let me see what else we can do to make this right for you.";
        }
        
        // Default: acknowledge and show care - ONE smooth sentence
        return "Thank you for letting us know. We really want to make sure you're satisfied, so please let us know how else we can help.";
    }

    protected function getFollowUpPrompt(): string
    {
        return "You are a friendly, empathetic customer service representative having a natural conversation with a customer who had an issue.

CONVERSATION CONTEXT:
- You've already acknowledged their issue and offered a solution
- Your goal is to make them feel heard, valued, and satisfied
- You want to turn their negative experience into a positive one

CONVERSATION STYLE:
- Be warm, genuine, and conversational (like talking to a friend)
- Respond naturally to what they say
- Show empathy and understanding
- Be brief but personal (1-2 sentences max)
- Make sentences flow smoothly - connect ideas naturally

RESPONSE GUIDELINES:

1. If customer says 'ok', 'okay', 'sure', 'alright', 'fine' → 
   Acknowledge positively with ONE smooth sentence: 'Perfect! We really appreciate your understanding, and we'll make sure this is taken care of right away.'

2. If customer says 'thank you', 'thanks', 'appreciate it' → 
   Respond warmly with ONE smooth sentence: 'You're very welcome! We're so glad we could help make things right for you.'

3. If customer confirms satisfaction ('yes', 'great', 'perfect', 'good', 'better', 'satisfied') → 
   Thank them with ONE smooth, complete sentence. DO NOT mention Google review in your response - that will be handled separately. Example: 'That's wonderful to hear! We're so glad we could make things right for you.'

4. If customer is still unhappy or has more concerns → 
   Show empathy: 'I understand your frustration. Let me see what else we can do to make this right for you.'

5. If customer asks questions → 
   Answer directly and helpfully

6. If customer gives short responses → 
   Keep the conversation going naturally with ONE smooth sentence

CRITICAL RULES:
- Always respond with ONE smooth, complete sentence (or maximum 2 sentences that flow naturally)
- NEVER append multiple disconnected thoughts
- NEVER mention Google reviews in your response - that's handled separately
- Always respond contextually to what the customer actually said
- Progressively improve their sentiment through warm, caring responses
- Make your response feel like a natural continuation of the conversation

Respond ONLY with your conversational message (1-2 smooth sentences), nothing else.";
    }

    protected function detectResolution(string $response): bool
    {
        $response = strtolower(trim($response));
        
        // Check for negative indicators first
        $negativeIndicators = ['no', 'not', 'still', 'worse', 'bad', 'terrible', 'awful', 'disappointed', 'unhappy', 'unsatisfied', 'problem', 'issue', 'wrong'];
        foreach ($negativeIndicators as $indicator) {
            // Check if it's a standalone word or part of a negative phrase
            if (preg_match('/\b' . preg_quote($indicator, '/') . '\b/', $response)) {
                // If it's "no problem" or "not a problem", that's positive
                if (stripos($response, 'no problem') !== false || stripos($response, 'not a problem') !== false) {
                    continue;
                }
                return false;
            }
        }
        
        // Check for positive indicators
        $positiveIndicators = ['yes', 'thank', 'thanks', 'great', 'perfect', 'fixed', 'resolved', 'good', 'better', 'appreciate', 'satisfied', 'happy', 'ok', 'okay', 'sure', 'fine', 'excellent', 'awesome', 'wonderful', 'amazing'];
        
        foreach ($positiveIndicators as $indicator) {
            if (stripos($response, $indicator) !== false) {
                return true;
            }
        }
        
        // If response is very short and doesn't contain negatives, consider it positive
        if (strlen($response) <= 10 && !preg_match('/\b(no|not|still|worse|bad)\b/', $response)) {
            return true;
        }
        
        return false;
    }

    protected function shouldRequestReview(string $response): bool
    {
        // Only request review if customer seems satisfied
        return $this->detectResolution($response);
    }

    protected function needsEscalation(string $response): bool
    {
        $response = strtolower($response);
        $escalationKeywords = ['terrible', 'awful', 'worst', 'horrible', 'unacceptable', 'furious', 'angry', 'complaint', 'manager', 'owner', 'sue', 'legal'];
        
        foreach ($escalationKeywords as $keyword) {
            if (stripos($response, $keyword) !== false) {
                return true;
            }
        }
        
        return false;
    }

    protected function callOpenAI(array $messages): array
    {
        try {
            Log::info('OpenAI API Request', [
                'messages_count' => count($messages),
                'last_message_preview' => substr($messages[count($messages) - 1]['content'] ?? '', 0, 100),
                'is_followup' => count($messages) > 2
            ]);

            $response = Http::timeout(30)->withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/chat/completions", [
                'model' => 'gpt-4o-mini', // Using cheaper model, can change to gpt-4 if needed
                'messages' => $messages,
                'temperature' => 0.8, // Increased for more natural conversation
                'max_tokens' => 200, // Reduced for more concise responses
            ]);

            if ($response->successful()) {
                $responseData = $response->json();
                
                if (!isset($responseData['choices'][0]['message']['content'])) {
                    Log::error('OpenAI API: Invalid response structure', [
                        'response' => $responseData
                    ]);
                    throw new \Exception('Invalid response from OpenAI API');
                }
                
                $content = trim($responseData['choices'][0]['message']['content']);
                
                Log::info('OpenAI API Success', [
                    'response_length' => strlen($content),
                    'preview' => substr($content, 0, 100)
                ]);
                
                // Try to parse structured response
                $parsed = $this->parseAIResponse($content);
                
                return array_merge([
                    'message' => $content,
                ], $parsed);
            }

            $errorBody = $response->body();
            Log::error('OpenAI API error', [
                'status' => $response->status(),
                'body' => $errorBody
            ]);

            // Return a more contextual fallback based on the last user message
            $lastUserMessage = $this->getLastUserMessage($messages);
            $fallbackMessage = $this->generateFallbackMessage($lastUserMessage);

            return [
                'message' => $fallbackMessage,
            ];
        } catch (\Exception $e) {
            Log::error('OpenAI API exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            $lastUserMessage = $this->getLastUserMessage($messages);
            $fallbackMessage = $this->generateFallbackMessage($lastUserMessage);

            return [
                'message' => $fallbackMessage,
            ];
        }
    }

    protected function getLastUserMessage(array $messages): string
    {
        foreach (array_reverse($messages) as $msg) {
            if (isset($msg['role']) && $msg['role'] === 'user') {
                return $msg['content'] ?? '';
            }
        }
        return '';
    }

    protected function generateFallbackMessage(string $userMessage): string
    {
        $userMessage = strtolower($userMessage);
        
        // Generate contextual fallback based on keywords
        if (stripos($userMessage, 'food') !== false || stripos($userMessage, 'meal') !== false || stripos($userMessage, 'cold') !== false || stripos($userMessage, 'hot') !== false) {
            return "Thanks for letting us know. We're very sorry about the food quality issue. We'd like to fix this right away — would you prefer a replacement or a credit toward your next order?";
        }
        
        if (stripos($userMessage, 'wait') !== false || stripos($userMessage, 'slow') !== false || stripos($userMessage, 'delay') !== false) {
            return "Thanks for letting us know. Long waits are frustrating, and we apologize. We want to make this right — we can offer a discount on your next visit.";
        }
        
        if (stripos($userMessage, 'rude') !== false || stripos($userMessage, 'staff') !== false || stripos($userMessage, 'service') !== false) {
            return "Thank you for your honest feedback. We're sorry about your experience — that's not the level of service we aim for. We're addressing this internally, and we'd like to offer you compensation on your next visit.";
        }
        
        if (stripos($userMessage, 'dirty') !== false || stripos($userMessage, 'clean') !== false) {
            return "Thanks for telling us. Cleanliness is top priority and we apologize. We've alerted our team to address this immediately. We'd like to offer you a discount on your next order.";
        }
        
        if (stripos($userMessage, 'wrong') !== false || stripos($userMessage, 'incorrect') !== false) {
            return "Sorry about that! We'll send the correct item today — no return needed. Thank you for pointing this out so we can improve.";
        }
        
        return "Thank you for your feedback. We're sorry about your experience and want to make it right. Please let us know how we can help resolve this for you.";
    }

    protected function parseAIResponse(string $content): array
    {
        // Try to extract structured data from JSON if present
        if (preg_match('/\{.*\}/s', $content, $matches)) {
            try {
                $json = json_decode($matches[0], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return $json;
                }
            } catch (\Exception $e) {
                // Ignore JSON parsing errors
            }
        }

        // Analyze sentiment from content
        $sentiment = $this->detectSentiment($content);
        
        return [
            'sentiment' => $sentiment,
            'category' => $this->detectCategory($content),
            'severity' => $this->detectSeverity($content),
        ];
    }

    protected function detectSentiment(string $text): string
    {
        $text = strtolower($text);
        
        if (stripos($text, 'sorry') !== false || stripos($text, 'apologize') !== false) {
            return 'apologetic';
        }
        
        if (stripos($text, 'thank') !== false && stripos($text, 'great') !== false) {
            return 'positive';
        }
        
        return 'neutral';
    }

    protected function detectCategory(string $text): string
    {
        $text = strtolower(trim($text));
        
        // Enhanced category detection with more specific keywords
        $categories = [
            'wait_time' => [
                'wait', 'waited', 'waiting', 'delay', 'delayed', 'slow', 'time', 'late', 'appointment', 
                'long', 'minutes', 'hours', 'hour', 'minute', 'took too long', 'took forever', 
                'slow service', 'slow delivery', 'delayed delivery', 'late delivery', 'arrived late'
            ],
            'food_quality' => [
                'cold', 'hot', 'taste', 'quality', 'wrong', 'item', 'food', 'meal', 'order', 'delivered', 
                'burnt', 'overcooked', 'undercooked', 'spoiled', 'bad food', 'tasteless', 'bland',
                'dry', 'soggy', 'stale', 'fresh', 'quality', 'tasty', 'delicious', 'awful', 'terrible',
                'disgusting', 'inedible', 'raw', 'frozen', 'warm', 'lukewarm', 'temperature'
            ],
            'service' => [
                'rude', 'staff', 'service', 'attitude', 'unfriendly', 'impolite', 'cashier', 'server', 
                'waiter', 'employee', 'worker', 'person', 'unprofessional', 'disrespectful', 'ignored',
                'helpful', 'friendly', 'polite', 'courteous', 'professional', 'customer service'
            ],
            'cleanliness' => [
                'dirty', 'clean', 'messy', 'table', 'tables', 'floor', 'bathroom', 'restroom', 
                'wiped', 'wipe', 'hygiene', 'sanitary', 'unsanitary', 'filthy', 'sticky', 'greasy',
                'trash', 'garbage', 'dishes', 'utensils', 'napkins', 'tissue', 'soap', 'toilet'
            ],
            'billing' => [
                'charge', 'charged', 'bill', 'price', 'cost', 'expensive', 'overcharged', 'payment', 
                'paid', 'receipt', 'invoice', 'check', 'total', 'amount', 'fee', 'fees', 'refund',
                'money', 'dollar', 'costly', 'cheap', 'affordable', 'pricing'
            ],
            'fulfillment_error' => [
                'wrong', 'incorrect', 'missing', 'forgot', 'didn\'t receive', 'did not receive', 
                'sent wrong', 'wrong order', 'missing item', 'forgot to', 'didn\'t get', 'did not get',
                'not included', 'left out', 'forgot my', 'missing my', 'wrong size', 'wrong color',
                'substitute', 'replacement', 'exchange'
            ],
        ];

        // Count matches for each category with word boundary matching for better accuracy
        $categoryScores = [];
        foreach ($categories as $category => $keywords) {
            $score = 0;
            foreach ($keywords as $keyword) {
                // Use word boundary matching for better accuracy
                if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/i', $text)) {
                    $score += 2; // Exact word match gets higher score
                } elseif (stripos($text, $keyword) !== false) {
                    $score += 1; // Partial match gets lower score
                }
            }
            if ($score > 0) {
                $categoryScores[$category] = $score;
            }
        }

        // Return category with highest score
        if (!empty($categoryScores)) {
            arsort($categoryScores);
            $topCategory = array_key_first($categoryScores);
            $topScore = $categoryScores[$topCategory];
            
            // Only return specific category if score is significant (at least 2 points)
            if ($topScore >= 2) {
                return $topCategory;
            }
        }

        return 'general';
    }

    protected function detectSeverity(string $text): string
    {
        $text = strtolower($text);
        
        $highSeverity = ['very', 'extremely', 'terrible', 'awful', 'horrible', 'worst'];
        $lowSeverity = ['slightly', 'minor', 'small', 'little'];

        foreach ($highSeverity as $word) {
            if (stripos($text, $word) !== false) {
                return 'high';
            }
        }

        foreach ($lowSeverity as $word) {
            if (stripos($text, $word) !== false) {
                return 'low';
            }
        }

        return 'medium';
    }

    protected function getSystemPrompt(): string
    {
        return "You are a warm, empathetic customer service representative helping a customer.

YOUR GOAL: 
- For negative feedback (1-3 stars): Turn their negative experience into a positive one through genuine care and quick solutions
- For neutral feedback (4 stars): Thank them and gently encourage them to share their experience

CONVERSATION STYLE:
- Be warm, friendly, and conversational (like talking to a friend)
- Show genuine empathy and understanding
- Be concise but personal (2-3 sentences)
- Sound natural, not robotic or template-like

RESPONSE GUIDELINES:

For WAIT TIME issues (long waits, delays, slow service):
→ 'Thanks for letting us know. Long waits are frustrating, and we sincerely apologize. We want to make this right — we can offer [20% off / a discount] on your next visit. Would that work for you?'

For FOOD QUALITY issues (cold food, wrong order, bad taste):
→ 'Thanks for letting us know. We're very sorry your meal [was cold / wasn't right]. We'd like to fix this right away — would you prefer a replacement or a credit toward your next order?'

For SERVICE/STAFF issues (rude staff, poor service):
→ 'Thank you for your honest feedback. We're sorry about your experience — that's not the level of service we aim for. We're addressing this internally, and we'd like to offer you [compensation] on your next visit.'

For CLEANLINESS issues (dirty tables, messy):
→ 'Thanks for telling us. Cleanliness is top priority and we apologize. We've alerted our team to address this immediately. We'd like to offer [15% off] your next order.'

For FULFILLMENT ERRORS (wrong item, missing items):
→ 'Sorry about that! We'll send the correct item today — no return needed. Thank you for pointing this out so we can improve.'

For 4 STAR FEEDBACK (neutral/positive):
→ 'Thank you for your feedback! We're glad you had a good experience. If you're comfortable, we'd love it if you could share your experience on Google — it really helps us!'

IMPORTANT:
- Always acknowledge their specific issue
- For 1-3 stars: Offer a concrete solution and end with a question
- For 4 stars: Thank them and gently ask for a review
- Be warm and genuine, not generic
- Progressively improve their sentiment through caring responses

Respond ONLY with your conversational message, nothing else.";
    }

    protected function buildFeedbackMessage(BusinessReviewFeedback $feedback): string
    {
        $message = "A customer left feedback with a {$feedback->stars}/5 star rating.\n\n";
        
        if ($feedback->feedback) {
            $message .= "Customer feedback: \"{$feedback->feedback}\"\n\n";
        }
        
        $message .= "Generate a personalized, empathetic recovery message that:\n";
        $message .= "1. Acknowledges their concern sincerely\n";
        $message .= "2. Offers a specific solution based on the issue type\n";
        $message .= "3. Shows genuine care and willingness to fix the problem\n";
        $message .= "4. Is concise (2-3 sentences) and professional\n\n";
        
        $message .= "Respond ONLY with the recovery message text, nothing else.";

        return $message;
    }
}

