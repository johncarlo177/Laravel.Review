import React, { useState, useEffect } from 'react';
import { LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { BrandHeader } from './BrandHeader';
import { NAV_ITEMS, NavItem } from '../../data/navigation';

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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Auto-expand parent if a child is active
  useEffect(() => {
    navItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.id === currentView);
        if (hasActiveChild) {
          setExpandedItems(prev => new Set(prev).add(item.id));
        }
      }
    });
  }, [currentView, navItems]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.id === currentView) return true;
    if (item.children) {
      return item.children.some(child => child.id === currentView);
    }
    return false;
  };

  const isChildActive = (childId: string): boolean => {
    return currentView === childId;
  };

  const renderNavItem = (item: NavItem) => {
    const isExpanded = expandedItems.has(item.id);
    const isActive = isItemActive(item);

    if (item.children && item.children.length > 0) {
      return (
        <div key={item.id} className="space-y-1">
          <button
            onClick={() => toggleExpand(item.id)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-gray-100 text-gray-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1">
              {item.children.map(child => (
                <button
                  key={child.id}
                  onClick={() => {
                    setView(child.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 text-left ${
                    isChildActive(child.id)
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <child.icon className="w-4 h-4 mr-3" />
                  <span>{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => {
          setView(item.id);
          setIsSidebarOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
          currentView === item.id
            ? 'bg-blue-100 text-blue-700 font-bold'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        <span>{item.label}</span>
      </button>
    );
  };

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
          {navItems.map(item => renderNavItem(item))}
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

