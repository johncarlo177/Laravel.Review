import React from 'react';
import { Head } from '@inertiajs/react';

export default function WinBackPage() {
  return (
    <div className="winback-page min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-background)', color: '#f8fafc' }}>
      <Head title="Win-Back Engine - Automated Customer Recovery">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          .winback-page {
            --color-primary: #8b5cf6;
            --color-secondary: #10b981;
            --color-background: #0f172a;
            --color-card: #1e293b;
            font-family: 'Inter', sans-serif;
          }
          .winback-page .gradient-text {
            background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .winback-page .cta-button {
            background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
          }
          .winback-page .cta-button:hover {
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
            transform: translateY(-2px);
          }
          .winback-page .section-heading {
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
            margin-bottom: 2rem;
          }
          .winback-page .timeline-line {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 100%;
            background-color: #334155;
            z-index: 0;
          }
          .winback-page .phone-mockup {
            border: 8px solid #334155;
            border-radius: 30px;
            overflow: hidden;
            background-color: #000;
            position: relative;
          }
        `}</style>
      </Head>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            <span className="gradient-text">Reputation</span> AI
          </a>
          <a href="#demo" className="px-4 py-2 text-sm font-semibold rounded-lg text-white cta-button">
            Start Win-Back Demo
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Turn Lost Customers <br />
            <span className="gradient-text">Back Into Paying Customers</span>.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Stop letting profit walk out the door. Our AI runs automated follow-ups that recover{' '}
            <span className="text-green-400 font-bold">5–15%</span> of churned customers automatically.
          </p>
          <a href="#demo" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
            <i className="fa-solid fa-rotate-left mr-3"></i> Start Win-Back Demo
          </a>
        </div>

        {/* Magnet Graphic */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-900/50 p-8 rounded-full border border-gray-700 shadow-2xl relative">
            <i className="fa-solid fa-magnet text-9xl text-purple-500 animate-pulse"></i>
            <div className="absolute top-1/2 left-0 -translate-x-12 bg-gray-800 p-3 rounded-lg border border-gray-600">
              <i className="fa-solid fa-user text-gray-500"></i>
            </div>
            <div className="absolute top-1/2 right-0 translate-x-12 bg-green-900 p-3 rounded-lg border border-green-500">
              <i className="fa-solid fa-user-check text-green-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section id="how-it-works" className="py-16 bg-gray-900 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            How It Works: <span className="gradient-text">The Recovery Timeline</span>
          </h2>

          <div className="relative">
            <div className="hidden md:block timeline-line" />

            {/* Day 0 */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-12 items-center">
              <div className="text-right md:pr-12">
                <h3 className="text-2xl font-bold text-gray-500">Day 0</h3>
                <p className="text-gray-400">Customer stops visiting</p>
              </div>
              <div className="hidden md:flex justify-center items-center absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-700 rounded-full border-4 border-gray-900">
                <i className="fa-solid fa-user-slash text-xs" />
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:ml-12">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <i className="fa-solid fa-user-clock text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Churn Detected</h4>
                    <p className="text-sm text-gray-400">AI tags customer as &quot;At Risk&quot;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 7 */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 md:order-1 bg-gray-800 p-6 rounded-xl border border-gray-700 md:mr-12">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <i className="fa-solid fa-hand-wave text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Friendly Check-in</h4>
                    <p className="text-sm text-gray-400">&quot;We miss you! Hope everything is great.&quot;</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 rounded-full border-4 border-gray-900">
                <span className="text-xs font-bold">7</span>
              </div>
              <div className="order-1 md:order-2 text-left md:pl-12">
                <h3 className="text-2xl font-bold text-blue-400">Day 7</h3>
                <p className="text-gray-400">AI sends check-in</p>
              </div>
            </div>

            {/* Day 14 */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-12 items-center">
              <div className="text-right md:pr-12">
                <h3 className="text-2xl font-bold text-purple-400">Day 14</h3>
                <p className="text-gray-400">Incentive Triggered</p>
              </div>
              <div className="hidden md:flex justify-center items-center absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-purple-600 rounded-full border-4 border-gray-900">
                <span className="text-xs font-bold">14</span>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:ml-12">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <i className="fa-solid fa-ticket text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Personalized Offer</h4>
                    <p className="text-sm text-gray-400">&quot;Here is 15% off your next visit.&quot;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 30 */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-12 items-center">
              <div className="order-2 md:order-1 bg-gray-800 p-6 rounded-xl border border-gray-700 md:mr-12">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <i className="fa-solid fa-crown text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">VIP Message</h4>
                    <p className="text-sm text-gray-400">Exclusive perk for loyal customers.</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-600 rounded-full border-4 border-gray-900">
                <span className="text-xs font-bold">30</span>
              </div>
              <div className="order-1 md:order-2 text-left md:pl-12">
                <h3 className="text-2xl font-bold text-yellow-400">Day 30</h3>
                <p className="text-gray-400">Loyalty Appeal</p>
              </div>
            </div>

            {/* Day 45 */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-right md:pr-12">
                <h3 className="text-2xl font-bold text-red-400">Day 45</h3>
                <p className="text-gray-400">Final Reminder</p>
              </div>
              <div className="hidden md:flex justify-center items-center absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-red-600 rounded-full border-4 border-gray-900">
                <span className="text-xs font-bold">45</span>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:ml-12">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <i className="fa-solid fa-hourglass-end text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">&quot;Last Chance&quot;</h4>
                    <p className="text-sm text-gray-400">Urgency driver before archive.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold section-heading mb-12">
          See the <span className="gradient-text">Messages</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* SMS Example */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 text-white">
              <i className="fa-solid fa-mobile-screen mr-2" /> SMS Example
            </h3>
            <div className="phone-mockup w-72 h-[500px] bg-white">
              <div className="bg-gray-100 h-full p-4 flex flex-col pt-12">
                <div className="text-center text-gray-500 text-xs mb-4">Today 2:04 PM</div>
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-none text-sm shadow-md mb-2">
                  Hey Sarah! Haven’t seen you in a while.
                </div>
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-none text-sm shadow-md">
                  Here’s <strong>15% off</strong> your next visit — valid for 7 days. We'd love to see you!
                </div>
              </div>
            </div>
          </div>

          {/* Email Example */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 text-white">
              <i className="fa-solid fa-envelope mr-2" /> Email Example
            </h3>
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-2xl h-[500px] flex flex-col">
              <div className="bg-gray-50 p-4 border-b">
                <p className="text-gray-800 font-bold text-sm">
                  From: <span className="font-normal text-gray-600">Your Business</span>
                </p>
                <p className="text-gray-800 font-bold text-sm">
                  Subject: <span className="font-normal text-gray-600">A Gift from Us to You</span>
                </p>
              </div>
              <div className="p-8 text-gray-800 flex flex-col justify-center h-full text-center">
                <div className="text-4xl text-purple-600 mb-4">
                  <i className="fa-solid fa-gift" />
                </div>
                <h4 className="text-xl font-bold mb-4">We Miss You!</h4>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  We value you — here’s a thank-you gift for being a loyal customer.
                </p>
                <a href="#" className="bg-purple-600 text-white py-3 px-6 rounded font-bold hover:bg-purple-700 transition">
                  Claim Your Reward
                </a>
                <p className="mt-8 text-xs text-gray-400">Valid for 7 days only.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section id="stats" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Why It <span className="gradient-text">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="text-5xl text-purple-400 mb-4 font-black">60%</div>
              <h3 className="text-xl font-bold text-white mb-2">Higher Reply Rate</h3>
              <p className="text-gray-400">Personalized messaging drastically outperforms generic blasts.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
              <div className="text-5xl text-blue-400 mb-4">
                <i className="fa-solid fa-clock-rotate-left" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Precision Timing</h3>
              <p className="text-gray-400">Messages are sent exactly when a customer is most likely to churn.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-green-500 transition duration-300">
              <div className="text-5xl text-green-400 mb-4">
                <i className="fa-solid fa-sack-dollar" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pure Profit</h3>
              <p className="text-gray-400">Every returning customer is new revenue without marketing ad spend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Example */}
      <section id="roi" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">ROI Example</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center text-left">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-user-minus text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase font-bold">Churn Rate</p>
                  <p className="text-white text-lg">200 Customers Lost / Mo</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-bullseye text-green-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase font-bold">Recovery Goal</p>
                  <p className="text-white text-lg">Just 10% (20 Customers)</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border-2 border-green-500/50 text-center">
              <p className="text-sm text-green-400 font-bold uppercase mb-2">Monthly Revenue Recovered</p>
              <p className="text-5xl font-black text-white">$2,000+</p>
              <p className="text-xs text-gray-500 mt-2">Powered by Automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white">Ready to Automate Your Growth?</h2>
        <a
          href="#demo"
          className="cta-button text-white font-bold py-5 px-12 rounded-xl text-2xl inline-flex items-center shadow-lg hover:scale-105 transition transform"
        >
          <i className="fa-solid fa-rocket mr-3" /> Launch Your Win-Back Automation
        </a>
      </section>

      <footer className="bg-black/90 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Reputation AI. Turning lost leads into profit.</p>
        </div>
      </footer>
    </div>
  );
}


