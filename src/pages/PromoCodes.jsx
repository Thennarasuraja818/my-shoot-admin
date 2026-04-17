import { useState } from 'react';
import { Search, Plus, Trash2, Ticket, Users, Calendar, Award, Power, X } from 'lucide-react';
import { promoCodes as allPromoCodes, users } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder:text-gray-700";

export default function PromoCodes() {
   const [promos, setPromos] = useState(allPromoCodes);
   const [search, setSearch] = useState('');
   const [addOpen, setAddOpen] = useState(false);
   const [userSearch, setUserSearch] = useState('');
   const [form, setForm] = useState({
      code: '',
      type: 'Percentage',
      value: '',
      expiry: '',
      usageLimit: '',
      target: 'All Users',
      status: 'Active',
      userIds: []
   });

   const filtered = promos.filter(p =>
      p.code.toLowerCase().includes(search.toLowerCase())
   );

   const handleDelete = (id) => {
      setPromos(prev => prev.filter(p => p.id !== id));
   };

   const handleToggleStatus = (id) => {
      setPromos(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
   };

   const handleAdd = () => {
      if (!form.code.trim() || !form.value) return;
      setPromos(prev => [...prev, { id: Date.now(), ...form, usedCount: 0 }]);
      setAddOpen(false);
      resetForm();
   };

   const resetForm = () => {
      setForm({ code: '', type: 'Percentage', value: '', expiry: '', usageLimit: '', target: 'All Users', status: 'Active', userIds: [] });
      setUserSearch('');
   };

   const toggleUser = (userId) => {
      setForm(prev => {
         const exists = prev.userIds.includes(userId);
         return {
            ...prev,
            userIds: exists
               ? prev.userIds.filter(id => id !== userId)
               : [...prev.userIds, userId]
         };
      });
   };

   const searchableUsers = users.filter(u =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) &&
      !form.userIds.includes(u.id)
   );

   const selectedUsers = users.filter(u => form.userIds.includes(u.id));

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between flex-wrap gap-4 bg-[#141414] p-6 rounded-3xl border border-[#222]">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#f5b400]/10 flex items-center justify-center text-[#f5b400] border border-[#f5b400]/20">
                  <Ticket size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-white tracking-tight uppercase tracking-widest">Promotion Systems</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Manage discounts and exclusive user coupons</p>
               </div>
            </div>
            <button onClick={() => setAddOpen(true)} className="px-5 py-3 bg-[#f5b400] text-black text-xs font-black rounded-xl hover:shadow-[0_0_25px_rgba(245,180,0,0.3)] transition-all uppercase tracking-widest flex items-center gap-2">
               <Plus size={16} strokeWidth={3} /> Create Coupon
            </button>
         </div>

         <div className="relative max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search codes..."
               className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-2xl text-sm text-gray-300 focus:outline-none focus:border-[#f5b400]/30 transition-all" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(promo => (
               <div key={promo.id} className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${promo.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />

                  <div className="flex justify-between items-start mb-6">
                     <div className="px-3 py-1.5 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-xl">
                        <span className="text-lg font-black text-[#f5b400] tracking-wider">{promo.code}</span>
                     </div>
                     <StatusBadge status={promo.status} />
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Benefit</span>
                        <span className="text-xl font-black text-white">{promo.type === 'Percentage' ? `${promo.value}% OFF` : `₹${promo.value} Flat`}</span>
                     </div>

                     <div className="bg-[#0c0c0c] rounded-2xl p-4 border border-[#2a2a2a] space-y-3">
                        <div className="flex items-center justify-between text-[11px]">
                           <span className="flex items-center gap-2 text-gray-500"><Users size={12} /> Target</span>
                           <span className={`font-bold ${promo.target === 'Selected Users' ? 'text-blue-400' : 'text-gray-300'}`}>{promo.target}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                           <span className="flex items-center gap-2 text-gray-500"><Calendar size={12} /> Expiry</span>
                           <span className="font-bold text-gray-300">{promo.expiry}</span>
                        </div>
                        <div className="pt-2 border-t border-[#222]">
                           <div className="flex justify-between mb-1.5 text-[10px] font-bold uppercase tracking-tighter">
                              <span className="text-gray-500">Usage Progress</span>
                              <span className="text-[#f5b400]">{promo.usedCount} / {promo.usageLimit}</span>
                           </div>
                           <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                              <div className="h-full bg-[#f5b400]" style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }} />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                     <button onClick={() => handleToggleStatus(promo.id)} className="flex-1 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
                        <Power size={12} /> {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                     </button>
                     <button onClick={() => handleDelete(promo.id)} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Add Modal */}
         <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Configure New Promotion" size="md">
            <div className="space-y-5 py-2">
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Coupon Code</label>
                  <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. FESTIVE2026" className={inputCls} />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Benefit Type</label>
                     <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls}>
                        <option value="Percentage">Percentage (%)</option>
                        <option value="Fixed">Fixed Amount (₹)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Benefit Value</label>
                     <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="e.g. 10 or 500" className={inputCls} />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Global Usage Limit</label>
                     <input type="number" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} placeholder="e.g. 100" className={inputCls} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Expiration Date</label>
                     <input type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} className={inputCls} />
                  </div>
               </div>

               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Eligibility Control</label>
                  <div className="grid grid-cols-2 gap-3">
                     {['All Users', 'Selected Users'].map(t => (
                        <button key={t} onClick={() => setForm({ ...form, target: t })}
                           className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${form.target === t ? 'bg-[#f5b400] text-black border-[#f5b400]' : 'bg-[#141414] text-gray-500 border-[#2a2a2a] hover:border-gray-500'}`}>
                           {t}
                        </button>
                     ))}
                  </div>

                  {form.target === 'Selected Users' && (
                     <div className="mt-4 space-y-4">
                        {/* Selected User Chips */}
                        {selectedUsers.length > 0 && (
                           <div className="flex flex-wrap gap-2 p-3 bg-[#0c0c0c] border border-[#2a2a2a] rounded-2xl max-h-32 overflow-y-auto">
                              {selectedUsers.map(u => (
                                 <div key={u.id} className="flex items-center gap-2 px-3 py-1.5 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-lg text-[10px] font-bold text-[#f5b400]">
                                    {u.name}
                                    <button onClick={() => toggleUser(u.id)} className="hover:text-white transition-colors">
                                       <X size={12} />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}

                        {/* User Search Input */}
                        <div className="relative">
                           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                           <input
                              value={userSearch}
                              onChange={e => setUserSearch(e.target.value)}
                              placeholder="Search and select users..."
                              className={inputCls.replace('px-3', 'pl-10')}
                           />
                        </div>

                        {/* Search Results */}
                        {userSearch && (
                           <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                              {searchableUsers.length > 0 ? (
                                 searchableUsers.map(u => (
                                    <button
                                       key={u.id}
                                       onClick={() => { toggleUser(u.id); setUserSearch(''); }}
                                       className="w-full p-3 text-left hover:bg-[#1a1a1a] border-b border-[#222] last:border-0 transition-colors"
                                    >
                                       <div className="flex flex-col">
                                          <span className="text-xs font-bold text-white">{u.name}</span>
                                          <span className="text-[10px] text-gray-500">{u.phone}</span>
                                       </div>
                                    </button>
                                 ))
                              ) : (
                                 <div className="p-4 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                    No results found
                                 </div>
                              )}
                           </div>
                        )}
                     </div>
                  )}
               </div>

               <div className="flex gap-4 pt-4">
                  <button onClick={() => setAddOpen(false)} className="flex-1 py-4 bg-[#111] border border-[#222] text-[10px] font-bold text-gray-600 rounded-2xl uppercase tracking-widest">Cancel</button>
                  <button onClick={handleAdd} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-[#ffc107]">Publish System</button>
               </div>
            </div>
         </Modal>
      </div>
   );
}
