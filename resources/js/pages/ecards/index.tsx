import React from 'react';
import { Head } from '@inertiajs/react';

export default function EcardsPage() {
  return (
    <div className="ecards-page min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-background)', color: '#f8fafc' }}>
      <Head title="AI eBusiness Cards - Reputation AI">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          .ecards-page {
            --color-primary: #06b6d4;
            --color-secondary: #34d399;
            --color-background: #0f172a;
            --color-card: #1e293b;
            font-family: 'Inter', sans-serif;
          }
          .ecards-page .gradient-text {
            background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .ecards-page .cta-button {
            background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
          }
          .ecards-page .cta-button:hover {
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.6);
            transform: translateY(-2px);
          }
          .ecards-page .section-heading {
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
            margin-bottom: 2rem;
          }
          .ecards-page .ecard-mockup {
            background-color: #27374d;
            border: 1px solid #334155;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            min-height: 450px;
          }
          .ecards-page .business-card-light {
            background-color: #ffffff;
            color: #0f172a;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          .ecards-page .business-card-light .icon-action {
            background-color: #f0f9ff;
            color: #0e7490;
            transition: background-color 0.2s;
          }
          .ecards-page .business-card-light .icon-action:hover {
            background-color: #e0f2f7;
          }
          .ecards-page .qr-code-box img {
            image-rendering: pixelated;
          }
        `}</style>
      </Head>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            <span className="gradient-text">Reputation</span> AI
          </a>
          <a href="#cta" className="px-4 py-2 text-sm font-semibold rounded-lg text-white cta-button">
            Create Your eCard
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Modern AI eBusiness Cards <br />
            for <span className="gradient-text">Owners, Staff &amp; Teams</span>.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Replace costly, outdated paper cards with smart, scannable, AI-powered digital cards that drive contact, trust, and reviews.
          </p>
          <a href="#cta" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
            <i className="fa-solid fa-qrcode mr-3"></i> Create Your eCard
          </a>
        </div>
      </section>

      {/* FEATURES + MOCKUP */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-1">
            <h2 className="text-4xl font-extrabold section-heading">
              Core <span className="gradient-text">Features</span>
            </h2>
            <div className="space-y-6 mt-8">
              <div className="flex items-start">
                <i className="fa-solid fa-qrcode text-2xl text-cyan-400 mr-4 mt-1 flex-shrink-0"></i>
                <div>
                  <h3 className="font-bold text-lg text-white">QR Code Business Card</h3>
                  <p className="text-gray-400">Instantly shareable via scan, link, or email signature.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fa-solid fa-phone-volume text-2xl text-cyan-400 mr-4 mt-1 flex-shrink-0"></i>
                <div>
                  <h3 className="font-bold text-lg text-white">Instant Contact Actions</h3>
                  <p className="text-gray-400">Customers can call, text, or email you with a single tap.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fa-solid fa-share-nodes text-2xl text-cyan-400 mr-4 mt-1 flex-shrink-0"></i>
                <div>
                  <h3 className="font-bold text-lg text-white">All Social Links in One Place</h3>
                  <p className="text-gray-400">Direct links to Google Reviews, Facebook, Instagram, and more.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fa-solid fa-comment-dots text-2xl text-cyan-400 mr-4 mt-1 flex-shrink-0"></i>
                <div>
                  <h3 className="font-bold text-lg text-white">Dedicated Feedback Shortcut</h3>
                  <p className="text-gray-400">One-click button: &quot;Leave Feedback&quot; links directly to your private AI Recovery system.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fa-solid fa-address-book text-2xl text-cyan-400 mr-4 mt-1 flex-shrink-0"></i>
                <div>
                  <h3 className="font-bold text-lg text-white">Auto-Save to Phone Contacts</h3>
                  <p className="text-gray-400">Customers can save your contact details (VCF) instantly—no typing required.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:order-2 flex justify-center p-8">
            <div className="ecard-mockup w-full max-w-sm rounded-3xl p-6 text-center">
              <div className="business-card-light rounded-2xl p-6 pb-8 shadow-xl">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 border-2 border-cyan-500 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Chen Profile" className="w-full h-full object-cover" />
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900">Sarah Chen</h3>
                <p className="text-gray-600 mb-6">General Manager | Reputation AI</p>

                <div className="bg-gray-100 p-4 rounded-xl mb-6 qr-code-box">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://reputationai.com/sarahchen"
                    alt="Live QR Code Placeholder"
                    className="mx-auto w-24 h-24 rounded border border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-2">Scan to save contact</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <a href="tel:+15551234567" className="p-2 rounded-lg icon-action font-medium">
                    <i className="fa-solid fa-phone"></i> Call
                  </a>
                  <a href="https://facebook.com/reputationai" target="_blank" rel="noreferrer" className="p-2 rounded-lg icon-action font-medium">
                    <i className="fa-brands fa-facebook-f"></i> FB
                  </a>
                  <a href="#" className="p-2 rounded-lg icon-action font-medium">
                    <i className="fa-solid fa-star"></i> Reviews
                  </a>
                </div>

                <a href="#" className="w-full block bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md">
                  <i className="fa-solid fa-comment-medical mr-2"></i> LEAVE PRIVATE FEEDBACK
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="ecard-examples" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Professional <span className="gradient-text">eCard Examples</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="business-card-light rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 border-2 border-cyan-500 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Davis Profile" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">John Davis</h4>
            <p className="text-sm text-gray-600 mb-4">Master Plumber | Davis Plumbing</p>
            <div className="text-left text-gray-700 text-xs space-y-1 mb-4">
              <p>
                <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i> 123 Main St, Suite 100, City, ST
              </p>
              <p>
                <i className="fa-solid fa-phone mr-2 text-gray-500"></i> (555) 123-4567
              </p>
              <p>
                <i className="fa-solid fa-envelope mr-2 text-gray-500"></i> john@davisplumbing.com
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg qr-code-box">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://davisplumbing.com/john"
                alt="QR Code Placeholder"
                className="mx-auto w-20 h-20 rounded border border-gray-300"
              />
              <p className="text-xs text-gray-500 mt-1">Scan for Contact</p>
            </div>
          </div>

          <div className="business-card-light rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 border-2 border-cyan-500 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/8.jpg" alt="Amelia Khan Profile" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">Amelia Khan</h4>
            <p className="text-sm text-gray-600 mb-4">Senior Stylist | The Style Collective</p>
            <div className="text-left text-gray-700 text-xs space-y-1 mb-4">
              <p>
                <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i> 456 Elm Ave, Studio B, Town, ST
              </p>
              <p>
                <i className="fa-solid fa-phone mr-2 text-gray-500"></i> (555) 987-6543
              </p>
              <p>
                <i className="fa-solid fa-envelope mr-2 text-gray-500"></i> amelia@styleco.net
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg qr-code-box">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://styleco.net/amelia"
                alt="QR Code Placeholder"
                className="mx-auto w-20 h-20 rounded border border-gray-300"
              />
              <p className="text-xs text-gray-500 mt-1">Scan for Contact</p>
            </div>
          </div>

          <div className="business-card-light rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 border-2 border-cyan-500 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Thomas Miller Profile" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">Thomas Miller</h4>
            <p className="text-sm text-gray-600 mb-4">Property Manager | Elite Apartments</p>
            <div className="text-left text-gray-700 text-xs space-y-1 mb-4">
              <p>
                <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i> 789 Oak Ln, Leasing Office, City, ST
              </p>
              <p>
                <i className="fa-solid fa-phone mr-2 text-gray-500"></i> (555) 333-1111
              </p>
              <p>
                <i className="fa-solid fa-envelope mr-2 text-gray-500"></i> thomas@eliteapts.org
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg qr-code-box">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://eliteapts.org/thomas"
                alt="QR Code Placeholder"
                className="mx-auto w-20 h-20 rounded border border-gray-300"
              />
              <p className="text-xs text-gray-500 mt-1">Scan for Contact</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT SELLS */}
      <section id="why-it-sells" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why AI eCards <span className="gradient-text">Drive Results</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
              <i className="fa-solid fa-bolt text-3xl text-yellow-400 mr-4 flex-shrink-0"></i>
              <div>
                <h3 className="font-bold text-white">Instant Customer Contact</h3>
                <p className="text-gray-400 text-sm">Customers can contact you instantly without searching—no barriers to communication.</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
              <i className="fa-solid fa-users-viewfinder text-3xl text-emerald-400 mr-4 flex-shrink-0"></i>
              <div>
                <h3 className="font-bold text-white">Automatic Lead Capture</h3>
                <p className="text-gray-400 text-sm">
                  When someone scans your card, they are prompted to leave their info (name, email, phone) for your sales team to follow up on—
                  <strong> every scan is a potential lead.</strong>
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
              <i className="fa-solid fa-lock text-3xl text-purple-400 mr-4 flex-shrink-0"></i>
              <div>
                <h3 className="font-bold text-white">Trust and Credibility Boost</h3>
                <p className="text-gray-400 text-sm">A modern digital card improves your professional image and customer confidence.</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
              <i className="fa-solid fa-magnifying-glass-chart text-3xl text-pink-400 mr-4 flex-shrink-0"></i>
              <div>
                <h3 className="font-bold text-white">Track Views + Scans</h3>
                <p className="text-gray-400 text-sm">Gain powerful insights into card distribution and usage effectiveness.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-cyan-700/50 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">The Power of the Feedback Shortcut</h3>
            <p className="text-gray-300 mb-6">
              The eCard’s true value is routing customers who might be frustrated away from public review sites and into your private AI recovery system.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-xl text-red-400 mr-3">1.</span>
                <p className="text-white">Customer frustrated at service.</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-yellow-400 mr-3">2.</span>
                <p className="text-white">
                  Customer <strong>Scans eCard</strong> and sees &quot;Leave Feedback.&quot;
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-green-400 mr-3">3.</span>
                <p className="text-white font-bold">Feedback → AI Recovery → Positive Review.</p>
              </div>
            </div>
            <p className="text-sm italic text-gray-500 mt-6">This drives more private feedback → fewer bad reviews.</p>
          </div>
        </div>
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-6">Perfect for service businesses, apartments, salons, contractors, and restaurants.</p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white">
          Ready to Go Digital? <span className="gradient-text">Design Your Smart eCard</span>
        </h2>
        <a
          href="#"
          className="cta-button text-white font-bold py-5 px-12 rounded-xl text-2xl inline-flex items-center shadow-lg hover:scale-105 transition transform"
        >
          <i className="fa-solid fa-wand-magic-sparkles mr-3"></i> Design Your Smart eCard
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Reputation AI. The future of networking and feedback collection.</p>
        </div>
      </footer>
    </div>
  );
}

