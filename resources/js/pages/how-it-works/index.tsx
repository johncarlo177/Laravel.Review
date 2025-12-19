import React from 'react';
import { Shield } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

const HowItWorksPage = () => {
  const steps = [
    { number: "01", title: "Customer finishes their visit", description: "After a service or purchase, customers are invited to leave quick feedback through SMS, email, or a QR code." },
    { number: "02", title: "Feedback stays private first", description: "Before anything goes public, customers rate their experience inside a private feedback flow. 5-star feedback stays positive. 1–4 star feedback is intercepted before reaching public review sites." },
    { number: "03", title: "AI Recovery activates instantly", description: "When feedback is 1–4 stars, AI responds in real time with a calm, human-sounding apology and asks what went wrong. All communication stays private." },
    { number: "04", title: "Issues are resolved privately", description: "Once the customer feels heard and the issue is resolved, the conversation is closed respectfully. Only satisfied customers are invited to leave a public review." },
    { number: "05", title: "Happy customers grow your reputation", description: "Customers who give 5 stars are smoothly guided to leave a Google review with no pressure or marketing language." },
    { number: "06", title: "Win-Back brings customers back", description: "Customers who don't return after a set number of days receive a friendly, non-pushy follow-up message inviting them back." },
    { number: "07", title: "Stay connected with eBusiness Cards", description: "Customers can save the business or staff contact instantly using a smart eBusiness Card for future visits or referrals." }
  ];

  const results = ["Fewer bad public reviews", "More authentic 5-star ratings", "Recovered unhappy customers", "More repeat visits", "Stronger customer relationships"];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <Navbar />
      <div className="animate-in fade-in duration-700 pt-20">
        <section className="py-24 bg-slate-950 min-h-screen">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-20 text-center tracking-tight">How It Works</h2>
            <div className="space-y-16 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"></div>
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-indigo-500/20 ring-4 ring-slate-950">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-32 pt-16 border-t border-white/5">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Results</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage;

