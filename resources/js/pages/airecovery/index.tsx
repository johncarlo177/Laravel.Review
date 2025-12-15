import React from 'react';
import { Head } from '@inertiajs/react';

export default function AIRecoveryPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-background)', color: '#f8fafc' }}>
      <Head title="AI Review Recovery - Reputation AI">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --color-primary: #3b82f6;
            --color-secondary: #10b981;
            --color-background: #0f172a;
            --color-card: #1e293b;
          }
          body {
            font-family: 'Inter', sans-serif;
          }
          .gradient-text {
            background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .cta-button {
            background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          }
          .cta-button:hover {
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
            transform: translateY(-2px);
          }
          .section-heading {
            border-left: 4px solid var(--color-secondary);
            padding-left: 1rem;
            margin-bottom: 2rem;
          }
          .proof-card {
            background-color: var(--color-card);
            border: 1px solid #334155;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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
            Book Live Demo
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Stop 1-Star Reviews <span className="gradient-text">Before They Happen</span>.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            In today's digital world, your public reputation is everything. Reputation AI installs a powerful, automated firewall that captures negative feedback and resolves customer complaints privately, instantly, and at scale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-xl font-semibold mb-12">
            <p className="text-blue-300 flex items-center">
              <i className="fa-solid fa-user-xmark mr-3 text-2xl"></i> Your customers complain privately.
            </p>
            <p className="text-green-300 flex items-center">
              <i className="fa-solid fa-robot mr-3 text-2xl"></i> Your AI agent fixes the issue instantly.
            </p>
            <p className="text-cyan-300 flex items-center">
              <i className="fa-solid fa-shield-halved mr-3 text-2xl"></i> Your public reputation stays clean.
            </p>
          </div>
          <a href="#demo" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
            <i className="fa-solid fa-calendar-check mr-3"></i> Book Live Demo
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold section-heading mb-12">
            How It Works: The <span className="gradient-text">Instant De-escalation Loop</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            This is the automated, seven-step process the AI uses to turn an angry customer into a satisfied one, preventing public damage.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-blue-400 mb-3">
                <i className="fa-solid fa-qrcode"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Customer Scans QR / Link</h3>
              <p className="text-gray-400 text-sm">
                A customer uses a unique link or QR code to leave <strong>private feedback</strong> directly with your business (not a public review site).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-purple-400 mb-3">
                <i className="fa-solid fa-brain"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Reads the Message</h3>
              <p className="text-gray-400 text-sm">
                Our AI instantly processes the feedback, detecting key markers like <strong>anger, urgency, and severity</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-yellow-400 mb-3">
                <i className="fa-solid fa-file-pen"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Drafts the Solution</h3>
              <p className="text-gray-400 text-sm">
                The AI drafts the perfect, personalized solution, such as a <strong>refund, coupon, replacement, or explanation</strong>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-pink-400 mb-3">
                <i className="fa-solid fa-hand-pointer"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 4</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Owner Approves with One Tap</h3>
              <p className="text-gray-400 text-sm">
                You receive a notification and <strong>approve the AI's suggested action</strong> with a single click—sent instantly via SMS/email.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-indigo-400 mb-3">
                <i className="fa-solid fa-rotate-right"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 5</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Follows Up Automatically</h3>
              <p className="text-gray-400 text-sm">
                The system confirms customer satisfaction with a follow-up message: <strong>"Are you satisfied now?"</strong>
              </p>
            </div>

            {/* Step 6 & 7 */}
            <div className="p-6 rounded-xl border border-gray-700 hover:scale-[1.01] transition duration-300">
              <div className="text-4xl text-green-400 mb-3">
                <i className="fa-solid fa-thumbs-up"></i>
                <span className="float-right text-gray-500 font-bold text-lg">STEP 6/7</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">If Happy → Ask for Review (Legal)</h3>
              <p className="text-gray-400 text-sm">
                Only if the customer confirms satisfaction, the AI funnels them to leave a <strong>positive public review</strong>. This process is 100% legal (no review gating).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section id="why-it-matters" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold section-heading mb-12">
          Why This Matters: Protecting Your <span className="gradient-text">Bottom Line</span>
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Public reviews are the new currency of trust. Every negative review is a direct hit to your revenue.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-xl border border-gray-700">
            <div className="text-5xl text-red-500 mb-4">
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Financial Leak</h3>
            <p className="text-gray-300">
              One negative review can cost your business between <strong>$300–$1,500</strong> in lost prospects and missed sales opportunities.
            </p>
          </div>
          <div className="p-8 rounded-xl border border-gray-700">
            <div className="text-5xl text-orange-500 mb-4">
              <i className="fa-solid fa-users-slash"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">The Multiplier Effect</h3>
            <p className="text-gray-300">
              One angry customer's public post can influence <strong>20 or more</strong> potential prospects to choose a competitor.
            </p>
          </div>
          <div className="p-8 rounded-xl border border-gray-700">
            <div className="text-5xl text-green-500 mb-4">
              <i className="fa-solid fa-crown"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Reputation Shield</h3>
            <p className="text-gray-300">
              Fixing issues privately ensures your average star rating remains high, driving more organic foot traffic and conversions.
            </p>
          </div>
        </div>
      </section>

      {/* PROOF EXAMPLES */}
      <section id="proof" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold section-heading mb-12">
            Proof Examples: <span className="gradient-text">Crisis Averted</span>
          </h2>
          <div className="proof-card p-8 rounded-2xl">
            <h3 className="text-3xl font-extrabold mb-6 text-white text-center">See The Turnaround</h3>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Before */}
              <div>
                <p className="text-sm font-bold uppercase text-red-400 mb-2">Before: Guaranteed 1-Star Review</p>
                <blockquote className="bg-red-900/30 p-4 border-l-4 border-red-500 rounded-lg italic text-red-200">
                  "Food took 30 minutes, it was cold, and the terrible experience made me late for work. I'm going straight to Yelp."
                </blockquote>
                <p className="mt-4 text-lg font-bold text-red-300 flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i> Guaranteed 1-star public review.
                </p>
              </div>
              {/* After */}
              <div>
                <p className="text-sm font-bold uppercase text-green-400 mb-2">After AI: Customer Satisfaction Restored</p>
                <blockquote className="bg-green-900/30 p-4 border-l-4 border-green-500 rounded-lg italic text-green-200">
                  "We're so sorry for the delay—we've refunded your entire meal and sent a $10 coupon for your next visit. We value your time."
                </blockquote>
                <p className="mt-4 text-lg font-bold text-green-300 flex items-center">
                  <i className="fa-solid fa-circle-check mr-2"></i> 1-star prevented. Customer happy to return and review positively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="demo" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Ready to See an <span className="gradient-text">AI Recovery Live?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          See the de-escalation loop in real-time and find out how much revenue you can recover every month.
        </p>
        <a href="/getlivedemo" className="cta-button text-white font-bold py-4 px-12 rounded-xl text-xl inline-flex items-center shadow-lg">
          <i className="fa-solid fa-magnifying-glass-chart mr-3"></i> See an AI Recovery Live
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Reputation AI. Protecting your brand, 24/7.</p>
        </div>
      </footer>
    </div>
  );
}

