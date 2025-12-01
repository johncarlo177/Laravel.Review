<section class="website-banner">
    @if (config('website-banner.background-custom-code'))
        {!! config('website-banner.background-custom-code') !!}
    @else
        @if ($src = ContentManager::websiteBannerSrc())
            <div class="background user-background" style="background-image: url({{ $src }});"></div>
        @else
            <div class="background">
                <blue-website-banner-background></blue-website-banner-background>
            </div>
        @endif
    @endif

    <!-- Background Overlay for Text Readability -->
    <div class="background-overlay"></div>

    <!-- Title Section - Separate Container -->
    <div class="banner-title-wrapper">
        <div class="banner-title-section">
            <div class="layout-box small">
                <h1 class="section-title">
                    {!! ContentManager::contentBlocks('Front Page: main title') !!}
                </h1>

                <div class="banner-description">
                    {!! ContentManager::contentBlocks('Front Page: below main title', noParagraph: false) !!}
                </div>
            </div>
        </div>
    </div>

    <!-- Cards Section - Completely Separate -->
    <div class="banner-cards-wrapper">
        <div class="layout-box">
            <div class="control">
                <qrcg-website-banner></qrcg-website-banner>
            </div>
        </div>
    </div>
</section>
