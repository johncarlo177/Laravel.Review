import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { RecoveryStatsWidget } from './RecoveryStatsWidget';
import { RecoveryInboxFilters } from './RecoveryInboxFilters';
import { RecoveryTicketRow } from './RecoveryTicketRow';
import { RecoveryEmptyState } from './RecoveryEmptyState';
import { RecoveryActionPanel } from './RecoveryActionPanel';
import { RecoveryCustomerPanel } from './RecoveryCustomerPanel';
import { RecoveryAiComposer } from './RecoveryAiComposer';
import { RecoveryTimelineMessage } from './RecoveryTimelineMessage';
import { RecoveryFollowUpModal } from './RecoveryFollowUpModal';
import { RecoveryModal } from './RecoveryModal';
import { AutomationSettingsView } from './AutomationSettingsView';
import { MOCK_RECOVERY_CASES, MOCK_RECOVERY_STATS, MOCK_RECOVERY_CUSTOMER_DATA } from '../../data/mockData';

// Initial automation settings
const initialAutomationSettings = {
  enabled: {
    autoRecovery: true,
    autoWinBack: true,
    autoReferral: true,
  },
  messages: {
    autoRecovery: "Hi [Customer Name], my name is [Manager Name], and I personally apologize for your experience. We are issuing a full refund and would like to invite you back with a [Incentive] to show you our true quality. We will call you within 24 hours to discuss this further.",
    autoWinBack: "Hello [Customer Name], I hope everything has been resolved to your satisfaction. As a gesture of goodwill, please accept a [Incentive] for your next visit. We truly value your business and hope to see you soon! - [Manager Name]",
    autoReferral: "Hi [Customer Name], thank you so much for the 5-star feedback! We're thrilled you had a great time. Would you consider passing along a special offer to a friend? It would mean a lot to our team! Best, [Staff Name]",
  },
  schedule: {
    winBack: '72h',
    referral: '7d',
  }
};

export const AIRecoveryCenter: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const [allCases, setAllCases] = useState(MOCK_RECOVERY_CASES);
  const [automationSettings, setAutomationSettings] = useState(initialAutomationSettings);

  const setRoute = (route: string | null) => {
    setCurrentRoute(route);
  };

  const updateCase = (updatedFields: any) => {
    setAllCases(prevCases => 
      prevCases.map(c => c.id === updatedFields.id ? { ...c, ...updatedFields } : c)
    );
  };

  const updateAutomationSettingsHandler = (newSettings: any) => {
    setAutomationSettings(newSettings);
    console.log('Automation settings updated:', newSettings);
  };

  if (currentRoute === 'automationSettings') {
    return (
      <AutomationSettingsView
        setRoute={setRoute}
        automationSettings={automationSettings}
        updateAutomationSettings={updateAutomationSettingsHandler}
      />
    );
  }

  if (currentRoute) {
    return (
      <RecoveryConversationView
        recoveryCaseId={currentRoute}
        setRoute={setRoute}
        updateCase={updateCase}
        automationSettings={automationSettings}
      />
    );
  }

  return (
    <RecoveryInboxView
      cases={allCases}
      stats={MOCK_RECOVERY_STATS}
      setRoute={setRoute}
      automationSettings={automationSettings}
    />
  );
};

const RecoveryInboxView = ({
  cases,
  stats,
  setRoute,
  automationSettings,
}: {
  cases: typeof MOCK_RECOVERY_CASES;
  stats: typeof MOCK_RECOVERY_STATS;
  setRoute: (route: string | null) => void;
  automationSettings: typeof initialAutomationSettings;
}) => {
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const filteredCases = cases.filter(recoveryCase => {
    if (!recoveryCase) return false;
    const matchesSearch = recoveryCase.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recoveryCase.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filters.status && recoveryCase.status !== filters.status) return false;
    const ratingFilter = filters.rating ? parseInt(filters.rating, 10) : null;
    if (ratingFilter && recoveryCase.rating !== ratingFilter) return false;
    if (filters.channel && recoveryCase.channel !== filters.channel) return false;
    return true;
  });

  const handleMassAction = (type: string) => {
    let count = 0;
    let message = '';

    if (type === 'winBack') {
      count = cases.filter(t => t.status === 'Resolved' && t.rating >= 1 && t.rating <= 4).length;
      const schedule = automationSettings.schedule.winBack;
      message = `Win Back Campaign (1-4★) initiated for ${count} resolved customers, scheduled for ${schedule}!`;
    } else if (type === 'referral') {
      count = cases.filter(t => t.rating === 5).length;
      const schedule = automationSettings.schedule.referral;
      message = `Personal Referral Campaign (5★) initiated for ${count} customers, scheduled for ${schedule}!`;
    }

    if (count > 0) {
      setShowConfirmation(message);
      setTimeout(() => setShowConfirmation(null), 4000);
    } else {
      console.error(`Cannot initiate ${type} campaign: No matching customers found.`);
      setShowConfirmation('No matching customers found for this campaign.');
      setTimeout(() => setShowConfirmation(null), 3000);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">AI Recovery Case Inbox</h1>
      
      <RecoveryStatsWidget stats={stats} />
      
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <RecoveryInboxFilters
          currentFilters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onMassAction={handleMassAction}
          automationSettings={automationSettings}
          setRoute={setRoute}
        />

        <div className="divide-y divide-gray-100">
          {filteredCases.length > 0 ? (
            filteredCases.map((recoveryCase) => (
              <RecoveryTicketRow key={recoveryCase.id} recoveryCase={recoveryCase} onOpen={setRoute} />
            ))
          ) : (
            <RecoveryEmptyState
              title="No Recovery Cases Found"
              message="Try clearing your filters or changing your search term."
            />
          )}
        </div>

        <div className="p-4 text-center text-sm text-gray-500 border-t">
          Showing {filteredCases.length} cases.
        </div>
      </div>

      {/* Mass Action Confirmation Toast */}
      {showConfirmation && (
        <div
          role="alert"
          aria-live="assertive"
          className={`fixed bottom-4 right-4 p-4 ${showConfirmation.includes('No matching') ? 'bg-red-500' : 'bg-green-600'} text-white rounded-lg shadow-xl flex items-center space-x-2 transition-opacity duration-300`}
        >
          <span>{showConfirmation.includes('No matching') ? '⚠️' : '📢'}</span>
          <span>{showConfirmation}</span>
        </div>
      )}
    </div>
  );
};

const RecoveryConversationView = ({
  recoveryCaseId,
  setRoute,
  updateCase,
  automationSettings,
}: {
  recoveryCaseId: string;
  setRoute: (route: string | null) => void;
  updateCase: (fields: any) => void;
  automationSettings: typeof initialAutomationSettings;
}) => {
  const initialCase = MOCK_RECOVERY_CASES.find(t => t.id === recoveryCaseId);
  const [recoveryCase, setRecoveryCase] = useState(initialCase);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState(recoveryCase?.aiDraft || '');
  const [timeline, setTimeline] = useState(recoveryCase?.timeline || []);
  const [showConfirmation, setShowConfirmation] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const currentCase = recoveryCase || initialCase;

  // Simulate AI Auto-send if autoRecovery is enabled
  useEffect(() => {
    if (!currentCase || currentCase.status !== 'New') return;

    if (automationSettings.enabled.autoRecovery && currentCase.rating <= 4 && currentCase.hasDraft) {
      console.log(`AI Auto-Recovery triggered for case ${currentCase.id}. Simulating immediate send.`);
      
      setIsLoading(true);
      
      const autoMessage = automationSettings.messages.autoRecovery
        .replace('[Customer Name]', currentCase.customer || 'Customer')
        .replace('[Manager Name]', 'Mr. Smith');
      
      setTimeout(() => {
        const sentMessage = {
          type: 'sent',
          content: autoMessage,
          sender: 'AI Automation',
          time: new Date().toLocaleTimeString(),
          channel: currentCase.channel
        };
        const newTimeline = [...timeline, sentMessage];
        const updatedCase = { ...currentCase, status: 'Responding', hasDraft: false, timeline: newTimeline };
        
        setTimeline(newTimeline);
        setRecoveryCase(updatedCase);
        updateCase(updatedCase);
        setDraftMessage('');
        setIsLoading(false);
        setShowConfirmation(`AI Auto-Recovery sent: "${sentMessage.content.substring(0, 30)}..."`);
        setTimeout(() => setShowConfirmation(false), 3000);
      }, 1500);
    }
  }, [automationSettings.enabled.autoRecovery, currentCase?.status, currentCase?.rating]);

  if (!currentCase) {
    return (
      <div className="p-8 text-center text-xl text-red-500">
        Recovery Case not found. <button onClick={() => setRoute(null)} className="text-blue-600 underline">Go back to Inbox</button>
      </div>
    );
  }

  const handleApproveSend = () => {
    if (!draftMessage) return;

    setIsLoading(true);
    setTimeout(() => {
      const sentMessage = {
        type: 'sent',
        content: draftMessage,
        sender: 'You/AI',
        time: new Date().toLocaleTimeString(),
        channel: currentCase.channel
      };
      const newTimeline = [...timeline, sentMessage];
      const updatedCase = { ...currentCase, status: 'Responding', hasDraft: false, timeline: newTimeline };
      
      setTimeline(newTimeline);
      setRecoveryCase(updatedCase);
      updateCase(updatedCase);
      setDraftMessage('');
      setIsLoading(false);
      setShowConfirmation('Message approved and sent!');
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 800);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDraft = `[Manager Name] here. I saw your feedback and wanted to personally reach out. We're determined to earn your trust back, not just with a discount, but by showing you the quality we usually offer. Would a quick personal call from me help us understand this better?`;
      setDraftMessage(newDraft);
      setIsLoading(false);
    }, 1500);
  };

  const handleMarkResolved = () => {
    const updatedCase = { ...currentCase, status: 'Resolved' };
    setRecoveryCase(updatedCase);
    updateCase(updatedCase);
    
    // Post-Resolution Automation Check
    if (updatedCase.rating >= 1 && updatedCase.rating <= 4 && automationSettings.enabled.autoWinBack) {
      const schedule = automationSettings.schedule.winBack;
      console.log(`Auto-Win Back scheduled for 1-4 star case ${updatedCase.id} in ${schedule}.`);
      setShowConfirmation(`Case resolved. Auto-Win Back scheduled for ${schedule}.`);
    } else if (updatedCase.rating === 5 && automationSettings.enabled.autoReferral) {
      const schedule = automationSettings.schedule.referral;
      console.log(`Auto-Referral scheduled for 5 star case ${updatedCase.id} in ${schedule}.`);
      setShowConfirmation(`Case resolved. Auto-Referral scheduled for ${schedule}.`);
    } else {
      setShowConfirmation('Case marked resolved.');
    }
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleSendSatisfactionCheck = () => {
    const updatedCase = { ...currentCase, csat: 'Awaiting' };
    setRecoveryCase(updatedCase);
    updateCase(updatedCase);
    setShowConfirmation('Satisfaction check sent.');
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleCaseUpdate = (updatedFields: any) => {
    const updatedCase = { ...currentCase, ...updatedFields };
    setRecoveryCase(updatedCase);
    updateCase(updatedCase);
  };

  const severityColor = currentCase.rating <= 4 ? 'bg-red-500' : 'bg-green-500';

  const complaintLogContent = (
    <>
      <p className='font-bold'>Case Log for {MOCK_RECOVERY_CUSTOMER_DATA.name}</p>
      <ul className='list-disc pl-5'>
        <li>**Case RCV001 (1 Star):** Delivery delay, full refund issued. Status: Resolved (1 hour ago).</li>
        <li>**Case RCV002 (2 Star):** Service complaint, manager call arranged. Status: Satisfied (Yesterday).</li>
        <li>**Case RCV003 (3 Star):** Noise level feedback, acoustic solution noted. Status: Resolved (Oct 20, 2025).</li>
      </ul>
      <p className='mt-3'>*This data is critical for understanding lifetime customer value (LTV) and churn risk.*</p>
    </>
  );

  const purchaseHistoryContent = (
    <>
      <p className='font-bold'>Recent Purchases for {MOCK_RECOVERY_CUSTOMER_DATA.name}</p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr><td className="px-6 py-4 whitespace-nowrap">Dec 10, 2025</td><td className="px-6 py-4 whitespace-nowrap">$45.00</td><td className="px-6 py-4 whitespace-nowrap">Main Dish, Drink</td></tr>
          <tr><td className="px-6 py-4 whitespace-nowrap">Nov 28, 2025</td><td className="px-6 py-4 whitespace-nowrap">$62.50</td><td className="px-6 py-4 whitespace-nowrap">Two Entrees, Dessert</td></tr>
          <tr><td className="px-6 py-4 whitespace-nowrap">Oct 15, 2025</td><td className="px-6 py-4 whitespace-nowrap">$28.99</td><td className="px-6 py-4 whitespace-nowrap">Lunch Combo</td></tr>
        </tbody>
      </table>
      <p className='mt-3'>*Customer is a repeat visitor (8 visits total). They spend an average of $45 per visit.*</p>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md p-4 sm:p-6 border-b">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setRoute(null)} className="text-gray-500 hover:text-gray-800 transition" aria-label="Back to Inbox">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Case #{recoveryCaseId} - {currentCase.customer}</h1>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${severityColor} uppercase`}>
              {currentCase.rating} Star | {currentCase.rating <= 4 ? 'Recovery Focus (1-4★)' : 'Referral Focus (5★)'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Problem: {currentCase.excerpt} | Received: {currentCase.time}</p>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="lg:w-2/3 space-y-6 overflow-y-auto pr-0 lg:pr-6 mb-6 lg:mb-0">
          <RecoveryActionPanel
            recoveryCase={currentCase}
            onSendSatisfactionCheck={handleSendSatisfactionCheck}
            onSendFollowUp={() => setIsFollowUpModalOpen(true)}
            onMarkResolved={handleMarkResolved}
          />
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 h-full">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Message Thread</h2>
            <div className="space-y-5">
              {timeline.map((msg, index) => (
                <RecoveryTimelineMessage key={index} message={msg} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <RecoveryCustomerPanel
            customer={MOCK_RECOVERY_CUSTOMER_DATA}
            onOpenLog={() => setIsLogModalOpen(true)}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
          />
          <RecoveryAiComposer
            draftMessage={draftMessage}
            setDraftMessage={setDraftMessage}
            onApproveSend={handleApproveSend}
            onRegenerate={handleRegenerate}
            channel={currentCase.channel}
            isLoading={isLoading}
            isDraftEmpty={!draftMessage}
          />
        </div>
      </div>

      {showConfirmation && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-2 transition-opacity duration-300"
        >
          <CheckCircle className="h-5 w-5" />
          <span>{typeof showConfirmation === 'string' ? showConfirmation : 'Action successful!'}</span>
        </div>
      )}

      <RecoveryFollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        ticketId={recoveryCaseId}
        updateTicket={handleCaseUpdate}
      />

      <RecoveryModal
        title="Customer Complaint Log (Missing Page Placeholder)"
        content={complaintLogContent}
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />

      <RecoveryModal
        title="Full Purchase History (Missing Page Placeholder)"
        content={purchaseHistoryContent}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  );
};
