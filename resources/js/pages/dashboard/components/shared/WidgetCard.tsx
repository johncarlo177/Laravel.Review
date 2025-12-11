import React from 'react';

interface WidgetCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
  unit?: string;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ title, value, icon: Icon, color = 'text-blue-600', unit = '' }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-gray-200 hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-center">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className={`${color} text-2xl`} />
    </div>
    <p className="mt-1 text-3xl font-extrabold text-gray-900">{value}{unit}</p>
  </div>
);

