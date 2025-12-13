import React, { useState } from 'react';
import { Star, Calendar, Smile, Frown, CheckCircle } from 'lucide-react';

interface RecoveryActionPanelProps {
  recoveryCase: any;
  onSendSatisfactionCheck: () => void;
  onSendFollowUp: () => void;
  onMarkResolved: () => void;
}

export const RecoveryActionPanel: React.FC<RecoveryActionPanelProps> = ({
  recoveryCase,
  onSendSatisfactionCheck,
  onSendFollowUp,
  onMarkResolved,
}) => {
  const [notes, setNotes] = useState(recoveryCase.internalNotes || '');

  const csatIndicator = (csat: string | null) => {
    if (!csat || csat === 'Awaiting') return <span className="text-sm font-medium text-gray-500">Awaiting Check</span>;
    
    const isSatisfied = csat === 'Satisfied';
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center ${isSatisfied ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isSatisfied ? <Smile className="mr-1 h-4 w-4" /> : <Frown className="mr-1 h-4 w-4" />}
        {csat}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Case Actions & Internal Data</h3>

      {/* Satisfaction Check */}
      <div className="mb-4 pb-4 border-b">
        <p className="font-semibold text-gray-700 mb-2 flex justify-between items-center">
          Customer Satisfaction Check: 
          {csatIndicator(recoveryCase.csat)}
        </p>
        <button 
          onClick={onSendSatisfactionCheck} 
          disabled={recoveryCase.csat !== null}
          className="w-full py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
        >
          <Star className="mr-2 h-4 w-4" /> Send Satisfaction Check
        </button>
      </div>

      {/* Follow-Up and Notes */}
      <div className="space-y-4">
        <button 
          onClick={onSendFollowUp} 
          className="w-full py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center justify-center"
        >
          <Calendar className="mr-2 h-4 w-4" /> Schedule Follow-Up
        </button>
        
        {/* Notes Field (Internal) */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Internal Notes:</p>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Add internal notes about the case, team assignments, etc."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Resolve Button */}
        {recoveryCase.status !== 'Resolved' && (
          <button 
            onClick={onMarkResolved} 
            className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition mt-4 flex items-center justify-center"
            aria-label="Mark recovery case as resolved"
          >
            <CheckCircle className="mr-2 h-5 w-5" /> Resolve Case
          </button>
        )}
      </div>
    </div>
  );
};
