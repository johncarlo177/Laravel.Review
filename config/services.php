<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'google' => [
        'api_key' => env('GOOGLE_API_KEY')
    ],

    'maxmind' => [
        'license_key' => env('MAXMIND_LICENSE_KEY'),
    ],

    'openai' => [
        'secret_key' => env('OPEN_AI_SECRET_KEY', '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')
    ],
];
