import { ALERTS } from "@/data/hospitals";

export function Ticker() {
  const items = ALERTS.map((text) => ({ text }));

  return (
    <div className="w-full bg-black/40 border-y border-white/5 py-2.5 overflow-hidden backdrop-blur-sm relative z-40">
      <div className="flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-2"
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#fbbf24", boxShadow: "0 0 6px #fbbf24" }}
            />
            <span className="text-white font-bold">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
