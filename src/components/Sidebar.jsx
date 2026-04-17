import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Tag, Package, BookOpen,
  Wind, Image, Users, Camera, BarChart2, Settings, X, Zap, Ticket, Monitor
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/banners', label: 'Banners', icon: Monitor },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/categories', label: 'Categories', icon: Tag },
  { path: '/packages', label: 'Packages', icon: Package },
  { path: '/bookings', label: 'Bookings', icon: BookOpen },
  { path: '/drone-enquiries', label: 'Drone Enquiries', icon: Wind },
  { path: '/portfolio', label: 'Portfolio', icon: Image },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/photographers', label: 'Photographers', icon: Camera },
  { path: '/promo-codes', label: 'Promo Codes', icon: Ticket },
  { path: '/reports', label: 'Reports', icon: BarChart2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];


export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-40 flex flex-col
        w-64 bg-[#141414] border-r border-[#2a2a2a]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f5b400] flex items-center justify-center shadow-lg">
              <Zap size={18} className="text-black" fill="black" />
            </div>
            <div>
              <p className="font-bold text-white text-base leading-tight">MyShoot</p>
              <p className="text-[10px] text-[#f5b400] font-medium tracking-wider uppercase">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 group
                ${isActive
                  ? 'bg-[#f5b400]/10 text-[#f5b400] border border-[#f5b400]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#f5b400]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span>{label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5b400]" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

      </aside>
    </>
  );
}
