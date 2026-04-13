import { useState } from 'react';
import { Search, Star, Phone, Plus, UserPlus, ShieldAlert, Award, CheckCircle2 } from 'lucide-react';
import { photographers as allPhotographers } from '../data/mockData';
import { StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

const specializationColors = { Wedding: '#f5b400', Event: '#22c55e', Business: '#3b82f6', 'Drone Show': '#a855f7' };
const inputCls = "w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white text-sm focus:outline-none focus:border-[#f5b400]/50 transition-colors placeholder:text-gray-700";
const initialForm = { name: '', phone: '', email: '', specialization: 'Wedding', skills: '', status: 'Available', shoots: 0, rating: 5.0 };

const PRESET_SKILLS = ['Candid', 'Drone', 'Traditional', 'Cinematography', 'Portrait', 'Product', 'Event', 'Fashion'];

export default function Photographers() {
  const [photographers, setPhotographers] = useState(allPhotographers);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [customSkill, setCustomSkill] = useState('');

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
    p.specialization.toLowerCase().includes(search.toLowerCase()) ||
    (p.skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const skillsArr = typeof form.skills === 'string'
      ? form.skills.split(',').map(s => s.trim()).filter(s => s)
      : form.skills;

    setPhotographers(prev => [...prev, {
      id: Date.now(),
      ...form,
      skills: skillsArr,
      shoots: Number(form.shoots),
      rating: Number(form.rating)
    }]);
    setAddOpen(false);
    setForm(initialForm);
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
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-widest mr-2">
            <ShieldAlert size={12} /> Admin Access Only
          </div>
          <button
            onClick={() => { setForm({ ...initialForm, skills: [] }); setAddOpen(true); }}
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

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {[['Available', '#22c55e'], ['Booked', '#f5b400'], ['Leave', '#6b7280']].map(([s, color]) => (
            <div key={s} className="flex items-center gap-1.5 bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span>{s}: {photographers.filter(p => p.status === s).length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(ph => {
          const color = specializationColors[ph.specialization] || '#f5b400';
          return (
            <div key={ph.id} onClick={() => { setSelected(ph); setDetailOpen(true); }}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#333] hover:translate-y-[-4px] transition-all cursor-pointer group shadow-xl flex flex-col h-full">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black transition-transform group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: `${color}10`, border: `2px solid ${color}30`, color }}>
                    {ph.name[0]}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-xl border-2 border-[#0f0f0f] bg-[#1a1a1a] flex items-center justify-center">
                    <StatusBadge status={ph.status} isIconOnly={true} />
                  </div>
                </div>
                <p className="font-bold text-white text-lg tracking-tight">{ph.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest" style={{ backgroundColor: `${color}15`, color }}>
                    {ph.specialization}
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {(ph.skills || []).slice(0, 3).map(skill => (
                  <span key={skill} className="text-[9px] font-bold px-2 py-1 bg-white/5 text-gray-400 rounded-md border border-white/5 uppercase tracking-tighter">
                    {skill}
                  </span>
                ))}
                {(ph.skills || []).length > 3 && (
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 text-gray-500 rounded-md border border-white/5">
                    +{(ph.skills || []).length - 3}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-[#1a1a1a]/50 border border-[#2a2a2a] rounded-2xl p-3 text-center">
                  <p className="text-xl font-black text-white">{ph.shoots}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Projects</p>
                </div>
                <div className="bg-[#1a1a1a]/50 border border-[#2a2a2a] rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={12} className="text-[#f5b400]" fill="#f5b400" />
                    <p className="text-xl font-black text-white">{ph.rating}</p>
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Rating</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#222]">
                <StatusBadge status={ph.status} />
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
          const color = specializationColors[selected.specialization] || '#f5b400';
          return (
            <div className="space-y-6 py-2">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl"
                  style={{ backgroundColor: `${color}10`, border: `2px solid ${color}30`, color }}>
                  {selected.name[0]}
                </div>
                <div>
                  <p className="text-xl font-bold text-white tracking-tight">{selected.name}</p>
                  <p className="text-sm text-gray-500 font-medium">{selected.email}</p>
                  <div className="mt-2">
                    <StatusBadge status={selected.status} />
                  </div>
                </div>
              </div>

              {/* Enhanced Skills Section */}
              <div className="space-y-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Award size={14} className="text-[#f5b400]" /> Verified Skills & Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {(selected.skills || []).map(skill => (
                    <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5b400]/10 border border-[#f5b400]/20 rounded-xl text-[#f5b400] text-xs font-bold">
                      <CheckCircle2 size={12} /> {skill}
                    </div>
                  ))}
                  {(selected.skills || []).length === 0 && <p className="text-xs text-gray-600">No specific skills listed.</p>}
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
                {[['Phone', selected.phone], ['Expertise', selected.specialization], ['Delivered Projects', selected.shoots], ['Average Rating', `${selected.rating} / 5.0`]].map(([l, v], i) => (
                  <div key={l} className={`flex justify-between items-center px-5 py-4 ${i !== 3 ? 'border-b border-[#2a2a2a]' : ''}`}>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{l}</span>
                    <span className="text-sm text-white font-black">{v}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-xs font-bold text-gray-400 rounded-2xl hover:text-white hover:border-[#444] transition-all uppercase tracking-widest">
                Edit Team Record
              </button>
            </div>
          );
        })()}
      </Modal>

      {/* Onboard Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Onboard New Team Member" size="md">
        <div className="space-y-5 py-2">
          <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl mb-2">
            <ShieldAlert size={18} className="text-red-500 shrink-0" />
            <p className="text-[10px] text-red-300 font-medium uppercase tracking-tight leading-relaxed">Admin: Please verify personal identity and portfolios before onboarding to the production environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Aakash Raj" />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="Contact number" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="Corporate email" />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Expertise</label>
              <select value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} className={inputCls}>
                {['Wedding', 'Event', 'Business', 'Drone Show'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Initial Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                {['Available', 'Booked', 'Leave'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Expertise & Skills</label>

              {/* Custom Skill Input */}
              <div className="flex gap-2 mb-4">
                <input
                  value={customSkill}
                  onChange={e => setCustomSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                  placeholder="Type custom skill (e.g. Wildlife, Underwater)..."
                  className={`${inputCls} flex-1`}
                />
                <button
                  onClick={handleAddCustomSkill}
                  className="px-4 bg-[#2a2a2a] text-white text-[10px] font-bold rounded-xl hover:bg-[#333] transition-all uppercase tracking-widest border border-[#3a3a3a]"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 p-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl">
                {PRESET_SKILLS.map(skill => {
                  const isSelected = (form.skills || []).includes(skill);
                  return (
                    <button key={skill} onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all ${isSelected
                          ? 'bg-[#f5b400] text-black border-[#f5b400]'
                          : 'bg-[#1a1a1a] text-gray-500 border-[#2a2a2a] hover:text-white border'
                        }`}>
                      {skill}
                    </button>
                  );
                })}

                {/* Dynamically added custom skills that aren't in PRESET_SKILLS */}
                {(form.skills || []).filter(s => !PRESET_SKILLS.includes(s)).map(skill => (
                  <button key={skill} onClick={() => toggleSkill(skill)}
                    className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all bg-[#f5b400] text-black border-[#f5b400]">
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={() => setAddOpen(false)} className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-500 text-[10px] font-bold rounded-2xl transition-all uppercase tracking-widest">Discard</button>
            <button onClick={handleAdd} className="flex-1 py-4 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg active:scale-95 hover:bg-[#ffc107]">Save & Onboard</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
