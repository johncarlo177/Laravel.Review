import React, { useState } from 'react';
import { PageTemplate } from '../../components/page-template';
import { usePage, router } from '@inertiajs/react';

export default function Feedbacks() {
  const { feedbacks, qrcodes, filters: pageFilters = {} } = usePage().props as any;
  
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [selectedQRCode, setSelectedQRCode] = useState(pageFilters.qrcode || 'all');
  const [selectedStars, setSelectedStars] = useState(pageFilters.stars || 'all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = { page: 1 };
    if (searchTerm) params.search = searchTerm;
    if (selectedQRCode !== 'all') params.qrcode = selectedQRCode;
    if (selectedStars !== 'all') params.stars = selectedStars;
    router.get('/feedbacks', params);
  };

  const handleFilterChange = () => {
    const params: any = { page: 1 };
    if (searchTerm) params.search = searchTerm;
    if (selectedQRCode !== 'all') params.qrcode = selectedQRCode;
    if (selectedStars !== 'all') params.stars = selectedStars;
    router.get('/feedbacks', params);
  };

  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Feedbacks' }
  ];

  const renderStars = (stars: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{stars}/5</span>
      </div>
    );
  };

  return (
    <PageTemplate 
      title="Customer Feedbacks" 
      description="Manage all customer feedback and reviews from your QR codes"
      url="/feedbacks"
      breadcrumbs={breadcrumbs}
      noPadding
    >
      <div className="p-6 space-y-6">
        {/* Search and filters - Enhanced */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Search Feedbacks
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or feedback..."
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  QR Code
                </label>
                <select
                  value={selectedQRCode}
                  onChange={(e) => {
                    setSelectedQRCode(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All QR Codes</option>
                  {(qrcodes || []).map((qrcode: any) => (
                    <option key={qrcode.id} value={qrcode.id}>
                      {qrcode.title || `QR #${qrcode.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <select
                  value={selectedStars}
                  onChange={(e) => {
                    setSelectedStars(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                  <option value="3">⭐⭐⭐ 3 Stars</option>
                  <option value="2">⭐⭐ 2 Stars</option>
                  <option value="1">⭐ 1 Star</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                🔍 Search
              </button>
            </div>
          </form>
        </div>

        {/* Summary Stats - Enhanced with gradients */}
        {feedbacks?.summary && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-800/50 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Total Feedbacks</p>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{feedbacks.summary.total || 0}</p>
                </div>
                <div className="text-4xl opacity-20">📊</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl shadow-lg border border-green-200 dark:border-green-800/50 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">5 Stars</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{feedbacks.summary.stars_5 || 0}</p>
                </div>
                <div className="text-4xl opacity-20">⭐</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800/50 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">4 Stars</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{feedbacks.summary.stars_4 || 0}</p>
                </div>
                <div className="text-4xl opacity-20">⭐</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl shadow-lg border border-orange-200 dark:border-orange-800/50 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-1">3 Stars</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{feedbacks.summary.stars_3 || 0}</p>
                </div>
                <div className="text-4xl opacity-20">⭐</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl shadow-lg border border-red-200 dark:border-red-800/50 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">1-2 Stars</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{feedbacks.summary.stars_1_2 || 0}</p>
                </div>
                <div className="text-4xl opacity-20">⭐</div>
              </div>
            </div>
          </div>
        )}

        {/* Table - Enhanced */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">QR Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {(feedbacks?.data || []).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl mb-4 opacity-20">📭</div>
                        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No feedbacks found</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  (feedbacks?.data || []).map((feedback: any, index: number) => (
                    <tr 
                      key={feedback.id || index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {feedback.qrcode?.title || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(feedback.stars)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {feedback.name || <span className="text-gray-400 italic">Anonymous</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {feedback.email || <span className="text-gray-400">N/A</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                          {feedback.feedback ? (
                            feedback.feedback.length > 60 ? (
                              <span title={feedback.feedback}>
                                {feedback.feedback.substring(0, 60)}...
                              </span>
                            ) : (
                              feedback.feedback
                            )
                          ) : (
                            <span className="text-gray-400 italic">No feedback provided</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {feedback.created_at ? new Date(feedback.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Enhanced */}
          {feedbacks?.links && feedbacks.links.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{feedbacks.from || 0}</span> to{' '}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{feedbacks.to || 0}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{feedbacks.total || 0}</span> feedbacks
                </div>
                <div className="flex gap-1">
                  {feedbacks.links.map((link: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => link.url && router.get(link.url)}
                      disabled={!link.url || link.active}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        link.active
                          ? 'bg-blue-600 text-white shadow-md'
                          : link.url
                          ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
