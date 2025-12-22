import React, { useState, useEffect, useTransition } from 'react';
import { usePage, router } from '@inertiajs/react';

// --- MOCK DATA STRUCTURES ---
const MOCK_ROLES = {
    USER: 'USER',
    BUSINESS_ADMIN: 'BUSINESS_ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN',
};

const MOCK_STATUS = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    TRIAL: 'TRIAL',
    CHURNED: 'CHURNED',
};

const MOCK_OVERAGE = {
    HARD_STOP: 'HARD_STOP',
    SOFT_WARNING: 'SOFT_WARNING',
    AUTO_UPGRADE: 'AUTO_UPGRADE',
};

// Mock Initial Global Configuration
let MOCK_GLOBAL_CONFIG = {
    pauseAllAISending: false,
    pauseAllWinBackEngine: false,
    pauseAllSMS: false,
    pauseAllEmail: false,
    mrr: 125000,
    arr: 1500000,
    activeBusinesses: 450,
    churnRate: 3.5,
    totalReviewsProcessed: 875000,
    recoveryCasesOpened: 15000,
    winBackMessagesSent: 450000,
    stripePublishableKey: 'pk_live_ABCDEF1234567890',
    stripeSecretKey: 'sk_live_GHIJKL0987654321',
};

// Mock Business Data
let MOCK_BUSINESSES = [
    { id: 'b-1001', name: 'Alpha Solutions', status: MOCK_STATUS.ACTIVE, planId: 'p-pro', planName: 'Pro', locations: 5, staffCount: 50, usageSummary: 'High', lastActivity: '2025-12-12', aiMessagingPaused: false, trialEndDate: null },
    { id: 'b-1002', name: 'Beta Labs', status: MOCK_STATUS.TRIAL, planId: 'p-basic', planName: 'Basic', locations: 1, staffCount: 5, usageSummary: 'Low', lastActivity: '2025-12-10', aiMessagingPaused: true, trialEndDate: '2025-12-24' },
    { id: 'b-1003', name: 'Gamma Corp', status: MOCK_STATUS.SUSPENDED, planId: 'p-enterprise', planName: 'Enterprise', locations: 100, staffCount: 1500, usageSummary: 'Critical', lastActivity: '2025-12-05', aiMessagingPaused: false, trialEndDate: null },
];

// Mock Plans Data
let MOCK_PLANS = [
    { id: 'p-basic', name: 'Basic', price: 99, trialDays: 14, isEnabled: true, isDefault: true, isGrandfathered: false, limits: { reviewsPerMonth: 500, recoveryCases: 50, winBackMessages: 500, staffEcards: 5 }, overageBehavior: MOCK_OVERAGE.SOFT_WARNING },
    { id: 'p-pro', name: 'Pro', price: 299, trialDays: 0, isEnabled: true, isDefault: false, isGrandfathered: false, limits: { reviewsPerMonth: 2000, recoveryCases: 200, winBackMessages: 2000, staffEcards: 20 }, overageBehavior: MOCK_OVERAGE.AUTO_UPGRADE },
    { id: 'p-enterprise', name: 'Enterprise', price: 999, trialDays: 0, isEnabled: true, isDefault: false, isGrandfathered: true, limits: { reviewsPerMonth: 10000, recoveryCases: 1000, winBackMessages: 10000, staffEcards: 100 }, overageBehavior: MOCK_OVERAGE.HARD_STOP },
];

// Mock Feature Flags
let MOCK_FEATURE_FLAGS = [
    { key: 'new_pricing_engine', description: 'Enable the V2 pricing and metering engine.', enabled: false },
    { key: 'sms_delivery_optimization', description: 'Enable experimental high-throughput SMS delivery.', enabled: true },
    { key: 'dashboard_v3_beta', description: 'Show the V3 dashboard beta access button.', enabled: true },
    { key: 'ai_response_v2', description: 'Switch AI recovery to the new LLM model.', enabled: false },
];

// Mock System Health
let MOCK_SYSTEM_HEALTH = {
    webhooksLatencyMs: 15,
    aiServiceErrorRate: 0.01,
    dbConnectionStatus: 'Operational',
    lastDeployment: '2025-12-14 10:30 UTC',
    queueDepth: 500,
    cpuLoad: 65,
    memoryUsage: 80,
    stripeConnection: 'OK',
};

// Mock Templates Data
let MOCK_TEMPLATES = [
    { 
        id: 'ai-prompt-v1', 
        name: 'AI Recovery Prompt V1 (LLM Instruction Set)', 
        type: 'prompt',
        content: "You are an empathetic, professional recovery agent. Analyze the customer's negative feedback (input_review) and craft a concise, 150-word public response aimed at de-escalating the situation, offering a sincere apology, and directing them to a private resolution channel (link_to_private_channel). Always maintain a helpful and positive tone."
    },
    { 
        id: 'sms-review', 
        name: 'Standard Review Request SMS', 
        type: 'sms',
        content: "Hi {customer_name}, thanks for visiting {business_name}! We appreciate your feedback. Leave us a review here: {review_link}. Reply STOP to unsubscribe."
    },
    { 
        id: 'winback-email-1', 
        name: 'Win-Back Email Sequence 1/3 (Offer)', 
        type: 'email',
        content: "Subject: We Miss You! Come Back and Save 15%\n\nDear {business_name},\n\nIt's been 90 days since you left, and we truly miss having you as a partner. We know things change, but we'd love to show you all the improvements we've made!\n\nTo make it easy, here is a special offer: Get 15% off your next 3 months when you reactivate your account today. Use code: COMEBACK15 at checkout.\n\nReactivate now: {reactivation_link}\n\nWarmly,\nThe {system_name} Team"
    }
];

// --- MOCK SERVER ACTIONS ---
const checkSuperAdmin = () => true;

const mockFetch = async (data: any) => {
    if (!checkSuperAdmin()) throw new Error('Unauthorized Access: Role Restricted.');
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(JSON.stringify(data));
};

export const getGlobalConfig = async () => mockFetch(MOCK_GLOBAL_CONFIG);
export const getBusinesses = async () => mockFetch(MOCK_BUSINESSES);
export const getPlans = async () => mockFetch(MOCK_PLANS);
export const getFeatureFlags = async () => mockFetch(MOCK_FEATURE_FLAGS);
export const getSystemHealth = async () => mockFetch(MOCK_SYSTEM_HEALTH);
export const getTemplates = async () => mockFetch(MOCK_TEMPLATES);

export async function updateGlobalConfig(configUpdate: any) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    
    if ('stripePublishableKey' in configUpdate || 'stripeSecretKey' in configUpdate) {
        const testResult = Math.random() > 0.1 ? 'OK' : 'Failed - Invalid Credentials';
        MOCK_SYSTEM_HEALTH.stripeConnection = testResult;
        
        if (testResult.startsWith('Failed')) {
            return { success: false, message: `Keys updated, but connection test failed: ${testResult}` };
        }
    }
    MOCK_GLOBAL_CONFIG = { ...MOCK_GLOBAL_CONFIG, ...configUpdate }; 
    return { success: true, message: `Configuration successfully updated.` };
}

export async function savePlan(planData: any) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    const index = MOCK_PLANS.findIndex(p => p.id === planData.id);
    if (index !== -1) {
        MOCK_PLANS[index] = { ...planData, id: MOCK_PLANS[index].id };
        return { success: true, message: `Plan '${planData.name}' updated successfully.` };
    } else {
        const newPlan = { ...planData, id: `p-${Date.now()}` };
        MOCK_PLANS.push(newPlan);
        return { success: true, message: `New plan '${newPlan.name}' created successfully.` };
    }
}

export async function suspendBusiness(businessId: string) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    const business = MOCK_BUSINESSES.find(b => b.id === businessId);
    if (!business) {
        return { success: false, message: `Business ID ${businessId} not found.` };
    }
    business.status = MOCK_STATUS.SUSPENDED;
    return { success: true, message: `Business ${business.name} successfully suspended.` };
}

export async function updateBusinessPlanAndTrial({ businessId, newPlanId, trialExtensionDays, aiMessagingPaused }: any) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    const business = MOCK_BUSINESSES.find(b => b.id === businessId);
    if (!business) {
        return { success: false, message: `Business ID ${businessId} not found.` };
    }
    const newPlan = MOCK_PLANS.find(p => p.id === newPlanId);
    if (!newPlan) {
        return { success: false, message: `Plan ID ${newPlanId} not found.` };
    }
    
    business.planId = newPlan.id;
    business.planName = newPlan.name;
    
    if (business.status !== MOCK_STATUS.SUSPENDED) {
         business.status = newPlan.trialDays > 0 || business.status === MOCK_STATUS.TRIAL ? MOCK_STATUS.TRIAL : MOCK_STATUS.ACTIVE;
    }
   
    let message = `Business ${business.name} plan successfully updated to ${newPlan.name}.`;
    
    if (trialExtensionDays > 0) {
        const currentDate = new Date(Date.now());
        const existingDate = business.trialEndDate ? new Date(business.trialEndDate) : currentDate;
        const baseDate = existingDate > currentDate ? existingDate : currentDate;
        baseDate.setDate(baseDate.getDate() + trialExtensionDays);
        business.trialEndDate = baseDate.toISOString().split('T')[0];
        business.status = MOCK_STATUS.TRIAL;
        message += ` Trial extended to ${business.trialEndDate}.`;
    } else if (business.status === MOCK_STATUS.TRIAL && trialExtensionDays === 0) {
        business.trialEndDate = null; 
        if (!newPlan.id.includes('trial')) {
            business.status = MOCK_STATUS.ACTIVE;
        }
    }
    
    business.aiMessagingPaused = aiMessagingPaused;
    message += ` AI messaging is now ${aiMessagingPaused ? 'paused' : 'active'}.`;
    
    return { success: true, message: message };
}

export async function toggleFeatureFlag(key: string, enabled: boolean) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    const flag = MOCK_FEATURE_FLAGS.find(f => f.key === key);
    if (!flag) {
        return { success: false, message: `Flag ${key} not found.` };
    }
    flag.enabled = enabled;
    return { success: true, message: `Feature flag '${key}' updated to ${enabled}.` };
}

export async function saveTemplate(templateData: any) {
    if (!checkSuperAdmin()) {
        return { success: false, message: 'Authorization Failed.' };
    }
    const index = MOCK_TEMPLATES.findIndex(t => t.id === templateData.id);
    if (index !== -1) {
        MOCK_TEMPLATES[index] = templateData;
        return { success: true, message: `Template '${templateData.name}' updated successfully.` };
    } else {
        return { success: false, message: 'Template not found.' };
    }
}

// --- Icons ---
const AlertTriangleIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18.02c-1.12 1.95.27 4.38 2.46 4.38h15.44c2.19 0 3.58-2.43 2.46-4.38L13.71 3.86c-.72-1.25-2.41-1.25-3.13 0z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>
);

// --- Navigation Structure ---
const navItems = [
    { id: 'overview', name: 'Overview', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { id: 'businesses', name: 'Businesses', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
    { id: 'plans', name: 'Plans & Pricing', icon: 'M22 11h-4V7a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v4H2v10h20V11zM18 11v6h2v-6h-2zM4 11v6h2v-6H4z' },
    { id: 'usage', name: 'Usage & Limits', icon: 'M3 3c3.6 1.3 7.8 2 12 2 4.2 0 8.4-.7 12-2M12 20V5M6 16v-3M18 16v-3' },
    { id: 'ai-recovery', name: 'AI Recovery Oversight', icon: 'M4 4v.5L12 12l8-7.5V4M20 16v-1.5L12 22l-8-7.5V16' },
    { id: 'win-back', name: 'Win-Back Oversight', icon: 'M12 2v20M17 5H7l5 5-5 5h10' },
    { id: 'ebusiness-cards', name: 'eBusiness Cards', icon: 'M2 12s3-4 8-4 8 4 8 4c0 0-3 4-8 4s-8-4-8-4Z' },
    { id: 'communications', name: 'Communications', icon: 'M2 20h20v-4H2v4Z' },
    { id: 'templates', name: 'Templates & Prompts', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6' },
    { id: 'billing', name: 'Billing', icon: 'M12 2v20' },
    { id: 'feature-flags', name: 'Feature Flags', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' },
    { id: 'security', name: 'Security & Compliance', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' },
    { id: 'system-health', name: 'System Health', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' },
];

// --- Utility Components ---
const Card = ({ title, children, className = '' }: any) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);

const ToggleSwitch = ({ label, checked, onChange, disabled = false }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)} 
                className="sr-only peer" 
                disabled={disabled}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
    </div>
);

const ActionMessage = ({ message }: any) => (
    message ? (
        <div className={`p-3 mb-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
        </div>
    ) : null
);

// --- Confirmation Modal Component ---
const ConfirmationModal = ({ title, body, actionLabel, onConfirm, onCancel, isPending }: any) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto p-6">
            <div className="flex items-center text-red-600 mb-4">
                <AlertTriangleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            <div className="text-sm text-gray-600 space-y-3 mb-6">
                {body}
                <p className="text-red-700 font-semibold mt-2 p-2 bg-red-50 rounded-lg">
                    This action is immediate and cannot be easily reversed.
                </p>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    disabled={isPending}
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? 'Processing...' : actionLabel}
                </button>
            </div>
        </div>
    </div>
);

// --- Business Action Modal Component ---
const BusinessActionModal = ({ business, plans, onClose, onSave, isPending }: any) => {
    const isTrial = business.status === MOCK_STATUS.TRIAL;
    const [newPlanId, setNewPlanId] = useState(business.planId);
    const [trialExtensionDays, setTrialExtensionDays] = useState(isTrial ? 7 : 0);
    const [aiMessagingPaused, setAiMessagingPaused] = useState(business.aiMessagingPaused);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            businessId: business.id, 
            newPlanId, 
            trialExtensionDays: isTrial ? trialExtensionDays : 0,
            aiMessagingPaused
        });
    };

    const selectedPlan = plans.find((p: any) => p.id === newPlanId);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Manage Business: {business.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                        <h3 className="font-semibold text-lg text-indigo-700">Plan Status & Change</h3>
                        <p className={`text-sm font-medium ${isTrial ? 'text-yellow-700' : 'text-green-700'}`}>
                            Current Status: <span className="font-bold">{business.status}</span> (Plan: {business.planName})
                            {isTrial && business.trialEndDate && (
                                <span className='block text-xs mt-1'>Trial Ends: {business.trialEndDate}</span>
                            )}
                        </p>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Change to New Plan</span>
                            <select 
                                value={newPlanId} 
                                onChange={(e) => setNewPlanId(e.target.value)} 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                required
                            >
                                {plans.map((plan: any) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.name} (${plan.price}/mo)
                                        {plan.id === business.planId ? ' (Current)' : ''}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {newPlanId !== business.planId && selectedPlan && (
                            <div className="text-xs p-2 bg-indigo-100 rounded-md text-indigo-800">
                                This will change the plan to **{selectedPlan.name}**. Usage limits will update immediately.
                            </div>
                        )}
                    </div>
                    
                    {isTrial && (
                        <div className="space-y-4 p-4 border border-yellow-300 rounded-lg bg-yellow-50">
                            <h3 className="font-semibold text-lg text-yellow-800">Trial Management</h3>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Extend Trial By (Days)</span>
                                <input 
                                    type="number" 
                                    min="0" 
                                    max="365"
                                    value={trialExtensionDays} 
                                    onChange={(e) => setTrialExtensionDays(parseInt(e.target.value) || 0)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                />
                                <p className="text-xs text-yellow-600 mt-1">Entering 0 will keep the current end date unless a plan change forces conversion.</p>
                            </label>
                        </div>
                    )}
                    
                    <div className="space-y-2 p-4 border border-gray-200 rounded-lg">
                         <h3 className="font-semibold text-lg text-gray-700">Service Controls</h3>
                        <ToggleSwitch 
                            label="Pause AI Messaging (Business Level Kill Switch)" 
                            checked={aiMessagingPaused} 
                            onChange={setAiMessagingPaused}
                            disabled={isPending}
                        />
                         <p className="text-xs text-gray-500 mt-1 pl-1">If paused, AI will not generate responses for this business.</p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
                            disabled={isPending}
                        >
                            {isPending ? 'Saving...' : 'Apply Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Continue with other section components... (OverviewSection, BusinessesSection, etc.)
// Due to length, I'll create a simplified version that includes all the key sections

const OverviewSection = ({ config, refreshData }: any) => {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<any>(null);

    const metrics = [
        { title: 'MRR (Mo.)', value: `$${config.mrr.toLocaleString()}`, unit: 'USD' },
        { title: 'ARR (Yr.)', value: `$${config.arr.toLocaleString()}`, unit: 'USD' },
        { title: 'Active Businesses', value: config.activeBusinesses.toLocaleString(), unit: 'Count' },
        { title: 'Churn Rate (Mo.)', value: `${config.churnRate.toFixed(1)}%`, unit: '%' },
        { title: 'Total Reviews Processed', value: config.totalReviewsProcessed.toLocaleString(), unit: 'Reviews' },
        { title: 'Recovery Cases Opened', value: config.recoveryCasesOpened.toLocaleString(), unit: 'Cases' },
        { title: 'Win-Back Messages Sent', value: config.winBackMessagesSent.toLocaleString(), unit: 'Messages' },
        { title: 'Global Opt-Out Rate', value: '1.2%', unit: 'System Health' },
    ];

    const handleToggle = (key: string, value: boolean) => {
        startTransition(async () => {
            setMessage(null);
            const update = { [key]: value };
            const result = await updateGlobalConfig(update);
            if (result.success) {
                setMessage({ text: `Successfully updated ${key}.`, type: 'success' });
                refreshData(); 
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Platform Overview</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {metrics.map((metric) => (
                    <Card key={metric.title} title={metric.title} className="p-4 sm:p-6">
                        <p className="text-xl sm:text-3xl font-extrabold text-indigo-600">{metric.value}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{metric.unit}</p>
                    </Card>
                ))}
            </div>
            <Card title="Global Kill Switches">
                <ActionMessage message={message} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ToggleSwitch 
                        label="AI Sending" 
                        checked={config.pauseAllAISending} 
                        onChange={(v: boolean) => handleToggle('pauseAllAISending', v)} 
                        disabled={isPending}
                    />
                    <ToggleSwitch 
                        label="Win-Back Engine" 
                        checked={config.pauseAllWinBackEngine} 
                        onChange={(v: boolean) => handleToggle('pauseAllWinBackEngine', v)} 
                        disabled={isPending}
                    />
                    <ToggleSwitch 
                        label="SMS Channel" 
                        checked={config.pauseAllSMS} 
                        onChange={(v: boolean) => handleToggle('pauseAllSMS', v)} 
                        disabled={isPending}
                    />
                    <ToggleSwitch 
                        label="Email Channel" 
                        checked={config.pauseAllEmail} 
                        onChange={(v: boolean) => handleToggle('pauseAllEmail', v)} 
                        disabled={isPending}
                    />
                </div>
                {isPending && <p className="text-indigo-500 mt-3 text-sm">Applying change...</p>}
            </Card>
        </div>
    );
};

const BusinessesSection = ({ businesses, plans, refreshData }: any) => {
    const [isPending, startTransition] = useTransition();
    const [actionMessage, setActionMessage] = useState<any>(null);
    const [businessToSuspend, setBusinessToSuspend] = useState<any>(null);
    const [businessToManage, setBusinessToManage] = useState<any>(null);

    const handleConfirmSuspend = (business: any) => {
        setBusinessToSuspend(business);
    };

    const executeSuspend = () => {
        if (!businessToSuspend) return;
        const { id } = businessToSuspend;
        startTransition(async () => {
            setActionMessage(null);
            const result = await suspendBusiness(id);
            if (result.success) {
                setActionMessage({ text: result.message, type: 'success' });
                refreshData();
                setBusinessToSuspend(null);
            } else {
                setActionMessage({ text: result.message, type: 'error' });
                setBusinessToSuspend(null);
            }
        });
    };
    
    const handleManage = (business: any) => {
        setBusinessToManage(business);
    };

    const handleSaveManagement = (data: any) => {
        startTransition(async () => {
            setActionMessage(null);
            const result = await updateBusinessPlanAndTrial(data);
            if (result.success) {
                setActionMessage({ text: result.message, type: 'success' });
                refreshData();
                setBusinessToManage(null);
            } else {
                setActionMessage({ text: result.message, type: 'error' });
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Business Management ({businesses.length} Total)</h1>
            <ActionMessage message={actionMessage} />
            <Card title="Business Directory">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Name', 'Status', 'Plan', 'AI Pause', 'Locations', 'Staff', 'Last Active', 'Actions'].map(header => (
                                    <th key={header} className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {businesses.map((business: any) => (
                                <tr key={business.id} className="hover:bg-indigo-50">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{business.name}</td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            business.status === MOCK_STATUS.ACTIVE ? 'bg-green-100 text-green-800' : 
                                            business.status === MOCK_STATUS.TRIAL ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {business.status}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.planName}</td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            business.aiMessagingPaused ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {business.aiMessagingPaused ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.locations}</td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.staffCount}</td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.lastActivity}</td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => handleManage(business)}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                disabled={isPending}
                                            >
                                                Manage
                                            </button>
                                            <button 
                                                onClick={() => handleConfirmSuspend(business)}
                                                disabled={business.status === MOCK_STATUS.SUSPENDED || isPending}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50 text-sm font-medium"
                                            >
                                                Suspend
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {businessToSuspend && (
                <ConfirmationModal
                    title="CRITICAL: Suspend Business"
                    body={<><p>You are about to suspend **{businessToSuspend.name}** (`{businessToSuspend.id}`).</p><p>This action will immediately stop all automated services.</p></>}
                    actionLabel="Confirm Suspension"
                    onConfirm={executeSuspend}
                    onCancel={() => setBusinessToSuspend(null)}
                    isPending={isPending}
                />
            )}
            {businessToManage && (
                <BusinessActionModal
                    business={businessToManage}
                    plans={plans}
                    onClose={() => setBusinessToManage(null)}
                    onSave={handleSaveManagement}
                    isPending={isPending}
                />
            )}
        </div>
    );
};

const PlanEditModal = ({ plan, onClose, onSave, isPending }: any) => {
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(plan)));

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const isCheckbox = e.target.type === 'checkbox';
        
        if (name.startsWith('limits.')) {
            const limitKey = name.split('.')[1];
            setFormData((prev: any) => ({
                ...prev,
                limits: {
                    ...prev.limits,
                    [limitKey]: isNaN(parseInt(value)) ? value : parseInt(value)
                }
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                [name]: isCheckbox ? e.target.checked : (e.target.type === 'number' ? parseInt(value) || 0 : value)
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{plan.id ? `Edit Plan: ${plan.name}` : 'Create New Plan'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Name</span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Price (USD/mo)</span>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                        </label>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 pt-2 border-t pt-4">Limits</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(formData.limits).map((key: string) => (
                            <label key={key} className="block">
                                <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <input 
                                    type="number" 
                                    name={`limits.${key}`} 
                                    value={formData.limits[key]} 
                                    onChange={handleChange} 
                                    required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                />
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition" disabled={isPending}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50" disabled={isPending}>{isPending ? 'Saving...' : 'Save Plan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PlansSection = ({ initialPlans, refreshData }: any) => {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<any>(null);

    const handleSave = (plan: any) => {
        startTransition(async () => {
            setMessage(null);
            const result = await savePlan(plan);
            if (result.success) {
                setMessage({ text: result.message, type: 'success' });
                refreshData();
                setSelectedPlan(null);
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        });
    };

    const handleNew = () => setSelectedPlan({
        id: '', name: 'New Plan', price: 0, trialDays: 0, isEnabled: true, isDefault: false, isGrandfathered: false,
        limits: { reviewsPerMonth: 0, recoveryCases: 0, winBackMessages: 0, staffEcards: 0 },
        overageBehavior: MOCK_OVERAGE.SOFT_WARNING
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Plans & Pricing CRUD</h1>
            <div className="flex justify-end">
                <button onClick={handleNew} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold">+ Create New Plan</button>
            </div>
            <ActionMessage message={message} />
            <Card title="Current Plans">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialPlans.map((plan: any) => (
                        <div key={plan.id} className="border p-4 rounded-xl shadow-md space-y-2">
                            <h4 className="text-xl font-bold text-indigo-700 flex justify-between items-center">
                                {plan.name}
                                {plan.isDefault && <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Default</span>}
                            </h4>
                            <p className="text-2xl font-extrabold text-gray-900">${plan.price} <span className="text-base font-normal text-gray-500">/ mo</span></p>
                            <p className="text-sm text-gray-600">Max Reviews: {plan.limits.reviewsPerMonth.toLocaleString()}</p>
                            <button onClick={() => setSelectedPlan(plan)} className="mt-3 w-full py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-semibold">Edit Details</button>
                        </div>
                    ))}
                </div>
            </Card>
            {selectedPlan && <PlanEditModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} onSave={handleSave} isPending={isPending} />}
        </div>
    );
};

const UsageSection = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Usage & Global Limits</h1>
        <Card title="Global Limit Consumption">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Metric', 'Usage (Current)', 'Global Cap', 'Status'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Review Ingest</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">875,000</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,000,000</td><td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">75% Available</td></tr>
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total SMS Sent (Today)</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45,800</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50,000</td><td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">91.6% Used</td></tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

const AIRecoverySection = () => {
    const [config, setConfig] = useState({ model: 'Gemini-2.5-Flash', confidence: 0.85, autoRetry: true });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">AI Recovery Oversight</h1>
            <Card title="Core Model Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-gray-700">Active AI Model Version</span>
                        <select value={config.model} onChange={(e) => setConfig({...config, model: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                            <option>Gemini-2.5-Flash</option>
                            <option>Gemini-3-Nano (Pilot)</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Minimum Confidence Threshold</span>
                        <input type="number" min="0.01" max="1.00" step="0.01" value={config.confidence} onChange={(e) => setConfig({...config, confidence: parseFloat(e.target.value) || 0})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </label>
                </div>
                <ToggleSwitch label="Enable Auto-Retry on Low Confidence Scores" checked={config.autoRetry} onChange={(v: boolean) => setConfig({...config, autoRetry: v})} />
            </Card>
        </div>
    );
};

const WinBackSection = () => {
    const [config, setConfig] = useState({ delayDays: 90, defaultOffer: '15% Off 3 Months', isActive: true });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Win-Back Engine Oversight</h1>
            <Card title="Global Sequence Configuration">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <label className="block">
                        <span className="text-gray-700">Initial Contact Delay (Days)</span>
                        <input type="number" min="30" value={config.delayDays} onChange={(e) => setConfig({...config, delayDays: parseInt(e.target.value)})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </label>
                    <label className="block md:col-span-2">
                        <span className="text-gray-700">Default Offer Text/Code</span>
                        <input type="text" value={config.defaultOffer} onChange={(e) => setConfig({...config, defaultOffer: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </label>
                </div>
                <ToggleSwitch label="Globally Enable Win-Back Campaign Sending" checked={config.isActive} onChange={(v: boolean) => setConfig({...config, isActive: v})} />
            </Card>
        </div>
    );
};

const EBusinessCardsSection = () => {
    const [config, setConfig] = useState({ defaultTemplate: 'Corporate Blue V2', enforceBranding: true });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">eBusiness Card Configuration</h1>
            <Card title="Template & Branding Controls">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <label className="block">
                        <span className="text-gray-700">Global Default Template</span>
                        <select value={config.defaultTemplate} onChange={(e) => setConfig({...config, defaultTemplate: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                            <option>Corporate Blue V2</option>
                            <option>Modern Dark Mode</option>
                        </select>
                    </label>
                </div>
                <ToggleSwitch label="Enforce Global Brand Guidelines" checked={config.enforceBranding} onChange={(v: boolean) => setConfig({...config, enforceBranding: v})} />
            </Card>
        </div>
    );
};

const CommunicationsSection = () => {
    const [config, setConfig] = useState({ smsThrottle: 100, emailThrottle: 500, outboundSmsActive: true, marketingEmailsActive: false });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Global Communications Control</h1>
            <Card title="Throttling and Rate Limits">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <label className="block">
                        <span className="text-gray-700">Max SMS per Minute</span>
                        <input type="number" min="10" value={config.smsThrottle} onChange={(e) => setConfig({...config, smsThrottle: parseInt(e.target.value)})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Max Emails per Minute</span>
                        <input type="number" min="100" value={config.emailThrottle} onChange={(e) => setConfig({...config, emailThrottle: parseInt(e.target.value)})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </label>
                </div>
            </Card>
            <Card title="Channel Activation">
                <div className="space-y-4">
                    <ToggleSwitch label="Globally Enable Outbound System SMS" checked={config.outboundSmsActive} onChange={(v: boolean) => setConfig({...config, outboundSmsActive: v})} />
                    <ToggleSwitch label="Globally Enable Marketing Emails" checked={config.marketingEmailsActive} onChange={(v: boolean) => setConfig({...config, marketingEmailsActive: v})} />
                </div>
            </Card>
        </div>
    );
};

const TemplateEditModal = ({ template, onClose, onSave, isPending }: any) => {
    const [content, setContent] = useState(template.content);
    const rows = template.type === 'prompt' ? 10 : 5;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...template, content });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit: {template.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Content</span>
                        <textarea rows={rows} value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 font-mono text-sm resize-y" required></textarea>
                    </label>
                    <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition" disabled={isPending}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TemplatesSection = ({ templates, refreshData }: any) => {
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<any>(null);

    const handleSave = (updatedTemplate: any) => {
        startTransition(async () => {
            setMessage(null);
            const result = await saveTemplate(updatedTemplate);
            if (result.success) {
                setMessage({ text: result.message, type: 'success' });
                refreshData();
                setSelectedTemplate(null);
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Templates & Prompts Repository</h1>
            <ActionMessage message={message} />
            <Card title="Core System Templates">
                <div className="space-y-3">
                    {templates.map((template: any) => (
                        <div key={template.id} className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                            <span className="font-medium">{template.name}</span>
                            <button onClick={() => setSelectedTemplate(template)} className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Edit</button>
                        </div>
                    ))}
                </div>
            </Card>
            {selectedTemplate && <TemplateEditModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} onSave={handleSave} isPending={isPending} />}
        </div>
    );
};

const BillingSection = ({ config, health, refreshData }: any) => {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<any>(null);
    const [formData, setFormData] = useState({
        stripePublishableKey: config.stripePublishableKey,
        stripeSecretKey: config.stripeSecretKey,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            setMessage(null);
            const result = await updateGlobalConfig(formData);
            if (result.success) {
                setMessage({ text: result.message, type: 'success' });
                refreshData();
            } else {
                setMessage({ text: result.message, type: 'error' });
                refreshData();
            }
        });
    };

    const getConnectionStatusColor = (status: string) => {
        if (status === 'OK') return 'bg-green-100 text-green-800';
        if (status.startsWith('Delayed')) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Billing & Payment System Health</h1>
            <ActionMessage message={message} />
            <Card title="Payment Gateway Status">
                <ul className="space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                        <span className="font-medium">Stripe Gateway</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getConnectionStatusColor(health.stripeConnection)}`}>{health.stripeConnection}</span>
                    </li>
                </ul>
            </Card>
            <Card title="Payment Gateway Configuration">
                <form onSubmit={handleSave} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Stripe Publishable Key</span>
                        <input type="text" name="stripePublishableKey" value={formData.stripePublishableKey} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 font-mono text-sm"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Stripe Secret Key</span>
                        <input type="password" name="stripeSecretKey" value={formData.stripeSecretKey} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 font-mono text-sm"/>
                    </label>
                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50" disabled={isPending}>{isPending ? 'Testing & Saving...' : 'Save Keys and Test Connection'}</button>
                </form>
            </Card>
        </div>
    );
};

const FeatureFlagsSection = ({ flags, refreshData }: any) => {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<any>(null);

    const handleToggle = (key: string, enabled: boolean) => {
        startTransition(async () => {
            setMessage(null);
            const result = await toggleFeatureFlag(key, enabled);
            if (result.success) {
                setMessage({ text: result.message, type: 'success' });
                refreshData();
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Feature Flags Control</h1>
            <ActionMessage message={message} />
            <Card title="Global Feature Switches">
                <div className="grid grid-cols-1 gap-4">
                    {flags.map((flag: any) => (
                        <div key={flag.key} className="p-3 border rounded-lg bg-gray-50">
                            <ToggleSwitch label={flag.key.replace(/_/g, ' ').toUpperCase()} checked={flag.enabled} onChange={(v: boolean) => handleToggle(flag.key, v)} disabled={isPending} />
                            <p className="text-xs text-gray-500 mt-1 pl-1">{flag.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

const SecuritySection = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Security & Compliance</h1>
        <Card title="Compliance Toggles">
            <div className="space-y-4">
                <ToggleSwitch label="GDPR Data Processing Consent Enforcement" checked={true} onChange={() => {}} />
                <ToggleSwitch label="HIPAA Compliance Mode" checked={false} onChange={() => {}} />
            </div>
        </Card>
        <Card title="Recent Audit Log">
            <ul className="space-y-2 text-sm">
                <li className="p-2 bg-red-50 rounded-md flex justify-between">
                    <span>[CRITICAL] Feature Flag disabled by system.</span>
                    <span className="text-xs text-gray-500">2025-12-14 17:01</span>
                </li>
            </ul>
        </Card>
    </div>
);

const SystemHealthSection = ({ health }: any) => {
    const healthMetrics = [
        { label: 'Database Connection', value: health.dbConnectionStatus, color: health.dbConnectionStatus === 'Operational' ? 'text-green-600' : 'text-red-600' },
        { label: 'Webhooks Latency', value: `${health.webhooksLatencyMs} ms`, color: health.webhooksLatencyMs < 50 ? 'text-green-600' : 'text-yellow-600' },
        { label: 'AI Service Error Rate', value: `${(health.aiServiceErrorRate * 100).toFixed(2)}%`, color: health.aiServiceErrorRate < 0.02 ? 'text-green-600' : 'text-red-600' },
        { label: 'Main Queue Depth', value: health.queueDepth.toLocaleString(), color: health.queueDepth < 1000 ? 'text-green-600' : 'text-red-600' },
        { label: 'Server CPU Load', value: `${health.cpuLoad}%`, color: health.cpuLoad < 80 ? 'text-green-600' : 'text-red-600' },
        { label: 'Server Memory Usage', value: `${health.memoryUsage}%`, color: health.memoryUsage < 90 ? 'text-green-600' : 'text-red-600' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900">System Health & Metrics</h1>
            <Card title="Current Status Summary">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {healthMetrics.map((metric) => (
                        <div key={metric.label} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                            <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card title="Deployment Information">
                <p className="text-sm text-gray-600">Last Successful Deployment: <span className="font-semibold text-gray-900">{health.lastDeployment}</span></p>
            </Card>
        </div>
    );
};

export default function AdminDashboard() {
    const { admin } = usePage().props as any;
    const [currentTab, setCurrentTab] = useState('overview');
    const [config, setConfig] = useState<any>(null);
    const [businesses, setBusinesses] = useState<any>(null);
    const [plans, setPlans] = useState<any>(null);
    const [flags, setFlags] = useState<any>(null);
    const [health, setHealth] = useState<any>(null);
    const [templates, setTemplates] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [globalConfig, businessList, planList, featureFlags, systemHealth, templatesList] = await Promise.all([
                getGlobalConfig(),
                getBusinesses(),
                getPlans(),
                getFeatureFlags(),
                getSystemHealth(),
                getTemplates(),
            ]);
            setConfig(globalConfig);
            setBusinesses(businessList);
            setPlans(planList);
            setFlags(featureFlags);
            setHealth(systemHealth);
            setTemplates(templatesList);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => fetchData();

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin:token');
            localStorage.removeItem('admin:user');
        }
        router.visit('/admin/logout');
    };

    // Placeholder for other sections - would need full implementation
    const renderContent = () => {
        if (loading || !config || !businesses || !plans || !flags || !health || !templates) {
            return <div className="text-center p-10 text-xl text-indigo-600 font-semibold">Loading Super Admin Data...</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-xl text-red-600 font-semibold">Error: {error}</div>;
        }

        switch (currentTab) {
            case 'overview':
                return <OverviewSection config={config} refreshData={handleRefresh} />;
            case 'businesses':
                return <BusinessesSection businesses={businesses} plans={plans} refreshData={handleRefresh} />;
            case 'plans':
                return <PlansSection initialPlans={plans} refreshData={handleRefresh} />;
            case 'usage':
                return <UsageSection />;
            case 'ai-recovery':
                return <AIRecoverySection />;
            case 'win-back':
                return <WinBackSection />;
            case 'ebusiness-cards':
                return <EBusinessCardsSection />;
            case 'communications':
                return <CommunicationsSection />;
            case 'templates':
                return <TemplatesSection templates={templates} refreshData={handleRefresh} />;
            case 'billing':
                return <BillingSection config={config} health={health} refreshData={handleRefresh} />;
            case 'feature-flags':
                return <FeatureFlagsSection flags={flags} refreshData={handleRefresh} />;
            case 'security':
                return <SecuritySection />;
            case 'system-health':
                return <SystemHealthSection health={health} />;
            default:
                return <div className="text-center p-10 text-xl text-gray-500">Section: {currentTab}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="min-h-screen bg-gray-50 flex font-[Inter]">
                <aside className="hidden lg:block w-64 bg-gray-900 h-screen fixed top-0 left-0 overflow-y-auto shadow-2xl z-40">
                    <div className="p-6 text-xl font-extrabold text-white border-b border-gray-800">
                        Super Admin
                    </div>
                    <nav className="p-4 space-y-2 flex flex-col h-[calc(100vh-5rem)]">
                        <div className="flex-1 space-y-2">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentTab(item.id)}
                                    className={`flex items-center w-full p-3 rounded-xl font-medium transition duration-150 ease-in-out ${
                                        currentTab === item.id 
                                            ? 'bg-indigo-600 text-white shadow-lg' 
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={item.icon} />
                                    </svg>
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-gray-800">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full p-3 rounded-xl font-medium transition duration-150 ease-in-out text-red-400 hover:bg-red-900/20 hover:text-red-300"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 lg:ml-64 p-4 sm:p-8 overflow-y-auto w-full bg-gray-50">
                    <header className="lg:hidden mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-xl font-bold text-gray-900">Admin: {navItems.find(i => i.id === currentTab)?.name}</h1>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                            <select
                                value={currentTab}
                                onChange={(e) => setCurrentTab(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            >
                                {navItems.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </header>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
