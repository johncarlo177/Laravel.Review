import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
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
  Menu,
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
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">ReputationAI</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition">Features</a>
            <a href="#winback" className="text-slate-600 hover:text-blue-600 font-medium transition">Win-Back Engine</a>
            <a href="#loss-calc" className="text-slate-600 hover:text-blue-600 font-medium transition">Loss Calculator</a>
            {/* NEW LINK for Recovery Calculator */}
            <a href="#recovery-calc" className="text-slate-600 hover:text-blue-600 font-medium transition">Recovery Calculator</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition">Pricing</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-blue-600/20">
              Get Demo
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Features</a>
              <a href="#winback" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Win-Back Engine</a>
              <a href="#loss-calc" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Loss Calculator</a>
              {/* NEW MOBILE LINK for Recovery Calculator */}
              <a href="#recovery-calc" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Recovery Calculator</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Pricing</a>
              <button className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold">
                Get Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI Agentic Replacement is here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Turn Customers Into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Promoters — Automatically</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            The AI that prevents bad reviews, wins back unhappy customers, and replaces a full-time staff member. Stop 1-star reviews before they hit Google.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
              Get Live Demo <ArrowRight className="h-5 w-5" />
            </button>
            <button className="bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 text-lg px-8 py-4 rounded-xl font-bold transition flex items-center justify-center">
              Try Free for 7 Days
            </button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-y-4 gap-x-8 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Stops 1-star reviews</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Saves thousands in revenue</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Includes eBusiness Cards</div>
          </div>
        </motion.div>
      </div>
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
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
                <ShieldCheck className="h-10 w-10 text-blue-600 mx-auto mb-3" />
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
                        
                        <button className="w-full mt-8 py-3 bg-white hover:bg-gray-100 text-green-600 font-bold rounded-lg transition shadow-lg shadow-white/30 flex items-center justify-center gap-2">
                            See the Win-Back Dashboard <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
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
                              <ShieldCheck className="h-3 w-3" /> Review Prevented
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-900/50">
            Get Live Demo
          </button>
          <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white text-lg px-8 py-4 rounded-xl font-bold transition">
            Try Free for 7 Days
          </button>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> ReputationAI © {new Date().getFullYear()}
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
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-blue-200">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeatureRecovery />
        <StaffReplacement />
        {/* Negative Review Loss Calculator */}
        <LossCalculator /> 
        {/* Win-Back Engine Feature Details */}
        <WinBackEngineSection /> 
        {/* New Revenue Recovery Calculator (Quantifies Win-Back Value) */}
        <RevenueRecoveryCalculator />
        <DashboardShowcase />
        <AdditionalFeatures /> 
        <ImpactSection />
        <SocialProof />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

