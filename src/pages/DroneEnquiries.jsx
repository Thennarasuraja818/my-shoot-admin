import { useState } from 'react';
import { Search, Eye, Trash2, Mail, MapPin, Calendar, DollarSign, MessageSquare, Phone } from 'lucide-react';
import { droneEnquiries as allEnquiries } from '../data/mockData';
import { DataTable, StatusBadge } from '../components/Table';
import Modal from '../components/Modal';

export default function DroneEnquiries() {
  const [enquiries, setEnquiries] = useState(allEnquiries);
  const [selected, setSelected] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleDelete = (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    setViewOpen(false);
  };

  const markContacted = (id) => setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'Contacted' } : e));
  const convertToBooking = (id) => setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'Converted' } : e));

  const summary = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'New').length,
    contacted: enquiries.filter(e => e.status === 'Contacted').length,
    converted: enquiries.filter(e => e.status === 'Converted').length,
  };

  const columns = [
    { key: 'name', label: 'Enquiry From', render: (v, row) => (
      <div>
        <p className="font-semibold text-white">{v}</p>
        <p className="text-[10px] text-gray-500">{row.email}</p>
      </div>
    )},
    { key: 'phone', label: 'Contact', render: v => <span className="text-gray-300 text-xs">{v}</span> },
    { key: 'eventDate', label: 'Event Date', render: v => <span className="text-gray-300 text-xs">{v}</span> },
    { key: 'location', label: 'Location', render: v => <span className="text-gray-400 text-xs truncate max-w-[120px] inline-block">{v}</span> },
    { key: 'budget', label: 'Budget', render: v => <span className="text-[#f5b400] font-bold text-xs">{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'actions', label: '', render: (_, row) => (
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); setSelected(row); setViewOpen(true); }} className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Eye size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest leading-none">Aerial Enquiries</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Pipeline for {enquiries.length} potential drone shows</p>
        </div>
      </div>


      {/* Table View */}
      <DataTable columns={columns} data={enquiries} onRowClick={(row) => { setSelected(row); setViewOpen(true); }} />

      {/* Detail Modal */}
      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title="Lead Details" size="sm">
        {selected && (
          <div className="space-y-5 py-2">
            <div className="flex flex-col items-center text-center pb-4">
               <div className="w-20 h-20 rounded-3xl bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden flex items-center justify-center shadow-2xl mb-4">
                  <img src="/assets/drone.png" alt="Drone" className="w-full h-full object-cover" />
               </div>
               <p className="text-xl font-black text-white uppercase tracking-tight">{selected.name}</p>
               <StatusBadge status={selected.status} />
            </div>

            <div className="bg-[#1a1a1a] rounded-3xl border border-[#2a2a2a] overflow-hidden">
                {[
                  ['Email Address', selected.email, Mail],
                  ['Phone Number', selected.phone, Phone],
                  ['Shoot Date', selected.eventDate, Calendar],
                  ['Location', selected.location, MapPin],
                  ['Estimated Budget', selected.budget, DollarSign],
                ].map(([l, v, Icon], i) => (
                  <div key={l} className={`flex justify-between items-center px-6 py-4 ${i !== 4 ? 'border-b border-[#2a2a2a]' : ''}`}>
                    <div className="flex items-center gap-2">
                       <Icon size={12} className="text-gray-600" />
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{l}</span>
                    </div>
                    <span className="text-sm text-white font-black">{v}</span>
                  </div>
                ))}
            </div>

            <div className="bg-[#141414] rounded-2xl p-5 border border-[#2a2a2a]">
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><MessageSquare size={12} /> Enquiry Message</p>
              <p className="text-sm text-gray-400 leading-relaxed italic">"{selected.message}"</p>
            </div>

            <div className="flex gap-3 pt-4">
               {selected.status === 'New' && (
                 <button onClick={() => markContacted(selected.id)} className="flex-1 py-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-2xl uppercase tracking-widest">Contact Lead</button>
               )}
               {selected.status !== 'Converted' && (
                 <button onClick={() => convertToBooking(selected.id)} className="flex-1 py-3.5 bg-[#f5b400] text-black text-[10px] font-black rounded-2xl uppercase tracking-widest">Convert to Booking</button>
               )}
               <button onClick={() => handleDelete(selected.id)} className="px-5 py-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold rounded-2xl uppercase tracking-widest">Delete Lead</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
