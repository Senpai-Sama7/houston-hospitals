import { useState, useMemo, useCallback } from "react";
import {
  hospitals,
  VIEW_TABS,
  QUICK_SCENARIOS,
  type Hospital,
  type ViewKey,
  type HospitalTypeFilter,
  type ERLevelFilter,
  type SortKey,
} from "@/data/hospitals";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { Ticker } from "@/components/Ticker";
import { DirectoryView } from "@/components/DirectoryView";
import { ComparisonView } from "@/components/ComparisonView";
import { AnalyticsView } from "@/components/AnalyticsView";
import { LuxuryView } from "@/components/LuxuryView";
import { SourcesView } from "@/components/SourcesView";
import { QuickScenarios } from "@/components/QuickScenarios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BarChart3,
  TrendingUp,
  Info,
  Activity,
  Download,
  X,
  Sparkles,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { cn, escapeCSV } from "@/lib/utils";

function exportToCSV(data: Hospital[]) {
  const headers = ["Name", "Short Name", "Grade", "Type", "ER Level", "Overall Score", "Care Score", "Tech Score", "Amenity Score", "Luxury Score", "Beds", "Campuses", "Founded", "Location", "Phone", "Website"];
  const rows = data.map((h) => [
    escapeCSV(h.name),
    escapeCSV(h.shortName),
    h.grade,
    h.type,
    h.erLevel,
    h.overallScore,
    h.careScore,
    h.techScore,
    h.amenityScore,
    h.luxuryScore,
    h.beds,
    h.campuses,
    h.founded,
    escapeCSV(h.location),
    escapeCSV(h.phone),
    escapeCSV(h.website),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "houston-hospitals-2026.csv";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportToJSON(data: Hospital[]) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "houston-hospitals-2026.json";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const VIEW_ICONS: Record<ViewKey, typeof Search> = {
  directory: Search,
  compare: BarChart3,
  analytics: TrendingUp,
  luxury: Sparkles,
  sources: Info,
};

export default function App() {
  const [activeView, setActiveView] = useLocalStorage<ViewKey>("hma-view", "directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useLocalStorage<SortKey>("hma-sort", "overallScore");
  const [sortDir, setSortDir] = useLocalStorage<"asc" | "desc">("hma-sort-dir", "desc");
  const [selectedTags, setSelectedTags] = useLocalStorage<string[]>("hma-tags", []);
  const [selectedSpecialties, setSelectedSpecialties] = useLocalStorage<string[]>("hma-specialties", []);
  const [selectedGrades, setSelectedGrades] = useLocalStorage<string[]>("hma-grades", []);
  const [compareIds, setCompareIds] = useLocalStorage<number[]>("hma-compare", []);
  const [bookmarks, setBookmarks] = useLocalStorage<number[]>("hma-bookmarks", []);
  const [selectedType, setSelectedType] = useLocalStorage<HospitalTypeFilter>("hma-type", "All");
  const [selectedErLevel, setSelectedErLevel] = useLocalStorage<ERLevelFilter>("hma-er", "All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 200);

  const toggleCompare = useCallback(
    (id: number) => {
      setCompareIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setCompareIds]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    },
    [setSelectedTags]
  );

  const toggleSpecialty = useCallback(
    (spec: string) => {
      setSelectedSpecialties((prev) =>
        prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
      );
    },
    [setSelectedSpecialties]
  );

  const toggleGrade = useCallback(
    (grade: string) => {
      setSelectedGrades((prev) =>
        prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
      );
    },
    [setSelectedGrades]
  );

  const toggleType = useCallback(
    (type: HospitalTypeFilter) => {
      setSelectedType(type);
    },
    [setSelectedType]
  );

  const toggleErLevel = useCallback(
    (level: ERLevelFilter) => {
      setSelectedErLevel(level);
    },
    [setSelectedErLevel]
  );

  const toggleBookmark = useCallback(
    (id: number) => {
      setBookmarks((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setBookmarks]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedSpecialties([]);
    setSelectedGrades([]);
    setSelectedType("All");
    setSelectedErLevel("All");
    setSortBy("overallScore");
    setSortDir("desc");
  }, [setSelectedTags, setSelectedSpecialties, setSelectedGrades, setSelectedType, setSelectedErLevel, setSortBy, setSortDir]);

  const handleScenario = useCallback(
    (scenarioId: string) => {
      if (scenarioId === "reset") {
        clearFilters();
        toast.success("All filters reset");
        return;
      }
      const scenario = QUICK_SCENARIOS.find((s) => s.id === scenarioId);
      if (!scenario) return;
      setSearchQuery("");
      setSelectedTags([...scenario.tags]);
      setSelectedSpecialties([]);
      setSelectedGrades([]);
      setSelectedType("All");
      setSelectedErLevel("All");
      setSortBy("overallScore");
      setSortDir("desc");
      setActiveView("directory");
      toast.success(`Applied: ${scenario.label}`);
    },
    [clearFilters, setSelectedTags, setSelectedSpecialties, setSelectedGrades, setSelectedType, setSelectedErLevel, setSortBy, setSortDir, setActiveView]
  );

  const filteredHospitals = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();

    let list = [...hospitals];

    if (q) {
      list = list.filter((h) => {
        const haystack = [
          h.name,
          h.shortName,
          h.txRank,
          h.heroTag,
          h.nationalStatus,
          h.location,
          ...h.tags,
          ...h.specialties,
          ...h.highlights.map((hl) => `${hl.label} ${hl.desc}`),
          ...h.amenities.rooms,
          ...h.amenities.technology,
          ...h.amenities.facilities,
          ...h.amenities.services,
          ...h.amenities.luxury,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (selectedTags.length > 0) {
      list = list.filter((h) => selectedTags.some((tag) => h.tags.includes(tag)));
    }

    if (selectedSpecialties.length > 0) {
      list = list.filter((h) => selectedSpecialties.some((spec) => h.specialties.includes(spec)));
    }

    if (selectedGrades.length > 0) {
      list = list.filter((h) => selectedGrades.includes(h.grade));
    }

    if (selectedType !== "All") {
      list = list.filter((h) => h.type === selectedType);
    }

    if (selectedErLevel !== "All") {
      list = list.filter((h) => h.erLevel === selectedErLevel);
    }

    const sortKey = sortBy as keyof Hospital;
    list.sort((a, b) => {
      const av = (a[sortKey] as number) ?? 0;
      const bv = (b[sortKey] as number) ?? 0;
      return sortDir === "desc" ? bv - av : av - bv;
    });

    return list;
  }, [debouncedSearch, selectedTags, selectedSpecialties, selectedGrades, selectedType, selectedErLevel, sortBy, sortDir]);

  const comparedHospitals = useMemo(
    () => hospitals.filter((h) => compareIds.includes(h.id)),
    [compareIds]
  );

  const toggleExpand = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="min-h-screen bg-[#030305] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b0c14",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "12px",
          },
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030305]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(200,150,12,0.03),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4">
            {/* Title Block */}
            <div
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => setActiveView("directory")}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                <Activity className="text-amber-500" size={20} />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold font-serif tracking-tight text-white">
                  Houston Medical Analytics
                </h1>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  Verified Q1 2026 Telemetry
                </p>
              </div>
            </div>

            {/* View Toggles */}
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 self-start md:self-auto backdrop-blur-md">
              {VIEW_TABS.map((tab) => {
                const Icon = VIEW_ICONS[tab.id];
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2",
                      activeView === tab.id
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                    title={tab.desc}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {tab.id === "compare" && compareIds.length > 0 && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md",
                          activeView === "compare" ? "bg-black/20" : "bg-amber-500/20 text-amber-500"
                        )}
                      >
                        {compareIds.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <Ticker />

      {/* Quick Scenarios Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2">
        <QuickScenarios onScenario={handleScenario} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 relative">
        {/* Sticky Compare Bar */}
        <AnimatePresence>
          {compareIds.length > 0 && activeView !== "compare" && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 text-xs font-mono">
                <BarChart3 size={16} className="text-amber-500" />
                <span className="text-slate-300">
                  <strong className="text-white">{compareIds.length}</strong> hospital{compareIds.length !== 1 ? "s" : ""} selected for comparison
                </span>
                <div className="flex gap-1 ml-2">
                  {compareIds.map((id) => {
                    const h = hospitals.find((x) => x.id === id);
                    return h ? (
                      <span
                        key={id}
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: `${h.color}20`, color: h.color }}
                      >
                        {h.shortName}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveView("compare")}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-black text-[10px] font-mono font-bold tracking-wider hover:bg-amber-400 transition-colors"
                >
                  VIEW MATRIX
                </button>
                <button
                  type="button"
                  onClick={() => setCompareIds([])}
                  aria-label="Clear comparison selection"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Actions */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => {
              exportToCSV(filteredHospitals);
              toast.success("CSV exported successfully");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Download size={12} /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => {
              exportToJSON(filteredHospitals);
              toast.success("JSON exported successfully");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Download size={12} /> Export JSON
          </button>
        </div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {activeView === "directory" && (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DirectoryView
                hospitals={filteredHospitals}
                expandedId={expandedId}
                compareIds={compareIds}
                bookmarks={bookmarks}
                searchQuery={searchQuery}
                sortBy={sortBy}
                sortDir={sortDir}
                selectedTags={selectedTags}
                selectedSpecialties={selectedSpecialties}
                selectedGrades={selectedGrades}
                selectedType={selectedType}
                selectedErLevel={selectedErLevel}
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
                onSortDirToggle={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
                onTagToggle={toggleTag}
                onSpecialtyToggle={toggleSpecialty}
                onGradeToggle={toggleGrade}
                onTypeChange={toggleType}
                onErLevelChange={toggleErLevel}
                onClearFilters={clearFilters}
                onToggleExpand={toggleExpand}
                onToggleCompare={toggleCompare}
                onToggleBookmark={toggleBookmark}
              />
            </motion.div>
          )}

          {activeView === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ComparisonView
                hospitals={comparedHospitals}
                onRemoveCompare={toggleCompare}
              />
            </motion.div>
          )}

          {activeView === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AnalyticsView hospitals={filteredHospitals.length > 0 ? filteredHospitals : hospitals} />
            </motion.div>
          )}

          {activeView === "luxury" && (
            <motion.div
              key="luxury"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <LuxuryView hospitals={filteredHospitals.length > 0 ? filteredHospitals : hospitals} />
            </motion.div>
          )}

          {activeView === "sources" && (
            <motion.div
              key="sources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <SourcesView hospitals={filteredHospitals.length > 0 ? filteredHospitals : hospitals} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#010102] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <Info size={12} /> Data curated from Q1 2026 institutional filings
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                exportToCSV(hospitals);
                toast.success("Full dataset exported as CSV");
              }}
              className="text-[9px] font-mono text-slate-600 hover:text-amber-500 uppercase tracking-widest transition-colors"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => {
                exportToJSON(hospitals);
                toast.success("Full dataset exported as JSON");
              }}
              className="text-[9px] font-mono text-slate-600 hover:text-amber-500 uppercase tracking-widest transition-colors"
            >
              Export JSON
            </button>
            <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
              Houston Medical Analytics © 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
