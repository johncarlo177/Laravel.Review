@extends('qrcode.types.layout')

@section('qrcode-layout-head')
    <script>
        window.__BUSINESS_REVIEW_STARS_BEFORE_REDIRECT__ = {{ $composer->starsBeforeRedirect() }};

        window.__BUSINESS_REVIEW_FINAL_URL__ = "{{ $composer->finalReviewLink() }}";
    </script>
    <script>
        // AI Recovery Popup Handler - Inline version
        (function() {
            class AIRecoveryPopup {
                constructor() {
                    this.conversationId = null;
                    this.messages = [];
                    this.isLoading = false;
                    this.isResolved = false;
                    this.shouldRequestReview = false;
                }

                async showPopup(aiRecoveryData) {
                    if (!aiRecoveryData || !aiRecoveryData.conversation_id) {
                        return;
                    }

                    this.conversationId = aiRecoveryData.conversation_id;
                    this.messages = [
                        { role: 'assistant', content: aiRecoveryData.message }
                    ];

                    this.renderPopup();
                }

                renderPopup() {
                    const existingPopup = document.getElementById('ai-recovery-popup');
                    if (existingPopup) {
                        existingPopup.remove();
                    }

                    const popupHTML = `
                        <div id="ai-recovery-popup" class="ai-recovery-popup-overlay" style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.75); padding: 1rem;">
                            <div class="ai-recovery-popup-container" style="background: white; border-radius: 0.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); width: 100%; max-width: 42rem; max-height: 90vh; display: flex; flex-direction: column;">
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(to bottom right, #3b82f6, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">🤖</div>
                                        <div>
                                            <h3 style="font-size: 1.25rem; font-weight: 700; color: #111827; margin: 0;">AI Recovery Assistant</h3>
                                            <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">We're here to help</p>
                                        </div>
                                    </div>
                                    <button class="ai-recovery-popup-close" style="background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.25rem;">&times;</button>
                                </div>
                                <div id="ai-recovery-messages" style="flex: 1; padding: 0.75rem 1rem; background: #f9fafb; border-radius: 0.5rem; margin: 0.75rem 1.5rem; overflow-y: auto; max-height: 24rem; display: flex; flex-direction: column; gap: 0.75rem;">
                                    ${this.renderMessages()}
                                </div>
                                <div class="ai-recovery-popup-input-container" style="display: flex; gap: 0.5rem; padding: 0.75rem 1.5rem 1rem;">
                                    <input type="text" id="ai-recovery-input" placeholder="Type your message..." style="flex: 1; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem;" />
                                    <button id="ai-recovery-send-btn" style="padding: 0.5rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;">Send</button>
                                </div>
                            </div>
                        </div>
                    `;

                    document.body.insertAdjacentHTML('beforeend', popupHTML);
                    this.setupEventListeners();
                    this.scrollToBottom();
                }

                renderMessages() {
                    return this.messages.map((msg, index) => {
                        const isUser = msg.role === 'user';
                        // Clean the message content - remove leading/trailing whitespace and ensure proper formatting
                        const cleanContent = (msg.content || '').trim().replace(/\n{3,}/g, '\n\n');
                        return `
                            <div style="display: flex; ${isUser ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
                                <div style="max-width: 80%; padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; word-wrap: break-word; overflow-wrap: break-word; text-align: left; line-height: 1.5; ${isUser ? 'background: #2563eb; color: white;' : 'background: white; color: #111827; border: 1px solid #e5e7eb;'}">
                                    ${this.escapeHtml(cleanContent)}
                                </div>
                            </div>
                        `;
                    }).join('');
                }

                setupEventListeners() {
                    const popup = document.getElementById('ai-recovery-popup');
                    const closeBtn = popup.querySelector('.ai-recovery-popup-close');
                    const sendBtn = document.getElementById('ai-recovery-send-btn');
                    const input = document.getElementById('ai-recovery-input');

                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => this.closePopup());
                    }

                    if (popup) {
                        popup.addEventListener('click', (e) => {
                            if (e.target === popup) {
                                this.closePopup();
                            }
                        });
                    }

                    if (sendBtn && input) {
                        sendBtn.addEventListener('click', () => this.sendMessage());
                        input.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                this.sendMessage();
                            }
                        });
                    }
                }

                async sendMessage() {
                    const input = document.getElementById('ai-recovery-input');
                    if (!input || !input.value.trim() || this.isLoading || this.isResolved) {
                        return;
                    }

                    const userMessage = input.value.trim();
                    input.value = '';

                    this.messages.push({ role: 'user', content: userMessage });
                    this.updateMessagesDisplay();
                    this.showLoadingIndicator();

                    try {
                        const response = await fetch(`/feedbacks/recovery/${this.conversationId}/continue`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                            },
                            body: JSON.stringify({ message: userMessage }),
                        });

                        const data = await response.json();

                        if (data.success) {
                            this.messages.push({ role: 'assistant', content: data.message });
                            if (data.is_resolved) {
                                this.isResolved = true;
                            }
                            if (data.should_request_review) {
                                this.shouldRequestReview = true;
                                this.renderReviewRequest(data.google_review_link);
                            }
                            this.updateMessagesDisplay();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        this.messages.push({ role: 'assistant', content: 'Sorry, there was an error. Please try again later.' });
                        this.updateMessagesDisplay();
                    } finally {
                        this.hideLoadingIndicator();
                    }
                }

                updateMessagesDisplay() {
                    const container = document.getElementById('ai-recovery-messages');
                    if (container) {
                        container.innerHTML = this.renderMessages();
                        this.scrollToBottom();
                    }
                }

                showLoadingIndicator() {
                    this.isLoading = true;
                    const container = document.getElementById('ai-recovery-messages');
                    if (container) {
                        container.insertAdjacentHTML('beforeend', `
                            <div style="display: flex; justify-content: flex-start;">
                                <div style="padding: 0.75rem 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                                    <div style="display: flex; gap: 0.25rem;">
                                        <span style="width: 0.5rem; height: 0.5rem; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite;"></span>
                                        <span style="width: 0.5rem; height: 0.5rem; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite; animation-delay: 0.2s;"></span>
                                        <span style="width: 0.5rem; height: 0.5rem; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite; animation-delay: 0.4s;"></span>
                                    </div>
                                </div>
                            </div>
                        `);
                    }
                }

                hideLoadingIndicator() {
                    this.isLoading = false;
                    const loading = document.querySelector('#ai-recovery-messages .ai-recovery-loading');
                    if (loading) {
                        loading.remove();
                    }
                }

                renderReviewRequest(googleReviewLink) {
                    const container = document.getElementById('ai-recovery-messages');
                    const reviewLink = googleReviewLink || 'https://www.google.com/search?q=leave+a+review';
                    
                    if (container && !document.querySelector('.ai-recovery-review-request')) {
                        container.insertAdjacentHTML('afterend', `
                            <div class="ai-recovery-review-request" style="padding: 1rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: 0.5rem; margin: 0 1.5rem 1rem;">
                                <p style="font-size: 0.875rem; color: #166534; font-weight: 500; margin: 0 0 0.5rem;">Great! Would you mind sharing your updated experience?</p>
                                <a href="${reviewLink}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #16a34a; color: white; border-radius: 0.5rem; text-decoration: none; font-size: 0.875rem; font-weight: 500;">Leave a Google Review →</a>
                            </div>
                        `);
                    }
                }

                scrollToBottom() {
                    const container = document.getElementById('ai-recovery-messages');
                    if (container) {
                        container.scrollTop = container.scrollHeight;
                    }
                }

                closePopup() {
                    const popup = document.getElementById('ai-recovery-popup');
                    if (popup) {
                        popup.remove();
                        document.body.style.overflow = '';
                    }
                }

                escapeHtml(text) {
                    const div = document.createElement('div');
                    div.textContent = text;
                    return div.innerHTML;
                }
            }

            window.AIRecoveryPopup = new AIRecoveryPopup();
            
            // Debug: Test if popup can be shown manually
            window.testAIRecoveryPopup = function() {
                console.log('Testing AI Recovery Popup...');
                if (window.AIRecoveryPopup) {
                    window.AIRecoveryPopup.showPopup({
                        conversation_id: 999,
                        message: 'This is a test message from the AI Recovery Assistant. If you can see this, the popup is working!'
                    });
                } else {
                    console.error('AIRecoveryPopup not found');
                }
            };
            
            console.log('AI Recovery Popup initialized. Test with: window.testAIRecoveryPopup()');

            // Intercept form submission - Run immediately and on DOMContentLoaded
            function setupFormHandler() {
                const form = document.querySelector('form.business-review-form');
                if (!form) {
                    console.log('AI Recovery: Form not found, will retry...');
                    return false;
                }

                // Check if handler already attached
                if (form.dataset.aiHandlerAttached === 'true') {
                    return true;
                }

                console.log('AI Recovery: Form found, setting up handler');

                form.addEventListener('submit', async function(e) {
                    console.log('AI Recovery: Form submitted event caught');
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    const formData = new FormData(form);
                    const stars = parseInt(formData.get('stars')) || 0;
                    
                    console.log('AI Recovery: Stars =', stars);
                    
                    if (stars <= 3 && stars > 0) {
                        console.log('AI Recovery: Low rating detected, showing AI popup');
                        
                        // Disable submit button to prevent double submission
                        const submitBtn = form.querySelector('button[type="submit"]');
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Submitting...';
                        }
                        
                        try {
                            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || 
                                             form.querySelector('input[name="_token"]')?.value || '';
                            
                            console.log('AI Recovery: Sending request to /dyvihb');
                            const response = await fetch('/dyvihb', {
                                method: 'POST',
                                headers: {
                                    'X-CSRF-TOKEN': csrfToken,
                                    'Accept': 'application/json',
                                },
                                body: formData
                            });
                            
                            console.log('AI Recovery: Response status', response.status);
                            
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            
                            const data = await response.json();
                            console.log('AI Recovery: Response data', data);
                            
                            if (data.success) {
                                console.log('AI Recovery: Full response data', JSON.stringify(data, null, 2));
                                
                                // Store AI recovery data in sessionStorage for the thank you page
                                if (data.ai_recovery && data.ai_recovery.conversation_id) {
                                    sessionStorage.setItem('pending_ai_recovery', JSON.stringify({
                                        conversation_id: data.ai_recovery.conversation_id,
                                        message: data.ai_recovery.message
                                    }));
                                }
                                
                                // Redirect to thank you page
                                const currentUrl = window.location.href.split('?')[0];
                                window.location.href = currentUrl + '?success=1&ai_recovery=1';
                                
                            } else {
                                console.error('AI Recovery: API error', data.message);
                                alert(data.message || 'An error occurred. Please try again.');
                                if (submitBtn) {
                                    submitBtn.disabled = false;
                                    submitBtn.textContent = submitBtn.dataset.originalText || 'Send Review';
                                }
                            }
                        } catch (error) {
                            console.error('AI Recovery: Error submitting feedback', error);
                            alert('An error occurred. Please try again.');
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = submitBtn.dataset.originalText || 'Send Review';
                            }
                        }
                    } else {
                        console.log('AI Recovery: High rating or invalid stars, submitting normally');
                        // For high ratings, let the form submit normally
                        form.removeEventListener('submit', arguments.callee);
                        form.setAttribute('action', '/dyvihb');
                        form.submit();
                    }
                }, true); // Use capture phase to run before other handlers
                
                form.dataset.aiHandlerAttached = 'true';
                return true;
            }

            // Try to set up immediately
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    if (!setupFormHandler()) {
                        // Retry after a short delay
                        setTimeout(setupFormHandler, 500);
                    }
                });
            } else {
                // DOM already loaded
                if (!setupFormHandler()) {
                    setTimeout(setupFormHandler, 500);
                }
            }
        })();
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
            <div class="success-message" style="text-align: center; padding: 2rem 2rem; max-width: 600px; margin: 0 auto;">
                <h2 style="font-size: 2rem; font-weight: 700; color: #111827; margin: 0 0 1rem;">Thank you for submitting your feedback</h2>
                <!-- <p style="font-size: 1.25rem; color: #374151; margin: 0 0 1.5rem; line-height: 1.6;">
                    {{ $composer->designField('success_message', t('Thank you for submitting your feedback.')) }}
                </p> -->
                <div style="background: #f3f4f6; border-radius: 0.75rem; padding: 2rem; margin: 2rem 0; text-align: left;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin: 0 0 1rem;">What happens next?</h3>
                    <ul style="list-style: none; padding: 0; margin: 0; color: #6b7280; font-size: 1rem; line-height: 1.8;">
                        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #2563eb;">✓</span>
                            We've received your feedback and our team will review it shortly.
                        </li>
                        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #2563eb;">✓</span>
                            Our AI assistant is ready to help address any concerns you may have.
                        </li>
                        <li style="margin-bottom: 0; padding-left: 1.5rem; position: relative;">
                            <span style="position: absolute; left: 0; color: #2563eb;">✓</span>
                            We're committed to making things right and improving your experience.
                        </li>
                    </ul>
                </div>
                <p style="font-size: 1rem; color: #6b7280; margin: 2rem 0 0; line-height: 1.6;">
                    Your feedback helps us serve you better. We truly appreciate you taking the time to share your experience with us.
                </p>
            </div>
            <script>
                // Auto-open AI widget after 3 seconds if AI recovery is pending
                @if (request()->has('ai_recovery'))
                    (function() {
                        setTimeout(() => {
                            // Load AI recovery data from sessionStorage
                            const pendingRecovery = sessionStorage.getItem('pending_ai_recovery');
                            if (pendingRecovery) {
                                try {
                                    const recoveryData = JSON.parse(pendingRecovery);
                                    
                                    // Set conversation in widget if available
                                    if (window.AIRecoveryWidget) {
                                        window.AIRecoveryWidget.setConversation(
                                            recoveryData.conversation_id,
                                            recoveryData.message
                                        );
                                        
                                        // Wait a moment then open chat
                                        setTimeout(() => {
                                            window.AIRecoveryWidget.openChat();
                                        }, 300);
                                    }
                                    
                                    // Clear the pending recovery from sessionStorage
                                    sessionStorage.removeItem('pending_ai_recovery');
                                } catch (e) {
                                    console.error('Error loading AI recovery:', e);
                                }
                            }
                        }, 3000);
                    })();
                @endif
            </script>
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

            <form method="post" class="business-review-form" id="business-review-form-submit">

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
