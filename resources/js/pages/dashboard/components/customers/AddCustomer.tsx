import React, { useState, useMemo } from 'react';
import {
  Home,
  Settings,
  CheckCircle,
  Upload,
  Plug,
  ArrowLeft,
  Key,
  TrendingUp,
  Send,
  X,
  Clock,
  Filter,
  List,
  QrCode,
} from 'lucide-react';

// Icon Component using Lucide Icons
const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const iconMap: Record<string, React.ElementType> = {
    dashboard: Home,
    automation: Settings,
    save: CheckCircle,
    upload: Upload,
    complete: CheckCircle,
    plug: Plug,
    back: ArrowLeft,
    key: Key,
    rate: TrendingUp,
    send: Send,
    check: CheckCircle,
    cross: X,
    clock: Clock,
    filter: Filter,
    list: List,
  };

  const IconComponent = iconMap[name] || Home;
  return <IconComponent className={className} />;
};

// Helper Functions
const formatAmericanDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  try {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString;
  }
};

const isWithinDateRange = (serviceDate: string, days: number) => {
  if (!serviceDate || days === Infinity) return true;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const service = new Date(serviceDate);
  return service.getTime() >= cutoff.getTime();
};

// Generic form placeholder
const FormPlaceholder = ({ title, fields }: { title: string; fields: any[] }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{title}</h3>
    <form className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            disabled={true}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border bg-gray-50 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
        </div>
      ))}
    </form>
  </div>
);

// API Credentials Page
const APICredentialsPage = ({ navigate }: { navigate: (page: string) => void }) => (
  <div className="space-y-8">
    <button 
      onClick={() => navigate('Automation')}
      className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition"
    >
      <Icon name="back" className="w-4 h-4 mr-2" /> Back to Setup
    </button>
    
    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
      <Icon name="key" className="w-8 h-8 mr-3 text-indigo-600" /> API Credentials
    </h1>
    <p className="text-gray-600">
      Use these keys to integrate your external POS or CRM system for automatic rating request triggers.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormPlaceholder
        title="Integration Keys (Read-Only Placeholder)"
        fields={[
          { name: 'api_key', label: 'API Key (Secret)', type: 'text', placeholder: '********************************' },
          { name: 'webhook_url', label: 'Webhook Endpoint URL', type: 'text', placeholder: 'https://api.platform.com/hooks/...' },
        ]}
      />
      
      <div className="bg-yellow-50 p-6 rounded-xl shadow-md border border-yellow-200 space-y-3 self-start">
        <h3 className="text-lg font-bold text-yellow-800">Security Warning</h3>
        <p className="text-sm text-yellow-700">
          Treat your API key like a password. Do not share it publicly or commit it to client-side code repositories.
        </p>
        <button className="py-2 px-4 text-sm rounded-lg text-white bg-red-600 hover:bg-red-700 transition">
          Regenerate API Key
        </button>
      </div>
    </div>
  </div>
);

// Customer Selection Page
const CustomerSelectionPage = ({ 
  navigate, 
  setLastActionMessage, 
  customers, 
  setCustomers 
}: {
  navigate: (page: string) => void;
  setLastActionMessage: (msg: string | null) => void;
  customers: any[];
  setCustomers: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [dateFilterDays, setDateFilterDays] = useState(90);
  
  const filteredCustomers = useMemo(() => {
    const days = dateFilterDays === 0 ? Infinity : dateFilterDays;
    return customers.filter(c => isWithinDateRange(c.serviceDate, days));
  }, [customers, dateFilterDays]);
  
  const selectableCustomers = useMemo(() => {
    return filteredCustomers.filter(c => !c.hasReviewed);
  }, [filteredCustomers]);
  
  const selectedCount = customers.filter(c => c.selected).length;
  
  const summaryCounts = useMemo(() => {
    let newCount = 0;
    let pendingCount = 0;
    let reviewedCount = 0;
    
    filteredCustomers.forEach(c => {
      if (c.hasReviewed) {
        reviewedCount++;
      } else if (c.linkSent) {
        pendingCount++;
      } else {
        newCount++;
      }
    });
    
    return {
      total: filteredCustomers.length,
      newCount,
      pendingCount,
      reviewedCount,
      eligibleToSend: newCount + pendingCount,
    };
  }, [filteredCustomers]);

  const toggleCustomer = (id: number) => {
    const customer = customers.find(c => c.id === id);
    const isFilteredOut = !filteredCustomers.some(c => c.id === id);
    
    if (customer?.hasReviewed || isFilteredOut) {
      return;
    }
    
    const updatedCustomers = customers.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    setCustomers(updatedCustomers);
    
    const allSelectableAreSelected = selectableCustomers.length > 0 && 
      selectableCustomers.every(c => updatedCustomers.find(u => u.id === c.id)?.selected);
    
    setAllSelected(allSelectableAreSelected);
  };

  const toggleSelectAll = () => {
    const newState = !allSelected;
    setAllSelected(newState);
    const eligibleIds = new Set(selectableCustomers.map(c => c.id));
    setCustomers(customers.map(c => ({ 
      ...c, 
      selected: eligibleIds.has(c.id) ? newState : c.selected 
    })));
  };
  
  const handleSendRatings = () => {
    if (selectedCount > 0) {
      const updatedCustomers = customers.map(c => {
        if (c.selected && !c.hasReviewed) {
          return { ...c, selected: false, linkSent: true };
        }
        return c;
      });
      setCustomers(updatedCustomers);
      setAllSelected(false);
      setLastActionMessage(`Successfully initiated rating requests for ${selectedCount} customer(s). Their status is now 'Pending'.`);
    } else {
      console.error('Action failed: Please select at least one customer to send ratings.');
    }
  };
  
  const getReviewStatus = (customer: any) => {
    if (customer.hasReviewed) {
      return { text: 'Reviewed', color: 'text-green-600', bg: 'bg-green-100', icon: 'check' };
    }
    if (customer.linkSent) {
      return { text: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: 'clock' };
    }
    return { text: 'New', color: 'text-blue-600', bg: 'bg-blue-100', icon: 'clock' };
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => navigate('Automation')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition"
      >
        <Icon name="back" className="w-4 h-4 mr-2" /> Back to Setup
      </button>

      <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
        <Icon name="list" className="w-8 h-8 mr-3 text-indigo-600" /> Pending Feedback Activity
      </h1>
      <p className="text-gray-600">
        Monitor the status of all customers who have received a feedback request. You may select and resend requests to those who haven't yet reviewed.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4 border-b pb-4">
          <div className="flex items-center space-x-3">
            <Icon name="filter" className="text-gray-600 w-5 h-5" />
            <label htmlFor="date-filter" className="font-semibold text-gray-700 text-sm">Service Date Filter:</label>
            <select
              id="date-filter"
              value={dateFilterDays}
              onChange={(e) => {
                setDateFilterDays(parseInt(e.target.value, 10));
                setAllSelected(false);
              }}
              className="p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={90}>Last 90 Days</option>
              <option value={180}>Last 180 Days</option>
              <option value={365}>Last 365 Days</option>
              <option value={0}>All Time</option>
            </select>
          </div>
          
          <button 
            onClick={toggleSelectAll}
            disabled={selectableCustomers.length === 0}
            className={`py-2 px-4 rounded-lg text-sm font-bold transition ${
              allSelected 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            {allSelected ? 'Deselect All' : 'Select All Eligible to Resend'} ({selectableCustomers.length})
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-lg bg-indigo-100">
            <p className="text-xs font-medium text-indigo-700 uppercase">Total in Filter</p>
            <p className="text-2xl font-bold text-indigo-800">{summaryCounts.total}</p>
          </div>
          <div className="p-4 rounded-lg bg-green-100">
            <p className="text-xs font-medium text-green-700 uppercase">Reviewed</p>
            <p className="text-2xl font-bold text-green-800">{summaryCounts.reviewedCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-red-100">
            <p className="text-xs font-medium text-red-700 uppercase">New/Unsent</p>
            <p className="text-2xl font-bold text-red-800">{summaryCounts.newCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-100">
            <p className="text-xs font-medium text-yellow-700 uppercase">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-800">{summaryCounts.pendingCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Filtered Customer List ({filteredCustomers.length} Visible)
        </h2>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No customers found matching the criteria (Last {dateFilterDays === 0 ? 'All Time' : `${dateFilterDays} Days`}).
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link Sent?</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map(customer => {
                const status = getReviewStatus(customer);
                const isSelectable = !customer.hasReviewed;
                return (
                  <tr 
                    key={customer.id} 
                    className={`${customer.hasReviewed ? 'bg-green-50 text-gray-500' : 'hover:bg-gray-50'} ${!isSelectable ? 'opacity-70' : ''}`}
                  >
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={customer.selected}
                        onChange={() => toggleCustomer(customer.id)}
                        disabled={!isSelectable}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <Icon name="clock" className="w-4 h-4 mr-1" /> {formatAmericanDate(customer.serviceDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.linkSent
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.linkSent ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`flex items-center px-2 py-1 text-xs leading-5 font-semibold rounded-full ${status.color} ${status.bg}`}>
                        <Icon name={status.icon} className="w-4 h-4 mr-1" />
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <button
        onClick={handleSendRatings}
        disabled={selectedCount === 0}
        className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold transition duration-150 ${
          selectedCount > 0 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-gray-400 text-gray-100 cursor-not-allowed'
        }`}
      >
        <Icon name="send" className="w-6 h-6 mr-3" /> 
        Resend Feedback Request to {selectedCount} Selected Customer(s)
      </button>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ title, description, children, color, icon }: {
  title: string;
  description: string;
  children: React.ReactNode;
  color: string;
  icon: string;
}) => {
  const colorClasses: Record<string, { border: string; textClass: string }> = {
    teal: { border: '#14b8a6', textClass: 'text-teal-500' },
    orange: { border: '#f97316', textClass: 'text-orange-500' },
    indigo: { border: '#6366f1', textClass: 'text-indigo-500' },
    purple: { border: '#a855f7', textClass: 'text-purple-500' },
    pink: { border: '#ec4899', textClass: 'text-pink-500' },
  };
  const colors = colorClasses[color] || { border: '#6b7280', textClass: 'text-gray-500' };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 space-y-4" style={{ borderLeftColor: colors.border }}>
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <span className={`w-6 h-6 mr-3 ${colors.textClass}`}>
          <Icon name={icon} className="w-6 h-6" />
        </span>
        {title}
      </h2>
      <p className="text-gray-600 border-b pb-4 mb-4">{description}</p>
      {children}
    </div>
  );
};

// Automation Page
const AutomationPage = ({ 
  navigate, 
  lastActionMessage, 
  setLastActionMessage, 
  setCustomers 
}: {
  navigate: (page: string) => void;
  lastActionMessage: string | null;
  setLastActionMessage: (msg: string | null) => void;
  setCustomers: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [integrationStatus] = useState('Connected');
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');

  const handleManualSend = () => {
    if (!formName || !formEmail || !formPhone) {
      setLastActionMessage('Action failed: Please fill out all required fields before sending.');
      return;
    }
    
    const newCustomer = {
      id: Date.now(),
      name: formName,
      email: formEmail,
      phone: formPhone,
      selected: false,
      serviceDate: new Date().toISOString().split('T')[0],
      linkSent: true,
      hasReviewed: false,
    };
    
    setCustomers((prev: any[]) => {
      const updated = [...prev, newCustomer];
      return updated;
    });
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setLastActionMessage(`Service marked complete! A new entry for ${formName} was created, and an automated SMS/Email feedback request has been successfully sent.`);
  };

  React.useEffect(() => {
    if (lastActionMessage) {
      const timer = setTimeout(() => {
        setLastActionMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastActionMessage, setLastActionMessage]);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-gray-900">Customer Feedback Engine</h1>
      <p className="text-xl text-gray-600 font-medium">Add customers and automatically send feedback requests when service is completed.</p>

      {lastActionMessage && (
        <div className={`p-4 border rounded-lg font-medium transition duration-300 ${
          lastActionMessage.includes('failed') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'
        }`}>
          {lastActionMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <ActionCard 
          title="Automatic Send (POS / Booking Integration)" 
          description="Customers are added automatically when a service is marked complete." 
          color="teal" 
          icon="plug"
        >
          <div className="flex items-center space-x-4 pt-2">
            <span className={`px-4 py-1 text-sm font-semibold rounded-full ${
              integrationStatus === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              Status: {integrationStatus}
            </span>
            <button 
              onClick={() => navigate('APICredentials')} 
              className="py-2 px-4 text-sm rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition flex items-center font-medium shadow-md"
            >
              <Icon name="key" className="w-4 h-4 mr-2" /> View API Credentials
            </button>
          </div>
        </ActionCard>

        <ActionCard 
          title="Add Customers in Bulk (CSV Upload)" 
          description="Upload past or offline customers and send feedback requests automatically." 
          color="orange" 
          icon="upload"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" id="csv-upload" className="hidden" accept=".csv" />
            <label htmlFor="csv-upload" className="cursor-pointer py-3 px-6 rounded-lg text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 transition inline-flex items-center shadow-lg">
              <Icon name="upload" className="w-5 h-5 mr-2" /> Upload & Send
            </label>
            <p className="text-sm text-gray-500 mt-3">Required columns: Name, Email, Phone</p>
          </div>
        </ActionCard>

        <ActionCard 
          title="Add Customer & Send Now" 
          description="Add a customer manually and send a feedback request instantly." 
          color="indigo" 
          icon="send"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name (Required)</label>
              <input
                type="text"
                id="customer_name"
                placeholder="Enter full name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
            <div>
              <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700">Email Address (Required)</label>
              <input
                type="email"
                id="customer_email"
                placeholder="john@example.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
            <div>
              <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700">Phone Number (Required)</label>
              <input
                type="tel"
                id="customer_phone"
                placeholder="555-123-4567"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
          </div>
          <button
            onClick={handleManualSend}
            className="mt-4 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            <Icon name="complete" className="w-5 h-5 mr-3" /> Mark Service Completed & Send Feedback
          </button>
        </ActionCard>

        <ActionCard 
          title="Review Pending & Past Activity" 
          description="View the current status (New, Pending, Reviewed) of all customers who have received a request." 
          color="pink" 
          icon="list"
        >
          <button
            onClick={() => navigate('CustomerSelection')}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-pink-600 bg-pink-100 hover:bg-pink-200 transition duration-150"
          >
            <Icon name="list" className="w-5 h-5 mr-3" /> Go to Activity Management
          </button>
        </ActionCard>

        <ActionCard 
          title="In-Store QR Feedback" 
          description="Let customers scan and leave feedback without staff entry." 
          color="purple" 
          icon="rate"
        >
          <button
            onClick={() => setIsQrCodeVisible(true)}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-purple-600 bg-purple-100 hover:bg-purple-200 transition duration-150"
          >
            <Icon name="rate" className="w-5 h-5 mr-3" /> Show Live Feedback QR Code
          </button>
        </ActionCard>
      </div>
      
      {isQrCodeVisible && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsQrCodeVisible(false)}
        >
          <div 
            className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full space-y-6 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-extrabold text-gray-900 border-b pb-2 text-center flex items-center justify-center">
              <Icon name="rate" className="w-6 h-6 mr-2 text-indigo-600" /> Live Feedback Form Scan
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Have the customer scan this code now to access the short feedback form directly.
            </p>
            
            <div className="flex justify-center py-4 bg-gray-50 rounded-lg">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/service-form/widget"
                alt="Scannable QR Code for Customer Feedback Form"
                className="w-64 h-64 border-4 border-gray-200 rounded-lg"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/250x250/cccccc/333333?text=QR+Code+Unavailable";
                }}
              />
            </div>
            
            <p className="text-center text-xs text-gray-500">Links to: https://example.com/service-form/widget</p>
            <button
              onClick={() => setIsQrCodeVisible(false)}
              className="w-full py-3 px-4 text-lg font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 transition shadow-lg"
            >
              Close Scanner View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
export const AddCustomer: React.FC = () => {
  const initialCustomers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '555-0001', selected: false, serviceDate: '2025-12-10', linkSent: true, hasReviewed: true },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0002', selected: false, serviceDate: '2025-12-12', linkSent: false, hasReviewed: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0003', selected: false, serviceDate: '2025-11-25', linkSent: true, hasReviewed: false },
    { id: 4, name: 'Dana Scully', email: 'dana@example.com', phone: '555-0004', selected: false, serviceDate: '2025-12-11', linkSent: false, hasReviewed: false },
    { id: 5, name: 'Fox Mulder', email: 'fox@example.com', phone: '555-0005', selected: false, serviceDate: '2025-08-01', linkSent: true, hasReviewed: true },
    { id: 6, name: 'Gillian Jacobs', email: 'gillian@example.com', phone: '555-0006', selected: false, serviceDate: '2025-12-13', linkSent: false, hasReviewed: false },
    { id: 7, name: 'Jess Day', email: 'jess@example.com', phone: '555-0007', selected: false, serviceDate: '2025-09-01', linkSent: true, hasReviewed: false },
  ];
  
  const [currentPage, setCurrentPage] = useState('Automation');
  const [customers, setCustomers] = useState(initialCustomers);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setLastActionMessage(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Automation':
        return (
          <AutomationPage 
            navigate={navigate} 
            lastActionMessage={lastActionMessage} 
            setLastActionMessage={setLastActionMessage} 
            setCustomers={setCustomers} 
          />
        );
      case 'APICredentials':
        return <APICredentialsPage navigate={navigate} />;
      case 'CustomerSelection':
        return (
          <CustomerSelectionPage 
            navigate={navigate} 
            setLastActionMessage={setLastActionMessage} 
            customers={customers} 
            setCustomers={setCustomers} 
          />
        );
      default:
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <button
              onClick={() => navigate('Automation')}
              className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Setup
            </button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {renderPage()}
    </div>
  );
};
