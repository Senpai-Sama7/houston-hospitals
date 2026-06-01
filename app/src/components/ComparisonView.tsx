import { memo } from "react";
import { METRICS } from "@/data/hospitals";
import type { Hospital } from "@/data/hospitals";
import { getScoreColor, openInMapsUrl, validateUrl } from "@/lib/utils";
import { RadarChart } from "./RadarChart";
import { RingScore } from "./RingScore";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, X, ExternalLink, Navigation } from "lucide-react";

interface ComparisonViewProps {
  hospitals: Hospital[];
  onRemoveCompare: (id: number) => void;
}

function ComparisonViewInner({ hospitals, onRemoveCompare }: ComparisonViewProps) {
  if (hospitals.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0b0c14] border border-white/5 rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto mt-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        <BarChart3 size={48} className="mx-auto text-amber-500/50 mb-6" />
        <h3 className="text-2xl font-serif font-bold text-white mb-3">Insufficient Data for Matrix</h3>
        <p className="text-sm text-slate-400 font-mono leading-relaxed mb-8 max-w-md mx-auto">
          Select at least two facilities from the directory to generate a comparative radar analysis and structural
          cross-section.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Facilities Compared", value: hospitals.length },
          { label: "Avg Overall Score", value: Math.round(hospitals.reduce((s, h) => s + h.overallScore, 0) / hospitals.length) },
          { label: "Total Beds", value: hospitals.reduce((s, h) => s + h.beds, 0).toLocaleString() },
          { label: "Avg Care Score", value: Math.round(hospitals.reduce((s, h) => s + h.careScore, 0) / hospitals.length) },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-4 text-center backdrop-blur-sm">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-bold font-mono text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Advanced Visual Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart Panel */}
        <div className="lg:col-span-1 bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8 w-full text-center flex items-center justify-center gap-2 z-10">
            <TrendingUp size={14} className="text-amber-500" /> Multivariate Topology
          </h3>
          <div className="z-10">
            <RadarChart dataSets={hospitals} size={280} />
          </div>
          <div className="z-10 mt-6 flex flex-wrap gap-3 justify-center">
            {hospitals.map((h) => (
              <div key={h.id} className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="text-slate-400">{h.shortName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Legends */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 p-4">
                <button
                  type="button"
                  onClick={() => onRemoveCompare(h.id)}
                  aria-label={`Remove ${h.shortName} from comparison`}
                  className="text-slate-500 hover:text-white transition-colors bg-black/40 p-1.5 rounded-full backdrop-blur-md"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: h.color }} />

              <div>
                <div
                  className="text-[10px] font-mono font-bold tracking-widest mb-1 uppercase"
                  style={{ color: h.color }}
                >
                  {h.shortName}
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-4 leading-tight pr-8">{h.name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Overall</div>
                    <div className="text-2xl font-bold font-mono text-white">{h.overallScore}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Beds</div>
                    <div className="text-lg font-bold font-mono text-slate-300 mt-1">{h.beds.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <RingScore value={h.careScore} color={h.color} size={40} />
                    <span className="text-[10px] font-mono text-slate-400">Care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RingScore value={h.techScore} color={h.color} size={40} />
                    <span className="text-[10px] font-mono text-slate-400">Tech</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-400 line-clamp-2 leading-relaxed">
                <strong className="text-slate-200">Edge:</strong>{" "}
                {h.highlights[0]?.desc ?? "No highlight available"}
              </div>
              <div className="flex items-center gap-3 mt-2">
                {validateUrl(h.website) && (
                  <a
                    href={validateUrl(h.website)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink size={10} /> {h.website.replace("https://", "")}
                  </a>
                )}
                <a
                  href={openInMapsUrl(h.name, h.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-slate-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <Navigation size={10} /> Map
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Granular Data Table */}
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div>
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <BarChart3 size={18} className="text-amber-500" /> Structural Data Cross-Section
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-5 text-[10px] font-mono uppercase text-slate-500 tracking-widest bg-black/40 w-48 border-b border-white/5 sticky left-0 z-20">
                  Metrics
                </th>
                {hospitals.map((h) => (
                  <th
                    key={h.id}
                    className="p-5 border-l border-b border-white/5 bg-black/10 min-w-[200px]"
                  >
                    <div className="text-sm font-bold font-serif text-white mb-1">{h.shortName}</div>
                    <div
                      className="text-[9px] font-mono font-semibold uppercase tracking-widest"
                      style={{ color: h.color }}
                    >
                      {h.txRank}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  Network Topology
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5 text-slate-300">
                    {h.campuses} {h.campuses === 1 ? "Campus" : "Campuses"} / {h.location}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  Established
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5 text-slate-300">
                    {h.founded}
                  </td>
                ))}
              </tr>

              {METRICS.map((metric) => (
                <tr key={metric.key} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5 group-hover:bg-[#11121c] transition-colors">
                    {metric.label}
                  </td>
                  {hospitals.map((h) => {
                    const value = h[metric.key as keyof Hospital] as number;
                    return (
                      <td key={h.id} className="p-5 border-l border-white/5">
                        <div className="flex items-center gap-4">
                          <span
                            className="font-bold w-6 tabular-nums"
                            style={{ color: getScoreColor(value) }}
                          >
                            {value}
                          </span>
                          <div className="flex-1 bg-black/50 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${value}%`,
                                backgroundColor: h.color,
                                boxShadow: `0 0 8px ${h.color}88`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  Type
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5 text-slate-300">
                    {h.type}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  ER Level
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5 text-slate-300">
                    {h.erLevel}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  Phone
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5 text-slate-300">
                    <a href={`tel:${h.phone}`} className="hover:text-amber-400 transition-colors">
                      {h.phone}
                    </a>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-slate-400 font-bold bg-black/40 sticky left-0 z-10 border-r border-white/5">
                  Flagship Asset
                </td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-5 border-l border-white/5">
                    {h.highlights[0] ? (
                      <div className="flex items-start gap-3">
                        <span className="text-xl opacity-80 mt-1">{h.highlights[0].icon}</span>
                        <div>
                          <div className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">
                            {h.highlights[0].label}
                          </div>
                          <div className="text-[10px] text-slate-500 leading-relaxed font-sans">
                            {h.highlights[0].desc}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export const ComparisonView = memo(ComparisonViewInner);
