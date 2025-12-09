@php
    $bodyAttributes = 'class="dashboard-page"';
@endphp

@extends('blue.layouts.main')

@section('body')
    <qrcg-account-router></qrcg-account-router>
    <qrcg-qrcode-router></qrcg-qrcode-router>
    <qrcg-user-router></qrcg-user-router>
    <qrcg-subscription-plan-router></qrcg-subscription-plan-router>
    
    {{-- AI Panel Button Component --}}
    <script src="{{ asset('js/components/AIPanelButton.js') }}"></script>
    
    <script>
        (function() {
            let attempts = 0;
            const maxAttempts = 200;
            let isInitialized = false;
            
            function addAIPanelButton() {
                if (isInitialized) {
                    return;
                }
                
                attempts++;
                if (attempts > maxAttempts) {
                    console.warn('AI Panel: Max attempts reached. Could not find header.');
                    return;
                }
                
                // First check if dashboard layout exists (header is inside it)
                const layout = document.querySelector('qrcg-dashboard-layout');
                if (!layout) {
                    setTimeout(addAIPanelButton, 300);
                    return;
                }
                
                const header = layout.querySelector('qrcg-dashboard-header') || document.querySelector('qrcg-dashboard-header');
                if (!header) {
                    setTimeout(addAIPanelButton, 300);
                    return;
                }
                
                // Check if header uses Shadow DOM
                const root = header.shadowRoot || header;
                const isShadowDOM = !!header.shadowRoot;
                
                // Check if already added
                if (root.querySelector('qrcg-ai-panel-button')) {
                    isInitialized = true;
                    return;
                }
                
                // Wait for header content to be rendered (check for .push or .username)
                const hasContent = root.querySelector('.push') || root.querySelector('.username') || root.querySelector('qrcg-script-support-link');
                if (!hasContent) {
                    setTimeout(addAIPanelButton, 200);
                    return;
                }
                
                // Find insertion point - after script-support-link, before username
                let insertionPoint = null;
                let parentElement = null;
                
                // Strategy 1: Find qrcg-script-support-link and insert after it
                const scriptSupportLink = root.querySelector('qrcg-script-support-link');
                if (scriptSupportLink && scriptSupportLink.parentElement) {
                    insertionPoint = scriptSupportLink.nextSibling;
                    parentElement = scriptSupportLink.parentElement;
                }
                
                // Strategy 2: Find .username element and insert before it
                if (!insertionPoint) {
                    const usernameElement = root.querySelector('.username');
                    if (usernameElement && usernameElement.parentElement) {
                        insertionPoint = usernameElement;
                        parentElement = usernameElement.parentElement;
                    }
                }
                
                // Strategy 3: Just append to root if we can't find insertion point
                if (!insertionPoint) {
                    parentElement = root;
                    insertionPoint = null;
                }
                
                // Create the custom element (just like Support button)
                const aiPanelButton = document.createElement('qrcg-ai-panel-button');
                
                // Insert into DOM
                if (insertionPoint && parentElement) {
                    try {
                        parentElement.insertBefore(aiPanelButton, insertionPoint);
                        console.log('AI Panel: Button inserted successfully');
                    } catch (e) {
                        console.warn('AI Panel: Insert before failed, trying append:', e);
                        parentElement.appendChild(aiPanelButton);
                    }
                } else if (parentElement) {
                    parentElement.appendChild(aiPanelButton);
                    console.log('AI Panel: Button appended to parent');
                } else {
                    root.appendChild(aiPanelButton);
                    console.log('AI Panel: Button appended to root');
                }
                
                // Mark as initialized to prevent duplicate additions
                isInitialized = true;
            }
            
            // Wait for dashboard bundle to be ready
            function initAIPanel() {
                if (typeof window !== 'undefined' && document.body) {
                    // Try immediately
                    addAIPanelButton();
                    
                    // Also listen for dashboard bundle ready event
                    window.addEventListener('qrcg-body-resolver::dashboard-bundle-ready', function() {
                        console.log('AI Panel: Dashboard bundle ready event received');
                        setTimeout(addAIPanelButton, 500);
                    }, { once: true });
                }
            }
            
            // Start when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(initAIPanel, 1000);
                });
            } else {
                setTimeout(initAIPanel, 1000);
            }
            
            // Also watch for dynamic changes with MutationObserver
            const observer = new MutationObserver(function(mutations) {
                if (!isInitialized) {
                    for (const mutation of mutations) {
                        if (mutation.addedNodes.length > 0) {
                            for (const node of mutation.addedNodes) {
                                if (node.nodeType === 1) {
                                    if (node.matches && (
                                        node.matches('qrcg-dashboard-layout') ||
                                        node.matches('qrcg-dashboard-header') ||
                                        node.querySelector('qrcg-dashboard-layout') ||
                                        node.querySelector('qrcg-dashboard-header')
                                    )) {
                                        setTimeout(addAIPanelButton, 500);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            // Start observing after a delay
            setTimeout(function() {
                const target = document.body;
                if (target) {
                    observer.observe(target, {
                        childList: true,
                        subtree: true
                    });
                }
            }, 500);
        })();
    </script>
@endsection
