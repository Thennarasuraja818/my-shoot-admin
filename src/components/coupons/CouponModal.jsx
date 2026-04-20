import React, { useState, useEffect } from 'react';
import { Search, Power, Trash2, X } from 'lucide-react';
import Modal from '../Modal';
import { getEffectiveStatus, inputCls } from '../../utils/couponHelpers';

const CouponModal = ({ open, onClose, onSave, onDelete, editingPromo, packages }) => {
   const [packageSearch, setPackageSearch] = useState('');
   const [form, setForm] = useState({
      code: '',
      type: 'Percentage',
      value: '',
      expiry: '',
      usageLimit: '',
      packageTarget: 'All Packages',
      status: 'Active',
      packageIds: [],
      minAmount: ''
   });

   useEffect(() => {
      if (editingPromo) {
         setForm({ ...editingPromo });
      } else {
         setForm({ 
            code: '', 
            type: 'Percentage', 
            value: '', 
            expiry: '', 
            usageLimit: '', 
            packageTarget: 'All Packages', 
            status: 'Active', 
            packageIds: [], 
            minAmount: '' 
         });
      }
      setPackageSearch('');
   }, [editingPromo, open]);

   const effectiveStatus = getEffectiveStatus(editingPromo);

   const handleSave = () => {
      if (effectiveStatus === 'Exhausted' && Number(form.usageLimit) <= editingPromo.usedCount) {
         alert(`New limit must be greater than current usage (${editingPromo.usedCount})`);
         return;
      }
      onSave(form);
   };

   const togglePackage = (packageId) => {
      setForm(prev => {
         const exists = prev.packageIds.includes(packageId);
         return {
            ...prev,
            packageIds: exists
               ? prev.packageIds.filter(id => id !== packageId)
               : [...prev.packageIds, packageId]
         };
      });
   };

   const searchablePackages = packages.filter(pkg =>
      pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) &&
      !form.packageIds.includes(pkg.id)
   );

   const selectedPackages = packages.filter(pkg => form.packageIds.includes(pkg.id));

   return (
      <Modal open={open} onClose={onClose} title="Edit coupon" size="md">
         <div className="space-y-5 py-2">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                     effectiveStatus === 'Expired' ? 'bg-red-500/20 text-red-500' :
                     effectiveStatus === 'Exhausted' ? 'bg-orange-500/20 text-orange-500' :
                     effectiveStatus === 'Active' ? 'bg-green-500/20 text-green-500' :
                     'bg-gray-500/20 text-gray-400'
                  }`}>
                     {effectiveStatus}
                  </span>
               </div>

               {editingPromo && (effectiveStatus === 'Active' || effectiveStatus === 'Inactive') && (
                  <button 
                     onClick={() => setForm(prev => ({ ...prev, status: prev.status === 'Active' ? 'Inactive' : 'Active' }))}
                     className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        form.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20 hover:bg-gray-500/20'
                     }`}
                  >
                     <Power size={12} /> {form.status === 'Active' ? 'Active' : 'Deactivated'}
                  </button>
               )}
            </div>

            {effectiveStatus === 'Active' || effectiveStatus === 'Inactive' ? (
               <div className="bg-green-500/5 border border-green-500/10 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-green-500/80">All fields editable. Changes apply immediately.</p>
               </div>
            ) : effectiveStatus === 'Expired' ? (
               <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-red-500">Expired on {editingPromo?.expiry}. Only expiry date can be extended to reactivate.</p>
               </div>
            ) : effectiveStatus === 'Exhausted' ? (
               <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-orange-500">Usage limit reached ({editingPromo?.usedCount}/{editingPromo?.usageLimit}). Only the limit can be increased to reactivate.</p>
               </div>
            ) : null}

            <div>
               <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Coupon Code</label>
               <input 
                  value={form.code} 
                  onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} 
                  placeholder="e.g. FESTIVE2026" 
                  className={inputCls}
                  disabled={effectiveStatus !== 'Active' && effectiveStatus !== 'Inactive' && effectiveStatus !== 'New'}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Benefit Type</label>
                  <select 
                     value={form.type} 
                     onChange={e => setForm({ ...form, type: e.target.value })} 
                     className={inputCls}
                     disabled={effectiveStatus !== 'Active' && effectiveStatus !== 'Inactive' && effectiveStatus !== 'New'}
                  >
                     <option value="Percentage">Percentage (%)</option>
                     <option value="Fixed">Fixed Amount (₹)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Benefit Value</label>
                  <input 
                     type="number" 
                     value={form.value} 
                     onChange={e => setForm({ ...form, value: e.target.value })} 
                     placeholder="e.g. 10" 
                     className={inputCls}
                     disabled={effectiveStatus !== 'Active' && effectiveStatus !== 'Inactive' && effectiveStatus !== 'New'}
                  />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Global Usage Limit</label>
                  <input 
                     type="number" 
                     value={form.usageLimit} 
                     onChange={e => setForm({ ...form, usageLimit: e.target.value })} 
                     placeholder="e.g. 100" 
                     className={`${inputCls} ${effectiveStatus === 'Exhausted' ? 'border-[#f5b400] ring-1 ring-[#f5b400]/20' : ''}`}
                     disabled={effectiveStatus === 'Expired'}
                  />
               </div>
               <div>
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Expiration Date</label>
                  <input 
                     type="date" 
                     value={form.expiry} 
                     onChange={e => setForm({ ...form, expiry: e.target.value })} 
                     className={`${inputCls} ${effectiveStatus === 'Expired' ? 'border-[#f5b400] ring-1 ring-[#f5b400]/20' : ''}`}
                     disabled={effectiveStatus === 'Exhausted'}
                  />
               </div>
            </div>

            {effectiveStatus === 'Expired' && (
               <div className="p-4 border-2 border-dashed border-[#f5b400]/30 rounded-2xl bg-[#f5b400]/5">
                  <p className="text-[11px] font-bold text-[#f5b400] uppercase tracking-widest mb-1">Extend the expiry date above to reactivate this coupon</p>
               </div>
            )}

            {effectiveStatus === 'Exhausted' && (
               <div className="p-4 border-2 border-dashed border-[#f5b400]/30 rounded-2xl bg-[#f5b400]/5 space-y-3">
                  <p className="text-[11px] font-bold text-[#f5b400] uppercase tracking-widest mb-1">Increase the usage limit above to reactivate this coupon</p>
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                        <label className="block text-[9px] text-gray-600 font-bold uppercase mb-1">Current Used</label>
                        <div className="px-3 py-2 bg-[#0c0c0c] rounded-xl text-xs text-gray-500 font-bold">{editingPromo?.usedCount} uses</div>
                     </div>
                     <div>
                        <label className="block text-[9px] text-[#f5b400] font-bold uppercase mb-1">New Limit (Min {Number(editingPromo?.usedCount) + 1})</label>
                        <div className="px-3 py-2 bg-[#1a1a1a] border border-[#f5b400]/50 rounded-xl text-xs text-white">e.g. {Number(editingPromo?.usedCount) + 50}</div>
                     </div>
                  </div>
               </div>
            )}

            <div className={effectiveStatus === 'Expired' || effectiveStatus === 'Exhausted' ? 'opacity-40 pointer-events-none' : ''}>
               <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Apply to Packages</label>
               <div className="grid grid-cols-2 gap-3 mb-4">
                  {['All Packages', 'Specific Packages'].map(t => (
                     <button key={t} onClick={() => setForm({ ...form, packageTarget: t })}
                        className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${form.packageTarget === t ? 'bg-[#f5b400] text-black border-[#f5b400]' : 'bg-[#141414] text-gray-500 border-[#2a2a2a] hover:border-gray-500'}`}>
                        {t}
                     </button>
                  ))}
               </div>

               {form.packageTarget === 'All Packages' ? (
                  <div className="mb-5">
                     <div className="bg-[#1a1a1a]/50 border-l-2 border-yellow-500 p-4 rounded-xl mb-5">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">No User Restriction</p>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-medium">Any customer can use this code — eligibility is controlled only by package and min amount</p>
                     </div>
                     
                     <div className="bg-[#0c0c0c] border border-[#222] p-4 rounded-xl mb-5">
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                           When <span className="text-gray-300 font-bold">"All packages"</span> — set a minimum purchase amount below. Coupon shows only when package price meets it.
                        </p>
                     </div>

                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Minimum Purchase Amount (₹)</label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">₹</span>
                        <input 
                           type="number" 
                           value={form.minAmount} 
                           onChange={e => setForm({ ...form, minAmount: e.target.value })} 
                           placeholder="e.g. 15,000" 
                           className={inputCls + " pl-7"} 
                        />
                     </div>
                  </div>
               ) : (
                  <div className="space-y-4">
                     <div className="bg-green-500/5 border border-green-500/10 p-4 rounded-xl">
                        <p className="text-[11px] font-bold text-green-500/80 uppercase tracking-widest mb-1">When "Specific packages" selected:</p>
                        <p className="text-[11px] text-green-700/60 font-medium">Min amount field is hidden/disabled — coupon auto-applies only for chosen packages, no min needed</p>
                     </div>

                     {selectedPackages.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-[#0c0c0c] border border-[#2a2a2a] rounded-2xl max-h-32 overflow-y-auto">
                           {selectedPackages.map(pkg => (
                              <div key={pkg.id} className="flex items-center gap-2 px-3 py-1.5 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-lg text-[10px] font-bold text-[#f5b400]">
                                 {pkg.name}
                                 <button onClick={() => togglePackage(pkg.id)} className="hover:text-white transition-colors">
                                    <X size={12} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}

                     <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                           value={packageSearch}
                           onChange={e => setPackageSearch(e.target.value)}
                           placeholder="Search and select packages..."
                           className={inputCls.replace('px-3', 'pl-10')}
                        />
                     </div>

                     {packageSearch && (
                        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                           {searchablePackages.length > 0 ? (
                              searchablePackages.map(pkg => (
                                 <button
                                    key={pkg.id}
                                    onClick={() => { togglePackage(pkg.id); setPackageSearch(''); }}
                                    className="w-full p-3 text-left hover:bg-[#1a1a1a] border-b border-[#222] last:border-0 transition-colors"
                                 >
                                    <div className="flex flex-col">
                                       <span className="text-xs font-bold text-white">{pkg.name}</span>
                                       <span className="text-[10px] text-gray-500">{pkg.category} - ₹{pkg.price.toLocaleString()}</span>
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
               {editingPromo && (
                  <button 
                     onClick={() => {
                        if (window.confirm('Are you sure you want to delete this coupon?')) {
                           onDelete(editingPromo.id);
                        }
                     }}
                     className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                     <Trash2 size={18} />
                  </button>
               )}
               <button onClick={onClose} className="flex-1 py-4 bg-[#111] border border-[#222] text-[10px] font-bold text-gray-600 rounded-2xl uppercase tracking-widest">Cancel</button>
               <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-[#ffc107]">
                  {effectiveStatus === 'Expired' ? 'Extend & reactivate' : 
                   effectiveStatus === 'Exhausted' ? 'Increase & reactivate' : 
                   editingPromo ? 'Save changes' : 'Publish Coupon Code'}
               </button>
            </div>
         </div>
      </Modal>
   );
};

export default CouponModal;
