import { useState } from 'react';
import { Plus, Pencil, Trash2, Layers, FolderTree } from 'lucide-react';
import { categories as initialCategories, subcategories as initialSubcategories } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

export default function Categories() {
  const [activeTab, setActiveTab] = useState('categories');
  const [items, setItems] = useState(initialCategories);
  const [subItems, setSubItems] = useState(initialSubcategories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subEditing, setSubEditing] = useState(null);

  // Category Form State
  const [form, setForm] = useState({ name: '', description: '', status: 'Active', image: '📷' });

  // Subcategory Form State
  const [subForm, setSubForm] = useState({ categoryId: '', name: '', description: '', status: 'Active' });

  // Category Handlers
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

  // Subcategory Handlers
  const openSubAdd = () => {
    setSubEditing(null);
    setSubForm({ categoryId: items[0]?.id || '', name: '', description: '', status: 'Active' });
    setSubModalOpen(true);
  };
  const openSubEdit = (item) => {
    setSubEditing(item.id);
    setSubForm({ categoryId: item.categoryId, name: item.name, description: item.description, status: item.status });
    setSubModalOpen(true);
  };
  const handleSubDelete = (id) => setSubItems(prev => prev.filter(i => i.id !== id));
  const handleSubSave = () => {
    if (!subForm.name.trim() || !subForm.categoryId) return;
    const catName = items.find(c => c.id === parseInt(subForm.categoryId))?.name || 'Unknown';

    if (subEditing) {
      setSubItems(prev => prev.map(i => i.id === subEditing ? { ...i, ...subForm, categoryName: catName, categoryId: parseInt(subForm.categoryId) } : i));
    } else {
      setSubItems(prev => [...prev, { id: Date.now(), ...subForm, categoryName: catName, categoryId: parseInt(subForm.categoryId) }]);
    }
    setSubModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Categories Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your categories and subcategories</p>
        </div>
        <button
          onClick={activeTab === 'categories' ? openAdd : openSubAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors"
        >
          <Plus size={16} /> Add {activeTab === 'categories' ? 'Category' : 'Subcategory'}
        </button>
      </div>

      {/* Custom Tabs */}
      <div className="flex p-1 bg-[#141414] border border-[#2a2a2a] rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'categories'
              ? 'bg-[#f5b400] text-black shadow-lg'
              : 'text-gray-400 hover:text-white'
            }`}
        >
          <Layers size={14} /> Categories
        </button>
        <button
          onClick={() => setActiveTab('subcategories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'subcategories'
              ? 'bg-[#f5b400] text-black shadow-lg'
              : 'text-gray-400 hover:text-white'
            }`}
        >
          <FolderTree size={14} /> Subcategories
        </button>
      </div>

      {activeTab === 'categories' ? (
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
                      {item.image.includes('/') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{item.image}</span>
                      )}
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
      ) : (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subcategory Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent Category</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subItems.map(item => (
                <tr key={item.id} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-4 font-semibold text-white">{item.name}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-[#f5b400]/10 text-[#f5b400] text-[10px] font-bold uppercase rounded-md border border-[#f5b400]/20">
                      {item.categoryName}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell max-w-xs truncate">{item.description}</td>
                  <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openSubEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-[#f5b400] hover:bg-[#f5b400]/10 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleSubDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {subItems.length === 0 && (
            <div className="p-10 text-center text-gray-500">No subcategories found.</div>
          )}
        </div>
      )}

      {/* Category Modal */}
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

      {/* Subcategory Modal */}
      <Modal open={subModalOpen} onClose={() => setSubModalOpen(false)} title={subEditing ? 'Edit Subcategory' : 'Add Subcategory'} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Parent Category</label>
            <select value={subForm.categoryId} onChange={e => setSubForm({ ...subForm, categoryId: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors">
              {items.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Subcategory Name</label>
            <input value={subForm.name} onChange={e => setSubForm({ ...subForm, name: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors" placeholder="e.g. Hindu Wedding" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Description</label>
            <textarea value={subForm.description} onChange={e => setSubForm({ ...subForm, description: e.target.value })} rows={3}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors resize-none" placeholder="Subcategory description..." />
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">Status</label>
            <select value={subForm.status} onChange={e => setSubForm({ ...subForm, status: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setSubModalOpen(false)} className="flex-1 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-xl hover:border-[#3a3a3a] transition-colors">Cancel</button>
            <button onClick={handleSubSave} className="flex-1 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
              {subEditing ? 'Update' : 'Add Subcategory'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
