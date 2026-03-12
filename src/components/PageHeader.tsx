import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  badge?: string;
}

export const PageHeader: React.FC<Props> = ({ title, subtitle, badge }) => (
  <div className="mb-8">
    {badge && (
      <span className="mb-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
        {badge}
      </span>
    )}
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    <p className="mt-2 text-gray-500">{subtitle}</p>
  </div>
);
