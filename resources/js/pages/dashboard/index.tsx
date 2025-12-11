import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

// Shared Components
import { Sidebar } from './components/shared/Sidebar';

// Page Components
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { FeedbackInbox } from './components/feedback/FeedbackInbox';
import { AIRecoveryCenter } from './components/recovery/AIRecoveryCenter';
import { WinBackEngine } from './components/winback/WinBackEngine';
import { ReviewManager } from './components/reviews/ReviewManager';
import { QRCodesAndCards } from './components/cards/QRCodesAndCards';
import { OwnerSettings } from './components/settings/OwnerSettings';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';

// Data
import { MOCK_DASHBOARD_STATS, MOCK_FEEDBACK, MOCK_WINBACK_ANALYTICS } from './data/mockData';
import { NAV_ITEMS } from './data/navigation';

export default function DashboardPage() {
  const { auth } = usePage().props as any;
  const currentUser = auth?.user;
  const [view, setView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine user role (you can adjust this based on your user model)
  const userRole = currentUser?.role || 'owner';

  const handleSignOut = async () => {
    // Clear authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth:token');
      localStorage.removeItem('auth:user');
      sessionStorage.removeItem('auth:token');
      sessionStorage.removeItem('auth:user');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    window.location.href = '/auth0/logout?' + new Date().getTime();
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardOverview setView={setView} stats={MOCK_DASHBOARD_STATS} />;
      case 'inbox':
        return <FeedbackInbox feedback={MOCK_FEEDBACK} />;
      case 'recovery':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <AIRecoveryCenter />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for the AI Recovery Center.</div>;
      case 'winback':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <WinBackEngine analytics={MOCK_WINBACK_ANALYTICS} />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for the Win-Back Engine.</div>;
      case 'reviews':
        return <ReviewManager />;
      case 'cards':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <QRCodesAndCards />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for QR Code Management.</div>;
      case 'settings':
        if (['owner', 'admin'].includes(userRole)) return <OwnerSettings />;
        return <div className="p-10 text-center text-red-500">Access Denied: Only Owners can manage Settings.</div>;
      case 'analytics':
        if (['owner', 'manager', 'admin'].includes(userRole)) return <AnalyticsView />;
        return <div className="p-10 text-center text-red-500">Access Denied: You need Manager or Owner privileges for Analytics.</div>;
      case 'admin':
        if (userRole === 'admin') return <SuperAdminDashboard />;
        return <div className="p-10 text-center text-red-500">Access Denied: You do not have Super Admin privileges.</div>;
      default:
        return <DashboardOverview setView={setView} stats={MOCK_DASHBOARD_STATS} />;
    }
  };

  const pageTitle = NAV_ITEMS(userRole).find(item => item.id === view)?.label || 'Dashboard';

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        currentView={view}
        setView={setView}
        userRole={userRole}
        handleSignOut={handleSignOut}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />

      {/* Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col transition-all duration-300">
        <header className="bg-white shadow-md p-4 sticky top-0 z-20 flex items-center justify-between lg:justify-start border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">{pageTitle}</h1>
          <div className="lg:ml-auto">
            <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full hidden sm:inline-block capitalize">
              {userRole} View
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
