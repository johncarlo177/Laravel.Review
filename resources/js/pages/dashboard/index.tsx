import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
  Home,
  Inbox,
  Shield,
  Handshake,
  Star,
  QrCode,
  BarChart3,
  Settings,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Heart,
  Gavel,
  Filter,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Users,
  Clock,
  Phone,
  Mail,
  Download,
  Save,
  Edit,
  User,
  Brain,
  Search,
  Calendar,
} from 'lucide-react';

// --- MOCK DATA STRUCTURES ---

const MOCK_DASHBOARD_STATS = {
  feedbackToday: 2,
  feedbackLimit: 12,
  recoveredCustomers: 3,
  oneStarPrevented: 1,
  googleFunnelHappy: 12,
  googleFunnelPosted: 7,
  aiTasksCompleted: 28,
};

const MOCK_FEEDBACK = [
  { id: 1, name: 'Alice Johnson', rating: 1, sentiment: 'Negative', date: '2024-10-25', summary: 'Slow service, waited 20 minutes for coffee.', status: 'Pending', flagged: true, channel: 'Google' },
  { id: 2, name: 'Bob Smith', rating: 5, sentiment: 'Positive', date: '2024-10-25', summary: 'Great food and fast service! Definitely coming back.', status: 'Resolved', flagged: false, channel: 'Yelp' },
  { id: 3, name: 'Charlie Doe', rating: 3, sentiment: 'Neutral', date: '2024-10-24', summary: 'The atmosphere was nice, but the seating felt cramped.', status: 'Needs follow-up', flagged: false, channel: 'Facebook' },
  { id: 4, name: 'Dana Evans', rating: 1, sentiment: 'Negative', date: '2024-10-24', summary: 'The manager was rude and refused to honor the coupon.', status: 'Escalated', flagged: true, channel: 'Google' },
];

const MOCK_RECOVERY_CASES = [
  { id: 101, customer: 'Alice Johnson', summary: 'Overcharged for service.', status: 'Awaiting Owner Approval', actions: ['AI Drafted Apology', 'AI Drafted Solution'], timeline: [{time: '10:00', event: 'New case opened'}, {time: '10:05', event: 'AI Drafted Reply'}] },
  { id: 102, customer: 'Frank Miller', summary: 'Product defective on arrival.', status: 'Follow-up Due (48h)', actions: ['Approved & Sent Apology'], timeline: [{time: '09:00', event: 'New case opened'}, {time: '09:30', event: 'Owner Approved & Sent'}] },
];

const MOCK_WINBACK_ANALYTICS = {
  attempted: 22,
  converted: 7,
  revenueSaved: 1140,
};

// --- NAVIGATION & UI CONSTANTS ---

const BRAND_COLOR = 'bg-blue-700 hover:bg-blue-800';
const BRAND_TEXT = 'text-blue-700';

const NAV_ITEMS = (userRole: string) => [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'inbox', label: 'Feedback Inbox', icon: Inbox, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'recovery', label: 'AI Recovery Center', icon: Shield, roles: ['owner', 'manager', 'admin'] },
  { id: 'winback', label: 'Win-Back Engine', icon: Handshake, roles: ['owner', 'manager', 'admin'] },
  { id: 'reviews', label: 'Review Manager', icon: Star, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'cards', label: 'QR Codes & Cards', icon: QrCode, roles: ['owner', 'manager', 'admin'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager', 'admin'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['owner', 'admin'] },
  { id: 'admin', label: 'Super Admin', icon: ShieldCheck, roles: ['admin'] },
].filter(item => item.roles.includes(userRole || 'owner'));

// --- UTILITY COMPONENTS ---

const BrandHeader = ({ currentUser }: { currentUser?: any }) => (
  <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
    <Brain className={`text-2xl ${BRAND_TEXT}`} />
    <h1 className="text-xl font-extrabold text-gray-900">Neviane</h1>
    {currentUser && (
      <span className="ml-auto text-xs text-gray-400 p-1 bg-gray-100 rounded-full">
        ID: {currentUser.id?.toString().substring(0, 4) || 'User'}...
      </span>
    )}
  </div>
);

const WidgetCard = ({ title, value, icon: Icon, color = 'text-blue-600', unit = '' }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
  unit?: string;
}) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-gray-200 hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-center">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className={`${color} text-2xl`} />
    </div>
    <p className="mt-1 text-3xl font-extrabold text-gray-900">{value}{unit}</p>
  </div>
);

const ButtonCard = ({ title, icon: Icon, onClick, className = '' }: {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${BRAND_COLOR} text-white ${className}`}
  >
    <Icon className="text-3xl mb-3" />
    <p className="text-lg font-semibold">{title}</p>
  </button>
);

const Sidebar = ({
  currentView,
  setView,
  userRole,
  handleSignOut,
  isSidebarOpen,
  setIsSidebarOpen,
  currentUser,
}: {
  currentView: string;
  setView: (view: string) => void;
  userRole: string;
  handleSignOut: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  currentUser?: any;
}) => {
  const navItems = NAV_ITEMS(userRole);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-gray-900 opacity-50 ${isSidebarOpen ? 'block lg:hidden' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white z-40 flex flex-col shadow-xl`}>
        <BrandHeader currentUser={currentUser} />
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsSidebarOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 mb-2">Role: <span className="capitalize font-semibold text-gray-600">{userRole}</span></p>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

// --- PAGE COMPONENTS ---

const DashboardOverview = ({ setView, stats }: { setView: (view: string) => void; stats: typeof MOCK_DASHBOARD_STATS }) => (
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
      <ButtonCard title="AI Recovery Center" icon={Shield} onClick={() => setView('recovery')} />
      <ButtonCard title="Win-Back Engine" icon={Handshake} onClick={() => setView('winback')} />
      <ButtonCard title="Review Manager" icon={Star} onClick={() => setView('reviews')} className="col-span-full md:col-span-1" />
      <ButtonCard title="QR Codes & eBusiness Cards" icon={QrCode} onClick={() => setView('cards')} className="col-span-full md:col-span-2" />
    </div>

    {/* Quick Links */}
    <div className="flex justify-center pt-4">
      <button onClick={() => setView('settings')} className={`text-sm font-semibold ${BRAND_TEXT} hover:text-blue-800 transition flex items-center`}>
        <Settings className="mr-2 h-4 w-4" /> Access All Settings
      </button>
    </div>
  </div>
);

const FeedbackInbox = ({ feedback }: { feedback: typeof MOCK_FEEDBACK }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [starRatingFilter, setStarRatingFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');

  const filteredFeedback = feedback.filter(item => {
    // Tab filter
    if (activeTab !== 'All') {
      if (activeTab === 'Negative (AI flagged)' && !item.flagged) return false;
      if (activeTab === 'Positive' && !(item.rating === 5 && !item.flagged)) return false;
      if (activeTab === 'Needs follow-up' && item.status !== 'Needs follow-up') return false;
      if (activeTab === 'Resolved' && item.status !== 'Resolved') return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Star rating filter
    if (starRatingFilter !== 'all') {
      const rating = parseInt(starRatingFilter);
      if (item.rating !== rating) return false;
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const itemDate = new Date(item.date);
      const diffTime = today.getTime() - itemDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (dateFilter === 'today' && diffDays !== 0) return false;
      if (dateFilter === 'week' && diffDays > 7) return false;
      if (dateFilter === 'month' && diffDays > 30) return false;
    }

    // Channel filter
    if (channelFilter !== 'all' && item.channel !== channelFilter) {
      return false;
    }

    return true;
  });

  const tabs = ['All', 'Negative (AI flagged)', 'Positive', 'Needs follow-up', 'Resolved'];
  const channels = ['Google', 'Yelp', 'Facebook', 'Website', 'Other'];

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Recovered': 'bg-green-100 text-green-800',
    'Escalated': 'bg-red-100 text-red-800',
    'Needs follow-up': 'bg-indigo-100 text-indigo-800',
    'Waiting for customer': 'bg-purple-100 text-purple-800',
    'Resolved': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Feedback Inbox</h2>
      
      {/* Search Bar and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, summary, or status..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Star Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Star Rating</label>
            <select
              value={starRatingFilter}
              onChange={(e) => setStarRatingFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Channel Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Channels</option>
              {channels.map(channel => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-700 font-semibold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFeedback.length > 0 ? filteredFeedback.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-grow space-y-1 mb-3 md:mb-0">
              <div className="flex items-center space-x-3">
                <p className="text-lg font-bold text-gray-900">{item.name || 'Anonymous Customer'}</p>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[item.status] || 'bg-gray-100 text-gray-800'}`}>
                  {item.status}
                </span>
                <div className="flex items-center text-yellow-500 text-sm">
                  {Array(item.rating).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-500" />)}
                  {Array(5 - item.rating).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 text-gray-300" />)}
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">AI Summary:</span> {item.summary}
              </p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span>{item.date}</span>
                {item.channel && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                    {item.channel}
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2 flex-wrap md:flex-nowrap flex-shrink-0">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mb-1 md:mb-0">View Thread</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-1 md:mb-0">Recover With AI</button>
              <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">Mark Resolved</button>
            </div>
          </div>
        )) : (
          <p className="text-center p-8 bg-white rounded-xl shadow-md text-gray-500">No feedback items match this filter.</p>
        )}
      </div>
    </div>
  );
};

const AIRecoveryCenter = ({ cases }: { cases: typeof MOCK_RECOVERY_CASES }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">AI Recovery Center</h2>

    {/* Settings Toggles */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Recovery Settings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded-lg border-gray-300" />
          <span className="ml-2 text-gray-700 font-medium">Auto-apology: ON</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded-lg border-gray-300" />
          <span className="ml-2 text-gray-700 font-medium">Auto-solution: ON</span>
        </label>
        <div className="col-span-full sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Auto-follow-up:</label>
          <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2">
            <option>24h</option>
            <option>48h (Recommended)</option>
            <option>72h</option>
          </select>
        </div>
        <div className="col-span-full">
          <p className="text-sm font-medium text-gray-700 mb-2">Auto-request review only if:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" /><span className="ml-2 text-sm text-gray-700">Customer says "Thank you"</span></label>
            <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" /><span className="ml-2 text-sm text-gray-700">Customer gives thumbs up</span></label>
            <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" /><span className="ml-2 text-sm text-gray-700">Customer marks it "resolved"</span></label>
          </div>
        </div>
      </div>
    </div>

    {/* Case List */}
    <div className="space-y-4">
      {cases.map(c => (
        <div key={c.id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-500">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-xl font-bold text-gray-900">Case #{c.id}: {c.customer}</h4>
            <span className="px-3 py-1 text-sm font-semibold bg-indigo-100 text-indigo-800 rounded-full">{c.status}</span>
          </div>
          <p className="text-gray-600 mb-3 font-semibold">Problem summary: <span className="font-normal">{c.summary}</span></p>

          <div className="bg-gray-50 p-3 rounded-lg border mb-4">
            <p className="font-semibold text-sm">AI Drafted Apology:</p>
            <p className="text-sm text-gray-700 italic">"Dear {c.customer}, please accept our deepest apologies for the issue you experienced. We take this very seriously and have drafted a personalized response for your approval..."</p>
          </div>

          <div className="flex flex-wrap space-x-2 mt-2">
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-2">Approve + Send</button>
            <button className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition mb-2">Edit Message</button>
            <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition mb-2">Escalate to Owner</button>
            <button className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-2">Mark Resolved</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WinBackEngine = ({ analytics }: { analytics: typeof MOCK_WINBACK_ANALYTICS }) => (
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

const ReviewManager = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Review Manager</h2>

    {/* Filters */}
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-wrap gap-3 text-sm">
      <select className="p-2 border rounded-lg">
        <option>All Platforms</option>
        <option>Google</option>
        <option>Yelp</option>
        <option>Facebook</option>
      </select>
      <select className="p-2 border rounded-lg">
        <option>All Ratings</option>
        <option>1 Star</option>
        <option>5 Star</option>
      </select>
      <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Angry / Urgent (4)</button>
      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Spam (1)</button>
    </div>

    {/* Business Impact Widget */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Impact Widget</h3>
      <div className="grid grid-cols-3 gap-4">
        <WidgetCard title="1-Star Prevented This Week" value={1} icon={Gavel} color="text-red-500" />
        <WidgetCard title="Estimated Savings" value={'$350'} icon={DollarSign} color="text-green-500" />
        <WidgetCard title="Average Rating Trend" value={'4.6/5'} icon={BarChart3} color="text-yellow-500" />
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Incoming Reviews (Mock Example)</h3>
      <p className="text-gray-500 font-medium mb-2">Platform: Google | Rating: ⭐⭐⭐⭐⭐ | Customer: Jane D.</p>
      <p className="text-gray-700 mb-3 italic">"Best service ever! The cashier, Sarah, was so friendly and helpful. Definitely recommend this location."</p>

      <div className="bg-gray-50 p-3 rounded-lg border mt-3">
        <p className="font-semibold text-sm mb-2">AI Suggested Response</p>
        <p className="text-sm italic text-gray-700">"Thank you so much, Jane! We're thrilled to hear about your great experience, and we will be sure to pass your kind words along to Sarah! We look forward to seeing you again soon."</p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Publish Response</button>
        <button className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Edit Response</button>
      </div>
    </div>
  </div>
);

const QRCodesAndCards = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">QR Codes & eBusiness Cards</h2>

    {/* QR Section */}
    <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-blue-50 mx-auto mb-3 flex items-center justify-center text-blue-600 rounded-lg">
          <QrCode className="h-16 w-16" />
        </div>
        <p className="font-bold mb-1">Feedback QR (Main)</p>
        <p className="text-sm text-gray-500 mb-3">Collects private complaints. (Scans: 450)</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Download PNG/JPG</button>
      </div>
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-yellow-50 mx-auto mb-3 flex items-center justify-center text-yellow-600 rounded-lg">
          <Star className="h-16 w-16 fill-yellow-600" />
        </div>
        <p className="font-bold mb-1">Review QR (Happy Customers)</p>
        <p className="text-sm text-gray-500 mb-3">Directs to Google/Yelp. (Conversions: 22)</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Track Conversions</button>
      </div>
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-green-50 mx-auto mb-3 flex items-center justify-center text-green-600 rounded-lg">
          <User className="h-16 w-16" />
        </div>
        <p className="font-bold mb-1">Staff Business Card QR</p>
        <p className="text-sm text-gray-500 mb-3">One-tap contact save.</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Manage Staff Cards</button>
      </div>
    </div>

    {/* eBusiness Cards Section */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">eBusiness Card Preview (Staff)</h3>
      <div className="max-w-xs p-5 mx-auto border-2 border-gray-100 rounded-xl shadow-inner text-center bg-white">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
          <User className="h-8 w-8 text-gray-600" />
        </div>
        <p className="font-bold text-lg">Sarah Jenkins</p>
        <p className="text-sm text-gray-500">Shift Manager | <span className="text-green-600">Smart auto-follow-up: ON</span></p>
        <p className="mt-2 text-sm">Phone: 555-0199 | Email: sarah@example.com</p>
        <div className="mt-4 space-y-2">
          <button className="w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">One-tap Save Contact</button>
          <button className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">One-tap Review Link</button>
        </div>
      </div>
    </div>
  </div>
);

const OwnerSettings = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Owner Settings & Configuration</h2>

    {/* Business Profile */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Business Name:</span> Neviane AI Shop</div>
        <div><span className="font-semibold">Location(s):</span> 1 Active (New York)</div>
        <div><span className="font-semibold">Operating Hours:</span> 9am - 5pm EST</div>
        <div><span className="font-semibold">Contact Info:</span> owner@neviane.com / 555-1234</div>
        <button className="col-span-full text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Edit Profile Details</button>
      </div>
    </div>

    {/* AI Settings */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Settings & Rules</h3>
      <div className="space-y-3 text-sm">
        <p><span className="font-semibold">Tone of voice:</span> Professional/Empathetic</p>
        <p><span className="font-semibold">Follow-up schedule:</span> 48 Hours</p>
        <p><span className="font-semibold">Review request rules:</span> ON (Conditional)</p>
        <p><span className="font-semibold">Auto-escalation:</span> Email/SMS for 1-star reviews to Manager/Owner</p>
        <button className="text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Configure AI Rules</button>
      </div>
    </div>

    {/* Communication Settings */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Communication Settings</h3>
      <div className="space-y-3 text-sm">
        <p><span className="font-semibold">SMS sender ID:</span> NEVIANE-AI</p>
        <p><span className="font-semibold">Email sender:</span> notifications@neviane.com</p>
        <p><span className="font-semibold">Opt-out language:</span> Auto-added to all SMS/Email</p>
        <button className="text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Manage Senders</button>
      </div>
    </div>

    {/* Integrations */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Integrations</h3>
      <div className="flex flex-wrap gap-6">
        <div className="text-center">
          <div className="text-4xl text-green-500 mb-1">G</div>
          <p className="text-sm font-medium">Google (Connected)</p>
        </div>
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-1">Y</div>
          <p className="text-sm">Yelp</p>
          <button className="text-xs text-blue-600">Connect</button>
        </div>
        <div className="text-center">
          <div className="text-4xl text-blue-800 mb-1">f</div>
          <p className="text-sm">Facebook</p>
          <button className="text-xs text-blue-600">Connect</button>
        </div>
        <div className="text-center">
          <Mail className="h-10 w-10 text-blue-500 mx-auto mb-1" />
          <p className="text-sm font-medium">Twilio (Connected)</p>
        </div>
      </div>
    </div>

    {/* Team/Staff */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Team / Staff</h3>
      <p className="text-sm font-semibold mb-2">3 Total Members</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b">
          <p className="font-semibold">John Doe (Owner)</p>
          <p className="text-sm text-blue-600">Owner</p>
          <p className="text-xs text-gray-500">Alerts: Phone/Email</p>
          <button className="text-blue-500 text-sm hover:text-blue-700">Edit</button>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <p className="font-semibold">Alice (ID: 4321)</p>
          <p className="text-sm text-green-600">Manager</p>
          <p className="text-xs text-gray-500">Alerts: Email</p>
          <button className="text-blue-500 text-sm hover:text-blue-700">Edit</button>
        </div>
      </div>
      <button className="mt-3 text-blue-600 font-semibold text-sm">Add/Invite New Team Member</button>
    </div>
  </div>
);

const AnalyticsView = () => (
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

const SuperAdminDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-red-700">🔐 Super Admin Control Panel</h2>
    <p className="text-red-500 font-semibold italic">This interface is for Neviane platform administrators only.</p>

    {/* System Management */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">System Management</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Kill Switch (AI Module)</button>
        <button className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium">Error/Activity Logs</button>
        <button className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Billing Dashboard</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Global AI Prompts</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">SMS Cost Controls</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">GPT Billing Insights</button>
      </div>
    </div>

    {/* User Management */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">User & API Metrics</h3>
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">User Count:</span> 1,240 Active</p>
        <p><span className="font-semibold">Highest API Cost User:</span> User ID 99283 ($14.50/day)</p>
        <p><span className="font-semibold">Subscription Status:</span> 98% Active</p>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">Manage User Accounts</button>
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

export default function DashboardPage() {
  const { auth } = usePage().props as any;
  const currentUser = auth?.user;
  const [view, setView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine user role (you can adjust this based on your user model)
  const userRole = currentUser?.role || 'owner';

  const handleSignOut = async () => {
    // Clear authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth:token');
      localStorage.removeItem('auth:user');
      sessionStorage.removeItem('auth:token');
      sessionStorage.removeItem('auth:user');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    window.location.href = '/auth0/logout?' + new Date().getTime();
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardOverview setView={setView} stats={MOCK_DASHBOARD_STATS} />;
      case 'inbox':
        return <FeedbackInbox feedback={MOCK_FEEDBACK} />;
      case 'recovery':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <AIRecoveryCenter cases={MOCK_RECOVERY_CASES} />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for the AI Recovery Center.</div>;
      case 'winback':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <WinBackEngine analytics={MOCK_WINBACK_ANALYTICS} />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for the Win-Back Engine.</div>;
      case 'reviews':
        return <ReviewManager />;
      case 'cards':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <QRCodesAndCards />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for QR Code Management.</div>;
      case 'settings':
        if (['owner', 'admin'].includes(userRole)) return <OwnerSettings />;
        return <div className="p-10 text-center text-red-500">Access Denied: Only Owners can manage Settings.</div>;
      case 'analytics':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <AnalyticsView />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for Analytics.</div>;
      case 'admin':
        if (userRole === 'admin') return <SuperAdminDashboard />;
        return <div className="p-10 text-center text-red-500">Access Denied: You do not have Super Admin privileges.</div>;
      default:
        return <DashboardOverview setView={setView} stats={MOCK_DASHBOARD_STATS} />;
    }
  };

  const pageTitle = NAV_ITEMS(userRole).find(item => item.id === view)?.label || 'Dashboard';

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        currentView={view}
        setView={setView}
        userRole={userRole}
        handleSignOut={handleSignOut}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />

      {/* Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col transition-all duration-300">
        <header className="bg-white shadow-md p-4 sticky top-0 z-20 flex items-center justify-between lg:justify-start border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">{pageTitle}</h1>
          <div className="lg:ml-auto">
            <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full hidden sm:inline-block capitalize">
              {userRole} View
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

