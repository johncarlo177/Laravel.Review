import React, { useState } from 'react';
import { Send, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface RecoveryAiComposerProps {
  draftMessage: string;
  setDraftMessage: (msg: string) => void;
  onApproveSend: () => void;
  onRegenerate: () => void;
  channel: string;
  isLoading: boolean;
  isDraftEmpty: boolean;
}

const RecoveryToneButton = ({ tone, currentTone, setTone }: { tone: string; currentTone: string; setTone: (tone: string) => void }) => (
  <button
    onClick={() => setTone(tone)}
    className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
      currentTone === tone
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {tone}
  </button>
);

export const RecoveryAiComposer: React.FC<RecoveryAiComposerProps> = ({
  draftMessage,
  setDraftMessage,
  onApproveSend,
  onRegenerate,
  channel,
  isLoading,
  isDraftEmpty,
}) => {
  const [tone, setTone] = useState('Empathetic');
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const charCount = draftMessage ? draftMessage.length : 0;
  const isSms = channel?.toLowerCase() === 'sms';
  const charLimit = isSms ? 160 : 5000;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
      <h3 className="text-xl font-bold text-indigo-700 mb-4">AI Draft for Reply</h3>

      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : (
        <textarea
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
          rows={isSms ? 4 : 8}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="AI draft will appear here..."
        />
      )}

      <div className="flex justify-between items-center text-xs mt-2">
        <p className={`font-medium ${charCount > charLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {charCount} / {charLimit} chars ({isSms ? 'SMS' : 'Email'} format)
        </p>
        <button onClick={() => setShowAiPrompt(!showAiPrompt)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          {showAiPrompt ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />} {showAiPrompt ? 'Hide' : 'Show'} AI Prompt
        </button>
      </div>

      <div className="mt-4">
        <span className="text-xs font-semibold text-gray-700 block mb-1">Tone Presets:</span>
        <div className="flex space-x-2">
          <RecoveryToneButton tone="Empathetic" currentTone={tone} setTone={setTone} />
          <RecoveryToneButton tone="Professional" currentTone={tone} setTone={setTone} />
          <RecoveryToneButton tone="Short & Direct" currentTone={tone} setTone={setTone} />
        </div>
      </div>

      <div className="flex space-x-3 mt-6 border-t pt-4">
        <button
          onClick={onApproveSend}
          disabled={isDraftEmpty || isLoading}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="mr-2 h-4 w-4" /> Approve & Send
        </button>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="w-32 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <RotateCcw className="h-4 w-4 animate-spin" /> : <><RotateCcw className="mr-1 h-4 w-4" /> Regenerate</>}
        </button>
      </div>
    </div>
  );
};

