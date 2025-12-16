import React, { useState, useCallback } from 'react';

// Define the primary brand color for consistency
const PRIMARY_BLUE = '#3b82f6'; // Tailwind blue-500

// --- MOCK DATA for Team Members ---
const initialTeamMembers = [
    { id: 1, name: 'Ava Johnson (You)', email: 'ava@example.com', role: 'Owner', active: true },
    { id: 2, name: 'Ben Smith', email: 'ben@example.com', role: 'Manager', active: true },
    { id: 3, name: 'Chris Lee', email: 'chris@example.com', role: 'Staff', active: true },
    { id: 4, name: 'Dana Fox', email: 'dana@example.com', role: 'Staff', active: false },
];

const AVAILABLE_ROLES = ['Manager', 'Staff'];

// --- Reusable Component: Radio Group Selector ---
const RadioSelector = ({ label, options, selected, onChange, name, helperText = null }) => (
    <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
            {options.map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={selected === option}
                        onChange={() => onChange(option)}
                        className={`h-4 w-4 text-white border-gray-300 focus:ring-4 focus:ring-opacity-50 rounded-full transition duration-200`}
                        style={{ color: PRIMARY_BLUE, borderColor: PRIMARY_BLUE }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
            ))}
        </div>
        {helperText && <p className="text-xs text-gray-500 mt-2 ml-1">{helperText}</p>}
    </div>
);

// --- Reusable Component: Input Field ---
const InputField = ({ label, value, onChange, type = 'text', readOnly = false, helperText = null }) => (
    <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className={`w-full p-3 border rounded-lg focus:ring-2 transition duration-150 ${
                readOnly 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200 shadow-inner' 
                : 'bg-white border-gray-300 shadow-sm focus:border-transparent'
            }`}
            style={{ 
                '--tw-ring-color': PRIMARY_BLUE, 
                '--tw-ring-opacity': '0.5' 
            } as React.CSSProperties}
        />
        {helperText && <p className="text-xs text-gray-500 mt-1 ml-1">{helperText}</p>}
    </div>
);

// --- Reusable Component: Toggle Switch ---
const ToggleSwitch = ({ label, enabled, onToggle, id }) => (
    <label htmlFor={id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition duration-150">
        <span className="text-base font-semibold text-gray-700">{label}</span>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
                type="checkbox"
                name={id}
                id={id}
                checked={enabled}
                onChange={(e) => onToggle(e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <div 
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition duration-200`}
                style={{ backgroundColor: enabled ? PRIMARY_BLUE : '#d1d5db' }} // gray-300 when off
            ></div>
        </div>
        <style dangerouslySetInnerHTML={{
            __html: `
                #${id}.toggle-checkbox:checked {
                    right: 0;
                    border-color: ${PRIMARY_BLUE};
                }
                #${id}.toggle-checkbox {
                    transition: right 0.2s ease-in-out, border-color 0.2s ease-in-out;
                    right: 40%;
                }
            `
        }} />
    </label>
);

// --- Reusable Component: Settings Section Card ---
const SettingsCard = ({ icon, title, children }) => (
    <div className="bg-white shadow-xl rounded-xl p-6 mb-8 border-t-4 border-l-2 border-gray-100" style={{ borderTopColor: PRIMARY_BLUE }}>
        <h2 className="flex items-center text-2xl font-extrabold text-gray-800 mb-4 pb-3 border-b border-gray-200">
            <span className="text-3xl mr-3">{icon}</span>
            {title}
        </h2>
        <div>{children}</div>
    </div>
);

// --- Template Editor Component ---
const PLACEHOLDERS_RECOVERY = '{CustomerName}, {Rating}, {CaseID}';
const PLACEHOLDERS_WINBACK = '{CustomerName}, {IncentiveCode}'; 

const TemplateEditor = ({ title, content, onContentChange, placeholderList, type }) => {
    const rows = type === 'sms' ? 4 : 8;
    return (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-inner">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{title} Content</label>
            <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                rows={rows}
                className="w-full p-2 border rounded-md text-sm resize-y focus:ring-2 focus:ring-opacity-50 transition duration-150"
                style={{ 
                    '--tw-ring-color': PRIMARY_BLUE, 
                    '--tw-ring-opacity': '0.5',
                    minHeight: rows * 1.5 + 'em'
                } as React.CSSProperties}
            />
            <p className="text-xs text-gray-500 mt-2">
                Available Placeholders: <span className="font-mono text-xs text-gray-700">{placeholderList}</span>
            </p>
        </div>
    );
};

// --- Main Application Component ---
export const OwnerSettings: React.FC = () => {
    // Initial state based on the provided requirements
    const [settings, setSettings] = useState({
        business: {
            name: 'Neviane AI Shop',
            location: 'New York, NY',
            phone: '555-1234',
            email: 'owner@neviane.com',
        },
        automation: {
            level: 'Fully Automatic (Recommended)', 
            aiRecovery: true, 
            recoveryWinBack: true, 
            dormantWinBack: true, 
            referrals: true, 
        },
        recoveryBehavior: 'Balanced', 
        escalation: {
            stars: '1–2★',
            notifySMS: true,
            notifyEmail: true,
        },
        winBack: {
            postIssueEnabled: true, 
            inactiveCheckInEnabled: true, 
            postIssueDays: '2 days', 
            inactiveDays: '60 days',
            incentivesEnabled: false, 
            incentiveType: 'None',
        },
        communication: {
            smsSenderName: 'NEVIANE-AI',
            emailFromName: 'Neviane Notifications',
            replyToEmail: 'support@neviane.com',
        },
        templates: {
            aiRecovery: {
                email: "Subject: Important Update Regarding Your Recent Feedback ({Rating})\n\nDear {CustomerName},\n\nWe appreciate you taking the time to share your experience (Case ID: {CaseID}). We are actively reviewing the details. Our team will follow up shortly with a resolution. Thank you for your patience.",
                sms: "Hello {CustomerName}. We received your feedback ({Rating}, Case ID: {CaseID}) and are working on a resolution. We'll be in touch soon.",
            },
            winBack: {
                email: "Subject: We Miss You at Neviane AI Shop! Special Offer Inside.\n\nDear {CustomerName},\n\nIt's been a while since your last interaction. We value your business and wanted to check in. To welcome you back, enjoy an exclusive offer: {IncentiveCode}. Click here to view it!",
                sms: "Hi {CustomerName}. We missed you! Use code {IncentiveCode} for a special offer. Come back soon!",
            },
        },
        qrCode: {
            defaultAction: 'Feedback & Rating',
            staffCardsEnabled: true,
        },
    });
    
    // UI State
    const [isTemplatesCollapsed, setIsTemplatesCollapsed] = useState(true);
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteMessage, setInviteMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Universal handler for updating nested state
    const updateSetting = useCallback((group: string, key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [group]: {
                ...prev[group as keyof typeof prev],
                [key]: value,
            }
        }));
    }, []);

    const updateTemplate = useCallback((engine: string, type: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            templates: {
                ...prev.templates,
                [engine]: {
                    ...prev.templates[engine as keyof typeof prev.templates],
                    [type]: value,
                }
            }
        }));
    }, []);
    
    // Handler for Incentive ON/OFF
    const toggleIncentives = (isEnabled: boolean) => {
        updateSetting('winBack', 'incentivesEnabled', isEnabled);
        if (!isEnabled) {
            updateSetting('winBack', 'incentiveType', 'None');
        } else if (settings.winBack.incentiveType === 'None') {
            updateSetting('winBack', 'incentiveType', '% Off');
        }
    };
    
    // --- Team Management Handlers (Simplified for Immersive) ---
    const handleInvite = () => {
        if (!inviteEmail || !inviteEmail.includes('@')) {
            setInviteMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        if (teamMembers.some(member => member.email === inviteEmail)) {
            setInviteMessage({ type: 'error', text: `${inviteEmail} is already a team member.` });
            return;
        }

        const newMember = {
            id: Date.now(),
            name: 'Pending Invitation',
            email: inviteEmail,
            role: 'Staff', 
            active: true,
        };

        setTeamMembers(prev => [...prev, newMember]);
        setInviteEmail('');
        setInviteMessage({ type: 'success', text: `Invitation sent to ${inviteEmail} (Default Role: Staff).` });
        setTimeout(() => setInviteMessage(null), 3000);
    };

    const handleMemberUpdate = (id: number, key: string, value: any) => {
        setTeamMembers(prev => 
            prev.map(member => 
                member.id === id ? { ...member, [key]: value } : member
            )
        );
        setInviteMessage({ type: 'success', text: `Member details updated successfully.` });
        setTimeout(() => setInviteMessage(null), 3000);
    };

    const handleSave = () => {
        console.log("Saving Final Settings:", settings);
        const statusMessage = document.getElementById('status-message');
        if (statusMessage) {
            statusMessage.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative shadow-md" role="alert">Settings updated successfully!</div>`;
            setTimeout(() => statusMessage.innerHTML = '', 3000);
        }
    };
    
    const handleCancel = () => {
        console.log("Changes discarded (User chose Cancel).");
        const statusMessage = document.getElementById('status-message');
        if (statusMessage) {
            statusMessage.innerHTML = `<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg relative shadow-md" role="alert">Changes discarded.</div>`;
            setTimeout(() => statusMessage.innerHTML = '', 3000);
        }
    };

    // --- Team Access Modal Component ---
    const TeamAccessModal = () => {
        if (!isTeamModalOpen) return null;

        return (
            // Backdrop
            <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-70 flex justify-center items-start pt-10 sm:items-center sm:pt-0" onClick={() => setIsTeamModalOpen(false)}>
                
                {/* Modal Content */}
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center" style={{ borderBottomColor: PRIMARY_BLUE }}>
                        <h3 className="text-xl font-bold text-gray-800">Manage Team Access</h3>
                        <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full transition duration-150">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        {inviteMessage && (
                            <div className={`p-3 rounded-lg text-sm ${inviteMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {inviteMessage.text}
                            </div>
                        )}
                        
                        {/* Invite Section */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h4 className="font-semibold text-lg mb-3">Invite New Member</h4>
                            <InputField
                                label="Email Address"
                                type="email"
                                value={inviteEmail}
                                onChange={setInviteEmail}
                                helperText="New members receive an invitation link and default to 'Staff' role."
                            />
                            <button 
                                onClick={handleInvite} 
                                className="w-full px-4 py-2 text-white font-medium rounded-lg shadow-md transition duration-150 hover:opacity-90 mt-2"
                                style={{ backgroundColor: PRIMARY_BLUE }}
                            >
                                Send Invitation
                            </button>
                        </div>

                        {/* Current Members List */}
                        <div>
                            <h4 className="font-semibold text-lg mb-3 border-b pb-2">Current Members ({teamMembers.length})</h4>
                            <div className="space-y-4">
                                {teamMembers.map(member => (
                                    <div key={member.id} className={`p-4 rounded-lg border shadow-sm ${member.active ? 'bg-white' : 'bg-red-50'}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`font-semibold ${!member.active ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                {member.name}
                                            </span>
                                            {member.active && member.role !== 'Owner' && (
                                                <select
                                                    value={member.role}
                                                    onChange={(e) => handleMemberUpdate(member.id, 'role', e.target.value)}
                                                    className="p-1 border rounded text-sm bg-gray-50 focus:ring-1"
                                                    style={{ borderColor: PRIMARY_BLUE }}
                                                >
                                                    {AVAILABLE_ROLES.map(role => (
                                                        <option key={role} value={role}>{role}</option>
                                                    ))}
                                                </select>
                                            )}
                                            {!member.active && <span className="text-red-600 font-medium text-sm">Deactivated</span>}
                                            {member.role === 'Owner' && <span className="text-xs font-bold text-gray-600 px-2 py-1 bg-gray-200 rounded-full">OWNER</span>}
                                        </div>
                                        <div className="text-sm text-gray-500 mb-3">{member.email}</div>

                                        {member.role !== 'Owner' && (
                                            <button 
                                                onClick={() => handleMemberUpdate(member.id, 'active', !member.active)}
                                                className={`text-xs px-3 py-1 rounded-full transition duration-150 ${
                                                    member.active 
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                }`}
                                            >
                                                {member.active ? 'Deactivate Account' : 'Reactivate Account'}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button 
                                onClick={() => setIsTeamModalOpen(false)} 
                                className="w-full px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150"
                            >
                                Done (Close)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <header className="mb-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900">Owner Settings</h1>
                <p className="text-gray-500 mt-1">Global platform configuration for Neviane AI Shop.</p>
            </header>
            
            <div id="status-message" className="sticky top-4 z-50 mb-6 max-w-4xl mx-auto"></div>

            {/* Added pb-24 to ensure scroll space above fixed footer */}
            <div className="max-w-4xl mx-auto pb-24"> 
                
                {/* 🏢 Business Identity */}
                <SettingsCard icon="🏢" title="Business Identity">
                    <InputField
                        label="Business Name"
                        value={settings.business.name}
                        onChange={(v) => updateSetting('business', 'name', v)}
                    />
                    <InputField
                        label="Primary Location"
                        value={settings.business.location}
                        onChange={(v) => updateSetting('business', 'location', v)}
                    />
                    <InputField
                        label="Public Phone"
                        value={settings.business.phone}
                        onChange={(v) => updateSetting('business', 'phone', v)}
                        type="tel"
                    />
                    <InputField
                        label="Public Email"
                        value={settings.business.email}
                        onChange={(v) => updateSetting('business', 'email', v)}
                        type="email"
                    />
                </SettingsCard>

                {/* 🤖 Automation Level */}
                <SettingsCard icon="🤖" title="Automation Level">
                    {/* Automation Level Radio Selector */}
                    <RadioSelector
                        label="Automation Mode"
                        name="automation-level"
                        options={['Fully Automatic (Recommended)', 'Review Before Sending', 'Manual Only']}
                        selected={settings.automation.level}
                        onChange={(v) => updateSetting('automation', 'level', v)}
                        helperText="Controls how much AI intervention is allowed without owner confirmation."
                    />
                    
                    {/* Individual Controls */}
                    <label className="block text-sm font-semibold text-gray-700 mb-3 mt-4 pt-4 border-t border-gray-200">Controls</label>
                    <div className="space-y-3">
                        {[{ label: 'AI Recovery', key: 'aiRecovery' }, 
                          { label: 'Recovery Win-Back', key: 'recoveryWinBack' }, 
                          { label: 'Dormant Win-Back', key: 'dormantWinBack' },
                          { label: 'Referrals', key: 'referrals' }].map(({ label, key }) => (
                            <ToggleSwitch
                                key={key}
                                label={label}
                                id={`toggle-${key}`}
                                enabled={settings.automation[key as keyof typeof settings.automation]}
                                onToggle={(e) => updateSetting('automation', key, e)}
                            />
                        ))}
                    </div>
                </SettingsCard>
                
                {/* 💬 Recovery Behavior */}
                <SettingsCard icon="💬" title="Recovery Behavior">
                    <RadioSelector
                        label="Response Style"
                        name="response-style"
                        options={['Conservative', 'Balanced', 'Aggressive']}
                        selected={settings.recoveryBehavior}
                        onChange={(v) => setSettings(prev => ({ ...prev, recoveryBehavior: v }))}
                        helperText="Balanced is the default. Aggressive is proactive with solution offerings."
                    />
                </SettingsCard>

                {/* 🚨 Escalation Rules */}
                <SettingsCard icon="🚨" title="Escalation Rules">
                    <RadioSelector
                        label="Escalate when rating is"
                        name="escalate-stars"
                        options={['1★ only', '1–2★', '1–3★']}
                        selected={settings.escalation.stars}
                        onChange={(v) => updateSetting('escalation', 'stars', v)}
                    />
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Notify via:</label>
                        <div className="flex gap-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.escalation.notifySMS}
                                    onChange={(e) => updateSetting('escalation', 'notifySMS', e.target.checked)}
                                    className="h-4 w-4 text-white border-gray-300 rounded focus:ring-primary-blue"
                                    style={{ color: PRIMARY_BLUE } as React.CSSProperties}
                                />
                                <span className="ml-2 text-sm text-gray-700">SMS</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.escalation.notifyEmail}
                                    onChange={(e) => updateSetting('escalation', 'notifyEmail', e.target.checked)}
                                    className="h-4 w-4 text-white border-gray-300 rounded focus:ring-primary-blue"
                                    style={{ color: PRIMARY_BLUE } as React.CSSProperties}
                                />
                                <span className="ml-2 text-sm text-gray-700">Email</span>
                            </label>
                        </div>
                    </div>
                </SettingsCard>

                {/* 🔁 Customer Return (Win-Back) */}
                <SettingsCard icon="🔁" title="Customer Return (Win-Back)">
                    <div className="space-y-6">
                        {/* Post-Issue Follow-Up */}
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                            <ToggleSwitch
                                label="Post-Issue Follow-Up Enabled"
                                id="postIssueToggle"
                                enabled={settings.winBack.postIssueEnabled}
                                onToggle={(e) => updateSetting('winBack', 'postIssueEnabled', e)}
                            />
                            <div className="mt-4">
                                <RadioSelector
                                    label="Send after:"
                                    name="post-issue-delay"
                                    options={['2 days', '5 days', '7 days']}
                                    selected={settings.winBack.postIssueDays}
                                    onChange={(v) => updateSetting('winBack', 'postIssueDays', v)}
                                    helperText="Time delay before the AI sends a check-in message after a support case is closed."
                                />
                            </div>
                        </div>

                        {/* Inactive Customer Check-In */}
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                            <ToggleSwitch
                                label="Inactive Customer Check-In Enabled"
                                id="inactiveCheckInToggle"
                                enabled={settings.winBack.inactiveCheckInEnabled}
                                onToggle={(e) => updateSetting('winBack', 'inactiveCheckInEnabled', e)}
                            />
                            <div className="mt-4">
                                <RadioSelector
                                    label="Mark inactive after:"
                                    name="inactive-detection"
                                    options={['30 days', '60 days', '90 days', '180 days']}
                                    selected={settings.winBack.inactiveDays}
                                    onChange={(v) => updateSetting('winBack', 'inactiveDays', v)}
                                    helperText="Period of no interaction required to classify a customer as 'inactive'."
                                />
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Send</label>
                                <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <span className="text-sm font-medium text-gray-700">One message only</span>
                                    <p className="text-xs text-gray-500 mt-1">System is restricted to one follow-up message per customer per trigger.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SettingsCard>
                
                {/* 🎁 Incentives */}
                <SettingsCard icon="🎁" title="Incentives">
                    {/* Incentives ON/OFF */}
                    <div className="mb-6">
                        <ToggleSwitch
                            label="Incentives Enabled (OFF by default)"
                            id="incentivesEnabledToggle"
                            enabled={settings.winBack.incentivesEnabled}
                            onToggle={toggleIncentives}
                        />
                    </div>

                    {/* Incentive Selection */}
                    <RadioSelector
                        label="If ON, choose ONE:"
                        name="incentive-type"
                        options={['% Off', 'Free item', 'Credit', 'None']}
                        selected={settings.winBack.incentiveType}
                        onChange={(v) => updateSetting('winBack', 'incentiveType', v)}
                        helperText="Only one incentive type can be active at a time for win-back campaigns."
                    />
                </SettingsCard>

                {/* ✉️ Communication Identity */}
                <SettingsCard icon="✉️" title="Communication Identity">
                    {/* Identity Fields */}
                    <InputField
                        label="SMS Sender Name"
                        value={settings.communication.smsSenderName}
                        onChange={(v) => updateSetting('communication', 'smsSenderName', v)}
                        helperText="Max 11 characters."
                    />
                    <InputField
                        label="Email From Name"
                        value={settings.communication.emailFromName}
                        onChange={(v) => updateSetting('communication', 'emailFromName', v)}
                    />
                    <InputField
                        label="Reply-To Email"
                        value={settings.communication.replyToEmail}
                        onChange={(v) => updateSetting('communication', 'replyToEmail', v)}
                        type="email"
                    />
                    <InputField
                        label="Opt-out text"
                        value="Auto-added (locked)"
                        onChange={() => {}} 
                        readOnly={true}
                    />

                    {/* Communication Templates (Collapsed Section) */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <button 
                            onClick={() => setIsTemplatesCollapsed(!isTemplatesCollapsed)}
                            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-150"
                        >
                            <span className="text-base font-extrabold text-gray-800">
                                Communication Templates
                            </span>
                            <svg className={`w-5 h-5 transition-transform duration-300`} style={{ transform: isTemplatesCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', color: PRIMARY_BLUE }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {!isTemplatesCollapsed && (
                            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-6">
                                
                                {/* AI Recovery Templates */}
                                <div className="border-b pb-4 border-gray-300">
                                    <h4 className="font-bold text-lg text-gray-700 mb-3">AI Recovery Templates (Low Rating Follow-Up)</h4>
                                    <TemplateEditor
                                        title="Email"
                                        type="email"
                                        content={settings.templates.aiRecovery.email}
                                        onContentChange={(v) => updateTemplate('aiRecovery', 'email', v)}
                                        placeholderList={PLACEHOLDERS_RECOVERY}
                                    />
                                    <TemplateEditor
                                        title="SMS"
                                        type="sms"
                                        content={settings.templates.aiRecovery.sms}
                                        onContentChange={(v) => updateTemplate('aiRecovery', 'sms', v)}
                                        placeholderList={PLACEHOLDERS_RECOVERY}
                                    />
                                </div>

                                {/* Win-Back Templates */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-700 mb-3">Win-Back Templates (Inactive Customer Check-In)</h4>
                                    <TemplateEditor
                                        title="Email"
                                        type="email"
                                        content={settings.templates.winBack.email}
                                        onContentChange={(v) => updateTemplate('winBack', 'email', v)}
                                        placeholderList={PLACEHOLDERS_WINBACK}
                                    />
                                    <TemplateEditor
                                        title="SMS"
                                        type="sms"
                                        content={settings.templates.winBack.sms}
                                        onContentChange={(v) => updateTemplate('winBack', 'sms', v)}
                                        placeholderList={PLACEHOLDERS_WINBACK}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </SettingsCard>

                {/* 👥 Team Access */}
                <SettingsCard icon="👥" title="Team Access">
                    <div className="text-sm text-gray-600 mb-4">
                        <p className="font-semibold mb-2">Predefined Roles:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Owner (Full Access)</li>
                            <li>Manager (Reporting & Oversight)</li>
                            <li>Staff (Case Interaction Only)</li>
                        </ul>
                    </div>
                    <button 
                        onClick={() => setIsTeamModalOpen(true)}
                        className="px-5 py-2 text-white text-base font-semibold rounded-lg shadow-md transition duration-150 hover:shadow-lg" 
                        style={{ backgroundColor: PRIMARY_BLUE }}
                    >
                        View / Invite / Edit Team Members
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Role permissions are predefined and not customizable from here.</p>
                </SettingsCard>
                
                {/* 📎 QR Codes & eBusiness Cards */}
                <SettingsCard icon="📎" title="QR Codes & eBusiness Cards">
                    <RadioSelector
                        label="Default QR Action"
                        name="qr-action"
                        options={['Feedback & Rating', 'Contact Card']}
                        selected={settings.qrCode.defaultAction}
                        onChange={(v) => updateSetting('qrCode', 'defaultAction', v)}
                        helperText="Determines the default destination when a customer scans a general QR code."
                    />
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <ToggleSwitch
                            label="Staff eBusiness Cards Enabled"
                            id="staffCardsEnabledToggle"
                            enabled={settings.qrCode.staffCardsEnabled}
                            onToggle={(e) => updateSetting('qrCode', 'staffCardsEnabled', e)}
                        />
                        <p className="text-xs text-gray-500 mt-2 ml-1">Allows individual staff to generate and share personalized contact/feedback QR codes.</p>
                    </div>
                </SettingsCard>
                
                {/* Sticky Action Bar (Fixed at bottom) */}
                <div 
                    className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl border-t border-gray-200 flex justify-center sm:justify-end space-x-4 z-50"
                >
                    <button
                        onClick={handleCancel}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150 shadow-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 text-white font-semibold rounded-lg shadow-xl transition duration-150 transform hover:scale-[1.01]"
                        style={{ backgroundColor: PRIMARY_BLUE }}
                    >
                        Save All Settings
                    </button>
                </div>
            </div>
            
            <TeamAccessModal />
        </div>
    );
};
