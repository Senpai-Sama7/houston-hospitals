import { QUICK_SCENARIOS } from "@/data/hospitals";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface QuickScenariosProps {
  onScenario: (scenarioId: string) => void;
}

export function QuickScenarios({ onScenario }: QuickScenariosProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 mr-1">
        <Zap size={10} className="text-amber-500" /> Quick scenarios:
      </span>
      {QUICK_SCENARIOS.map((scenario, i) => {
        const isReset = scenario.id === "reset";
        return (
          <motion.button
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            type="button"
            onClick={() => onScenario(scenario.id)}
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono tracking-wider transition-all hover:scale-105 active:scale-95 ${
              isReset
                ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                : "bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-amber-500/30 hover:text-amber-300"
            }`}
          >
            <span className="mr-1">{scenario.icon}</span>
            {scenario.label}
          </motion.button>
        );
      })}
    </div>
  );
}
