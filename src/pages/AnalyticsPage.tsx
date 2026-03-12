import React from 'react';
import {
  DollarSign,
  Users,
  TrendingUp,
  Truck,
  Heart,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '../components/Card';
import { MetricCard } from '../components/MetricCard';
import { PageHeader } from '../components/PageHeader';
import { weeklyLeads, revenueData, crewUtilization, conversionFunnel, kpiMetrics } from '../data/analytics';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export const AnalyticsPage: React.FC = () => (
  <div className="mx-auto max-w-7xl px-4 py-12">
    <PageHeader
      title="Business Analytics"
      subtitle="Real-time dashboards showing every metric that matters. Make decisions with data, not guesswork."
      badge="Analytics"
    />

    {/* KPIs */}
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        label="Monthly Revenue"
        value={`$${(kpiMetrics.monthlyRevenue / 1000).toFixed(1)}k`}
        change={kpiMetrics.revenueChange}
        icon={<DollarSign className="h-5 w-5" />}
      />
      <MetricCard
        label="Active Leads"
        value={kpiMetrics.activeLeads.toString()}
        change={kpiMetrics.leadsChange}
        icon={<Users className="h-5 w-5" />}
      />
      <MetricCard
        label="Conversion Rate"
        value={`${kpiMetrics.conversionRate}%`}
        change={kpiMetrics.conversionChange}
        icon={<Target className="h-5 w-5" />}
      />
      <MetricCard
        label="Avg Job Value"
        value={`$${kpiMetrics.avgJobValue.toLocaleString()}`}
        change={kpiMetrics.avgJobChange}
        icon={<DollarSign className="h-5 w-5" />}
      />
      <MetricCard
        label="Crew Utilization"
        value={`${kpiMetrics.crewUtilization}%`}
        change={kpiMetrics.utilizationChange}
        icon={<Truck className="h-5 w-5" />}
      />
      <MetricCard
        label="Satisfaction"
        value={`${kpiMetrics.customerSatisfaction}/5`}
        change={kpiMetrics.satisfactionChange}
        icon={<Heart className="h-5 w-5" />}
      />
    </div>

    <div className="grid gap-8 lg:grid-cols-2">
      {/* Revenue chart */}
      <Card>
        <h3 className="mb-4 font-semibold text-gray-900">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Leads chart */}
      <Card>
        <h3 className="mb-4 font-semibold text-gray-900">Leads vs Bookings</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyLeads}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Leads" />
            <Line type="monotone" dataKey="booked" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Booked" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Conversion funnel */}
      <Card>
        <h3 className="mb-4 font-semibold text-gray-900">Conversion Funnel</h3>
        <div className="space-y-3">
          {conversionFunnel.map((stage, i) => {
            const width = (stage.value / conversionFunnel[0].value) * 100;
            const convRate = i > 0
              ? `${Math.round((stage.value / conversionFunnel[i - 1].value) * 100)}%`
              : '100%';
            return (
              <div key={stage.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-700">{stage.stage}</span>
                  <span className="font-medium text-gray-900">{stage.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 flex-1 overflow-hidden rounded-lg bg-gray-100">
                    <div
                      className="flex h-full items-center rounded-lg px-2 text-xs font-medium text-white"
                      style={{ width: `${width}%`, backgroundColor: COLORS[i] }}
                    >
                      {width > 20 && convRate}
                    </div>
                  </div>
                  {width <= 20 && <span className="text-xs text-gray-400">{convRate}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 rounded-lg bg-brand-50 p-3 text-center">
          <p className="text-sm font-medium text-brand-700">
            Overall Conversion: {Math.round((conversionFunnel[3].value / conversionFunnel[0].value) * 100)}%
          </p>
        </div>
      </Card>

      {/* Crew utilization */}
      <Card>
        <h3 className="mb-4 font-semibold text-gray-900">Crew Utilization</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={crewUtilization}
                dataKey="utilization"
                nameKey="crew"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ crew, utilization }) => `${crew}: ${utilization}%`}
              >
                {crewUtilization.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Utilization']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {crewUtilization.map((crew, i) => (
            <div key={crew.crew} className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
              <span className="flex-1 text-sm text-gray-700">{crew.crew} Crew</span>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full" style={{ width: `${crew.utilization}%`, backgroundColor: COLORS[i] }} />
              </div>
              <span className="text-sm font-medium text-gray-900">{crew.utilization}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);
