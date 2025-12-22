import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Shield, 
  Star, 
  MessageSquare, 
  UserX, 
  Users, 
  TrendingUp, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Smartphone,
  Mail,
  X,
  ArrowRight,
  Bot,
  User,
  Activity,
  Lock,
  Database,
  Users2,
  Send,
  Target,
  Smile,
  DollarSign,
  Repeat,
  RotateCcw,
  Scale,
  Calculator,
  LogOut,
  Globe,
  RefreshCcw,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage, router } from '@inertiajs/react';
import { LiveSimulationSection } from './components/LiveSimulationSection';
import { Navbar } from '../../components/Navbar';

// --- Components ---
const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 px-6 text-center bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_70%)] pointer-events-none"></div>
      <div className="relative z-10 max-w-[95rem] mx-auto">
        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-[1000] text-white mb-10 tracking-[-0.04em] leading-[0.85] drop-shadow-2xl">
          Turn 1-Star Reviews <br className="hidden lg:block" /> Into 5-Star Wins <span className="text-indigo-500">— Automatically</span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-indigo-100/95 mb-6 max-w-6xl mx-auto leading-[1.05] tracking-tight">
          Bring Back Customers Who Stopped Coming <br className="hidden md:block" />{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Automatically and on autopilot
          </span>
        </h2>
        <div className="mb-10 animate-in slide-in-from-bottom-2 duration-1000">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm md:text-xl font-bold shadow-[0_0_25px_rgba(79,70,229,0.15)] backdrop-blur-sm">
            <Zap size={18} className="fill-indigo-400" />
            Built for local businesses that can't afford bad reviews or lost customers.
          </div>
        </div>
        <p className="text-indigo-200/60 text-lg md:text-2xl font-semibold mb-14 max-w-4xl mx-auto leading-relaxed">
          AI brings back customers absent 30–60+ days with automatic, friendly messages.
        </p>
        <div className="text-indigo-400/80 font-bold text-[10px] md:text-base mb-14 flex flex-wrap items-center justify-center gap-3 md:gap-8 uppercase tracking-[0.2em]">
          <span>AI Recovery</span> • <span>1-Star Prevention</span> • <span>Win-Back Engine</span> • <span>Digital eBusiness Card</span>
        </div>
        <p className="text-slate-400 text-base md:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-16 opacity-80 px-4">
          Protect your reputation, recover unhappy customers, and bring them back before they leave.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href="/getlivedemo" 
            className="w-full sm:w-auto bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-white/5 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
          >
            Get Started Free <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Shield size={14} className="text-indigo-500" /> No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Customers rarely complain to you directly.
              <span className="block text-red-400 mt-2">They complain online.</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              By the time you see the review, the damage is already done.
            </p>
            <div className="space-y-4">
              {[
                "A single 1-star review can cost thousands in lost leads",
                "Owners find negative reviews too late to fix them",
                "Staff forget to follow up with unhappy clients",
                "No system to catch issues before they go public"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-xl">
                  J
                </div>
                <div>
                  <div className="h-4 w-32 bg-slate-600 rounded mb-2"></div>
                  <div className="flex text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 text-slate-600" />
                    <Star className="h-4 w-4 text-slate-600" />
                    <Star className="h-4 w-4 text-slate-600" />
                    <Star className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-700 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-700 rounded"></div>
                <div className="h-4 w-4/6 bg-slate-700 rounded"></div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-red-400 font-bold text-center flex items-center justify-center gap-2">
                  <UserX className="h-5 w-5" /> This review just cost you $2,400
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const FeatureRecovery = () => {
  const steps = [
    { num: 1, text: "Customer scans QR code to leave feedback privately" },
    { num: 2, text: "AI detects negative tone & opens 'Recovery Mode'" },
    { num: 3, text: "AI replies instantly with apology + solution" },
    { num: 4, text: "Escalates to owner only if absolutely needed" },
    { num: 5, text: "AI follows up later to ensure satisfaction" },
    { num: 6, text: "Only happy customers are asked for Google reviews" },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
            CORE TECHNOLOGY
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">AI Negative Review Prevention</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stop negative reviews before they become public. Our AI acts as a firewall for your reputation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h3 className="font-bold text-xl mb-6">How Auto-Recovery Works:</h3>
               <div className="space-y-6">
                 {steps.map((step) => (
                   <div key={step.num} className="flex gap-4">
                     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/30">
                       {step.num}
                     </div>
                     <p className="text-slate-700 font-medium pt-1">{step.text}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-slate-900">Saves Reputation</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <div className="font-bold text-slate-900">Protects Revenue</div>
              </div>
              <div className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-xl text-white text-center">
                 <h4 className="text-2xl font-bold mb-2">100% Legal</h4>
                 <p className="opacity-90">Gatekeeping is fully compliant when done through private feedback channels first.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StaffReplacement = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">AI Staff Replacement</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            This is not just software. It’s a full-time employee for the price of WiFi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Staff */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 opacity-60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-500">Human Staff</h3>
              <span className="text-xl font-bold text-slate-400">$3,500/mo</span>
            </div>
            <ul className="space-y-3 text-slate-500">
              <li className="flex gap-2"><X className="h-5 w-5" /> Needs training</li>
              <li className="flex gap-2"><X className="h-5 w-5" /> Only works 8 hours</li>
              <li className="flex gap-2"><X className="h-5 w-5" /> Forgets to follow up</li>
              <li className="flex gap-2"><X className="h-5 w-5" /> Gets emotional</li>
            </ul>
          </div>

          {/* AI Staff */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              RECOMMENDED
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-600" /> AI Agent
              </h3>
              <span className="text-3xl font-bold text-blue-600">$97/mo</span>
            </div>
            <ul className="space-y-4">
              {[
                "Instant feedback scanning",
                "24/7 Response time",
                "Win-back automations",
                "Review monitoring",
                "Issue categorization",
                "Reporting dashboard"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                  <CheckCircle className="h-5 w-5 text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- EXISTING LOSS CALCULATOR SECTION (Uses Red/Loss theme) ---

const LossCalculator = () => {
    // State for inputs
    const [monthlyCustomers, setMonthlyCustomers] = useState(500);
    const [avgTransaction, setAvgTransaction] = useState(50);
    const [oneStarCount, setOneStarCount] = useState(2);
    const [twoStarCount, setTwoStarCount] = useState(1);

    // Persuasive Marketing Impact Factors (Estimated customers lost per review)
    // Based on industry data suggesting a low rating drives potential customers to competitors.
    const lostCustomersPer1Star = 5;
    const lostCustomersPer2Star = 3;

    // Calculation using useMemo for efficiency
    const { estimatedLostCustomers, estimatedMonthlyLoss, estimatedAnnualLoss } = useMemo(() => {
        // Calculate the number of potential customers who will avoid the business this year
        // due to these specific reviews, based on our assumed impact factor.
        const totalLostCustomersPerMonth = (oneStarCount * lostCustomersPer1Star) + (twoStarCount * lostCustomersPer2Star);

        // Calculate the monthly revenue lost
        const monthlyLoss = totalLostCustomersPerMonth * avgTransaction;

        // Calculate the annual revenue lost
        const annualLoss = monthlyLoss * 12;

        return {
            estimatedLostCustomers: totalLostCustomersPerMonth,
            estimatedMonthlyLoss: monthlyLoss,
            estimatedAnnualLoss: annualLoss
        };
    }, [oneStarCount, twoStarCount, avgTransaction]);

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);

    const StatDisplay = ({ label, value, description }) => (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <p className="text-sm font-semibold text-red-600 mb-1">{label}</p>
            <div className="text-4xl font-extrabold text-red-800 mb-2">{formatCurrency(value)}</div>
            <p className="text-xs text-red-500">{description}</p>
        </div>
    );

    const InputField = ({ label, value, onChange, icon: Icon, unit }) => (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Icon className="h-4 w-4 text-blue-600" /> {label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 text-lg font-bold text-slate-900 focus:ring-blue-500 focus:border-blue-500 border-none"
                />
                {unit && <span className="p-2 text-slate-500 text-sm bg-gray-50 border-l border-gray-300">{unit}</span>}
            </div>
        </div>
    );

    return (
        <section id="loss-calc" className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <Scale className="h-4 w-4" /> REVENUE LEAK ANALYSIS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        The <span className="text-red-400">Negative Review</span> Revenue Leak Calculator
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        See the real money you're losing every year from just a few poor ratings.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Input Panel */}
                    <div className="lg:col-span-2 bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Calculator className="h-6 w-6 text-blue-400" /> Your Business Metrics</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField 
                                label="Average Transaction Value"
                                value={avgTransaction}
                                onChange={setAvgTransaction}
                                icon={DollarSign}
                                unit="USD"
                            />
                            <InputField 
                                label="Estimated Monthly Customers"
                                value={monthlyCustomers}
                                onChange={setMonthlyCustomers}
                                icon={Users}
                                unit="Customers"
                            />
                        </div>

                        <h3 className="text-xl font-bold text-white pt-4 mb-4 flex items-center gap-2">
                           <AlertTriangle className="h-6 w-6 text-yellow-400" /> Negative Review Count
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField 
                                label="Number of 1-Star Reviews (Total on all platforms)"
                                value={oneStarCount}
                                onChange={setOneStarCount}
                                icon={() => <Star className="h-4 w-4 text-red-400 fill-red-400" />}
                                unit="Reviews"
                            />
                            <InputField 
                                label="Number of 2-Star Reviews (Total on all platforms)"
                                value={twoStarCount}
                                onChange={setTwoStarCount}
                                icon={() => <Star className="h-4 w-4 text-orange-400 fill-orange-400" />}
                                unit="Reviews"
                            />
                        </div>
                        <p className="text-xs text-slate-500 pt-4">
                            *This calculator uses an estimated industry standard: a single 1-star review may cause 5 potential customers to choose a competitor, and a 2-star causes 3.
                        </p>
                    </div>
                    
                    {/* Results Panel */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-2xl border-2 border-red-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <DollarSign className="h-6 w-6 text-red-600" /> Estimated Annual Loss
                            </h3>
                            
                            <StatDisplay 
                                label="ESTIMATED YEARLY REVENUE LEAK"
                                value={estimatedAnnualLoss}
                                description={`That's ${formatCurrency(estimatedMonthlyLoss)} lost every month.`}
                            />

                            <div className="mt-8">
                                <p className="text-sm font-semibold text-slate-700">Based on your inputs:</p>
                                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                                    <li className="flex justify-between">
                                        <span>Potential Customers Lost/Month:</span>
                                        <span className="font-bold text-red-600">{estimatedLostCustomers}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Loss from 1-Star Reviews:</span>
                                        <span className="font-bold text-red-600">{formatCurrency(oneStarCount * lostCustomersPer1Star * avgTransaction * 12)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <button className="w-full mt-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
                            Stop the Leak Today <RotateCcw className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- NEW REVENUE RECOVERY CALCULATOR SECTION (Uses Green/Recovery theme) ---

const RevenueRecoveryCalculator = () => {
    // State for inputs
    const [lostCustomersAnnually, setLostCustomersAnnually] = useState(250);
    const [avgCustomerValue, setAvgCustomerValue] = useState(500);
    const [recoveryRate, setRecoveryRate] = useState(15); // Percentage 5% to 30%

    // Calculation using useMemo for efficiency
    const { estimatedCustomersRecovered, estimatedAnnualRecovery } = useMemo(() => {
        const rate = recoveryRate / 100;
        
        // Customers recovered: Total lost * Recovery Rate
        const customersRecovered = Math.round(lostCustomersAnnually * rate);
        
        // Revenue recovered: Customers recovered * Average Customer Value (CLV)
        const annualRecovery = customersRecovered * avgCustomerValue;

        return {
            estimatedCustomersRecovered: customersRecovered,
            estimatedAnnualRecovery: annualRecovery
        };
    }, [lostCustomersAnnually, avgCustomerValue, recoveryRate]);

    // Format currency
    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);

    const InputField = ({ label, value, onChange, icon: Icon, unit }) => (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Icon className="h-4 w-4 text-green-600" /> {label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 text-lg font-bold text-slate-900 focus:ring-green-500 focus:border-green-500 border-none"
                />
                {unit && <span className="p-2 text-slate-500 text-sm bg-gray-50 border-l border-gray-300">{unit}</span>}
            </div>
        </div>
    );
    
    // Custom input for the Recovery Rate slider
    const RateSlider = ({ value, onChange }) => (
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <Repeat className="h-4 w-4 text-green-600" /> Win-Back Engine Recovery Rate
            </label>
            <div className="relative pt-2">
                <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer range-lg transition duration-150 ease-in-out"
                />
                <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium text-slate-500">5%</span>
                    <span className="text-lg font-bold text-green-600">{value}%</span>
                    <span className="text-sm font-medium text-slate-500">30%</span>
                </div>
            </div>
        </div>
    );


    return (
        <section id="recovery-calc" className="py-24 bg-slate-50 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600/50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <TrendingUp className="h-4 w-4" /> REVENUE GENERATION ANALYSIS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        The <span className="text-green-600">Win-Back</span> Revenue Recovery Calculator
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Quantify the automatic revenue boost from recovering dormant customers.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Input Panel */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-xl space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Calculator className="h-6 w-6 text-green-600" /> Key Recovery Metrics</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField 
                                label="Average Customer Lifetime Value (CLV)"
                                value={avgCustomerValue}
                                onChange={setAvgCustomerValue}
                                icon={DollarSign}
                                unit="USD"
                            />
                            <InputField 
                                label="Estimated Annual Lost Customers"
                                value={lostCustomersAnnually}
                                onChange={setLostCustomersAnnually}
                                icon={Users}
                                unit="Customers"
                            />
                        </div>

                        <RateSlider value={recoveryRate} onChange={setRecoveryRate} />

                        <p className="text-xs text-slate-500 pt-4">
                            *The Recovery Rate is based on industry average success rates for automated win-back campaigns. Our system aims for the high end of this range.
                        </p>
                    </div>
                    
                    {/* Results Panel */}
                    <div className="lg:col-span-1 bg-green-600 p-8 rounded-2xl border-2 border-green-700 shadow-xl flex flex-col justify-between text-white">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-200">
                                <DollarSign className="h-6 w-6 text-white" /> Estimated Annual Recovery
                            </h3>
                            
                            <div className="bg-green-700 p-6 rounded-xl border border-green-500">
                                <p className="text-sm font-semibold text-green-200 mb-1">POTENTIAL YEARLY REVENUE GAIN</p>
                                <div className="text-4xl font-extrabold text-white mb-2">{formatCurrency(estimatedAnnualRecovery)}</div>
                                <p className="text-xs text-green-300">That's money automatically earned back by the Win-Back Engine.</p>
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-semibold text-green-200">Recovery Breakdown:</p>
                                <ul className="mt-2 space-y-2 text-sm text-green-100">
                                    <li className="flex justify-between">
                                        <span>Estimated Customers Recovered:</span>
                                        <span className="font-bold text-white">{estimatedCustomersRecovered.toLocaleString()}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Revenue per Recovered Customer (CLV):</span>
                                        <span className="font-bold text-white">{formatCurrency(avgCustomerValue)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <a
                            href="/winback-calulator"
                            className="w-full mt-8 py-3 bg-white hover:bg-gray-100 text-green-600 font-bold rounded-lg transition shadow-lg shadow-white/30 flex items-center justify-center gap-2"
                        >
                            Win-Back Calculator <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- WINBACK PAGE CONTENT (Inserted between Loss Calculator and WinBack Engine Section) ---
const WinBackPageContent = () => {
  return (
    <div className="winback-content" style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <style>{`
        .winback-content {
          --color-primary: #8b5cf6;
          --color-secondary: #10b981;
        }
        .winback-content .gradient-text {
          background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .winback-content .cta-button {
          background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }
        .winback-content .cta-button:hover {
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
          transform: translateY(-2px);
        }
        .winback-content .section-heading {
          border-left: 4px solid var(--color-secondary);
          padding-left: 1rem;
          margin-bottom: 2rem;
        }
        .winback-content .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background-color: #334155;
          z-index: 0;
        }
        .winback-content .phone-mockup {
          border: 8px solid #334155;
          border-radius: 30px;
          overflow: hidden;
          background-color: #000;
          position: relative;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {/* HERO */}
      <section id="winback-hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Turn Lost Customers <br />
            <span className="gradient-text">Back Into Paying Customers</span>.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Stop letting profit walk out the door. Our AI runs automated follow-ups that recover{' '}
            <span className="text-green-400 font-bold">5–15%</span> of churned customers automatically.
          </p>
          <a href="/winback" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
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
                  Hey Sarah! Haven't seen you in a while.
                </div>
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-none text-sm shadow-md">
                  Here's <strong>15% off</strong> your next visit — valid for 7 days. We'd love to see you!
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
                  We value you — here's a thank-you gift for being a loyal customer.
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
          href="/winback"
          className="cta-button text-white font-bold py-5 px-12 rounded-xl text-2xl inline-flex items-center shadow-lg hover:scale-105 transition transform"
        >
          <i className="fa-solid fa-rocket mr-3" /> Launch Your Win-Back Automation
        </a>
      </section>
    </div>
  );
};

// --- NEW 7-STEP WIN-BACK ENGINE SECTION ---

const WinBackEngineSection = () => {
    const steps = [
        { 
            num: 1, 
            icon: Database, 
            title: "Instant Data Import", 
            description: "Connect your CSV, CRM, or list. AI instantly analyzes Last Visit, LTV, and Frequency, turning disorganized contacts into a goldmine of actionable data." 
        },
        { 
            num: 2, 
            icon: Users2, 
            title: "Smart AI Segmentation", 
            description: "The AI automatically splits your list into high-conversion buckets (Lost, Dormant, VIPs, One-Time, Failed Leads) to maximize your outreach ROI." 
        },
        { 
            num: 3, 
            icon: Bot, 
            title: "Hyper-Personalized Messaging", 
            description: "No robotic templates. The AI adapts tone, style, and timing, writing the perfect, human-sounding message for each customer segment." 
        },
        { 
            num: 4, 
            icon: Send, 
            title: "Intelligent Channel Selection", 
            description: "The AI selects the channel where the customer is most likely to respond (SMS, Email, WhatsApp, etc.) based on their past engagement history." 
        },
        { 
            num: 5, 
            icon: Smile, 
            title: "Human-Like Delivery", 
            description: "Messages feel like a friendly reminder, not a sales blast. No aggressive sales tactics—just helpful, genuine connection that restores trust." 
        },
        { 
            num: 6, 
            icon: Target, 
            title: "Real-Time Reaction Tracking", 
            description: "The AI listens and logs every move. Replies, clicks, or physical visits are tracked. Customer intent ('I'll come next week') is automatically logged as a Hot Lead." 
        },
        { 
            num: 7, 
            icon: DollarSign, 
            title: "The ROI Report", 
            description: "The Business Owner's Favorite: See exactly how much money we made you this month—including Revenue Recovered and Customers Returned." 
        },
    ];

    const StatCard = ({ label, value, color, change }) => (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-md">
            <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
            <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {value}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color === 'green' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {change}
                </span>
            </div>
        </div>
    );

    return (
        <section id="winback" className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <Activity className="h-4 w-4" /> REVENUE GENERATION
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        The <span className="text-orange-600">7-Step Win-Back Engine</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Turn Your "Dead" Contact List into Predictable Monthly Revenue. Stop leaving money on the table.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Step Cards */}
                    <div className="lg:col-span-2 space-y-8 relative">
                        {steps.map((step, index) => (
                            <div key={step.num} className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-orange-200 transition duration-300">
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-orange-600/30">
                                        {step.num}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="w-0.5 h-full bg-orange-200 my-2" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-2">
                                        <step.icon className="h-5 w-5 text-orange-600" /> {step.title}
                                    </h3>
                                    <p className="text-slate-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* Optional Loop */}
                        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 mt-10">
                            <div className="flex items-center gap-3 mb-3">
                                <Repeat className="h-6 w-6 text-green-400" />
                                <h4 className="text-lg font-bold text-white">The 90-Day "Set & Forget" Loop</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Turn this into a fully automated flywheel. Keep your customers engaged year-round without lifting a finger. Day 0: Upload Contacts. Day 30: Friendly Reminder. Day 90: Strong Offer.
                            </p>
                        </div>
                    </div>
                    
                    {/* Stats and Callout */}
                    <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28 self-start pt-4">
                        <div className="p-6 bg-orange-500 rounded-2xl shadow-xl border border-orange-400 text-white">
                            <Zap className="h-8 w-8 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">ROI Proof</h3>
                            <p className="opacity-90">
                                This is the feature that pays for itself. You see immediate, verifiable revenue recovery.
                            </p>
                        </div>

                        <StatCard 
                            label="Revenue Recovered" 
                            value="$1,247.00" 
                            color="green" 
                            change="🟢 $215 Today" 
                        />
                        <StatCard 
                            label="Customers Returned" 
                            value="18" 
                            color="green" 
                            change="⬆️ 5 New" 
                        />
                        <StatCard 
                            label="Lost Customers Reactivated" 
                            value="12" 
                            color="green" 
                            change="⬆️ 80%" 
                        />
                        
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-6">
                            Start Recovering Revenue Now <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Dashboard Component (Unchanged) ---
const DashboardShowcase = () => {
  return (
    <section id="dashboard" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-600/5 -skew-y-3 transform origin-bottom-left" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 px-4 py-1.5 rounded-full text-blue-400 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live System Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">See It Happen In <span className="text-blue-500">Real-Time</span></h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Watch your AI agent handle complaints, save revenue, and update your dashboard instantly.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Dashboard Header */}
          <div className="border-b border-slate-700 bg-slate-900/50 p-4 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500" />
                   <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block" />
                <span className="font-mono text-sm text-slate-400 hidden sm:block">owner_dashboard.exe</span>
             </div>
             <div className="flex items-center gap-3 text-sm font-medium text-green-400">
                <Zap className="h-4 w-4" /> System Active
             </div>
          </div>

          <div className="grid lg:grid-cols-3 min-h-[600px]">
            {/* Sidebar / Stats */}
            <div className="col-span-1 border-r border-slate-700 bg-slate-800/50 p-6 flex flex-col gap-6">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Metrics (Today)</h4>
               
               {/* Stat Card 1 */}
               <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="text-slate-400 text-sm mb-1">Revenue Protected</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    $1,250 <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">+12%</span>
                  </div>
               </div>

               {/* Stat Card 2 */}
               <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="text-slate-400 text-sm mb-1">Intercepted Reviews</div>
                  <div className="text-3xl font-bold text-white">
                    3 <span className="text-sm font-normal text-slate-400">/ 3</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                     <div className="bg-blue-500 h-full w-full animate-pulse" />
                  </div>
               </div>

                {/* Active Agents */}
               <div className="mt-auto">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                       <Bot className="h-10 w-10 text-blue-400 p-2 bg-blue-400/10 rounded-lg" />
                       <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-800" />
                    </div>
                    <div>
                       <div className="font-bold">AI Agent Active</div>
                       <div className="text-xs text-slate-400">Handling 2 conversations</div>
                    </div>
                 </div>
                 <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                    Auto-response speed: <strong>1.2s</strong>
                 </div>
               </div>
            </div>

            {/* Main Chat Interface */}
            <div className="col-span-2 bg-slate-900 p-6 flex flex-col relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50" />
               
               <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-bold text-lg">Live Interaction Log</h3>
                    <p className="text-slate-500 text-sm">Ticket #2948 • "Wait time too long"</p>
                  </div>
                  <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
                     ⚠️ Recovery Mode
                  </span>
               </div>

               <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  {/* Customer Message */}
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-slate-400" />
                     </div>
                     <div className="space-y-1 max-w-[85%]">
                        <div className="flex items-baseline gap-2">
                           <span className="text-sm font-bold text-slate-300">Customer</span>
                           <span className="text-xs text-slate-500">2 mins ago</span>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 text-slate-300">
                           I've been waiting for 45 minutes. This is ridiculous. I'm leaving a review.
                        </div>
                     </div>
                  </div>

                  {/* AI Thinking State */}
                  <div className="flex gap-4 opacity-75">
                     <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-600/50">
                        <Bot className="h-4 w-4 text-blue-400" />
                     </div>
                     <div className="space-y-1 w-full">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-blue-400">AI Agent</span>
                           <span className="text-xs text-slate-500">Processing...</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-blue-900/20 p-2 rounded inline-block">
                           <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                           Analyzing sentiment: ANGRY (0.98)
                           <ArrowRight className="h-3 w-3 mx-1" />
                           Initiating Win-Back Protocol
                        </div>
                     </div>
                  </div>

                  {/* AI Response */}
                   <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                        <Bot className="h-4 w-4 text-white" />
                     </div>
                     <div className="space-y-1 max-w-[85%]">
                        <div className="flex items-baseline gap-2">
                           <span className="text-sm font-bold text-white">AI Agent</span>
                           <span className="text-xs text-slate-500">Just now</span>
                        </div>
                        <div className="bg-blue-600 p-4 rounded-2xl rounded-tl-none text-white shadow-xl">
                           I'm so sorry for the wait, John. That's not the experience we want for you. <br/><br/>
                           I've just sent a <strong>Free Appetizer</strong> voucher to your phone for your next visit. We'd love another chance to make it right.
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Offer Accepted
                           </span>
                           <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20 flex items-center gap-1">
                              <Shield className="h-3 w-3" /> Review Prevented
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- REVISED AdditionalFeatures (Win-Back removed to avoid duplication) ---
const AdditionalFeatures = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* eCards */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-24">
          <div className="flex-1">
            <div className="inline-block p-3 rounded-xl bg-purple-100 text-purple-600 mb-6">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">AI eBusiness Cards</h3>
            <p className="text-lg text-slate-600 mb-6">
              Every staff member gets a smart digital card. Like HiHello, but built-in.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-purple-500" /> QR codes for instant sharing</li>
              <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-purple-500" /> One-tap contact saving</li>
              <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-purple-500" /> Auto-follow-up when card is saved</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 bg-slate-900 rounded-[2rem] p-4 border-4 border-slate-800 shadow-2xl">
              <div className="bg-white h-full rounded-[1.5rem] overflow-hidden flex flex-col items-center pt-8 px-4 pb-4">
                 <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 border-4 border-white shadow-lg"></div>
                 <div className="text-center mb-6">
                   <div className="font-bold text-lg">Sarah Smith</div>
                   <div className="text-sm text-gray-500">Sales Manager</div>
                 </div>
                 <div className="w-32 h-32 bg-slate-900 rounded-xl mb-6 flex items-center justify-center text-white text-xs">QR CODE</div>
                 <button className="w-full bg-blue-600 text-white rounded-full py-2 text-sm font-bold">Save Contact</button>
              </div>
            </div>
          </div>
        </div>

        {/* Inbox */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-block p-3 rounded-xl bg-green-100 text-green-600 mb-6">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">AI Review Inbox</h3>
            <p className="text-lg text-slate-600 mb-6">
              One inbox for Google, Yelp, Facebook, and private feedback. AI sorts the chaos.
            </p>
            <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">🔥 Urgent</span>
               <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">😡 Angry</span>
               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">⭐ Positive</span>
               <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">🛑 Spam</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
               <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between">
                 <div className="font-bold text-gray-700">Inbox</div>
                 <div className="text-sm text-blue-600 font-medium">Auto-Reply: ON</div>
               </div>
               <div className="divide-y divide-gray-100">
                 <div className="p-4 bg-red-50/50">
                   <div className="flex justify-between mb-1">
                     <span className="font-bold text-sm">Google Review</span>
                     <span className="text-xs text-red-500 font-bold">Detected: Negative</span>
                   </div>
                   <p className="text-sm text-gray-600 truncate">"Food was cold and service was..."</p>
                 </div>
                 <div className="p-4">
                   <div className="flex justify-between mb-1">
                     <span className="font-bold text-sm">Direct Feedback</span>
                     <span className="text-xs text-green-500 font-bold">Replying...</span>
                   </div>
                   <p className="text-sm text-gray-600 truncate">"Loved the new menu items!"</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ECARDS PAGE CONTENT (Inserted between Impact Section and Social Proof) ---
const EcardsPageContent = () => {
  return (
    <div className="ecards-content" style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <style>{`
        .ecards-content {
          --color-primary: #06b6d4;
          --color-secondary: #34d399;
          --color-background: #0f172a;
          --color-card: #1e293b;
        }
        .ecards-content .gradient-text {
          background-image: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ecards-content .cta-button {
          background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }
        .ecards-content .cta-button:hover {
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.6);
          transform: translateY(-2px);
        }
        .ecards-content .section-heading {
          border-left: 4px solid var(--color-secondary);
          padding-left: 1rem;
          margin-bottom: 2rem;
        }
        .ecards-content .ecard-mockup {
          background-color: #27374d;
          border: 1px solid #334155;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          min-height: 450px;
        }
        .ecards-content .business-card-light {
          background-color: #ffffff;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .ecards-content .business-card-light .icon-action {
          background-color: #f0f9ff;
          color: #0e7490;
          transition: background-color 0.2s;
        }
        .ecards-content .business-card-light .icon-action:hover {
          background-color: #e0f2f7;
        }
        .ecards-content .qr-code-box img {
          image-rendering: pixelated;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {/* HERO SECTION */}
      <section id="ecards-hero" className="py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Modern AI eBusiness Cards <br />
            for <span className="gradient-text">Owners, Staff &amp; Teams</span>.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Replace costly, outdated paper cards with smart, scannable, AI-powered digital cards that drive contact, trust, and reviews.
          </p>
          <a href="/Ecards" className="cta-button text-white font-bold py-4 px-10 rounded-xl text-xl inline-flex items-center shadow-lg">
            <i className="fa-solid fa-qrcode mr-3"></i> Create Your eCard
          </a>
        </div>
      </section>

      {/* FEATURES + MOCKUP */}
      <section id="ecards-features" className="py-16 bg-gray-900">
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
              The eCard's true value is routing customers who might be frustrated away from public review sites and into your private AI recovery system.
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
      <section id="ecards-cta" className="py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-white">
          Ready to Go Digital? <span className="gradient-text">Design Your Smart eCard</span>
        </h2>
        <a
          href="/Ecards"
          className="cta-button text-white font-bold py-5 px-12 rounded-xl text-2xl inline-flex items-center shadow-lg hover:scale-105 transition transform"
        >
          <i className="fa-solid fa-wand-magic-sparkles mr-3"></i> Design Your Smart eCard
        </a>
      </section>
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Why This Matters</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <div className="text-4xl font-bold text-green-400 mb-2">1</div>
            <p className="text-slate-300">Recovered customer pays for the subscription</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <div className="text-4xl font-bold text-green-400 mb-2">$1000s</div>
            <p className="text-slate-300">Saved by preventing a single 1-star review</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
            <p className="text-slate-300">Brand protection while you sleep</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-slate-600">Your AI system pays for itself fast.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">Starter</h3>
            <div className="my-6">
              <span className="text-4xl font-bold">$49</span><span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-600 text-sm mb-6">Essentials for small businesses.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Basic Feedback System</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> eBusiness Cards</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Email Support</li>
            </ul>
            <button className="w-full py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
              Start Free Trial
            </button>
          </div>

          {/* Pro */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl flex flex-col relative transform md:-translate-y-4">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg">
              BEST VALUE
            </div>
            <h3 className="text-xl font-bold text-white">Pro</h3>
            <div className="my-6">
              <span className="text-4xl font-bold text-white">$97</span><span className="text-slate-400">/mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">Full AI replacement suite.</p>
            <ul className="space-y-4 mb-8 flex-1 text-white">
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" /> Negative Review Prevention</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" /> AI Review Inbox</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" /> Win-Back System</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" /> Staff Replacement Features</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" /> AI Auto-Responses</li>
            </ul>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
              Get Started
            </button>
          </div>

          {/* Agency */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">Agency</h3>
            <div className="my-6">
              <span className="text-4xl font-bold">$197</span><span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-600 text-sm mb-6">For teams and multiple locations.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Everything in Pro</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Unlimited Staff Cards</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Unlimited Locations</li>
              <li className="flex gap-3 text-sm"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> Bulk Monitoring</li>
            </ul>
            <button className="w-full py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl relative">
            <div className="text-5xl text-blue-200 absolute top-4 left-4 font-serif">"</div>
            <p className="relative z-10 text-lg text-slate-700 italic mb-4">
              Before using this, we averaged a bad review every 2–3 weeks. Now we haven’t had one in 3 months.
            </p>
            <div className="font-bold text-slate-900">— Local Restaurant Owner</div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl relative">
            <div className="text-5xl text-blue-200 absolute top-4 left-4 font-serif">"</div>
            <p className="relative z-10 text-lg text-slate-700 italic mb-4">
              This saved us from losing a client worth $900/month. The system paid for itself instantly.
            </p>
            <div className="font-bold text-slate-900">— Service Business Manager</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Stop losing customers.<br/>
          <span className="text-blue-500">Stop losing money.</span>
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Stop letting bad reviews ruin your reputation. Your business deserves protection.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a href="/getlivedemo" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-900/50">
            Get Live Demo
          </a>
          <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white text-lg px-8 py-4 rounded-xl font-bold transition">
            Try Free for 7 Days
          </button>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <Shield className="h-5 w-5" /> ReputationAI © {new Date().getFullYear()}
          </div>
          <div className="space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans text-slate-100 bg-slate-950 selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LiveSimulationSection />
        <ProblemSection />
        <FeatureRecovery />
        <StaffReplacement />
        {/* Negative Review Loss Calculator */}
        <LossCalculator /> 
        {/* Win-Back Page Content */}
        <WinBackPageContent />
        {/* Win-Back Engine Feature Details */}
        <WinBackEngineSection /> 
        {/* New Revenue Recovery Calculator (Quantifies Win-Back Value) */}
        <RevenueRecoveryCalculator />
        <DashboardShowcase />
        <AdditionalFeatures /> 
        <ImpactSection />
        {/* Ecards Page Content */}
        <EcardsPageContent />
        <SocialProof />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

