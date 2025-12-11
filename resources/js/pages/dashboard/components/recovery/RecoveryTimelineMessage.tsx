import React from 'react';
import { UserCircle, MessageSquare, Bot, Send } from 'lucide-react';

interface RecoveryTimelineMessageProps {
  message: any;
}

export const RecoveryTimelineMessage: React.FC<RecoveryTimelineMessageProps> = ({ message }) => {
  const isCustomer = message.type === 'customer';
  const isAi = message.type === 'ai_draft';
  const isSent = message.type === 'sent';

  let cardClasses = 'p-4 rounded-xl shadow-sm border border-gray-200';
  let Icon = UserCircle;
  let senderName = message.sender;

  if (isCustomer) {
    cardClasses = 'bg-white shadow-md border-t-4 border-gray-300';
    Icon = MessageSquare;
  } else if (isAi) {
    cardClasses = 'bg-yellow-50 shadow-md border-l-4 border-yellow-400';
    Icon = Bot;
    senderName = 'AI Draft';
  } else if (isSent) {
    cardClasses = 'bg-blue-50 shadow-md border-l-4 border-blue-500 ml-auto';
    Icon = Send;
    senderName = `Sent via ${message.channel} (${message.sender})`;
  }

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-full ${isSent ? 'flex-row-reverse space-x-reverse' : ''} ${cardClasses}`}>
        <Icon className={`text-xl flex-shrink-0 ${isAi ? 'text-yellow-600' : isSent ? 'text-blue-600' : 'text-gray-500'}`} />
        <div className={`text-sm ${isSent ? 'text-right' : 'text-left'}`}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-gray-800 text-xs sm:text-sm">{senderName}</span>
            <span className="text-xs text-gray-400 ml-3">{message.time}</span>
          </div>
          <p className={`text-gray-700 ${isAi ? 'italic' : ''} whitespace-pre-wrap`}>{message.content}</p>
          {isAi && <p className="mt-2 text-xs text-yellow-700 font-medium">Draft created based on problem summary.</p>}
        </div>
      </div>
    </div>
  );
};

