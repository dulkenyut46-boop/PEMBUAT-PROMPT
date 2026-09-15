import React, { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  BookOpen,
  Settings,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ShieldCheck
} from "lucide-react";
import { usePrompts, NavigationTab } from "../../context/PromptContext";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { activeTab, setActiveTab, prompts } = usePrompts();
  const { currentUser, logout, setIsLoginModalOpen } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: "generator",
      label: "Studio Pembuat Prompt",
      icon: <Sparkles className="h-5 w-5 text-[#00AA13] dark:text-[#38D84B]" />
    },
    {
      id: "library",
      label: "Koleksi Prompt",
      icon: <FolderKanban className="h-5 w-5" />,
      badge: prompts.length
    },
    {
      id: "templates",
      label: "Template Populer",
      icon: <Layers className="h-5 w-5" />
    },
    {
      id: "guide",
      label: "Panduan Arsitektur",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "settings",
      label: "Pengaturan & Tim",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-neutral-200/80 dark:border-neutral-800/90 bg-white dark:bg-neutral-900 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/70 shrink-0">
          <div
            onClick={() => handleNavClick("dashboard")}
            className="flex items-center gap-3 cursor-pointer overflow-hidden group"
          >
            {/* Gojek-style brand badge icon */}
            <div className="h-10 w-10 rounded-xl bg-[#00AA13] flex items-center justify-center text-white shadow-sm shadow-[#00AA13]/30 shrink-0 group-hover:bg-[#00880D] transition-colors">
              <Sparkles className="h-5 w-5" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                  PEMBUAT WEB
                </span>
                <span className="text-[11px] font-bold text-[#00AA13] tracking-wide uppercase">
                  PROMPT STUDIO
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={isCollapsed ? "Perluas Sidebar" : "Kecilkan Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Menu Utama
            </div>
          )}

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left relative group",
                  isActive
                    ? "bg-[#00AA13]/10 text-[#00880D] dark:bg-[#00AA13]/20 dark:text-[#38D84B] font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active left indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#00AA13] rounded-r-full" />
                )}

                <div className="shrink-0">{item.icon}</div>

                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}

                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-[11px] px-2 py-0.5 rounded-full font-bold",
                      isActive
                        ? "bg-[#00AA13] text-white"
                        : "bg-neutral-200/70 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pro / Quick Tips Card (When Expanded) */}
        {!isCollapsed && (
          <div className="mx-3 my-2 p-3.5 rounded-2xl bg-gradient-to-br from-[#00AA13]/10 via-[#00AA13]/5 to-transparent border border-[#00AA13]/20 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#00880D] dark:text-[#38D84B]">
              <ShieldCheck className="h-4 w-4" />
              <span>Standar Gojek-Tech</span>
            </div>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
              Prompt dibuat dengan konfigurasi vercel.json SPA rewrite & aturan Anti-Slop otomatis.
            </p>
          </div>
        )}

        {/* User Profile Footer */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800/70 shrink-0">
          {currentUser ? (
            <div
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl transition-colors bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
                isCollapsed ? "justify-center p-2" : ""
              )}
              onClick={() => setIsLoginModalOpen(true)}
              title="Kelola Akun & Ganti Profil"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#00AA13]/30 shrink-0"
                referrerPolicy="no-referrer"
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                    {currentUser.role}
                  </div>
                </div>
              )}
              {!isCollapsed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                  className="p-1 text-neutral-400 hover:text-rose-500 rounded-lg transition-colors"
                  title="Keluar"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00AA13] text-white text-xs font-bold hover:bg-[#00880D] transition-colors"
            >
              <User className="h-4 w-4" />
              {!isCollapsed && <span>Masuk / Login</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
