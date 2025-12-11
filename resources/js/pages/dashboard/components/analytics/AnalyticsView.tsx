import React from 'react';
import { Users, DollarSign, Clock } from 'lucide-react';
import { WidgetCard } from '../shared/WidgetCard';

export const AnalyticsView: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Analytics & ROI Dashboard</h2>

    {/* ROI Dashboard */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">ROI Dashboard (Return on Investment)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WidgetCard title="Customers Saved" value={22} icon={Users} color="text-indigo-600" />
        <WidgetCard title="Estimated Revenue Saved" value={'3,120'} icon={DollarSign} color="text-green-600" unit="$" />
        <WidgetCard title="Staff Hours Replaced" value={160} icon={Clock} color="text-orange-600" unit="h" />
      </div>
    </div>

    {/* Graphs Placeholder */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Performance Graphs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-gray-100 rounded-lg p-4 text-gray-500 flex items-center justify-center">
          <p>Placeholder: Sentiment Trend (Positive/Negative)</p>
        </div>
        <div className="h-40 bg-gray-100 rounded-lg p-4 text-gray-500 flex items-center justify-center">
          <p>Placeholder: Google Rating Trends (4.2 → 4.6)</p>
        </div>
        <div className="h-40 bg-gray-100 rounded-lg p-4 text-gray-500 flex items-center justify-center">
          <p>Placeholder: Recovery Rate vs. Win-Back Rate</p>
        </div>
        <div className="h-40 bg-gray-100 rounded-lg p-4 text-gray-500 flex items-center justify-center">
          <p>Placeholder: Staff Performance (Response Speed)</p>
        </div>
      </div>
    </div>
  </div>
);

