import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

const tiers = [
  {
    name: 'Starter',
    tagline: 'Get more leads',
    price: '$2,500',
    priceNote: 'one-time build + $99/mo hosting',
    buildTime: '2–3 weeks',
    color: 'border-emerald-400',
    features: [
      'Modern responsive website redesign',
      'Instant quote calculator widget',
      'Contact form with email notifications',
      'Google Business Profile optimization',
      'Basic SEO setup',
      'Mobile-optimized design',
    ],
    cta: 'Start here',
    popular: false,
  },
  {
    name: 'Growth',
    tagline: 'Run your business',
    price: '$8,000',
    priceNote: 'one-time build + $249/mo',
    buildTime: '4–6 weeks',
    color: 'border-brand-500',
    features: [
      'Everything in Starter',
      'AI-powered chat assistant',
      'Lead management dashboard',
      'Crew scheduling system',
      'Customer portal',
      'Automated review requests',
      'Basic analytics dashboard',
      'Email & SMS notifications',
    ],
    cta: 'Most popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Scale with confidence',
    price: '$18,000',
    priceNote: 'one-time build + $499/mo',
    buildTime: '8–12 weeks',
    color: 'border-violet-400',
    features: [
      'Everything in Growth',
      'Advanced analytics & reporting',
      'Multi-location support',
      'Custom CRM integrations',
      'Inventory management system',
      'Route optimization',
      'Payment processing',
      'White-label customer portal',
      'Dedicated support & training',
      'Custom feature development',
    ],
    cta: 'Let\'s talk',
    popular: false,
  },
];

export const SolutionsPage: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-12">
    <PageHeader
      title="Solutions & Pricing"
      subtitle="Choose the right package for where your business is today — and where you want it to be."
      badge="Pricing"
    />

    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`relative flex flex-col border-2 ${tier.color} ${
            tier.popular ? 'ring-2 ring-brand-500 ring-offset-2' : ''
          }`}
        >
          {tier.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
              Recommended
            </span>
          )}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
            <p className="text-sm text-gray-500">{tier.tagline}</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
            <p className="mt-1 text-sm text-gray-400">{tier.priceNote}</p>
            <p className="text-sm text-gray-400">Build time: {tier.buildTime}</p>
          </div>
          <ul className="mb-8 flex-1 space-y-3">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/quote"
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-colors ${
              tier.popular
                ? 'bg-brand-600 text-white hover:bg-brand-700'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tier.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      ))}
    </div>

    {/* ROI callout */}
    <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-50 to-violet-50 p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900">The math is simple</h3>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        If you book just <span className="font-semibold text-brand-700">2 extra jobs per month</span> from
        the instant quote tool alone, that&apos;s an extra{' '}
        <span className="font-semibold text-brand-700">$4,000+/month in revenue</span>. The Growth plan
        pays for itself in the first month.
      </p>
    </div>
  </div>
);
