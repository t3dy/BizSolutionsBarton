import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Eye, MoreHorizontal, Plus } from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';
import { leads, type LeadStatus } from '../data/leads';

const statusConfig: Record<LeadStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple' }> = {
  new: { label: 'New', variant: 'info' },
  quoted: { label: 'Quoted', variant: 'purple' },
  booked: { label: 'Booked', variant: 'success' },
  follow_up: { label: 'Follow Up', variant: 'warning' },
  lost: { label: 'Lost', variant: 'danger' },
};

const statusCounts = {
  all: leads.length,
  new: leads.filter((l) => l.status === 'new').length,
  quoted: leads.filter((l) => l.status === 'quoted').length,
  booked: leads.filter((l) => l.status === 'booked').length,
  follow_up: leads.filter((l) => l.status === 'follow_up').length,
  lost: leads.filter((l) => l.status === 'lost').length,
};

export const LeadsPage: React.FC = () => {
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = leads
    .filter((l) => filter === 'all' || l.status === filter)
    .filter((l) =>
      search === '' ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.origin.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader
        title="Lead Dashboard"
        subtitle="Track every lead from first contact to booked job. Never let a customer fall through the cracks."
        badge="CRM"
      />

      {/* KPI cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {(Object.keys(statusCounts) as (LeadStatus | 'all')[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              filter === key ? 'border-brand-300 bg-brand-50' : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <p className="text-sm capitalize text-gray-500">
              {key === 'all' ? 'All Leads' : key === 'follow_up' ? 'Follow Up' : key}
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{statusCounts[key]}</p>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <Card padding={false}>
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-3">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, origin, or destination..."
            className="flex-1 border-0 bg-transparent text-sm focus:outline-none"
          />
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700">
            <Plus className="h-3.5 w-3.5" /> Add Lead
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">
                  <button className="flex items-center gap-1">Customer <ArrowUpDown className="h-3 w-3" /></button>
                </th>
                <th className="px-5 py-3 font-medium">Move Date</th>
                <th className="px-5 py-3 font-medium">Origin</th>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Size</th>
                <th className="px-5 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const cfg = statusConfig[lead.status];
                return (
                  <tr key={lead.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-400">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{lead.moveDate}</td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-[160px] truncate">{lead.origin}</td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-[160px] truncate">{lead.destination}</td>
                    <td className="px-5 py-3.5 text-gray-600">{lead.homeSize}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">${lead.estimatedValue.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge label={cfg.label} variant={cfg.variant} dot />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
          <span>Showing {filtered.length} of {leads.length} leads</span>
          <span>Page 1 of 1</span>
        </div>
      </Card>
    </div>
  );
};
