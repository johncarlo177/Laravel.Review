<?php

namespace App\Notifications;

use App\Models\QRCodeRedirect;
use App\Support\Sms\Contracts\SendsSms;
use App\Support\Sms\SmsChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QRCodeScanSurveyNotification extends Notification implements ShouldQueue, SendsSms
{
    use Queueable;

    protected QRCodeRedirect $redirect;

    /**
     * Create a new notification instance.
     *
     * @param QRCodeRedirect $redirect
     */
    public function __construct(QRCodeRedirect $redirect)
    {
        $this->redirect = $redirect;
    }

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
        // Use the QR code's dynamic route URL
        $surveyUrl = $this->redirect->route;
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
        // Use the QR code's dynamic route URL
        $surveyUrl = $this->redirect->route;
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

