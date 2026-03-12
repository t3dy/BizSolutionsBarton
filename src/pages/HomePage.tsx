import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  MessageSquare,
  Users,
  Calendar,
  UserCircle,
  Star,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/Card';

const features = [
  {
    icon: Calculator,
    title: 'Instant Quote Calculator',
    description: 'Let customers get accurate estimates in seconds. Capture leads 24/7 without manual follow-up.',
    to: '/quote',
    color: 'text-brand-600 bg-brand-50',
  },
  {
    icon: MessageSquare,
    title: 'AI Moving Assistant',
    description: 'An intelligent chatbot that qualifies leads, answers questions, and generates quotes automatically.',
    to: '/assistant',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: Users,
    title: 'Lead Dashboard',
    description: 'Track every lead from first contact to booked job. Never lose a customer in the shuffle.',
    to: '/leads',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Calendar,
    title: 'Crew Scheduling',
    description: 'Assign crews, manage trucks, and optimize your schedule. See everything at a glance.',
    to: '/scheduling',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: UserCircle,
    title: 'Customer Portal',
    description: 'Give customers a branded portal to track their move, view documents, and manage payments.',
    to: '/portal',
    color: 'text-rose-600 bg-rose-50',
  },
  {
    icon: Star,
    title: 'Review Automation',
    description: 'Automatically request reviews after every move. Build your online reputation on autopilot.',
    to: '/reviews',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Real-time dashboards showing leads, revenue, crew utilization, and growth trends.',
    to: '/analytics',
    color: 'text-brand-600 bg-brand-50',
  },
];

const problems = [
  'Leads slip through the cracks because they\'re tracked in spreadsheets or sticky notes',
  'Customers call during off-hours and you lose the job to a competitor who answers faster',
  'Crew scheduling is a whiteboard nightmare, especially during peak season',
  'You have no idea which marketing channels actually bring in booked jobs',
  'Getting Google reviews feels like pulling teeth',
];

export const HomePage: React.FC = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-4 py-24 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-200 backdrop-blur-sm">
          Built for Moving Companies
        </span>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Software that helps movers{' '}
          <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
            book more jobs
          </span>{' '}
          and run smoother
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-200">
          Stop losing leads. Stop double-booking crews. Start growing your moving company with tools
          designed specifically for your business.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105"
          >
            See it in action <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View all solutions
          </Link>
        </div>
      </div>
    </section>

    {/* Social proof */}
    <section className="border-b border-gray-200 bg-white px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> SOC 2 Compliant
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5" /> 99.9% Uptime
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> 40% More Bookings
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-400" /> 4.9/5 Customer Rating
        </div>
      </div>
    </section>

    {/* Problem */}
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sound familiar?
        </h2>
        <p className="mt-3 text-center text-gray-500">
          Most moving companies run into the same problems as they grow.
        </p>
        <div className="mt-10 space-y-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
              <p className="text-gray-700">{problem}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-medium text-brand-700">
          We solve all of these. Let us show you how.
        </p>
      </div>
    </section>

    {/* Features grid */}
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Everything you need to grow
        </h2>
        <p className="mt-3 text-center text-gray-500">
          A complete platform built specifically for moving companies.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.to} to={feature.to}>
                <Card hover className="h-full">
                  <div className={`mb-4 inline-flex rounded-lg p-2.5 ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600">
                    Try demo <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-brand-700 px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to modernize your moving company?
        </h2>
        <p className="mt-4 text-lg text-brand-200">
          Let&apos;s discuss which solutions make sense for your business. No pressure, just a conversation
          about where software can save you time and make you money.
        </p>
        <Link
          to="/solutions"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105"
        >
          View pricing tiers <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-400">
      <p>MovePro Demo — Built for Barton Springs Moving</p>
      <p className="mt-1">This is an interactive prototype demonstrating custom software solutions.</p>
    </footer>
  </div>
);
