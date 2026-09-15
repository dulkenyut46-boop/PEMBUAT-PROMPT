import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { BarChart, BarDataPoint } from "../charts/BarChart";
import { LineChart, LineDataPoint } from "../charts/LineChart";
import { DonutChart, DonutSegment } from "../charts/DonutChart";
import { usePrompts } from "../../context/PromptContext";

export const AnalyticsSection: React.FC = () => {
  const { prompts, stats } = usePrompts();
  const [period, setPeriod] = useState<"minggu" | "bulan" | "tahun">("bulan");

  // Generate bar chart data (Bulan Mei - Sep)
  const barData: BarDataPoint[] = [
    { label: "Mei", value: 6 },
    { label: "Jun", value: 11 },
    { label: "Jul", value: 15 },
    { label: "Ags", value: 24 },
    { label: "Sep", value: prompts.length }
  ];

  // Line chart data (Tren Copy & Eksekusi)
  const lineData: LineDataPoint[] = [
    { label: "Mg 1", value: 120 },
    { label: "Mg 2", value: 245 },
    { label: "Mg 3", value: 310 },
    { label: "Mg 4", value: 430 },
    { label: "Mg 5", value: Math.max(stats.totalCopies, 550) }
  ];

  // Donut chart data for categories
  const categoryColorPalette: Record<string, string> = {
    "Edukasi": "#00AA13",
    "SaaS & Dashboard": "#0284C7",
    "E-Commerce": "#D97706",
    "On-Demand & Logistik": "#10B981",
    "Fintech": "#8B5CF6",
    "Kesehatan": "#EC4899",
    "UMKM & Bisnis": "#64748B"
  };

  const donutData: DonutSegment[] = Object.keys(stats.categoryCounts).map((cat) => ({
    label: cat,
    value: stats.categoryCounts[cat],
    color: categoryColorPalette[cat] || "#00AA13"
  }));

  // Fallback if empty
  if (donutData.length === 0) {
    donutData.push({ label: "Web App", value: 1, color: "#00AA13" });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Trend Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold">Tren Pemanfaatan & Eksekusi Prompt</CardTitle>
            <CardDescription>Pertumbuhan frekuensi salin dan implementasi prompt ke LLM</CardDescription>
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setPeriod("minggu")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                period === "minggu" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs" : "text-neutral-500"
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setPeriod("bulan")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                period === "bulan" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs" : "text-neutral-500"
              }`}
            >
              Bulanan
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <LineChart data={lineData} height={230} />
        </CardContent>
      </Card>

      {/* Category Donut Chart */}
      <Card className="lg:col-span-1 flex flex-col justify-between">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">Distribusi Kategori Produk</CardTitle>
          <CardDescription>Porsi industri & tipe web yang dihasilkan</CardDescription>
        </CardHeader>
        <CardContent className="pt-2 flex-1 flex items-center justify-center">
          <DonutChart data={donutData} size={170} thickness={24} />
        </CardContent>
      </Card>

      {/* Full width or sub bar chart for generation activity */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">Volume Pembuatan Prompt Web (Bulan ke Bulan)</CardTitle>
          <CardDescription>Total dokumen spesifikasi web yang telah di-generate oleh tim</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <BarChart data={barData} height={190} />
        </CardContent>
      </Card>
    </div>
  );
};
