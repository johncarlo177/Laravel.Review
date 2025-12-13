import React, { useState } from 'react';
import { Star, Search, UserPlus } from 'lucide-react';
interface FeedbackItem {
  id: number;
  name: string;
  rating: number;
  sentiment: string;
  date: string;
  summary: string;
  status: string;
  flagged: boolean;
  channel: string;
}

interface FeedbackInboxProps {
  feedback: FeedbackItem[];
}

export const FeedbackInbox: React.FC<FeedbackInboxProps> = ({ feedback }) => {
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

  const handleAddCustomer = (customer: any) => {
    // Handle customer addition - you can add API call here or update state
    console.log('Customer added:', customer);
    // Example: You might want to trigger a feedback request for this customer
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Feedback Inbox</h2>
      </div>

      {/* Search Bar and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
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
          <div className="w-full lg:w-48 flex-shrink-0">
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
          <div className="w-full lg:w-48 flex-shrink-0">
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
          <div className="w-full lg:w-48 flex-shrink-0">
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

