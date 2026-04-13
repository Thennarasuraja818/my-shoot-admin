import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock, Package as PkgIcon, Sparkles } from 'lucide-react';
import { packages as initial } from '../data/mockData';
import Modal from '../components/Modal';

// Category color mapping
const pkgCategoryColors = { Wedding: '#f5b400', Event: '#22c55e', Business: '#3b82f6', 'Drone Show': '#a855f7' };
const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors";

// Hourly Basis data for Events (2, 4, 6 hours)
const initialEventHourly = [
  { id: 101, label: 'Standard Party Coverage', time: '2 Hours', price: 6500, available: true },
  { id: 102, label: 'Mid-Session Event', time: '4 Hours', price: 12000, available: true },
  { id: 103, label: 'Extended Event Coverage', time: '6 Hours', price: 18000, available: true },
];

export default function Packages() {
  const [items, setItems] = useState(initial);
  const [hourlySlots, setHourlySlots] = useState(initialEventHourly);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [form, setForm] = useState({ name: '', category: 'Wedding', price: '', duration: '', deliverables: '', description: '', image: '📸' });

  // Categories include 'Event' again
  const categories = ['All', 'Wedding', 'Event', 'Business', 'Drone Show'];
  
  // Filter items based on category
  const filtered = filterCat === 'All' ? items : items.filter(i => i.category === filterCat);

  const openAdd = () => { 
    setEditing(null); 
    setForm({ name: '', category: filterCat === 'All' ? 'Wedding' : filterCat, price: '', duration: '', deliverables: '', description: '', image: '📸' }); 
    setModalOpen(true); 
  };
  
  const openEdit = (item) => { 
    setEditing(item.id); 
    setForm({ name: item.name, category: item.category, price: String(item.price), duration: item.duration, deliverables: item.deliverables, description: item.description, image: item.image }); 
    setModalOpen(true); 
  };
  
  const handleDelete = (id) => setItems(prev => prev.filter(i => i.id !== id));
  
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? { ...i, ...form, price: Number(form.price) } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...form, price: Number(form.price) }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Page header */}
      <div>
        <h2 className="text-xl font-bold text-white uppercase tracking-tight">Shoot Packages</h2>
        <p className="text-sm text-gray-500 mt-1">Manage pricing models across all photography categories.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${filterCat === cat ? 'bg-[#f5b400] text-black border-[#f5b400] shadow-[0_0_15px_rgba(245,180,0,0.2)]' : 'bg-[#141414] border-[#2a2a2a] text-gray-500 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-6 py-2.5 bg-[#f5b400] text-black text-xs font-black rounded-xl hover:bg-[#ffc107] transition-all uppercase tracking-widest">
          <Plus size={16} strokeWidth={3} /> Add New Package
        </button>
      </div>

      {/* Special Hourly Basis section for Events */}
      {filterCat === 'Event' && (
        <section className="space-y-4 pt-4 border-t border-[#2a2a2a] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#f5b400]/10 flex items-center justify-center text-[#f5b400] border border-[#f5b400]/20">
                <Clock size={20} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Hourly Basis Pricing</h3>
                <p className="text-xs text-gray-500">Standard time-based event coverage</p>
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {hourlySlots.map(slot => (
              <div key={slot.id} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#f5b400]/30 transition-all group">
                <p className="text-[10px] font-bold text-[#f5b400] uppercase tracking-widest mb-1">{slot.time} Session</p>
                <h4 className="text-sm font-semibold text-white group-hover:text-[#f5b400] transition-colors">{slot.label}</h4>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-white">₹{slot.price.toLocaleString('en-IN')}</p>
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer">
                      <Pencil size={12} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Standard Package Cards */}
      <div className="space-y-4">
        {filterCat === 'Event' && (
           <h3 className="text-lg font-bold text-white tracking-tight mt-6 flex items-center gap-2">
             <PkgIcon size={18} className="text-[#22c55e]" /> Event Shoot Packages
           </h3>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(pkg => {
            const color = pkgCategoryColors[pkg.category] || '#f5b400';
            return (
              <div key={pkg.id} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#333] transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: color }} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 bg-[#1a1a1a]">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}>
                    {pkg.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#f5b400] transition-colors">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mt-2 flex-1 leading-relaxed line-clamp-2">{pkg.description}</p>
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
                    <Clock size={13} className="text-gray-600" /><span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
                    <PkgIcon size={13} className="text-gray-600" /><span className="truncate">{pkg.deliverables}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#222]">
                  <p className="text-xl font-black" style={{ color }}>₹{pkg.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(pkg)} className="p-2.5 rounded-xl text-gray-500 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(pkg.id)} className="p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modify Package' : 'Create New Package'} size="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div className="md:col-span-2 flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl mb-2">
              <Sparkles size={14} className="text-blue-400" />
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">New Package Formulation</p>
           </div>
           
          {[['Icon/Emoji', 'image', '📸'], ['Package Name', 'name', 'e.g. Royal Wedding'], ['Price (₹)', 'price', 'e.g. 75000'], ['Duration', 'duration', 'e.g. 8 Hours']].map(([label, field, ph]) => (
            <div key={field}>
              <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">{label}</label>
              <input value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                placeholder={ph} className={inputCls} type={field === 'price' ? 'number' : 'text'} />
            </div>
          ))}
          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
              {['Wedding', 'Event', 'Business', 'Drone Show'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Deliverables</label>
            <input value={form.deliverables} onChange={e => setForm({ ...form, deliverables: e.target.value })} placeholder="e.g. 500 edited photos" className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} placeholder="Detailed package description..." />
          </div>
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 text-[10px] font-bold rounded-2xl transition-all uppercase tracking-widest">Discard</button>
            <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest shadow-xl hover:bg-[#ffc107]">Save Package Configuration</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
