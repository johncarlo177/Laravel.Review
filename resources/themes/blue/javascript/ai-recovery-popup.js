/**
 * AI Recovery Popup Handler
 * Shows AI recovery popup after feedback submission for low ratings (1-3 stars)
 */

class AIRecoveryPopup {
    constructor() {
        this.conversationId = null;
        this.messages = [];
        this.isLoading = false;
        this.isResolved = false;
        this.shouldRequestReview = false;
    }

    /**
     * Show AI recovery popup after feedback submission
     */
    async showPopup(aiRecoveryData) {
        if (!aiRecoveryData || !aiRecoveryData.conversation_id) {
            return; // No AI recovery needed
        }

        this.conversationId = aiRecoveryData.conversation_id;
        this.messages = [
            { role: 'assistant', content: aiRecoveryData.message }
        ];

        this.renderPopup();
    }

    renderPopup() {
        // Remove existing popup if any
        const existingPopup = document.getElementById('ai-recovery-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup HTML
        const popupHTML = `
            <div id="ai-recovery-popup" class="ai-recovery-popup-overlay">
                <div class="ai-recovery-popup-container">
                    <div class="ai-recovery-popup-header">
                        <div class="ai-recovery-popup-header-content">
                            <div class="ai-recovery-popup-icon">🤖</div>
                            <div>
                                <h3 class="ai-recovery-popup-title">AI Recovery Assistant</h3>
                                <p class="ai-recovery-popup-subtitle">We're here to help</p>
                            </div>
                        </div>
                        <button class="ai-recovery-popup-close" aria-label="Close">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="ai-recovery-popup-messages" id="ai-recovery-messages">
                        ${this.renderMessages()}
                    </div>
                    ${this.shouldRequestReview ? this.renderReviewRequest() : ''}
                    <div class="ai-recovery-popup-input-container">
                        <input 
                            type="text" 
                            id="ai-recovery-input" 
                            class="ai-recovery-popup-input" 
                            placeholder="Type your message..."
                            ${this.isResolved ? 'disabled' : ''}
                        />
                        <button 
                            id="ai-recovery-send-btn" 
                            class="ai-recovery-popup-send-btn"
                            ${this.isResolved ? 'disabled' : ''}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insert popup into body
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Add event listeners
        this.setupEventListeners();

        // Add styles if not already added
        this.addStyles();

        // Scroll to bottom of messages
        this.scrollToBottom();
    }

    renderMessages() {
        return this.messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return `
                <div class="ai-recovery-message ${isUser ? 'ai-recovery-message-user' : 'ai-recovery-message-assistant'}" data-index="${index}">
                    <div class="ai-recovery-message-content">
                        ${this.escapeHtml(msg.content)}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderReviewRequest() {
        return `
            <div class="ai-recovery-review-request">
                <p class="ai-recovery-review-text">
                    Great! Would you mind sharing your updated experience?
                </p>
                <a 
                    href="https://www.google.com/search?q=leave+a+review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="ai-recovery-review-btn"
                >
                    Leave a Google Review
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        `;
    }

    setupEventListeners() {
        // Close button
        const closeBtn = document.querySelector('#ai-recovery-popup .ai-recovery-popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePopup());
        }

        // Overlay click
        const overlay = document.getElementById('ai-recovery-popup');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closePopup();
                }
            });
        }

        // Send button
        const sendBtn = document.getElementById('ai-recovery-send-btn');
        const input = document.getElementById('ai-recovery-input');
        
        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('ai-recovery-popup')) {
                this.closePopup();
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('ai-recovery-input');
        if (!input || !input.value.trim() || this.isLoading || this.isResolved) {
            return;
        }

        const userMessage = input.value.trim();
        input.value = '';

        // Add user message to UI
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
                // Add AI response
                this.messages.push({ role: 'assistant', content: data.message });
                
                if (data.is_resolved) {
                    this.isResolved = true;
                }
                
                if (data.should_request_review) {
                    this.shouldRequestReview = true;
                }

                this.updateMessagesDisplay();
                
                if (this.shouldRequestReview) {
                    this.renderReviewRequestSection();
                }
            } else {
                this.messages.push({ 
                    role: 'assistant', 
                    content: data.message || 'Sorry, there was an error. Please try again.' 
                });
                this.updateMessagesDisplay();
            }
        } catch (error) {
            console.error('Error sending message:', error);
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
        const messagesContainer = document.getElementById('ai-recovery-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = this.renderMessages();
            this.scrollToBottom();
        }
    }

    showLoadingIndicator() {
        this.isLoading = true;
        const messagesContainer = document.getElementById('ai-recovery-messages');
        if (messagesContainer) {
            const loadingHTML = `
                <div class="ai-recovery-message ai-recovery-message-assistant">
                    <div class="ai-recovery-message-content">
                        <div class="ai-recovery-loading">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', loadingHTML);
            this.scrollToBottom();
        }
    }

    hideLoadingIndicator() {
        this.isLoading = false;
        const loading = document.querySelector('#ai-recovery-messages .ai-recovery-loading');
        if (loading) {
            loading.closest('.ai-recovery-message').remove();
        }
    }

    renderReviewRequestSection() {
        const messagesContainer = document.getElementById('ai-recovery-messages');
        if (messagesContainer && !document.querySelector('.ai-recovery-review-request')) {
            const reviewHTML = this.renderReviewRequest();
            messagesContainer.insertAdjacentHTML('afterend', reviewHTML);
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('ai-recovery-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
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

    addStyles() {
        if (document.getElementById('ai-recovery-popup-styles')) {
            return; // Styles already added
        }

        const styles = `
            <style id="ai-recovery-popup-styles">
                .ai-recovery-popup-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.75);
                    padding: 1rem;
                }

                .ai-recovery-popup-container {
                    background: white;
                    border-radius: 0.5rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 42rem;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                }

                .ai-recovery-popup-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                .ai-recovery-popup-header-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .ai-recovery-popup-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    background: linear-gradient(to bottom right, #3b82f6, #9333ea);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                }

                .ai-recovery-popup-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #111827;
                    margin: 0;
                }

                .ai-recovery-popup-subtitle {
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin: 0;
                }

                .ai-recovery-popup-close {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 0.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ai-recovery-popup-close:hover {
                    color: #6b7280;
                }

                .ai-recovery-popup-messages {
                    flex: 1;
                    padding: 1rem;
                    background: #f9fafb;
                    border-radius: 0.5rem;
                    margin: 1rem 1.5rem;
                    overflow-y: auto;
                    max-height: 24rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .ai-recovery-message {
                    display: flex;
                }

                .ai-recovery-message-user {
                    justify-content: flex-end;
                }

                .ai-recovery-message-assistant {
                    justify-content: flex-start;
                }

                .ai-recovery-message-content {
                    max-width: 80%;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }

                .ai-recovery-message-user .ai-recovery-message-content {
                    background: #2563eb;
                    color: white;
                }

                .ai-recovery-message-assistant .ai-recovery-message-content {
                    background: white;
                    color: #111827;
                    border: 1px solid #e5e7eb;
                }

                .ai-recovery-loading {
                    display: flex;
                    gap: 0.25rem;
                }

                .ai-recovery-loading span {
                    width: 0.5rem;
                    height: 0.5rem;
                    background: #9ca3af;
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }

                .ai-recovery-loading span:nth-child(1) {
                    animation-delay: -0.32s;
                }

                .ai-recovery-loading span:nth-child(2) {
                    animation-delay: -0.16s;
                }

                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }

                .ai-recovery-review-request {
                    padding: 1rem;
                    background: #f0fdf4;
                    border: 1px solid #86efac;
                    border-radius: 0.5rem;
                    margin: 0 1.5rem 1rem;
                }

                .ai-recovery-review-text {
                    font-size: 0.875rem;
                    color: #166534;
                    font-weight: 500;
                    margin: 0 0 0.5rem;
                }

                .ai-recovery-review-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #16a34a;
                    color: white;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: background 0.2s;
                }

                .ai-recovery-review-btn:hover {
                    background: #15803d;
                }

                .ai-recovery-popup-input-container {
                    display: flex;
                    gap: 0.5rem;
                    padding: 0 1.5rem 1.5rem;
                }

                .ai-recovery-popup-input {
                    flex: 1;
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                }

                .ai-recovery-popup-input:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }

                .ai-recovery-popup-input:disabled {
                    background: #f3f4f6;
                    cursor: not-allowed;
                }

                .ai-recovery-popup-send-btn {
                    padding: 0.5rem 1.5rem;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .ai-recovery-popup-send-btn:hover:not(:disabled) {
                    background: #1d4ed8;
                }

                .ai-recovery-popup-send-btn:disabled {
                    background: #9ca3af;
                    cursor: not-allowed;
                }

                @media (prefers-color-scheme: dark) {
                    .ai-recovery-popup-container {
                        background: #1f2937;
                    }

                    .ai-recovery-popup-title {
                        color: #f9fafb;
                    }

                    .ai-recovery-popup-subtitle {
                        color: #9ca3af;
                    }

                    .ai-recovery-popup-messages {
                        background: #111827;
                    }

                    .ai-recovery-message-assistant .ai-recovery-message-content {
                        background: #1f2937;
                        color: #f9fafb;
                        border-color: #374151;
                    }

                    .ai-recovery-popup-input {
                        background: #1f2937;
                        color: #f9fafb;
                        border-color: #374151;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Global instance
window.AIRecoveryPopup = new AIRecoveryPopup();

