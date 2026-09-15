import React, { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePrompts } from "../../context/PromptContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Download, Upload, RotateCcw, ShieldCheck, Database, Server, UserCheck, Terminal } from "lucide-react";
import { INITIAL_PROMPTS } from "../../data/initialPrompts";

export const SettingsView: React.FC = () => {
  const { currentUser, setIsLoginModalOpen } = useAuth();
  const { prompts, showToast } = usePrompts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-pembuat-web-prompt-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Data prompt berhasil diekspor ke file JSON.", "success");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          localStorage.setItem("app_prompts_data", JSON.stringify(parsed));
          window.location.reload();
        } else {
          showToast("Format file JSON tidak valid.", "error");
        }
      } catch {
        showToast("Gagal membaca file JSON.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm("Apakah Anda yakin ingin mengembalikan data ke contoh awal? Semua perubahan akan direset.")) {
      localStorage.setItem("app_prompts_data", JSON.stringify(INITIAL_PROMPTS));
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profil Kolaborator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profil Kolaborator Aktif</CardTitle>
          <CardDescription>Akun yang digunakan untuk mencatat kepemilikan dan hak cipta prompt</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentUser ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
              <div className="flex items-center gap-3.5">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#00AA13]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {currentUser.name}
                    </span>
                    <Badge variant="gojek">{currentUser.role}</Badge>
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {currentUser.email} • {currentUser.team}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
                className="self-start sm:self-auto"
              >
                <UserCheck className="h-4 w-4 text-[#00AA13]" />
                <span>Ganti Akun</span>
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Anda belum masuk ke akun tim.</span>
              <Button size="sm" onClick={() => setIsLoginModalOpen(true)}>
                Masuk / Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cadangan & Manajemen Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cadangan Data & Portabilitas (CRUD State)</CardTitle>
          <CardDescription>Simpan dan pulihkan koleksi seluruh prompt yang telah Anda rancang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={handleExportJson}
              className="justify-start gap-2 h-11 text-xs"
            >
              <Download className="h-4 w-4 text-[#00AA13]" />
              <span>Ekspor ke JSON</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="justify-start gap-2 h-11 text-xs"
            >
              <Upload className="h-4 w-4 text-sky-500" />
              <span>Impor dari JSON</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJson}
              accept=".json"
              className="hidden"
            />

            <Button
              variant="ghost"
              onClick={handleResetData}
              className="justify-start gap-2 h-11 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Data Contoh</span>
            </Button>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Seluruh data tersimpan otomatis secara mutabel di browser local storage Anda dan langsung sinkron dengan antarmuka.
          </p>
        </CardContent>
      </Card>

      {/* Konfigurasi Stack & Vercel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status Arsitektur Sistem</CardTitle>
          <CardDescription>Spesifikasi runtime, database, dan hosting yang digunakan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
            <div className="flex items-center gap-2.5">
              <Database className="h-4 w-4 text-[#00AA13]" />
              <div>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                  Database & Backend
                </span>
                <span className="text-[11px] text-neutral-500">Firebase Firestore & Client State Persisted</span>
              </div>
            </div>
            <Badge variant="success">Terkoneksi</Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
            <div className="flex items-center gap-2.5">
              <Server className="h-4 w-4 text-sky-500" />
              <div>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                  Deployment Routing (vercel.json)
                </span>
                <span className="text-[11px] text-neutral-500">SPA Rewrite Aktif (Anti 404 pada Refresh)</span>
              </div>
            </div>
            <Badge variant="gojek">Siap Produksi</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
