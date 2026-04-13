import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, User2, CalendarX } from 'lucide-react';
import { calendarEvents } from '../data/mockData';
import Modal from '../components/Modal';
import { StatusBadge } from '../components/Table';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const statusColors = {
  Pending: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
  Confirmed: 'bg-green-500/20 border-green-500/40 text-green-300',
  Completed: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
  Cancelled: 'bg-red-500/20 border-red-500/40 text-red-300',
};

export default function Calendar() {
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventModal, setEventModal] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const navigate = (dir) => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + dir);
      return d;
    });
  };

  const today = new Date();

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-lg font-semibold text-white min-w-[160px] text-center">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={() => navigate(1)} className="p-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-xs rounded-lg bg-[#f5b400]/10 text-[#f5b400] border border-[#f5b400]/20 hover:bg-[#f5b400]/20 transition-colors">
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 mr-2">
            {[['Pending', '#eab308'], ['Confirmed', '#22c55e'], ['Completed', '#3b82f6'], ['Cancelled', '#ef4444']].map(([label, color]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex rounded-lg overflow-hidden border border-[#2a2a2a]">
            {['month', 'week', 'day'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${view === v ? 'bg-[#f5b400] text-black' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[#2a2a2a]">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Grid cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const events = getEventsForDay(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div
                key={idx}
                className={`min-h-[100px] p-2 border-b border-r border-[#1e1e1e] last:border-r-0 transition-colors ${day ? 'hover:bg-[#1a1a1a]' : 'bg-[#111]'}`}
              >
                {day && (
                  <>
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1 ${isToday ? 'bg-[#f5b400] text-black' : 'text-gray-400'}`}>
                      {day}
                    </span>
                    <div className="space-y-1">
                      {events.slice(0, 2).map(ev => (
                        <button
                          key={ev.id}
                          onClick={() => { setSelectedEvent(ev); setEventModal(true); }}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-xs border truncate transition-opacity hover:opacity-80 ${statusColors[ev.status] || 'bg-gray-500/20 text-gray-300'}`}
                        >
                          {ev.title}
                        </button>
                      ))}
                      {events.length > 2 && (
                        <p className="text-xs text-gray-600 pl-1">+{events.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
        <h3 className="text-base font-semibold text-white mb-4">Upcoming Bookings</h3>
        <div className="space-y-3">
          {calendarEvents.map(ev => (
            <div key={ev.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
              <div className="text-center min-w-[48px]">
                <p className="text-lg font-bold text-white">{ev.date.split('-')[2]}</p>
                <p className="text-xs text-gray-500">{MONTHS[parseInt(ev.date.split('-')[1]) - 1].slice(0, 3)}</p>
              </div>
              <div className="w-px h-10 bg-[#2a2a2a]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{ev.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <User2 size={11} className="text-gray-500" />
                  <p className="text-xs text-gray-500">{ev.photographer} · {ev.time}</p>
                </div>
              </div>
              <StatusBadge status={ev.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Block Date / Assign modal trigger */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
          <Plus size={16} /> New Booking
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm font-medium rounded-xl hover:border-[#3a3a3a] hover:text-white transition-colors">
          <CalendarX size={16} /> Block Date
        </button>
      </div>

      {/* Event Detail Modal */}
      <Modal open={eventModal} onClose={() => setEventModal(false)} title="Booking Details" size="sm">
        {selectedEvent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
              <StatusBadge status={selectedEvent.status} />
            </div>
            {[
              ['Date', selectedEvent.date],
              ['Time', selectedEvent.time],
              ['Category', selectedEvent.category],
              ['Photographer', selectedEvent.photographer],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-[#2a2a2a]">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm text-white font-medium">{value}</span>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2.5 bg-[#f5b400] text-black text-sm font-semibold rounded-xl hover:bg-[#e0a300] transition-colors">
                Assign Photographer
              </button>
              <button className="flex-1 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-xl hover:border-[#3a3a3a] transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
