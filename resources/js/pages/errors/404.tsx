import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
  ShieldCheck, 
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

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

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">ReputationAI</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/airecovery" className="text-slate-600 hover:text-blue-600 font-medium transition">AI Recovery</a>
            <a href="/winback" className="text-slate-600 hover:text-blue-600 font-medium transition">Win-Back Engine</a>
            <a href="#recovery-calc" className="text-slate-600 hover:text-blue-600 font-medium transition">Recovery Calculator</a>
            <a href="/price" className="text-slate-600 hover:text-blue-600 font-medium transition">Pricing</a>
            <a href="/ecards" className="text-slate-600 hover:text-blue-600 font-medium transition">Ecards</a>
            <a href="/terms" className="text-slate-600 hover:text-blue-600 font-medium transition">Terms</a>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 border border-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => window.location.href = '/account/login'}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 border border-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                  Login
                </button>
                <button 
                  onClick={() => window.location.href = '/account/sign-up'}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                  Register
                </button>
              </>
            )}
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
              <a href="/airecovery" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">AI Recovery</a>
              <a href="/winback" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Win-Back Engine</a>
              <a href="#recovery-calc" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Recovery Calculator</a>
              <a href="/price" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Pricing</a>
              <a href="/Ecards" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Ecards</a>
              <a href="/terms" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-gray-50 rounded-md">Terms</a>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => window.location.href = '/account/login'}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => window.location.href = '/account/sign-up'}
                    className="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white flex flex-col">
      <Head title="404 - Page Not Found" />
      <Navbar />
      
      <main className="flex-1 pt-20 sm:pt-32 pb-8 sm:pb-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-12">
            <div className="text-7xl sm:text-9xl font-extrabold text-purple-200 mb-4">404</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
              The requested page could not be found on this server.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-12 sm:pt-20 pb-6 sm:pb-10 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReputationAI</span>
          </div>
          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <div className="mb-4 md:mb-0">
              ReputationAI © {new Date().getFullYear()}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <a href="/terms" className="hover:text-white transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition">Terms of Service</a>
              <a href="/airecovery" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

