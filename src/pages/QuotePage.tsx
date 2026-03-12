import React, { useState } from 'react';
import {
  MapPin,
  Home,
  ArrowUpDown,
  Package,
  Dumbbell,
  CalendarDays,
  ArrowRight,
  Clock,
  Users,
  DollarSign,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

interface QuoteResult {
  crewSize: number;
  estimatedHours: string;
  priceRange: string;
  priceLow: number;
  priceHigh: number;
  truckSize: string;
}

const homeSizes = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '5+ Bedroom'];
const accessOptions = ['Ground Floor', 'Elevator', '1 Flight Stairs', '2 Flights Stairs', '3+ Flights Stairs'];

function calculateQuote(formData: {
  homeSize: string;
  originAccess: string;
  destAccess: string;
  packing: boolean;
  heavyItems: number;
}): QuoteResult {
  const sizeMultiplier: Record<string, number> = {
    'Studio': 1, '1 Bedroom': 1.5, '2 Bedroom': 2.2, '3 Bedroom': 3,
    '4 Bedroom': 4, '5+ Bedroom': 5,
  };
  const stairsExtra: Record<string, number> = {
    'Ground Floor': 0, 'Elevator': 0.1, '1 Flight Stairs': 0.2,
    '2 Flights Stairs': 0.35, '3+ Flights Stairs': 0.5,
  };

  const base = sizeMultiplier[formData.homeSize] || 2;
  const accessAdd = (stairsExtra[formData.originAccess] || 0) + (stairsExtra[formData.destAccess] || 0);
  const hours = base * (1 + accessAdd) + (formData.packing ? base * 0.5 : 0) + formData.heavyItems * 0.3;
  const crewSize = base <= 1.5 ? 2 : base <= 3 ? 3 : 4;
  const rate = 165;
  const priceLow = Math.round(hours * rate * 0.9);
  const priceHigh = Math.round(hours * rate * 1.15);
  const truckSize = base <= 1.5 ? '16ft Van' : base <= 3 ? '20ft Box Truck' : '26ft Box Truck';

  return {
    crewSize,
    estimatedHours: `${Math.round(hours * 10) / 10}–${Math.round(hours * 1.2 * 10) / 10} hrs`,
    priceRange: `$${priceLow.toLocaleString()} – $${priceHigh.toLocaleString()}`,
    priceLow,
    priceHigh,
    truckSize,
  };
}

export const QuotePage: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [homeSize, setHomeSize] = useState('2 Bedroom');
  const [originAccess, setOriginAccess] = useState('Ground Floor');
  const [destAccess, setDestAccess] = useState('Ground Floor');
  const [packing, setPacking] = useState(false);
  const [heavyItems, setHeavyItems] = useState(0);
  const [moveDate, setMoveDate] = useState('');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(calculateQuote({ homeSize, originAccess, destAccess, packing, heavyItems }));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        title="Instant Quote Calculator"
        subtitle="Customers fill this out on your website and get an instant estimate. You capture the lead automatically."
        badge="Demo Tool"
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" /> Moving From
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. 1205 Barton Springs Rd, Austin TX"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" /> Moving To
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. 4502 Mueller Blvd, Austin TX"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Home className="h-4 w-4 text-gray-400" /> Home Size
                </label>
                <select
                  value={homeSize}
                  onChange={(e) => setHomeSize(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  {homeSizes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" /> Origin Access
                  </label>
                  <select
                    value={originAccess}
                    onChange={(e) => setOriginAccess(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    {accessOptions.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" /> Destination Access
                  </label>
                  <select
                    value={destAccess}
                    onChange={(e) => setDestAccess(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    {accessOptions.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CalendarDays className="h-4 w-4 text-gray-400" /> Preferred Move Date
                </label>
                <input
                  type="date"
                  value={moveDate}
                  onChange={(e) => setMoveDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package className="h-4 w-4 text-gray-400" />
                  <input
                    type="checkbox"
                    checked={packing}
                    onChange={(e) => setPacking(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  Full packing service
                </label>
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Dumbbell className="h-4 w-4 text-gray-400" /> Heavy / Specialty Items
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={heavyItems}
                  onChange={(e) => setHeavyItems(Number(e.target.value))}
                  placeholder="Piano, pool table, safe, etc."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="mt-1 text-xs text-gray-400">e.g. piano, pool table, gun safe, hot tub</p>
              </div>
            </div>
          </Card>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Calculating...
              </span>
            ) : (
              <>Get My Estimate <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </form>

        {/* Result */}
        <div className="lg:col-span-2">
          {result ? (
            <Card className="border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white">
              <div className="mb-4 flex items-center gap-2 text-brand-700">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Your Estimate</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-100 p-2 text-brand-600"><Users className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Crew Size</p>
                    <p className="text-lg font-semibold text-gray-900">{result.crewSize} movers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-100 p-2 text-brand-600"><Clock className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Time</p>
                    <p className="text-lg font-semibold text-gray-900">{result.estimatedHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-100 p-2 text-brand-600"><Truck className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Truck</p>
                    <p className="text-lg font-semibold text-gray-900">{result.truckSize}</p>
                  </div>
                </div>
                <hr className="border-brand-200" />
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600"><DollarSign className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Price</p>
                    <p className="text-2xl font-bold text-gray-900">{result.priceRange}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-brand-600 p-4 text-center text-white">
                <p className="text-sm font-medium">Like what you see?</p>
                <p className="mt-1 text-xs text-brand-200">This lead is automatically captured in your dashboard</p>
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
              <Truck className="mb-3 h-12 w-12 text-gray-300" />
              <p className="font-medium text-gray-500">Fill out the form</p>
              <p className="text-sm">Your instant estimate will appear here</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
