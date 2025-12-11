import React from 'react';
import { Search, X } from 'lucide-react';

interface RecoveryInboxFiltersProps {
  currentFilters: any;
  setFilters: (filters: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onMassAction: (type: string) => void;
  automationSettings: {
    autoRecovery: boolean;
    autoReferral: boolean;
  };
  setAutomationSettings: (settings: any) => void;
}

interface AutomationToggleProps {
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  isPrimary: boolean;
}

const AutomationToggle: React.FC<AutomationToggleProps> = ({ label, description, isEnabled, onToggle, isPrimary }) => (
  <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${isPrimary ? 'bg-indigo-50' : 'bg-gray-100'} shadow-sm`}>
    <div className="flex-1 mr-4">
      <p className={`font-bold ${isPrimary ? 'text-indigo-800' : 'text-gray-800'}`}>{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={isEnabled} 
        onChange={onToggle} 
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      <span className={`ms-3 text-sm font-medium ${isEnabled ? 'text-indigo-700' : 'text-gray-500'}`}>
        {isEnabled ? 'ON' : 'OFF'}
      </span>
    </label>
  </div>
);

export const RecoveryInboxFilters: React.FC<RecoveryInboxFiltersProps> = ({
  currentFilters,
  setFilters,
  searchTerm,
  setSearchTerm,
  onMassAction,
  automationSettings,
  setAutomationSettings,
}) => {
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  const filterButton = (key: string, value: any, label: string) => {
    const isActive = currentFilters[key] === value;
    return (
      <button
        key={value}
        onClick={() => handleFilterChange(key, value)}
        className={`px-3 py-1 text-xs rounded-full transition-colors font-medium ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {label}
      </button>
    );
  };

  const handleAutomationToggle = (key: string) => {
    setAutomationSettings((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-4 sm:p-6 border-b bg-gray-50 rounded-t-xl">
      {/* AI Automation Settings */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">AI Automation Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b">
        <AutomationToggle 
          label="Auto Recovery (1-3 Star)"
          description="AI automatically crafts and sends personalized recovery messages (refund/coupon/call) to negative feedback."
          isEnabled={automationSettings.autoRecovery}
          onToggle={() => handleAutomationToggle('autoRecovery')}
          isPrimary={true}
        />
        <AutomationToggle 
          label="Auto Referral (5 Star)"
          description="AI automatically sends personal referral requests (SMS/Email) to 5-star customers."
          isEnabled={automationSettings.autoReferral}
          onToggle={() => handleAutomationToggle('autoReferral')}
          isPrimary={true}
        />
      </div>
      
      {/* Mass Actions and Search */}
      <h2 className="text-lg font-bold text-gray-800 mb-3">Inbox & Mass Actions</h2>
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
            <span className="mr-2">↻</span> Win Back (Resolved 1-3★)
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
          {filterButton('status', 'New', 'New')}
          {filterButton('status', 'Responding', 'Responding')}
          {filterButton('status', 'Resolved', 'Resolved')}
        </div>

        {/* Rating Filters (Extended to 4 and 5 Stars) */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Rating:</span>
          {filterButton('rating', 1, '1★')}
          {filterButton('rating', 2, '2★')}
          {filterButton('rating', 3, '3★')}
          {filterButton('rating', 4, '4★')}
          {filterButton('rating', 5, '5★')}
        </div>

        {/* Channel Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Channel:</span>
          {filterButton('channel', 'SMS', 'SMS')}
          {filterButton('channel', 'Email', 'Email')}
          {filterButton('channel', 'App', 'App')}
        </div>
        
        <button onClick={() => { setFilters({}); setSearchTerm(''); }} className="ml-auto px-3 py-1 text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <X className="mr-1 h-4 w-4" /> Clear All
        </button>
      </div>
    </div>
  );
};
