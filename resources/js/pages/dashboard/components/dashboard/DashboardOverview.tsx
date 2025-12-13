import React from 'react';
import { Inbox, Heart, Gavel, Filter, Brain, Shield, Handshake, Star, QrCode, Settings, UserPlus } from 'lucide-react';
import { WidgetCard } from '../shared/WidgetCard';
import { ButtonCard } from '../shared/ButtonCard';
import { BRAND_TEXT } from '../../data/constants';

interface DashboardOverviewProps {
  setView: (view: string) => void;
  stats: {
    feedbackToday: number;
    feedbackLimit: number;
    recoveredCustomers: number;
    oneStarPrevented: number;
    googleFunnelHappy: number;
    googleFunnelPosted: number;
    aiTasksCompleted: number;
  };
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setView, stats }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">AI Dashboard Overview</h2>

    {/* Top Widgets */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <WidgetCard title="Today's Feedback" value={stats.feedbackToday} unit={`/${stats.feedbackLimit}`} icon={Inbox} color="text-yellow-600" />
      <WidgetCard title="Recovered Customers" value={stats.recoveredCustomers} icon={Heart} color="text-green-600" />
      <WidgetCard title="1-Star Prevented" value={stats.oneStarPrevented} icon={Gavel} color="text-red-600" />
      <WidgetCard title="Google Reviews Funnel" value={stats.googleFunnelPosted} unit={`/${stats.googleFunnelHappy} happy`} icon={Filter} color="text-indigo-600" />
      <WidgetCard title="AI Tasks Completed" value={stats.aiTasksCompleted} icon={Brain} color="text-blue-600" />
    </div>

    {/* Main Buttons */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
      <ButtonCard title="Feedback Inbox" icon={Inbox} onClick={() => setView('inbox')} />
      <ButtonCard title="Add Customer" icon={UserPlus} onClick={() => setView('addcustomer')} />
      <ButtonCard title="AI Recovery Center" icon={Shield} onClick={() => setView('recovery')} />
      <ButtonCard title="Win-Back Engine" icon={Handshake} onClick={() => setView('winback')} />
      <ButtonCard title="Review Manager" icon={Star} onClick={() => setView('reviews')} />
      <ButtonCard title="QR Codes & eBusiness Cards" icon={QrCode} onClick={() => setView('cards')} />
    </div>

    {/* Quick Links */}
    <div className="flex justify-center pt-4">
      <button onClick={() => setView('settings')} className={`text-sm font-semibold ${BRAND_TEXT} hover:text-blue-800 transition flex items-center`}>
        <Settings className="mr-2 h-4 w-4" /> Access All Settings
      </button>
    </div>
  </div>
);

