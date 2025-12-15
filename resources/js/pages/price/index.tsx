import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function PricePage() {
  const [customers, setCustomers] = useState(500);
  const [ticketValue, setTicketValue] = useState(50);
  const [churnRate, setChurnRate] = useState(5);
  const [negReviews, setNegReviews] = useState(15);

  const roi = useMemo(() => {
    const churnedCustomers = customers * (churnRate / 100);
    const recoveryRate = 0.1; // 10%
    const recoveredCustomers = Math.round(churnedCustomers * recoveryRate);
    const profitAdded = recoveredCustomers * ticketValue;

    const revenueSavedPerReview = 600;
    const preventionRate = 0.8;
    const reviewsPrevented = negReviews * preventionRate;
    const revenueSaved = reviewsPrevented * revenueSavedPerReview;

    const totalValue = profitAdded + revenueSaved;

    return {
      recoveredCustomers,
      profitAdded,
      revenueSaved,
      totalValue,
    };
  }, [customers, ticketValue, churnRate, negReviews]);

  useEffect(() => {
    // initialize derived values when page loads
  }, []);

  return (
    <div className="pricing-page min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-background)', color: '#f8fafc' }}>
      <Head title="Pricing & ROI Calculator - Reputation AI">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          .pricing-page {
            --color-primary: #8b5cf6;
            --color-secondary: #10b981;
            --color-background: #0f172a;
            --color-card: #1e293b;
            font-family: 'Inter', sans-serif;
          }
          .pricing-page .gradient-text {
            background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .pricing-page .cta-button {
            background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
          }
          .pricing-page .cta-button:hover {
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
            transform: translateY(-2px);
          }
          .pricing-page .section-heading {
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
            margin-bottom: 2rem;
          }
          .pricing-page .price-card {
            background-color: var(--color-card);
            border: 1px solid #334155;
            transition: transform 0.3s;
          }
          .pricing-page .price-card.featured {
            border: 2px solid var(--color-primary);
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
            transform: scale(1.03);
          }
          .pricing-page input[type="number"] {
            -moz-appearance: textfield;
          }
          .pricing-page input::-webkit-outer-spin-button,
          .pricing-page input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}</style>
      </Head>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            <span className="gradient-text">Reputation</span> AI
          </a>
          <a href="#roi-calculator-section" className="px-4 py-2 text-sm font-semibold rounded-lg text-white cta-button">
            Calculate Savings
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Simple Pricing. <span className="gradient-text">Massive ROI.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            An AI agent doesn't just manage your reputation—it actively replaces the need for a full-time employee dedicated to customer recovery and follow-up.
          </p>
          <a href="#roi-calculator-section" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
            <i className="fa-solid fa-calculator mr-3"></i> Calculate Your Savings
          </a>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section id="pricing" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Our Simple, <span className="gradient-text">Value-Driven Plans</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="price-card p-8 rounded-2xl flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold mb-2 text-white">Starter</h3>
              <p className="text-gray-400 mb-6">For single-location businesses just starting out.</p>
              <p className="text-5xl font-extrabold text-white mb-6">
                $49<span className="text-2xl text-gray-500 font-normal">/mo</span>
              </p>
              <ul className="text-left space-y-3 mb-10 text-gray-300">
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Review inbox management</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> AI reply suggestions</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Basic negative feedback alerts</li>
                <li className="flex items-center text-gray-500"><i className="fa-solid fa-xmark text-red-500 mr-3"></i> Full AI Recovery</li>
                <li className="flex items-center text-gray-500"><i className="fa-solid fa-xmark text-red-500 mr-3"></i> Win-back automations</li>
              </ul>
              <a href="#" className="w-full text-white font-bold py-3 rounded-lg border border-purple-500 hover:bg-purple-500/10 transition duration-300">
                Start Now
              </a>
            </div>

            {/* Pro */}
            <div className="price-card featured p-10 rounded-2xl flex flex-col items-center text-center relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 text-xs font-bold py-1 px-3 rounded-tr-xl rounded-bl-lg">Most Popular</div>
              <h3 className="text-3xl font-bold mb-2 text-white">Pro</h3>
              <p className="text-gray-400 mb-6">The complete AI profit engine for growing businesses.</p>
              <p className="text-5xl font-extrabold text-white mb-6">
                $97<span className="text-2xl text-gray-500 font-normal">/mo</span>
              </p>
              <ul className="text-left space-y-3 mb-10 text-gray-300">
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> <strong>Full AI Review Recovery</strong></li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> <strong>Win-Back Automations</strong></li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> AI eCards (Digital Business Cards)</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> SMS + Email Sending</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> All integrations and webhooks</li>
              </ul>
              <a href="#" className="w-full text-white font-bold py-3 rounded-lg cta-button">
                Start Pro Trial
              </a>
            </div>

            {/* Elite */}
            <div className="price-card p-8 rounded-2xl flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold mb-2 text-white">Elite</h3>
              <p className="text-gray-400 mb-6">Designed for franchises and multi-location operations.</p>
              <p className="text-5xl font-extrabold text-white mb-6">
                $149<span className="text-2xl text-gray-500 font-normal">/mo</span>
              </p>
              <ul className="text-left space-y-3 mb-10 text-gray-300">
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Everything in Pro, plus:</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> <strong>Multi-Location</strong> support</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Team permissions and roles</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Advanced insights + analytics</li>
                <li className="flex items-center"><i className="fa-solid fa-check text-green-400 mr-3"></i> Dedicated priority support</li>
              </ul>
              <a href="#" className="w-full text-white font-bold py-3 rounded-lg border border-purple-500 hover:bg-purple-500/10 transition duration-300">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ROI COMPARISON */}
      <section id="roi-comparison" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          AI Agent vs. <span className="gradient-text">Full-Time Staff</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-10">Stop paying salary for tasks that can be automated flawlessly.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/50 to-purple-900/10 border border-purple-600/50 shadow-xl">
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center"><i className="fa-solid fa-robot mr-3"></i> AI Agent (Pro Plan)</h3>
            <p className="text-4xl font-extrabold text-white mb-6">$97<span className="text-2xl font-normal">/month</span></p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-green-400 mr-3"></i> <strong>Zero</strong> payroll or benefits cost</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-green-400 mr-3"></i> Works 24/7/365 instantly</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-green-400 mr-3"></i> Flawless, precise execution</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-green-400 mr-3"></i> Scales instantly with your business</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-red-900/50 to-red-900/10 border border-red-600/50 shadow-xl">
            <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center"><i className="fa-solid fa-user-gear mr-3"></i> Hiring Staff</h3>
            <p className="text-4xl font-extrabold text-white mb-6">$2,500–$3,500<span className="text-2xl font-normal">/month+</span></p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-red-400 mr-3"></i> Payroll, taxes, and benefits required</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-red-400 mr-3"></i> Training and onboarding costs</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-red-400 mr-3"></i> High risk of turnover and human error</li>
              <li className="flex items-center"><i className="fa-solid fa-angle-right text-red-400 mr-3"></i> Limited to business hours</li>
            </ul>
          </div>
        </div>
        <p className="text-2xl font-bold text-center mt-12 text-green-400">
          SAVINGS: 1 AI Agent = 1 full staff member replaced.
        </p>
      </section>

      {/* ROI CALCULATOR */}
      <section id="roi-calculator-section" className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Calculate Your <span className="gradient-text">Estimated ROI</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-8">Enter your business metrics to see the revenue our AI can recover and add to your bottom line for free.</p>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-10 border border-purple-700/50 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="customers" className="block text-sm font-medium text-gray-300 mb-2">Avg. Customers per Month</label>
                <input
                  type="number"
                  id="customers"
                  value={customers}
                  min={1}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setCustomers(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label htmlFor="ticketValue" className="block text-sm font-medium text-gray-300 mb-2">Avg. Ticket Value ($)</label>
                <input
                  type="number"
                  id="ticketValue"
                  value={ticketValue}
                  min={1}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setTicketValue(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label htmlFor="churnRate" className="block text-sm font-medium text-gray-300 mb-2">% Monthly Churn (e.g., 5 for 5%)</label>
                <input
                  type="number"
                  id="churnRate"
                  value={churnRate}
                  min={0}
                  max={100}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setChurnRate(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label htmlFor="negReviews" className="block text-sm font-medium text-gray-300 mb-2">Negative Reviews/Feedback per Month</label>
                <input
                  type="number"
                  id="negReviews"
                  value={negReviews}
                  min={0}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setNegReviews(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <h3 className="text-3xl font-extrabold mb-6 text-white">Your Estimated Monthly ROI</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
                  <p className="text-sm uppercase text-gray-400">Customers Recovered</p>
                  <p id="recoveredCustomers" className="text-3xl font-bold text-purple-400 mt-1">{roi.recoveredCustomers.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
                  <p className="text-sm uppercase text-gray-400">Revenue Saved (Reviews)</p>
                  <p id="revenueSaved" className="text-3xl font-bold text-red-400 mt-1">${roi.revenueSaved.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
                  <p className="text-sm uppercase text-gray-400">Estimated Profit Added (Win-Back)</p>
                  <p id="profitAdded" className="text-3xl font-bold text-green-400 mt-1">${roi.profitAdded.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-green-900/50 border border-green-700">
                <p className="text-sm uppercase text-green-300">Total Estimated Monthly Value</p>
                <p id="totalValue" className="text-4xl font-extrabold text-white mt-1">${roi.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#" className="cta-button text-white font-bold py-4 px-12 rounded-xl text-xl inline-flex items-center shadow-lg hover:scale-105 transition transform">
              <i className="fa-solid fa-chart-line mr-3"></i> See Your Exact ROI (Free)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Reputation AI. Investing in your digital future.</p>
        </div>
      </footer>
    </div>
  );
}


