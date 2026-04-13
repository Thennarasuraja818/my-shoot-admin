import { useState } from 'react';
import { Plus, Pencil, Trash2, Video, Image as ImageIcon, Upload, Sparkles, X } from 'lucide-react';
import { portfolioItems as initial } from '../data/mockData';
import Modal from '../components/Modal';

const categories = ['All', 'Wedding', 'Event', 'Business', 'Drone'];
const bgGradients = {
  Wedding: 'from-pink-900/30 to-rose-900/10',
  Event: 'from-green-900/30 to-emerald-900/10',
  Business: 'from-blue-900/30 to-sky-900/10',
  Drone: 'from-purple-900/30 to-violet-900/10',
};

const inputCls = "w-full px-3 py-2.5 bg-[#141414] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-all placeholder:text-gray-700";

export default function Portfolio() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Wedding', type: 'image', description: '', emoji: '📸' });

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);
  
  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', category: filter === 'All' ? 'Wedding' : filter, type: 'image', description: '', emoji: '📸' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest leading-none">Global Portfolio</h2>
          <p className="text-xs text-gray-500 mt-2 font-medium tracking-tight">Curating {items.length} professional visual assets</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-6 py-3 bg-[#f5b400] text-black text-xs font-black rounded-xl hover:shadow-[0_0_20px_rgba(245,180,0,0.2)] transition-all uppercase tracking-widest">
          <Upload size={16} strokeWidth={3} /> Upload Masterpiece
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 flex-wrap bg-[#141414] p-1.5 rounded-2xl border border-[#2a2a2a] w-fit">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#f5b400] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Upload Zone */}
        <button onClick={openAdd}
          className="bg-[#141414] border-2 border-dashed border-[#2a2a2a] rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-[#f5b400]/40 hover:bg-[#f5b400]/5 transition-all group min-h-[260px]">
          <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#f5b400]/20 group-hover:scale-110 transition-all shadow-inner">
            <Plus size={24} className="text-gray-600 group-hover:text-[#f5b400]" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-gray-400 group-hover:text-gray-200 uppercase tracking-widest">New Entry</p>
            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">Support Media 4K+</p>
          </div>
        </button>

        {filtered.map(item => (
          <div key={item.id} className={`relative bg-gradient-to-br ${bgGradients[item.category] || 'from-gray-900/40 to-gray-800/20'} border border-[#2a2a2a] rounded-3xl overflow-hidden group hover:border-[#3a3a3a] hover:translate-y-[-4px] transition-all min-h-[260px] flex flex-col shadow-xl`}>
            {/* Media Area */}
            <div className="flex-1 flex items-center justify-center bg-[#0f0f0f]/40 relative overflow-hidden">
               {/* Background Decorative Element */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none" style={{ backgroundColor: item.category === 'Wedding' ? '#f43f5e' : item.category === 'Event' ? '#10b981' : item.category === 'Business' ? '#0ea5e9' : '#a855f7' }} />
               
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
              <div className="absolute top-4 right-4 z-20">
                {item.type === 'video' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border border-white/5">
                    <Video size={12} className="text-purple-400" /> Video
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border border-white/5">
                    <ImageIcon size={12} className="text-blue-400" /> Photo
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 bg-[#141414] border-t border-[#1e1e1e] relative z-20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate leading-tight tracking-tight uppercase">{item.title}</p>
                  <p className="text-[10px] text-[#f5b400] font-bold mt-1 uppercase tracking-widest">{item.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#222]">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-2.5 rounded-xl bg-white/5 text-gray-500 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-all">
                       <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2.5 rounded-xl bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                       <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                     <Sparkles size={12} className="text-[#f5b400]" />
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Refine Portfolio Asset" : "Initialize New Asset"} size="sm">
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl mb-1">
             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Upload size={18} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master File Upload</p>
                <p className="text-[9px] text-gray-600 uppercase tracking-tighter">RAW / TIFF / ProRes Supported</p>
             </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
             <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Emoji</label>
                <input value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} className={inputCls} placeholder="📸" />
             </div>
             <div className="col-span-3">
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Asset Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Cinematic Wedding Finale" />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {['Wedding', 'Event', 'Business', 'Drone'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Asset Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls}>
                <option value="image">Still Photography</option>
                <option value="video">Motion Video</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Narrative / Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
              className={`${inputCls} resize-none`} placeholder="Describe the creative context..." />
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-4 bg-[#111] border border-[#222] text-[10px] font-bold text-gray-600 rounded-2xl uppercase tracking-widest">Discard</button>
            <button onClick={handleSave} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-[#ffc107] shadow-xl">
               {editing ? 'Update Registry' : 'Publish to Gallery'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
