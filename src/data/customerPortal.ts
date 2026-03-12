export interface InventoryItem {
  id: string;
  name: string;
  room: string;
  quantity: number;
  specialHandling: boolean;
  packed: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'receipt' | 'insurance';
  date: string;
  size: string;
}

export interface MoveTimeline {
  id: string;
  event: string;
  date: string;
  time: string;
  completed: boolean;
}

export const customerMove = {
  id: 'M-2026-0322',
  customerName: 'Maria Rodriguez',
  origin: '3300 Bee Cave Rd, Austin TX 78746',
  destination: '1800 Congress Ave, Austin TX 78701',
  moveDate: 'March 22, 2026',
  crew: 'Alpha Crew',
  truck: 'Truck #1 — 26ft Box',
  estimatedHours: 5,
  totalCost: 2100,
  deposit: 420,
  balanceDue: 1680,
  paymentStatus: 'deposit_paid' as const,
  status: 'confirmed' as const,
};

export const inventory: InventoryItem[] = [
  { id: 'INV-01', name: 'King Bed Frame + Mattress', room: 'Master Bedroom', quantity: 1, specialHandling: true, packed: false },
  { id: 'INV-02', name: 'Dresser', room: 'Master Bedroom', quantity: 1, specialHandling: false, packed: false },
  { id: 'INV-03', name: 'Nightstands', room: 'Master Bedroom', quantity: 2, specialHandling: false, packed: true },
  { id: 'INV-04', name: 'Sectional Sofa', room: 'Living Room', quantity: 1, specialHandling: true, packed: false },
  { id: 'INV-05', name: 'Coffee Table', room: 'Living Room', quantity: 1, specialHandling: false, packed: true },
  { id: 'INV-06', name: '55" TV + Stand', room: 'Living Room', quantity: 1, specialHandling: true, packed: false },
  { id: 'INV-07', name: 'Bookshelf', room: 'Living Room', quantity: 2, specialHandling: false, packed: true },
  { id: 'INV-08', name: 'Dining Table', room: 'Dining Room', quantity: 1, specialHandling: true, packed: false },
  { id: 'INV-09', name: 'Dining Chairs', room: 'Dining Room', quantity: 6, specialHandling: false, packed: true },
  { id: 'INV-10', name: 'Kitchen Boxes', room: 'Kitchen', quantity: 8, specialHandling: false, packed: true },
  { id: 'INV-11', name: 'Wardrobe Boxes', room: 'Bedroom 2', quantity: 4, specialHandling: false, packed: false },
  { id: 'INV-12', name: 'Desk + Chair', room: 'Office', quantity: 1, specialHandling: false, packed: false },
];

export const documents: Document[] = [
  { id: 'DOC-01', name: 'Moving Contract', type: 'contract', date: '2026-03-08', size: '245 KB' },
  { id: 'DOC-02', name: 'Insurance Certificate', type: 'insurance', date: '2026-03-08', size: '128 KB' },
  { id: 'DOC-03', name: 'Deposit Invoice', type: 'invoice', date: '2026-03-08', size: '89 KB' },
  { id: 'DOC-04', name: 'Deposit Receipt', type: 'receipt', date: '2026-03-09', size: '67 KB' },
];

export const timeline: MoveTimeline[] = [
  { id: 'TL-01', event: 'Quote requested', date: 'Mar 6', time: '2:15 PM', completed: true },
  { id: 'TL-02', event: 'Quote sent — $2,100', date: 'Mar 7', time: '9:30 AM', completed: true },
  { id: 'TL-03', event: 'Quote accepted', date: 'Mar 7', time: '4:45 PM', completed: true },
  { id: 'TL-04', event: 'Deposit paid — $420', date: 'Mar 9', time: '10:00 AM', completed: true },
  { id: 'TL-05', event: 'Crew assigned — Alpha Crew', date: 'Mar 10', time: '11:00 AM', completed: true },
  { id: 'TL-06', event: 'Pre-move walkthrough', date: 'Mar 18', time: '10:00 AM', completed: false },
  { id: 'TL-07', event: 'Moving day!', date: 'Mar 22', time: '8:00 AM', completed: false },
  { id: 'TL-08', event: 'Final payment due', date: 'Mar 22', time: '', completed: false },
];
