import React, { useState } from 'react';
import { Search, Plus, Ticket } from 'lucide-react';
import { promoCodes as allPromoCodes, packages } from '../data/mockData';
import CouponCard from '../components/coupons/CouponCard';
import CouponModal from '../components/coupons/CouponModal';
import { getEffectiveStatus } from '../utils/couponHelpers';

export default function PromoCodes() {
   const [promos, setPromos] = useState(() => allPromoCodes.map(p => ({
      ...p,
      packageTarget: p.target === 'Selected Users' ? 'Specific Packages' : 'All Packages',
      packageIds: p.userIds || [],
      minAmount: p.minAmount || ''
   })));
   const [search, setSearch] = useState('');
   const [modalOpen, setModalOpen] = useState(false);
   const [editingPromo, setEditingPromo] = useState(null);

   const filtered = promos.filter(p => p.code.toLowerCase().includes(search.toLowerCase()));

   const onSave = (formData) => {
      let finalStatus = formData.status;
      const effective = getEffectiveStatus(editingPromo);
      
      if (effective === 'Expired' || effective === 'Exhausted') {
         finalStatus = 'Active';
      }

      if (editingPromo) {
         setPromos(prev => prev.map(p => p.id === editingPromo.id ? { ...formData, status: finalStatus } : p));
      } else {
         setPromos(prev => [...prev, { id: Date.now(), ...formData, usedCount: 0 }]);
      }
      setModalOpen(false);
   };

   const onDelete = (id) => {
      setPromos(prev => prev.filter(p => p.id !== id));
      setModalOpen(false);
   };

   return (
      <div className="space-y-6">
         {/* Page Header */}
         <div className="flex items-center justify-between flex-wrap gap-4 bg-[#141414] p-6 rounded-3xl border border-[#222]">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#f5b400]/10 flex items-center justify-center text-[#f5b400] border border-[#f5b400]/20">
                  <Ticket size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-white tracking-tight uppercase tracking-widest">Coupon Systems</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Manage discounts and exclusive user coupons</p>
               </div>
            </div>
            <button onClick={() => { setEditingPromo(null); setModalOpen(true); }} className="px-5 py-3 bg-[#f5b400] text-black text-xs font-black rounded-xl hover:shadow-[0_0_25px_rgba(245,180,0,0.3)] transition-all uppercase tracking-widest flex items-center gap-2">
               <Plus size={16} strokeWidth={3} /> Create Coupon
            </button>
         </div>

         {/* Search Filter */}
         <div className="relative max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search codes..."
               className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-2xl text-sm text-gray-300 focus:outline-none focus:border-[#f5b400]/30 transition-all" />
         </div>

         {/* Coupons Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(promo => (
               <CouponCard 
                  key={promo.id} 
                  promo={promo} 
                  onClick={(p) => { setEditingPromo(p); setModalOpen(true); }} 
               />
            ))}
         </div>

         {/* Centralized Modal */}
         <CouponModal 
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={onSave}
            onDelete={onDelete}
            editingPromo={editingPromo}
            packages={packages}
         />
      </div>
   );
}
