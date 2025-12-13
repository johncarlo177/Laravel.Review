import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { SMSTemplateTuner } from './SMSTemplateTuner';
import { EmailTemplateTuner } from './EmailTemplateTuner';

interface AutomationSettingsViewProps {
  setRoute: (route: string | null) => void;
  automationSettings: {
    enabled: {
      autoRecovery: boolean;
      autoWinBack: boolean;
      autoReferral: boolean;
    };
    messages: {
      autoRecovery: string;
      autoWinBack: string;
      autoReferral: string;
    };
    schedule: {
      winBack: string;
      referral: string;
    };
  };
  updateAutomationSettings: (settings: any) => void;
}

interface AutomationToggleProps {
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  isPrimary: boolean;
}

const AutomationToggle: React.FC<AutomationToggleProps> = ({ label, description, isEnabled, onToggle, isPrimary }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isPrimary ? 'bg-indigo-50' : 'bg-gray-100'} shadow-sm border border-gray-200`}>
    <div className="flex-1 mr-4">
      <p className={`font-bold ${isPrimary ? 'text-indigo-800' : 'text-gray-800'}`}>{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={isEnabled} 
        onChange={onToggle} 
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      <span className={`ms-3 text-sm font-medium ${isEnabled ? 'text-indigo-700' : 'text-gray-500'}`}>
        {isEnabled ? 'ON' : 'OFF'}
      </span>
    </label>
  </div>
);

interface AutomationScheduleSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}

const AutomationScheduleSelect: React.FC<AutomationScheduleSelectProps> = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const AutomationSettingsView: React.FC<AutomationSettingsViewProps> = ({
  setRoute,
  automationSettings,
  updateAutomationSettings,
}) => {
  // Initialize SMS templates with defaults if not provided
  const defaultSmsTemplates = {
    business_name: 'Velocity Node',
    prior_message: "Hello, is there a high-priority action for me?",
    initial_rating: "Hello {{customer_name}}, thank you for trusting us today. We'd appreciate a quick, human rating on your experience: {{rating_link}}. Reply STOP to opt out.",
    ai_apology: "Hi {{customer_name}}, the AI flagged your feedback. I'm genuinely sorry about your experience. Could you share just a little more context so I can calibrate a solution?",
  };

  // Initialize Email templates with defaults if not provided
  const defaultEmailTemplates = {
    sender_name: 'Neviane AI Resolution',
    sender_email: 'resolution@neviane-ai.com',
    initial_rating_request: {
      subject: "Your Feedback Matters: Help us tune Neviane AI.",
      body: "Hi {{customer_name}},\n\nThanks for your trust in {{client_company}}. We are focused on making every interaction exceptional, but we can't improve without hearing directly from you.\n\nCould you spare 10 seconds to share a simple rating on how we did during your last service interaction with {{client_company}}? It's private, quick, and helps our system learn.\n\n[[CTA: Share a quick thought]]\n\nThanks,\n{{sender_name}}",
    },
    solution_delivery: {
      subject: "Solution Delivered: Your Credit Confirmation from Neviane AI",
      body: "Dear {{customer_name}},\n\nBased on the data collected by the Resolution Console for {{client_company}}, we have processed an immediate credit of 75 units to your account. This is the first step in our resolution path. \n\nClick here for more details: [[CTA: View Account Details]]\n\nWe appreciate your patience.\n\nSincerely,\nResolution Core",
    },
  };

  const [localSettings, setLocalSettings] = useState(automationSettings);
  const [smsTemplates, setSmsTemplates] = useState(
    (automationSettings as any).smsTemplates || defaultSmsTemplates
  );
  const [emailTemplates, setEmailTemplates] = useState(
    (automationSettings as any).emailTemplates || defaultEmailTemplates
  );

  const handleToggle = (key: string) => {
    setLocalSettings(prev => ({
      ...prev,
      enabled: {
        ...prev.enabled,
        [key]: !prev.enabled[key]
      }
    }));
  };

  const handleMessageChange = (key: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [key]: value
      }
    }));
  };

  const handleScheduleChange = (key: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [key]: value
      }
    }));
  };

  const handleSmsTemplatesChange = (templates: any) => {
    setSmsTemplates(templates);
  };

  const handleEmailTemplatesChange = (templates: any) => {
    setEmailTemplates(templates);
  };

  const handleSave = () => {
    const settingsToSave = {
      ...localSettings,
      smsTemplates: smsTemplates,
      emailTemplates: emailTemplates,
    };
    updateAutomationSettings(settingsToSave);
    setRoute(null);
  };

  const messageBox = (key: string, title: string, placeholders: string[], description: string) => (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-xs text-gray-500 mb-3">{description}</p>
      <textarea
        rows={6}
        value={localSettings.messages[key as keyof typeof localSettings.messages]}
        onChange={(e) => handleMessageChange(key, e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <p className="text-xs text-gray-500 mt-2">
        **Placeholders:** {placeholders.join(', ')}
      </p>
    </div>
  );

  const scheduleOptions = [
    { label: 'Immediately (upon resolution)', value: '0h' },
    { label: '24 Hours after resolution', value: '24h' },
    { label: '3 Days after resolution', value: '72h' },
    { label: '7 Days after resolution', value: '7d' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 pb-24">
      <header className="flex items-center justify-between pb-6 border-b mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">AI Automation Settings</h1>
        <button 
          onClick={() => setRoute(null)} 
          className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inbox
        </button>
      </header>

      {/* General Toggles */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Automation Toggles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AutomationToggle 
            label="Auto-Recovery (New 1-4★ Cases)"
            description="AI automatically sends an immediate, personalized draft response to new negative feedback cases (1-4 stars)."
            isEnabled={localSettings.enabled.autoRecovery}
            onToggle={() => handleToggle('autoRecovery')}
            isPrimary={true}
          />
          <AutomationToggle 
            label="Auto-Win Back (Resolved 1-4★ Cases)"
            description="AI automatically schedules and sends a personal follow-up (Win Back) after a case is resolved."
            isEnabled={localSettings.enabled.autoWinBack}
            onToggle={() => handleToggle('autoWinBack')}
            isPrimary={true}
          />
          <AutomationToggle 
            label="Auto-Referral (5★ Customers)"
            description="AI automatically schedules and sends a personal message to 5-star customers asking for a friend referral."
            isEnabled={localSettings.enabled.autoReferral}
            onToggle={() => handleToggle('autoReferral')}
            isPrimary={true}
          />
        </div>
      </div>

      {/* Message Templates */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Personalized Message Templates</h2>
        <div className="grid grid-cols-1 gap-6">
          {messageBox(
            'autoRecovery', 
            '1. Auto-Recovery Message (1-4★ New Cases)',
            ['[Customer Name]', '[Manager Name]', '[Incentive]'],
            'This message is sent immediately upon receiving a 1-4 star case. Focus on empathy and a concrete solution (like a refund or call) to halt escalation.'
          )}
          {messageBox(
            'autoWinBack', 
            '2. Auto-Win Back Message (1-4★ Resolved Cases)',
            ['[Customer Name]', '[Manager Name]', '[Incentive]'],
            "This message is sent after a case is marked \"Resolved\". It's a check-in to ensure satisfaction and offer a small gesture to bring them back."
          )}
          {messageBox(
            'autoReferral', 
            '3. Auto-Referral Message (5★ Customers)',
            ['[Customer Name]', '[Staff Name]'],
            'This message is sent to 5-star customers. It should be warm and personal, signed by a staff member, and ask for a genuine friend referral.'
          )}
        </div>
      </div>
      
      {/* Scheduling */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Automation Scheduling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutomationScheduleSelect 
            label="Win Back Send Schedule (1-4★)"
            value={localSettings.schedule.winBack}
            onChange={(e) => handleScheduleChange('winBack', e.target.value)}
            options={scheduleOptions}
          />
          <AutomationScheduleSelect 
            label="Referral Send Schedule (5★)"
            value={localSettings.schedule.referral}
            onChange={(e) => handleScheduleChange('referral', e.target.value)}
            options={scheduleOptions}
          />
        </div>
      </div>

      {/* SMS Template Tuner */}
      <SMSTemplateTuner
        smsTemplates={smsTemplates}
        onTemplatesChange={handleSmsTemplatesChange}
      />

      {/* Email Template Tuner */}
      <EmailTemplateTuner
        emailTemplates={emailTemplates}
        onTemplatesChange={handleEmailTemplatesChange}
      />

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-2xl z-10">
        <button 
          onClick={handleSave} 
          className="w-full py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition shadow-lg flex items-center justify-center"
        >
          <Save className="mr-2 h-5 w-5" /> Save Automation Settings
        </button>
      </div>
    </div>
  );
};

