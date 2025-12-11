import React from 'react';
import { BarChart3, Handshake, DollarSign } from 'lucide-react';
import { WidgetCard } from '../shared/WidgetCard';

interface WinBackEngineProps {
  analytics: {
    attempted: number;
    converted: number;
    revenueSaved: number;
  };
}

export const WinBackEngine: React.FC<WinBackEngineProps> = ({ analytics }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">Win-Back Engine</h2>

    {/* Win-Back Analytics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <WidgetCard title="Win-Backs Attempted" value={analytics.attempted} icon={BarChart3} color="text-purple-600" />
      <WidgetCard title="Win-Backs Converted" value={analytics.converted} unit={` (${((analytics.converted / analytics.attempted) * 100).toFixed(1)}%)`} icon={Handshake} color="text-green-600" />
      <WidgetCard title="Revenue Saved (AI Estimate)" value={analytics.revenueSaved} icon={DollarSign} color="text-blue-600" unit="$" />
    </div>

    {/* Win-Back Stages Visualization */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Win-Back Flow Stages (Visible Timeline)</h3>
      <div className="flex flex-col sm:flex-row justify-between items-stretch space-y-4 sm:space-y-0 sm:space-x-4 text-sm">
        <div className="text-center p-3 bg-purple-50 rounded-lg flex-1">
          <p className="font-bold text-purple-600">Day 0</p>
          <p className="text-gray-600">AI apology + fix</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg flex-1">
          <p className="font-bold text-purple-600">Day 2</p>
          <p className="text-gray-600">Check-in message</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg flex-1">
          <p className="font-bold text-purple-600">Day 5</p>
          <p className="text-gray-600">Incentive message</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg flex-1">
          <p className="font-bold text-purple-600">Day 7</p>
          <p className="text-gray-600">Final "Make it right"</p>
        </div>
      </div>
      <p className="mt-4 text-xs italic text-gray-500 text-center">Only if happy: Ask for review</p>
    </div>

    {/* Controls */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Win-Back Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded-lg border-gray-300" />
            <span className="ml-2 font-medium">Incentive ON/OFF</span>
          </label>
          <label className="block text-sm font-medium text-gray-700">Incentive Type</label>
          <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm text-sm p-2">
            <option>Discount</option>
            <option>Free Drink</option>
            <option>10% Off Next Visit</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Follow-up Interval</label>
          <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm text-sm p-2">
            <option>1–7 days (Standard)</option>
            <option>3 days</option>
            <option>7 days (Long)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tone of Voice</label>
          <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm text-sm p-2">
            <option>Friendly</option>
            <option>Professional</option>
            <option>Short & direct</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

