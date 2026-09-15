import React from "react";
import { Search, Filter, RotateCcw, Star, Grid, List } from "lucide-react";
import { usePrompts } from "../../context/PromptContext";
import { PROMPT_CATEGORIES } from "../../data/initialPrompts";
import { Button } from "../ui/Button";

interface PromptFilterBarProps {
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
}

export const PromptFilterBar: React.FC<PromptFilterBarProps> = ({ viewMode, setViewMode }) => {
  const { filters, setFilters, resetFilters, filteredPrompts, prompts } = usePrompts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const isFiltered =
    filters.search !== "" ||
    filters.category !== "Semua Kategori" ||
    filters.status !== "Semua Status" ||
    filters.complexity !== "Semua Kompleksitas" ||
    filters.isFavoriteOnly ||
    filters.sortBy !== "terbaru";

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul, tag, atau deskripsi..."
            value={filters.search}
            onChange={handleSearchChange}
            className="h-10 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#00AA13]"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00AA13] cursor-pointer"
          >
            {PROMPT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00AA13] cursor-pointer"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Draft">Draft</option>
            <option value="Diarsipkan">Diarsipkan</option>
          </select>

          {/* Sorting Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as "terbaru" | "terlama" | "terpopuler" | "nama-asc"
              }))
            }
            className="h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00AA13] cursor-pointer"
          >
            <option value="terbaru">Terbaru Dibuat</option>
            <option value="terlama">Terlama</option>
            <option value="terpopuler">Paling Banyak Disalin</option>
            <option value="nama-asc">Nama A-Z</option>
          </select>

          {/* Favorite Only Toggle */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, isFavoriteOnly: !prev.isFavoriteOnly }))}
            className={`h-10 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              filters.isFavoriteOnly
                ? "border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300"
                : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            }`}
            title="Filter Favorit Saja"
          >
            <Star className={`h-4 w-4 ${filters.isFavoriteOnly ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>Favorit</span>
          </button>

          {/* Reset Filter Button */}
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-10 px-2.5 text-xs text-neutral-500">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
          )}

          {/* View Mode Toggle (Table / Grid) */}
          <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              }`}
              title="Tampilan Tabel"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              }`}
              title="Tampilan Grid Kartu"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub status summary */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
        <span>
          Ditemukan <strong className="text-neutral-900 dark:text-neutral-100">{filteredPrompts.length}</strong> dari total {prompts.length} prompt tersimpan
        </span>
        {filters.isFavoriteOnly && (
          <span className="text-amber-600 dark:text-amber-400 font-medium">Menampilkan prompt favorit</span>
        )}
      </div>
    </div>
  );
};
