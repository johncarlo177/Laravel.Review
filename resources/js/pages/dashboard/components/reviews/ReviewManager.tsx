import React from 'react';
import { Gavel, DollarSign, BarChart3 } from 'lucide-react';
import { WidgetCard } from '../shared/WidgetCard';

export const ReviewManager: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Review Manager</h2>

    {/* Filters */}
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-wrap gap-3 text-sm">
      <select className="p-2 border rounded-lg">
        <option>All Platforms</option>
        <option>Google</option>
        <option>Yelp</option>
        <option>Facebook</option>
      </select>
      <select className="p-2 border rounded-lg">
        <option>All Ratings</option>
        <option>1 Star</option>
        <option>5 Star</option>
      </select>
      <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Angry / Urgent (4)</button>
      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Spam (1)</button>
    </div>

    {/* Business Impact Widget */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Impact Widget</h3>
      <div className="grid grid-cols-3 gap-4">
        <WidgetCard title="1-Star Prevented This Week" value={1} icon={Gavel} color="text-red-500" />
        <WidgetCard title="Estimated Savings" value={'$350'} icon={DollarSign} color="text-green-500" />
        <WidgetCard title="Average Rating Trend" value={'4.6/5'} icon={BarChart3} color="text-yellow-500" />
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Incoming Reviews (Mock Example)</h3>
      <p className="text-gray-500 font-medium mb-2">Platform: Google | Rating: ⭐⭐⭐⭐⭐ | Customer: Jane D.</p>
      <p className="text-gray-700 mb-3 italic">"Best service ever! The cashier, Sarah, was so friendly and helpful. Definitely recommend this location."</p>

      <div className="bg-gray-50 p-3 rounded-lg border mt-3">
        <p className="font-semibold text-sm mb-2">AI Suggested Response</p>
        <p className="text-sm italic text-gray-700">"Thank you so much, Jane! We're thrilled to hear about your great experience, and we will be sure to pass your kind words along to Sarah! We look forward to seeing you again soon."</p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Publish Response</button>
        <button className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Edit Response</button>
      </div>
    </div>
  </div>
);

