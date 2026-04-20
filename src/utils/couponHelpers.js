export const isExpired = (date) => {
   if (!date) return false;
   return new Date(date) < new Date().setHours(0, 0, 0, 0);
};

export const isExhausted = (promo) => {
   return promo && promo.usedCount >= promo.usageLimit;
};

export const getEffectiveStatus = (promo) => {
   if (!promo) return 'New';
   if (isExpired(promo.expiry)) return 'Expired';
   if (isExhausted(promo)) return 'Exhausted';
   return promo.status;
};

export const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";
