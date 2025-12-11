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
import { MOCK_RECOVERY_TICKETS, MOCK_RECOVERY_STATS, MOCK_RECOVERY_CUSTOMER_DATA } from '../../data/mockData';

export const AIRecoveryCenter: React.FC = () => {
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);
  const [allTickets, setAllTickets] = useState(MOCK_RECOVERY_TICKETS);
  const [automationSettings, setAutomationSettings] = useState({
    autoRecovery: false,
    autoReferral: false,
  });

  const setRoute = (ticketId: string | null) => {
    setCurrentTicketId(ticketId);
  };

  const updateTicket = (updatedFields: any) => {
    setAllTickets(prevTickets => 
      prevTickets.map(t => t.id === updatedFields.id ? { ...t, ...updatedFields } : t)
    );
  };

  const updateAutomationSettings = (newSettings: any) => {
    setAutomationSettings(newSettings);
    console.log('Automation settings updated:', newSettings);
  };

  if (currentTicketId) {
    return (
      <RecoveryConversationView
        ticketId={currentTicketId}
        setRoute={setRoute}
        updateTicket={updateTicket}
        automationSettings={automationSettings}
      />
    );
  }

  return (
    <RecoveryInboxView
      tickets={allTickets}
      stats={MOCK_RECOVERY_STATS}
      setRoute={setRoute}
      automationSettings={automationSettings}
      updateAutomationSettings={updateAutomationSettings}
    />
  );
};

const RecoveryInboxView = ({
  tickets,
  stats,
  setRoute,
  automationSettings,
  updateAutomationSettings,
}: {
  tickets: typeof MOCK_RECOVERY_TICKETS;
  stats: typeof MOCK_RECOVERY_STATS;
  setRoute: (id: string | null) => void;
  automationSettings: { autoRecovery: boolean; autoReferral: boolean };
  updateAutomationSettings: (settings: any) => void;
}) => {
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filters.status && ticket.status !== filters.status) return false;
    const ratingFilter = filters.rating ? parseInt(filters.rating, 10) : null;
    if (ratingFilter && ticket.rating !== ratingFilter) return false;
    if (filters.channel && ticket.channel !== filters.channel) return false;
    return true;
  });

  const handleMassAction = (type: string) => {
    let count = 0;
    let message = '';

    if (type === 'winBack') {
      count = tickets.filter(t => t.status === 'Resolved' && t.rating <= 3).length;
      message = `Win Back Campaign (personalized email/sms) initiated for ${count} resolved 1-3 star customers!`;
    } else if (type === 'referral') {
      count = tickets.filter(t => t.rating === 5).length;
      message = `Personal Referral Campaign initiated for ${count} 5-star customers!`;
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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">AI Recovery Inbox</h1>
      
      <RecoveryStatsWidget stats={stats} />
      
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <RecoveryInboxFilters
          currentFilters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onMassAction={handleMassAction}
          automationSettings={automationSettings}
          setAutomationSettings={updateAutomationSettings}
        />

        <div className="divide-y divide-gray-100">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <RecoveryTicketRow key={ticket.id} ticket={ticket} onOpen={setRoute} />
            ))
          ) : (
            <RecoveryEmptyState
              title="No Results Found"
              message="Try clearing your filters or changing your search term."
            />
          )}
        </div>

        <div className="p-4 text-center text-sm text-gray-500 border-t">
          Showing {filteredTickets.length} tickets.
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
  ticketId,
  setRoute,
  updateTicket,
  automationSettings,
}: {
  ticketId: string;
  setRoute: (id: string | null) => void;
  updateTicket: (ticket: any) => void;
  automationSettings: { autoRecovery: boolean; autoReferral: boolean };
}) => {
  const initialTicket = MOCK_RECOVERY_TICKETS.find(t => t.id === ticketId);
  const [ticket, setTicket] = useState(initialTicket);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState(ticket?.aiDraft || '');
  const [timeline, setTimeline] = useState(ticket?.timeline || []);
  const [showConfirmation, setShowConfirmation] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate AI Auto-send if autoRecovery is enabled
  useEffect(() => {
    if (automationSettings.autoRecovery && ticket && ticket.rating <= 3 && ticket.status === 'New' && ticket.hasDraft) {
      console.log(`AI Auto-Recovery triggered for ticket ${ticket.id}. Simulating immediate send.`);
      setIsLoading(true);
      setTimeout(() => {
        const sentMessage = {
          type: 'sent',
          content: ticket.aiDraft,
          sender: 'AI Automation',
          time: new Date().toLocaleTimeString(),
          channel: ticket.channel
        };
        const newTimeline = [...timeline, sentMessage];
        const updatedTicket = { ...ticket, status: 'Responding', hasDraft: false, timeline: newTimeline };
        
        setTimeline(newTimeline);
        setTicket(updatedTicket);
        updateTicket(updatedTicket);
        setDraftMessage('');
        setIsLoading(false);
        setShowConfirmation(`AI Auto-Recovery sent: "${ticket.aiDraft.substring(0, 30)}..."`);
        setTimeout(() => setShowConfirmation(false), 3000);
      }, 1500);
    }
  }, [automationSettings.autoRecovery, ticket?.status, ticket?.rating]);

  if (!ticket) {
    return (
      <div className="p-8 text-center text-xl text-red-500">
        Ticket not found. <button onClick={() => setRoute(null)} className="text-blue-600 underline">Go back to Inbox</button>
      </div>
    );
  }

  const handleApproveSend = () => {
    setIsLoading(true);
    setTimeout(() => {
      const sentMessage = {
        type: 'sent',
        content: draftMessage,
        sender: 'You/AI',
        time: new Date().toLocaleTimeString(),
        channel: ticket.channel
      };
      const newTimeline = [...timeline, sentMessage];
      const updatedTicket = { ...ticket, status: 'Responding', hasDraft: false, timeline: newTimeline };
      
      setTimeline(newTimeline);
      setTicket(updatedTicket);
      updateTicket(updatedTicket);
      setDraftMessage('');
      setIsLoading(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 800);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDraft = "We appreciate you sharing your experience. We are determined to earn your trust back, not just with a discount, but by showing you the quality we usually offer. Would a quick personal call from our shift leader help us understand this better?";
      setDraftMessage(newDraft);
      setIsLoading(false);
    }, 1500);
  };

  const handleMarkResolved = () => {
    const updatedTicket = { ...ticket, status: 'Resolved' };
    setTicket(updatedTicket);
    updateTicket(updatedTicket);
  };

  const handleSendSatisfactionCheck = () => {
    const updatedTicket = { ...ticket, csat: 'Awaiting' };
    setTicket(updatedTicket);
    updateTicket(updatedTicket);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleTicketUpdate = (updatedFields: any) => {
    const updatedTicket = { ...ticket, ...updatedFields };
    setTicket(updatedTicket);
    updateTicket(updatedTicket);
  };

  const severityColor = ticket.rating <= 2 ? 'bg-red-500' : ticket.rating <= 4 ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md p-4 sm:p-6 border-b">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setRoute(null)} className="text-gray-500 hover:text-gray-800 transition" aria-label="Back to Inbox">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Ticket #{ticketId} - {ticket.customer}</h1>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${severityColor} uppercase`}>
              {ticket.rating} Star | {ticket.rating <= 3 ? 'Recovery Focus' : 'Feedback Loop'}
            </span>
            {ticket.status !== 'Resolved' ? (
              <button
                onClick={handleMarkResolved}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center"
                aria-label="Mark ticket as resolved"
              >
                <CheckCircle className="mr-1 h-4 w-4" /> Resolve
              </button>
            ) : (
              <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg">Resolved</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Problem: {ticket.excerpt} | Received: {ticket.time}</p>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="lg:w-2/3 space-y-6 overflow-y-auto pr-0 lg:pr-6 mb-6 lg:mb-0">
          <RecoveryActionPanel
            ticket={ticket}
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
          <RecoveryCustomerPanel customer={MOCK_RECOVERY_CUSTOMER_DATA} />
          <RecoveryAiComposer
            draftMessage={draftMessage}
            setDraftMessage={setDraftMessage}
            onApproveSend={handleApproveSend}
            onRegenerate={handleRegenerate}
            channel={ticket.channel}
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
        ticketId={ticketId}
        updateTicket={handleTicketUpdate}
      />
    </div>
  );
};
