import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, BookOpen, ShieldOff, Mail, Phone, Calendar, IndianRupee } from 'lucide-react';
import { users as allUsers } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder:text-gray-700";

export default function Users() {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', status: 'Active', totalSpent: 0, lastBooking: '' });

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  const toggleBlock = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' } : u));
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setProfileOpen(false);
  };

  const openEdit = (user) => {
    setForm({ ...user });
    setEditOpen(true);
    setProfileOpen(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    setUsers(prev => prev.map(u => u.id === form.id ? { ...u, ...form } : u));
    setEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 bg-[#141414] p-6 rounded-3xl border border-[#222]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight uppercase tracking-widest">Client Ecosystem</h2>
          <p className="text-sm text-gray-500 mt-0.5">{users.length} registered accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-[10px] font-bold text-green-400 capitalize">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {users.filter(u => u.status === 'Active').length} Active
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-bold text-red-400 capitalize">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {users.filter(u => u.status === 'Blocked').length} Blocked
          </div>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search database..."
          className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-2xl text-sm text-gray-300 focus:outline-none focus:border-[#f5b400]/30 transition-all placeholder:text-gray-700" />
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
              {['User Instance', 'Identity', 'Metrics/Bookings', 'Total Spent', 'Last Shoot', 'Registration', 'Status', 'Management'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-b border-[#111] hover:bg-white/5 transition-all group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#f5b400]/10 border border-[#f5b400]/20 flex items-center justify-center text-sm font-black text-[#f5b400] transition-transform group-hover:scale-105 shrink-0">
                      {user.name[0]}
                    </div>
                    <span className="font-bold text-gray-200">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-300 font-medium">{user.email}</span>
                    <span className="text-[10px] text-gray-600">{user.phone}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                       <BookOpen size={12} className="text-[#f5b400]" />
                       <span className="text-xs font-black text-white">{user.bookings}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white font-black text-sm">₹{(user.totalSpent || 0).toLocaleString('en-IN')}</span>
                </td>
                <td className="px-5 py-4 text-gray-300 font-medium text-xs whitespace-nowrap">
                  {user.lastBooking || 'No bookings'}
                </td>
                <td className="px-5 py-4 text-gray-500 font-mono text-[10px]">{user.joined}</td>
                <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setSelected(user); setProfileOpen(true); }}
                      className="p-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                      <Eye size={15} />
                    </button>
                    <button onClick={() => openEdit(user)}
                      className="p-2.5 rounded-xl text-gray-500 hover:text-[#f5b400] hover:bg-[#f5b400]/5 transition-all">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(user.id)}
                      className="p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
                      < Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} title="Detailed User Instance" size="sm">
        {selected && (
          <div className="space-y-6 py-2">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-[#f5b400]/10 border border-[#f5b400]/20 flex items-center justify-center text-3xl font-black text-[#f5b400] shadow-2xl shrink-0">
                {selected.name[0]}
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white tracking-tight">{selected.name}</p>
                <div className="flex items-center gap-2">
                   <StatusBadge status={selected.status} />
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
               {[
                 { label: 'E-mail Address', val: selected.email, icon: Mail },
                 { label: 'Primary Terminal', val: selected.phone, icon: Phone },
                 { label: 'Cumulative Bookings', val: selected.bookings, icon: BookOpen },
                 { label: 'Total Revenue', val: `₹${(selected.totalSpent || 0).toLocaleString('en-IN')}`, icon: IndianRupee },
                 { label: 'Last Project Date', val: selected.lastBooking || 'N/A', icon: Calendar },
                 { label: 'System Accession', val: selected.joined, icon: Calendar },
               ].map((item, i, arr) => (
                 <div key={item.label} className={`flex items-center justify-between px-5 py-4 ${i !== arr.length - 1 ? 'border-b border-[#2a2a2a]' : ''}`}>
                    <div className="flex items-center gap-3">
                       <item.icon size={14} className="text-gray-600" />
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-sm text-gray-200 font-black">{item.val}</span>
                 </div>
               ))}
            </div>

            <div className="flex gap-4 pt-2">
               <button onClick={() => openEdit(selected)} 
                className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-[10px] font-bold text-gray-400 rounded-2xl hover:text-white uppercase tracking-widest">
                  Modify Master Data
               </button>
               <button onClick={() => { toggleBlock(selected.id); setProfileOpen(false); }}
                className={`px-6 py-4 border rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${selected.status === 'Blocked' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {selected.status === 'Blocked' ? 'Grant Access' : 'Restrict Access'}
               </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Update Client Parameters" size="sm">
         <div className="space-y-5 py-2">
           <div>
             <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Full Identity</label>
             <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
           </div>
           <div>
             <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Electronic Mail</label>
             <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Primary Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Account State</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                   <option value="Active">Active</option>
                   <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Total Spent (₹)</label>
                <input type="number" value={form.totalSpent || 0} onChange={e => setForm({ ...form, totalSpent: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Last Booking Date</label>
                <input type="date" value={form.lastBooking || ''} onChange={e => setForm({ ...form, lastBooking: e.target.value })} className={inputCls} />
              </div>
           </div>
           
           <div className="flex gap-4 pt-4">
             <button onClick={() => setEditOpen(false)} className="flex-1 py-4 bg-[#111] border border-[#222] text-[10px] font-bold text-gray-600 rounded-2xl uppercase tracking-widest">Discard</button>
             <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-[#ffc107]">Sync Changes</button>
           </div>
         </div>
      </Modal>
    </div>
  );
}
