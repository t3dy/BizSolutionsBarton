export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  platform: 'google' | 'yelp' | 'facebook';
  date: string;
  responded: boolean;
}

export interface ReviewRequest {
  id: string;
  customerName: string;
  moveDate: string;
  smsSent: boolean;
  smsSentAt: string | null;
  emailSent: boolean;
  emailSentAt: string | null;
  reviewReceived: boolean;
  reviewReceivedAt: string | null;
  platform: string | null;
  rating: number | null;
}

export const reviews: Review[] = [
  {
    id: 'R-01',
    customerName: 'Lisa Tran',
    rating: 5,
    text: 'Absolutely fantastic crew. They handled our antiques with care and finished ahead of schedule.',
    platform: 'google',
    date: '2026-03-08',
    responded: true,
  },
  {
    id: 'R-02',
    customerName: 'Mark Stevens',
    rating: 4,
    text: 'Great movers, very professional. Small delay in arrival but made up for it with hard work.',
    platform: 'google',
    date: '2026-03-05',
    responded: true,
  },
  {
    id: 'R-03',
    customerName: 'Patricia Gomez',
    rating: 5,
    text: 'Best moving company in Austin. Third time using them and they never disappoint.',
    platform: 'yelp',
    date: '2026-03-02',
    responded: false,
  },
  {
    id: 'R-04',
    customerName: 'Derek Williams',
    rating: 5,
    text: 'The crew was incredibly careful with our piano. Highly recommend for specialty items.',
    platform: 'google',
    date: '2026-02-28',
    responded: true,
  },
  {
    id: 'R-05',
    customerName: 'Rachel Kim',
    rating: 3,
    text: 'Decent service overall. Pricing was fair but communication could improve.',
    platform: 'facebook',
    date: '2026-02-25',
    responded: false,
  },
];

export const reviewRequests: ReviewRequest[] = [
  {
    id: 'RR-01',
    customerName: 'Lisa Tran',
    moveDate: '2026-03-06',
    smsSent: true,
    smsSentAt: '2026-03-07T10:00:00',
    emailSent: true,
    emailSentAt: '2026-03-09T09:00:00',
    reviewReceived: true,
    reviewReceivedAt: '2026-03-08T14:30:00',
    platform: 'google',
    rating: 5,
  },
  {
    id: 'RR-02',
    customerName: 'Mark Stevens',
    moveDate: '2026-03-03',
    smsSent: true,
    smsSentAt: '2026-03-04T10:00:00',
    emailSent: true,
    emailSentAt: '2026-03-06T09:00:00',
    reviewReceived: true,
    reviewReceivedAt: '2026-03-05T16:00:00',
    platform: 'google',
    rating: 4,
  },
  {
    id: 'RR-03',
    customerName: 'Derek Williams',
    moveDate: '2026-02-26',
    smsSent: true,
    smsSentAt: '2026-02-27T10:00:00',
    emailSent: false,
    emailSentAt: null,
    reviewReceived: true,
    reviewReceivedAt: '2026-02-28T11:00:00',
    platform: 'google',
    rating: 5,
  },
  {
    id: 'RR-04',
    customerName: 'Angela Cruz',
    moveDate: '2026-03-10',
    smsSent: true,
    smsSentAt: '2026-03-11T10:00:00',
    emailSent: false,
    emailSentAt: null,
    reviewReceived: false,
    reviewReceivedAt: null,
    platform: null,
    rating: null,
  },
  {
    id: 'RR-05',
    customerName: 'Tom Bradley',
    moveDate: '2026-03-09',
    smsSent: true,
    smsSentAt: '2026-03-10T10:00:00',
    emailSent: true,
    emailSentAt: '2026-03-12T09:00:00',
    reviewReceived: false,
    reviewReceivedAt: null,
    platform: null,
    rating: null,
  },
];

export const reviewStats = {
  totalReviews: 127,
  averageRating: 4.7,
  responseRate: 89,
  googleReviews: 82,
  yelpReviews: 31,
  facebookReviews: 14,
  fiveStarPercent: 72,
  fourStarPercent: 18,
  threeStarPercent: 7,
  twoStarPercent: 2,
  oneStarPercent: 1,
};
