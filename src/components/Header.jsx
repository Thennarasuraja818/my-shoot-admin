import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick, title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-6 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-white hidden md:block">{title}</h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-sm mx-4 hidden sm:block">
        {title !== 'Dashboard' && (
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search bookings, clients..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#f5b400]/50 transition-colors"
            />
          </div>
        )}
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f5b400] rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#f5b400] flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-black">SA</span>
            </div>
            <span className="text-sm text-white font-medium hidden md:block">Super Admin</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#2a2a2a]">
                  <p className="text-sm font-medium text-white">Super Admin</p>
                  <p className="text-xs text-gray-500">admin@myshoot.in</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    <User size={14} /> Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    <Settings size={14} /> Settings
                  </button>
                  <div className="border-t border-[#2a2a2a] my-1" />
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5" onClick={() => navigate('/')}>
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
