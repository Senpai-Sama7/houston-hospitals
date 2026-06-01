import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
  delay?: number;
}

export function ScoreBar({ label, value, color, delay = 0 }: ScoreBarProps) {
  const animated = useAnimatedNumber(value, delay);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
        <span>{label}</span>
        <span className="font-bold text-white tabular-nums">{animated}</span>
      </div>
      <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animated}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}
