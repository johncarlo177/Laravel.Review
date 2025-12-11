import React from 'react';

export const SuperAdminDashboard: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-red-700">🔐 Super Admin Control Panel</h2>
    <p className="text-red-500 font-semibold italic">This interface is for Neviane platform administrators only.</p>

    {/* System Management */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">System Management</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Kill Switch (AI Module)</button>
        <button className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium">Error/Activity Logs</button>
        <button className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Billing Dashboard</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Global AI Prompts</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">SMS Cost Controls</button>
        <button className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">GPT Billing Insights</button>
      </div>
    </div>

    {/* User Management */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">User & API Metrics</h3>
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">User Count:</span> 1,240 Active</p>
        <p><span className="font-semibold">Highest API Cost User:</span> User ID 99283 ($14.50/day)</p>
        <p><span className="font-semibold">Subscription Status:</span> 98% Active</p>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">Manage User Accounts</button>
      </div>
    </div>
  </div>
);

