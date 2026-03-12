import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface Props {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<Props> = ({ label, value, change, icon }) => (
  <Card>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="rounded-lg bg-brand-50 p-2.5 text-brand-600">
        {icon}
      </div>
    </div>
    <div className="mt-3 flex items-center gap-1 text-sm">
      {change >= 0 ? (
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-rose-500" />
      )}
      <span className={change >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
      <span className="text-gray-400">vs last month</span>
    </div>
  </Card>
);
