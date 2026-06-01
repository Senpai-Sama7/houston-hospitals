interface AmenitySectionProps {
  title: string;
  items: string[];
  color: string;
}

export function AmenitySection({ title, items, color }: AmenitySectionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h4
        className="text-[10px] uppercase font-mono font-black tracking-widest mb-4 flex items-center gap-2"
        style={{ color }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 items-start text-xs text-slate-300 leading-relaxed font-sans">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 shadow-lg"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
