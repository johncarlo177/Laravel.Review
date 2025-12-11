import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RecoveryFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
}

export const RecoveryFollowUpModal: React.FC<RecoveryFollowUpModalProps> = ({ isOpen, onClose, ticketId }) => {
  if (!isOpen) return null;

  const [template, setTemplate] = useState('Short check-in');
  const [schedule, setSchedule] = useState('now');

  const handleConfirm = () => {
    console.log(`Scheduling follow-up for ticket ${ticketId} with template ${template} at ${schedule}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full transition-all transform duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Schedule Follow-Up</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 pt-4 border-t">
          <button onClick={handleConfirm} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
            Confirm & Schedule Follow-Up
          </button>
        </div>
      </div>
    </div>
  );
};

