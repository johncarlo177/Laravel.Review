import React, { useState } from 'react';
import { PageTemplate } from '../../components/page-template';
import { usePage, router } from '@inertiajs/react';

export default function Feedbacks() {
  const { feedbacks, qrcodes, filters: pageFilters = {} } = usePage().props as any;
  
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [selectedQRCode, setSelectedQRCode] = useState(pageFilters.qrcode || 'all');
  const [selectedStars, setSelectedStars] = useState(pageFilters.stars || 'all');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewFeedback = (feedback: any) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleSetupFeedback = (feedback: any) => {
    // TODO: Implement setup functionality
    console.log('Setup feedback:', feedback);
    // You can add your setup logic here, e.g., router.visit('/feedbacks/setup/' + feedback.id)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
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
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">QR Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider sticky right-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 z-10">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {(feedbacks?.data || []).length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
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
                      <td className="px-6 py-4 whitespace-nowrap text-center sticky right-0 bg-white dark:bg-gray-800 z-10">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewFeedback(feedback)}
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md"
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetupFeedback(feedback)}
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 dark:bg-green-500 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md"
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Setup
                          </button>
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

      {/* View Feedback Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Feedback Details
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedFeedback.stars)}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      QR Code
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedFeedback.qrcode?.title || 'N/A'}
                    </p>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Customer Name
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedFeedback.name || <span className="text-gray-400 italic">Anonymous</span>}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedFeedback.email || <span className="text-gray-400">N/A</span>}
                    </p>
                  </div>

                  {/* Mobile */}
                  {selectedFeedback.mobile && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Mobile
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {selectedFeedback.mobile}
                      </p>
                    </div>
                  )}

                  {/* Feedback */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Feedback
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                      {selectedFeedback.feedback || <span className="text-gray-400 italic">No feedback provided</span>}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date Submitted
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedFeedback.created_at ? new Date(selectedFeedback.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
