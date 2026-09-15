import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { usePrompts } from "../../context/PromptContext";
import { KpiCards } from "../dashboard/KpiCards";
import { AnalyticsSection } from "../dashboard/AnalyticsSection";
import { PromptWizard } from "../generator/PromptWizard";
import { PromptFilterBar } from "../library/PromptFilterBar";
import { PromptListTable } from "../library/PromptListTable";
import { TemplatesGallery } from "../templates/TemplatesGallery";
import { PromptEngineeringGuide } from "../guide/PromptEngineeringGuide";
import { SettingsView } from "../settings/SettingsView";
import { PromptDetailModal } from "../library/PromptDetailModal";
import { PromptEditModal } from "../library/PromptEditModal";
import { LoginModal } from "../auth/LoginModal";
import { ToastContainer } from "../ui/Toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Plus, ArrowRight, Sparkles, FolderKanban } from "lucide-react";

export const DashboardLayout: React.FC = () => {
  const { activeTab, setActiveTab, toasts, removeToast, prompts } = usePrompts();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
        {/* Topbar Header */}
        <Topbar onOpenMobileMenu={() => setIsMobileOpen(true)} />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Welcome & Fast Start Hero */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#00AA13]/15 via-[#00AA13]/5 to-transparent border border-[#00AA13]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00880D] dark:text-[#38D84B]">
                    <Sparkles className="h-4 w-4" />
                    <span>PEMBUAT WEB PROMPT LENGKAP</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                    Studio Perancang Prompt Web Indonesia
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
                    Hasilkan dokumen spesifikasi arsitektur aplikasi web lengkap: modul auth, data CRUD, responsif, dark mode, dan konfigurasi vercel.json dalam hitungan detik.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => setActiveTab("generator")}
                    className="font-bold shadow-md shadow-[#00AA13]/25 gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Buat Prompt Sekarang</span>
                  </Button>
                </div>
              </div>

              {/* KPI Metrics */}
              <KpiCards />

              {/* Analytics Charts */}
              <AnalyticsSection />

              {/* Recent Prompts Quick Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-[#00AA13]" />
                      <span>Koleksi Prompt Terbaru</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Spesifikasi prompt web yang siap dieksekusi atau disesuaikan
                    </CardDescription>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("library")}
                    className="text-xs gap-1 font-semibold text-[#00AA13] dark:text-[#38D84B]"
                  >
                    <span>Lihat Semua ({prompts.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardHeader>

                <CardContent className="p-0 sm:p-4">
                  <PromptListTable viewMode="table" />
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: GENERATOR STUDIO */}
          {activeTab === "generator" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <PromptWizard />
            </div>
          )}

          {/* TAB 3: KOLEKSI PROMPT (CRUD LIBRARY) */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <PromptFilterBar viewMode={viewMode} setViewMode={setViewMode} />
              <PromptListTable viewMode={viewMode} />
            </div>
          )}

          {/* TAB 4: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <TemplatesGallery />
            </div>
          )}

          {/* TAB 5: PANDUAN EDUKASI */}
          {activeTab === "guide" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <PromptEngineeringGuide />
            </div>
          )}

          {/* TAB 6: PENGATURAN */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <SettingsView />
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <PromptDetailModal />
      <PromptEditModal />
      <LoginModal />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
