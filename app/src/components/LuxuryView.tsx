import { memo, useMemo } from "react";
import type { Hospital } from "@/data/hospitals";
import { getScoreColor, openInMapsUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles, Navigation } from "lucide-react";

interface LuxuryViewProps {
  hospitals: Hospital[];
}

function LuxuryViewInner({ hospitals }: LuxuryViewProps) {
  if (hospitals.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 font-mono text-sm">
        No hospitals match the current filters.
      </div>
    );
  }

  const sorted = useMemo(() => [...hospitals].sort((a, b) => b.luxuryScore - a.luxuryScore), [hospitals]);
  const tierLabel = (score: number) => {
    if (score >= 95) return "Ultra-Premium";
    if (score >= 85) return "Executive";
    if (score >= 75) return "Premium";
    if (score >= 65) return "Standard+";
    return "Standard";
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-amber-500" size={24} /> Luxury &amp; VIP Care Rankings
        </h2>
        <p className="text-xs font-mono text-slate-500 max-w-xl mx-auto">
          Premium service tiers, executive suites, concierge programs, and hotel-caliber amenities ranked by composite luxury score.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sorted.slice(0, 3).map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0b0c14]/80 border rounded-2xl p-6 text-center relative overflow-hidden backdrop-blur-sm"
            style={{
              borderColor: i === 0 ? h.color : "rgba(255,255,255,0.05)",
              boxShadow: i === 0 ? `0 10px 40px -10px ${h.glow}` : undefined,
            }}
          >
            {i === 0 && (
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: h.color }} />
            )}
            <div className="text-3xl mb-2">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
            <h3 className="text-sm font-bold font-serif text-white mb-1">{h.shortName}</h3>
            <div className="text-2xl font-bold font-mono mb-1" style={{ color: h.color }}>
              {h.luxuryScore}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-wider">
              {tierLabel(h.luxuryScore)}
            </div>
            <div className="text-left space-y-2">
              {h.amenities.luxury.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex gap-2 text-[10px] font-mono text-slate-400">
                  <span style={{ color: h.color }}>•</span>
                  <span className="line-clamp-2">{item}</span>
                </div>
              ))}
            </div>
            <a
              href={openInMapsUrl(h.name, h.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-amber-400 transition-colors"
            >
              <Navigation size={10} /> View on Map
            </a>
          </motion.div>
        ))}
      </div>

      {/* Full Scoreboard */}
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" /> Complete Luxury Scoreboard
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Rank</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Hospital</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest text-center">Score</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Bar</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Preview</th>
                <th className="p-4 text-[10px] font-mono uppercase text-slate-500 tracking-widest">Map</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {sorted.map((h, i) => (
                <tr key={h.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-slate-500 font-bold">#{i + 1}</td>
                  <td className="p-4 text-white font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: h.color }} />
                    {h.shortName}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: `${getScoreColor(h.luxuryScore)}20`,
                        color: getScoreColor(h.luxuryScore),
                      }}
                    >
                      {h.luxuryScore}
                    </span>
                  </td>
                  <td className="p-4 w-48">
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${h.luxuryScore}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: h.color }}
                      />
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 text-[10px] max-w-xs truncate">
                    {h.amenities.luxury[0] ?? "—"}
                  </td>
                  <td className="p-4">
                    <a
                      href={openInMapsUrl(h.name, h.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Navigation size={10} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export const LuxuryView = memo(LuxuryViewInner);
