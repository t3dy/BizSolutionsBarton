import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Truck,
  Home,
  Calculator,
  MessageSquare,
  Users,
  Calendar,
  UserCircle,
  Star,
  BarChart3,
  Layers,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/solutions', label: 'Solutions', icon: Layers },
  { to: '/quote', label: 'Quote Tool', icon: Calculator },
  { to: '/assistant', label: 'AI Assistant', icon: MessageSquare },
  { to: '/leads', label: 'Leads', icon: Users },
  { to: '/scheduling', label: 'Scheduling', icon: Calendar },
  { to: '/portal', label: 'Portal', icon: UserCircle },
  { to: '/reviews', label: 'Reviews', icon: Star },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-brand-700">
          <Truck className="h-6 w-6" />
          <span className="text-lg">MovePro</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-gray-200 bg-white px-4 py-2 lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
