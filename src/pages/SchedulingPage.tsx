import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Truck as TruckIcon } from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';
import { crews, scheduledJobs } from '../data/crews';

const getWeekDates = (offset: number) => {
  const today = new Date(2026, 2, 16); // March 16, 2026 (Monday)
  today.setDate(today.getDate() + offset * 7);
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

const formatDate = (d: Date) => d.toISOString().split('T')[0];
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SchedulingPage: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = getWeekDates(weekOffset);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader
        title="Crew Scheduling"
        subtitle="Assign jobs to crews, manage your fleet, and see everything at a glance. No more whiteboard chaos."
        badge="Operations"
      />

      {/* Crew cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {crews.map((crew) => {
          const jobCount = scheduledJobs.filter((j) => j.crewId === crew.id).length;
          return (
            <Card key={crew.id} hover>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: crew.color }} />
                <div>
                  <p className="font-semibold text-gray-900">{crew.name}</p>
                  <p className="text-xs text-gray-400">{crew.truck}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {crew.members.length} members
                </span>
                <span className="flex items-center gap-1">
                  <TruckIcon className="h-3.5 w-3.5" /> {jobCount} jobs scheduled
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {crew.members.map((m) => (
                  <span key={m.id} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {m.name.split(' ')[0]}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Calendar header */}
      <Card padding={false}>
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-gray-900">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} –{' '}
            {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 divide-x divide-gray-100">
          {weekDates.map((date, i) => {
            const dateStr = formatDate(date);
            const dayJobs = scheduledJobs.filter((j) => j.date === dateStr);
            const isToday = dateStr === '2026-03-16';
            return (
              <div key={i} className="min-h-[200px]">
                <div
                  className={`border-b border-gray-100 px-2 py-2 text-center text-xs ${
                    isToday ? 'bg-brand-50 font-bold text-brand-700' : 'text-gray-500'
                  }`}
                >
                  <p>{dayNames[i]}</p>
                  <p className={`text-lg ${isToday ? 'text-brand-700' : 'text-gray-900'}`}>
                    {date.getDate()}
                  </p>
                </div>
                <div className="space-y-1.5 p-1.5">
                  {dayJobs.map((job) => {
                    const crew = crews.find((c) => c.id === job.crewId);
                    return (
                      <div
                        key={job.id}
                        className="cursor-pointer rounded-lg border p-2 text-xs transition-shadow hover:shadow-md"
                        style={{ borderLeftColor: crew?.color, borderLeftWidth: 3 }}
                      >
                        <p className="font-semibold text-gray-900 truncate">{job.customerName}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-gray-400">
                          <Clock className="h-3 w-3" /> {job.startTime}–{job.endTime}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-gray-400 truncate">
                          <MapPin className="h-3 w-3" /> {job.origin}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming jobs list */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Jobs</h3>
        <div className="space-y-3">
          {scheduledJobs.map((job) => {
            const crew = crews.find((c) => c.id === job.crewId);
            return (
              <Card key={job.id} hover>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full" style={{ backgroundColor: crew?.color }} />
                    <div>
                      <p className="font-semibold text-gray-900">{job.customerName}</p>
                      <p className="text-sm text-gray-500">{job.homeSize} • {job.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.startTime}–{job.endTime}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.origin} → {job.destination}</span>
                    <StatusBadge label={crew?.name || ''} variant="info" />
                    <StatusBadge label={job.status} variant={job.status === 'completed' ? 'success' : job.status === 'in_progress' ? 'warning' : 'neutral'} dot />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
