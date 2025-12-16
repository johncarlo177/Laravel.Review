import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('owner');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { auth } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      // Always redirect to subscription page after login
      window.location.href = '/subscription';
    }
  }, [isAuthenticated, auth]);

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
        credentials: 'include',
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
          
          // Check if email is verified first
          if (!data.user.email_verified_at) {
            window.location.href = `/account/verify-email?email=${encodeURIComponent(data.user.email)}`;
            return;
          }
          
          // Always redirect to subscription page after login
          window.location.href = '/subscription';
          return;
        }
      }

      // Fallback: redirect to subscription (assume unpaid)
      window.location.href = '/subscription';
    } catch (error) {
      setErrors({ email: ['An error occurred. Please try again.'] });
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  const errorMessage = errors.email?.[0] || errors.password?.[0] || (typeof errors.email === 'string' ? errors.email : null);

  const BrandHeader = () => (
    <div className="flex flex-col items-center mb-6">
      <i className="fas fa-brain text-4xl text-blue-700"></i>
      <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Neviane</h1>
      <p className="text-sm text-gray-500 font-semibold tracking-wider">Reputation AI</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <BrandHeader />
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Log In to Neviane
        </h2>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="owner">Business Owner (Sign up free)</option>
              <option value="staff">Staff/Analyst</option>
            </select>
          </div>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Email Address"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => router.visit('/account/sign-up')}
            className="text-sm font-medium text-blue-700 hover:text-blue-800 transition duration-150"
          >
            Need an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
