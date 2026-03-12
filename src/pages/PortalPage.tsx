import React from 'react';
import {
  CheckCircle2,
  Circle,
  FileText,
  Download,
  DollarSign,
  Package,
  Shield,
  Clock,
  MapPin,
  Users,
  Truck as TruckIcon,
  CalendarDays,
} from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { PageHeader } from '../components/PageHeader';
import { customerMove, inventory, documents, timeline } from '../data/customerPortal';

const docIcons: Record<string, React.ReactNode> = {
  contract: <FileText className="h-4 w-4 text-brand-500" />,
  invoice: <DollarSign className="h-4 w-4 text-amber-500" />,
  receipt: <DollarSign className="h-4 w-4 text-emerald-500" />,
  insurance: <Shield className="h-4 w-4 text-violet-500" />,
};

export const PortalPage: React.FC = () => {
  const packedCount = inventory.filter((i) => i.packed).length;
  const totalCount = inventory.length;
  const packedPercent = Math.round((packedCount / totalCount) * 100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        title="Customer Portal"
        subtitle="Give customers a branded portal to track their move. This is what Maria Rodriguez sees when she logs in."
        badge="Customer View"
      />

      {/* Move summary */}
      <Card className="mb-8 bg-gradient-to-r from-brand-50 to-violet-50 border-brand-200">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500">Move #{customerMove.id}</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">Your Move Details</h2>
          </div>
          <StatusBadge label="Confirmed" variant="success" dot />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-xs text-gray-400">Move Date</p>
              <p className="font-semibold text-gray-900">{customerMove.moveDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-xs text-gray-400">Crew</p>
              <p className="font-semibold text-gray-900">{customerMove.crew}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TruckIcon className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-xs text-gray-400">Truck</p>
              <p className="font-semibold text-gray-900">{customerMove.truck}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-xs text-gray-400">Est. Duration</p>
              <p className="font-semibold text-gray-900">{customerMove.estimatedHours} hours</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="flex items-start gap-2 rounded-lg bg-white/60 p-3">
            <MapPin className="mt-0.5 h-4 w-4 text-rose-400" />
            <div>
              <p className="text-xs text-gray-400">From</p>
              <p className="text-sm font-medium text-gray-900">{customerMove.origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-white/60 p-3">
            <MapPin className="mt-0.5 h-4 w-4 text-emerald-400" />
            <div>
              <p className="text-xs text-gray-400">To</p>
              <p className="text-sm font-medium text-gray-900">{customerMove.destination}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Timeline */}
        <Card className="lg:col-span-1">
          <h3 className="mb-4 font-semibold text-gray-900">Timeline</h3>
          <div className="space-y-0">
            {timeline.map((event, i) => (
              <div key={event.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {event.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                  {i < timeline.length - 1 && (
                    <div className={`mt-1 w-0.5 flex-1 ${event.completed ? 'bg-emerald-200' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-medium ${event.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                    {event.event}
                  </p>
                  <p className="text-xs text-gray-400">{event.date} {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inventory + Docs + Payment */}
        <div className="space-y-6 lg:col-span-2">
          {/* Inventory */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                <Package className="mr-2 inline h-4 w-4" /> Inventory List
              </h3>
              <span className="text-sm text-gray-400">{packedCount}/{totalCount} packed ({packedPercent}%)</span>
            </div>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${packedPercent}%` }} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                    <th className="pb-2 pr-4 font-medium">Item</th>
                    <th className="pb-2 pr-4 font-medium">Room</th>
                    <th className="pb-2 pr-4 font-medium">Qty</th>
                    <th className="pb-2 pr-4 font-medium">Special</th>
                    <th className="pb-2 font-medium">Packed</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50">
                      <td className="py-2 pr-4 font-medium text-gray-900">{item.name}</td>
                      <td className="py-2 pr-4 text-gray-500">{item.room}</td>
                      <td className="py-2 pr-4 text-gray-500">{item.quantity}</td>
                      <td className="py-2 pr-4">
                        {item.specialHandling && <StatusBadge label="Special" variant="warning" />}
                      </td>
                      <td className="py-2">
                        {item.packed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Documents */}
          <Card>
            <h3 className="mb-4 font-semibold text-gray-900">
              <FileText className="mr-2 inline h-4 w-4" /> Documents
            </h3>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {docIcons[doc.type]}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment */}
          <Card className="bg-gradient-to-r from-emerald-50 to-white border-emerald-200">
            <h3 className="mb-4 font-semibold text-gray-900">
              <DollarSign className="mr-2 inline h-4 w-4" /> Payment Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Estimate</span>
                <span className="font-semibold text-gray-900">${customerMove.totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deposit Paid</span>
                <span className="font-semibold text-emerald-600">-${customerMove.deposit.toLocaleString()}</span>
              </div>
              <hr className="border-emerald-200" />
              <div className="flex justify-between text-base">
                <span className="font-medium text-gray-700">Balance Due</span>
                <span className="font-bold text-gray-900">${customerMove.balanceDue.toLocaleString()}</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700">
              Pay Balance Online
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
