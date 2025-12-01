/**
 * AI Recovery Chat Widget
 * Floating chat widget that appears on all pages
 */
(function() {
    'use strict';

    class AIRecoveryWidget {
        constructor() {
            this.isOpen = false;
            this.conversationId = null;
            this.messages = [];
            this.isLoading = false;
            this.isResolved = false;
            this.shouldRequestReview = false;
            this.init();
        }

        init() {
            // Create floating button
            this.createFloatingButton();
            
            // Don't load conversation on init - only load when icon is clicked
            // This ensures fresh data from database every time
            
            // Handle window resize for responsive behavior
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.handleResize();
                }, 250);
            });
        }

        createFloatingButton() {
            // Check if button already exists
            const existingButton = document.getElementById('ai-recovery-widget-button');
            if (existingButton) {
                console.log('AI Recovery Widget: Button already exists');
                return;
            }
            
            const button = document.createElement('div');
            button.id = 'ai-recovery-widget-button';
            button.innerHTML = `
                <div class="ai-widget-button-inner" style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); cursor: pointer; transition: transform 0.2s;">
                    <span style="font-size: 28px;">🤖</span>
                </div>
            `;
            
            button.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 9998 !important;
                cursor: pointer !important;
                display: block !important;
                visibility: visible !important;
            `;
            
            // Mobile responsive styles
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 640px) {
                    #ai-recovery-widget-button {
                        bottom: 15px !important;
                        right: 15px !important;
                    }
                    #ai-recovery-widget-button .ai-widget-button-inner {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    #ai-recovery-widget-button .ai-widget-button-inner span {
                        font-size: 24px !important;
                    }
                }
            `;
            document.head.appendChild(style);
            
            button.addEventListener('click', () => this.toggleChat());
            button.addEventListener('mouseenter', function() {
                this.querySelector('div').style.transform = 'scale(1.1)';
            });
            button.addEventListener('mouseleave', function() {
                this.querySelector('div').style.transform = 'scale(1)';
            });
            
            // Append to body
            if (document.body) {
                document.body.appendChild(button);
                console.log('AI Recovery Widget: Button created and added to page');
            } else {
                // Wait for body to be available
                const observer = new MutationObserver((mutations, obs) => {
                    if (document.body) {
                        document.body.appendChild(button);
                        console.log('AI Recovery Widget: Button created and added to page (delayed)');
                        obs.disconnect();
                    }
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
            }
        }

        toggleChat() {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        async openChat() {
            if (this.isOpen) return;
            
            // Always load conversation from database when opening chat
            await this.loadExistingConversation(true);
            
            this.isOpen = true;
            this.renderChatWindow();
        }

        closeChat() {
            if (!this.isOpen) return;
            
            this.isOpen = false;
            const chatWindow = document.getElementById('ai-recovery-widget-chat');
            if (chatWindow) {
                chatWindow.remove();
            }
        }

        renderChatWindow() {
            // Remove existing chat window
            const existing = document.getElementById('ai-recovery-widget-chat');
            if (existing) {
                existing.remove();
            }

            const chatWindow = document.createElement('div');
            chatWindow.id = 'ai-recovery-widget-chat';
            
            // Check if mobile
            const isMobile = window.innerWidth <= 640;
            const chatWidth = isMobile ? 'calc(100vw - 30px)' : '380px';
            const chatHeight = isMobile ? 'calc(100vh - 100px)' : '600px';
            const chatBottom = isMobile ? '15px' : '90px';
            const chatRight = isMobile ? '15px' : '20px';
            
            chatWindow.innerHTML = `
                <div class="ai-widget-chat-container" style="position: fixed; bottom: ${chatBottom}; right: ${chatRight}; width: ${chatWidth}; max-width: ${isMobile ? '100%' : '380px'}; height: ${chatHeight}; max-height: ${isMobile ? 'calc(100vh - 30px)' : '600px'}; background: white; border-radius: ${isMobile ? '0.75rem' : '1rem'}; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); display: flex; flex-direction: column; z-index: 9999;">
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: ${isMobile ? '0.75rem' : '0.75rem 1rem'}; border-bottom: 1px solid #e5e7eb; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: ${isMobile ? '0.75rem 0.75rem 0 0' : '1rem 1rem 0 0'};">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: ${isMobile ? '1.125rem' : '1.25rem'};">🤖</span>
                            <div>
                                <h3 style="font-size: ${isMobile ? '0.875rem' : '1rem'}; font-weight: 700; color: white; margin: 0;">AI Recovery Assistant</h3>
                                <p style="font-size: ${isMobile ? '0.625rem' : '0.75rem'}; color: rgba(255, 255, 255, 0.9); margin: 0;">We're here to help</p>
                            </div>
                        </div>
                        <button id="ai-widget-close" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: ${isMobile ? '1.5rem' : '1.25rem'}; line-height: 1; min-width: 32px; min-height: 32px; display: flex; align-items: center; justify-content: center;">&times;</button>
                    </div>
                    <div id="ai-widget-messages" style="flex: 1; padding: ${isMobile ? '0.5rem' : '0.75rem'}; background: #f9fafb; overflow-y: auto; display: flex; flex-direction: column; gap: ${isMobile ? '0.5rem' : '0.75rem'}; -webkit-overflow-scrolling: touch;">
                        ${this.renderMessages()}
                    </div>
                    ${this.shouldRequestReview ? this.renderReviewRequest() : ''}
                    <div style="display: flex; gap: ${isMobile ? '0.375rem' : '0.5rem'}; padding: ${isMobile ? '0.5rem' : '0.75rem'}; border-top: 1px solid #e5e7eb; background: white; border-radius: 0 0 ${isMobile ? '0.75rem' : '1rem'} ${isMobile ? '0.75rem' : '1rem'};">
                        <input type="text" id="ai-widget-input" placeholder="Type your message..." style="flex: 1; padding: ${isMobile ? '0.625rem 0.5rem' : '0.5rem 0.75rem'}; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: ${isMobile ? '0.875rem' : '0.875rem'}; outline: none; -webkit-appearance: none; -moz-appearance: none; appearance: none;" ${this.isResolved ? 'disabled' : ''} />
                        <button id="ai-widget-send" style="padding: ${isMobile ? '0.625rem 1rem' : '0.5rem 1rem'}; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer; font-size: ${isMobile ? '0.875rem' : '0.875rem'}; ${this.isResolved ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Send</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(chatWindow);
            this.setupChatEventListeners();
            this.scrollToBottom();
        }

        renderMessages() {
            const isMobile = window.innerWidth <= 640;
            
            if (this.messages.length === 0) {
                return `
                    <div style="text-align: center; padding: ${isMobile ? '1.5rem 1rem' : '2rem'}; color: #6b7280;">
                        <p style="margin: 0; font-size: ${isMobile ? '0.8125rem' : '0.875rem'}; line-height: 1.5;">No active conversation. Submit feedback to start a conversation with our AI assistant.</p>
                    </div>
                `;
            }
            
            return this.messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                // Clean the message content - remove leading/trailing whitespace and ensure proper formatting
                const cleanContent = (msg.content || '').trim().replace(/\n{3,}/g, '\n\n');
                return `
                    <div style="display: flex; ${isUser ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
                        <div style="max-width: ${isMobile ? '85%' : '75%'}; padding: ${isMobile ? '0.5rem 0.625rem' : '0.5rem 0.75rem'}; border-radius: 0.5rem; font-size: ${isMobile ? '0.8125rem' : '0.875rem'}; word-wrap: break-word; overflow-wrap: break-word; text-align: left; line-height: 1.5; ${isUser ? 'background: #2563eb; color: white;' : 'background: white; color: #111827; border: 1px solid #e5e7eb;'}">
                            ${this.escapeHtml(cleanContent)}
                        </div>
                    </div>
                `;
            }).join('');
        }

        renderReviewRequest(googleReviewLink) {
            const isMobile = window.innerWidth <= 640;
            const reviewLink = googleReviewLink || 'https://www.google.com/search?q=leave+a+review';
            return `
                <div style="padding: ${isMobile ? '0.625rem' : '0.75rem'}; background: #f0fdf4; border: 1px solid #86efac; border-radius: 0.5rem; margin: 0 ${isMobile ? '0.5rem' : '0.75rem'};">
                    <p style="font-size: ${isMobile ? '0.8125rem' : '0.875rem'}; color: #166534; font-weight: 500; margin: 0 0 0.5rem; text-align: left; line-height: 1.5;">Great! Would you mind sharing your updated experience?</p>
                    <a href="${reviewLink}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: ${isMobile ? '0.5rem 0.875rem' : '0.5rem 1rem'}; background: #16a34a; color: white; border-radius: 0.5rem; text-decoration: none; font-size: ${isMobile ? '0.8125rem' : '0.875rem'}; font-weight: 500; width: ${isMobile ? '100%' : 'auto'}; justify-content: center;">Leave a Google Review →</a>
                </div>
            `;
        }

        setupChatEventListeners() {
            const closeBtn = document.getElementById('ai-widget-close');
            const sendBtn = document.getElementById('ai-widget-send');
            const input = document.getElementById('ai-widget-input');

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeChat());
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
            const input = document.getElementById('ai-widget-input');
            if (!input || !input.value.trim() || this.isLoading || this.isResolved) {
                return;
            }

            const userMessage = input.value.trim();
            input.value = '';

            // If no conversation exists, we need to create one first
            if (!this.conversationId) {
                // For widget, we might need to get conversation from feedback
                // For now, show a message that they need to submit feedback first
                this.messages.push({ role: 'user', content: userMessage });
                this.messages.push({ 
                    role: 'assistant', 
                    content: 'Thank you for reaching out! To start a recovery conversation, please submit your feedback first through our feedback form.' 
                });
                this.updateMessagesDisplay();
                return;
            }

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
                    // Clean the message - remove any duplicate review request text
                    let cleanMessage = data.message;
                    
                    // Remove duplicate review request phrases if they appear in the message
                    const reviewPhrases = [
                        'Great! Would you mind sharing your updated experience on Google',
                        'would you mind sharing your updated experience',
                        'share your updated experience on Google'
                    ];
                    
                    reviewPhrases.forEach(phrase => {
                        if (cleanMessage.includes(phrase)) {
                            // Remove the phrase and any text after it
                            const index = cleanMessage.indexOf(phrase);
                            cleanMessage = cleanMessage.substring(0, index).trim();
                        }
                    });
                    
                    this.messages.push({ role: 'assistant', content: cleanMessage });
                    if (data.is_resolved) {
                        this.isResolved = true;
                    }
                    if (data.should_request_review) {
                        this.shouldRequestReview = true;
                        this.renderReviewRequestSection(data.google_review_link);
                    }
                    this.updateMessagesDisplay();
                }
            } catch (error) {
                console.error('Error:', error);
                this.messages.push({ 
                    role: 'assistant', 
                    content: 'Sorry, there was an error. Please try again later.' 
                });
                this.updateMessagesDisplay();
            } finally {
                this.hideLoadingIndicator();
            }
        }

        updateMessagesDisplay() {
            const container = document.getElementById('ai-widget-messages');
            if (container) {
                container.innerHTML = this.renderMessages();
                this.scrollToBottom();
            }
        }
        
        handleResize() {
            // Re-render chat window on resize to adjust mobile/desktop layout
            if (this.isOpen) {
                const chatWindow = document.getElementById('ai-recovery-widget-chat');
                if (chatWindow) {
                    this.closeChat();
                    setTimeout(() => {
                        this.openChat();
                    }, 100);
                }
            }
        }

        showLoadingIndicator() {
            this.isLoading = true;
            const container = document.getElementById('ai-widget-messages');
            const isMobile = window.innerWidth <= 640;
            if (container) {
                container.insertAdjacentHTML('beforeend', `
                    <div style="display: flex; justify-content: flex-start;">
                        <div style="padding: ${isMobile ? '0.5rem 0.625rem' : '0.5rem 0.75rem'}; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                            <div style="display: flex; gap: 0.25rem;">
                                <span style="width: ${isMobile ? '0.375rem' : '0.5rem'}; height: ${isMobile ? '0.375rem' : '0.5rem'}; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite;"></span>
                                <span style="width: ${isMobile ? '0.375rem' : '0.5rem'}; height: ${isMobile ? '0.375rem' : '0.5rem'}; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite; animation-delay: 0.2s;"></span>
                                <span style="width: ${isMobile ? '0.375rem' : '0.5rem'}; height: ${isMobile ? '0.375rem' : '0.5rem'}; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite; animation-delay: 0.4s;"></span>
                            </div>
                        </div>
                    </div>
                `);
            }
        }

        hideLoadingIndicator() {
            this.isLoading = false;
            const loading = document.querySelector('#ai-widget-messages .ai-recovery-loading');
            if (loading) {
                loading.remove();
            }
        }

        renderReviewRequestSection(googleReviewLink) {
            const container = document.getElementById('ai-widget-messages');
            if (container && !document.querySelector('.ai-widget-review-request')) {
                const reviewSection = document.createElement('div');
                reviewSection.className = 'ai-widget-review-request';
                reviewSection.innerHTML = this.renderReviewRequest(googleReviewLink);
                container.insertAdjacentElement('afterend', reviewSection);
            }
        }

        scrollToBottom() {
            const container = document.getElementById('ai-widget-messages');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }

        async loadExistingConversation(forceFromServer = false) {
            // If forceFromServer is true, always load from database
            // Otherwise, check sessionStorage first for quick loading
            if (!forceFromServer) {
                const savedConversation = sessionStorage.getItem('ai_recovery_conversation');
                if (savedConversation) {
                    try {
                        const data = JSON.parse(savedConversation);
                        this.conversationId = data.conversation_id;
                        this.messages = data.messages || [];
                        // Still load from server in background to get latest updates
                        this.loadFromServer();
                        return;
                    } catch (e) {
                        console.error('Error loading conversation from session:', e);
                    }
                }
            }

            // Load from server (database)
            await this.loadFromServer();
        }

        async loadFromServer() {
            // Always load from server to get the latest conversation from database
            try {
                const response = await fetch('/feedbacks/recovery/last', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    credentials: 'same-origin',
                    cache: 'no-cache' // Ensure fresh data
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.conversation_history) {
                        this.conversationId = data.conversation_id;
                        this.messages = data.conversation_history.map(msg => ({
                            role: msg.role,
                            content: msg.content
                        }));
                        this.isResolved = data.is_resolved || false;
                        this.shouldRequestReview = data.review_requested || false;
                        
                        // Update sessionStorage with fresh data
                        sessionStorage.setItem('ai_recovery_conversation', JSON.stringify({
                            conversation_id: this.conversationId,
                            messages: this.messages
                        }));
                        
                        // If chat is open, update the display
                        if (this.isOpen) {
                            this.updateMessagesDisplay();
                        }
                    } else {
                        // No conversation found - clear sessionStorage
                        sessionStorage.removeItem('ai_recovery_conversation');
                        this.conversationId = null;
                        this.messages = [];
                    }
                } else if (response.status === 401 || response.status === 404) {
                    // User not authenticated or no conversation - clear sessionStorage
                    sessionStorage.removeItem('ai_recovery_conversation');
                    this.conversationId = null;
                    this.messages = [];
                    console.log('No active conversation - widget will show empty state');
                }
            } catch (error) {
                // Network error or other issue - widget should still be visible
                console.log('Could not load conversation from server:', error);
            }
        }

        setConversation(conversationId, initialMessage) {
            this.conversationId = conversationId;
            this.messages = [
                { role: 'assistant', content: initialMessage }
            ];
            
            // Save to sessionStorage
            sessionStorage.setItem('ai_recovery_conversation', JSON.stringify({
                conversation_id: conversationId,
                messages: this.messages
            }));
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    // Initialize widget when DOM is ready
    function initializeWidget() {
        // Only initialize if not already initialized
        if (!window.AIRecoveryWidget) {
            window.AIRecoveryWidget = new AIRecoveryWidget();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        // DOM already loaded, initialize immediately
        initializeWidget();
    }
    
    // Also try to initialize after a short delay in case script loads late
    setTimeout(initializeWidget, 500);

    // Add CSS animation for loading indicator
    if (!document.getElementById('ai-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-widget-styles';
        style.textContent = `
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
})();

