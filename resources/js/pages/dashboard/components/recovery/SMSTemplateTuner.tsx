import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Phone, Activity, Target, Code, Check } from 'lucide-react';

interface SMSTemplateTunerProps {
  smsTemplates: {
    business_name: string;
    prior_message: string;
    initial_rating: string;
    ai_apology: string;
  };
  onTemplatesChange: (templates: any) => void;
}

/**
 * Calculate Tone Resonance Index for SMS templates
 */
const calculateToneResonance = (content: string): number => {
  let score = 50; // Base score

  // Impact of Personalization ({{customer_name}})
  const nameCount = (content.match(/{{customer_name}}/g) || []).length;
  score += nameCount * 15;

  // Impact of Actionability ({{solution}} or {{rating_link}})
  const actionCount = 
    (content.match(/{{solution}}/g) || []).length + 
    (content.match(/{{rating_link}}/g) || []).length;
  score += actionCount * 10;

  // Penalty for length (SMS optimal: 100-160 characters for minimal friction)
  if (content.length > 160) score -= 10;
  if (content.length < 50) score -= 5;

  // Simulation of AI Sentiment Analysis (Looking for positive/urgent language)
  if (content.toLowerCase().includes('sorry') || content.toLowerCase().includes('fix')) score += 5;
  if (content.toLowerCase().includes('important')) score += 5;

  return Math.min(100, Math.max(30, score));
};

/**
 * Tone Resonance Gauge Component
 */
const ToneResonanceGauge: React.FC<{ score: number }> = ({ score }) => {
  const colorClass = score > 80 ? 'text-green-600' : score > 50 ? 'text-yellow-600' : 'text-red-600';
  const fillClass = score > 80 ? 'bg-green-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xl font-bold ${colorClass}`}>{score}%</span>
        <span className="text-sm text-gray-500 flex items-center">
          <Activity size={16} className="mr-1" /> TONE RESONANCE INDEX
        </span>
      </div>
      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${fillClass}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className={`text-xs mt-2 ${colorClass}`}>
        {score > 80
          ? 'OPTIMAL: High emotional connection likelihood.'
          : score > 50
          ? 'MODERATE: Check length and personalization.'
          : 'LOW: Needs critical revision for empathy.'}
      </p>
    </div>
  );
};

/**
 * Live SMS Preview Component
 */
const LiveSMSPreview: React.FC<{
  content: string;
  senderName: string;
  priorMessageContent: string;
}> = ({ content, senderName, priorMessageContent }) => {
  const previewContent = content
    .replace(/{{customer_name}}/g, 'A. Johnson')
    .replace(/{{rating_link}}/g, 'link.app/rate-ai')
    .replace(/{{business_name}}/g, senderName)
    .replace(/{{solution}}/g, '20% off next visit');

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md h-full">
      <div className="w-full max-w-xs mx-auto bg-gray-100 rounded-2xl p-2 shadow-xl border border-gray-300">
        <div className="bg-white rounded-xl h-full overflow-hidden p-3 space-y-3">
          {/* Mock Header */}
          <div className="text-xs text-gray-500 text-center">Messaging System</div>

          {/* Sender Bubble (Editable Context Anchor) */}
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-gray-200 text-gray-800 text-xs p-2 rounded-xl rounded-bl-none shadow-sm">
              <p className="font-semibold text-gray-600">{senderName}</p>
              <p className="text-gray-700 mt-1">{priorMessageContent}</p>
            </div>
          </div>

          {/* Current Template Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-indigo-600 text-white text-sm p-3 rounded-xl rounded-br-none shadow-lg">
              <p>{previewContent}</p>
            </div>
          </div>

          {/* Mock Input */}
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 bg-gray-100 text-sm p-1 rounded-full text-gray-600 border border-gray-300"
              readOnly
            />
            <Check size={18} className="text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SMS Template Tuner Component
 */
export const SMSTemplateTuner: React.FC<SMSTemplateTunerProps> = ({
  smsTemplates,
  onTemplatesChange,
}) => {
  const [localTemplates, setLocalTemplates] = useState(smsTemplates);
  const [activeTemplate, setActiveTemplate] = useState<'initial_rating' | 'ai_apology'>('initial_rating');
  const activeTextareaRef = useRef<HTMLTextAreaElement>(null);

  const currentTemplateContent = localTemplates[activeTemplate];
  const resonanceScore = useMemo(
    () => calculateToneResonance(currentTemplateContent),
    [currentTemplateContent]
  );

  const handleTemplateChange = useCallback(
    (name: string, value: string) => {
      const updated = { ...localTemplates, [name]: value };
      setLocalTemplates(updated);
      onTemplatesChange(updated);
    },
    [localTemplates, onTemplatesChange]
  );

  const handleVariableInsert = (variable: string) => {
    if (activeTextareaRef.current) {
      const textarea = activeTextareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        textarea.value.substring(0, start) + variable + textarea.value.substring(end);
      handleTemplateChange(activeTemplate, newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + variable.length;
      }, 0);
    }
  };

  const variables = [
    '{{customer_name}}',
    '{{rating_link}}',
    '{{business_name}}',
    '{{solution}}',
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center space-x-2">
        <Target size={24} className="text-indigo-600" aria-hidden="true" />
        <span>SMS Template Tuner</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: SMS Preview & Tone Index */}
        <div className="lg:col-span-1 space-y-6" aria-label="Live SMS Preview and Metrics">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2 pl-2">
            <Phone size={18} /> LIVE PREVIEW
          </h3>
          <LiveSMSPreview
            content={currentTemplateContent}
            senderName={localTemplates.business_name}
            priorMessageContent={localTemplates.prior_message}
          />
          <ToneResonanceGauge score={resonanceScore} />
        </div>

        {/* Column 2/3: Template Editor */}
        <div className="lg:col-span-2 p-6 rounded-xl shadow-xl bg-white border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">CONFIGURATION INTERFACE</h3>

          {/* Sender Name */}
          <div className="mb-6">
            <label htmlFor="business_name" className="block text-sm font-medium text-indigo-600 mb-1">
              SENDER IDENTIFIER
            </label>
            <input
              id="business_name"
              type="text"
              value={localTemplates.business_name}
              onChange={(e) =>
                handleTemplateChange('business_name', e.target.value.substring(0, 25))
              }
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-base focus:ring-indigo-500 focus:border-indigo-500"
              maxLength={25}
            />
          </div>

          {/* Prior Message Field */}
          <div className="mb-6">
            <label htmlFor="prior_message" className="block text-sm font-medium text-indigo-600 mb-1">
              MOCK PRIOR MESSAGE (Context Anchor)
            </label>
            <input
              id="prior_message"
              type="text"
              value={localTemplates.prior_message}
              onChange={(e) => handleTemplateChange('prior_message', e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-base focus:ring-indigo-500 focus:border-indigo-500"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              This simulates the message immediately preceding your template in the chat log.
            </p>
          </div>

          {/* Variable Toolbar */}
          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border-dashed border-indigo-200 border">
            <span className="text-sm font-medium text-indigo-600 block mb-2 flex items-center">
              <Code size={16} className="mr-2" /> DYNAMIC CONTEXT VARIABLES
            </span>
            <div className="flex flex-wrap gap-2">
              {variables.map((v) => (
                <button
                  key={v}
                  onClick={() => handleVariableInsert(v)}
                  className="px-3 py-1 text-xs font-mono bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition border border-indigo-300"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Template Selectors */}
          <div className="mb-4">
            <label htmlFor="template_select" className="block text-sm font-medium text-indigo-600 mb-2">
              SELECT AI SEQUENCE TEMPLATE
            </label>
            <select
              id="template_select"
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value as 'initial_rating' | 'ai_apology')}
              className="w-full md:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="initial_rating">01 | RATING REQUEST (High Priority)</option>
              <option value="ai_apology">02 | AI APOLOGY & INFO GATHER (Low Rating)</option>
            </select>
          </div>

          {/* Template Textarea */}
          <div className="mb-6">
            <label
              htmlFor="template_textarea"
              className="block text-sm font-medium text-indigo-600 mb-2"
            >
              MESSAGE CONTENT
            </label>
            <textarea
              id="template_textarea"
              ref={activeTextareaRef}
              value={currentTemplateContent}
              onChange={(e) => handleTemplateChange(activeTemplate, e.target.value)}
              className="w-full min-h-[150px] p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-indigo-500 text-sm resize-none text-gray-900"
              aria-label={`${activeTemplate.replace('_', ' ')} template content`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Characters: {currentTemplateContent.length} / 320 (Recommended max for multi-part SMS)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

