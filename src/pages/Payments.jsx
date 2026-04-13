import { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { payments as allPayments } from '../data/mockData';
import { DataTable, StatusBadge } from '../components/Table';

export default function Payments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Pending', 'Advance Paid', 'Fully Paid', 'Refunded'];

  const filtered = allPayments.filter(p => {
    const matchSearch = p.customer.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.bookingId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = allPayments.reduce((s, p) => s + p.advance, 0);
  const pending = allPayments.filter(p => p.status === 'Pending').length;
  const fullyPaid = allPayments.filter(p => p.status === 'Fully Paid').length;

  const columns = [
    { key: 'id', label: 'Transaction ID', render: v => <span className="font-mono text-[#f5b400] text-xs">{v}</span> },
    { key: 'bookingId', label: 'Booking ID', render: v => <span className="font-mono text-xs text-gray-400">{v}</span> },
    { key: 'customer', label: 'Customer', render: v => <span className="font-medium text-white text-sm">{v}</span> },
    { key: 'total', label: 'Total', render: v => <span className="text-white font-semibold">₹{v.toLocaleString('en-IN')}</span> },
    { key: 'advance', label: 'Advance', render: v => <span className="text-green-400">₹{v.toLocaleString('en-IN')}</span> },
    { key: 'remaining', label: 'Remaining', render: v => <span className={v > 0 ? 'text-orange-400' : 'text-gray-500'}>₹{v.toLocaleString('en-IN')}</span> },
    { key: 'method', label: 'Method', render: v => <span className="text-gray-400 text-xs">{v}</span> },
    { key: 'date', label: 'Date', render: v => <span className="text-gray-400 text-xs">{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: '', render: () => (
      <button className="p-1.5 rounded-lg text-gray-500 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-colors" title="Download Invoice">
        <Download size={14} />
      </button>
    )},
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Payments</h2>
        <p className="text-sm text-gray-500 mt-0.5">Transaction history & payment management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: '#22c55e' },
          { label: 'Pending Payments', value: pending, color: '#f59e0b' },
          { label: 'Fully Paid', value: fullyPaid, color: '#3b82f6' },
        ].map(c => (
          <div key={c.label} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 flex items-center gap-4">
            <div className="w-2 h-12 rounded-full" style={{ backgroundColor: c.color }} />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{c.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer, TXN or booking ID..."
            className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-[#2a2a2a] rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#f5b400]/50 transition-colors" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-[#141414] border border-[#2a2a2a] rounded-xl text-sm text-gray-300 focus:outline-none focus:border-[#f5b400]/50 transition-colors">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-xl hover:border-[#3a3a3a] transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
