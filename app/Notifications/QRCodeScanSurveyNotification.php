<?php

namespace App\Notifications;

use App\Support\Sms\Contracts\SendsSms;
use App\Support\Sms\SmsChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QRCodeScanSurveyNotification extends Notification implements ShouldQueue, SendsSms
{
    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $channels = [];

        // Always try to send email if user has email
        if (!empty($notifiable->email)) {
            $channels[] = 'mail';
        }

        // Always try to send SMS if SMS channel is enabled and user has mobile number
        if ($this->smsChannelEnabled() && !empty($notifiable->getFormattedMobileNumber())) {
            $channels[] = SmsChannel::class;
        }

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $surveyUrl = config('app.url') . '/dyvihb';
        $message = "Thank you for calling iStorage! Please complete this survey to tell us about your experience. Text STOP to opt-out.\n\n{$surveyUrl}";

        return (new MailMessage)
            ->subject('iStorage Survey Request')
            ->line($message);
    }

    /**
     * Get the SMS representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    public function toSms($notifiable): string
    {
        $surveyUrl = config('app.url') . '/dyvihb';
        return "Thank you for calling iStorage! Please complete this survey to tell us about your experience. Text STOP to opt-out.\n\n{$surveyUrl}";
    }

    /**
     * Check if SMS channel is enabled
     *
     * @return bool
     */
    protected function smsChannelEnabled()
    {
        return true;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

