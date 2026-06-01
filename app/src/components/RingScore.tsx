import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface RingScoreProps {
  value: number;
  color: string;
  size?: number;
}

export function RingScore({ value, color, size = 56 }: RingScoreProps) {
  const animated = useAnimatedNumber(value, 150);
  const r = (size / 2) - 4;
  const c = 2 * Math.PI * r;
  const offset = c - (animated / 100) * c;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="rgba(0,0,0,0.4)"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="font-mono font-black fill-white"
        fontSize={size * 0.3}
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {animated}
      </text>
    </svg>
  );
}
