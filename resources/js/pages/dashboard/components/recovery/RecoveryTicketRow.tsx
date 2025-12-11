import React from 'react';
import { Phone, Mail, Smartphone, User, Send, MessageSquare } from 'lucide-react';

interface RecoveryTicketRowProps {
  ticket: any;
  onOpen: (id: string) => void;
}

export const RecoveryTicketRow: React.FC<RecoveryTicketRowProps> = ({ ticket, onOpen }) => {
  const ratingColor = ticket.rating === 1 ? 'bg-red-100 text-red-700' :
    ticket.rating === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700';

  const statusPill = (status: string) => {
    switch (status) {
      case 'New': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">{status}</span>;
      case 'Responding': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">{status}</span>;
      case 'Resolved': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">{status}</span>;
      default: return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const channelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'sms': return <Phone className="h-5 w-5 text-blue-500" aria-label="SMS" />;
      case 'email': return <Mail className="h-5 w-5 text-red-500" aria-label="Email" />;
      case 'app': return <Smartphone className="h-5 w-5 text-green-500" aria-label="In-App" />;
      default: return <User className="h-5 w-5 text-gray-500" aria-label="Unknown" />;
    }
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0">
      <button onClick={() => onOpen(ticket.id)} className="flex-grow min-w-0 md:w-auto mb-2 sm:mb-0 text-left p-0 border-none bg-transparent">
        <div className="flex items-center space-x-3 cursor-pointer">
          <span className={`${ratingColor} px-2 py-0.5 text-xs font-bold rounded-md flex-shrink-0`}>
            {ticket.rating}★
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{ticket.customer || 'Anonymous Customer'}</p>
            <p className="text-sm text-gray-500 truncate">{ticket.excerpt}</p>
          </div>
        </div>
      </button>

      <div className="flex items-center space-x-4 flex-shrink-0 ml-auto mr-4">
        <span className="text-sm text-gray-500">{ticket.time}</span>
        <span className="text-lg">{channelIcon(ticket.channel)}</span>
        {statusPill(ticket.status)}
      </div>

      <div className="flex space-x-2 flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
        {ticket.hasDraft && ticket.status !== 'Resolved' && (
          <button onClick={() => onOpen(ticket.id)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
            <Send className="mr-1 h-4 w-4" /> Approve & Send
          </button>
        )}
        <button onClick={() => onOpen(ticket.id)} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
          <MessageSquare className="mr-1 h-4 w-4" /> Open
        </button>
      </div>
    </div>
  );
};

