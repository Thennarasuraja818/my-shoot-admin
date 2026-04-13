import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/': 'Dashboard',
  '/calendar': 'Calendar',
  '/categories': 'Categories',
  '/packages': 'Packages',
  '/bookings': 'Bookings',
  '/drone-enquiries': 'Drone Enquiries',
  '/portfolio': 'Portfolio',
  '/users': 'Users',
  '/photographers': 'Photographers',
  '/reports': 'Reports & Payments',
  '/settings': 'Settings',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'MyShoot Admin';

  return (
    <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
