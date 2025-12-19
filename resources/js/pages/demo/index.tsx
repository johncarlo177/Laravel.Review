import React from 'react';
import { Shield, Play } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <Navbar />
      <div className="animate-in fade-in duration-700 pt-20">
        <section className="py-24 bg-slate-950 min-h-screen">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-[1000] text-white mb-6 tracking-tight">Experience the Simulation</h2>
            <p className="text-slate-400 text-xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
              See exactly how Neviane's AI intercepts negative feedback and converts it into a resolution automatically.
            </p>
            <div className="relative aspect-video max-w-5xl mx-auto rounded-[3rem] border border-white/10 bg-slate-900 shadow-[0_0_50px_rgba(79,70,229,0.15)] overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={28} className="text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-indigo-950/20 to-slate-900 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                <Shield size={16} className="text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-white"> Neviane Engine Active</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DemoPage;

