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
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${BRAND_COLOR} text-white ${className}`}
  >
    <Icon className="text-3xl mb-3" />
    <p className="text-lg font-semibold">{title}</p>
  </button>
);

