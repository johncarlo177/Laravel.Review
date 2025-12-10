import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { auth } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

  // Redirect if already authenticated (handles browser back button)
  React.useEffect(() => {
    if (isAuthenticated) {
      // Use window.location for immediate redirect to prevent page flash
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  // Also check localStorage token as fallback
  React.useEffect(() => {
    const token = localStorage.getItem('auth:token');
    if (token && !isAuthenticated) {
      // Token exists but not authenticated yet, wait a bit for auth to sync
      const timer = setTimeout(() => {
        if (auth?.user) {
          window.location.href = '/dashboard';
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (token && isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setErrors({ email: [data.message] });
        } else {
          setErrors({ email: ['Invalid credentials'] });
        }
        setLoading(false);
        return;
      }

      // Store token and user in localStorage
      if (data.token) {
        localStorage.setItem('auth:token', data.token);
        if (data.user) {
          localStorage.setItem('auth:user', JSON.stringify(data.user));
        }
      }

      // Cookie is set by the server, just redirect
      // Use window.location for full page reload to ensure cookie is read
      window.location.href = '/dashboard';
    } catch (error) {
      setErrors({ email: ['An error occurred. Please try again.'] });
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>
            {errors.email && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {Array.isArray(errors.email) ? errors.email[0] : errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            {errors.password && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/account/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

