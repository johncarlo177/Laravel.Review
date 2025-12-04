<?php

namespace App\Support\AI;

class CategorySentenceGenerator
{
    /**
     * Generate example sentences for a given category
     */
    public function generateSentences(string $category, int $count = 5): array
    {
        $sentences = $this->getCategorySentences($category);
        
        if (empty($sentences)) {
            return [];
        }

        // Return random sentences up to the requested count
        shuffle($sentences);
        return array_slice($sentences, 0, min($count, count($sentences)));
    }

    /**
     * Get all example sentences for a category
     */
    public function getAllSentences(string $category): array
    {
        return $this->getCategorySentences($category);
    }

    /**
     * Get example sentences for all categories
     */
    public function getAllCategorySentences(): array
    {
        $allSentences = [];
        $categories = [
            'service_support', 'product_quality', 'pricing_billing', 'delivery_logistics',
            'food_restaurant', 'hospitality_hotels', 'healthcare_medical', 'beauty_wellness',
            'automotive', 'real_estate', 'education_training', 'software_it_tech',
            'government_public_service', 'financial_services', 'events_entertainment',
            'manufacturing_industry', 'logistics_supply_chain', 'marketing_services',
            'ecommerce', 'security_privacy', 'telecommunications', 'utilities',
            'airlines_travel', 'pet_services', 'cleaning_home_services',
            'construction_renovation', 'legal_consulting', 'hr_recruitment',
            'banking_crypto_fintech', 'gaming_entertainment_apps', 'social_media_platforms',
            'rare_specialty'
        ];

        foreach ($categories as $category) {
            $allSentences[$category] = $this->getCategorySentences($category);
        }

        return $allSentences;
    }

    /**
     * Get sentences for a specific category
     */
    protected function getCategorySentences(string $category): array
    {
        $sentences = [
            'service_support' => [
                "The customer service was terrible - no one responded to my emails for days.",
                "Staff was very rude and unhelpful when I asked for assistance.",
                "I waited over an hour in the queue before someone helped me.",
                "The support team gave me false information about the product.",
                "Customer service staff ignored my complaints completely.",
                "The call center kept me on hold for 45 minutes.",
                "Staff lacked professionalism and empathy during my issue.",
                "No one followed up on my complaint as promised.",
                "The support team was unavailable when I needed help most.",
                "I experienced significant delays in getting a response to my inquiry."
            ],

            'product_quality' => [
                "The product arrived damaged and completely broken.",
                "The item I received was not as described in the listing.",
                "Product quality is very poor - it broke after just one use.",
                "The wrong size was sent despite my order clearly stating the correct size.",
                "Missing parts in the package - product is incomplete.",
                "The product expired before I even received it.",
                "Material quality is terrible - feels cheap and flimsy.",
                "Product has multiple defects and doesn't function properly.",
                "The color I received doesn't match what was shown online.",
                "Safety concerns with this product - seems dangerous to use."
            ],

            'pricing_billing' => [
                "I was overcharged on my bill - charged twice for the same item.",
                "Hidden fees were added without my knowledge or consent.",
                "Refund is taking too long - it's been over a month.",
                "The invoice I received is incorrect with wrong amounts.",
                "My promo code didn't work at checkout despite being valid.",
                "Unauthorized charges appeared on my credit card statement.",
                "Subscription auto-renewed without my permission.",
                "Payment was declined even though I have sufficient funds.",
                "I was charged the wrong price - price mismatch on receipt.",
                "Tax calculation seems incorrect on my invoice."
            ],

            'delivery_logistics' => [
                "My package arrived 2 weeks late - very delayed delivery.",
                "Package was lost in transit and never arrived.",
                "The delivery driver was rude and unprofessional.",
                "I can't track my package - tracking number not working.",
                "Package arrived damaged due to poor packaging.",
                "Wrong address delivery - package sent to neighbor.",
                "Delivery attempt failed but no one called to reschedule.",
                "Missing items from my order - incomplete delivery.",
                "Shipment has been stuck in customs for weeks.",
                "Temperature-sensitive items arrived spoiled due to poor handling."
            ],

            'food_restaurant' => [
                "Food was cold when it arrived - completely inedible.",
                "Wrong order delivered - got someone else's meal.",
                "Food quality was terrible - tasted stale and bland.",
                "Portion size was much smaller than expected.",
                "Food was undercooked and unsafe to eat.",
                "The restaurant was dirty with poor table cleanliness.",
                "Waiter was unresponsive and ignored our requests.",
                "Reservation was lost - no table available when we arrived.",
                "Food safety violation - found hair in my meal.",
                "Menu mislabeling - item marked vegetarian contained meat."
            ],

            'hospitality_hotels' => [
                "Room was dirty and not cleaned properly.",
                "WiFi didn't work in my room - no internet access.",
                "Check-in took forever - waited over an hour.",
                "Room temperature was unbearable - AC not working.",
                "Bed was uncomfortable and bedding was dirty.",
                "No hot water in the shower - cold water only.",
                "Double booking - room was already occupied.",
                "Front desk staff was unhelpful and rude.",
                "Hotel had pest issues - saw bugs in the room.",
                "Pool was dirty and not maintained properly."
            ],

            'healthcare_medical' => [
                "Doctor was dismissive and didn't listen to my concerns.",
                "Appointment scheduling was a nightmare - long wait times.",
                "Prescription error - wrong medication was prescribed.",
                "Lab results were delayed for over a week.",
                "Medical records had errors with incorrect information.",
                "Nurse was unavailable when I needed assistance.",
                "Waiting time in reception was over 2 hours.",
                "Billing issues - charged for services not received.",
                "Privacy concerns - medical information shared inappropriately.",
                "Follow-up care was poor - no one checked on my recovery."
            ],

            'beauty_wellness' => [
                "Haircut was completely wrong - not what I asked for.",
                "Salon cleanliness was poor - equipment not sanitized.",
                "Appointment was delayed by over an hour.",
                "Technician lacked skill - poor quality service.",
                "Massage was terrible - no technique or pressure.",
                "Product allergy - had reaction to treatment products.",
                "Price mismatch - charged more than quoted.",
                "Booking issues - appointment was double-booked.",
                "Equipment hygiene concerns - tools not properly cleaned.",
                "Incorrect style delivered - didn't match my request."
            ],

            'automotive' => [
                "Mechanic did a poor job - car still has the same problem.",
                "Parts were not available - repair delayed for weeks.",
                "Diagnosis was wrong - fixed the wrong thing.",
                "Billing was not transparent - unexpected charges added.",
                "Vehicle pickup took too long - waited hours.",
                "Noise after repair - something still wrong with the car.",
                "Safety concerns - repair doesn't seem safe.",
                "Warranty work was denied incorrectly.",
                "Oil change was done incorrectly - leak developed.",
                "Service appointment was mishandled - no record of booking."
            ],

            'real_estate' => [
                "Maintenance requests are ignored - no response for weeks.",
                "Property cleanliness is terrible - building not maintained.",
                "Landlord is unresponsive and has poor attitude.",
                "Deposit refund is being delayed unnecessarily.",
                "Pest problems in the building - not addressed.",
                "Heating and cooling issues - apartment too hot/cold.",
                "Elevator is broken and not being fixed.",
                "False advertising - property not as described.",
                "Parking availability is a major issue.",
                "Neighbor noise complaints not being handled."
            ],

            'education_training' => [
                "Instructor quality is poor - not knowledgeable about subject.",
                "Course materials are outdated and not useful.",
                "Technical issues with online learning platform.",
                "Assignment feedback was delayed and unhelpful.",
                "Registration process was confusing and problematic.",
                "Tuition fees are incorrect - overcharged.",
                "Campus safety concerns - security issues.",
                "Library experience was poor - resources unavailable.",
                "Classroom cleanliness is terrible.",
                "Student support services are unresponsive."
            ],

            'software_it_tech' => [
                "App keeps crashing - completely unusable.",
                "Performance is terrible - app is very slow.",
                "Login problems - can't access my account.",
                "Payment errors - transactions failing repeatedly.",
                "API failures causing integration issues.",
                "Bug in the system - feature not working correctly.",
                "Database errors preventing data access.",
                "UI/UX is confusing and poorly designed.",
                "Security concern - suspicious activity detected.",
                "Downtime issues - service unavailable frequently."
            ],

            'government_public_service' => [
                "Passport service was delayed for months.",
                "Queue issues - waited hours for basic service.",
                "Document errors - incorrect information on my ID.",
                "Government staff was rude and unprofessional.",
                "Processing delay - application taking too long.",
                "Online portal not working - can't submit forms.",
                "Payment issue - transaction failed multiple times.",
                "Appointment mismanagement - time slot not honored.",
                "Public facility cleanliness is terrible.",
                "Missing documents - paperwork lost in system."
            ],

            'financial_services' => [
                "Loan processing is taking too long - delayed for weeks.",
                "Credit card issues - unauthorized charges appeared.",
                "Fraud concern - suspicious transactions on my account.",
                "Account access issue - can't log into online banking.",
                "ATM problem - machine ate my card.",
                "Wire transfer delay - money not received.",
                "Interest rate concerns - charges seem incorrect.",
                "KYC issues - verification process too complicated.",
                "Account freeze without explanation.",
                "Insurance claim delay - taking months to process."
            ],

            'events_entertainment' => [
                "Event organization was poor - disorganized and chaotic.",
                "Ticketing issues - wrong seats assigned.",
                "Seating problems - seats were uncomfortable.",
                "Lighting and sound quality was terrible.",
                "Venue cleanliness was poor - dirty facilities.",
                "Parking was a nightmare - no spaces available.",
                "Show delay - performance started 30 minutes late.",
                "Staff behavior was unprofessional and rude.",
                "Food at event was terrible quality.",
                "Safety issues - overcrowded and unsafe conditions."
            ],

            'manufacturing_industry' => [
                "Product defect rate is too high - many faulty items.",
                "Shipment delay - production behind schedule.",
                "Assembly quality is poor - products falling apart.",
                "Material failure - parts breaking under normal use.",
                "Calibration issue - equipment not working correctly.",
                "QA failure - defective products passed inspection.",
                "Mechanical failure - machinery breaking down frequently.",
                "Inventory error - wrong items shipped.",
                "Wrong specifications - product doesn't match requirements.",
                "Production delay - orders not completed on time."
            ],

            'logistics_supply_chain' => [
                "Freight delay - shipment stuck in transit.",
                "Container misrouting - sent to wrong destination.",
                "Port hold issues - customs clearance delayed.",
                "Customs paperwork issue - documentation incomplete.",
                "Warehouse damage - items damaged during storage.",
                "Bulk shipment loss - entire order missing.",
                "Temperature control failure - goods spoiled.",
                "Incorrect manifest - wrong items listed.",
                "Transit damage - products arrived broken.",
                "Tracking failure - can't locate shipment."
            ],

            'marketing_services' => [
                "Ad campaign performance is terrible - no results.",
                "Wrong targeting - ads shown to wrong audience.",
                "Creative quality is poor - unprofessional design.",
                "Strategy misalignment - campaign doesn't match goals.",
                "Reporting issues - data not accurate.",
                "KPI miscommunication - unclear performance metrics.",
                "Pricing model not clear - confusing fee structure.",
                "Social media management is poor - posts unprofessional.",
                "SEO performance is terrible - no traffic increase.",
                "Content quality is low - poorly written materials."
            ],

            'ecommerce' => [
                "Checkout issue - payment not processing.",
                "Cart problem - items disappearing.",
                "Promo code not working despite being valid.",
                "Shipping calculation error - wrong cost charged.",
                "Product info missing - no description or details.",
                "Image misleading - product looks different in person.",
                "Wrong variant sent - ordered blue, received red.",
                "Return/exchange issue - process too complicated.",
                "Seller misconduct - unprofessional behavior.",
                "Order status not updating - can't track shipment."
            ],

            'security_privacy' => [
                "Data breach concern - suspicious activity detected.",
                "Unauthorized access to my account.",
                "Password reset not working - can't recover account.",
                "Two-factor authentication issues - not receiving codes.",
                "Phishing attempt - suspicious emails received.",
                "Suspicious login detected from unknown location.",
                "Compliance violation - privacy policy not followed.",
                "User privacy concern - data shared inappropriately.",
                "Misuse of data - information used without consent."
            ],

            'telecommunications' => [
                "Call drops constantly - can't have a conversation.",
                "Network coverage is terrible - no signal in my area.",
                "4G/5G speed is very slow - barely works.",
                "SIM issues - card not working properly.",
                "Recharge problems - payment not processing.",
                "Billing errors - charged for services not used.",
                "Porting issues - number transfer delayed.",
                "Voicemail problems - messages not accessible.",
                "Customer care is unresponsive - no help available.",
                "Roaming issues - can't use phone abroad."
            ],

            'utilities' => [
                "Power outage lasting for hours - no electricity.",
                "Meter issue - readings seem incorrect.",
                "High bill - charges much higher than normal.",
                "Payment problem - can't process payment.",
                "Connection delay - service not activated on time.",
                "Disconnection issue - service cut off incorrectly.",
                "Water leak - not being fixed promptly.",
                "Pressure issue - water pressure too low.",
                "Water quality concerns - water tastes bad.",
                "Technician issue - repair not done properly."
            ],

            'airlines_travel' => [
                "Flight delay - departure pushed back 4 hours.",
                "Flight cancellation - no alternative provided.",
                "Boarding issues - chaotic and disorganized.",
                "Missing baggage - luggage lost in transit.",
                "Ticketing issue - wrong seat assigned.",
                "Seat comfort terrible - very cramped.",
                "Cabin crew behavior was rude and unprofessional.",
                "Airport process was slow - long security lines.",
                "Lounge service was poor - facilities dirty.",
                "Food quality on flight was terrible."
            ],

            'pet_services' => [
                "Grooming service was poor - pet not properly groomed.",
                "Vet service was unprofessional - misdiagnosis.",
                "Pet safety concern - pet injured during service.",
                "Vaccination issues - wrong vaccine given.",
                "Boarding facility was dirty and unsafe.",
                "Staff behavior was unprofessional with my pet.",
                "Price concerns - charged more than quoted.",
                "Cleanliness issues - facility not maintained."
            ],

            'cleaning_home_services' => [
                "Cleaning quality was poor - house still dirty.",
                "Technician professionalism was lacking - unprofessional behavior.",
                "Equipment used was old and ineffective.",
                "Timeliness issue - arrived 2 hours late.",
                "Miscommunication - didn't understand what I wanted.",
                "Safety concerns - damaged my property.",
                "Pricing issues - charged more than agreed.",
                "Rework required - job not done correctly."
            ],

            'construction_renovation' => [
                "Material quality is poor - using cheap materials.",
                "Workmanship is terrible - shoddy construction.",
                "Safety standards not met - unsafe conditions.",
                "Project delay - weeks behind schedule.",
                "Cost overrun - expenses much higher than quoted.",
                "Design changes not communicated properly.",
                "Poor finishing - work looks unprofessional.",
                "Structural issues - concerns about building integrity.",
                "Compliance issues - not following building codes.",
                "Incorrect measurements - dimensions are wrong."
            ],

            'legal_consulting' => [
                "Case handling was poor - lawyer not responsive.",
                "Communication issues - no updates on my case.",
                "Delay in updates - weeks without hearing anything.",
                "Documentation issues - errors in legal documents.",
                "Fees transparency - unclear billing structure.",
                "Contract errors - mistakes in agreement.",
                "Strategy misalignment - approach doesn't match goals.",
                "Confidentiality concerns - information shared inappropriately.",
                "Misrepresentation - lawyer made false promises."
            ],

            'hr_recruitment' => [
                "Hiring process was unprofessional and disorganized.",
                "Interview handling was poor - interviewer was rude.",
                "Miscommunication - job description didn't match role.",
                "Offer delay - took weeks to receive offer letter.",
                "Salary processing issues - payment delayed.",
                "Workplace environment concerns - toxic culture.",
                "Conflict resolution was poor - issues not addressed.",
                "Training quality was terrible - no proper onboarding."
            ],

            'banking_crypto_fintech' => [
                "KYC issues - verification process too complicated.",
                "Crypto withdrawal delay - funds stuck for weeks.",
                "Exchange error - wrong amount credited.",
                "Wallet sync problem - balance not updating.",
                "Transfer delay - transaction taking too long.",
                "Gas fees concern - charges too high.",
                "Trading platform bug - orders not executing.",
                "Verification delay - account not verified.",
                "Fraud alerts - false positives blocking transactions."
            ],

            'gaming_entertainment_apps' => [
                "Matchmaking issues - can't find games.",
                "Server lag - game is unplayable.",
                "Cheating/hacking - game is full of cheaters.",
                "Playability issues - game crashes constantly.",
                "Payment issues - purchases not processing.",
                "DLC problems - downloadable content not working.",
                "Reward system broken - not receiving rewards.",
                "Game balance issues - gameplay is unfair.",
                "Update problems - game won't update."
            ],

            'social_media_platforms' => [
                "Account suspension - banned without reason.",
                "Report system issues - reports not being processed.",
                "Shadowban concerns - content not being seen.",
                "Viral content issue - post removed incorrectly.",
                "Monetization problems - payments not processing.",
                "Ad account issues - ads not running.",
                "Page restrictions - page limited without explanation.",
                "Verification problems - can't verify my account."
            ],

            'rare_specialty' => [
                "Sustainability concern - company not environmentally responsible.",
                "Animal welfare issues - poor treatment of animals.",
                "Ethical practices concern - business practices questionable.",
                "Carbon footprint - company not reducing emissions.",
                "Cultural sensitivity - offensive content or behavior.",
                "Accessibility issues - not accessible for disabled users.",
                "Inclusivity concerns - not welcoming to all groups.",
                "Environmental cleanliness - facility polluting environment.",
                "Community impact - negative effects on local community.",
                "Religious sensitivity - disrespectful to religious beliefs.",
                "AI model bias - algorithm showing discrimination.",
                "Deepfake concerns - fake content being used.",
                "Robotics issue - robot malfunctioning.",
                "Drone delivery issue - delivery failed.",
                "NFT/Blockchain issues - transaction problems.",
                "IoT device issues - smart device not working.",
                "Smart home integration problems - devices not connecting.",
                "Biometric errors - fingerprint/face recognition failing.",
                "Digital identity issues - verification problems.",
                "Metaverse experience problems - virtual world not working.",
                "Virtual event problems - online event had technical issues.",
                "AR/VR experience issues - augmented/virtual reality not working.",
                "Voice assistant problem - AI assistant not responding.",
                "Autonomous vehicle issue - self-driving car malfunctioned.",
                "3D printing issues - printer not working correctly.",
                "Innovative tech failure - new technology not functioning."
            ]
        ];

        return $sentences[$category] ?? [];
    }
}

