import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Upload, X } from 'lucide-react';
import { banners as initialBanners } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

export default function Banners() {
  const [items, setItems] = useState(initialBanners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const fileInputRef = useRef(null);

  // Banner Form State
  const [form, setForm] = useState({ 
    title: '', 
    image: '', 
    status: 'Active' 
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', image: '', status: 'Active' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ 
      title: item.title, 
      image: item.image, 
      status: item.status 
    });
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.image.trim()) {
      alert('Please fill in the Title and Upload an Image');
      return;
    }

    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Banner Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your application banners and promotional content</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors"
        >
          <Plus size={16} /> Add Banner
        </button>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Banner</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-4">
                    <div className="w-24 h-14 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">{item.title}</td>
                  <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="p-10 text-center text-gray-500">No banners found. Add your first banner to get started.</div>
        )}
      </div>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editing ? 'Edit Banner' : 'Add New Banner'} 
        size="sm"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-2">Banner Image</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden" 
              />
              
              {!form.image ? (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-full h-40 border-2 border-dashed border-[#2a2a2a] rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#f5b400]/50 hover:bg-[#f5b400]/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-500 group-hover:text-[#f5b400] transition-colors">
                    <Upload size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-400">Click to upload image</p>
                    <p className="text-[10px] text-gray-600 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-48 rounded-2xl border border-[#2a2a2a] overflow-hidden group">
                  <img src={form.image} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
                    >
                      <Upload size={18} />
                    </button>
                    <button 
                      onClick={() => setForm({ ...form, image: '' })}
                      className="p-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl text-red-500 hover:bg-red-500/30 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1.5 flex items-center gap-1.5">
                Banner Title
              </label>
              <input 
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors" 
                placeholder="Enter banner title" 
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1.5">Display Status</label>
              <select 
                value={form.status} 
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#2a2a2a]">
            <button 
              onClick={() => setModalOpen(false)} 
              className="flex-1 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm font-medium rounded-xl hover:bg-[#222] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="flex-1 py-3 bg-[#f5b400] text-black text-sm font-bold rounded-xl hover:bg-[#e0a300] shadow-lg shadow-[#f5b400]/10 transition-colors"
            >
              {editing ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

