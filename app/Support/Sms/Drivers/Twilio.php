<?php

namespace App\Support\Sms\Drivers;

use Exception;

class Twilio extends BaseDriver
{
    private string $accountSid;
    private string $authToken;
    private string $fromNumber;

    public function slug()
    {
        return 'twilio';
    }

    public function doSend(string $to, string $text)
    {
        if (!$this->credentialsArePresent()) return;

        return $this->sendMessage($to, $text);
    }

    private function credentialsArePresent()
    {
        return !empty($this->config('account_sid')) 
            && !empty($this->config('auth_token')) 
            && !empty($this->config('from_number'));
    }

    public function __construct()
    {
        if ($this->credentialsArePresent()) {
            $this->accountSid = $this->config('account_sid');
            $this->authToken = $this->config('auth_token');
            $this->fromNumber = $this->config('from_number');
        }
    }

    /**
     * Send SMS message via Twilio API
     *
     * @param string $to The recipient phone number (E.164 format)
     * @param string $message The message text
     * @return array Returns the response from Twilio API
     * @throws Exception If there is an error while sending a message
     */
    private function sendMessage(string $to, string $message)
    {
        $url = sprintf(
            'https://api.twilio.com/2010-04-01/Accounts/%s/Messages.json',
            $this->accountSid
        );

        $postData = [
            'From' => $this->fromNumber,
            'To' => $to,
            'Body' => $message
        ];

        return $this->sendRequest($url, $postData);
    }

    /**
     * Send HTTP request to Twilio API
     *
     * @param string $url The Twilio API endpoint
     * @param array $postData The POST data
     * @return array Returns the response data
     * @throws Exception If there is an error
     */
    private function sendRequest(string $url, array $postData)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, $this->accountSid . ':' . $this->authToken);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new Exception("cURL Error: {$error}");
        }
        
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            $json = json_decode($response, true);
            if ($json === null) {
                throw new Exception("Invalid JSON response from Twilio: {$response}");
            }
            return $json;
        } else {
            $error = json_decode($response, true);
            $errorMessage = $error['message'] ?? "HTTP Error Code: {$httpCode}";
            throw new Exception("Twilio API Error: {$errorMessage}");
        }
    }
}

