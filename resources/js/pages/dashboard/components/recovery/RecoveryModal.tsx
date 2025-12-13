import React from 'react';
import { X } from 'lucide-react';

interface RecoveryModalProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const RecoveryModal: React.FC<RecoveryModalProps> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full transition-all transform duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          {content}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button onClick={onClose} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

