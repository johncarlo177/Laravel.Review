import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('owner');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('US');
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { auth } = usePage().props as any;
  const isAuthenticated = auth?.user !== null && auth?.user !== undefined;

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect all authenticated users to subscription page
      window.location.href = '/subscription';
    }
  }, [isAuthenticated, auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (password !== passwordConfirmation) {
      setErrors({ password: ['Passwords do not match'] });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          password_confirmation: passwordConfirmation, 
          role,
          mobile_number: phoneNumber ? {
            iso_code: phoneCountryCode,
            mobile_number: phoneNumber
          } : undefined,
          company_name: companyName || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setErrors({ email: [data.message] });
        } else {
          setErrors({ email: ['Registration failed. Please try again.'] });
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

      // Redirect all users to subscription page after signup
      window.location.href = '/subscription';
    } catch (error) {
      setErrors({ email: ['An error occurred. Please try again.'] });
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  const errorMessage = errors.name?.[0] || errors.email?.[0] || errors.password?.[0] || errors.mobile_number?.[0] || errors.company_name?.[0] ||
    (typeof errors.name === 'string' ? errors.name : null) ||
    (typeof errors.email === 'string' ? errors.email : null) ||
    (typeof errors.password === 'string' ? errors.password : null) ||
    (typeof errors.mobile_number === 'string' ? errors.mobile_number : null) ||
    (typeof errors.company_name === 'string' ? errors.company_name : null);

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
          Start Your Free Account
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
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Full Name"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Email Address"
          />

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select
                id="phoneCountryCode"
                value={phoneCountryCode}
                onChange={(e) => setPhoneCountryCode(e.target.value)}
                required
                className="w-24 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-sm"
              >
                <option value="US">US +1</option>
                <option value="CA">CA +1</option>
                <option value="GB">GB +44</option>
                <option value="AU">AU +61</option>
                <option value="DE">DE +49</option>
                <option value="FR">FR +33</option>
                <option value="IT">IT +39</option>
                <option value="ES">ES +34</option>
                <option value="NL">NL +31</option>
                <option value="BE">BE +32</option>
                <option value="CH">CH +41</option>
                <option value="AT">AT +43</option>
                <option value="SE">SE +46</option>
                <option value="NO">NO +47</option>
                <option value="DK">DK +45</option>
                <option value="FI">FI +358</option>
                <option value="PL">PL +48</option>
                <option value="IE">IE +353</option>
                <option value="PT">PT +351</option>
                <option value="GR">GR +30</option>
                <option value="LU">LU +352</option>
                <option value="CZ">CZ +420</option>
                <option value="HU">HU +36</option>
                <option value="RO">RO +40</option>
                <option value="BG">BG +359</option>
                <option value="HR">HR +385</option>
                <option value="SK">SK +421</option>
                <option value="SI">SI +386</option>
                <option value="EE">EE +372</option>
                <option value="LV">LV +371</option>
                <option value="LT">LT +370</option>
                <option value="MT">MT +356</option>
                <option value="CY">CY +357</option>
              </select>
              <input
                type="tel"
                id="phone"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Company Name (Optional)"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Password"
            minLength={8}
          />

          <input
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="Confirm Password"
            minLength={8}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Signing Up...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => router.visit('/account/login')}
            className="text-sm font-medium text-blue-700 hover:text-blue-800 transition duration-150"
          >
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
}
