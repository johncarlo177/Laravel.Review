import React from 'react';
import { ThumbsDown, Handshake, Clock, CheckCircle } from 'lucide-react';
import { WidgetCard } from '../shared/WidgetCard';

interface RecoveryStatsWidgetProps {
  stats: {
    totalNegative: number;
    recoveryRate: number;
    avgResponseTime: number;
    resolvedCount: number;
  };
}

const RecoveryStatCard = ({ title, value, unit, colorClass, icon: Icon }: {
  title: string;
  value: string | number;
  unit?: string;
  colorClass: string;
  icon: React.ElementType;
}) => (
  <div className={`bg-white p-5 rounded-xl shadow-md border-l-4 ${colorClass}`}>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
      <Icon className={`text-xl ${colorClass.replace('border-', 'text-')} opacity-75`} />
    </div>
    <div className="mt-1">
      <p className="text-3xl font-bold text-gray-900">
        {value}
        {unit && <span className="ml-1 text-base font-normal text-gray-600">{unit}</span>}
      </p>
    </div>
  </div>
);

export const RecoveryStatsWidget: React.FC<RecoveryStatsWidgetProps> = ({ stats }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <RecoveryStatCard title="Negative Feedback" value={stats.totalNegative} unit="Tickets" colorClass="border-red-500" icon={ThumbsDown} />
    <RecoveryStatCard title="Recovery Rate" value={stats.recoveryRate} unit="%" colorClass="border-green-500" icon={Handshake} />
    <RecoveryStatCard title="Avg Response Time" value={stats.avgResponseTime} unit="hrs" colorClass="border-blue-500" icon={Clock} />
    <RecoveryStatCard title="Resolved Last Month" value={stats.resolvedCount} unit="Tickets" colorClass="border-yellow-500" icon={CheckCircle} />
  </div>
);

