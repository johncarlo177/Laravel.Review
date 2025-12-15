import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const PLANS = [
  { 
    name: 'Starter', 
    price: 49, 
    features: [
      { text: 'Digital eBusiness Cards (staff + owner)', icon: 'fas fa-id-card' },
      { text: 'Private Feedback Form (scan → send feedback)', icon: 'fas fa-qrcode' },
      { text: 'Basic Dashboard', icon: 'fas fa-chart-area' },
      { text: '10 AI feedback responses per month', icon: 'fas fa-reply-all' },
      { text: 'Basic review alerts', icon: 'fas fa-bell' },
    ],
    cta: 'Start for $49',
    bestFor: 'New businesses, barbers, small shops, solo operators.',
    value: 'Affordable entry plan to collect private complaints instead of public Google reviews.',
    color: 'bg-green-500',
    popular: false,
    badgeColor: 'bg-green-100 text-green-800'
  },
  { 
    name: 'Pro', 
    price: 97, 
    features: [
      { text: 'Everything in Starter', icon: 'fas fa-check-double' },
      { text: 'AI Negative Review Prevention (Recovery Mode)', icon: 'fas fa-shield-alt' },
      { text: 'AI Win-Back Engine (apology + solution + follow-up)', icon: 'fas fa-handshake' },
      { text: 'Auto-Filter: Happy customers → Google Review Request', icon: 'fas fa-star' },
      { text: '24/7 AI Inbox (reads messages + drafts replies)', icon: 'fas fa-robot' },
      { text: 'Review Monitoring (Google, Yelp, website)', icon: 'fas fa-eye' },
      { text: 'Unlimited feedback submissions', icon: 'fas fa-comments' },
      { text: 'Owner Alerts (SMS/email)', icon: 'fas fa-sms' },
      { text: 'Smart AI Business Cards with tracking', icon: 'fas fa-chart-bar' },
      { text: '30 AI responses per day', icon: 'fas fa-chart-line' },
    ],
    cta: 'Start Pro (Most Popular)',
    bestFor: 'Any business that wants more customers without hiring staff.',
    value: 'Stops bad reviews, recovers angry customers, and replaces a $3,500/mo employee.',
    color: 'bg-indigo-600',
    popular: true,
    badgeColor: 'bg-indigo-100 text-indigo-800'
  },
  { 
    name: 'Agency', 
    price: 197, 
    features: [
      { text: 'Everything in Pro', icon: 'fas fa-check-double' },
      { text: 'Unlimited staff eBusiness cards', icon: 'fas fa-users' },
      { text: 'Multiple locations', icon: 'fas fa-map-marker-alt' },
      { text: 'Team Feedback Routing', icon: 'fas fa-route' },
      { text: 'Priority AI recovery', icon: 'fas fa-rocket' },
      { text: 'Bulk review monitoring', icon: 'fas fa-database' },
      { text: 'Custom win-back campaigns', icon: 'fas fa-bullhorn' },
      { text: 'API access', icon: 'fas fa-code' },
      { text: 'White labeling available', icon: 'fas fa-palette' },
    ],
    cta: 'Start Agency Plan',
    bestFor: 'Restaurants, agencies, med spas, franchised businesses, multi-location companies.',
    value: 'Full automation across teams + unlimited usage.',
    color: 'bg-orange-500',
    popular: false,
    badgeColor: 'bg-orange-100 text-orange-800'
  },
  { 
    name: 'Enterprise', 
    price: 'Custom', 
    features: [
      { text: 'Custom AI tone training', icon: 'fas fa-cogs' },
      { text: 'Dedicated account manager', icon: 'fas fa-user-tie' },
      { text: 'Enterprise integrations', icon: 'fas fa-puzzle-piece' },
      { text: 'Custom SMS/email gateways', icon: 'fas fa-mail-bulk' },
      { text: 'Advanced analytics', icon: 'fas fa-chart-pie' },
      { text: 'SLA + VIP support', icon: 'fas fa-headset' },
    ],
    cta: 'Request Enterprise Quote',
    bestFor: 'For large brands or companies who need custom AI workflows.',
    value: 'Full automation across teams + unlimited usage.',
    color: 'bg-purple-600',
    isCustom: true,
    badgeColor: 'bg-purple-100 text-purple-800'
  },
];

export default function SubscriptionPage() {
  const { auth } = usePage().props as any;
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]); // Default to Pro
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [purchaseError, setPurchaseError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Redirect if not authenticated or if already has a paid plan
  React.useEffect(() => {
    if (!auth?.user) {
      router.visit('/account/login');
      return;
    }
    
    // Check if user already has a paid subscription
    const user = auth.user;
    const currentPlan = user?.subscriptions?.[0]?.subscription_plan;
    const planName = currentPlan?.name || 'Free';
    const planPrice = currentPlan?.price || 0;
    
    // If user has a paid plan (price > 0), redirect to dashboard
    if (planPrice > 0 && planName !== 'Free') {
      router.visit('/dashboard');
    }
  }, [auth]);

  const handleMockPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPurchaseError('');

    if (selectedPlan.isCustom) {
      setShowModal(true);
      return;
    }

    // Basic Form Validation
    if (cardNumber.length < 16 || expiry.length < 5 || cvc.length < 3 || cardName.length < 3) {
      setPurchaseError("Please fill out all payment details correctly.");
      return;
    }

    setProcessing(true);
    
    try {
      // Mock payment processing - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Call actual subscription API endpoint
      // const response = await fetch('/api/subscription/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plan: selectedPlan.name }),
      // });
      
      // For now, just redirect to dashboard
      setProcessing(false);
      router.visit('/dashboard');
    } catch (error) {
      setProcessing(false);
      setPurchaseError("Payment failed. Please check your card details and try again.");
    }
  };

  const BrandHeader = () => (
    <div className="flex flex-col items-center mb-6">
      <i className="fas fa-brain text-4xl text-blue-700"></i>
      <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Neviane</h1>
      <p className="text-sm text-gray-500 font-semibold tracking-wider">Reputation AI</p>
    </div>
  );

  const PlanCard = ({ plan }) => (
    <div 
      onClick={() => setSelectedPlan(plan)}
      className={`relative flex flex-col p-6 rounded-xl shadow-lg border-2 transition-all duration-200 
        ${plan.isCustom ? 'bg-gray-50 border-purple-500' : 'bg-white cursor-pointer'}
        ${selectedPlan.name === plan.name 
          ? 'border-blue-700 ring-4 ring-blue-100 transform scale-[1.03] shadow-xl' 
          : 'hover:border-blue-400'
        }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md rotate-3">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-sm font-semibold mb-6" style={{color: plan.color}}>
        {plan.bestFor}
      </p>
      
      <p className="text-5xl font-extrabold text-gray-900 mb-2">
        {plan.isCustom ? 'Quote' : `$${plan.price}`}
      </p>
      <p className="text-gray-500 mb-6">
        {plan.isCustom ? 'Contact us' : 'per month'}
      </p>
      
      <p className="text-sm font-semibold mb-4 text-gray-600 border-t border-gray-100 pt-4">
        {plan.value}
      </p>
      
      <ul className="space-y-3 text-sm flex-grow mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <i className={`${feature.icon} text-blue-500 mt-1 mr-3 flex-shrink-0`}></i>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`mt-auto w-full py-3 rounded-lg font-bold text-white transition shadow-lg ${plan.isCustom ? plan.color : 'bg-blue-700 hover:bg-blue-800'}`}
        onClick={() => setSelectedPlan(plan)}
      >
        {plan.cta}
      </button>
    </div>
  );

  const ComparisonTable = () => (
    <div className="max-w-4xl mx-auto mt-16 bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Feature Comparison</h3>
      <div className="overflow-x-auto w-full"> 
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Feature</th>
              {PLANS.map(p => (
                <th key={p.name} className={`py-3 px-3 text-center text-xs font-bold uppercase tracking-wider ${p.name === 'Pro' ? 'text-blue-700' : 'text-gray-600'} min-w-[80px]`}>
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { title: 'eBusiness Cards', Starter: '✔', Pro: '✔', Agency: '✔ Unlimited', Enterprise: '✔' },
              { title: 'Negative Review Prevention AI', Starter: '—', Pro: '✔', Agency: '✔', Enterprise: '✔' },
              { title: 'Win-Back Engine', Starter: '—', Pro: '✔', Agency: '✔', Enterprise: '✔' },
              { title: '24/7 AI Inbox', Starter: '—', Pro: '✔', Agency: '✔', Enterprise: '✔' },
              { title: 'Multi-location', Starter: '—', Pro: '—', Agency: '✔', Enterprise: '✔' },
              { title: 'Team Routing', Starter: '—', Pro: '—', Agency: '✔', Enterprise: '✔' },
              { title: 'Review Monitoring', Starter: 'Basic', Pro: 'Full', Agency: 'Multi-location', Enterprise: 'Advanced' },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap">{row.title}</td>
                <td className="py-4 px-3 text-sm text-center text-gray-500 whitespace-nowrap">{row.Starter}</td>
                <td className="py-4 px-3 text-sm text-center font-bold text-blue-600 whitespace-nowrap">{row.Pro}</td>
                <td className="py-4 px-3 text-sm text-center text-gray-500 whitespace-nowrap">{row.Agency}</td>
                <td className="py-4 px-3 text-sm text-center text-gray-500 whitespace-nowrap">{row.Enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const GuaranteeSection = () => (
    <div className="max-w-4xl mx-auto mt-16 text-center bg-yellow-50 border-2 border-yellow-200 p-6 sm:p-8 rounded-xl shadow-lg">
      <i className="fas fa-certificate text-5xl text-yellow-600 mb-4"></i>
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">14-Day Results Guarantee</h3>
      <p className="text-base sm:text-xl text-gray-700">
        If you don't see a noticeable improvement in customer satisfaction or review protection within 14 days, we guarantee your money back.
      </p>
    </div>
  );

  const Modal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );

  if (!auth?.user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start font-sans">
      <Head title="Choose Your Plan - Neviane" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div className="max-w-7xl mx-auto w-full px-4 py-8 sm:py-12">
        {showModal && (
          <Modal 
            title="Request Custom Quote"
            message="Thank you for your interest in the Enterprise plan! We've received your inquiry and a dedicated account manager will contact you within 24 hours to discuss custom AI workflows."
            onClose={() => setShowModal(false)}
          />
        )}

        <div className="text-center mb-10 sm:mb-12">
          <BrandHeader />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">Choose Your Neviane Plan</h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full power of Reputation AI. Select the best plan for your business needs.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You are currently on the <strong>Free</strong> tier. Choose a plan to unlock all features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PLANS.map(plan => <PlanCard key={plan.name} plan={plan} />)}
        </div>
        
        <GuaranteeSection />
        <ComparisonTable />

        {!selectedPlan.isCustom && (
          <div className="max-w-xl mx-auto mt-16 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment for {selectedPlan.name} Plan (${selectedPlan.price}/mo)</h3>
            
            {purchaseError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {purchaseError}
              </div>
            )}
            <form onSubmit={handleMockPayment} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Card Number (16 digits)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <i className="fab fa-cc-visa absolute right-3 top-3.5 text-2xl text-blue-800"></i>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').substring(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2'))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC (3 digits)"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={processing}
                className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${selectedPlan.price} and Start ${selectedPlan.name}`
                )}
              </button>
            </form>
          </div>
        )}
        
        <div className="max-w-xl mx-auto text-center mt-6">
          <button 
            onClick={() => router.visit('/dashboard')} 
            className="text-sm text-gray-500 hover:text-blue-500 transition"
          >
            Skip for now, go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

