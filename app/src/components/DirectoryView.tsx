import { METRICS, ALL_TAGS, SPECIALTIES, GRADES, HOSPITAL_TYPES, ER_LEVELS } from "@/data/hospitals";
import type { Hospital, SortKey, HospitalTypeFilter, ERLevelFilter } from "@/data/hospitals";
import { HospitalCard } from "./HospitalCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, MapPin, TrendingUp, TrendingDown, Heart, Shield } from "lucide-react";

interface DirectoryViewProps {
  hospitals: Hospital[];
  expandedId: number | null;
  compareIds: number[];
  bookmarks: number[];
  searchQuery: string;
  sortBy: SortKey;
  sortDir: "asc" | "desc";
  selectedTags: string[];
  selectedSpecialties: string[];
  selectedGrades: string[];
  selectedType: HospitalTypeFilter;
  selectedErLevel: ERLevelFilter;
  onSearchChange: (q: string) => void;
  onSortChange: (key: SortKey) => void;
  onSortDirToggle: () => void;
  onTagToggle: (tag: string) => void;
  onSpecialtyToggle: (spec: string) => void;
  onGradeToggle: (grade: string) => void;
  onTypeChange: (type: HospitalTypeFilter) => void;
  onErLevelChange: (level: ERLevelFilter) => void;
  onClearFilters: () => void;
  onToggleExpand: (id: number) => void;
  onToggleCompare: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export function DirectoryView({
  hospitals,
  expandedId,
  compareIds,
  bookmarks,
  searchQuery,
  sortBy,
  sortDir,
  selectedTags,
  selectedSpecialties,
  selectedGrades,
  selectedType,
  selectedErLevel,
  onSearchChange,
  onSortChange,
  onSortDirToggle,
  onTagToggle,
  onSpecialtyToggle,
  onGradeToggle,
  onTypeChange,
  onErLevelChange,
  onClearFilters,
  onToggleExpand,
  onToggleCompare,
  onToggleBookmark,
}: DirectoryViewProps) {
  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || selectedSpecialties.length > 0 || selectedGrades.length > 0 || selectedType !== "All" || selectedErLevel !== "All";

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 sticky top-32">
        {/* Search & Sort */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-amber-500" /> Control Panel
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-[10px] text-amber-500 hover:text-amber-400 uppercase font-mono flex items-center gap-1"
              >
                <X size={10} /> Reset
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block tracking-wider">
                Sort by
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as SortKey)}
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white appearance-none focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer"
                >
                  {METRICS.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                  <option value="beds">Bed Count</option>
                  <option value="founded">Founded</option>
                </select>
                <button
                  type="button"
                  onClick={onSortDirToggle}
                  aria-label={sortDir === "desc" ? "Sort descending" : "Sort ascending"}
                  className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  title={sortDir === "desc" ? "Descending" : "Ascending"}
                >
                  {sortDir === "desc" ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Filter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
            <MapPin size={14} className="text-amber-500" /> Grade Filter
          </h3>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((grade) => {
              const isSelected = selectedGrades.includes(grade);
              return (
                <button
                  type="button"
                  key={grade}
                  onClick={() => onGradeToggle(grade)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all border ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type Filter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
            <Heart size={14} className="text-amber-500" /> Hospital Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {HOSPITAL_TYPES.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all border ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* ER Level Filter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
            <Shield size={14} className="text-amber-500" /> ER Trauma Level
          </h3>
          <div className="flex flex-wrap gap-2">
            {ER_LEVELS.map((level) => {
              const isSelected = selectedErLevel === level;
              return (
                <button
                  type="button"
                  key={level}
                  onClick={() => onErLevelChange(level)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all border ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags Filter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
            <MapPin size={14} className="text-amber-500" /> Strategic Assets
          </h3>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wider transition-all border ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Specialties Filter */}
        <div className="bg-[#0b0c14]/80 border border-white/5 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
            <MapPin size={14} className="text-amber-500" /> Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map((spec) => {
              const isSelected = selectedSpecialties.includes(spec);
              return (
                <button
                  type="button"
                  key={spec}
                  onClick={() => onSpecialtyToggle(spec)}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wider transition-all border ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                      : "bg-black/30 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Results Grid */}
      <div className="flex-1 w-full space-y-6">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            Showing {hospitals.length} Result{hospitals.length !== 1 && "s"}
          </span>
          {compareIds.length > 0 && (
            <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase flex items-center gap-1">
              <TrendingUp size={12} /> {compareIds.length} Queued for Matrix
            </span>
          )}
        </div>

        {hospitals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0b0c14] border border-white/5 rounded-2xl p-16 text-center shadow-2xl"
          >
            <Search size={32} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-lg font-serif font-bold text-white mb-2">No facilities found</h3>
            <p className="text-xs text-slate-500 font-mono">
              Adjust your filters to see available telemetries.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 text-xs font-mono bg-white/5 hover:bg-white/10 px-6 py-2 rounded-lg border border-white/10 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {hospitals.map((h) => (
              <HospitalCard
                key={h.id}
                hospital={h}
                isExpanded={expandedId === h.id}
                isCompared={compareIds.includes(h.id)}
                isBookmarked={bookmarks.includes(h.id)}
                onToggleExpand={() => onToggleExpand(h.id)}
                onToggleCompare={() => onToggleCompare(h.id)}
                onToggleBookmark={() => onToggleBookmark(h.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
