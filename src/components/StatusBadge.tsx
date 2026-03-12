import React from 'react';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

const variantClasses: Record<Variant, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-rose-50 text-rose-600 border-rose-200',
  info: 'bg-brand-50 text-brand-700 border-brand-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
  purple: 'bg-violet-50 text-violet-600 border-violet-200',
};

interface Props {
  label: string;
  variant: Variant;
  dot?: boolean;
}

export const StatusBadge: React.FC<Props> = ({ label, variant, dot = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
  >
    {dot && (
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'warning' ? 'bg-amber-500' :
          variant === 'danger' ? 'bg-rose-500' :
          variant === 'info' ? 'bg-brand-500' :
          variant === 'purple' ? 'bg-violet-500' :
          'bg-gray-400'
        }`}
      />
    )}
    {label}
  </span>
);
