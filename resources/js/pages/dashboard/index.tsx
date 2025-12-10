import React, { useState, useEffect } from 'react';
import {
  Home,
  Inbox,
  Bot,
  DollarSign,
  QrCode,
  CreditCard,
  Bell,
  Users,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Ban,
  Check,
  Calendar,
  Smartphone,
  Mail,
  Download,
  Image as ImageIcon,
  Phone,
  AtSign,
  Edit,
  Settings,
  PenSquare,
  Save,
  Trash2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lock,
  User,
  UserCog,
  Activity,
} from 'lucide-react';

type PageId = 
  | 'dashboard'
  | 'inbox'
  | 'recovery-setup'
  | 'winback'
  | 'qr-system'
  | 'cards'
  | 'alerts'
  | 'staff'
  | 'billing';

const DashboardPage = () => {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [winbackSegment, setWinbackSegment] = useState('lost');
  const [winbackMessage, setWinbackMessage] = useState('');
  const [qrColor, setQrColor] = useState('#1e40af');
  const [cardPhone, setCardPhone] = useState('(555) 500-1234');
  const [cardEmail, setCardEmail] = useState('john@elitehvac.com');
  const [recoverySettings, setRecoverySettings] = useState({
    autoApology: true,
    escalateToOwner: true,
    autoFollowUp: true,
    autoSolution: false,
  });
  const [alertSettings, setAlertSettings] = useState({
    urgentAlerts: true,
    negativeFeedback: true,
    staffAssignment: false,
  });

  useEffect(() => {
    // Close mobile menu when page changes
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  }, [activePage]);

  const showPage = (pageId: PageId) => {
    setActivePage(pageId);
  };

  const SidebarLink = ({ 
    id, 
    icon: Icon, 
    label, 
    iconColor 
  }: { 
    id: PageId; 
    icon: React.ElementType; 
    label: string; 
    iconColor: string;
  }) => {
    const isActive = activePage === id;
    return (
      <a
        href="#"
        id={`link-${id}`}
        onClick={(e) => {
          e.preventDefault();
          showPage(id);
        }}
        className={`sidebar-link flex items-center p-3 rounded-xl transition ${
          isActive
            ? 'bg-blue-100/50 text-blue-700 font-semibold border-l-4 border-blue-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon className={`text-lg mr-3 w-5 ${iconColor}`} />
        {label}
      </a>
    );
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
  }) => {
    return (
      <label className="toggle-switch-ui relative inline-block w-12 h-6 ml-4 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-transform before:duration-200 before:shadow-md ${
            checked ? 'bg-blue-600 before:translate-x-6' : 'bg-gray-200'
          }`}
        />
      </label>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fdfdfd] font-['Inter',sans-serif]">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 border-b border-gray-100">
        <h1 className="text-xl font-bold text-[#1f2937]">Neviane</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="text-xl" />
          ) : (
            <Menu className="text-xl" />
          )}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        id="sidebar"
        className={`${
          isMobileMenuOpen ? 'absolute' : 'hidden'
        } lg:block lg:w-64 bg-white border-r border-gray-200 p-6 shadow-xl lg:shadow-none sticky top-0 h-screen z-10 overflow-y-auto`}
      >
        <div className="mb-8 flex items-center space-x-2">
          <div className="text-3xl text-blue-600">⚡</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2937]">
            Neviane
          </h1>
        </div>

        <div className="space-y-2">
          <nav className="space-y-1">
            <SidebarLink
              id="dashboard"
              icon={Home}
              label="Dashboard"
              iconColor="text-blue-500"
            />
            <SidebarLink
              id="inbox"
              icon={Inbox}
              label="Feedback Inbox"
              iconColor="text-indigo-500"
            />
            <SidebarLink
              id="recovery-setup"
              icon={Bot}
              label="AI Review Recovery Setup"
              iconColor="text-teal-500"
            />
            <SidebarLink
              id="winback"
              icon={DollarSign}
              label="WinBack System"
              iconColor="text-green-500"
            />
            <SidebarLink
              id="qr-system"
              icon={QrCode}
              label="QR Feedback System"
              iconColor="text-purple-500"
            />
            <SidebarLink
              id="cards"
              icon={CreditCard}
              label="Digital Business Cards"
              iconColor="text-cyan-500"
            />
            <SidebarLink
              id="alerts"
              icon={Bell}
              label="Alerts & Notifications"
              iconColor="text-yellow-500"
            />
            <SidebarLink
              id="staff"
              icon={Users}
              label="Staff Accounts"
              iconColor="text-orange-500"
            />
          </nav>
          <div className="pt-4 border-t border-gray-200">
            <SidebarLink
              id="billing"
              icon={CreditCard}
              label="Billing & Subscription"
              iconColor="text-red-500"
            />
          </div>
        </div>

        <div className="mt-8 text-center border-t pt-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto text-white font-bold text-sm mb-2">
            TM
          </div>
          <p className="text-sm font-semibold text-[#1f2937]">Thomas Miller</p>
          <p className="text-xs text-gray-500">Admin | Elite HVAC</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-8">
        {/* Dashboard Page */}
        {activePage === 'dashboard' && (
          <div id="dashboard" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-2">
              Welcome Back, Thomas.
            </h2>
            <p className="text-gray-500 mb-8">
              Performance overview for Elite Plumbing & HVAC Services.
            </p>

            {/* 4 Main Platform Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <Bot className="text-3xl text-teal-600 mb-3" />
                <h3 className="text-xl font-bold text-[#1f2937] mb-1">
                  AI Review Recovery
                </h3>
                <p className="text-sm text-gray-500">
                  Prevented 14 critical 1-star reviews this month.
                </p>
                <button
                  className="text-sm mt-4 font-semibold text-teal-600 hover:text-teal-700 flex items-center"
                  onClick={() => showPage('recovery-setup')}
                >
                  Setup Automation <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <DollarSign className="text-3xl text-green-600 mb-3" />
                <h3 className="text-xl font-bold text-[#1f2937] mb-1">
                  AI WinBack System
                </h3>
                <p className="text-sm text-gray-500">
                  Successfully recovered 18 lost customers to date.
                </p>
                <button
                  className="text-sm mt-4 font-semibold text-green-600 hover:text-green-700 flex items-center"
                  onClick={() => showPage('winback')}
                >
                  Start Campaign <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <QrCode className="text-3xl text-purple-600 mb-3" />
                <h3 className="text-xl font-bold text-[#1f2937] mb-1">
                  QR Feedback System
                </h3>
                <p className="text-sm text-gray-500">
                  Generated 88 new public review requests in October.
                </p>
                <button
                  className="text-sm mt-4 font-semibold text-purple-600 hover:text-purple-700 flex items-center"
                  onClick={() => showPage('qr-system')}
                >
                  Generate QR <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <CreditCard className="text-3xl text-cyan-600 mb-3" />
                <h3 className="text-xl font-bold text-[#1f2937] mb-1">
                  Digital Business Cards
                </h3>
                <p className="text-sm text-gray-500">
                  Captured 46 new leads from eCard sharing last week.
                </p>
                <button
                  className="text-sm mt-4 font-semibold text-cyan-600 hover:text-cyan-700 flex items-center"
                  onClick={() => showPage('cards')}
                >
                  Manage Cards <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>

            {/* KPI Widgets Section */}
            <h3 className="text-2xl font-bold text-[#1f2937] mb-4">
              Live Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-5 border-t-4 border-red-500">
                <p className="text-sm font-medium text-gray-500">
                  Saved 1-Star Reviews
                </p>
                <p className="text-3xl font-extrabold text-[#1f2937] mt-1">14</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" /> +28% MoM
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 border-t-4 border-green-500">
                <p className="text-sm font-medium text-gray-500">
                  Recovered Customers
                </p>
                <p className="text-3xl font-extrabold text-[#1f2937] mt-1">18</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" /> +5% MoM
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 border-t-4 border-blue-500">
                <p className="text-sm font-medium text-gray-500">Tickets Solved</p>
                <p className="text-3xl font-extrabold text-[#1f2937] mt-1">62</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" /> +12% MoM
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 border-t-4 border-gray-500">
                <p className="text-sm font-medium text-gray-500">
                  Avg. Response Time
                </p>
                <p className="text-3xl font-extrabold text-[#1f2937] mt-1">3.1h</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" /> -0.4h MoM
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Inbox Page */}
        {activePage === 'inbox' && (
          <div id="inbox" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              Unified Feedback Inbox
            </h2>
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 mb-6 lg:mb-0">
                <h3 className="text-xl font-bold text-[#1f2937] mb-4">
                  Filters & Sources
                </h3>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center space-x-3 font-medium text-red-600">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded-lg text-red-600 focus:ring-red-500 w-5 h-5"
                    />
                    <span>Urgent (3)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded-lg text-blue-600 focus:ring-blue-500 w-5 h-5"
                    />
                    <span>Needs Follow-Up (5)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded-lg text-yellow-600 focus:ring-yellow-500 w-5 h-5"
                    />
                    <span>Angry / Frustrated (1)</span>
                  </label>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded-lg text-blue-600 focus:ring-blue-500 w-5 h-5"
                      />
                      <span>Google Reviews (8)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="rounded-lg text-blue-600 focus:ring-blue-500 w-5 h-5"
                      />
                      <span>Website Feedback (1)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                  <h3 className="text-xl font-bold text-[#1f2937]">
                    Conversation with Sarah L.{' '}
                    <span className="text-sm font-normal text-red-500 ml-2">
                      (1-Star, Urgent)
                    </span>
                  </h3>
                  <div className="text-sm text-gray-500">Source: Google Review</div>
                </div>

                <div className="space-y-4 h-96 overflow-y-auto p-2 bg-gray-50 rounded-xl">
                  <div className="flex justify-start">
                    <div className="max-w-xs md:max-w-md bg-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800">
                      The technician was 3 hours late and barely apologized.
                      Unacceptable service when I took the day off work! I'm leaving
                      a 1-star review.
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        Oct 25, 10:30 AM
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-400 italic flex items-center justify-center">
                    <Bot className="mr-1 h-3 w-3" /> AI Review Recovery Engaged.
                    Status: Awaiting Staff Approval.
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs md:max-w-md bg-blue-100 p-4 rounded-2xl rounded-br-none shadow-md border-l-4 border-blue-600 text-sm text-gray-800">
                      <p className="font-bold text-blue-800 mb-1">
                        AI Draft Response:
                      </p>
                      Dear Sarah, we deeply apologize for the extreme delay and the
                      lack of courtesy shown by our technician. We have escalated this
                      to management and will contact you immediately to schedule a
                      priority repair and offer a full discount.
                      <p className="text-xs text-blue-600 mt-2 text-right">
                        Neviane AI
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center shadow-md transition">
                    <CheckCircle className="mr-2 h-5 w-5" /> Approve AI Draft & Send
                    Message
                  </button>
                  <div className="flex gap-3">
                    <button className="bg-red-500 w-full text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-600 transition">
                      <Ban className="mr-2 h-5 w-5 inline" /> Decline & Draft Manually
                    </button>
                    <button className="bg-gray-200 w-full text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition">
                      <Check className="mr-2 h-5 w-5 inline" /> Resolve Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Review Recovery Setup Page */}
        {activePage === 'recovery-setup' && (
          <div id="recovery-setup" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              AI Review Recovery System Setup
            </h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                Automation Toggles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#1f2937]">Auto-Apology</p>
                    <p className="text-sm text-gray-500">
                      AI automatically drafts and sends the initial apology message.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={recoverySettings.autoApology}
                    onChange={(checked) =>
                      setRecoverySettings({ ...recoverySettings, autoApology: checked })
                    }
                  />
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#1f2937]">Escalate to Owner</p>
                    <p className="text-sm text-gray-500">
                      If staff hasn't responded to a ticket in 48 hours, send an urgent
                      owner alert.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={recoverySettings.escalateToOwner}
                    onChange={(checked) =>
                      setRecoverySettings({
                        ...recoverySettings,
                        escalateToOwner: checked,
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#1f2937]">
                      Auto-Follow-Up (7 Days)
                    </p>
                    <p className="text-sm text-gray-500">
                      Check back with the customer 7 days after issue is marked
                      resolved.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={recoverySettings.autoFollowUp}
                    onChange={(checked) =>
                      setRecoverySettings({
                        ...recoverySettings,
                        autoFollowUp: checked,
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#1f2937]">Auto-Solution</p>
                    <p className="text-sm text-gray-500">
                      AI suggests a discount or replacement based on context (Needs
                      Approval).
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={recoverySettings.autoSolution}
                    onChange={(checked) =>
                      setRecoverySettings({
                        ...recoverySettings,
                        autoSolution: checked,
                      })
                    }
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1f2937] mt-10 mb-6 border-b pb-3">
                System Identity & Tone
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Response Tone
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500">
                    <option>Empathetic & Professional (Default)</option>
                    <option>Casual & Friendly</option>
                    <option>Formal & Concise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email for Outbound
                  </label>
                  <input
                    type="email"
                    defaultValue="support@elitehvac.com"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1f2937] mt-10 mb-6 border-b pb-3">
                Templates
              </h3>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
                onClick={() => setIsTemplateModalOpen(true)}
              >
                <PenSquare className="mr-2 h-5 w-5 inline" /> Manage AI Templates
              </button>
            </div>
          </div>
        )}

        {/* WinBack Page */}
        {activePage === 'winback' && (
          <div id="winback" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              AI WinBack Campaign Manager
            </h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                Customer Segments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="p-4 rounded-xl border-t-4 border-red-500 bg-red-50">
                  <p className="text-3xl font-extrabold text-red-700">87</p>
                  <p className="text-sm font-medium text-red-600">Lost Customers</p>
                </div>
                <div className="p-4 rounded-xl border-t-4 border-orange-500 bg-orange-50">
                  <p className="text-3xl font-extrabold text-orange-700">121</p>
                  <p className="text-sm font-medium text-orange-600">
                    Inactive 60 Days
                  </p>
                </div>
                <div className="p-4 rounded-xl border-t-4 border-yellow-500 bg-yellow-50">
                  <p className="text-3xl font-extrabold text-yellow-700">188</p>
                  <p className="text-sm font-medium text-yellow-600">
                    Inactive 30 Days
                  </p>
                </div>
                <div className="p-4 rounded-xl border-t-4 border-green-500 bg-green-50">
                  <p className="text-3xl font-extrabold text-green-700">34</p>
                  <p className="text-sm font-medium text-green-600">VIP Customers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#1f2937] mb-4">
                    New Campaign Configuration
                  </h3>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Segment
                  </label>
                  <select
                    value={winbackSegment}
                    onChange={(e) => setWinbackSegment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 mb-4"
                  >
                    <option value="lost">Lost Customers (87)</option>
                    <option value="inactive60">Inactive 60 Days (121)</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AI-Generated Incentive Suggestion
                  </label>
                  <div className="p-3 bg-gray-100 rounded-xl border border-gray-300 text-sm text-gray-700 mb-4 flex justify-between items-center">
                    <span className="font-medium text-green-600 flex items-center">
                      <Settings className="mr-2 h-4 w-4" /> Suggested: 20% Off Next
                      Service
                    </span>
                    <button className="text-xs bg-blue-600 text-white font-semibold p-1 px-3 rounded-lg hover:bg-blue-700 transition">
                      Apply
                    </button>
                  </div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WinBack Message Content
                  </label>
                  <textarea
                    rows={4}
                    value={winbackMessage}
                    onChange={(e) => setWinbackMessage(e.target.value)}
                    placeholder="Personalized message using customer data..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="mt-6 flex flex-col gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition">
                      <Calendar className="mr-2 h-5 w-5 inline" /> Schedule WinBack
                      Campaign
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-inner">
                  <h3 className="text-2xl font-bold text-[#1f2937] mb-4">
                    Message Preview
                  </h3>
                  <div className="border border-blue-400 p-4 rounded-xl bg-blue-50 text-sm">
                    <p className="font-bold text-blue-800 mb-2">
                      To: [Customer Name] (SMS)
                    </p>
                    <p className="text-gray-700">
                      Hi [Customer Name], it's been a while since your last service
                      with Elite Plumbing. We value your business! We'd love to welcome
                      you back with a special 20% discount on your next repair. Click
                      here: [Trackable Link]
                    </p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition">
                      <Smartphone className="mr-2 h-5 w-5 inline" /> Send SMS
                    </button>
                    <button className="w-full bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-600 transition">
                      <Mail className="mr-2 h-5 w-5 inline" /> Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Feedback System Page */}
        {activePage === 'qr-system' && (
          <div id="qr-system" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              QR Feedback Funnel Generator
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                  Customization & Paths
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Logo
                    </label>
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <ImageIcon className="text-gray-500 h-6 w-6" />
                    </div>
                    <button className="text-sm text-blue-600 font-semibold hover:underline">
                      Upload Logo
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landing Page Color
                    </label>
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-full h-10 p-1 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-[#1f2937] mt-8 mb-4">
                  Review Questions
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Customize the questions customers see before they are routed.
                </p>

                <h4 className="text-xl font-bold text-[#1f2937] mt-8 mb-4 border-t pt-4">
                  Destinations (Two Paths)
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="font-semibold text-green-700">
                      Path 1: Positive Feedback (4/5 Stars) → Public
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Customers are immediately linked to your: **Google Review Link**
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="font-semibold text-red-700">
                      Path 2: Negative Feedback (1-3 Stars) → Private
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Customers are redirected to the **Private Feedback Form**.
                    </p>
                    <p className="text-xs font-medium text-red-600 mt-2 flex items-center">
                      <Lock className="mr-1 h-3 w-3" /> Prevents negative reviews from
                      hitting public sites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Live Preview</h3>
                <div className="w-full max-w-sm aspect-square bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
                  <div className="w-40 h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-bold text-3xl mb-4">
                    <QrCode className="h-20 w-20" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Scan for Feedback
                  </p>
                  <p className="text-xs text-gray-500">Elite Plumbing & HVAC</p>
                </div>
                <div className="mt-6 w-full">
                  <button className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold py-3 px-6 rounded-xl mb-3 shadow-md transition">
                    <Download className="mr-2 h-5 w-5 inline" /> Download QR Code (PNG)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Digital Business Cards Page */}
        {activePage === 'cards' && (
          <div id="cards" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              Digital Business Cards Management
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Card Preview</h3>
                <div className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold mx-auto mb-3">
                    JD
                  </div>
                  <h4 className="text-xl font-bold text-[#1f2937]">John Davis</h4>
                  <p className="text-sm text-gray-500 mb-4">Senior Plumber</p>
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex items-center justify-center">
                      <Phone className="w-5 text-blue-500 mr-2" />{' '}
                      <span>(555) 500-1234</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition text-sm">
                      <QrCode className="mr-2 h-4 w-4 inline" /> Share via QR
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                  Tracking Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-gray-200 text-center">
                    <p className="text-3xl font-extrabold text-blue-700">189</p>
                    <p className="text-sm text-gray-500">Card Clicks</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 text-center">
                    <p className="text-3xl font-extrabold text-cyan-700">46</p>
                    <p className="text-sm text-gray-500">Leads Saved</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 text-center">
                    <p className="text-3xl font-extrabold text-green-700">11</p>
                    <p className="text-sm text-gray-500">QR Shares</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                  Card Settings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Add Phone
                    </label>
                    <input
                      type="tel"
                      value={cardPhone}
                      onChange={(e) => setCardPhone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Add Email
                    </label>
                    <input
                      type="email"
                      value={cardEmail}
                      onChange={(e) => setCardEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition">
                      <Save className="mr-2 h-5 w-5 inline" /> Save Card Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts & Notifications Page */}
        {activePage === 'alerts' && (
          <div id="alerts" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              Alerts & Notification Preferences
            </h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                Notification Toggles
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-semibold text-[#1f2937] flex items-center">
                      <AlertTriangle className="text-red-500 mr-2 h-5 w-5" /> Urgent Issue
                      Alerts
                    </p>
                    <p className="text-sm text-gray-500">
                      1-Star Private Feedback requiring owner action.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={alertSettings.urgentAlerts}
                    onChange={(checked) =>
                      setAlertSettings({ ...alertSettings, urgentAlerts: checked })
                    }
                  />
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-semibold text-[#1f2937] flex items-center">
                      <Bell className="text-yellow-500 mr-2 h-5 w-5" /> New Negative
                      Feedback (Public)
                    </p>
                    <p className="text-sm text-gray-500">
                      For 3-star reviews or lower on Google/Yelp.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={alertSettings.negativeFeedback}
                    onChange={(checked) =>
                      setAlertSettings({
                        ...alertSettings,
                        negativeFeedback: checked,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-semibold text-[#1f2937] flex items-center">
                      <Users className="text-orange-500 mr-2 h-5 w-5" /> Staff Assignment
                      Alerts
                    </p>
                    <p className="text-sm text-gray-500">
                      When a conversation is assigned to a staff member.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={alertSettings.staffAssignment}
                    onChange={(checked) =>
                      setAlertSettings({
                        ...alertSettings,
                        staffAssignment: checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-gray-200">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition">
                  <Save className="mr-2 h-5 w-5 inline" /> Save Notification Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Staff Accounts Page */}
        {activePage === 'staff' && (
          <div id="staff" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              Staff Accounts & Permissions
            </h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#1f2937]">Active Staff (3)</h3>
                <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-600 transition">
                  <User className="mr-2 h-5 w-5 inline" /> Add New Staff
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-[#1f2937]">Thomas Miller</p>
                        <p className="text-xs text-gray-500">thomas@elitehvac.com</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        Owner / Admin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">N/A</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4 inline" />
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-[#1f2937]">John Davis</p>
                        <p className="text-xs text-gray-500">john@elitehvac.com</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        Support Agent
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        28 Solved, Avg. 1.2h response
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4 inline" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-[#1f2937] mt-10 mb-6 border-b pb-3">
                Activity Log
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="p-3 bg-gray-50 rounded-xl flex items-center">
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5" /> John Davis
                  marked Ticket #9045 as resolved.
                </li>
                <li className="p-3 bg-gray-50 rounded-xl flex items-center">
                  <UserCog className="text-blue-500 mr-3 h-5 w-5" /> Thomas Miller
                  updated John Davis's permissions.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Billing & Subscription Page */}
        {activePage === 'billing' && (
          <div id="billing" className="app-page">
            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
              Billing & Subscription
            </h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#1f2937] mb-6 border-b pb-3">
                Current Plan & Usage
              </h3>

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl mb-8">
                <p className="text-lg font-bold text-blue-800">
                  Enterprise Pro - <span className="text-2xl font-extrabold">$299.00/Month</span>
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Unlimited AI Recovery, 1,000 WinBack SMS/Email credits.
                </p>
                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">
                  Change Plan
                </button>
              </div>

              <h4 className="text-xl font-bold text-[#1f2937] mb-4">Usage Breakdown</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Twilio (SMS) Usage</p>
                  <p className="text-3xl font-extrabold text-[#1f2937] mt-1">
                    42 / 500 Credits
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{ width: '8%' }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">
                    AI Tokens Used (Review Recovery)
                  </p>
                  <p className="text-3xl font-extrabold text-[#1f2937] mt-1">12% of Quota</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: '12%' }}
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1f2937] mt-10 mb-6 border-b pb-3">
                Monthly Cost Breakdown
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between border-b pb-1">
                  <span>Subscription Fee</span>
                  <span className="font-semibold">$299.00</span>
                </li>
                <li className="flex justify-between border-b pb-1">
                  <span>Twilio Overages</span>
                  <span className="font-semibold">$0.00</span>
                </li>
                <li className="flex justify-between border-b pb-1">
                  <span>Staff Licenses (3)</span>
                  <span className="font-semibold">$0.00</span>
                </li>
                <li className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total Due</span>
                  <span className="text-blue-600">$299.00</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Template Modal */}
      {isTemplateModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4"
          onClick={() => setIsTemplateModalOpen(false)}
        >
          <div
            className="bg-white border border-gray-200 rounded-3xl w-full max-w-lg p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-[#1f2937] mb-4">
              Manage AI Templates
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Edit the base templates used by the AI before it drafts a personalized
              response.
            </p>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Negative Feedback Message Template
            </label>
            <textarea
              rows={6}
              defaultValue="Dear [CUSTOMER_NAME], we deeply apologize for the negative experience you reported. We have already escalated this to our team and will contact you within 2 hours to resolve the issue personally. Thank you for giving us a chance to make it right. - [BUSINESS_NAME] Team."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm mb-4"
            />

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition">
                <Save className="mr-2 h-4 w-4 inline" /> Save All Templates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

