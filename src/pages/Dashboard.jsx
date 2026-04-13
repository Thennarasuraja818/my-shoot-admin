import {
  BookOpen, Camera, CheckCircle, Clock, Wind, IndianRupee
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import StatCard from '../components/StatCard';
import { DataTable, StatusBadge } from '../components/Table';
import { stats, monthlyRevenue, bookingsByCategory, bookings } from '../data/mockData';

const COLORS = ['#f5b400', '#22c55e', '#3b82f6', '#a855f7'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-[#f5b400]">
          {payload[0].name === 'revenue'
            ? `₹${payload[0].value.toLocaleString('en-IN')}`
            : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const recentColumns = [
  { key: 'id', label: 'Booking ID', render: v => <span className="font-mono text-[#f5b400] text-xs">{v}</span> },
  { key: 'customer', label: 'Customer' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Shoot Date' },
  { key: 'paymentStatus', label: 'Payment', render: v => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, Admin 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with MyShoot today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={BookOpen} color="#f5b400" trend={12} trendLabel="vs last month" />
        <StatCard title="Upcoming Shoots" value={stats.upcomingShoots} icon={Camera} color="#22c55e" trend={8} trendLabel="scheduled" />
        <StatCard title="Completed Shoots" value={stats.completedShoots} icon={CheckCircle} color="#3b82f6" trend={5} trendLabel="vs last month" />
        <StatCard title="Pending Bookings" value={stats.pendingBookings} icon={Clock} color="#f59e0b" trend={-3} trendLabel="vs last week" />
        <StatCard title="Drone Enquiries" value={stats.droneEnquiries} icon={Wind} color="#a855f7" trend={25} trendLabel="new this month" />
        <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} color="#10b981" trend={18} trendLabel="vs last month" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Monthly Revenue */}
        <div className="xl:col-span-2 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-white">Monthly Revenue</h3>
              <p className="text-xs text-gray-500 mt-0.5">Annual revenue overview</p>
            </div>
            <span className="text-xs bg-[#f5b400]/10 text-[#f5b400] border border-[#f5b400]/20 px-3 py-1 rounded-full font-medium">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f5b400" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f5b400" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#f5b400" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings by Category */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-white">By Category</h3>
            <p className="text-xs text-gray-500 mt-0.5">Total bookings split</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bookingsByCategory} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {bookingsByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">Recent Bookings</h3>
          <a href="/bookings" className="text-xs text-[#f5b400] hover:text-[#e0a300] transition-colors">View all →</a>
        </div>
        <DataTable columns={recentColumns} data={bookings.slice(0, 6)} />
      </div>
    </div>
  );
}
