import {
  Home,
  Inbox,
  Shield,
  Star,
  QrCode,
  BarChart3,
  Settings,
  ShieldCheck,
  UserPlus,
  MessageSquare,
  CreditCard,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles: string[];
  children?: NavItem[];
}

export const NAV_ITEMS = (userRole: string): NavItem[] => {
  const allItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['owner', 'manager', 'staff', 'admin'] },
    {
      id: 'feedback',
      label: 'Feedbacks',
      icon: MessageSquare,
      roles: ['owner', 'manager', 'staff', 'admin'],
      children: [
        { id: 'inbox', label: 'Inbox', icon: Inbox, roles: ['owner', 'manager', 'staff', 'admin'] },
        { id: 'addcustomer', label: 'Add / Invite Customer', icon: UserPlus, roles: ['owner', 'manager', 'admin'] },
      ],
    },
    { id: 'recovery', label: 'AI Recovery Center', icon: Shield, roles: ['owner', 'manager', 'admin'] },
    { id: 'reviews', label: 'Review Manager', icon: Star, roles: ['owner', 'manager', 'staff', 'admin'] },
    { id: 'cards', label: 'QR Codes & Cards', icon: QrCode, roles: ['owner', 'manager', 'admin'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager', 'admin'] },
    { id: 'billing', label: 'Billing', icon: CreditCard, roles: ['owner', 'admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['owner', 'admin'] },
    { id: 'admin', label: 'Super Admin', icon: ShieldCheck, roles: ['admin'] },
  ];

  // Filter items based on role, including nested children
  return allItems
    .filter(item => item.roles.includes(userRole || 'owner'))
    .map(item => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter(child => child.roles.includes(userRole || 'owner')),
        };
      }
      return item;
    });
};

