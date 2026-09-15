import React from "react";
import { FileText, Copy, Clock, TrendingUp, Sparkles } from "lucide-react";
import { usePrompts } from "../../context/PromptContext";
import { formatCurrencyIDR } from "../../lib/utils";
import { Card } from "../ui/Card";

export const KpiCards: React.FC = () => {
  const { stats } = usePrompts();

  const cards = [
    {
      id: "kpi-prompts",
      title: "Total Prompt Web",
      value: stats.totalPrompts.toString(),
      subtext: "Prompt spesifikasi aktif",
      badge: "+18% bln ini",
      badgeType: "positive",
      icon: <FileText className="h-5 w-5 text-[#00AA13]" />,
      accentColor: "border-[#00AA13]/30 bg-[#00AA13]/5"
    },
    {
      id: "kpi-copies",
      title: "Prompt Disalin & Dipakai",
      value: stats.totalCopies.toLocaleString("id-ID"),
      subtext: "Frekuensi eksekusi AI/LLM",
      badge: "+32% tren",
      badgeType: "positive",
      icon: <Copy className="h-5 w-5 text-emerald-600" />,
      accentColor: "border-emerald-500/30 bg-emerald-500/5"
    },
    {
      id: "kpi-hours",
      title: "Waktu Hemat Dev",
      value: `${stats.hoursSaved} Jam`,
      subtext: "Otomasi PRD & arsitektur",
      badge: "Sangat Efisien",
      badgeType: "neutral",
      icon: <Clock className="h-5 w-5 text-sky-600" />,
      accentColor: "border-sky-500/30 bg-sky-500/5"
    },
    {
      id: "kpi-value",
      title: "Nilai Efisiensi (IDR)",
      value: formatCurrencyIDR(stats.estimatedValueIDR),
      subtext: "Basis dev rate Rp 200rb/jam",
      badge: "Ekonomi ROI",
      badgeType: "highlight",
      icon: <TrendingUp className="h-5 w-5 text-amber-600" />,
      accentColor: "border-amber-500/30 bg-amber-500/5"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 group"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                {card.title}
              </span>
              <div className="text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                {card.value}
              </div>
            </div>
            <div className={`p-2.5 rounded-xl border ${card.accentColor} transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
            <span className="text-neutral-500 dark:text-neutral-400 truncate">
              {card.subtext}
            </span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                card.badgeType === "positive"
                  ? "bg-[#00AA13]/10 text-[#00880D] dark:text-[#38D84B]"
                  : card.badgeType === "highlight"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              }`}
            >
              {card.badge}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
