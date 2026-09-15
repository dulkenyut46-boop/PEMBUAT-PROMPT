import React from "react";
import {
  Menu,
  Search,
  Plus,
  Sun,
  Moon,
  Bell,
  Sparkles,
  UserCheck
} from "lucide-react";
import { usePrompts, NavigationTab } from "../../context/PromptContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const { activeTab, setActiveTab, filters, setFilters, clearGeneratorPrefill } = usePrompts();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, setIsLoginModalOpen } = useAuth();

  const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: "Dashboard Metrik & Analitik",
      subtitle: "Ringkasan produktivitas dan performa arsitektur prompt web"
    },
    generator: {
      title: "Studio Pembuat Prompt Lengkap",
      subtitle: "Wizard perancang prompt spesifikasi web siap eksekusi"
    },
    library: {
      title: "Koleksi Prompt Tersimpan",
      subtitle: "Kelola, filter, salin, dan ekspor prompt spesifikasi aplikasi"
    },
    templates: {
      title: "Galeri Template Populer",
      subtitle: "Kumpulan pola prompt standar industri Indonesia siap pakai"
    },
    guide: {
      title: "Panduan Arsitektur & Best Practices",
      subtitle: "Pedoman membuat prompt web lengkap, modular, dan anti-slop"
    },
    settings: {
      title: "Pengaturan & Konfigurasi Tim",
      subtitle: "Preferensi akun, integrasi Firebase, dan cadangan data JSON"
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFilters((prev) => ({ ...prev, search: val }));
    if (activeTab !== "library" && val.trim().length > 0) {
      setActiveTab("library");
    }
  };

  const handleCreatePrompt = () => {
    clearGeneratorPrefill();
    setActiveTab("generator");
  };

  const currentMeta = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/90 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-4 sm:px-6 transition-colors">
      {/* Left side: Hamburger + Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 lg:hidden"
          aria-label="Buka Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
            {currentMeta.title}
          </h1>
          <p className="hidden md:block text-xs text-neutral-500 dark:text-neutral-400">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Search, Actions & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari prompt, tag, stack..."
            value={filters.search}
            onChange={handleSearchChange}
            className="h-9 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 pl-9 pr-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#00AA13]"
          />
        </div>

        {/* Primary CTA: Buat Prompt */}
        <Button
          onClick={handleCreatePrompt}
          size="sm"
          className="gap-1.5 font-bold shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Buat Prompt Baru</span>
          <span className="sm:hidden">Buat</span>
        </Button>

        {/* Theme Toggle (Dark/Light) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          aria-label="Toggle tema gelap/terang"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-neutral-700" />
          )}
        </button>

        {/* User profile toggle */}
        {currentUser && (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Profil Pengguna & Ganti Akun"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="h-7 w-7 rounded-full object-cover ring-2 ring-[#00AA13]/50"
              referrerPolicy="no-referrer"
            />
            <span className="hidden xl:inline text-xs font-semibold text-neutral-800 dark:text-neutral-200 max-w-[120px] truncate">
              {currentUser.name}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
