import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Mail, Activity, Target, Code, Zap, Feather } from 'lucide-react';

interface EmailTemplateTunerProps {
  emailTemplates: {
    sender_name: string;
    sender_email: string;
    initial_rating_request: {
      subject: string;
      body: string;
    };
    solution_delivery: {
      subject: string;
      body: string;
    };
  };
  onTemplatesChange: (templates: any) => void;
}

const COMPANY_NAME = 'Neviane AI Reputation 2025';
const COMPANY_ADDRESS = '8500 Normandale Lake Blvd #350, Bloomington, MN 55437';

/**
 * Calculate Email Engagement Score (EES) for email templates
 */
const calculateEngagementScore = (subject: string, body: string): number => {
  let score = 50; // Base score

  // 1. Subject Line Analysis (Open Rate Predictor)
  const subjectLength = subject.length;
  const subjNameCount = (subject.match(/{{customer_name}}/g) || []).length;

  if (subjectLength >= 30 && subjectLength <= 60) score += 15; // Optimal length
  if (subjNameCount > 0) score += 10; // Personalization boost

  // 2. Body Content Analysis (Click-Through Predictor)
  const bodyNameCount = (body.match(/{{customer_name}}/g) || []).length;
  const ctaCount = (body.match(/\[\[CTA\]\]/g) || []).length; // Mock CTA indicator

  score += bodyNameCount * 5; // Personalization in body
  score += ctaCount * 15; // Strong CTA presence

  // Penalty for excessive length (simulated reader fatigue)
  if (body.length > 1500) score -= 10;

  return Math.min(100, Math.max(30, score));
};

/**
 * Engagement Score Gauge Component
 */
const EngagementScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const colorClass = score > 85 ? 'text-green-600' : score > 65 ? 'text-yellow-600' : 'text-red-600';
  const fillClass = score > 85 ? 'bg-green-500' : score > 65 ? 'bg-yellow-500' : 'bg-red-500';
  const bgClass = score > 85 ? 'bg-green-50 border-green-200' : score > 65 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';

  return (
    <div className={`p-5 rounded-xl border-2 ${bgClass} shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap size={20} className="text-purple-500" />
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Email Engagement Score
          </span>
        </div>
        <span className={`text-3xl font-extrabold ${colorClass}`}>{score}%</span>
      </div>
      <div className="w-full h-4 rounded-full bg-white/60 overflow-hidden mb-3 shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ${fillClass} shadow-sm`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className={`text-sm font-medium ${colorClass} text-center`}>
        {score > 85
          ? '✓ OPTIMAL: High Open & CTA potential'
          : score > 65
          ? '⚠ MODERATE: Check subject personalization and CTA density'
          : '✗ LOW: Needs critical revision for clarity/appeal'}
      </p>
    </div>
  );
};

/**
 * Live Email Preview Component
 */
const LiveEmailPreview: React.FC<{
  template: { subject: string; body: string };
  senderName: string;
  senderEmail: string;
}> = ({ template, senderName, senderEmail }) => {
  // Mock variables for preview
  const MOCK_CLIENT_COMPANY = 'Zenith Corp';

  // Simple Markdown/Variable Replacement
  const replacedBody = template.body
    .replace(/{{customer_name}}/g, 'Alex Johnson')
    .replace(/{{client_company}}/g, MOCK_CLIENT_COMPANY)
    .replace(/{{sender_name}}/g, senderName)
    .replace(/{{account_id}}/g, 'NVN-00987')
    .replace(/\n/g, '<br/>')
    .replace(/\[\[CTA:(.*?)\]\]/g, (match, ctaLabel) => {
      return `<div class="mt-6 mb-6 text-center">
                <button class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition" disabled>
                  ${ctaLabel.trim()}
                </button>
              </div>`;
    });

  const replacedSubject = template.subject
    .replace(/{{customer_name}}/g, 'Alex Johnson')
    .replace(/{{client_company}}/g, MOCK_CLIENT_COMPANY);

  return (
    <div className="p-2 bg-white rounded-xl border border-gray-300 shadow-xl h-full">
      <div className="w-full mx-auto bg-gray-100 rounded-lg shadow-inner border border-gray-200">
        {/* Mock Email Header */}
        <div className="bg-gray-700 text-white text-xs p-3 rounded-t-lg flex justify-between items-center">
          <span>INBOX | TEMPLATE TEST</span>
          <Feather size={14} className="text-gray-400" />
        </div>

        {/* Subject Line */}
        <div className="p-4 bg-white border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{replacedSubject}</h3>
          <p className="text-xs text-gray-500 mt-1">
            From:{' '}
            <span className="font-medium text-gray-700">
              {senderName} &lt;{senderEmail}&gt;
            </span>
            <span className="ml-4">To: Alex Johnson</span>
          </p>
        </div>

        {/* Email Body */}
        <div
          className="p-6 bg-white rounded-b-lg min-h-[300px] text-gray-800 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: replacedBody }}
        />

        {/* Footer Mock (FTC/CAN-SPAM Compliance Mock) */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500">
          {/* Powered By Line */}
          <p className="mb-2 text-gray-600 font-semibold flex items-center justify-center space-x-1">
            <Zap size={12} className="text-purple-500" />
            <span>Powered by {COMPANY_NAME}</span>
          </p>

          <p className="mt-2 text-[11px] leading-relaxed">
            <span className="font-medium">{COMPANY_NAME}</span> | {COMPANY_ADDRESS}
          </p>

          <p className="mt-1">
            <a href="#" className="underline text-indigo-600 hover:text-indigo-800">
              Unsubscribe from Neviane AI updates
            </a>
          </p>

          <p className="mt-1 italic text-[10px] text-gray-400">
            (Compliance requirement: Includes sender ID, physical address, and functional opt-out
            link.)
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Email Template Tuner Component
 */
export const EmailTemplateTuner: React.FC<EmailTemplateTunerProps> = ({
  emailTemplates,
  onTemplatesChange,
}) => {
  const [localTemplates, setLocalTemplates] = useState(emailTemplates);
  const [activeTemplate, setActiveTemplate] = useState<
    'initial_rating_request' | 'solution_delivery'
  >('initial_rating_request');
  const activeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const activeSubjectRef = useRef<HTMLInputElement>(null);

  const currentTemplate = localTemplates[activeTemplate];
  const engagementScore = useMemo(
    () => calculateEngagementScore(currentTemplate.subject, currentTemplate.body),
    [currentTemplate.subject, currentTemplate.body]
  );

  const handleTemplateChange = useCallback(
    (key: string, field: 'subject' | 'body', value: string) => {
      const updated = {
        ...localTemplates,
        [key]: {
          ...(localTemplates[key as 'initial_rating_request' | 'solution_delivery']),
          [field]: value,
        },
      };
      setLocalTemplates(updated);
      onTemplatesChange(updated);
    },
    [localTemplates, onTemplatesChange]
  );

  const handleGlobalChange = useCallback(
    (key: string, value: string) => {
      const updated = { ...localTemplates, [key]: value };
      setLocalTemplates(updated);
      onTemplatesChange(updated);
    },
    [localTemplates, onTemplatesChange]
  );

  const handleVariableInsert = (variable: string, target: 'body' | 'subject' = 'body') => {
    const ref = target === 'body' ? activeTextareaRef : activeSubjectRef;
    if (ref.current) {
      const input = ref.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newValue = input.value.substring(0, start) + variable + input.value.substring(end);
      handleTemplateChange(activeTemplate, target, newValue);
      setTimeout(() => {
        input.focus();
        input.selectionStart = input.selectionEnd = start + variable.length;
      }, 0);
    }
  };

  const variables = [
    '{{customer_name}}',
    '{{client_company}}',
    '{{sender_name}}',
    '[[CTA: Button Label]]',
    '{{account_id}}',
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center space-x-2">
        <Target size={24} className="text-indigo-600" aria-hidden="true" />
        <span>Email Template Tuner</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Engagement Score & Email Preview */}
        <div className="lg:col-span-1 space-y-6" aria-label="Live Email Preview and Metrics">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2 mb-3">
              <Mail size={18} /> LIVE PREVIEW
            </h3>
            <LiveEmailPreview
              template={currentTemplate}
              senderName={localTemplates.sender_name}
              senderEmail={localTemplates.sender_email}
            />
          </div>
          <EngagementScoreGauge score={engagementScore} />
        </div>

        {/* Column 2/3: Template Editor */}
        <div className="lg:col-span-2 p-6 rounded-xl shadow-xl bg-white border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">CONFIGURATION INTERFACE</h3>

          {/* Sender Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="sender_name" className="block text-sm font-medium text-indigo-600 mb-1">
                SENDER NAME (e.g., HR Team)
              </label>
              <input
                id="sender_name"
                type="text"
                value={localTemplates.sender_name}
                onChange={(e) => handleGlobalChange('sender_name', e.target.value)}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-base focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="sender_email" className="block text-sm font-medium text-indigo-600 mb-1">
                SENDER EMAIL (e.g., info@domain.com)
              </label>
              <input
                id="sender_email"
                type="email"
                value={localTemplates.sender_email}
                onChange={(e) => handleGlobalChange('sender_email', e.target.value)}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-base focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Template Selectors */}
          <div className="mb-6">
            <label htmlFor="email_template_select" className="block text-sm font-medium text-indigo-600 mb-2">
              SELECT AI SEQUENCE TEMPLATE
            </label>
            <select
              id="email_template_select"
              value={activeTemplate}
              onChange={(e) =>
                setActiveTemplate(e.target.value as 'initial_rating_request' | 'solution_delivery')
              }
              className="w-full md:w-1/2 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="initial_rating_request">01 | INITIAL RATING REQUEST (First Touch)</option>
              <option value="solution_delivery">02 | SOLUTION DELIVERY (Credit Confirmation)</option>
            </select>
          </div>

          {/* Subject Line */}
          <div className="mb-6">
            <label htmlFor="subject_line" className="block text-sm font-medium text-indigo-600 mb-2">
              SUBJECT LINE
            </label>
            <input
              id="subject_line"
              ref={activeSubjectRef}
              type="text"
              value={currentTemplate.subject}
              onChange={(e) => handleTemplateChange(activeTemplate, 'subject', e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-base focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Characters: {currentTemplate.subject.length}. Aim for 30-60 for optimal visibility.
            </p>
          </div>

          {/* Variable Toolbar */}
          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border-dashed border-indigo-200 border">
            <span className="text-sm font-medium text-indigo-600 block mb-2 flex items-center">
              <Code size={16} className="mr-2" /> DYNAMIC CONTEXT VARIABLES & CTAs
            </span>
            <div className="flex flex-wrap gap-2">
              {variables.map((v) => (
                <button
                  key={v}
                  onClick={() => handleVariableInsert(v, 'body')}
                  className={`px-3 py-1 text-xs font-mono rounded-full hover:bg-indigo-200 transition border ${
                    v.includes('CTA')
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-indigo-100 text-indigo-700 border-indigo-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click variables to insert into body. For subject line, type manually or copy from above.
            </p>
          </div>

          {/* Template Textarea (Body) */}
          <div className="mb-6">
            <label htmlFor="email_template_textarea" className="block text-sm font-medium text-indigo-600 mb-2">
              EMAIL BODY (Markdown/Plain Text Format)
            </label>
            <textarea
              id="email_template_textarea"
              ref={activeTextareaRef}
              value={currentTemplate.body}
              onChange={(e) => handleTemplateChange(activeTemplate, 'body', e.target.value)}
              className="w-full min-h-[250px] p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-indigo-500 text-sm resize-none text-gray-900 font-mono"
              aria-label={`${activeTemplate.replace('_', ' ')} email body content`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Note: Use double newlines for paragraphs and [[CTA: Label]] for interactive buttons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

