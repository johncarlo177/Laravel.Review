import React from 'react';
import { QrCode, Star, User } from 'lucide-react';

export const QRCodesAndCards: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">QR Codes & eBusiness Cards</h2>

    {/* QR Section */}
    <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-blue-50 mx-auto mb-3 flex items-center justify-center text-blue-600 rounded-lg">
          <QrCode className="h-16 w-16" />
        </div>
        <p className="font-bold mb-1">Feedback QR (Main)</p>
        <p className="text-sm text-gray-500 mb-3">Collects private complaints. (Scans: 450)</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Download PNG/JPG</button>
      </div>
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-yellow-50 mx-auto mb-3 flex items-center justify-center text-yellow-600 rounded-lg">
          <Star className="h-16 w-16 fill-yellow-600" />
        </div>
        <p className="font-bold mb-1">Review QR (Happy Customers)</p>
        <p className="text-sm text-gray-500 mb-3">Directs to Google/Yelp. (Conversions: 22)</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Track Conversions</button>
      </div>
      <div className="text-center p-4 border rounded-xl shadow-sm">
        <div className="w-32 h-32 bg-green-50 mx-auto mb-3 flex items-center justify-center text-green-600 rounded-lg">
          <User className="h-16 w-16" />
        </div>
        <p className="font-bold mb-1">Staff Business Card QR</p>
        <p className="text-sm text-gray-500 mb-3">One-tap contact save.</p>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Manage Staff Cards</button>
      </div>
    </div>

    {/* eBusiness Cards Section */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">eBusiness Card Preview (Staff)</h3>
      <div className="max-w-xs p-5 mx-auto border-2 border-gray-100 rounded-xl shadow-inner text-center bg-white">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
          <User className="h-8 w-8 text-gray-600" />
        </div>
        <p className="font-bold text-lg">Sarah Jenkins</p>
        <p className="text-sm text-gray-500">Shift Manager | <span className="text-green-600">Smart auto-follow-up: ON</span></p>
        <p className="mt-2 text-sm">Phone: 555-0199 | Email: sarah@example.com</p>
        <div className="mt-4 space-y-2">
          <button className="w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">One-tap Save Contact</button>
          <button className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">One-tap Review Link</button>
        </div>
      </div>
    </div>
  </div>
);

