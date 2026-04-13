import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock } from 'lucide-react';

const initialSlots = [
  { id: 1, label: 'Morning Session', time: '07:00 AM - 09:00 AM', price: 5000, category: 'All', available: true },
  { id: 2, label: 'Forenoon Session', time: '09:00 AM - 12:00 PM', price: 8000, category: 'All', available: true },
  { id: 3, label: 'Afternoon Session', time: '12:00 PM - 03:00 PM', price: 7000, category: 'Business', available: true },
  { id: 4, label: 'Evening Session', time: '04:00 PM - 07:00 PM', price: 9000, category: 'Event', available: true },
  { id: 5, label: 'Golden Hour', time: '05:30 PM - 07:00 PM', price: 6000, category: 'Wedding', available: false },
  { id: 6, label: 'Night Session', time: '07:00 PM - 10:00 PM', price: 12000, category: 'Drone Show', available: true },
];

const categoryColors = { All: '#9ca3af', Wedding: '#f5b400', Event: '#22c55e', Business: '#3b82f6', 'Drone Show': '#a855f7' };

export default function HourlyPricing() {
  const [slots, setSlots] = useState(initialSlots);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ label: '', time: '', price: '', category: 'All', available: true });

  const openAdd = () => { setEditing(null); setForm({ label: '', time: '', price: '', category: 'All', available: true }); setModalOpen(true); };
  const openEdit = (s) => { setEditing(s.id); setForm({ label: s.label, time: s.time, price: String(s.price), category: s.category, available: s.available }); setModalOpen(true); };
  const handleDelete = (id) => setSlots(prev => prev.filter(s => s.id !== id));
  const handleSave = () => {
    if (!form.label || !form.time) return;
    if (editing) {
      setSlots(prev => prev.map(s => s.id === editing ? { ...s, ...form, price: Number(form.price) } : s));
    } else {
      setSlots(prev => [...prev, { id: Date.now(), ...form, price: Number(form.price) }]);
    }
    setModalOpen(false);
  };
  const toggleAvail = (id) => setSlots(prev => prev.map(s => s.id === id ? { ...s, available: !s.available } : s));

  const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Hourly Pricing</h2>
          <p className="text-sm text-gray-500 mt-0.5">Configure time slot pricing</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
          <Plus size={16} /> Add Slot
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {slots.map(slot => {
          const color = categoryColors[slot.category] || '#9ca3af';
          return (
            <div key={slot.id} className={`bg-[#141414] border rounded-2xl p-5 transition-all duration-200 ${slot.available ? 'border-[#2a2a2a] hover:border-[#3a3a3a]' : 'border-[#2a2a2a] opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <Clock size={18} style={{ color }} />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAvail(slot.id)}
                    className={`relative inline-flex w-9 h-5 rounded-full transition-colors ${slot.available ? 'bg-[#f5b400]' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block w-3.5 h-3.5 bg-white rounded-full mt-0.5 transition-transform ${slot.available ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-semibold text-white">{slot.label}</h3>
              <p className="text-xs text-gray-500 mt-1">{slot.time}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2a2a2a]">
                <div>
                  <p className="text-xl font-bold text-[#f5b400]">₹{slot.price.toLocaleString('en-IN')}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}>{slot.category}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(slot)} className="p-2 rounded-lg text-gray-400 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(slot.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Slot' : 'Add Time Slot'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Label</label>
                <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className={inputCls} placeholder="e.g. Golden Hour" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Time Range</label>
                <input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inputCls} placeholder="e.g. 05:30 PM - 07:00 PM" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Price (₹)</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className={inputCls} placeholder="e.g. 8000" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  {['All', 'Wedding', 'Event', 'Business', 'Drone Show'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-xl">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">{editing ? 'Update' : 'Add Slot'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
