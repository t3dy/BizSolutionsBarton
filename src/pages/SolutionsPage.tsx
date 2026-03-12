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
  Wrench,
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
  myBuildCost: string;
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
    tagline: 'Replace the current site with something fast, mobile-friendly, and designed to turn visitors into quote requests.',
    price: '$750',
    monthly: '$15/mo',
    buildTime: '3–5 days',
    myBuildCost: '~6 hrs dev + $15/mo hosting',
    demoTo: '/',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Responsive, mobile-first design',
      'SEO basics (meta tags, sitemap, speed)',
      'Google Business Profile link & map embed',
      'Fast hosting on Vercel or Netlify (free tier)',
      'Easy to update — I handle changes for you',
    ],
    timeSaved: '2–3 hrs/week',
    moneySaved: '1–3 extra leads/mo',
    roiDetail:
      'Your current site probably gets 300–600 visits/month. A cleaner design with a clear "Get a Quote" button can bump your conversion rate from ~2% to ~4%. That\'s maybe 6–12 extra quote requests a month. If you close a third of those at ~$1,800 avg, that\'s $3,600–7,200. Realistic? Even 1 extra booked job covers the build cost.',
  },
  {
    id: 'quote',
    icon: Calculator,
    name: 'Instant Quote Calculator',
    tagline: 'Customers pick their home size, add-ons, and move date — and get a ballpark price in 30 seconds.',
    price: '$400',
    monthly: '$0',
    buildTime: '1–2 days',
    myBuildCost: '~3 hrs dev, no ongoing cost',
    demoTo: '/quote',
    color: 'border-emerald-300',
    iconBg: 'bg-emerald-50 text-emerald-600',
    features: [
      'Embeds right on your existing site',
      'You set the pricing logic (hourly rate, minimums)',
      'Captures name + email + phone on submit',
      'Sends you an email for every new quote',
      'No backend needed — runs in the browser',
    ],
    timeSaved: '3–4 hrs/week',
    moneySaved: 'Captures after-hours leads',
    roiDetail:
      'Right now if someone visits your site at 9 PM they have to call or fill out a generic contact form — most don\'t bother. A quote calculator gives them a number instantly and captures their info. You probably lose 2–4 leads/week to this. Even converting 1 extra job/month at $1,800 pays for this tool in the first month.',
  },
  {
    id: 'ai',
    icon: MessageSquare,
    name: 'AI Chat Assistant',
    tagline: 'A chatbot on your site that answers moving questions and collects lead info when you\'re not available.',
    price: '$800',
    monthly: '$25/mo',
    buildTime: '3–5 days',
    myBuildCost: '~5 hrs dev + ~$20/mo API costs',
    demoTo: '/assistant',
    color: 'border-violet-300',
    iconBg: 'bg-violet-50 text-violet-600',
    features: [
      'Answers common questions (rates, insurance, areas served)',
      'Collects move details through conversation',
      'Sends you a summary email with lead info',
      'Works 24/7 including weekends',
      'Trained on your specific services and pricing',
    ],
    timeSaved: '4–5 hrs/week',
    moneySaved: '1–2 extra leads/mo',
    roiDetail:
      'Most visitors have 2–3 questions before they\'re ready to book: "Do you cover Round Rock?" "How much for a 2BR?" "Are you insured?" Right now they either call (and you might miss it) or leave. The chatbot answers instantly and captures their info. The $25/mo API cost covers ~500 conversations. Even 1 extra booking per month makes this a no-brainer.',
  },
  {
    id: 'leads',
    icon: Users,
    name: 'Lead Tracker',
    tagline: 'A simple dashboard to see all your leads in one place instead of scattered across texts, emails, and voicemails.',
    price: '$600',
    monthly: '$10/mo',
    buildTime: '2–3 days',
    myBuildCost: '~4 hrs dev + $10/mo database',
    demoTo: '/leads',
    color: 'border-amber-300',
    iconBg: 'bg-amber-50 text-amber-600',
    features: [
      'See all leads: New → Quoted → Booked → Done',
      'Search and filter by date, status, or name',
      'Add notes and follow-up reminders',
      'Auto-imports from quote calculator & chatbot',
      'Simple — no bloated CRM to learn',
    ],
    timeSaved: '2–3 hrs/week',
    moneySaved: 'Stop losing track of leads',
    roiDetail:
      'Be honest — how many leads have you forgotten to follow up on this month? For most 2–3 crew operations, the answer is 3–5. Each one is a potential $1,800 job. A simple dashboard with "follow up needed" flags means fewer leads slip through. Recovering even 1 lost lead per month = $1,800, which is 3× the build cost.',
  },
  {
    id: 'scheduling',
    icon: Calendar,
    name: 'Crew Scheduling Board',
    tagline: 'See which crew is working which job on which day. No more whiteboard, no more group texts.',
    price: '$800',
    monthly: '$10/mo',
    buildTime: '3–5 days',
    myBuildCost: '~5 hrs dev + $10/mo database',
    demoTo: '/scheduling',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Weekly calendar view with crew assignments',
      'See which truck goes where',
      'Spot double-bookings before they happen',
      'Job details (address, time, customer) at a glance',
      'Works on your phone too',
    ],
    timeSaved: '3–5 hrs/week',
    moneySaved: 'Avoid costly double-bookings',
    roiDetail:
      'A double-booking costs you the job (~$1,800) plus the customer\'s bad review. With 2–3 crews running, scheduling mistakes happen 1–2x per month during busy season. This tool doesn\'t just save time on the whiteboard — it prevents the mistakes that cost you real money and reputation damage.',
  },
  {
    id: 'portal',
    icon: UserCircle,
    name: 'Customer Move Tracker',
    tagline: 'A simple page where customers can see their move status, crew info, and documents — instead of calling you.',
    price: '$600',
    monthly: '$10/mo',
    buildTime: '2–4 days',
    myBuildCost: '~4 hrs dev + $10/mo hosting',
    demoTo: '/portal',
    color: 'border-rose-300',
    iconBg: 'bg-rose-50 text-rose-600',
    features: [
      'Customer sees: move date, crew, truck, timeline',
      'Upload contract & insurance docs',
      'Inventory checklist they can fill out',
      'Payment status and balance due',
      'Branded with your company name',
    ],
    timeSaved: '2–4 hrs/week',
    moneySaved: 'Fewer "where\'s my crew?" calls',
    roiDetail:
      'Between booking and move day, a customer calls you 3–5 times: "What time is the crew coming?" "Can I see my contract?" "Do I still owe anything?" Each call is 5–10 min. With 15–20 active jobs/month, that\'s 4–8 hours answering the same questions. A portal page eliminates most of those calls.',
  },
  {
    id: 'reviews',
    icon: Star,
    name: 'Review Request Automation',
    tagline: 'After every move, automatically text the customer asking for a Google review.',
    price: '$400',
    monthly: '$15/mo',
    buildTime: '1–2 days',
    myBuildCost: '~2 hrs dev + $12/mo Twilio SMS',
    demoTo: '/reviews',
    color: 'border-amber-300',
    iconBg: 'bg-amber-50 text-amber-600',
    features: [
      'Auto-sends SMS 24 hrs after move is marked done',
      'Follow-up email if no review after 3 days',
      'Direct link to your Google review page',
      'Tracks who left a review and who didn\'t',
      'Simple dashboard with response rates',
    ],
    timeSaved: '1–2 hrs/week',
    moneySaved: 'More reviews = more leads',
    roiDetail:
      'You probably do 15–20 jobs/month. Right now maybe 1–2 customers leave a review. With automated requests, expect 5–8 reviews/month. Going from 30 reviews to 80+ reviews on Google makes you show up higher in local search and look more trustworthy. Each 0.1 star increase on Google drives roughly 2–3% more clicks to your listing.',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'Business Dashboard',
    tagline: 'See your actual numbers: how many leads came in, how many booked, revenue this month, crew utilization.',
    price: '$500',
    monthly: '$10/mo',
    buildTime: '2–3 days',
    myBuildCost: '~3 hrs dev + $10/mo database',
    demoTo: '/analytics',
    color: 'border-brand-300',
    iconBg: 'bg-brand-50 text-brand-600',
    features: [
      'Monthly revenue tracker',
      'Lead → quote → booking conversion rate',
      'Crew utilization (how busy is each crew?)',
      'Simple charts — not a wall of numbers',
      'Pulls data from the other tools automatically',
    ],
    timeSaved: '1–2 hrs/week',
    moneySaved: 'Know what\'s working, cut what isn\'t',
    roiDetail:
      'Can you answer right now: what\'s your lead-to-booking rate? Which month is your slowest? Is Crew B as busy as Crew A? If not, you\'re making decisions on gut feel. A dashboard won\'t directly make you money, but it shows you where you\'re leaving money on the table — like a 30% close rate that should be 45%.',
  },
];

/* ── bundle tiers ── */
const bundles = [
  {
    name: 'Starter',
    tagline: 'Website + Quote Calculator',
    items: ['website', 'quote'],
    bundlePrice: '$999',
    fullPrice: '$1,150',
    savings: '$151',
    monthly: '$15/mo',
    buildTime: '1 week',
    color: 'border-emerald-400',
    popular: false,
  },
  {
    name: 'Growth',
    tagline: 'The full toolkit',
    items: ['website', 'quote', 'ai', 'leads', 'scheduling', 'reviews', 'analytics'],
    bundlePrice: '$3,200',
    fullPrice: '$4,250',
    savings: '$1,050',
    monthly: '$69/mo',
    buildTime: '2–3 weeks',
    color: 'border-brand-500',
    popular: true,
  },
  {
    name: 'Everything',
    tagline: 'All 8 tools',
    items: ['website', 'quote', 'ai', 'leads', 'scheduling', 'portal', 'reviews', 'analytics'],
    bundlePrice: '$3,600',
    fullPrice: '$4,850',
    savings: '$1,250',
    monthly: '$79/mo',
    buildTime: '3–4 weeks',
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
        subtitle="Pick exactly what you need — one tool, a few, or the full bundle. Honest pricing, no fluff."
        badge="Pricing"
      />

      {/* ─── à la carte grid ─── */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900">A La Carte</h2>
      <p className="mb-8 text-gray-500">Each tool is standalone. Start with one, add more later. No lock-in.</p>

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
                <span className="text-sm text-gray-400">one-time</span>
                {s.monthly !== '$0' && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    + {s.monthly} hosting/API
                  </span>
                )}
                {s.monthly === '$0' && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                    No monthly cost
                  </span>
                )}
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                <Wrench className="h-3 w-3" /> {s.buildTime} to build
              </p>

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
                    <DollarSign className="h-3.5 w-3.5" /> Impact
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
                {isExpanded ? 'Hide details' : 'How does this pay for itself? →'}
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
                Try the demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          );
        })}
      </div>

      {/* ─── Bundle deals ─── */}
      <div className="mt-20">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Bundles</h2>
        <p className="mb-8 text-gray-500">
          Get multiple tools built together for less. Shared infrastructure means faster delivery and lower cost.
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
                <p className="mt-1 text-sm text-gray-400">+ {b.monthly} ongoing &middot; Built in {b.buildTime}</p>

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

      {/* ─── Honest ROI section ─── */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-50 to-violet-50 p-8">
        <h3 className="text-center text-2xl font-bold text-gray-900">Realistic expectations</h3>
        <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <Zap className="mx-auto h-8 w-8 text-amber-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">10–15 hrs/mo</p>
            <p className="mt-1 text-sm text-gray-500">
              Time you get back from fewer phone quotes, scheduling headaches, and "where's my crew?" calls
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <TrendingUp className="mx-auto h-8 w-8 text-emerald-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">2–4 extra jobs/mo</p>
            <p className="mt-1 text-sm text-gray-500">
              From leads you currently miss — after-hours visitors, forgotten follow-ups, slow callbacks
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm">
            <DollarSign className="mx-auto h-8 w-8 text-brand-500" />
            <p className="mt-3 text-2xl font-bold text-gray-900">$3,600–7,200/mo</p>
            <p className="mt-1 text-sm text-gray-500">
              At your ~$1,800 avg job value — the Growth bundle pays for itself in 2–4 weeks
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
          These are conservative estimates for a 2–3 crew operation doing 15–20 jobs/month in the Austin area.
          The biggest wins come from capturing leads you're currently losing and cutting time spent on calls that software can handle.
        </p>
      </div>
    </div>
  );
};
