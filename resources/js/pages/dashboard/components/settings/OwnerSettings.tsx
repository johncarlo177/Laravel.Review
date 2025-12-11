import React from 'react';

export const OwnerSettings: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Owner Settings & Configuration</h2>

    {/* Business Profile */}
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Business Name:</span> Neviane AI Shop</div>
        <div><span className="font-semibold">Location(s):</span> 1 Active (New York)</div>
        <div><span className="font-semibold">Operating Hours:</span> 9am - 5pm EST</div>
        <div><span className="font-semibold">Contact Info:</span> owner@neviane.com / 555-1234</div>
        <button className="col-span-full text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Edit Profile Details</button>
      </div>
    </div>

    {/* AI Settings */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Settings & Rules</h3>
      <div className="space-y-3 text-sm">
        <p><span className="font-semibold">Tone of voice:</span> Professional/Empathetic</p>
        <p><span className="font-semibold">Follow-up schedule:</span> 48 Hours</p>
        <p><span className="font-semibold">Review request rules:</span> ON (Conditional)</p>
        <p><span className="font-semibold">Auto-escalation:</span> Email/SMS for 1-star reviews to Manager/Owner</p>
        <button className="text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Configure AI Rules</button>
      </div>
    </div>

    {/* Communication Settings */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Communication Settings</h3>
      <div className="space-y-3 text-sm">
        <p><span className="font-semibold">SMS sender ID:</span> NEVIANE-AI</p>
        <p><span className="font-semibold">Email sender:</span> notifications@neviane.com</p>
        <p><span className="font-semibold">Opt-out language:</span> Auto-added to all SMS/Email</p>
        <button className="text-sm text-blue-600 hover:text-blue-800 text-left mt-2 font-medium">Manage Senders</button>
      </div>
    </div>

    {/* Integrations */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Integrations</h3>
      <div className="flex flex-wrap gap-6">
        <div className="text-center">
          <div className="text-4xl text-green-500 mb-1">G</div>
          <p className="text-sm font-medium">Google (Connected)</p>
        </div>
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-1">Y</div>
          <p className="text-sm">Yelp</p>
          <button className="text-xs text-blue-600">Connect</button>
        </div>
        <div className="text-center">
          <div className="text-4xl text-blue-800 mb-1">f</div>
          <p className="text-sm">Facebook</p>
          <button className="text-xs text-blue-600">Connect</button>
        </div>
        <div className="text-center">
          <div className="text-4xl text-blue-500 mb-1">T</div>
          <p className="text-sm font-medium">Twilio (Connected)</p>
        </div>
      </div>
    </div>

    {/* Team/Staff */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Team / Staff</h3>
      <p className="text-sm font-semibold mb-2">3 Total Members</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b">
          <p className="font-semibold">John Doe (Owner)</p>
          <p className="text-sm text-blue-600">Owner</p>
          <p className="text-xs text-gray-500">Alerts: Phone/Email</p>
          <button className="text-blue-500 text-sm hover:text-blue-700">Edit</button>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <p className="font-semibold">Alice (ID: 4321)</p>
          <p className="text-sm text-green-600">Manager</p>
          <p className="text-xs text-gray-500">Alerts: Email</p>
          <button className="text-blue-500 text-sm hover:text-blue-700">Edit</button>
        </div>
      </div>
      <button className="mt-3 text-blue-600 font-semibold text-sm">Add/Invite New Team Member</button>
    </div>
  </div>
);

