import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<Props> = ({ children, className = '', padding = true, hover = false, style }) => (
  <div
    style={style}
    className={`rounded-xl border border-gray-200 bg-white shadow-sm ${
      padding ? 'p-6' : ''
    } ${hover ? 'transition-shadow hover:shadow-md' : ''} ${className}`}
  >
    {children}
  </div>
);
