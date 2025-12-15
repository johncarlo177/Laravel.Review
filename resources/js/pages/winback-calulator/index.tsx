import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';

export default function WinBackCalculatorPage() {
  const [totalCustomers, setTotalCustomers] = useState(500);
  const [avgValue, setAvgValue] = useState(65);
  const [monthlyFee, setMonthlyFee] = useState(249);
  const [winbackRate, setWinbackRate] = useState(6);
  const [results, setResults] = useState({
    recoveredCustomers: 0,
    revenueRecovered: 0,
    coverageMultiplier: 0,
    coveragePercent: 0,
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateROI = useCallback(() => {
    if (totalCustomers <= 0 || avgValue <= 0 || monthlyFee <= 0 || winbackRate <= 0) {
      setResults({
        recoveredCustomers: 0,
        revenueRecovered: 0,
        coverageMultiplier: 0,
        coveragePercent: 0,
      });
      return;
    }

    // 1. Customers Recovered
    const recoveredCustomers = totalCustomers * (winbackRate / 100);

    // 2. Revenue Recovered
    const revenueRecovered = recoveredCustomers * avgValue;

    // 3. Subscription Coverage Multiplier
    const coverageMultiplier = revenueRecovered / monthlyFee;

    setResults({
      recoveredCustomers: Math.round(recoveredCustomers),
      revenueRecovered,
      coverageMultiplier,
      coveragePercent: Math.round(coverageMultiplier * 100),
    });
  }, [totalCustomers, avgValue, monthlyFee, winbackRate]);

  useEffect(() => {
    calculateROI();
  }, [calculateROI]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <Head title="Win-Back Revenue Calculator - Reputation AI">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Inter', sans-serif;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
          .input-group {
            position: relative;
          }
          .input-group .currency-symbol {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #4b5563;
          }
          .input-group input.has-symbol {
            padding-left: 2rem;
          }
        `}</style>
      </Head>

      <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-6 sm:p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Revenue Win-Back ROI Estimator
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Calculate the predicted monthly revenue recovered by the 7-Step Win-Back Flow and see how many times it covers the service fee.
        </p>

        <form className="space-y-5">
          {/* 1. Total Lost/Dormant Customers */}
          <div>
            <label htmlFor="total-customers" className="block text-sm font-medium text-gray-700 mb-1">
              1. Total Lost/Dormant Customers (30+ days)
            </label>
            <input
              type="number"
              id="total-customers"
              value={totalCustomers}
              onChange={(e) => setTotalCustomers(parseFloat(e.target.value) || 0)}
              min="1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 2. Avg. Customer Value (APV) */}
          <div className="input-group">
            <label htmlFor="avg-value" className="block text-sm font-medium text-gray-700 mb-1">
              2. Average Customer Value (APV)
            </label>
            <span className="currency-symbol text-lg">$</span>
            <input
              type="number"
              id="avg-value"
              value={avgValue}
              onChange={(e) => setAvgValue(parseFloat(e.target.value) || 0)}
              min="1"
              step="0.01"
              required
              className="has-symbol w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 3. Monthly Service Fee */}
          <div className="input-group">
            <label htmlFor="monthly-fee" className="block text-sm font-medium text-gray-700 mb-1">
              3. Monthly Service Fee
            </label>
            <span className="currency-symbol text-lg">$</span>
            <input
              type="number"
              id="monthly-fee"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(parseFloat(e.target.value) || 0)}
              min="1"
              step="0.01"
              required
              className="has-symbol w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 4. Win-Back Rate (Adjustable/Default) */}
          <div>
            <label htmlFor="winback-rate" className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
              <span>4. Conservative Win-Back Success Rate (%)</span>
              <span className="text-blue-600 font-semibold">{winbackRate}%</span>
            </label>
            <input
              type="range"
              id="winback-rate"
              value={winbackRate}
              onChange={(e) => setWinbackRate(parseInt(e.target.value))}
              min="1"
              max="15"
              step="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Industry-standard rates range from 4% to 12%. We use 6% as a conservative estimate.
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-blue-200 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-6 h-6 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8A5 5 0 0013 7zM3 15h4m-4 0v4m0-4l4 4"
              />
            </svg>
            Projected Monthly ROI
          </h2>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Customers Recovered */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-xs font-semibold uppercase text-blue-600">Customers Recovered</p>
              <p className="text-2xl font-extrabold text-blue-800 mt-1">
                {results.recoveredCustomers.toLocaleString()}
              </p>
              <p className="text-xs text-blue-500">per month</p>
            </div>

            {/* Revenue Recovered */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 md:col-span-2">
              <p className="text-xs font-semibold uppercase text-green-600">Revenue Recovered</p>
              <p className="text-3xl font-extrabold text-green-800 mt-1">
                {formatCurrency(results.revenueRecovered)}
              </p>
              <p className="text-sm text-green-500">This is new, recaptured revenue.</p>
            </div>
          </div>

          {/* Subscription Coverage Multiplier */}
          <div className="bg-gray-100 p-4 rounded-xl shadow-inner border border-gray-200">
            <p className="text-sm font-semibold uppercase text-gray-700">Service Fee Coverage Multiplier</p>
            <p className="text-4xl font-black text-gray-900 mt-1">
              <span className="text-purple-600">{results.coverageMultiplier.toFixed(2)}</span>
              <span className="text-purple-400">x</span>
            </p>
            <p className="text-sm text-gray-600">
              The recovered revenue covers your monthly fee of{' '}
              <span className="font-bold">{formatCurrency(monthlyFee)}</span> over{' '}
              <span className="font-bold text-purple-700">{results.coveragePercent.toLocaleString()}%</span>.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {(totalCustomers <= 0 || avgValue <= 0 || monthlyFee <= 0 || winbackRate <= 0) && (
          <p className="text-red-500 text-sm mt-4">
            Please ensure all input values are valid and greater than zero.
          </p>
        )}
      </div>
    </div>
  );
}

