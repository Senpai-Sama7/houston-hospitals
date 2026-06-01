import type { Hospital } from "@/data/hospitals";
import type React from "react";

interface RadarChartProps {
  dataSets: Hospital[];
  size?: number;
}

export function RadarChart({ dataSets, size = 320 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40;
  const axes = ["careScore", "techScore", "luxuryScore", "amenityScore"];
  const labels = ["CLINICAL", "TECH", "VIP/LUX", "AMENITY"];
  const angleStep = (Math.PI * 2) / axes.length;

  const getCoordinates = (value: number, angleIndex: number) => {
    const angle = angleIndex * angleStep - Math.PI / 2;
    const normalized = value / 100;
    return {
      x: center + radius * normalized * Math.cos(angle),
      y: center + radius * normalized * Math.sin(angle),
    };
  };

  const labelPositions = [
    { x: center, y: 12, anchor: "middle" },
    { x: size - 8, y: center, anchor: "start" },
    { x: center, y: size - 4, anchor: "middle" },
    { x: 8, y: center, anchor: "end" },
  ];

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 overflow-visible">
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        {axes.map((_, i) => {
          const end = getCoordinates(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        {dataSets.map((dataset) => {
          const points = axes.map((axis, i) => {
            const coord = getCoordinates(dataset[axis as keyof Hospital] as number, i);
            return `${coord.x},${coord.y}`;
          }).join(" ");

          return (
            <polygon
              key={dataset.id}
              points={points}
              fill={`${dataset.color}18`}
              stroke={dataset.color}
              strokeWidth="2"
              className="transition-all duration-700 ease-in-out"
              style={{ mixBlendMode: "screen" }}
            />
          );
        })}
      </svg>
      {labels.map((label, i) => (
        <div
          key={label}
          className="absolute text-[9px] font-mono font-bold text-slate-400 tracking-wider"
          style={{
            left: labelPositions[i].x,
            top: labelPositions[i].y,
            transform: "translate(-50%, -50%)",
            textAlign: labelPositions[i].anchor as React.CSSProperties["textAlign"],
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
