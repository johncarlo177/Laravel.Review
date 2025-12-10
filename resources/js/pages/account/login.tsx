import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

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

  const errorMessage = errors.email?.[0] || errors.password?.[0] || (typeof errors.email === 'string' ? errors.email : null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans py-20">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to manage your AI Rate Recovery data.
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            <span className="mr-2">⚠️</span>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="you@business.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <div>
            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-700 transition duration-150"
            >
              Reset Password
            </button>
          </div>
          <div>
            <a
              href="/account/sign-up"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition duration-150"
            >
              Need an account? Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

