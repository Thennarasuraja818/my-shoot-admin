import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, Calendar, MapPin, Phone, User as UserIcon, IndianRupee, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { bookings as allBookings, photographers as allPhotographers, calendarEvents } from '../data/mockData';
import { DataTable, StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

const workflow = ['New', 'Reviewed', 'Confirmed', 'Shoot Completed', 'Delivered', 'Cancelled', 'Pending'];
const paymentStatuses = ['Pending', 'Advance Paid', 'Fully Paid', 'Refunded'];

const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors";

export default function Bookings() {
  const [bookings, setBookings] = useState(allBookings);
  const [photographers] = useState(allPhotographers);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ 
    customer: '', 
    phone: '', 
    category: 'Wedding', 
    package: '', 
    date: '', 
    location: '', 
    status: 'New', 
    paymentStatus: 'Pending',
    totalAmount: '',
    advancePaid: '',
    assignedPhotographerId: null
  });

  const categories = ['All', 'Wedding', 'Event', 'Business', 'Drone Show'];
  const statuses = ['All', ...workflow];

  const filtered = bookings.filter(b => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || b.category === catFilter;
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchDate = !dateFilter || b.date === dateFilter;
    return matchSearch && matchCat && matchStatus && matchDate;
  });

  const getAvailablePhotographers = (date, currentAssignedId) => {
    // A photographer is busy if they have a calendar event on that date
    const busyIds = calendarEvents
      .filter(event => event.date === date)
      .map(event => event.photographerId);
    
    return photographers.filter(p => 
      p.status === 'Available' && (!busyIds.includes(p.id) || p.id === currentAssignedId)
    );
  };

  const handleDelete = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    setDetailOpen(false);
  };

  const openEdit = (booking) => {
    setEditing(booking.id);
    setForm({ 
      ...booking,
      totalAmount: String(booking.totalAmount || ''),
      advancePaid: String(booking.advancePaid || '')
    });
    setEditOpen(true);
    setDetailOpen(false);
  };

  const handleSave = () => {
    if (!form.customer.trim()) return;
    const updatedData = {
      ...form,
      totalAmount: Number(form.totalAmount),
      advancePaid: Number(form.advancePaid),
      assignedPhotographerId: form.assignedPhotographerId ? Number(form.assignedPhotographerId) : null
    };
    setBookings(prev => prev.map(b => b.id === editing ? { ...b, ...updatedData } : b));
    setEditOpen(false);
  };

  const updateStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
  };

  const columns = [
    { key: 'id', label: 'Booking ID', render: v => <span className="font-mono text-[#f5b400] text-xs">{v}</span> },
    { key: 'customer', label: 'Customer', render: (v, row) => (
      <div>
        <p className="font-medium text-white text-sm">{v}</p>
        <p className="text-xs text-gray-500">{row.phone}</p>
      </div>
    )},
    { key: 'category', label: 'Category', render: v => {
      const colors = {
        Wedding: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
        Event: 'text-green-400 bg-green-500/10 border-green-500/20',
        Business: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        'Drone Show': 'text-purple-400 bg-purple-500/10 border-purple-500/20'
      };
      const cls = colors[v] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${cls}`}>{v}</span>;
    }},
    { key: 'date', label: 'Date / Assigned', render: (_, row) => (
      <div className="space-y-1">
        <p className="text-gray-300 text-xs font-semibold">{row.date}</p>
        {row.assignedPhotographerId ? (
          <p className="text-[10px] text-[#f5b400] flex items-center gap-1 font-bold italic">
             <Camera size={10} /> {photographers.find(p => p.id === row.assignedPhotographerId)?.name}
          </p>
        ) : (
          <p className="text-[10px] text-red-500/50 flex items-center gap-1">
             <AlertCircle size={10} /> Unassigned
          </p>
        )}
      </div>
    )},
    { key: 'payment', label: 'Balance', render: (_, row) => {
      const balance = (row.totalAmount || 0) - (row.advancePaid || 0);
      return (
        <div>
          <p className="text-white text-sm font-black">₹{balance.toLocaleString('en-IN')}</p>
          <StatusBadge status={row.paymentStatus} />
        </div>
      );
    }},
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'actions', label: '', render: (_, row) => (
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); setSelected(row); setDetailOpen(true); }} className="p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors">
          <Eye size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="p-1.5 rounded-lg text-gray-500 hover:text-[#f5b400] transition-colors">
          <Pencil size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    )},
  ];

  const assignedPh = photographers.find(p => p.id === selected?.assignedPhotographerId);
  const balance = (selected?.totalAmount || 0) - (selected?.advancePaid || 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">Booking Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} total bookings managed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-[#141414] p-4 rounded-2xl border border-[#2a2a2a]">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-550" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..."
            className="w-full pl-10 pr-4 py-2 bg-[#0f0f0f] border border-[#222] rounded-xl text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#f5b400]/30 transition-all" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2 bg-[#0f0f0f] border border-[#222] rounded-xl text-xs text-gray-400 focus:outline-none focus:border-[#f5b400]/30">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-[#0f0f0f] border border-[#222] rounded-xl text-xs text-gray-400 focus:outline-none focus:border-[#f5b400]/30">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="px-3 py-2 bg-[#0f0f0f] border border-[#222] rounded-xl text-xs text-gray-400 focus:outline-none focus:border-[#f5b400]/30" />
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={(row) => { setSelected(row); setDetailOpen(true); }} />

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title={`Booking Summary ${selected?.id}`} size="md">
        {selected && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-start justify-between p-4 bg-[#141414] rounded-2xl border border-[#2a2a2a]">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Main Status</p>
                <StatusBadge status={selected.status} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Payment Status</p>
                <StatusBadge status={selected.paymentStatus} />
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Change Workflow</p>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)}
                  className="bg-[#0f0f0f] border border-[#333] rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#f5b400]">
                  {workflow.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Amount', val: selected.totalAmount, color: 'text-white' },
                { label: 'Advance Paid', val: selected.advancePaid, color: 'text-green-400' },
                { label: 'Balance Due', val: balance, color: 'text-[#f5b400]' },
              ].map(item => (
                <div key={item.label} className="bg-[#1a1a1a] p-3 rounded-2xl border border-[#2a2a2a]">
                  <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">{item.label}</p>
                  <p className={`text-lg font-black ${item.color}`}>₹{item.val?.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { label: 'Customer', val: selected.customer, icon: UserIcon },
                  { label: 'Contact', val: selected.phone, icon: Phone },
                  { label: 'Shoot Date', val: selected.date, icon: Calendar },
                  { label: 'Location', val: selected.location, icon: MapPin },
                ].map(item => (
                  <div key={item.label} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <item.icon size={14} className="text-[#f5b400]" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Assignment Section */}
              <div className="space-y-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a]">
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                   <Camera size={14} className="text-[#f5b400]" /> Photographer Assignment
                 </p>
                 {assignedPh ? (
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f5b400]/10 border border-[#f5b400]/20 flex items-center justify-center text-[#f5b400] text-lg font-black">
                        {assignedPh.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{assignedPh.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">Expertise: {assignedPh.specialization}</p>
                      </div>
                   </div>
                 ) : (
                   <div className="p-3 bg-red-500/5 border border-dashed border-red-500/20 rounded-xl text-center">
                      <p className="text-xs text-red-400 font-medium italic">No photographer assigned yet</p>
                   </div>
                 )}
                 
                 <div className="pt-2">
                    <button onClick={() => openEdit(selected)} className="text-[10px] font-bold text-[#f5b400] underline uppercase cursor-pointer">
                      Click Edit to Assign Team
                    </button>
                 </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#222]">
              <button onClick={() => openEdit(selected)} className="flex-1 py-4 bg-[#f5b400] text-black text-xs font-black rounded-2xl hover:bg-[#ffc107] transition-all uppercase tracking-widest">
                Modify Booking Details
              </button>
              <button onClick={() => handleDelete(selected.id)} className="px-6 py-4 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500/10 transition-colors uppercase tracking-widest text-[10px] font-bold">
                 Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Modify Booking Configuration" size="lg">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
            <div className="md:col-span-2 flex items-center gap-2 p-3 bg-[#f5b400]/5 border border-[#f5b400]/10 rounded-xl mb-2">
               <IndianRupee size={16} className="text-[#f5b400]" />
               <p className="text-[10px] text-[#f5b400] font-bold uppercase tracking-widest">Financial & Logistics Adjustment</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Customer Name</label>
                <input value={form.customer} onChange={e => setForm({...form, customer: e.target.value})} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Phone</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Shoot Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Location</label>
                <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Total Amount (₹)</label>
                  <input type="number" value={form.totalAmount} onChange={e => setForm({...form, totalAmount: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Advance Paid (₹)</label>
                  <input type="number" value={form.advancePaid} onChange={e => setForm({...form, advancePaid: e.target.value})} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Assign Team Member</label>
                  <select 
                    value={form.assignedPhotographerId || ''} 
                    onChange={e => setForm({...form, assignedPhotographerId: e.target.value})} 
                    className={inputCls}
                  >
                    <option value="">Unassigned</option>
                    {getAvailablePhotographers(form.date, form.assignedPhotographerId).map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.specialization}) - {p.rating}★
                      </option>
                    ))}
                  </select>
                  <p className="text-[9px] text-gray-600 mt-2 italic px-1">* Listing only members available on {form.date || 'selected date'}</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Category</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputCls}>
                      {['Wedding', 'Event', 'Business', 'Drone Show'].map(c => <option key={c}>{c}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Workflow</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={inputCls}>
                      {workflow.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
               </div>
               
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Payment Status</label>
                  <select value={form.paymentStatus} onChange={e => setForm({...form, paymentStatus: e.target.value})} className={inputCls}>
                    {paymentStatuses.map(s => <option key={s}>{s}</option>)}
                  </select>
               </div>

               <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-2xl">
                  <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} /> Auto-Balance Calculation
                  </p>
                  <p className="text-xl font-black text-white mt-1">₹{(Number(form.totalAmount) - Number(form.advancePaid)).toLocaleString('en-IN')}</p>
               </div>
            </div>

            <div className="md:col-span-2 pt-4 flex gap-4">
               <button onClick={() => setEditOpen(false)} className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 text-[10px] font-bold rounded-2xl transition-all uppercase tracking-widest">Discard Changes</button>
               <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-xl hover:bg-[#ffc107] transition-all">Complete Reconfiguration</button>
            </div>
         </div>
      </Modal>
    </div>
  );
}
