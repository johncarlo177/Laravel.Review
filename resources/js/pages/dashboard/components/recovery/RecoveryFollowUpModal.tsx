import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RecoveryFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  updateTicket: (fields: any) => void;
}

export const RecoveryFollowUpModal: React.FC<RecoveryFollowUpModalProps> = ({ isOpen, onClose, ticketId, updateTicket }) => {
  if (!isOpen) return null;

  const [template, setTemplate] = useState('Short check-in');
  const [schedule, setSchedule] = useState('24h');

  const handleConfirm = () => {
    const mockUpdate = { id: ticketId, followUp: { template, schedule } };
    updateTicket(mockUpdate);
    console.log(`Scheduling follow-up for case ${ticketId} with template ${template} at ${schedule}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full transition-all transform duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Schedule Follow-Up</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Template Selector */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">1. Choose Template:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              {['Short check-in', 'Offer incentive', 'Manager outreach'].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTemplate(t)}
                  className={`p-3 border rounded-lg transition-colors text-center ${
                    template === t ? 'bg-blue-100 border-blue-600 text-blue-700 font-bold' : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Selector */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">2. Schedule Send Time:</p>
            <div className="flex space-x-2 text-sm">
              {['now', '24h', '48h', '7 days'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSchedule(s)}
                  className={`flex-1 p-3 border rounded-lg transition-colors ${
                    schedule === s ? 'bg-indigo-100 border-indigo-600 text-indigo-700 font-bold' : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  {s === 'now' ? 'Send Now' : `In ${s}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t">
          <button 
            onClick={handleConfirm}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            aria-label="Confirm and schedule follow-up message"
          >
            Confirm & Schedule Follow-Up
          </button>
        </div>
      </div>
    </div>
  );
};
