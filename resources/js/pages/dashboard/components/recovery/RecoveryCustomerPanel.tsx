import React from 'react';
import { User, Phone, Mail, Calendar, AlertTriangle, History } from 'lucide-react';
import { MOCK_RECOVERY_CUSTOMER_DATA } from '../../data/mockData';

interface RecoveryCustomerPanelProps {
  customer?: typeof MOCK_RECOVERY_CUSTOMER_DATA;
}

export const RecoveryCustomerPanel: React.FC<RecoveryCustomerPanelProps> = ({ customer = MOCK_RECOVERY_CUSTOMER_DATA }) => {
  const infoItem = (Icon: React.ElementType, label: string, value: string) => (
    <div className="flex items-center space-x-2 text-sm">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Details</h3>
      <div className="space-y-3">
        {infoItem(User, "Name", customer.name)}
        {infoItem(Phone, "Phone", customer.phone)}
        {infoItem(Mail, "Email", customer.email)}
        {infoItem(Calendar, "Visits", `${customer.visits} in 12 mo`)}
        {infoItem(AlertTriangle, "Past Complaints", customer.pastComplaints > 0 ? `${customer.pastComplaints} (View Log)` : 'None')}
      </div>
      <button className="mt-4 w-full py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition border-t pt-3 flex items-center justify-center">
        <History className="mr-2 h-4 w-4" /> View Full Purchase History
      </button>
    </div>
  );
};

