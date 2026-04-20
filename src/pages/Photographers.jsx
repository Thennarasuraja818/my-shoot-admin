import { useState, useRef } from 'react';
import { Search, Star, Phone, Plus, UserPlus, ShieldAlert, Award, CheckCircle2, Camera, X, Upload } from 'lucide-react';
import { photographers as allPhotographers } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

const categoryColors = { Wedding: '#f5b400', Event: '#22c55e', Business: '#3b82f6', 'Drone Show': '#a855f7' };
const PRESET_CATEGORIES = ['Wedding', 'Event', 'Business', 'Drone Show'];
const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder:text-gray-700";
const initialForm = { name: '', phone: '', email: '', specializations: [], is_active: true, profile_pic: '' };

export default function Photographers() {
  const [photographers, setPhotographers] = useState(allPhotographers);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomSkill = () => {
    if (!customSkill.trim()) return;
    const currentSkills = Array.isArray(form.skills) ? form.skills : [];
    if (!currentSkills.includes(customSkill.trim())) {
      setForm({ ...form, skills: [...currentSkills, customSkill.trim()] });
    }
    setCustomSkill('');
  };

  const filtered = photographers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.specializations || []).some(c => c.toLowerCase().includes(search.toLowerCase())) ||
    (p.skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async () => {
    // Trim Name
    const trimmedName = form.name.trim();

    // Validation
    if (!trimmedName) {
      alert('Full Name is required');
      return;
    }

    // Email Validation (Mandatory)
    if (!form.email.trim()) {
      alert('Email address is required');
      return;
    }

    // Phone Validation (10-digit numeric)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    const skillsArr = Array.isArray(form.skills) ? form.skills : [];
    setIsSaving(true);

    // Simulate API call
    await new Promise(r => setTimeout(r, 800));

    if (isEditing) {
      setPhotographers(prev => prev.map(p => p.id === editingId ? {
        ...p,
        ...form,
        name: trimmedName,
        skills: skillsArr
      } : p));

      const updatedMember = photographers.find(p => p.id === editingId);
      if (selected && selected.id === editingId) {
        setSelected({ ...updatedMember, ...form, name: trimmedName, skills: skillsArr });
      }
      setIsEditing(false);
      setEditingId(null);
    } else {
      setPhotographers(prev => [...prev, {
        id: Date.now(),
        ...form,
        name: trimmedName,
        skills: skillsArr,
        project_count: 0,
        rating: 0.0,
        rating_count: 0
      }]);
    }

    setIsSaving(false);
    setAddOpen(false);
    setForm(initialForm);
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      phone: p.phone,
      email: p.email || '',
      specializations: p.specializations || [],
      skills: p.skills || [],
      is_active: p.is_active ?? true,
      profile_pic: p.profile_pic || ''
    });
    setEditingId(p.id);
    setIsEditing(true);
    setDetailOpen(false); // Close detail modal
    setAddOpen(true); // Open form modal
  };

  const toggleCategory = (cat) => {
    setForm(prev => {
      const current = prev.specializations || [];
      if (current.includes(cat)) {
        return { ...prev, specializations: current.filter(c => c !== cat) };
      }
      return { ...prev, specializations: [...current, cat] };
    });
  };

  const toggleSkill = (skill) => {
    const currentSkills = typeof form.skills === 'string' ? [] : form.skills;
    if (currentSkills.includes(skill)) {
      setForm({ ...form, skills: currentSkills.filter(s => s !== skill) });
    } else {
      setForm({ ...form, skills: [...currentSkills, skill] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-[#141414] p-6 rounded-3xl border border-[#222]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f5b400]/10 flex items-center justify-center text-[#f5b400] border border-[#f5b400]/20">
            <UserPlus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Team Management</h2>
            <p className="text-sm text-gray-500 mt-0.5">{photographers.length} photographers active in the system</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-widest mr-2">
            <ShieldAlert size={12} /> Admin Access Only
          </div> */}
          <button
            onClick={() => {
              setForm(initialForm);
              setIsEditing(false);
              setEditingId(null);
              setAddOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-[#f5b400] text-black text-xs font-black rounded-xl hover:shadow-[0_0_25px_rgba(245,180,0,0.3)] transition-all uppercase tracking-widest"
          >
            <Plus size={16} strokeWidth={3} /> Onboard Photographer
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, expertise or skills (e.g. drone)..."
            className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-2xl text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-[#f5b400]/30 transition-all shadow-inner" />
        </div>

        {/* <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {[['Available', '#22c55e'], ['Booked', '#f5b400'], ['Leave', '#6b7280']].map(([s, color]) => (
            <div key={s} className="flex items-center gap-1.5 bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span>{s}: {photographers.filter(p => p.status === s).length}</span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(ph => {
          return (
            <div key={ph.id} onClick={() => { setSelected(ph); setDetailOpen(true); }}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#333] hover:translate-y-[-4px] transition-all cursor-pointer group shadow-xl flex flex-col h-full">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  {ph.profile_pic ? (
                    <img src={ph.profile_pic} className="w-20 h-20 rounded-3xl object-cover transition-transform group-hover:scale-110 shadow-lg" alt={ph.name} />
                  ) : (
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black transition-transform group-hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: `${categoryColors[ph.specializations?.[0]] || '#f5b400'}10`,
                        border: `2px solid ${categoryColors[ph.specializations?.[0]] || '#f5b400'}30`,
                        color: categoryColors[ph.specializations?.[0]] || '#f5b400'
                      }}>
                      {ph.name[0]}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-xl border-2 border-[#0f0f0f] bg-[#1a1a1a] flex items-center justify-center">
                    <StatusBadge status={ph.is_active} isIconOnly={true} />
                  </div>
                </div>
                <p className="font-bold text-white text-lg tracking-tight">{ph.name}</p>
                <div className="mt-1.5 flex flex-wrap justify-center gap-1.5 px-2">
                  {(ph.specializations || []).map(cat => (
                    <span key={cat} className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border border-current"
                      style={{ backgroundColor: `${categoryColors[cat] || '#f5b400'}15`, color: categoryColors[cat] || '#f5b400' }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 mb-1">
                <div className="bg-[#1a1a1a]/50 border border-[#2a2a2a] rounded-2xl p-3 text-center">
                  <p className="text-xl font-black text-white">{ph.project_count}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Projects</p>
                </div>
                <div className="bg-[#1a1a1a]/50 border border-[#2a2a2a] rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={12} className="text-[#f5b400]" fill="#f5b400" />
                    <p className="text-xl font-black text-white">{ph.rating}</p>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">({ph.rating_count} reviews)</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#222]">
                <StatusBadge status={ph.is_active} />
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Phone size={12} />
                  <span>**** {ph.phone.slice(-4)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title="Team Member Profile" size="sm">
        {selected && (() => {
          const color = categoryColors[selected.specializations?.[0]] || '#f5b400';
          return (
            <div className="space-y-6 py-2">
              <div className="flex items-center gap-5">
                {selected.profile_pic ? (
                  <img src={selected.profile_pic} className="w-20 h-20 rounded-3xl object-cover shadow-2xl" alt={selected.name} />
                ) : (
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl"
                    style={{ backgroundColor: `${color}10`, border: `2px solid ${color}30`, color }}>
                    {selected.name[0]}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-white tracking-tight">{selected.name}</p>
                    <StatusBadge status={selected.is_active} />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{selected.email || 'No email provided'}</p>

                  {/* Highlighted Stats Section */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-xl">
                      <Star size={14} className="text-[#f5b400]" fill="#f5b400" />
                      <span className="text-sm font-black text-[#f5b400]">{selected.rating}</span>
                      <span className="text-[10px] font-bold text-gray-500">({selected.rating_count} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <span className="text-base text-blue-400">📸</span>
                      <span className="text-sm font-black text-blue-400">{selected.project_count}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Projects</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
                {[['Phone', selected.phone], ['Specializations', (selected.specializations || []).join(', ')]].map(([l, v], i) => (
                  <div key={l} className={`flex justify-between items-center px-5 py-4 ${i === 0 ? 'border-b border-[#2a2a2a]' : ''}`}>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{l}</span>
                    <span className="text-sm text-white font-black text-right">{v}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleEdit(selected)}
                className="w-full py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-xs font-bold text-[#f5b400] rounded-2xl hover:border-[#f5b400]/30 transition-all uppercase tracking-widest"
              >
                Edit Team Record
              </button>
            </div>
          );
        })()}
      </Modal>

      {/* Photographer Form Modal (Add/Edit) */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={isEditing ? "Edit Team Member" : "Onboard New Team Member"} size="md">
        <div className="space-y-5 py-2">
          {/* <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl mb-2">
            <ShieldAlert size={18} className="text-red-500 shrink-0" />
            <p className="text-[10px] text-red-300 font-medium uppercase tracking-tight leading-relaxed">Admin: Please verify personal identity and portfolios before onboarding to the production environment.</p>
          </div> */}

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Compact Profile Picture */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative group">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-3xl bg-[#1a1a1a] border-2 border-dashed border-[#2a2a2a] flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#f5b400]/50 transition-all group shadow-xl"
                  >
                    {form.profile_pic ? (
                      <img src={form.profile_pic} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <>
                        <Camera size={24} className="text-gray-600 group-hover:text-[#f5b400] transition-colors" />
                        <span className="text-[9px] text-gray-700 font-bold uppercase mt-1">Photo</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload size={18} className="text-white" />
                    </div>
                  </div>
                  {form.profile_pic && (
                    <button onClick={(e) => { e.stopPropagation(); setForm({ ...form, profile_pic: '' }); }}
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10">
                      <X size={12} />
                    </button>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>

              {/* Name and Email Row */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="md:col-span-1">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Aakash Raj" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="aakash@myshoot.in" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Phone</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="9876543210 (10 digits)" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Status</label>
                  <div className="flex bg-[#1a1a1a] border border-[#2a2a2a] p-1 rounded-xl h-[42px]">
                    {[true, false].map(s => (
                      <button key={String(s)} type="button" onClick={() => setForm({ ...form, is_active: s })}
                        className={`flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${form.is_active === s ? 'bg-[#2a2a2a] text-white shadow-lg' : 'text-gray-600 hover:text-gray-400'}`}>
                        {s ? 'Active' : 'Inactive'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Specializations (Multiple Select)</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_CATEGORIES.map(cat => {
                  const isSelected = (form.specializations || []).includes(cat);
                  return (
                    <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${isSelected ? 'bg-[#f5b400] text-black border-[#f5b400] shadow-[0_4px_10px_rgba(245,180,0,0.2)]' : 'bg-[#1a1a1a] text-gray-500 border-[#2a2a2a] hover:border-gray-600'}`}>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              disabled={isSaving}
              onClick={() => setAddOpen(false)}
              className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 text-[10px] font-bold rounded-2xl transition-all uppercase tracking-widest font-black active:scale-95 disabled:opacity-50"
            >
              Discard
            </button>
            <button
              disabled={isSaving}
              onClick={handleSubmit}
              className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg active:scale-95 hover:bg-[#ffc107] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Processing...' : (isEditing ? "Update Member Info" : "Save & Onboard")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
