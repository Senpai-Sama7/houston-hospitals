import { useMemo, memo } from "react";
import { METRICS } from "@/data/hospitals";
import type { Hospital } from "@/data/hospitals";
import { getScoreColor } from "@/lib/utils";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  PieChart,
  Pie,
  type TooltipProps,
} from "recharts";
import { TrendingUp, Award, Building, Activity, Calendar } from "lucide-react";

interface AnalyticsViewProps {
  hospitals: Hospital[];
}

interface PayloadEntry {
  name?: string;
  value?: number;
  color?: string;
  fill?: string;
}

const COLORS = ["#fbbf24", "#22c55e", "#3b82f6", "#a855f7", "#06b6d4", "#f97316", "#ef4444", "#14b8a6"];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0c14] border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-xs font-mono font-bold text-white mb-1">{label}</p>
        {payload.map((entry, index) => {
          const e = entry as unknown as PayloadEntry;
          return (
            <p key={index} className="text-[10px] font-mono" style={{ color: e.color || e.fill }}>
              {e.name}: {e.value}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

function AnalyticsViewInner({ hospitals }: AnalyticsViewProps) {
  if (hospitals.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 font-mono text-sm">
        No hospitals match the current filters.
      </div>
    );
  }

  const n = hospitals.length;
  const avgOverall = Math.round(hospitals.reduce((s, h) => s + h.overallScore, 0) / n);
  const totalBeds = hospitals.reduce((s, h) => s + h.beds, 0);
  const avgCare = Math.round(hospitals.reduce((s, h) => s + h.careScore, 0) / n);
  const topHospital = hospitals.length > 0 ? [...hospitals].sort((a, b) => b.overallScore - a.overallScore)[0] : null;

  const animatedAvg = useAnimatedNumber(avgOverall, 200);
  const animatedBeds = useAnimatedNumber(totalBeds, 400);
  const animatedCare = useAnimatedNumber(avgCare, 300);

  const barData = hospitals.map((h) => ({
    name: h.shortName,
    Overall: h.overallScore,
    Care: h.careScore,
    Tech: h.techScore,
    Amenity: h.amenityScore,
    Luxury: h.luxuryScore,
    color: h.color,
  }));

  const radarData = METRICS.map((m) => ({
    metric: m.label.replace(" Score", "").replace(" Rating", ""),
    fullMark: 100,
    ...hospitals.reduce(
      (acc, h) => ({
        ...acc,
        [h.shortName]: h[m.key as keyof Hospital] as number,
      }),
      {}
    ),
  }));

  const scatterData = hospitals.map((h) => ({
    x: h.techScore,
    y: h.careScore,
    z: h.overallScore,
    name: h.shortName,
    color: h.color,
    beds: h.beds,
  }));

  const bedData = hospitals.map((h) => ({
    name: h.shortName,
    beds: h.beds,
    founded: h.founded,
    color: h.color,
  }));

  const gradeDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    hospitals.forEach((h) => {
      counts[h.grade] = (counts[h.grade] || 0) + 1;
    });
    return Object.entries(counts).map(([grade, count]) => ({
      name: grade,
      value: count,
    }));
  }, [hospitals]);

  const foundedData = useMemo(() => {
    return [...hospitals]
      .sort((a, b) => a.founded - b.founded)
      .map((h) => ({
        name: h.shortName,
        year: h.founded,
        score: h.overallScore,
        color: h.color,
      }));
  }, [hospitals]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg Overall Score", value: animatedAvg, icon: <Award size={16} />, color: "#fbbf24" },
          { label: "Total Bed Capacity", value: animatedBeds.toLocaleString(), icon: <Building size={16} />, color: "#3b82f6" },
          { label: "Avg Care Score", value: animatedCare, icon: <Activity size={16} />, color: "#22c55e" },
          { label: "Top Performer", value: topHospital ? topHospital.shortName : "—", icon: <TrendingUp size={16} />, color: "#f97316" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2" style={{ color: stat.color }}>
              {stat.icon}
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Score Comparison Bar Chart */}
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <TrendingUp size={14} className="text-amber-500" /> Score Comparison by Hospital
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Overall" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Care" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Tech" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Luxury" fill="#a855f7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Amenity" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar + Scatter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Award size={14} className="text-amber-500" /> Capability Radar
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
              {hospitals.map((h) => (
                <Radar
                  key={h.id}
                  name={h.shortName}
                  dataKey={h.shortName}
                  stroke={h.color}
                  fill={h.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {hospitals.map((h) => (
              <div key={h.id} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="text-slate-400">{h.shortName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech vs Care Scatter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Activity size={14} className="text-amber-500" /> Tech vs. Care Correlation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Tech Score"
                tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
                domain={[70, 105]}
                label={{ value: "Tech Score", position: "bottom", fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Care Score"
                tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
                domain={[75, 105]}
                label={{ value: "Care Score", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
              />
              <ZAxis type="number" dataKey="z" range={[100, 600]} name="Overall" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {scatterData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate-400">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade Distribution + Founded Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Award size={14} className="text-amber-500" /> Grade Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {gradeDistribution.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {gradeDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-slate-400">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Calendar size={14} className="text-amber-500" /> Founded Timeline vs Overall Score
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={foundedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} domain={[70, 105]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {foundedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {foundedData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate-400">{d.name} ({d.year})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bed Capacity Chart */}
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <Building size={14} className="text-amber-500" /> Bed Capacity Comparison
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="beds" radius={[0, 4, 4, 0]}>
              {bedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Score Distribution Table */}
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Award size={14} className="text-amber-500" /> Complete Score Matrix
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th scope="col" className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Hospital</th>
                {METRICS.map((m) => (
                  <th scope="col" key={m.key} className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest text-center">
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {hospitals.map((h) => (
                <tr key={h.id} className="hover:bg-white/[0.02] transition-colors">
                  <th scope="row" className="p-4 text-white font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                    {h.shortName}
                  </th>
                  {METRICS.map((m) => {
                    const val = h[m.key as keyof Hospital] as number;
                    return (
                      <td key={m.key} className="p-4 text-center">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: `${getScoreColor(val)}20`,
                            color: getScoreColor(val),
                          }}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export const AnalyticsView = memo(AnalyticsViewInner);
