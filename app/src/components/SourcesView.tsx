import { memo } from "react";
import type { Hospital } from "@/data/hospitals";
import { openInMapsUrl, validateUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Info, ExternalLink, Phone, MapPin, Navigation } from "lucide-react";

interface SourcesViewProps {
  hospitals: Hospital[];
}

function SourcesViewInner({ hospitals }: SourcesViewProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-[#0b0c14]/80 border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Info size={18} className="text-amber-500" />
          <h3 className="text-lg font-serif font-bold text-white">Data Provenance & Source Audit</h3>
        </div>
        <p className="text-xs text-slate-400 font-mono leading-relaxed mb-8">
          All data curated from verified institutional filings and national reporting registries.
          Sources include U.S. News 2025-2026 rankings, Healthgrades 2026, official hospital websites,
          and verified press releases. Last updated Q1 2026.
        </p>

        <div className="space-y-4">
          {hospitals.map((h, i) => {
            const safeUrl = validateUrl(h.website);
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-white/5 bg-black/20 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: h.color, boxShadow: `0 0 8px ${h.color}` }}
                    />
                    <h4 className="text-sm font-bold font-serif text-white">{h.name}</h4>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-black"
                      style={{ backgroundColor: `${h.color}20`, color: h.color }}
                    >
                      {h.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> {h.location}
                    </span>
                    {safeUrl && (
                      <a
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        <ExternalLink size={10} /> Website
                      </a>
                    )}
                    <a
                      href={`tel:${h.phone}`}
                      className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      <Phone size={10} /> {h.phone}
                    </a>
                    <a
                      href={openInMapsUrl(h.name, h.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Navigation size={10} /> Map
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {h.source.split("|").map((src, idx) => (
                    <span
                      key={`${h.id}-${idx}`}
                      className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                    >
                      {src.trim()}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-slate-600 leading-relaxed">
                  <span className="text-slate-500">Specialties:</span>{" "}
                  {h.specialties.join(", ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
              Data Integrity Notice
            </h4>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              The current dataset contains narrative source strings. For production use, connect these rows to live
              official URLs, a data fetch layer, or a CMS so the UI can verify claims instead of only displaying them.
              Rankings are sourced from U.S. News & World Report 2025-2026 edition and are subject to annual revision.
              All scores are synthetic composites created for demonstration purposes and do not represent actual
              clinical quality metrics.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const SourcesView = memo(SourcesViewInner);
