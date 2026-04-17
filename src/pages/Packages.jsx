import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock, Package as PkgIcon, Sparkles, FolderTree, X } from 'lucide-react';
import { packages as initial, subcategories } from '../data/mockData';
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

  // Form state
  const [form, setForm] = useState({
    name: '',
    category: 'Wedding',
    subcategory: '',
    price: '',
    duration: '',
    deliverables: [],
    description: '',
    image: '📸'
  });

  // Local state for the "Add New Deliverable" row in the modal
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');

  // Filter categories
  const categories = ['All', 'Wedding', 'Event', 'Business', 'Drone Show'];
  const filtered = filterCat === 'All' ? items : items.filter(i => i.category === filterCat);
  const availableSubcats = subcategories.filter(s => s.categoryName === form.category);

  const openAdd = () => {
    const initialCat = filterCat === 'All' ? 'Wedding' : filterCat;
    const initialSub = subcategories.find(s => s.categoryName === initialCat)?.name || '';
    setEditing(null);
    setForm({
      name: '',
      category: initialCat,
      subcategory: initialSub,
      price: '',
      duration: '',
      deliverables: [],
      description: '',
      image: '📸'
    });
    setNewItemName('');
    setNewItemQty('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory || '',
      price: String(item.price),
      duration: item.duration,
      deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
      description: item.description,
      image: item.image
    });
    setNewItemName('');
    setNewItemQty('');
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

  const addMoreDeliverable = () => {
    if (!newItemName.trim() || !newItemQty.trim()) return;
    setForm(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, { item: newItemName, qty: newItemQty }]
    }));
    setNewItemName('');
    setNewItemQty('');
  };

  const removeDeliverable = (index) => {
    setForm(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  const handleCategoryChange = (cat) => {
    const firstSub = subcategories.find(s => s.categoryName === cat)?.name || '';
    setForm({ ...form, category: cat, subcategory: firstSub });
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

      {/* General Packages List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(pkg => {
          const color = pkgCategoryColors[pkg.category] || '#f5b400';
          return (
            <div key={pkg.id} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#333] transition-all duration-300 flex flex-col group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: color }} />

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl border border-white/5 bg-[#1a1a1a] flex items-center justify-center text-[#f5b400] bg-[#f5b400]/5">
                  <PkgIcon size={24} />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}>
                    {pkg.category}
                  </span>
                  {pkg.subcategory && (
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      <FolderTree size={10} /> {pkg.subcategory}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#f5b400] transition-colors">{pkg.name}</h3>
              <p className="text-xs text-gray-500 mt-2 flex-1 leading-relaxed line-clamp-2">{pkg.description}</p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
                  <Clock size={13} className="text-gray-600" /><span>{pkg.duration} Coverage</span>
                </div>

                {/* Bullet List Display */}
                <ul className="space-y-2 pt-3 border-t border-[#222]">
                  {Array.isArray(pkg.deliverables) && pkg.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#f5b400]" />
                        {del.item}
                      </span>
                      <span className="font-bold text-white">{del.qty}</span>
                    </li>
                  ))}
                </ul>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modify Package' : 'Create New Package'} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* <div className="md:col-span-2 flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl mb-2">
            <Sparkles size={14} className="text-blue-400" />
            <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Premium Package Formulation</p>
          </div> */}

          <div className="md:col-span-2">
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Package Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Royal Wedding" className={inputCls} />
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Price (₹)</label>
            <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 75000" className={inputCls} type="number" />
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Duration</label>
            <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g. 8 Hours" className={inputCls} />
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Category</label>
            <select value={form.category} onChange={e => handleCategoryChange(e.target.value)} className={inputCls}>
              {['Wedding', 'Event', 'Business', 'Drone Show'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Subcategory</label>
            <select value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })} className={inputCls}>
              <option value="">No Subcategory</option>
              {availableSubcats.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          {/* STRUCTURED DELIVERABLES SECTION */}
          <div className="md:col-span-2 bg-[#161616] border border-[#222] rounded-2xl p-5 space-y-4">
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">Deliverables</label>

            {/* List of current deliverables */}
            <div className="space-y-3">
              {form.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-[#222] group">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f5b400]" />
                    <span className="text-xs text-white font-medium">{del.item}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-gray-400">{del.qty}</span>
                    <button onClick={() => removeDeliverable(idx)} className="p-1 text-gray-600 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Header Section */}
            <div className="flex gap-3 pt-2">
              <input
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                placeholder="Item name..."
                className={`${inputCls} flex-1`}
              />
              <input
                value={newItemQty}
                onChange={e => setNewItemQty(e.target.value)}
                placeholder="Qty"
                className={`${inputCls} !w-16 text-center`}
              />
              <button
                onClick={addMoreDeliverable}
                className="px-5 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] text-gray-500 font-extrabold uppercase mb-1.5 tracking-widest">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} placeholder="Detailed package description..." />
          </div>
          <div className="md:col-span-2 flex gap-3 pt-4">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 text-[10px] font-bold rounded-2xl transition-all uppercase tracking-widest">Discard</button>
            <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest shadow-xl hover:bg-[#ffc107]">Save Package Configuration</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
