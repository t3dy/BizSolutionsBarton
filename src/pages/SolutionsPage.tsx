import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Calculator,
  MessageSquare,
  Users,
  Calendar,
  UserCircle,
  Star,
  BarChart3,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

/* ── à la carte solutions ── */
interface Solution {
  id: string;
  icon: React.FC<{ className?: string }>;
  name: string;
  tagline: string;
  price: string;
  monthly: string;
  buildTime: string;
  demoTo: string;
  color: string;
  iconBg: string;
  features: string[];
  timeSaved: string;
  moneySaved: string;
  roiDetail: string;
}

const solutions: Solution[] = [
  {
    id: 'website',
    icon: Globe,
    name: 'Modern Website Redesign',
    tagline: 'Replace your dated brochure site with a fast, mobile-first site that converts visitors into leads.',
    price: '$1,500',
    monthly: '$49/mo',
    buildTime: '2–3 weeks',
    demoTo: '/',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Responsive, mobile-optimized design',
      'SEO-optimized pages & meta tags',
      'Google Business Profile setup',
      'Fast load times (< 2s)',
      'Hosted & maintained for you',
    ],
    timeSaved: '5+ hrs/week',
    moneySaved: '+$3,000–6,000/mo revenue',
    roiDetail:
      'A modern site converts 2–3× more visitors into quote requests. If your current site gets 800 visits/month and converts at 3%, that\'s 24 leads. A redesigned site converting at 7% gives you 56 leads — 32 extra leads/month. At a 40% close rate and $2,000 avg job, that\'s $25,600 more per month.',
  },
  {
    id: 'quote',
    icon: Calculator,
    name: 'Instant Quote Calculator',
    tagline: 'Let customers get a ballpark estimate in 60 seconds — and capture their info automatically.',
    price: '$900',
    monthly: '$29/mo',
    buildTime: '1–2 weeks',
    demoTo: '/quote',
    color: 'border-emerald-300',
    iconBg: 'bg-emerald-50 text-emerald-600',
    features: [
      'Embeds on your existing website',
      'Customizable pricing logic',
      'Auto-captures lead info (name, email, phone)',
      'Email notification on every submission',
      'Mobile-friendly form',
    ],
    timeSaved: '8–10 hrs/week',
    moneySaved: '+$4,000–8,000/mo revenue',
    roiDetail:
      'You currently spend 15–20 min on every phone quote. The calculator handles the initial estimate instantly, 24/7. Customers who get an instant quote are 3× more likely to book vs. those who have to wait for a callback. Expect 2–4 extra bookings/month from after-hours submissions alone.',
  },
  {
    id: 'ai',
    icon: MessageSquare,
    name: 'AI Moving Assistant',
    tagline: 'A smart chatbot on your site that qualifies leads, answers FAQs, and generates quotes at 2 AM.',
    price: '$2,000',
    monthly: '$59/mo',
    buildTime: '2–3 weeks',
    demoTo: '/assistant',
    color: 'border-violet-300',
    iconBg: 'bg-violet-50 text-violet-600',
    features: [
      'Natural conversation about their move',
      'Extracts structured data (origin, size, date)',
      'Generates quotes in real time',
      'Answers common questions (insurance, packing, timing)',
      'Sends lead data to your dashboard or email',
    ],
    timeSaved: '10–15 hrs/week',
    moneySaved: '+$5,000–12,000/mo revenue',
    roiDetail:
      'The average moving company misses 40–60% of after-hours inquiries. An AI assistant captures those leads instantly. It also pre-qualifies customers so your team only talks to serious buyers. Companies using AI chat see a 35% increase in booked jobs within 90 days.',
  },
  {
    id: 'leads',
    icon: Users,
    name: 'Lead Management Dashboard',
    tagline: 'Stop tracking leads in spreadsheets. See every customer\'s status at a glance.',
    price: '$1,800',
    monthly: '$49/mo',
    buildTime: '2–3 weeks',
    demoTo: '/leads',
    color: 'border-amber-300',
    iconBg: 'bg-amber-50 text-amber-600',
    features: [
      'Pipeline view: New → Quoted → Booked → Completed',
      'Search, filter, and sort leads',
      'Notes and follow-up reminders',
      'Auto-import from quote calculator & AI assistant',
      'Export to CSV for accounting',
    ],
    timeSaved: '6–8 hrs/week',
    moneySaved: 'Recover $2,000–5,000/mo in lost leads',
    roiDetail:
      'The average moving company loses 20–30% of leads due to slow follow-up or forgetting to call back. A dashboard with reminders and status tracking recovers those lost jobs. At $2,000/job, saving just 2 leads per month adds $4,000 in revenue.',
  },
  {
    id: 'scheduling',
    icon: Calendar,
    name: 'Crew Scheduling System',
    tagline: 'Replace the whiteboard. Assign crews and trucks with a drag-and-drop calendar.',
    price: '$2,200',
    monthly: '$59/mo',
    buildTime: '3–4 weeks',
    demoTo: '/scheduling',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Visual calendar with crew assignments',
      'Truck and equipment tracking',
      'Conflict detection (double-booking prevention)',
      'Crew availability management',
      'Job details at a glance',
    ],
    timeSaved: '8–12 hrs/week',
    moneySaved: 'Save $1,500–3,000/mo in scheduling errors',
    roiDetail:
      'Double-bookings cost you the job ($2,000) plus the crew\'s idle time ($500). Scheduling errors also tank your reviews. A proper system eliminates these mistakes entirely and lets you fit 10–15% more jobs per week through better time-slot optimization.',
  },
  {
    id: 'portal',
    icon: UserCircle,
    name: 'Customer Portal',
    tagline: 'Give customers a branded portal to track their move, view documents, and pay online.',
    price: '$2,000',
    monthly: '$59/mo',
    buildTime: '3–4 weeks',
    demoTo: '/portal',
    color: 'border-rose-300',
    iconBg: 'bg-rose-50 text-rose-600',
    features: [
      'Move timeline & status tracking',
      'Inventory checklist',
      'Document sharing (contract, insurance, invoice)',
      'Online payment collection',
      'Branded with your company logo',
    ],
    timeSaved: '5–8 hrs/week',
    moneySaved: 'Get paid 2× faster + fewer disputes',
    roiDetail:
      'Customers check on their move 4–5 times before moving day. Each call costs you 10–15 min. A portal handles those questions automatically. Online payments also reduce your average collection time from 14 days to 2 days, improving cash flow by $8,000–15,000/month.',
  },
  {
    id: 'reviews',
    icon: Star,
    name: 'Review Automation',
    tagline: 'Automatically request reviews after every move. Build 5-star reputation on autopilot.',
    price: '$1,200',
    monthly: '$39/mo',
    buildTime: '1–2 weeks',
    demoTo: '/reviews',
    color: 'border-amber-300',
    iconBg: 'bg-amber-50 text-amber-600',
    features: [
      'Automated SMS review request (Day 1 after move)',
      'Email follow-up reminder (Day 3)',
      'Direct links to Google, Yelp, Facebook',
      'Review monitoring dashboard',
      'Response rate tracking',
    ],
    timeSaved: '3–5 hrs/week',
    moneySaved: '+$3,000–8,000/mo from reputation',
    roiDetail:
      'Moving from 4.2 to 4.7 stars on Google can increase your quote requests by 25–40%. Each additional star drives roughly 5–9% more revenue. Automated requests typically double your review volume and push your rating up 0.3–0.5 stars within 6 months.',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'Business Analytics Dashboard',
    tagline: 'See revenue, conversion rates, crew utilization, and growth trends in real time.',
    price: '$1,500',
    monthly: '$49/mo',
    buildTime: '2–3 weeks',
    demoTo: '/analytics',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Revenue tracking & trends',
      'Lead-to-booking conversion funnel',
      'Crew utilization rates',
      'Marketing channel attribution',
      'Custom date ranges & exports',
    ],
    timeSaved: '4–6 hrs/week',
    moneySaved: '+$2,000–5,000/mo through better decisions',
    roiDetail:
      'Most moving companies can\'t answer "which marketing channel brings the best customers?" Analytics lets you stop wasting money on ads that don\'t convert and double down on what works. Companies using data dashboards see 15–25% revenue growth within the first year.',
  },
];

/* ── bundle tiers ── */
const bundles = [
  {
    name: 'Starter Bundle',
    tagline: 'Website + Quote Calculator',
    items: ['website', 'quote'],
    bundlePrice: '$2,000',
    fullPrice: '$2,400',
    savings: '$400',
    monthly: '$59/mo',
    buildTime: '2–3 weeks',
    color: 'border-emerald-400',
    popular: false,
  },
  {
    name: 'Growth Bundle',
    tagline: 'The full operations platform',
    items: ['website', 'quote', 'ai', 'leads', 'scheduling', 'reviews', 'analytics'],
    bundlePrice: '$8,500',
    fullPrice: '$11,100',
    savings: '$2,600',
    monthly: '$199/mo',
    buildTime: '5–7 weeks',
    color: 'border-brand-500',
    popular: true,
  },
  {
    name: 'Everything Bundle',
    tagline: 'All 8 solutions',
    items: ['website', 'quote', 'ai', 'leads', 'scheduling', 'portal', 'reviews', 'analytics'],
    bundlePrice: '$10,500',
    fullPrice: '$13,100',
    savings: '$2,600',
    monthly: '$249/mo',
    buildTime: '7–9 weeks',
    color: 'border-violet-400',
    popular: false,
  },
];

export const SolutionsPage: React.FC = () => {
  const [expandedROI, setExpandedROI] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        title="Solutions & Pricing"
        subtitle="Pick exactly what you need — individual tools or discounted bundles. Every solution pays for itself."
        badge="Pricing"
      />

      {/* ─── à la carte grid ─── */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900">A La Carte Solutions</h2>
      <p className="mb-8 text-gray-500">Build your own stack. Pick one, pick a few, or grab a bundle below.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {solutions.map((s) => {
          const Icon = s.icon;
          const isExpanded = expandedROI === s.id;
          return (
            <Card key={s.id} className={`flex flex-col border-2 ${s.color}`} hover>
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`rounded-xl p-3 ${s.iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{s.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.tagline}</p>
                </div>
              </div>

              {/* Pricing row */}
              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-3xl font-bold text-gray-900">{s.price}</span>
                <span className="text-sm text-gray-400">one-time build</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  + {s.monthly} hosting
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">Build time: {s.buildTime}</p>

              {/* Features */}
              <ul className="mt-5 flex-1 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* ROI callouts */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-50 px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Clock className="h-3.5 w-3.5" /> Time Saved
                  </div>
                  <p className="mt-0.5 text-sm font-bold text-emerald-800">{s.timeSaved}</p>
                </div>
                <div className="rounded-lg bg-brand-50 px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
                    <DollarSign className="h-3.5 w-3.5" /> Revenue Impact
                  </div>
                  <p className="mt-0.5 text-sm font-bold text-brand-800">{s.moneySaved}</p>
                </div>
              </div>

              {/* Expandable ROI detail */}
              <button
                onClick={() => setExpandedROI(isExpanded ? null : s.id)}
                className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                {isExpanded ? 'Hide ROI breakdown' : 'See the math →'}
              </button>
              {isExpanded && (
                <div className="mt-2 rounded-lg border border-brand-100 bg-brand-50/50 p-3 text-xs leading-relaxed text-gray-700">
                  {s.roiDetail}
                </div>
              )}

              {/* CTA */}
              <Link
                to={s.demoTo}
                className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Try demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          );
        })}
      </div>

      {/* ─── Bundle deals ─── */}
      <div className="mt-20">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Bundle & Save</h2>
        <p className="mb-8 text-gray-500">
          Combine solutions for a discount. Bundles share infrastructure so the build is faster and cheaper.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {bundles.map((b) => {
            const includedSolutions = solutions.filter((s) => b.items.includes(s.id));
            return (
              <Card
                key={b.name}
                className={`relative flex flex-col border-2 ${b.color} ${
                  b.popular ? 'ring-2 ring-brand-500 ring-offset-2' : ''
                }`}
              >
                {b.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    Best Value
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{b.name}</h3>
                  <p className="text-sm text-gray-500">{b.tagline}</p>
                </div>

                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">{b.bundlePrice}</span>
                  <span className="text-sm text-gray-400 line-through">{b.fullPrice}</span>
                </div>
                <p className="text-sm font-medium text-emerald-600">Save {b.savings}</p>
                <p className="mt-1 text-sm text-gray-400">+ {b.monthly} hosting &middot; {b.buildTime}</p>

                <ul className="mb-6 mt-5 flex-1 space-y-2.5">
                  {includedSolutions.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.id} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <Icon className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="flex-1">{s.name}</span>
                        <span className="text-xs text-gray-400">{s.price}</span>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  to="/quote"
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-colors ${
                    b.popular
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── ROI summary ─── */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-50 to-violet-50 p-8">
        <h3 className="text-center text-2xl font-bold text-gray-900">The math is simple</h3>
        <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <Zap className="mx-auto h-8 w-8 text-amber-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">50+ hrs/mo</p>
            <p className="mt-1 text-sm text-gray-500">
              Time saved across quoting, scheduling, follow-ups, and review chasing
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <TrendingUp className="mx-auto h-8 w-8 text-emerald-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">+$8k–20k/mo</p>
            <p className="mt-1 text-sm text-gray-500">
              Additional revenue from captured leads, faster quotes, and better reviews
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <DollarSign className="mx-auto h-8 w-8 text-brand-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">&lt; 60 days</p>
            <p className="mt-1 text-sm text-gray-500">
              Typical payback period — most solutions pay for themselves within 2 months
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
          These estimates are based on industry benchmarks for moving companies doing $30k–80k/month in revenue
          with 2–4 crews. Your results may vary, but the tools are designed to pay for themselves quickly.
        </p>
      </div>
    </div>
  );
};
