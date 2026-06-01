import { useState, useEffect, memo } from "react";
import type { Hospital } from "@/data/hospitals";
import { openInMapsUrl, validateUrl } from "@/lib/utils";
import { ScoreBar } from "./ScoreBar";
import { RingScore } from "./RingScore";
import { AmenitySection } from "./AmenitySection";
import { ImageFallback } from "./ImageFallback";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  BarChart3,
  Check,
  Bookmark,
  MapPin,
  Building,
  Activity,
  Phone,
  ExternalLink,
  Award,
  Shield,
  Navigation,
} from "lucide-react";

interface HospitalCardProps {
  hospital: Hospital;
  isExpanded: boolean;
  isCompared: boolean;
  isBookmarked: boolean;
  onToggleExpand: () => void;
  onToggleCompare: () => void;
  onToggleBookmark: () => void;
}

const DETAIL_TABS = ["rooms", "technology", "facilities", "services", "luxury"] as const;

type DetailTab = (typeof DETAIL_TABS)[number];

function HospitalCardInner({
  hospital,
  isExpanded,
  isCompared,
  isBookmarked,
  onToggleExpand,
  onToggleCompare,
  onToggleBookmark,
}: HospitalCardProps) {
  const [detailsTab, setDetailsTab] = useState<DetailTab>("rooms");

  useEffect(() => {
    if (!isExpanded) setDetailsTab("rooms");
  }, [isExpanded]);

  const tabLabels: Record<DetailTab, string> = {
    rooms: "Rooms",
    technology: "Technology",
    facilities: "Facilities",
    services: "Services",
    luxury: "Luxury",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-[#0b0c14]/80 border rounded-2xl flex flex-col transition-all duration-500 shadow-2xl relative overflow-hidden backdrop-blur-sm"
      style={{
        borderColor: isExpanded
          ? hospital.color
          : isCompared
          ? `${hospital.color}66`
          : "rgba(255,255,255,0.05)",
        boxShadow: isExpanded
          ? `0 10px 40px -10px ${hospital.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 4px 20px -5px rgba(0,0,0,0.4)",
      }}
    >
      {/* Status Bar */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: hospital.color }} />

      {/* Image Header */}
      <div className="h-48 relative overflow-hidden flex flex-col justify-between p-5">
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110 opacity-60">
          <ImageFallback
            src={hospital.image}
            alt={`${hospital.name} exterior`}
            className="w-full h-full object-cover"
            fallbackColor={hospital.color}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c14] via-[#0b0c14]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative flex justify-between items-start z-10">
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded shadow-lg backdrop-blur-md w-fit"
              style={{
                backgroundColor: `${hospital.color}dd`,
                color: hospital.color === "#C8960C" ? "#000" : "#fff",
              }}
            >
              {hospital.heroTag}
            </span>
            <div className="flex gap-1.5">
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-slate-300 flex items-center gap-1">
                <Shield size={8} /> {hospital.type}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-slate-300">
                {hospital.erLevel}
              </span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {isCompared && (
              <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                <Check size={14} className="text-white" />
              </div>
            )}
            <button
              type="button"
              onClick={onToggleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              className="bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 hover:bg-black/70 transition-colors"
            >
              <Bookmark
                size={14}
                className={isBookmarked ? "text-amber-400 fill-amber-400" : "text-white"}
              />
            </button>
          </div>
        </div>

        <div className="relative flex justify-between items-end z-10">
          <div>
            <h3 className="text-xl font-bold font-serif text-white tracking-tight leading-tight mb-1">
              {hospital.name}
            </h3>
            <div
              className="flex items-center gap-2 text-[10px] font-mono tracking-widest font-semibold"
              style={{ color: hospital.color }}
            >
              <Award size={12} /> {hospital.txRank}
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div
              className="absolute inset-0 blur-md rounded-full"
              style={{ backgroundColor: hospital.color, opacity: 0.2 }}
            />
            <RingScore value={hospital.overallScore} color={hospital.color} size={54} />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#0b0c14]/40 relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Beds", value: hospital.beds.toLocaleString(), icon: <Activity size={12} /> },
            { label: "Founded", value: hospital.founded.toString(), icon: <Building size={12} /> },
            { label: "Campuses", value: hospital.campuses.toString(), icon: <MapPin size={12} /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-black/30 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center"
            >
              <div className="text-slate-500 mb-1">{stat.icon}</div>
              <div className="text-sm font-bold font-mono text-slate-200 tabular-nums">{stat.value}</div>
              <div className="text-[8px] tracking-widest text-slate-500 font-mono uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Score Bars */}
        <div className="space-y-1 mb-6">
          <ScoreBar label="Clinical Quality" value={hospital.careScore} color={hospital.color} delay={0} />
          <ScoreBar label="Tech Execution" value={hospital.techScore} color={hospital.color} delay={100} />
          <ScoreBar label="Inpatient Amenity" value={hospital.amenityScore} color={hospital.color} delay={200} />
          <ScoreBar label="Luxury & VIP" value={hospital.luxuryScore} color={hospital.color} delay={300} />
        </div>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hospital.specialties.slice(0, 4).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-md text-[9px] font-mono tracking-wider bg-white/5 text-slate-400 border border-white/5"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {hospital.highlights.slice(0, 4).map((hl, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-3 items-start hover:bg-white/10 transition-colors"
            >
              <span className="text-lg leading-none mt-0.5 flex-shrink-0 opacity-80" role="img" aria-label={hl.label}>
                {hl.icon}
              </span>
              <div>
                <h5 className="text-[10px] font-bold font-mono text-slate-200 tracking-wide mb-1 leading-tight">
                  {hl.label}
                </h5>
                <p className="text-[9px] text-slate-400 leading-snug line-clamp-2">{hl.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px] font-mono text-slate-500">
          {validateUrl(hospital.website) && (
            <a
              href={validateUrl(hospital.website)!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <ExternalLink size={10} /> Website
            </a>
          )}
          <a
            href={`tel:${hospital.phone}`}
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <Phone size={10} /> {hospital.phone}
          </a>
          <a
            href={openInMapsUrl(hospital.name, hospital.location)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <Navigation size={10} /> Map
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={`hospital-details-${hospital.id}`}
            className="flex-1 py-2.5 rounded-xl text-[10px] tracking-widest font-mono font-bold border transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: isExpanded ? `${hospital.color}15` : "rgba(255,255,255,0.02)",
              borderColor: isExpanded ? hospital.color : "rgba(255,255,255,0.05)",
              color: isExpanded ? hospital.color : "#94a3b8",
            }}
          >
            {isExpanded ? <><ChevronUp size={14} /> SPECS</> : <><ChevronDown size={14} /> SPECS</>}
          </button>

          <button
            type="button"
            onClick={onToggleCompare}
            aria-pressed={isCompared}
            className="flex-1 py-2.5 rounded-xl text-[10px] tracking-widest font-mono font-bold border transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: isCompared ? `${hospital.color}25` : "transparent",
              borderColor: isCompared ? hospital.color : "rgba(255,255,255,0.05)",
              color: isCompared ? hospital.color : "#94a3b8",
            }}
          >
            {isCompared ? <><Check size={14} /> QUEUED</> : <><BarChart3 size={14} /> COMPARE</>}
          </button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`hospital-details-${hospital.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-5">
                  {DETAIL_TABS.map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setDetailsTab(key)}
                      aria-pressed={detailsTab === key}
                      className="px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold tracking-widest transition-all uppercase border hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: detailsTab === key ? `${hospital.color}20` : "transparent",
                        borderColor: detailsTab === key ? hospital.color : "rgba(255,255,255,0.1)",
                        color: detailsTab === key ? hospital.color : "#64748b",
                      }}
                    >
                      {tabLabels[key]}
                    </button>
                  ))}
                </div>

                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <AmenitySection
                    title={`${hospital.shortName} — ${tabLabels[detailsTab]}`}
                    items={hospital.amenities[detailsTab] || []}
                    color={hospital.color}
                  />
                </div>

                <div className="mt-4 text-[9px] font-mono text-slate-600 leading-relaxed">
                  <span className="text-slate-500">SOURCE:</span> {hospital.source}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export const HospitalCard = memo(HospitalCardInner);
