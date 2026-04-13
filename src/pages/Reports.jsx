import { useState, useMemo } from 'react';
import { Search, Download, Filter, IndianRupee, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { bookings as allBookings, payments as allPayments } from '../data/mockData';
import { DataTable, StatusBadge } from '../components/Table';

export default function Reports() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Join bookings with payment data
  const data = useMemo(() => {
    return allBookings.map(booking => {
      const payment = allPayments.find(p => p.bookingId === booking.id) || {
        total: 0,
        advance: 0,
        remaining: 0,
        method: '-'
      };
      return {
        ...booking,
        ...payment,
        id: booking.id, // Ensure we use booking ID
        paymentStatus: booking.paymentStatus // Keep booking's recorded status
      };
    });
  }, []);

  // Filtering logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(search.toLowerCase()) || 
                          item.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.paymentStatus === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Summary stats for filtered data
  const stats = useMemo(() => {
    const total = filteredData.reduce((s, i) => s + (i.total || 0), 0);
    const collected = filteredData.reduce((s, i) => s + (i.advance || 0), 0);
    const pending = filteredData.reduce((s, i) => s + (i.remaining || 0), 0);
    return { total, collected, pending };
  }, [filteredData]);

  const columns = [
    { key: 'id', label: 'Booking ID', render: v => <span className="font-mono text-[#f5b400] font-bold">{v}</span> },
    { key: 'customer', label: 'Customer', render: (v, row) => (
      <div>
        <p className="font-semibold text-white">{v}</p>
        <p className="text-[10px] text-gray-500">{row.phone}</p>
      </div>
    )},
    { key: 'category', label: 'Category', render: v => (
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{v}</span>
    )},
    { key: 'total', label: 'Total Value', render: v => <span className="text-white font-bold">₹{v.toLocaleString('en-IN')}</span> },
    { key: 'advance', label: 'Collected', render: v => <span className="text-green-400 font-semibold">₹{v.toLocaleString('en-IN')}</span> },
    { key: 'remaining', label: 'Pending', render: v => (
      <span className={v > 0 ? 'text-orange-400 font-semibold' : 'text-gray-600'}>₹{v.toLocaleString('en-IN')}</span>
    )},
    { key: 'paymentStatus', label: 'Status', render: v => <StatusBadge status={v} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">Booking Summary</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Financial audit for {filteredData.length} records</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 text-[10px] font-bold rounded-xl uppercase tracking-widest hover:border-gray-700 transition-all">
             <Download size={14} /> Export XLS
           </button>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Projected Value', value: stats.total, icon: IndianRupee, color: 'text-blue-400', bg: 'bg-blue-500/5' },
          { label: 'Realized Revenue', value: stats.collected, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/5' },
          { label: 'Outstanding Balance', value: stats.pending, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/5' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border border-white/5 rounded-2xl p-4 flex items-center justify-between`}>
            <div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-xl font-black ${s.color}`}>₹{s.value.toLocaleString('en-IN')}</p>
            </div>
            <div className={`p-3 rounded-xl bg-black/20 ${s.color}`}>
              <s.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#141414] p-4 rounded-2xl border border-[#2a2a2a]">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input 
            type="text" 
            placeholder="Search by ID or Customer..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f5b400]/50 transition-all placeholder:text-gray-700"
          />
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl pl-9 pr-8 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-widest focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Wedding">Wedding</option>
                <option value="Event">Event</option>
                <option value="Business">Business</option>
                <option value="Drone Show">Drone Show</option>
              </select>
           </div>
           <div className="relative">
              <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl pl-9 pr-8 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-widest focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Fully Paid">Fully Paid</option>
                <option value="Advance Paid">Advance Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
           </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
        <DataTable columns={columns} data={filteredData} />
      </div>

      <div className="flex justify-center pt-2">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">End of Summary • Confidential Financial Data</p>
      </div>
    </div>
  );
}
