export function StatusBadge({ status, isIconOnly = false }) {
  const displayStatus = typeof status === 'boolean' ? (status ? 'Active' : 'Inactive') : status;
  
  const map = {
    // Member Status
    Active: 'bg-green-500/10 text-green-400 border-green-500/20',
    Inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    Blocked: 'bg-red-500/10 text-red-400 border-red-500/20',
    
    // Booking workflow
    New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Reviewed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Shoot Completed': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Completed: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Delivered: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    Cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    
    // Payment specific
    'Advance Paid': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Fully Paid': 'bg-green-600/10 text-green-400 border-green-600/20',
    Refunded: 'bg-red-500/10 text-red-400 border-red-500/20',
    Unpaid: 'bg-gray-500/10 text-gray-400 border-gray-500/20',

    // Enquiry
    Contacted: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    Converted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  
  const dotColors = {
    Active: 'bg-green-500',
    Inactive: 'bg-gray-400',
    Pending: 'bg-amber-500',
    Confirmed: 'bg-emerald-500',
  };

  if (isIconOnly) {
    const dotColor = dotColors[displayStatus] || 'bg-gray-500';
    return <div className={`w-2 h-2 rounded-full ${dotColor} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} title={displayStatus} />;
  }

  const cls = map[displayStatus] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${cls}`}>
      {displayStatus}
    </span>
  );
}

export function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick && onRowClick(row)}
              className={`border-b border-[#1e1e1e] transition-colors ${onRowClick ? 'cursor-pointer hover:bg-[#1a1a1a]' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-300 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-600">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
