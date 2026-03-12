import React from 'react';
import {
  Star,
  MessageSquare,
  Mail,
  CheckCircle2,
  ArrowRight,
  Send,
  Clock,
} from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';
import { reviews, reviewRequests, reviewStats } from '../data/reviews';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`h-4 w-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
      />
    ))}
  </div>
);

const platformColors: Record<string, string> = {
  google: 'bg-blue-50 text-blue-700',
  yelp: 'bg-red-50 text-red-600',
  facebook: 'bg-indigo-50 text-indigo-600',
};

export const ReviewsPage: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-12">
    <PageHeader
      title="Review Automation"
      subtitle="Automatically request reviews after every move. Build your online reputation on autopilot."
      badge="Reputation"
    />

    {/* Stats */}
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <p className="text-sm text-gray-500">Total Reviews</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{reviewStats.totalReviews}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Average Rating</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-3xl font-bold text-gray-900">{reviewStats.averageRating}</p>
          <StarRating rating={5} />
        </div>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Response Rate</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{reviewStats.responseRate}%</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Review Sources</p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">Google: {reviewStats.googleReviews}</span>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">Yelp: {reviewStats.yelpReviews}</span>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">FB: {reviewStats.facebookReviews}</span>
        </div>
      </Card>
    </div>

    <div className="grid gap-8 lg:grid-cols-2">
      {/* Workflow */}
      <Card>
        <h3 className="mb-6 font-semibold text-gray-900">Automated Review Workflow</h3>
        <div className="space-y-0">
          {[
            { icon: CheckCircle2, label: 'Move completed', desc: 'Crew marks job as done', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { icon: MessageSquare, label: 'SMS sent (Day 1)', desc: 'Friendly review request via text', color: 'text-brand-500', bg: 'bg-brand-50' },
            { icon: Mail, label: 'Email reminder (Day 3)', desc: 'Follow-up if no review yet', color: 'text-violet-500', bg: 'bg-violet-50' },
            { icon: Star, label: 'Review received', desc: 'Auto-detected from Google/Yelp', color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 ${step.bg}`}>
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  {i < 3 && <div className="mt-1 w-0.5 flex-1 bg-gray-200" />}
                </div>
                <div className="pb-6">
                  <p className="font-medium text-gray-900">{step.label}</p>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating distribution */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="mb-3 text-sm font-medium text-gray-700">Rating Distribution</h4>
          {[
            { stars: 5, pct: reviewStats.fiveStarPercent },
            { stars: 4, pct: reviewStats.fourStarPercent },
            { stars: 3, pct: reviewStats.threeStarPercent },
            { stars: 2, pct: reviewStats.twoStarPercent },
            { stars: 1, pct: reviewStats.oneStarPercent },
          ].map((r) => (
            <div key={r.stars} className="mb-2 flex items-center gap-2 text-sm">
              <span className="w-6 text-right text-gray-500">{r.stars}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="w-8 text-right text-gray-400">{r.pct}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Request tracking */}
      <div className="space-y-6">
        <Card>
          <h3 className="mb-4 font-semibold text-gray-900">Review Request Pipeline</h3>
          <div className="space-y-3">
            {reviewRequests.map((rr) => (
              <div key={rr.id} className="rounded-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{rr.customerName}</p>
                  {rr.reviewReceived ? (
                    <StatusBadge label={`${rr.rating}★ Review`} variant="success" dot />
                  ) : rr.emailSent ? (
                    <StatusBadge label="Email Sent" variant="purple" dot />
                  ) : rr.smsSent ? (
                    <StatusBadge label="SMS Sent" variant="info" dot />
                  ) : (
                    <StatusBadge label="Pending" variant="neutral" dot />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-400">Moved {rr.moveDate}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Send className={`h-3 w-3 ${rr.smsSent ? 'text-emerald-500' : ''}`} />
                    SMS {rr.smsSent ? '✓' : '—'}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="flex items-center gap-1">
                    <Mail className={`h-3 w-3 ${rr.emailSent ? 'text-emerald-500' : ''}`} />
                    Email {rr.emailSent ? '✓' : '—'}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="flex items-center gap-1">
                    <Star className={`h-3 w-3 ${rr.reviewReceived ? 'text-amber-400' : ''}`} />
                    Review {rr.reviewReceived ? '✓' : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent reviews */}
        <Card>
          <h3 className="mb-4 font-semibold text-gray-900">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{review.customerName}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${platformColors[review.platform]}`}>
                      {review.platform}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.text}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {review.date}</span>
                  {review.responded ? (
                    <StatusBadge label="Responded" variant="success" />
                  ) : (
                    <StatusBadge label="Needs Response" variant="warning" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);
