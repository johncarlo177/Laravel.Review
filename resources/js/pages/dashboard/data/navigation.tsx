import {
  Home,
  Inbox,
  Shield,
  Handshake,
  Star,
  QrCode,
  BarChart3,
  Settings,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';

export const NAV_ITEMS = (userRole: string) => [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'inbox', label: 'Feedback Inbox', icon: Inbox, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'addcustomer', label: 'Add Customer', icon: UserPlus, roles: ['owner', 'manager', 'admin'] },
  { id: 'recovery', label: 'AI Recovery Center', icon: Shield, roles: ['owner', 'manager', 'admin'] },
  { id: 'winback', label: 'Win-Back Engine', icon: Handshake, roles: ['owner', 'manager', 'admin'] },
  { id: 'reviews', label: 'Review Manager', icon: Star, roles: ['owner', 'manager', 'staff', 'admin'] },
  { id: 'cards', label: 'QR Codes & Cards', icon: QrCode, roles: ['owner', 'manager', 'admin'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['owner', 'manager', 'admin'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['owner', 'admin'] },
  { id: 'admin', label: 'Super Admin', icon: ShieldCheck, roles: ['admin'] },
].filter(item => item.roles.includes(userRole || 'owner'));

