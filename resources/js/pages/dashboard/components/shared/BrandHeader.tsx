import React from 'react';
import { Brain } from 'lucide-react';
import { BRAND_TEXT } from '../../data/constants';

interface BrandHeaderProps {
  currentUser?: any;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ currentUser }) => (
  <a
    href="/"
    className="flex items-center space-x-2 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
  >
    <Brain className={`text-2xl ${BRAND_TEXT}`} />
    <h1 className="text-xl font-extrabold text-gray-900">Neviane</h1>
    {currentUser && (
      <span className="ml-auto text-xs text-gray-400 p-1 bg-gray-100 rounded-full">
        ID: {currentUser.id?.toString().substring(0, 4) || 'User'}...
      </span>
    )}
  </a>
);

