import React from 'react';
import { Search, X } from 'lucide-react';

interface RecoveryInboxFiltersProps {
  currentFilters: any;
  setFilters: (filters: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const RecoveryInboxFilters: React.FC<RecoveryInboxFiltersProps> = ({
  currentFilters,
  setFilters,
  searchTerm,
  setSearchTerm,
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

  return (
    <div className="p-4 sm:p-6 border-b bg-gray-50 rounded-t-xl">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search customers or feedback excerpts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm border-t pt-4">
        <span className="font-semibold text-gray-600 flex-shrink-0">Filter By:</span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Status:</span>
          {filterButton('status', 'New', 'New')}
          {filterButton('status', 'Responding', 'Responding')}
          {filterButton('status', 'Resolved', 'Resolved')}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Rating:</span>
          {filterButton('rating', 1, '1 Star')}
          {filterButton('rating', 2, '2 Stars')}
          {filterButton('rating', 3, '3 Stars')}
        </div>
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

