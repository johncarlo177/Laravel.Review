import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X, ChevronDown, ChevronRight, RefreshCcw, CreditCard, Store } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLocalBusinessOpen, setIsLocalBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const { auth } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) { 
        setIsSolutionsOpen(false); 
        setIsLocalBusinessOpen(false); 
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) { 
        setIsResourcesOpen(false); 
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => { 
      window.removeEventListener('scroll', handleScroll); 
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth:token');
      localStorage.removeItem('auth:user');
      sessionStorage.removeItem('auth:token');
      sessionStorage.removeItem('auth:user');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    window.location.href = '/auth0/logout?' + new Date().getTime();
  };

  const solutionsItems = [
    { title: "AI Recovery (1★ Prevention)", icon: <Shield size={16} />, href: "/airecovery" },
    { title: "Win-Back Engine (Bring Customers Back)", icon: <RefreshCcw size={16} />, href: "/winback" },
    { title: "eBusiness Cards (Capture Contacts)", icon: <CreditCard size={16} />, href: "/ecards" },
    { title: "For Local Businesses", icon: <Store size={16} />, subItems: [
      "Restaurants & Cafes", "Auto Repair & Dealerships", "Dental & Medical Clinics", 
      "Salons, Spas & Barbers", "Home Services", "Gyms & Fitness Studios", 
      "Retail & Local Shops", "Property Services"
    ] }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/5 py-1' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-end mb-1">
        <button onClick={() => window.location.href = 'mailto:sales@neviane.com'} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group shadow-sm">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-white">Contact Sales</span>
        </button>
      </div>

      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}>
        <div onClick={() => window.location.href = '/'} className="flex items-center gap-3 group cursor-pointer flex-shrink-0">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/40">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl tracking-tight text-white">Neviane</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">reputation ai</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-400">
          <div className="relative h-full flex items-center" ref={solutionsRef}>
            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                setIsSolutionsOpen(!isSolutionsOpen); 
                setIsResourcesOpen(false); 
                if (isSolutionsOpen) setIsLocalBusinessOpen(false); 
              }} 
              className={`flex items-center gap-1.5 transition-colors focus:outline-none py-2 ${isSolutionsOpen ? 'text-white' : 'hover:text-white'}`}
            >
              Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSolutionsOpen && (
              <div 
                onMouseLeave={() => {setIsSolutionsOpen(false); setIsLocalBusinessOpen(false);}} 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-slate-900 border border-white/10 rounded-[1.5rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-2"
              >
                <div className="grid gap-1">
                  {solutionsItems.map((item) => (
                    <div key={item.title} className="relative">
                      <a 
                        href={item.href || '#'} 
                        onClick={(e) => { 
                          if (item.subItems) { 
                            e.preventDefault(); 
                            setIsLocalBusinessOpen(!isLocalBusinessOpen); 
                          } else {
                            setIsSolutionsOpen(false);
                          }
                        }} 
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">{item.icon}</span>
                          {item.title}
                        </div>
                        {item.subItems && <ChevronRight size={14} className={`transition-transform duration-300 ${isLocalBusinessOpen ? 'rotate-90' : ''}`} />}
                      </a>
                      {item.subItems && isLocalBusinessOpen && (
                        <div className="lg:absolute lg:left-full lg:top-0 lg:ml-2 w-72 bg-slate-900 border border-white/10 rounded-[1.5rem] shadow-2xl p-3 animate-in fade-in slide-in-from-left-2">
                          <div className="grid gap-1">
                            {item.subItems.map((sub) => (
                              <a 
                                key={sub} 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setIsSolutionsOpen(false); }} 
                                className="block px-4 py-2 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left"
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="/how-it-works" className="hover:text-white transition-colors py-2">How It Works</a>
          <a href="/calculator" className="hover:text-white transition-colors py-2">Calculator</a>
          <a href="/demo" className="hover:text-white transition-colors py-2">Demo</a>
          <div className="relative h-full flex items-center" ref={resourcesRef}>
            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                setIsResourcesOpen(!isResourcesOpen); 
                setIsSolutionsOpen(false); 
              }} 
              className={`flex items-center gap-1.5 transition-colors focus:outline-none py-2 ${isResourcesOpen ? 'text-white' : 'hover:text-white'}`}
            >
              Resources <ChevronDown size={14} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isResourcesOpen && (
              <div 
                onMouseLeave={() => setIsResourcesOpen(false)} 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-slate-900 border border-white/10 rounded-[1.5rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-2"
              >
                <div className="grid gap-1">
                  <a 
                    href="/resources" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setIsResourcesOpen(false);
                      router.visit('/resources');
                    }} 
                    className="block px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left"
                  >
                    View All Resources
                  </a>
                  {[
                    { label: "Blog / Insights", hash: "blog-insights" },
                    { label: "Guides / How-To's", hash: "guides-how-tos" },
                    { label: "Templates & Tools", hash: "templates-tools" },
                    { label: "FAQs", hash: "faqs" },
                    { label: "Customer Stories", hash: "customer-stories" },
                    { label: "Webinars / Videos", hash: "webinars-videos" },
                    { label: "Glossary", hash: "glossary" },
                    { label: "Support Center", hash: "support-center" },
                    { label: "Legal Guides", hash: "legal-guides" }
                  ].map((item) => (
                    <a
                      key={item.hash} 
                      href="/resources"
                      onClick={(e) => { 
                        e.preventDefault();
                        setIsResourcesOpen(false);
                        router.visit('/resources');
                      }} 
                      className="block px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left cursor-pointer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-slate-950 transition-all shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => window.location.href = '/account/login'}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/getlivedemo'}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-slate-950 transition-all shadow-lg"
              >
                Get Started
              </button>
            </>
          )}
        </div>
        <button 
          className="lg:hidden p-2 text-slate-400 hover:text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-20 w-full bg-slate-950 z-50 p-6 lg:hidden animate-in fade-in slide-in-from-right duration-300 overflow-y-auto border-t border-white/5">
          <div className="flex flex-col gap-8 pb-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] pl-2">Solutions</span>
              <div className="grid gap-2">
                {solutionsItems.map(item => (
                  <div key={item.title} className="flex flex-col gap-2">
                    <a 
                      href={item.href || '#'}
                      onClick={(e) => { 
                        if (item.subItems) { 
                          e.preventDefault(); 
                          setIsLocalBusinessOpen(!isLocalBusinessOpen); 
                        } else {
                          setIsOpen(false);
                        }
                      }} 
                      className="flex items-center justify-between gap-3 p-4 bg-white/5 rounded-2xl text-base font-bold text-slate-300 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-indigo-400">{item.icon}</span>
                        {item.title}
                      </div>
                      {item.subItems && <ChevronDown size={18} className={`transition-transform duration-300 ${isLocalBusinessOpen ? 'rotate-180' : ''}`} />}
                    </a>
                    {item.subItems && isLocalBusinessOpen && (
                      <div className="grid gap-1 pl-4 mb-2">
                        {item.subItems.map(sub => (
                          <a 
                            key={sub} 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); setIsOpen(false); }} 
                            className="p-3 text-sm font-semibold text-slate-500 hover:text-indigo-400 border-l border-white/5 text-left"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] pl-2">Platform</span>
              <a href="/how-it-works" onClick={() => setIsOpen(false)} className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5">How It Works</a>
              <a href="/calculator" onClick={() => setIsOpen(false)} className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5">Calculator</a>
              <a href="/demo" onClick={() => setIsOpen(false)} className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5">Demo</a>
              <a href="/resources" onClick={() => setIsOpen(false)} className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5">Resources</a>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => window.location.href = 'mailto:sales@neviane.com'} 
                className="w-full py-5 text-lg font-bold text-indigo-400 border border-indigo-500/20 rounded-2xl text-center"
              >
                Contact Sales
              </button>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/dashboard'; }} 
                    className="w-full py-5 text-lg font-bold text-slate-400 border border-white/10 rounded-2xl text-center"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/account/login'; }} 
                    className="w-full py-5 text-lg font-bold text-slate-400 border border-white/10 rounded-2xl text-center"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/getlivedemo'; }} 
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl text-center"
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

