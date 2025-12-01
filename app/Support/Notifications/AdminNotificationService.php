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

            // If no from_number is configured, try to get the first available number from the account
            if (empty($this->twilioFromNumber)) {
                $this->twilioFromNumber = $this->getTwilioPhoneNumber();
                
                if (empty($this->twilioFromNumber)) {
                    Log::error('Twilio from_number not configured and could not fetch from account. Please set TWILIO_FROM_NUMBER in .env');
                    return false;
                }
            }

            $response = Http::withBasicAuth($this->twilioAccountSid, $this->twilioAuthToken)
                ->asForm()
                ->post($url, [
                    'From' => $this->twilioFromNumber,
                    'To' => $this->adminPhone,
                    'Body' => $message
                ]);

            if ($response->successful()) {
                Log::info('Admin notification SMS sent', [
                    'admin_phone' => $this->adminPhone,
                    'feedback_id' => $feedback->id,
                    'twilio_sid' => $response->json('sid')
                ]);

                return true;
            } else {
                Log::error('Failed to send SMS via Twilio', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'feedback_id' => $feedback->id
                ]);

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
     */
    protected function getTwilioPhoneNumber(): ?string
    {
        try {
            $url = "https://api.twilio.com/2010-04-01/Accounts/{$this->twilioAccountSid}/IncomingPhoneNumbers.json";
            
            $response = Http::withBasicAuth($this->twilioAccountSid, $this->twilioAuthToken)
                ->get($url);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['incoming_phone_numbers']) && count($data['incoming_phone_numbers']) > 0) {
                    $phoneNumber = $data['incoming_phone_numbers'][0]['phone_number'];
                    Log::info('Fetched Twilio phone number from account', ['phone' => $phoneNumber]);
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
}

