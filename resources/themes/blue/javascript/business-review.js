import { BaseRenderer } from './base-renderer'

export class BusinessReview extends BaseRenderer {
    onDomContentLoaded() {
        if (!this.shouldRun()) return

        this.$('.stars-container').addEventListener(
            'mousemove',
            this.onStarsContainerMouseMove
        )

        // Setup popup close handlers
        this.setupPopupHandlers()
    }

    setupPopupHandlers() {
        const popup = this.$('#review-popup-modal')
        if (!popup) return

        const closeBtn = popup.querySelector('.review-popup-close')
        const overlay = popup.querySelector('.review-popup-overlay')

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePopup())
        }

        if (overlay) {
            overlay.addEventListener('click', () => this.closePopup())
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
                this.closePopup()
            }
        })
    }

    showPopup() {
        const popup = this.$('#review-popup-modal')
        if (popup) {
            popup.classList.remove('hidden')
            document.body.style.overflow = 'hidden' // Prevent background scrolling
        }
    }

    closePopup() {
        const popup = this.$('#review-popup-modal')
        if (popup) {
            popup.classList.add('hidden')
            document.body.style.overflow = '' // Restore scrolling
        }
    }

    shouldRun() {
        return this.$('.qrcode-type-business-review .stars-container')
    }

    onDocumentClick(e) {
        if (!this.shouldRun()) return

        const elem = e.composedPath()[0]

        if (elem.matches('.star')) {
            return this.onStarClick(elem)
        }
    }

    onStarClick(elem) {
        this.activateStar(elem)

        const stars = this.getIndexOf(elem) + 1

        this.setInputValue(stars)

        if (stars >= window.__BUSINESS_REVIEW_STARS_BEFORE_REDIRECT__) {
            // High rating (4-5 stars): Show popup with Google Review as primary, hide form
            this.showHighRatingPopup(stars)
        } else {
            // Low rating (1-3 stars): Show popup with Private Feedback as primary, keep form visible
            this.showLowRatingPopup(stars)
        }
    }

    /**
     * Show high rating popup (4-5 stars)
     * Primary: Google Review button
     * Secondary: Private Feedback link
     */
    showHighRatingPopup(starCount) {
        const dataSource = this.$('.review-popup-data')
        if (!dataSource) return

        const headline = dataSource.getAttribute('data-high-rating-headline') || "We're glad you had a great experience!"
        const text = dataSource.getAttribute('data-high-rating-text') || "If you'd like, you can share your experience on Google so others can discover us too."
        const primaryBtnText = dataSource.getAttribute('data-high-rating-primary-btn') || 'Leave a Google Review'
        const secondaryLinkText = dataSource.getAttribute('data-high-rating-secondary-link') || 'Share Private Feedback'
        const googleUrl = dataSource.getAttribute('data-google-link-url') || window.__BUSINESS_REVIEW_FINAL_URL__

        // Populate popup
        this.populatePopup(starCount, headline, text, primaryBtnText, googleUrl, secondaryLinkText, false)

        // Hide form and stars
        const elemsToHide = this.$$('.business-review-form, .stars-container')
        elemsToHide.forEach((elem) => {
            elem.classList.add('hidden')
        })

        this.showPopup()
    }

    /**
     * Show low rating popup (1-3 stars)
     * Primary: Private Feedback button
     * Secondary: Google Review text link
     */
    showLowRatingPopup(starCount) {
        const dataSource = this.$('.review-popup-data')
        if (!dataSource) return

        const headline = dataSource.getAttribute('data-low-rating-headline') || "We hear you — let us make this right."
        const text = dataSource.getAttribute('data-low-rating-text') || "Thank you for your honest rating. Please use this private channel so our team can immediately address your concern and work to make things right. You can also share your experience on Google if you prefer."
        const primaryBtnText = dataSource.getAttribute('data-low-rating-primary-btn') || 'Tell Us How to Fix It (Get a Reply Fast)'
        const secondaryLinkText = dataSource.getAttribute('data-low-rating-secondary-link') || 'Share Your Experience on Google'
        const googleUrl = dataSource.getAttribute('data-google-link-url') || window.__BUSINESS_REVIEW_FINAL_URL__

        // Populate popup
        this.populatePopup(starCount, headline, text, primaryBtnText, googleUrl, secondaryLinkText, true)

        // Keep form visible
        this.showPopup()
        this.scrollToForm()
    }

    /**
     * Populate popup with content
     * @param {number} starCount - Number of stars selected
     * @param {string} headline - Main headline
     * @param {string} text - Body text
     * @param {string} primaryBtnText - Primary button text
     * @param {string} googleUrl - Google review URL
     * @param {string} secondaryLinkText - Secondary link text
     * @param {boolean} isLowRating - If true, primary button submits form; if false, opens Google
     */
    populatePopup(starCount, headline, text, primaryBtnText, googleUrl, secondaryLinkText, isLowRating) {
        const popupBody = this.$('.review-popup-body')
        if (!popupBody) return

        // Set star rating display
        const starsContainer = popupBody.querySelector('.review-popup-stars')
        if (starsContainer) {
            starsContainer.innerHTML = this.generateStarRatingHTML(starCount)
        }

        // Set headline
        const headlineEl = popupBody.querySelector('.review-popup-headline')
        if (headlineEl) {
            headlineEl.textContent = headline
        }

        // Set body text
        const textEl = popupBody.querySelector('.review-popup-text')
        if (textEl) {
            textEl.textContent = text
        }

        // Set primary button
        const primaryBtn = popupBody.querySelector('.review-popup-primary-btn')
        if (primaryBtn) {
            primaryBtn.textContent = primaryBtnText
            primaryBtn.style.display = 'block'
            
            // Remove old event listeners by cloning
            const newBtn = primaryBtn.cloneNode(true)
            primaryBtn.parentNode.replaceChild(newBtn, primaryBtn)
            
            // Add click handler
            if (isLowRating) {
                // For low rating: close popup, keep form visible, scroll to form
                newBtn.addEventListener('click', () => {
                    this.closePopup()
                    // Keep form visible and scroll to it
                    const form = this.getForm()
                    const stars = this.$('.stars-container')
                    if (form) form.classList.remove('hidden')
                    if (stars) stars.classList.remove('hidden')
                    this.scrollToForm()
                    // Don't submit form - let user fill and submit manually
                })
            } else {
                // For high rating: open Google review
                newBtn.addEventListener('click', () => {
                    this.openLinkInNewTab(googleUrl)
                })
            }
        }

        // Set secondary link
        const secondaryLink = popupBody.querySelector('.review-popup-secondary-link')
        if (secondaryLink) {
            secondaryLink.textContent = secondaryLinkText
            secondaryLink.style.display = 'block'
            
            // Remove old event listeners by cloning
            const newLink = secondaryLink.cloneNode(true)
            secondaryLink.parentNode.replaceChild(newLink, secondaryLink)
            
            if (isLowRating) {
                // For low rating: Google review link (text only)
                newLink.href = googleUrl
                newLink.target = '_blank'
            } else {
                // For high rating: Private feedback (scroll to form)
                newLink.href = '#'
                newLink.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.closePopup()
                    // Show form again and scroll to it
                    const form = this.getForm()
                    const stars = this.$('.stars-container')
                    if (form) form.classList.remove('hidden')
                    if (stars) stars.classList.remove('hidden')
                    this.scrollToForm()
                })
            }
        }
    }

    /**
     * Generate HTML for star rating display in popup
     */
    generateStarRatingHTML(starCount) {
        let html = '<div class="popup-stars-container">'
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= starCount
            html += `<svg class="popup-star ${isActive ? 'active' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>`
        }
        html += '</div>'
        return html
    }

    /**
     * Scroll to the form smoothly
     */
    scrollToForm() {
        const form = this.getForm()
        
        if (form) {
            setTimeout(() => {
                form.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                })
            }, 300)
        }
    }

    /**
     *
     * @returns {HTMLFormElement}
     */
    getForm() {
        return this.$('form.business-review-form')
    }

    submitFormOnPositiveFeedback() {
        this.getForm().setAttribute('novalidate', 'true')
        this.getForm().requestSubmit()
    }

    activateStar(star) {
        this.clearActiveStars()

        star.classList.add('active')

        this.forEachStarUntil(star, (s) => s.classList.add('active'))
    }

    syncValue() {
        let value = this.$('[name=stars]').value

        if (isNaN(value)) {
            value = 0
        }

        if (!value) return

        this.activateStar(this.findStarByDomIndex(value))
    }

    findStarByDomIndex(i) {
        return this.$('.star:nth-child(' + i + ')')
    }

    setInputValue(value) {
        this.$('[name=stars]').value = value
    }

    forEachStarUntil(star, callback) {
        const index = this.getIndexOf(star)

        const children = [...star.parentElement.children]

        for (let i = 0; i < index; i++) {
            const currentStar = children[i]

            callback(currentStar)
        }
    }

    onStarsContainerMouseMove = (e) => {
        const elem = e.composedPath()[0]

        if (!elem.matches('.star')) {
            return this.clearStarHover()
        }

        this.doHoverStar(elem)
    }

    clearStarClass(name) {
        this.$$('.star.' + name).forEach((e) => e.classList.remove(name))
    }

    clearStarHover() {
        this.clearStarClass('hover')
    }

    clearActiveStars() {
        this.clearStarClass('active')
    }

    getIndexOf(elem) {
        return [...elem.parentElement.children].indexOf(elem)
    }

    /**
     *
     * @param {HTMLElement} star
     */
    doHoverStar(star) {
        this.clearStarHover()
        this.forEachStarUntil(star, (s) => s.classList.add('hover'))
    }
}

BusinessReview.boot()
