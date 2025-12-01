<?php

namespace App\Support\Notifications;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class AdminNotificationService
{
    private string $adminEmail;
    private string $adminPhone;
    private string $twilioAccountSid;
    private string $twilioAuthToken;
    private ?string $twilioFromNumber = null;

    public function __construct()
    {
        $this->adminEmail = config('services.admin.email', 'inmc050817@gmail.com');
        $this->adminPhone = config('services.admin.phone', '+18339382932');
        $this->twilioAccountSid = config('services.twilio.account_sid', '');
        $this->twilioAuthToken = config('services.twilio.auth_token', '');
        $this->twilioFromNumber = config('services.twilio.from_number');
    }

    /**
     * Send email and SMS notification to admin about high severity feedback
     */
    public function notifyHighSeverityFeedback($feedback): bool
    {
        $emailSent = $this->sendEmail($feedback);
        $smsSent = $this->sendSMS($feedback);

        return $emailSent && $smsSent;
    }

    /**
     * Send email notification to admin
     */
    protected function sendEmail($feedback): bool
    {
        try {
            $subject = "🚨 High Severity Feedback Alert - {$feedback->stars} Star Rating";
            
            $message = "A high severity feedback has been submitted.\n\n";
            $message .= "Rating: {$feedback->stars}/5 stars\n";
            $message .= "Email: " . ($feedback->email ?? 'N/A') . "\n";
            $message .= "Feedback: " . ($feedback->feedback ?? 'No feedback text provided') . "\n";
            $message .= "Submitted: " . ($feedback->created_at ? $feedback->created_at->format('Y-m-d H:i:s') : 'N/A') . "\n\n";
            $message .= "Please review this feedback immediately and take appropriate action.\n\n";
            $message .= "View feedback: " . url("/feedbacks");

            Mail::raw($message, function ($mail) use ($subject) {
                $mail->to($this->adminEmail)
                     ->subject($subject);
            });

            Log::info('Admin notification email sent', [
                'admin_email' => $this->adminEmail,
                'feedback_id' => $feedback->id
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send admin notification email', [
                'error' => $e->getMessage(),
                'feedback_id' => $feedback->id
            ]);

            return false;
        }
    }

    /**
     * Send SMS notification to admin via Twilio
     * FROM: Customer's phone number (from feedback form)
     * TO: Admin phone number
     */
    protected function sendSMS($feedback): bool
    {
        try {
            if (empty($this->twilioAccountSid) || empty($this->twilioAuthToken)) {
                Log::warning('Twilio credentials not configured', [
                    'feedback_id' => $feedback->id
                ]);
                return false;
            }

            // Get customer's phone number from feedback
            $customerPhone = $this->formatPhoneNumber($feedback->mobile ?? '');
            
            if (empty($customerPhone)) {
                Log::warning('Customer phone number not provided in feedback', [
                    'feedback_id' => $feedback->id
                ]);
                return false;
            }

            // Truncate feedback text for SMS (max 1600 chars, but keep it shorter)
            $feedbackText = $feedback->feedback ?? 'No feedback text';
            if (strlen($feedbackText) > 100) {
                $feedbackText = substr($feedbackText, 0, 97) . '...';
            }

            $message = "🚨 High Severity Alert: {$feedback->stars}⭐ rating\n";
            $message .= "Feedback: {$feedbackText}\n";
            $message .= "View: " . url("/feedbacks");

            // Twilio API endpoint
            $url = "https://api.twilio.com/2010-04-01/Accounts/{$this->twilioAccountSid}/Messages.json";

            // Normalize phone numbers for comparison (remove +, spaces, dashes)
            $normalizePhone = function($phone) {
                return preg_replace('/[^0-9]/', '', $phone);
            };
            
            $fromNormalized = $normalizePhone($customerPhone);
            $toNormalized = $normalizePhone($this->adminPhone);
            
            // Ensure From and To are different
            if ($fromNormalized === $toNormalized) {
                Log::error('Customer phone and admin phone cannot be the same', [
                    'customer_phone' => $customerPhone,
                    'admin_phone' => $this->adminPhone,
                    'feedback_id' => $feedback->id
                ]);
                return false;
            }

            // Send SMS FROM customer's phone number TO admin phone number
            Log::info('Sending SMS via Twilio', [
                'from' => $customerPhone,  // Customer's phone from form input
                'to' => $this->adminPhone,  // Admin phone number
                'direction' => 'outbound-api',  // This will show as "Incoming" in Twilio logs when sent FROM customer number
                'feedback_id' => $feedback->id,
                'message_preview' => substr($message, 0, 50)
            ]);

            $response = Http::withBasicAuth($this->twilioAccountSid, $this->twilioAuthToken)
                ->asForm()
                ->post($url, [
                    'From' => $customerPhone,  // Customer's phone number (from form)
                    'To' => $this->adminPhone,  // Admin phone number
                    'Body' => $message
                ]);

            if ($response->successful()) {
                $responseData = $response->json();
                Log::info('Admin notification SMS sent successfully', [
                    'from' => $customerPhone,
                    'to' => $this->adminPhone,
                    'feedback_id' => $feedback->id,
                    'twilio_sid' => $responseData['sid'] ?? null,
                    'status' => $responseData['status'] ?? null,
                    'direction' => $responseData['direction'] ?? null
                ]);

                return true;
            } else {
                $errorData = $response->json();
                $errorMessage = $errorData['message'] ?? $response->body();
                $errorCode = $errorData['code'] ?? 'unknown';
                
                Log::error('Failed to send SMS via Twilio', [
                    'status' => $response->status(),
                    'error_code' => $errorCode,
                    'error_message' => $errorMessage,
                    'from' => $customerPhone,
                    'to' => $this->adminPhone,
                    'body' => $response->body(),
                    'feedback_id' => $feedback->id
                ]);

                // Log specific error for debugging
                if ($errorCode == 21266 || strpos($errorMessage, 'cannot be the same') !== false) {
                    Log::error('Twilio error 21266: Customer phone and admin phone are the same or invalid', [
                        'customer_phone' => $customerPhone,
                        'admin_phone' => $this->adminPhone,
                        'feedback_id' => $feedback->id
                    ]);
                } elseif ($errorCode == 21610 || strpos($errorMessage, 'not a valid') !== false) {
                    Log::error('Twilio error: Customer phone number is not valid or not verified', [
                        'customer_phone' => $customerPhone,
                        'error_message' => $errorMessage,
                        'feedback_id' => $feedback->id
                    ]);
                }

                return false;
            }
        } catch (\Exception $e) {
            Log::error('Exception while sending SMS', [
                'error' => $e->getMessage(),
                'feedback_id' => $feedback->id
            ]);

            return false;
        }
    }

    /**
     * Get the first available Twilio phone number from the account
     * @param string|null $excludeNumber Phone number to exclude (e.g., admin phone)
     */
    protected function getTwilioPhoneNumber(?string $excludeNumber = null): ?string
    {
        try {
            $url = "https://api.twilio.com/2010-04-01/Accounts/{$this->twilioAccountSid}/IncomingPhoneNumbers.json";
            
            $response = Http::withBasicAuth($this->twilioAccountSid, $this->twilioAuthToken)
                ->get($url);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['incoming_phone_numbers']) && count($data['incoming_phone_numbers']) > 0) {
                    $normalizePhone = function($phone) {
                        return preg_replace('/[^0-9]/', '', $phone);
                    };
                    
                    $excludeNormalized = $excludeNumber ? $normalizePhone($excludeNumber) : null;
                    
                    // Find first number that's different from excludeNumber
                    foreach ($data['incoming_phone_numbers'] as $phoneData) {
                        $phoneNumber = $phoneData['phone_number'];
                        $phoneNormalized = $normalizePhone($phoneNumber);
                        
                        if ($excludeNormalized === null || $phoneNormalized !== $excludeNormalized) {
                            Log::info('Fetched Twilio phone number from account', [
                                'phone' => $phoneNumber,
                                'excluded' => $excludeNumber
                            ]);
                            return $phoneNumber;
                        }
                    }
                    
                    // If all numbers match excludeNumber, return the first one anyway (will be caught by validation)
                    $phoneNumber = $data['incoming_phone_numbers'][0]['phone_number'];
                    Log::warning('All Twilio numbers match excluded number', [
                        'phone' => $phoneNumber,
                        'excluded' => $excludeNumber
                    ]);
                    return $phoneNumber;
                }
            }

            Log::warning('No Twilio phone numbers found in account');
            return null;
        } catch (\Exception $e) {
            Log::error('Failed to fetch Twilio phone number', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Format phone number to E.164 format for Twilio
     * @param string $phone Raw phone number input
     * @return string Formatted phone number (e.g., +18777804236)
     */
    protected function formatPhoneNumber(string $phone): string
    {
        if (empty($phone)) {
            return '';
        }

        // Remove all non-digit characters except +
        $phone = preg_replace('/[^\d+]/', '', $phone);
        
        // If it doesn't start with +, assume US number and add +1
        if (!str_starts_with($phone, '+')) {
            // Remove leading 1 if present
            if (str_starts_with($phone, '1') && strlen($phone) == 11) {
                $phone = substr($phone, 1);
            }
            $phone = '+1' . $phone;
        }

        return $phone;
    }
}

