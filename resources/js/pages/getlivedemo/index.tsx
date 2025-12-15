import React from 'react';

export default function GetLiveDemoPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-['Inter',sans-serif] overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Reputation
            </span>{' '}
            AI
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-[#3b82f6] to-[#10b981] hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
          >
            Start Protecting Now
          </a>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6">
            Turn Customers Into{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Promoters
            </span>
            .
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            The only tool that stops bad reviews before they happen. <br className="hidden sm:inline" /> Protect your
            brand, recover lost revenue, and automate positive feedback.
          </p>
          <a
            href="#pricing"
            className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white font-bold py-4 px-10 rounded-xl text-lg inline-flex items-center shadow-lg hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
          >
            <i className="fa-solid fa-shield-halved mr-3"></i> Secure My Reputation
          </a>
        </div>

        {/* Hero Graphic Placeholder */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-4 sm:p-8 border border-gray-700 shadow-2xl">
          <img
            src="https://placehold.co/1000x500/1e293b/94a3b8?text=AI+Dashboard+Interface+Preview"
            alt="AI Dashboard Screenshot Placeholder"
            className="rounded-lg w-full"
          />
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section id="problem" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            The Silent{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Revenue Killer
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-blue-400 mb-4">
                <i className="fa-solid fa-sack-dollar"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Financial Impact</h3>
              <p className="text-gray-400">
                A single 1-star review can cost thousands in lost revenue. It drives potential high-value customers
                straight to your competitors before they even walk through your door. Your profits leak out with every
                negative search result.
              </p>
            </div>

            <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-yellow-400 mb-4">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Too Little, Too Late</h3>
              <p className="text-gray-400">
                Business owners often find negative reviews weeks later, when the damage is already done. Staff are too
                busy to follow up manually, leaving angry customers unresolved and ready to vent publicly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section
        id="solution"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-green-400">
              The Ultimate Firewall
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-6">
              The Solution:{' '}
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
                AI Auto-Recovery
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Our AI acts as a 24/7 firewall for your reputation. It detects negative sentiment instantly via private
              feedback channels, capturing feedback before it becomes a public crisis.
            </p>
            <ul className="space-y-4 text-lg text-gray-200">
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400 flex-shrink-0"></i>
                <span>Instantly engages the customer with a personalized apology.</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400 flex-shrink-0"></i>
                <span>Offers a solution or 'Win-Back' coupon to resolve the issue privately.</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400 flex-shrink-0"></i>
                <span>
                  <strong>Prevents the bad review</strong> from ever hitting Google or Yelp.
                </span>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <img
              src="https://placehold.co/600x400/0f172a/3b82f6?text=AI+Shield+Protecting+Reviews"
              alt="Abstract glowing blue AI shield protecting reputation"
              className="rounded-3xl shadow-2xl border border-gray-700 hover:scale-[1.02] transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURE SECTION */}
      <section
        id="features"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
            The{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              7-Step Win-Back Engine
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Automate the recovery of 'Lost' and 'Dormant' customers and drive repeat business on autopilot.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-purple-400 mb-3">
                <i className="fa-solid fa-database"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">1. Data Import</h3>
              <p className="text-gray-400 text-sm">
                We instantly import your customer list and analyze visit frequency and spend history.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-pink-400 mb-3">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">2. AI Segmentation</h3>
              <p className="text-gray-400 text-sm">
                AI sorts customers into 'Lost', 'Dormant', and 'VIP' groups automatically, targeting specific actions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-cyan-400 mb-3">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">3. Outreach</h3>
              <p className="text-gray-400 text-sm">
                AI sends personalized, human-like messages to win them back without being salesy or spammy.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-green-400 mb-3">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">4. Positive Funnel</h3>
              <p className="text-gray-400 text-sm">
                Happy customers are automatically funneled to public review sites (Google, Yelp).
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-red-400 mb-3">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">5. Crisis Alert</h3>
              <p className="text-gray-400 text-sm">
                Instant human staff alerts for critical, severe negative feedback that needs intervention.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl">
              <div className="text-4xl text-blue-400 mb-3">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">6. Performance Audit</h3>
              <p className="text-gray-400 text-sm">
                Weekly report detailing recovered reviews, win-back success rate, and total revenue impact.
              </p>
            </div>

            {/* Step 7 */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:-translate-y-1 transition-transform hover:shadow-2xl col-span-full lg:col-span-1 lg:col-start-2">
              <div className="text-4xl text-yellow-400 mb-3">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">7. Conversion Booster</h3>
              <p className="text-gray-400 text-sm">
                Automatically display your best reviews and star rating directly on your website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEMO/VIDEO SECTION */}
      <section id="demo" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">Watch</span> the
            Live Demo
          </h2>
          <p className="text-xl text-gray-400">
            See the AI firewall in action: real-time resolution and automated recovery.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Placeholder */}
          <div
            className="relative rounded-3xl h-64 sm:h-96 lg:h-80 border-2 border-[#3b82f6] shadow-2xl overflow-hidden"
            style={{
              backgroundImage: "url('https://placehold.co/600x400/3b82f6/ffffff?text=Video+Thumbnail')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-play text-6xl text-white/90 drop-shadow-2xl cursor-pointer"></i>
            </div>
          </div>

          {/* Demo Highlights */}
          <div>
            <h3 className="text-3xl font-bold mb-5 text-white">Real-Time Resolution Walkthrough</h3>
            <p className="text-gray-300 mb-6">
              In this short demonstration, you will see exactly how the AI takes a potentially viral crisis and turns it
              into a private, profitable recovery:
            </p>
            <ul className="space-y-3 text-lg text-gray-200">
              <li className="flex items-center">
                <i className="fa-solid fa-bolt mr-4 text-yellow-400"></i> AI detecting an angry customer instantly (in
                under 5 seconds).
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-comments mr-4 text-blue-400"></i> The automated, human-like de-escalation
                chat sequence.
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-ticket mr-4 text-green-400"></i> The system issuing a personalized
                'Win-Back' coupon to ensure a second chance.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. IMPACT SECTION */}
      <section id="impact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
            Proven{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Revenue Impact
            </span>
          </h2>
          <div className="p-8 rounded-2xl bg-gray-900 border border-green-500/50 shadow-xl">
            <p className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-4 text-green-400 leading-none">
              $1,247
            </p>
            <p className="text-2xl font-semibold mb-6 text-white">Avg. Monthly Recovered Revenue</p>
            <hr className="border-gray-700 mb-6" />
            <p className="text-lg text-gray-300">
              Based on our "Revenue Recovery Calculator", a typical business with 500 monthly customers and just a few
              bad reviews can recover over $1,000/month. This means the system <strong>pays for itself 10x over</strong>{' '}
              every single month. You aren't just buying software; you are installing a profit engine.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your business needs and scale your growth.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-wider bg-gray-800">
                <th className="px-6 py-4 text-gray-400">Feature</th>
                <th className="px-6 py-4 text-blue-400">Starter ($49/mo)</th>
                <th className="px-6 py-4 text-green-400 relative">
                  Pro ($97/mo)
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-yellow-500 text-gray-900 text-xs font-bold py-1 px-3 rounded-full shadow-lg">
                    BEST VALUE
                  </span>
                </th>
                <th className="px-6 py-4 text-purple-400">Agency ($197/mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {/* Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-white">Feedback System</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-white">eBusiness Cards</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-white">AI Review Prevention</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-red-500">N/A</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-white">Win-Back Engine</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-red-500">N/A</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <i className="fa-solid fa-check text-green-400"></i>
                </td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-white">Locations Included</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">Unlimited</td>
              </tr>
              {/* CTA Row */}
              <tr>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-center">
                  <a
                    href="#"
                    className="w-full inline-block py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Select Starter
                  </a>
                </td>
                <td className="px-6 py-4 text-center">
                  <a
                    href="#"
                    className="w-full inline-block py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white font-semibold hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                  >
                    Select Pro
                  </a>
                </td>
                <td className="px-6 py-4 text-center">
                  <a
                    href="#"
                    className="w-full inline-block py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                  >
                    Select Agency
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-12 px-4 sm:px-6 lg:px-8 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
              Protect Your Brand?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">Stop revenue leaks and start recovering customers today.</p>
          <a
            href="#pricing"
            className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white font-bold py-4 px-12 rounded-xl text-xl inline-flex items-center shadow-lg hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
          >
            Book a Demo Call
          </a>
          <div className="mt-12 text-gray-500 text-sm">
            <p>&copy; 2024 Reputation AI. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4 text-gray-400">
              <a href="mailto:demo@reputation.ai" className="hover:text-blue-400 transition">
                <i className="fa-solid fa-envelope mr-1"></i> demo@reputation.ai
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <i className="fa-solid fa-globe mr-1"></i> www.reputation.ai
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

