import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

const CalculatorPage = () => {
  const [customers, setCustomers] = useState(300);
  const [aov, setAov] = useState(75);
  const [lossRate, setLossRate] = useState(10);
  const monthlyRevenue = customers * aov;
  const monthlyLost = Math.round(monthlyRevenue * (lossRate / 100));
  const annualLost = monthlyLost * 12;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <Navbar />
      <div className="animate-in fade-in duration-700 pt-20">
        <section className="py-24 bg-slate-950 min-h-screen">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Revenue Leakage Calculator</h2>
              <p className="text-slate-400 font-medium">Quantify the impact of negative reviews and customer attrition.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Monthly Customers</label>
                    <span className="text-white font-black text-xl">{customers}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="2000" 
                    step="10" 
                    value={customers} 
                    onChange={(e) => setCustomers(parseInt(e.target.value))} 
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Avg. Visit Value (AOV)</label>
                    <span className="text-white font-black text-xl">${aov}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    step="5" 
                    value={aov} 
                    onChange={(e) => setAov(parseInt(e.target.value))} 
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Churn Impact</label>
                    <span className="text-indigo-400 font-black text-xl">{lossRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={lossRate} 
                    onChange={(e) => setLossRate(parseInt(e.target.value))} 
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                  />
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-[2.5rem] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Calculator size={120} className="text-red-500" />
                </div>
                <h4 className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">Estimated Annual Revenue Leaking</h4>
                <div className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">${annualLost.toLocaleString()}</div>
                <div className="bg-white/5 py-4 px-6 rounded-2xl flex items-center justify-between text-slate-400 font-bold">
                  <span>Monthly Leakage</span>
                  <span className="text-red-400 text-xl font-black">${monthlyLost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; 
          appearance: none; 
          width: 20px; 
          height: 20px; 
          background: #ffffff; 
          border: 4px solid #4f46e5; 
          border-radius: 50%; 
          cursor: pointer; 
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
        }
      `}} />
    </div>
  );
};

export default CalculatorPage;

