import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X, ChevronDown, ChevronRight, RefreshCcw, CreditCard, Store } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLocalBusinessOpen, setIsLocalBusinessOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileLocalBusinessOpen, setIsMobileLocalBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const { auth, admin } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;
  const isAdminAuthenticated = admin !== null && admin !== undefined;

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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Re-enable scroll and restore position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
        // Reset mobile menu states when menu closes
        setIsMobileLocalBusinessOpen(false);
        setIsMobileSolutionsOpen(false);
        setIsMobileResourcesOpen(false);
      };
    }
  }, [isOpen]);

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

  const handleAdminLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin:token');
      localStorage.removeItem('admin:user');
    }
    window.location.href = '/admin/logout';
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
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex justify-end transition-all duration-300`}>
        <button onClick={() => window.location.href = 'mailto:sales@neviane.com'} className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group shadow-sm">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-white">Contact Sales</span>
        </button>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 h-14 lg:h-20`}>
        <div onClick={() => window.location.href = '/'} className="flex items-center gap-2 sm:gap-3 group cursor-pointer flex-shrink-0">
          <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/40">
            <Shield className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white">Neviane</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-0.5 sm:mt-1">reputation ai</span>
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
          {isAdminAuthenticated ? (
            <>
              <button 
                onClick={() => window.location.href = '/admin/dashboard'}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleAdminLogout}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-slate-950 transition-all shadow-lg"
              >
                Logout
              </button>
            </>
          ) : isAuthenticated ? (
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
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors flex-shrink-0" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} className="sm:w-6 sm:h-6" /> : <Menu size={24} className="sm:w-6 sm:h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className={`fixed w-full bg-slate-950 z-50 lg:hidden animate-in fade-in slide-in-from-right duration-300 overflow-y-auto border-t border-white/5 top-[5rem] h-[calc(100vh-5rem)]`}>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-2">
              {/* Solutions (Collapsible) */}
              <div className="border-b border-white/5">
                <button
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  className="w-full flex items-center justify-between p-4 text-xl font-bold text-white text-left"
                >
                  Solutions
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileSolutionsOpen && (
                  <div className="grid gap-2 pb-4">
                    {solutionsItems.map(item => (
                      <div key={item.title} className="flex flex-col gap-2">
                        {item.subItems ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMobileLocalBusinessOpen(!isMobileLocalBusinessOpen);
                            }}
                            className="flex items-center justify-between gap-3 p-3 pl-6 text-base font-semibold text-slate-300 hover:text-white text-left w-full"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-indigo-400">{item.icon}</span>
                              {item.title}
                            </div>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileLocalBusinessOpen ? 'rotate-180' : ''}`} />
                          </button>
                        ) : (
                          <a 
                            href={item.href || '#'}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between gap-3 p-3 pl-6 text-base font-semibold text-slate-300 hover:text-white text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-indigo-400">{item.icon}</span>
                              {item.title}
                            </div>
                          </a>
                        )}
                        {item.subItems && isMobileLocalBusinessOpen && (
                          <div className="grid gap-1 pl-12">
                            {item.subItems.map(sub => (
                              <a 
                                key={sub} 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setIsOpen(false); }} 
                                className="p-2 text-sm font-medium text-slate-400 hover:text-indigo-400 text-left"
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* How It Works */}
              <a 
                href="/how-it-works" 
                onClick={() => setIsOpen(false)} 
                className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5"
              >
                How It Works
              </a>

              {/* Calculator */}
              <a 
                href="/calculator" 
                onClick={() => setIsOpen(false)} 
                className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5"
              >
                Calculator
              </a>

              {/* Demo */}
              <a 
                href="/demo" 
                onClick={() => setIsOpen(false)} 
                className="block w-full text-left p-4 text-xl font-bold text-white border-b border-white/5"
              >
                Demo
              </a>

              {/* Resources (Collapsible) */}
              <div className="border-b border-white/5">
                <button
                  onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="w-full flex items-center justify-between p-4 text-xl font-bold text-white text-left"
                >
                  Resources
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileResourcesOpen && (
                  <div className="grid gap-1 pb-4">
                    <a 
                      href="/resources" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setIsOpen(false);
                        router.visit('/resources');
                      }} 
                      className="block px-4 py-3 pl-6 text-base font-semibold text-slate-300 hover:text-white text-left"
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
                          setIsOpen(false);
                          router.visit('/resources');
                        }} 
                        className="block px-4 py-2 pl-6 text-sm font-medium text-slate-400 hover:text-white text-left"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-4 space-y-3 border-t border-white/5 bg-slate-950">
              {isAdminAuthenticated ? (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/admin/dashboard'; }} 
                    className="w-full py-4 text-lg font-bold text-slate-300 border border-white/10 rounded-xl text-center hover:bg-white/5 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={(e) => { setIsOpen(false); handleAdminLogout(e); }} 
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg text-center hover:bg-indigo-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : isAuthenticated ? (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/dashboard'; }} 
                    className="w-full py-4 text-lg font-bold text-slate-300 border border-white/10 rounded-xl text-center hover:bg-white/5 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={(e) => { setIsOpen(false); handleLogout(e); }} 
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg text-center hover:bg-indigo-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/account/login'; }} 
                    className="w-full py-4 text-lg font-bold text-slate-300 border border-white/10 rounded-xl text-center hover:bg-white/5 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '/getlivedemo'; }} 
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg text-center hover:bg-indigo-700 transition-colors"
                  >
                    Register
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
