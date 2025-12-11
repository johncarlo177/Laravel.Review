import React from 'react';
import { BRAND_COLOR } from '../../data/constants';

interface ButtonCardProps {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
  className?: string;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({ title, icon: Icon, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`dashboard-button-card flex flex-col items-center justify-center p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-blue-700 hover:bg-blue-800 text-white border-0 font-semibold ${className} cursor-pointer active:scale-[0.98]`}
    style={{ minHeight: '140px', padding: '1.5rem' }}
  >
    <Icon className="text-4xl mb-3 text-white" strokeWidth={1.5} />
    <p className="text-lg font-semibold text-white m-0">{title}</p>
  </button>
);

