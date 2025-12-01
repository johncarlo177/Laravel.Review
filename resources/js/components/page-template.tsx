import React from 'react';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface PageAction {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
}

export interface PageTemplateProps {
  title: string;
  description: string;
  url: string;
  actions?: PageAction[];
  children: ReactNode;
  noPadding?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageTemplate({ 
  title,
  description, 
  url, 
  actions, 
  children, 
  noPadding = false,
  breadcrumbs
}: PageTemplateProps) {
  const pageBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    {
      title,
      href: url,
    },
  ];

  return (
    <>
      <Head title={title} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Enhanced Header */}
        <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumbs */}
            {pageBreadcrumbs && pageBreadcrumbs.length > 0 && (
              <nav className="mb-4">
                <ol className="flex items-center space-x-2 text-sm">
                  {pageBreadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                      {crumb.href ? (
                        <a href={crumb.href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                          {crumb.title}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{crumb.title}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            
            {/* Title and Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {title}
                </h1>
                {description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
                )}
              </div>
              {actions && actions.length > 0 && (
                <div className="flex gap-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={noPadding ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}>
          {children}
        </div>
      </div>
    </>
  );
}

