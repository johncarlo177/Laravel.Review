import React from 'react';
import { LogOut } from 'lucide-react';
import { BrandHeader } from './BrandHeader';
import { NAV_ITEMS } from '../../data/navigation';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  userRole: string;
  handleSignOut: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  currentUser?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setView,
  userRole,
  handleSignOut,
  isSidebarOpen,
  setIsSidebarOpen,
  currentUser,
}) => {
  const navItems = NAV_ITEMS(userRole);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-gray-900 opacity-50 ${isSidebarOpen ? 'block lg:hidden' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white z-40 flex flex-col shadow-xl`}>
        <BrandHeader currentUser={currentUser} />
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsSidebarOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 mb-2">Role: <span className="capitalize font-semibold text-gray-600">{userRole}</span></p>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

