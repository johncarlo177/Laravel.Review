import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = (import.meta as any).env?.VITE_APP_NAME || 'Review';

// Import pages
import FeedbacksIndex from './pages/feedbacks/index';
import HomePage from './pages/home/index';
import DashboardPage from './pages/dashboard/index';
import LoginPage from './pages/account/login';
import RegisterPage from './pages/account/register';
import GetLiveDemoPage from './pages/getlivedemo/index';
import EcardsPage from './pages/ecards/index';
import PricePage from './pages/price/index.tsx';
import WinBackCalculatorPage from './pages/winback-calulator/index';
import TermsPage from './pages/terms/index';
import WinBackPage from './pages/winback/index';
import AIRecoveryPage from './pages/airecovery/index';

const pages = {
    'feedbacks/index': FeedbacksIndex,
    'home/index': HomePage,
    'dashboard/index': DashboardPage,
    'account/login': LoginPage,
    'account/register': RegisterPage,
    'getlivedemo/index': GetLiveDemoPage,
    'ecards/index': EcardsPage,
    'price/index': PricePage,
    'winback-calulator/index': WinBackCalculatorPage,
    'terms/index': TermsPage,
    'winback/index': WinBackPage,
    'airecovery/index': AIRecoveryPage,
};

createInertiaApp({
    title: (title) => {
        return title ? `${title} - ${appName}` : appName;
    },
    resolve: (name) => {
        // Try direct import first
        if (pages[name]) {
            return pages[name];
        }
        
        // Fallback to glob
        const globPages = (import.meta as any).glob('./pages/**/*.tsx', { eager: true });
        const page = resolvePageComponent(name, globPages);
        
        if (!page) {
            console.error('Page not found:', name);
            console.log('Available pages:', Object.keys(pages), Object.keys(globPages));
        }
        
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

