import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = (import.meta as any).env?.VITE_APP_NAME || 'Review';

// Import pages
import FeedbacksIndex from './pages/feedbacks/index';
import HomePage from './pages/home/index';
import DashboardPage from './pages/dashboard/index';

const pages = {
    'feedbacks/index': FeedbacksIndex,
    'home/index': HomePage,
    'dashboard/index': DashboardPage,
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

