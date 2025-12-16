import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  DollarSign,
  CreditCard as CardIcon,
  Download,
  History,
  Zap,
  Shield,
  Globe,
  Star,
  Settings,
  Repeat2,
  XCircle,
  ArrowLeft,
  Calendar,
  Bell,
} from 'lucide-react';

// Constants
const CURRENT_PLAN_NAME = 'Starter'; 
const CURRENT_PLAN_CYCLE = 'monthly';
const CURRENT_PLAN_PRICE = 49;

// Shared plan data
const PLAN_DATA = [
  {
    name: "Starter",
    tagline: "New businesses, barbers, small shops, solo operators.",
    price: 49,
    isMostPopular: false,
    description: "Affordable entry plan to collect private complaints instead of public Google reviews.",
    features: [
      "Digital eBusiness Cards (staff + owner)",
      "Private Feedback Form (scan → send feedback)",
      "Basic Dashboard",
      "10 AI feedback responses per month",
      "Basic review alerts",
    ],
    icon: Zap,
  },
  {
    name: "Pro",
    tagline: "Any business that wants more customers without hiring staff.",
    price: 97,
    isMostPopular: true,
    description: "Stops bad reviews, recovers angry customers, and replaces a $3,500/mo employee.",
    features: [
      "Everything in Starter",
      "AI Negative Review Prevention (Recovery Mode)",
      "AI Win-Back Engine (apology + solution + follow-up)",
      "Auto-Filter: Happy customers → Google Review Request",
      "24/7 AI Inbox (reads messages + drafts replies)",
      "Review Monitoring (Google, Yelp, website)",
      "Unlimited feedback submissions",
      "Owner Alerts (SMS/email)",
      "Smart AI Business Cards with tracking",
      "30 AI responses per day",
    ],
    icon: Shield,
  },
  {
    name: "Agency",
    tagline: "Restaurants, agencies, med spas, franchised businesses, multi-location companies.",
    price: 197,
    isMostPopular: false,
    description: "Full automation across teams + unlimited usage.",
    features: [
      "Everything in Pro",
      "Unlimited staff eBusiness cards",
      "Multiple locations",
      "Team Feedback Routing",
      "Priority AI recovery",
      "Bulk review monitoring",
      "Custom win-back campaigns",
      "API access",
      "White labeling available",
    ],
    icon: Globe,
  },
  {
    name: "Enterprise",
    tagline: "For large brands or companies who need custom AI workflows.",
    price: "Quote",
    isMostPopular: false,
    description: "Full automation across teams + unlimited usage.",
    features: [
      "Custom AI tone training",
      "Dedicated account manager",
      "Enterprise integrations",
      "Custom SMS/email gateways",
      "Advanced analytics",
      "SLA + VIP support",
    ],
    icon: Settings,
    isQuote: true,
  },
];

// Plan Card Component
const PlanCard = ({ plan, onManageClick, onUpgradeClick, onQuoteClick }) => {
  const isCurrentPlan = plan.name === CURRENT_PLAN_NAME;
  const priceDisplay = plan.isQuote ? plan.price : `$${plan.price}`;

  let action = () => {
    if (isCurrentPlan) {
      onManageClick();
    } else if (plan.isQuote) {
      onQuoteClick(plan.name);
    } else {
      onUpgradeClick(plan.name, priceDisplay); 
    }
  };

  return (
    <div className={`
      relative p-6 flex flex-col rounded-2xl shadow-lg border-2 transition-all duration-300 h-full
      ${isCurrentPlan
        ? 'border-sky-500 bg-blue-50 shadow-2xl scale-[1.01]'
        : plan.isMostPopular
        ? 'border-green-500 bg-white shadow-xl'
        : 'border-gray-200 bg-white hover:shadow-xl'
      }
    `}>
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-3 flex items-center space-x-1">
          <Star className='w-3 h-3'/><span>ACTIVE PLAN</span>
        </div>
      )}
      {!isCurrentPlan && plan.isMostPopular && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-3">
          Most Popular
        </div>
      )}

      <div className='flex items-center space-x-3 mb-4'>
        <plan.icon className={`w-8 h-8 ${isCurrentPlan ? 'text-sky-700' : 'text-gray-600'}`} />
        <h3 className="text-3xl font-extrabold text-gray-900">{plan.name}</h3>
      </div>
      
      <p className={`text-sm mb-4 ${isCurrentPlan ? 'text-sky-800 font-semibold' : 'text-gray-600'}`}>{plan.tagline}</p>
      
      <div className="mb-4">
        <p className="text-4xl font-extrabold text-gray-900">
          {priceDisplay}
          {!plan.isQuote && <span className="text-base font-medium text-gray-500"> per month</span>}
        </p>
      </div>

      <p className="text-gray-700 mb-6 flex-grow">{plan.description}</p>

      <ul className="space-y-2 text-sm flex-shrink-0 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2 text-gray-700">
            <CheckCircle className={`w-4 h-4 mt-1 flex-shrink-0 ${isCurrentPlan ? 'text-sky-500' : 'text-green-500'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-auto w-full px-6 py-3 rounded-xl font-bold transition shadow-md ${
          isCurrentPlan ? "text-sky-600 bg-white border-2 border-sky-600 hover:bg-sky-50" : 
          plan.isQuote ? "bg-gray-800 hover:bg-gray-700 text-white" : 
          plan.isMostPopular ? "bg-green-600 hover:bg-green-700 text-white" : "bg-sky-600 hover:bg-sky-700 text-white"
        }`}
        onClick={action}
      >
        {isCurrentPlan ? "Manage Plan" : plan.isQuote ? "Request Enterprise Quote" : `Upgrade to ${plan.name}`}
      </button>
    </div>
  );
};

// Sub-Page 1: Change Billing Cycle
const ChangeCyclePage = ({ onGoBack }) => {
  const [cycle, setCycle] = useState(CURRENT_PLAN_CYCLE);
  
  const annualPrice = CURRENT_PLAN_PRICE * 10;
  const monthlyPrice = CURRENT_PLAN_PRICE;

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-0 space-y-6">
      <button onClick={onGoBack} className="flex items-center text-sky-600 hover:text-sky-800 transition mb-4 font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Billing
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Repeat2 className="w-6 h-6 text-sky-600" />
          <span>Change Billing Cycle</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Adjust your current **{CURRENT_PLAN_NAME}** subscription (${CURRENT_PLAN_PRICE}/{CURRENT_PLAN_CYCLE}).
        </p>

        <div className="flex flex-col space-y-4">
          <label className={`block p-4 rounded-xl border-2 cursor-pointer transition ${cycle === 'monthly' ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-sky-300'}`}>
            <input 
              type="radio" 
              name="billing-cycle" 
              value="monthly" 
              checked={cycle === 'monthly'} 
              onChange={() => setCycle('monthly')} 
              className="hidden"
            />
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <p className="font-bold text-lg text-gray-900">Monthly Billing</p>
                <p className="text-sm text-gray-600">Billed ${monthlyPrice} every 30 days.</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-2xl font-extrabold text-gray-900">${monthlyPrice}</p>
                <p className="text-sm text-gray-500">/mo</p>
              </div>
            </div>
          </label>

          <label className={`block p-4 rounded-xl border-2 cursor-pointer transition ${cycle === 'annual' ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-sky-300'}`}>
            <input 
              type="radio" 
              name="billing-cycle" 
              value="annual" 
              checked={cycle === 'annual'} 
              onChange={() => setCycle('annual')} 
              className="hidden"
            />
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <p className="font-bold text-lg text-gray-900">Annual Billing (Save 17%)</p>
                <p className="text-sm text-green-600 font-semibold">Billed ${annualPrice} once per year.</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-2xl font-extrabold text-gray-900">${annualPrice}</p>
                <p className="text-sm text-gray-500">/yr</p>
              </div>
            </div>
          </label>
        </div>

        <button 
          className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
          onClick={() => {
            console.log(`Billing cycle changed to ${cycle}`);
            onGoBack();
          }}
          disabled={cycle === CURRENT_PLAN_CYCLE}
        >
          {cycle === CURRENT_PLAN_CYCLE ? 'Current Cycle' : `Confirm Switch to ${cycle.toUpperCase()}`}
        </button>
      </div>
    </div>
  );
};

// Sub-Page 2: Edit Payment Method
const EditPaymentPage = ({ onGoBack, cardType, last4 }) => {
  const [name, setName] = useState('John Doe');
  const [cardNumber, setCardNumber] = useState(`**** **** **** ${last4}`);
  const [expiry, setExpiry] = useState('12/26');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Payment method ${cardType} ending in ${last4} updated.`);
    onGoBack();
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-0 space-y-6">
      <button onClick={onGoBack} className="flex items-center text-sky-600 hover:text-sky-800 transition mb-4 font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Payments
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <CardIcon className="w-6 h-6 text-sky-600" />
          <span>Edit {cardType} ({last4})</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Name on Card</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" required />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Card Number</span>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" disabled />
          </label>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <label className="flex-1">
              <span className="text-sm font-medium text-gray-700">Expiration Date (MM/YY)</span>
              <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" required />
            </label>
            <label className="flex-1">
              <span className="text-sm font-medium text-gray-700">CVV</span>
              <input type="text" placeholder="***" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" required />
            </label>
          </div>
          
          <button type="submit" className="w-full bg-sky-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-700 transition">
            Update Payment Method
          </button>
        </form>
      </div>
    </div>
  );
};

// Sub-Page 3: Cancellation Confirmation
const CancellationPage = ({ onGoBack }) => {
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText.toLowerCase() === 'cancel') {
      console.log(`Subscription cancellation confirmed. Reason: ${reason}`);
      onGoBack(); 
    } else {
      console.error("Confirmation text is incorrect.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-0 space-y-6">
      <button onClick={onGoBack} className="flex items-center text-sky-600 hover:text-sky-800 transition mb-4 font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Billing
      </button>
      <div className="bg-red-50 p-6 rounded-2xl shadow-xl border-2 border-red-300">
        <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center space-x-2">
          <XCircle className="w-6 h-6" />
          <span>Confirm Subscription Cancellation</span>
        </h2>
        <p className="text-gray-700 mb-6">
          We are sad to see you go! Cancelling your **{CURRENT_PLAN_NAME}** plan means you will immediately lose access to all review protection features and AI assistants. Your service will stop at the end of the current billing cycle.
        </p>

        <form onSubmit={handleCancel} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Reason for Cancellation (Optional)</span>
            <textarea 
              rows={3}
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-red-700">To confirm, type "cancel" in the box below.</span>
            <input 
              type="text" 
              value={confirmText} 
              onChange={(e) => setConfirmText(e.target.value)} 
              className="w-full p-3 mt-1 border border-red-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
              required 
            />
          </label>

          <button 
            type="submit" 
            className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition"
            disabled={confirmText.toLowerCase() !== 'cancel'}
          >
            Confirm Cancellation
          </button>
          <button 
            type="button" 
            onClick={onGoBack} 
            className="w-full text-sky-600 py-2 font-medium hover:text-sky-800 transition"
          >
            Nevermind, Keep My Plan Active
          </button>
        </form>
      </div>
    </div>
  );
};

// Sub-Page 4: Invoice Detail
const InvoiceDetailPage = ({ onGoBack, invoiceId }) => {
  const invoice = {
    id: invoiceId,
    date: '2024-12-15',
    amount: CURRENT_PLAN_PRICE,
    plan: `${CURRENT_PLAN_NAME} ${CURRENT_PLAN_CYCLE}`,
    paidVia: 'Visa ending in 4242',
    billingTo: 'Neviane AI Business, 123 Main St, USA',
  };

  const handleDownload = () => {
    const pdfContent = `
Invoice PDF - Neviane AI Business
ID: ${invoice.id}
Date: ${invoice.date}
Amount: $${invoice.amount.toFixed(2)}
Plan: ${invoice.plan}
Billed To: ${invoice.billingTo}
Payment: ${invoice.paidVia}
        
--- End of Document ---`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${invoice.id}_${invoice.date}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`Simulated download of Invoice ${invoice.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-0 space-y-6">
      <button onClick={onGoBack} className="flex items-center text-sky-600 hover:text-sky-800 transition mb-4 font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to History
      </button>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Invoice {invoice.id}</h2>
            <p className="text-gray-500">Billed on {invoice.date}</p>
          </div>
          <button 
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition flex items-center w-full sm:w-auto justify-center"
          >
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Billed To:</p>
            <p className="text-gray-800">{invoice.billingTo}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Payment Method:</p>
            <p className="text-gray-800">{invoice.paidVia}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.plan} Subscription</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-4">
          <div className="w-full max-w-xs">
            <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-2 mt-4">
              <span>Total Due:</span>
              <span>${invoice.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-center text-gray-500">This is a simulation of the official PDF invoice.</p>
    </div>
  );
};

// Main Plan Selection Tab Component
const PlanSelectionTab = ({ onLinkClick, showActionModal }) => {
  const handleManageClick = () => {
    onLinkClick('Change Billing Cycle', '/billing/cycle');
  };

  const handleUpgradeClick = (planName: string, price: string) => {
    const message = `Are you sure you want to upgrade to the ${planName} plan for ${price}/month? This will be billed immediately.`;
    showActionModal(`Confirm Upgrade to ${planName}`, message, () => {
      console.log(`Confirmed upgrade to ${planName}. Redirecting to checkout...`);
    });
  };

  const handleQuoteClick = (planName: string) => {
    const message = `A sales representative will contact you within 24 hours to discuss the Enterprise plan features and custom pricing.`;
    showActionModal(`Requesting Quote for ${planName}`, message, () => {
      console.log(`Confirmed quote request for ${planName}.`);
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          <span className="text-sky-600">Upgrade</span> Your Neviane Plan
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You are currently on the **{CURRENT_PLAN_NAME}** plan (${CURRENT_PLAN_PRICE}/{CURRENT_PLAN_CYCLE}). Upgrade to Pro or Agency to unlock full automation features.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="text-lg font-semibold text-sky-800 bg-sky-100 p-3 rounded-xl inline-flex items-center space-x-2 flex-grow justify-center sm:justify-start">
            <Clock className='w-5 h-5'/>
            <span>Next Bill Date: January 15, 2025</span>
          </div>
          <button 
            onClick={() => onLinkClick('Change Billing Cycle', '/billing/cycle')}
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl font-bold border border-gray-300 hover:bg-gray-200 transition text-sm flex-shrink-0 flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 inline mr-2"/> Change Billing Cycle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLAN_DATA.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            onManageClick={handleManageClick}
            onUpgradeClick={handleUpgradeClick}
            onQuoteClick={handleQuoteClick}
          />
        ))}
      </div>

      <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl shadow-md text-center">
        <h4 className="text-lg font-bold text-red-700 mb-2">Manage Your Subscription</h4>
        <button 
          className="mt-3 text-base text-red-600 hover:text-red-700 transition font-medium underline"
          onClick={() => onLinkClick('Cancellation Confirmation', '/billing/cancel')}
        >
          Initiate Plan Cancellation
        </button>
      </div>
    </div>
  );
};

// Tab 2: Payment Method Management
const PaymentMethodsTab = ({ onLinkClick, showActionModal }) => {
  const cards = [
    { type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true, iconColor: 'text-blue-600' },
    { type: 'Mastercard', last4: '0019', expiry: '05/24', isDefault: false, iconColor: 'text-orange-600' },
  ];

  const handleAddCard = () => {
    const message = "In a real application, this would open a secure Stripe/payment gateway form to enter new card details.";
    showActionModal("Add New Payment Method", message, () => {
      console.log("Simulating adding new card...");
    });
  };

  const handleRemoveCard = (last4: string) => {
    const message = `Are you sure you want to remove the card ending in ${last4}? If this is your default card, you must assign a new one before removal.`;
    showActionModal("Confirm Card Removal", message, () => {
      console.log(`Confirmed removal of card ending in ${last4}.`);
    });
  };

  const CardItem = ({ card, onRemoveClick }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center space-x-4">
        <CardIcon className={`w-6 h-6 ${card.iconColor}`} />
        <div>
          <p className="font-semibold text-gray-800">{card.type} ending in {card.last4}</p>
          <p className="text-sm text-gray-500">Expires {card.expiry}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
        {card.isDefault && (
          <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">DEFAULT</span>
        )}
        <button 
          className="text-sm font-medium text-sky-600 hover:text-sky-700"
          onClick={() => onLinkClick('Edit Payment Method', `/billing/payment/edit/${card.last4}`, { cardType: card.type, last4: card.last4 })}
        >
          Edit Payment
        </button>
        {!card.isDefault && (
          <button 
            className="text-sm font-medium text-red-500 hover:text-red-700"
            onClick={() => onRemoveClick(card.last4)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Saved Payment Methods</h3>
        <div className="space-y-3">
          {cards.map((card, index) => 
            <CardItem 
              key={index} 
              card={card} 
              onRemoveClick={handleRemoveCard}
            />
          )}
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 text-center">
        <button 
          onClick={handleAddCard}
          className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-200 transition"
        >
          <CardIcon className="w-5 h-5 inline-block mr-2" /> Add New Card
        </button>
      </div>
    </div>
  );
};

// Tab 3: Billing History
const BillingHistoryTab = ({ onLinkClick }) => {
  const history = [
    { date: '2024-12-15', amount: CURRENT_PLAN_PRICE, status: 'Paid', invoice: 'INV-1234' },
    { date: '2024-11-15', amount: CURRENT_PLAN_PRICE, status: 'Paid', invoice: 'INV-1233' },
    { date: '2024-10-15', amount: CURRENT_PLAN_PRICE, status: 'Paid', invoice: 'INV-1232' },
    { date: '2024-09-15', amount: CURRENT_PLAN_PRICE, status: 'Paid', invoice: 'INV-1231' },
    { date: '2024-08-15', amount: CURRENT_PLAN_PRICE, status: 'Paid', invoice: 'INV-1230' },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-sky-600 font-medium">{item.invoice}</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">${item.amount.toFixed(2)}</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-center">
                  <button 
                    className="text-sky-600 hover:text-sky-900 flex items-center justify-center space-x-1 mx-auto"
                    onClick={() => onLinkClick('Invoice Detail', `/billing/invoice/${item.invoice}`, { invoiceId: item.invoice })}
                  >
                    <Download className="w-4 h-4" />
                    <span>View Invoice</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Billing Page Component
export const BillingPage: React.FC = () => {
  const [activeSubPage, setActiveSubPage] = useState<{ name: string; path: string; params: any } | null>(null);
  const [activeTab, setActiveTab] = useState('Subscription');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string; action: (() => void) | null; buttonText: string }>({ 
    title: '', 
    message: '', 
    action: null, 
    buttonText: 'Confirm' 
  });

  const handleGoBack = () => {
    setActiveSubPage(null);
    setActiveTab('Subscription');
  };

  const handleLinkClick = (name: string, path: string, params: any = {}) => {
    setActiveSubPage({ name, path, params });
  };

  const showActionModal = (title: string, message: string, action: (() => void) | null = null, buttonText: string = 'Confirm') => {
    setModalContent({ title, message, action, buttonText });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: '', message: '', action: null, buttonText: 'Confirm' });
  };

  // Render sub-pages
  if (activeSubPage) {
    switch (activeSubPage.name) {
      case 'Edit Payment Method':
        return <EditPaymentPage onGoBack={handleGoBack} cardType={activeSubPage.params.cardType} last4={activeSubPage.params.last4} />;
      case 'Cancellation Confirmation':
        return <CancellationPage onGoBack={handleGoBack} />;
      case 'Invoice Detail':
        return <InvoiceDetailPage onGoBack={handleGoBack} invoiceId={activeSubPage.params.invoiceId} />;
      case 'Change Billing Cycle':
        return <ChangeCyclePage onGoBack={handleGoBack} />;
      default:
        break;
    }
  }

  const tabs = [
    { name: 'Subscription', icon: DollarSign, component: PlanSelectionTab },
    { name: 'Payment Methods', icon: CardIcon, component: PaymentMethodsTab },
    { name: 'Billing History', icon: History, component: BillingHistoryTab },
  ];

  const ActiveComponent = tabs.find(t => t.name === activeTab)?.component;

  const SimulatedModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all scale-100 border-t-4 border-sky-500">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
            <Bell className='w-5 h-5 text-sky-500'/>
            <span>{modalContent.title}</span>
          </h3>
          <p className="text-gray-700 mb-6">{modalContent.message}</p>
          <div className="flex justify-end space-x-3">
            <button 
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              Close
            </button>
            {modalContent.action && (
              <button 
                onClick={() => {
                  modalContent.action?.();
                  closeModal();
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition font-medium"
              >
                {modalContent.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SimulatedModal />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10 rounded-t-xl shadow-sm">
          <nav className="-mb-px flex space-x-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base transition-colors duration-200 flex items-center space-x-2
                  ${activeTab === tab.name
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-1">
          {activeTab === 'Subscription' && <PlanSelectionTab onLinkClick={handleLinkClick} showActionModal={showActionModal} />}
          {activeTab === 'Payment Methods' && <PaymentMethodsTab onLinkClick={handleLinkClick} showActionModal={showActionModal} />}
          {activeTab === 'Billing History' && <BillingHistoryTab onLinkClick={handleLinkClick} />}
        </div>
      </div>
    </>
  );
};

