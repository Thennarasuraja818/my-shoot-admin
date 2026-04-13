export default function StatCard({ title, value, icon: Icon, color = '#f5b400', trend, trendLabel }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 flex items-start gap-4 hover:border-[#3a3a3a] transition-all duration-200 group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{typeof value === 'number' ? value.toLocaleString('en-IN') : value}</p>
        {trend !== undefined && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`text-xs font-semibold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
            </span>
            {trendLabel && <span className="text-xs text-gray-600">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
