@extends('qrcode.types.layout')

@section('qrcode-layout-head')
    <script>
        window.__BUSINESS_REVIEW_STARS_BEFORE_REDIRECT__ = {{ $composer->starsBeforeRedirect() }};

        window.__BUSINESS_REVIEW_FINAL_URL__ = "{{ $composer->finalReviewLink() }}";
    </script>
@endsection

@section('page')
    <svg width="0" height="0" style="position: fixed; top: -10000px;">
        <defs>
            <clipPath id="clip-banner" clipPathUnits="objectBoundingBox">
                <path d="M0 0H1V.9C.92.83.73.74.5.9A.6.6 90 00.49.91C.27 1.07.07.98 0 .91V0Z" />
            </clipPath>
        </defs>
    </svg>

    <div class="layout-generated-webpage">

        <div class="banner"></div>

        <img src="{{ $composer->getLogoUrl() }}" class="logo" />

        <h1>
            {{ $composer->designField('page_title', t('Review Us Now')) }}
        </h1>

        @if (request()->boolean('success'))
            <div class="success-message">
                {{ $composer->designField('success_message', t('Thank you for submitting your feedback.')) }}
            </div>
        @else
            <!-- Popup Modal for Messages -->
            <div id="review-popup-modal" class="review-popup-modal hidden">
                <div class="review-popup-overlay"></div>
                <div class="review-popup-content">
                    <button class="review-popup-close" aria-label="Close">&times;</button>
                    <div class="review-popup-body">
                        <!-- Star rating display -->
                        <div class="review-popup-stars"></div>
                        <!-- Headline -->
                        <h2 class="review-popup-headline"></h2>
                        <!-- Body text -->
                        <p class="review-popup-text"></p>
                        <!-- Buttons container -->
                        <div class="review-popup-actions">
                            <!-- Primary button (will be populated by JS) -->
                            <button class="review-popup-primary-btn" style="display: none;"></button>
                            <!-- Secondary link/button (will be populated by JS) -->
                            <a class="review-popup-secondary-link" href="#" style="display: none;" target="_blank"></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data attributes for popup content (hidden) -->
            <div class="review-popup-data hidden" 
                 data-high-rating-headline="{{ t("We're glad you had a great experience!") }}"
                 data-high-rating-text="{{ t("If you'd like, you can share your experience on Google so others can discover us too.") }}"
                 data-high-rating-primary-btn="{{ t('Leave a Google Review') }}"
                 data-high-rating-secondary-link="{{ t('Share Private Feedback') }}"
                 data-low-rating-headline="{{ t("We hear you — let us make this right.") }}"
                 data-low-rating-text="{{ t("Thank you for your honest rating. Please use this private channel so our team can immediately address your concern and work to make things right. You can also share your experience on Google if you prefer.") }}"
                 data-low-rating-primary-btn="{{ t('Tell Us How to Fix It (Get a Reply Fast)') }}"
                 data-low-rating-secondary-link="{{ t('Share Your Experience on Google') }}"
                 data-google-link-url="{{ $composer->finalReviewLink() }}">
            </div>

            <div class="stars-container">
                @foreach ($composer->totalStars() as $_)
                    <div class="star">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>star</title>
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                        </svg>
                    </div>
                @endforeach
            </div>

            <form method="post" class="business-review-form">

                @csrf

                <input type="hidden" name="stars" required pattern="[1-9]" />

                <input required type=text name="name" placeholder="{{ t('Enter your name') }}" />

                <input required type=email name="email" placeholder="{{ t('Enter your email') }}" />

                <input required type=tel name="mobile" placeholder="{{ t('Enter your mobile') }}" />

                <textarea required name="feedback" placeholder="{{ $composer->designField('placeholder_text', t('Enter your feedback')) }}" rows="8"></textarea>

                <button type="submit" class="button submit-review"
                    style="--submit-button-background-color: {{ $composer->designField('send_button_background_color', '#ff812f') }}; --submit-button-text-color: {{ $composer->designField('send_button_text_color', 'white') }};">

                    <span>
                        {{ $composer->designField('send_button_text', t('Send Review')) }}
                    </span>

                    <qrcg-loader></qrcg-loader>

                </button>

            </form>
        @endif


    </div>

    @if ($composer->designValue('custom_code_enabled') === 'enabled' && !empty($composer->designValue('custom_code')))
        {!! $composer->designValue('custom_code') !!}
    @endif
@endsection
