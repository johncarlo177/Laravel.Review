/**
 * AI Panel Button Component
 * Custom web component for the dashboard header AI Panel button
 */
(function() {
    'use strict';

    class AIPanelButton extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.isOpen = false;
        }

        static get styles() {
            return `
                <style>
                    :host {
                        display: flex;
                        position: relative;
                        margin-inline-end: 1rem;
                    }
                    
                    .ai-panel-button {
                        background-color: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: var(--dashboard-sidebar-text-color, white);
                        padding: 0.5rem 1rem;
                        border-radius: 0.3rem;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 0.9rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        transition: all 0.2s ease;
                        font-family: var(--qrcg-font-family, system-ui, -apple-system, sans-serif);
                    }
                    
                    .ai-panel-button:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                    
                    .ai-panel-button.active {
                        background-color: rgba(255, 255, 255, 0.25);
                    }
                    
                    .ai-panel-icon {
                        width: 1rem;
                        height: 1rem;
                        display: inline-block;
                        flex-shrink: 0;
                    }
                    
                    .ai-panel-dropdown {
                        position: absolute;
                        top: calc(100% + 0.5rem);
                        right: 0;
                        background: white;
                        border-radius: 0.5rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        min-width: 250px;
                        z-index: 1000;
                        display: none;
                        padding: 0.5rem;
                    }
                    
                    .ai-panel-dropdown.show {
                        display: block;
                    }
                    
                    .ai-panel-dropdown-item {
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        color: #333;
                        text-decoration: none;
                        border-radius: 0.3rem;
                        transition: background-color 0.2s ease;
                        font-size: 0.9rem;
                        border: none;
                        background: none;
                        cursor: pointer;
                        font-family: var(--qrcg-font-family, system-ui, -apple-system, sans-serif);
                    }
                    
                    .ai-panel-dropdown-item:hover {
                        background-color: #f5f5f5;
                    }
                    
                    .ai-panel-dropdown-item:not(:last-child) {
                        margin-bottom: 0.25rem;
                    }
                    
                    .ai-panel-dropdown-item strong {
                        display: block;
                        margin-bottom: 0.25rem;
                    }
                    
                    .ai-panel-dropdown-item div {
                        font-size: 0.8rem;
                        color: #666;
                        margin-top: 0.25rem;
                    }
                </style>
            `;
        }

        connectedCallback() {
            this.render();
            this.attachEventListeners();
        }

        render() {
            this.shadowRoot.innerHTML = `
                ${this.constructor.styles}
                <button class="ai-panel-button" part="button">
                    <svg class="ai-panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    AI Panel
                    <svg class="ai-panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.25rem;">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div class="ai-panel-dropdown" part="dropdown">
                    <button class="ai-panel-dropdown-item" data-action="negative-feedback">
                        <strong>Recent negative feedback alerts</strong>
                        <div>View recent negative feedback</div>
                    </button>
                    <button class="ai-panel-dropdown-item" data-action="winback">
                        <strong>WinBack suggestions</strong>
                        <div>Get AI-powered winback recommendations</div>
                    </button>
                    <button class="ai-panel-dropdown-item" data-action="business-card">
                        <strong>Quick create business card</strong>
                        <div>Create AI business card instantly</div>
                    </button>
                </div>
            `;
        }

        attachEventListeners() {
            const button = this.shadowRoot.querySelector('.ai-panel-button');
            const dropdown = this.shadowRoot.querySelector('.ai-panel-dropdown');
            const items = this.shadowRoot.querySelectorAll('.ai-panel-dropdown-item');

            // Toggle dropdown
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });

            // Handle dropdown item clicks
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = item.getAttribute('data-action');
                    this.handleAction(action);
                    this.closeDropdown();
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
                    this.closeDropdown();
                }
            });
        }

        toggleDropdown() {
            this.isOpen = !this.isOpen;
            const button = this.shadowRoot.querySelector('.ai-panel-button');
            const dropdown = this.shadowRoot.querySelector('.ai-panel-dropdown');

            if (this.isOpen) {
                button.classList.add('active');
                dropdown.classList.add('show');
            } else {
                button.classList.remove('active');
                dropdown.classList.remove('show');
            }
        }

        closeDropdown() {
            this.isOpen = false;
            const button = this.shadowRoot.querySelector('.ai-panel-button');
            const dropdown = this.shadowRoot.querySelector('.ai-panel-dropdown');
            button.classList.remove('active');
            dropdown.classList.remove('show');
        }

        handleAction(action) {
            switch(action) {
                case 'negative-feedback':
                    window.location.href = '/feedbacks?filter=negative';
                    break;
                case 'winback':
                    window.location.href = '/dashboard/winback-automation';
                    break;
                case 'business-card':
                    window.location.href = '/dashboard/ai-business-card';
                    break;
            }
        }
    }

    // Register the custom element
    if (!customElements.get('qrcg-ai-panel-button')) {
        customElements.define('qrcg-ai-panel-button', AIPanelButton);
    }
})();

