<?php

namespace App\Support\AI;

use Illuminate\Support\Facades\Log;

class CategoryDetectionService
{
    /**
     * Comprehensive category mapping with keywords
     */
    protected array $categoryKeywords = [];

    public function __construct()
    {
        $this->initializeCategoryKeywords();
    }

    /**
     * Detect the most fitting category from customer feedback
     */
    public function detectCategory(string $feedback): string
    {
        $text = strtolower(trim($feedback));
        
        if (empty($text)) {
            return 'general';
        }

        $categoryScores = [];

        foreach ($this->categoryKeywords as $category => $keywords) {
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
                Log::info('Category detected', [
                    'category' => $topCategory,
                    'score' => $topScore,
                    'feedback_preview' => substr($feedback, 0, 100)
                ]);
                
                return $topCategory;
            }
        }

        return 'general';
    }

    /**
     * Get all available categories
     */
    public function getAllCategories(): array
    {
        return array_keys($this->categoryKeywords);
    }

    /**
     * Get keywords for a specific category
     */
    public function getCategoryKeywords(string $category): array
    {
        return $this->categoryKeywords[$category] ?? [];
    }

    /**
     * Initialize comprehensive category keywords mapping
     */
    protected function initializeCategoryKeywords(): void
    {
        $this->categoryKeywords = [
            // 1. SERVICE & SUPPORT
            'service_support' => [
                'customer service', 'customer support', 'support', 'service', 'responsiveness', 'responsive',
                'professionalism', 'professional', 'attitude', 'expertise', 'support availability', 'communication',
                'follow-up', 'follow up', 'courtesy', 'accuracy', 'information', 'issue resolution', 'resolution',
                'delay', 'delayed', 'knowledge gap', 'staff availability', 'escalation', 'timeliness',
                'appointment', 'punctuality', 'punctual', 'queue time', 'waiting', 'call center', 'email support',
                'chat support', 'sms support', 'whatsapp', 'ticketing', 'ticket', 'multi-language', 'miscommunication',
                'staff misconduct', 'rude', 'rudeness', 'unhelpful', 'ignoring', 'ignored', 'training',
                'false information', 'unauthorized', 'lack of ownership', 'empathy', 'broken promise', 'promise',
                'unavailable', 'unavailability', 'no response', 'not responding'
            ],

            // 2. PRODUCT QUALITY
            'product_quality' => [
                'product quality', 'quality', 'durability', 'durable', 'material', 'defect', 'defective',
                'malfunction', 'malfunctioning', 'broken', 'incorrect product', 'incomplete', 'damage',
                'damaged', 'packaging', 'functionality', 'functional', 'usability', 'usable', 'not as described',
                'missing parts', 'craftsmanship', 'design', 'quality control', 'wrong size', 'wrong color',
                'wrong model', 'expired', 'counterfeit', 'fake', 'safety', 'integration', 'configuration',
                'compatibility', 'performance', 'low performance', 'recall', 'warranty', 'outdated', 'old'
            ],

            // 3. PRICING & BILLING
            'pricing_billing' => [
                'price', 'pricing', 'cost', 'overcharge', 'overcharged', 'undercharge', 'fee', 'fees',
                'hidden cost', 'invoice', 'billing', 'bill', 'duplicate charge', 'refund', 'refund delay',
                'partial refund', 'no refund', 'subscription', 'auto-renewal', 'renewal', 'payment processing',
                'payment declined', 'declined', 'gateway error', 'currency', 'tax', 'billing communication',
                'missing invoice', 'unauthorized charge', 'discount', 'price mismatch', 'promo code', 'promotion',
                'credit balance', 'rebate', 'loyalty points', 'chargeback', 'dispute', 'payment method'
            ],

            // 4. DELIVERY & LOGISTICS
            'delivery_logistics' => [
                'delivery', 'delivered', 'late delivery', 'early delivery', 'lost package', 'package lost',
                'damaged package', 'wrong package', 'missing items', 'poor packaging', 'driver', 'delivery driver',
                'track package', 'tracking', 'track', 'carrier delay', 'delivery attempt', 'failed delivery',
                'wrong address', 'delivery slot', 'curbside pickup', 'pickup', 'warehouse', 'customs delay',
                'international shipping', 'incomplete delivery', 'redelivery', 'delivery fee', 'shipment stuck',
                'temperature', 'fragile', 'courier', 'return shipment', 'lost return'
            ],

            // 5. FOOD & RESTAURANT
            'food_restaurant' => [
                'food quality', 'food', 'taste', 'tasty', 'tasteless', 'portion size', 'freshness', 'fresh',
                'temperature', 'cold food', 'hot food', 'presentation', 'menu', 'variety', 'seasonal',
                'nutritional', 'allergen', 'allergy', 'contamination', 'undercooked', 'overcooked', 'raw',
                'stale', 'wrong order', 'missing order', 'slow preparation', 'dining experience', 'table',
                'cleanliness', 'staff friendliness', 'kitchen hygiene', 'noise', 'ambience', 'lighting',
                'seating', 'reservation', 'hostess', 'waiter', 'server', 'takeout', 'delivery time',
                'drive-thru', 'beverage', 'drink', 'bar service', 'food safety', 'mislabeling', 'halal',
                'vegetarian', 'vegan', 'alcohol', 'buffet', 'overpriced', 'upselling', 'parking'
            ],

            // 6. HOSPITALITY & HOTELS
            'hospitality_hotels' => [
                'hotel', 'room', 'cleanliness', 'comfort', 'temperature', 'bed', 'bedding', 'bathroom',
                'shower', 'pressure', 'hot water', 'tv', 'entertainment', 'wifi', 'wi-fi', 'internet',
                'minibar', 'room service', 'housekeeping', 'front desk', 'check-in', 'check-out', 'booking',
                'double booking', 'overbooking', 'keycard', 'key card', 'hospitality staff', 'concierge',
                'luggage', 'ambience', 'noise', 'charges', 'spa', 'gym', 'pool', 'pest', 'safety', 'smell',
                'odor', 'parking', 'shuttle'
            ],

            // 7. HEALTHCARE & MEDICAL
            'healthcare_medical' => [
                'appointment', 'scheduling', 'doctor', 'nurse', 'diagnosis', 'treatment', 'waiting time',
                'medication', 'medicine', 'lab result', 'billing', 'insurance', 'facility', 'cleanliness',
                'equipment', 'maintenance', 'emergency', 'response', 'privacy', 'medical record', 'follow-up',
                'follow up care', 'miscommunication', 'reception', 'prescription', 'negligence', 'test equipment',
                'bed', 'hospital food', 'surgery', 'surgical', 'pain management', 'discharge', 'ambulance',
                'nurse availability', 'staff overload'
            ],

            // 8. BEAUTY & WELLNESS
            'beauty_wellness' => [
                'beauty', 'wellness', 'salon', 'spa', 'technician', 'skill', 'cleanliness', 'appointment delay',
                'haircut', 'hair cut', 'massage', 'skin treatment', 'allergy', 'nail service', 'waxing',
                'makeup', 'equipment hygiene', 'price mismatch', 'incorrect style', 'booking', 'overbooking',
                'sanitization', 'sanitation'
            ],

            // 9. AUTOMOTIVE
            'automotive' => [
                'mechanic', 'repair', 'parts', 'availability', 'diagnosis', 'pickup', 'billing transparency',
                'warranty', 'oil change', 'tire', 'car wash', 'paint job', 'interior cleaning', 'noise',
                'safety', 'inspection', 'roadside assistance', 'battery', 'alignment', 'service appointment'
            ],

            // 10. REAL ESTATE / PROPERTY MANAGEMENT
            'real_estate' => [
                'leasing', 'lease', 'move-in', 'move-out', 'rent', 'billing', 'maintenance', 'repair',
                'property', 'cleanliness', 'amenities', 'safety', 'security', 'parking', 'neighbor', 'noise',
                'landlord', 'agent', 'advertising', 'deposit', 'refund', 'pest', 'water', 'heating', 'cooling',
                'elevator', 'mailbox'
            ],

            // 11. EDUCATION / TRAINING
            'education_training' => [
                'instructor', 'teacher', 'class', 'management', 'course materials', 'curriculum', 'e-learning',
                'online learning', 'technical issues', 'assignment', 'feedback', 'exam', 'test', 'registration',
                'tuition', 'fees', 'campus', 'safety', 'library', 'classroom', 'cleanliness', 'student support',
                'portal', 'online portal'
            ],

            // 12. SOFTWARE / IT / TECH
            'software_it_tech' => [
                'app', 'application', 'crash', 'crashed', 'performance', 'slow', 'login', 'log in', 'payment error',
                'api', 'integration', 'bug', 'database error', 'ui', 'ux', 'user interface', 'feature',
                'security', 'downtime', 'server', 'latency', 'cloud storage', 'sync', 'synchronization',
                'module', 'malfunction', 'subscription', 'deployment', 'version', 'conflict', 'documentation',
                'ai', 'machine learning', 'ml', 'model accuracy', 'email delivery', 'twilio', 'webhook',
                'authentication', 'sms delivery', 'push notification', 'backup', 'loading', 'slow loading'
            ],

            // 13. GOVERNMENT / PUBLIC SERVICE
            'government_public_service' => [
                'passport', 'id', 'identification', 'registration', 'delay', 'queue', 'document', 'error',
                'miscommunication', 'government staff', 'processing', 'delay', 'portal', 'online portal',
                'payment', 'appointment', 'facility', 'cleanliness', 'missing documents', 'records', 'incorrect',
                'compliance', 'data privacy', 'privacy'
            ],

            // 14. FINANCIAL SERVICES
            'financial_services' => [
                'loan', 'processing', 'credit card', 'fraud', 'account', 'access', 'atm', 'wire transfer',
                'interest rate', 'mortgage', 'payment reversal', 'kyc', 'know your customer', 'overdraft',
                'fee', 'account freeze', 'insurance', 'claim', 'delay', 'charges', 'incorrect', 'online banking',
                'support', 'app crash', 'check deposit', 'investment', 'platform'
            ],

            // 15. EVENTS & ENTERTAINMENT
            'events_entertainment' => [
                'event', 'organization', 'ticketing', 'ticket', 'seating', 'lighting', 'sound', 'venue',
                'cleanliness', 'parking', 'performer', 'show', 'delay', 'staff', 'behavior', 'food',
                'crowd', 'management', 'safety', 'booking', 'error', 'refund', 'merchandise'
            ],

            // 16. MANUFACTURING / INDUSTRY
            'manufacturing_industry' => [
                'defect', 'defect rate', 'shipment', 'delay', 'assembly', 'quality', 'material failure',
                'calibration', 'qa', 'quality assurance', 'mechanical failure', 'machinery', 'downtime',
                'worker safety', 'inventory', 'error', 'specifications', 'wrong', 'production delay',
                'packaging', 'compliance', 'missing parts', 'bulk', 'lead time'
            ],

            // 17. LOGISTICS / SUPPLY CHAIN
            'logistics_supply_chain' => [
                'freight', 'delay', 'container', 'misrouting', 'port', 'hold', 'customs', 'paperwork',
                'warehouse', 'damage', 'bulk shipment', 'loss', 'temperature control', 'manifest', 'incorrect',
                'transit', 'damage', 'loading', 'unloading', 'driver', 'attitude', 'compliance', 'error',
                'tracking', 'failure', 'updates', 'lack of', 'stock level'
            ],

            // 18. MARKETING SERVICES
            'marketing_services' => [
                'ad campaign', 'advertising', 'campaign', 'performance', 'targeting', 'wrong', 'creative',
                'quality', 'strategy', 'misalignment', 'reporting', 'kpi', 'key performance indicator',
                'miscommunication', 'pricing model', 'clarity', 'social media', 'management', 'seo',
                'search engine optimization', 'branding', 'accuracy', 'content', 'quality'
            ],

            // 19. E-COMMERCE SPECIFIC
            'ecommerce' => [
                'checkout', 'cart', 'promo code', 'promotion', 'shipping', 'calculation', 'product info',
                'information', 'missing', 'image', 'misleading', 'wrong variant', 'review', 'moderation',
                'return', 'exchange', 'seller', 'misconduct', 'packaging', 'order status', 'cod', 'cash on delivery',
                'stock', 'availability', 'handling fees', 'delivery notification'
            ],

            // 20. SECURITY & PRIVACY
            'security_privacy' => [
                'data breach', 'breach', 'unauthorized access', 'password', 'reset', 'two-factor', '2fa',
                'authentication', 'phishing', 'suspicious login', 'compliance', 'violation', 'privacy',
                'user privacy', 'misuse', 'data'
            ],

            // 21. TELECOMMUNICATIONS
            'telecommunications' => [
                'call drop', 'dropped call', 'network', 'coverage', '4g', '5g', 'speed', 'sim', 'recharge',
                'billing error', 'porting', 'voicemail', 'customer care', 'roaming'
            ],

            // 22. UTILITIES
            'utilities' => [
                'outage', 'power outage', 'electricity', 'gas', 'water', 'meter', 'issue', 'high bill',
                'payment problem', 'connection', 'delay', 'disconnection', 'leak', 'breakage', 'pressure',
                'water quality', 'technician', 'technical'
            ],

            // 23. AIRLINES & TRAVEL
            'airlines_travel' => [
                'flight', 'delay', 'cancellation', 'cancelled', 'boarding', 'baggage', 'missing', 'ticketing',
                'ticket', 'seat', 'comfort', 'cabin crew', 'airport', 'process', 'lounge', 'service',
                'food quality', 'check-in', 'online', 'rebooking', 'travel insurance', 'insurance'
            ],

            // 24. PET SERVICES
            'pet_services' => [
                'pet', 'grooming', 'vet', 'veterinary', 'safety', 'vaccination', 'boarding', 'facility',
                'staff behavior', 'price', 'concern', 'cleanliness'
            ],

            // 25. CLEANING & HOME SERVICES
            'cleaning_home_services' => [
                'cleaning', 'quality', 'technician', 'professionalism', 'equipment', 'timeliness', 'timely',
                'miscommunication', 'safety', 'concern', 'property damage', 'pricing', 'rework', 'required'
            ],

            // 26. CONSTRUCTION & RENOVATION
            'construction_renovation' => [
                'construction', 'renovation', 'material', 'quality', 'workmanship', 'safety', 'standards',
                'project delay', 'cost overrun', 'design', 'changes', 'finishing', 'poor', 'structural',
                'issues', 'compliance', 'measurements', 'incorrect'
            ],

            // 27. LEGAL & CONSULTING
            'legal_consulting' => [
                'legal', 'lawyer', 'attorney', 'case', 'handling', 'communication', 'delay', 'updates',
                'documentation', 'fees', 'transparency', 'contract', 'error', 'strategy', 'misalignment',
                'confidentiality', 'misrepresentation'
            ],

            // 28. HUMAN RESOURCES / RECRUITMENT
            'hr_recruitment' => [
                'hiring', 'recruitment', 'recruit', 'interview', 'miscommunication', 'job description',
                'offer', 'delay', 'salary', 'processing', 'workplace', 'environment', 'conflict', 'resolution',
                'training', 'quality'
            ],

            // 29. BANKING / CRYPTO / FINTECH
            'banking_crypto_fintech' => [
                'kyc', 'crypto', 'cryptocurrency', 'withdrawal', 'delay', 'exchange', 'error', 'wallet',
                'sync', 'problem', 'transfer', 'delay', 'gas fee', 'trading', 'platform', 'bug', 'verification',
                'delay', 'fraud', 'alert'
            ],

            // 30. GAMING & ENTERTAINMENT APPS
            'gaming_entertainment_apps' => [
                'gaming', 'game', 'matchmaking', 'server lag', 'lag', 'cheating', 'hacking', 'hack',
                'playability', 'payment', 'issue', 'dlc', 'downloadable content', 'reward', 'system',
                'balance', 'update', 'problem'
            ],

            // 31. SOCIAL MEDIA PLATFORMS
            'social_media_platforms' => [
                'social media', 'account', 'suspension', 'suspended', 'report', 'system', 'shadowban',
                'shadow ban', 'viral', 'content', 'monetization', 'ad account', 'page', 'restriction',
                'verification', 'problem'
            ],

            // 32. RARE / SPECIALTY CATEGORIES
            'rare_specialty' => [
                'sustainability', 'animal welfare', 'ethical', 'practices', 'carbon footprint', 'cultural',
                'sensitivity', 'accessibility', 'inclusivity', 'environmental', 'cleanliness', 'community',
                'impact', 'religious', 'sensitivity', 'ai model', 'bias', 'deepfake', 'robotics', 'robot',
                'drone', 'delivery', 'nft', 'blockchain', 'iot', 'internet of things', 'smart home',
                'integration', 'biometric', 'error', 'digital identity', 'metaverse', 'virtual event',
                'ar', 'vr', 'augmented reality', 'virtual reality', 'voice assistant', 'autonomous',
                'vehicle', '3d printing', 'innovative', 'tech', 'failure'
            ],
        ];
    }
}

