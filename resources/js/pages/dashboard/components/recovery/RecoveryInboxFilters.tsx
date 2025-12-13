import React from 'react';
import { Search, X, Settings } from 'lucide-react';

interface RecoveryInboxFiltersProps {
  currentFilters: any;
  setFilters: (filters: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onMassAction: (type: string) => void;
  automationSettings: {
    enabled: {
      autoRecovery: boolean;
      autoWinBack: boolean;
      autoReferral: boolean;
    };
    schedule: {
      winBack: string;
      referral: string;
    };
  };
  setRoute: (route: string | null) => void;
}

const filterButton = (key: string, value: any, label: string, isActive: boolean, onClick: () => void) => (
  <button
    key={value}
    onClick={onClick}
    className={`px-3 py-1 text-xs rounded-full transition-colors font-medium ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
);

export const RecoveryInboxFilters: React.FC<RecoveryInboxFiltersProps> = ({
  currentFilters,
  setFilters,
  searchTerm,
  setSearchTerm,
  onMassAction,
  automationSettings,
  setRoute,
}) => {
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  return (
    <div className="p-4 sm:p-6 border-b bg-gray-50 rounded-t-xl">
      {/* AI Automation Settings Link */}
      <h2 className="text-lg font-bold text-gray-800 mb-3 flex justify-between items-center">
        AI Automation Status
        <button 
          onClick={() => setRoute('automationSettings')}
          className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition flex items-center"
        >
          <Settings className="mr-2 h-4 w-4" /> View & Edit Settings
        </button>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
        <div className={`p-3 rounded-lg border text-sm font-medium ${automationSettings.enabled.autoRecovery ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
          Auto-Recovery (1-4★): {automationSettings.enabled.autoRecovery ? 'ON' : 'OFF'}
        </div>
        <div className={`p-3 rounded-lg border text-sm font-medium ${automationSettings.enabled.autoWinBack ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
          Auto-Win Back (1-4★): {automationSettings.enabled.autoWinBack ? 'ON' : 'OFF'}
        </div>
        <div className={`p-3 rounded-lg border text-sm font-medium ${automationSettings.enabled.autoReferral ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
          Auto-Referral (5★): {automationSettings.enabled.autoReferral ? 'ON' : 'OFF'}
        </div>
      </div>
      
      {/* Mass Actions and Search */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">Recovery Case Inbox & Mass Actions</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search customers or feedback excerpts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        {/* Mass Action Buttons */}
        <div className="flex space-x-3 w-full sm:w-auto">
          <button 
            onClick={() => onMassAction('winBack')}
            className="w-1/2 sm:w-auto py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md text-sm"
          >
            <span className="mr-2">↻</span> Win Back (Resolved 1-4★)
          </button>
          <button 
            onClick={() => onMassAction('referral')}
            className="w-1/2 sm:w-auto py-2 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition shadow-md text-sm"
          >
            <span className="mr-2">↗</span> Refer Friends (All 5★)
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm border-t pt-4">
        <span className="font-semibold text-gray-600 flex-shrink-0">Filter By:</span>

        {/* Status Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Status:</span>
          {filterButton('status', 'New', 'New', currentFilters.status === 'New', () => handleFilterChange('status', 'New'))}
          {filterButton('status', 'Responding', 'Responding', currentFilters.status === 'Responding', () => handleFilterChange('status', 'Responding'))}
          {filterButton('status', 'Resolved', 'Resolved', currentFilters.status === 'Resolved', () => handleFilterChange('status', 'Resolved'))}
        </div>

        {/* Rating Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Rating:</span>
          {filterButton('rating', 1, '1★', currentFilters.rating === 1, () => handleFilterChange('rating', 1))}
          {filterButton('rating', 2, '2★', currentFilters.rating === 2, () => handleFilterChange('rating', 2))}
          {filterButton('rating', 3, '3★', currentFilters.rating === 3, () => handleFilterChange('rating', 3))}
          {filterButton('rating', 4, '4★', currentFilters.rating === 4, () => handleFilterChange('rating', 4))}
          {filterButton('rating', 5, '5★', currentFilters.rating === 5, () => handleFilterChange('rating', 5))}
        </div>

        {/* Channel Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Channel:</span>
          {filterButton('channel', 'SMS', 'SMS', currentFilters.channel === 'SMS', () => handleFilterChange('channel', 'SMS'))}
          {filterButton('channel', 'Email', 'Email', currentFilters.channel === 'Email', () => handleFilterChange('channel', 'Email'))}
          {filterButton('channel', 'App', 'App', currentFilters.channel === 'App', () => handleFilterChange('channel', 'App'))}
        </div>
        
        <button onClick={() => { setFilters({}); setSearchTerm(''); }} className="ml-auto px-3 py-1 text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <X className="mr-1 h-4 w-4" /> Clear All
        </button>
      </div>
    </div>
  );
};
