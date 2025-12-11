import React from 'react';
import { Inbox, PlusCircle } from 'lucide-react';

interface RecoveryEmptyStateProps {
  title: string;
  message: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const RecoveryEmptyState: React.FC<RecoveryEmptyStateProps> = ({ title, message, ctaText, onCtaClick }) => (
  <div className="text-center py-12 px-4">
    <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-gray-700">{title}</h3>
    <p className="mt-2 text-sm text-gray-500">{message}</p>
    {ctaText && onCtaClick && (
      <button
        onClick={onCtaClick}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> {ctaText}
      </button>
    )}
  </div>
);

