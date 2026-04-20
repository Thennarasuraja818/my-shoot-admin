import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { StatusBadge } from '../Table';
import { getEffectiveStatus } from '../../utils/couponHelpers';

const CouponCard = ({ promo, onClick }) => {
   const effectiveStatus = getEffectiveStatus(promo);

   return (
      <div 
         onClick={() => onClick(promo)}
         className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-[#f5b400]/30 transition-all active:scale-[0.98]"
      >
         <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${promo.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />

         <div className="flex justify-between items-start mb-6">
            <div className="px-3 py-1.5 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-xl">
               <span className="text-lg font-black text-[#f5b400] tracking-wider">{promo.code}</span>
            </div>
            <StatusBadge status={effectiveStatus} />
         </div>

         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Benefit</span>
               <span className="text-xl font-black text-white">{promo.type === 'Percentage' ? `${promo.value}% OFF` : `₹${promo.value} Flat`}</span>
            </div>

            <div className="bg-[#0c0c0c] rounded-2xl p-4 border border-[#2a2a2a] space-y-3">
               <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-gray-500"><Award size={12} /> Eligibility</span>
                  <span className={`font-bold ${promo.packageTarget === 'Specific Packages' ? 'text-blue-400' : 'text-gray-300'}`}>{promo.packageTarget}</span>
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
      </div>
   );
};

export default CouponCard;
