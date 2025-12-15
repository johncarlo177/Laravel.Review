import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function VerifyEmailPage() {
  const { auth } = usePage().props as any;
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // Get email from URL params or use auth user email
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setCodeSent(true); // Assume code was sent during registration
    } else if (auth?.user?.email) {
      setEmail(auth.user.email);
      // Check if email is already verified
      if (auth.user.email_verified_at) {
        setVerified(true);
        // Redirect after a moment
        setTimeout(() => {
          redirectAfterVerification(auth.user);
        }, 2000);
      }
    }
  }, [auth]);

  const redirectAfterVerification = (user: any) => {
    const currentPlan = user?.subscriptions?.[0]?.subscription_plan?.name || 'Free';
    const userRole = user?.roles?.[0]?.name?.toLowerCase() || 'owner';
    
    if (userRole === 'owner' && currentPlan === 'Free') {
      window.location.href = '/subscription';
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!otpCode || otpCode.length !== 5) {
      setErrors({ otp: ['Please enter a valid 5-digit verification code'] });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/account/verify-otp-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        setErrors({ otp: ['Invalid verification code. Please try again.'] });
        setLoading(false);
        return;
      }

      // Verification successful
      setVerified(true);
      setLoading(false);

      // Get user data and redirect
      try {
        const userResponse = await fetch('/api/myself', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          redirectAfterVerification(userData);
        } else {
          // Fallback redirect
          setTimeout(() => {
            redirectAfterVerification(auth?.user);
          }, 1000);
        }
      } catch (error) {
        // Fallback redirect
        setTimeout(() => {
          redirectAfterVerification(auth?.user);
        }, 1000);
      }
    } catch (error) {
      setErrors({ otp: ['An error occurred. Please try again.'] });
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setErrors({ email: ['Email is required'] });
      return;
    }

    setResending(true);
    setErrors({});

    try {
      const response = await fetch('/api/account/send-otp-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.sent) {
        setCodeSent(true);
        setErrors({});
        alert('Verification code has been resent to your email.');
      } else {
        setErrors({ email: ['Failed to resend code. Please try again.'] });
      }
    } catch (error) {
      setErrors({ email: ['An error occurred. Please try again.'] });
    } finally {
      setResending(false);
    }
  };

  const BrandHeader = () => (
    <div className="flex flex-col items-center mb-6">
      <i className="fas fa-brain text-4xl text-blue-700"></i>
      <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Neviane</h1>
      <p className="text-sm text-gray-500 font-semibold tracking-wider">Reputation AI</p>
    </div>
  );

  if (verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-green-600">
          <BrandHeader />
          <div className="text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-6xl text-green-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your email has been successfully verified. Redirecting you now...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans py-10">
      <Head title="Verify Your Email - Neviane" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <BrandHeader />
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We've sent a verification code to your email address. Please enter it below.
        </p>

        {codeSent && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg mb-4 text-sm">
            <i className="fas fa-info-circle mr-2"></i>
            Verification code sent to <strong>{email}</strong>
          </div>
        )}

        {(errors.otp || errors.email) && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {errors.otp?.[0] || errors.email?.[0] || 'An error occurred'}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          {!email && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Enter your email"
              />
            </div>
          )}

          {email && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="otp"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').substring(0, 5))}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-center text-2xl font-bold tracking-widest"
                placeholder="00000"
                maxLength={5}
                autoComplete="off"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the 5-digit code sent to your email</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !otpCode || otpCode.length !== 5}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-200 transform bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Verifying...
              </>
            ) : (
              <>
                <i className="fas fa-check-circle mr-2"></i>
                Verify Email
              </>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resending || !email}
              className="text-sm font-medium text-blue-700 hover:text-blue-800 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-redo mr-2"></i>
                  Resend Verification Code
                </>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.visit('/account/login')}
              className="text-sm font-medium text-gray-600 hover:text-gray-700 transition duration-150"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

