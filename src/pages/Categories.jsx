import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { categories as initialCategories } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

export default function Categories() {
  const [items, setItems] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', status: 'Active', image: '📷' });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', description: '', status: 'Active', image: '📷' });
    setModalOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, description: item.description, status: item.status, image: item.image });
    setModalOpen(true);
  };
  const handleDelete = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage shoot categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                <td className="px-5 py-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-white">{item.name}</td>
                <td className="px-5 py-4 text-gray-400 hidden md:table-cell max-w-xs truncate">{item.description}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Category' : 'Add Category'} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Icon / Emoji</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors" placeholder="e.g. 💍" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Category Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors" placeholder="e.g. Wedding" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors resize-none" placeholder="Category description..." />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-xl hover:border-[#3a3a3a] transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
              {editing ? 'Update' : 'Add Category'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
