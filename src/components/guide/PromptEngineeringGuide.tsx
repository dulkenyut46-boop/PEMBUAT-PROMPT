import React, { useState } from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Code, Copy, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { usePrompts } from "../../context/PromptContext";

export const PromptEngineeringGuide: React.FC = () => {
  const { showToast } = usePrompts();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(id);
      showToast("Contoh snippet berhasil disalin!", "success");
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch {
      showToast("Gagal menyalin snippet.", "error");
    }
  };

  const vercelJsonSnippet = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const crudRuleSnippet = `// WAJIB: State Mutasi Langsung
const handleCreate = (newItem) => {
  setItems(prev => [newItem, ...prev]);
};
const handleUpdate = (id, updates) => {
  setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
};
const handleDelete = (id) => {
  setItems(prev => prev.filter(item => item.id !== id));
};`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <Badge variant="gojek" className="bg-[#00AA13] text-white border-0 text-[11px] uppercase tracking-wider">
            Kurikulum Prompt Web Lengkap
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Panduan Menulis Prompt Web Production-Ready
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Kunci dari kode AI yang langsung dapat dieksekusi tanpa error adalah spesifikasi data yang lengkap, tech stack eksplisit, konfigurasi routing SPA, dan aturan anti-slop.
          </p>
        </div>
      </div>

      {/* 4 Pilar Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pilar 1 */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            <span className="flex h-6 w-6 rounded-full bg-[#00AA13] text-white text-xs items-center justify-center font-bold">
              1
            </span>
            <span>Konfigurasi Deployment SPA (Critical)</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Pada aplikasi Vite/React SPA yang dideploy di Vercel atau hosting modern, URL refresh akan menghasilkan error 404 jika rewrite tidak didefinisikan. Selalu minta file <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">vercel.json</code> pada prompt Anda.
          </p>

          <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 text-xs font-mono relative group">
            <pre className="overflow-x-auto">{vercelJsonSnippet}</pre>
            <button
              onClick={() => handleCopyCode(vercelJsonSnippet, "vercel")}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
              title="Salin JSON"
            >
              {copiedSnippet === "vercel" ? <Check className="h-3.5 w-3.5 text-[#00AA13]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </Card>

        {/* Pilar 2 */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            <span className="flex h-6 w-6 rounded-full bg-[#00AA13] text-white text-xs items-center justify-center font-bold">
              2
            </span>
            <span>Aturan Anti-Mock & Full CRUD State</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            AI cenderung membuat tampilan statis dengan <code className="text-rose-500">console.log("todo")</code>. Cantumkan instruksi tegas bahwa data awal wajib dapat di-create, di-update, dan di-delete secara instan pada antarmuka.
          </p>

          <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 text-xs font-mono relative group">
            <pre className="overflow-x-auto">{crudRuleSnippet}</pre>
            <button
              onClick={() => handleCopyCode(crudRuleSnippet, "crud")}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
              title="Salin Kode"
            >
              {copiedSnippet === "crud" ? <Check className="h-3.5 w-3.5 text-[#00AA13]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </Card>

        {/* Pilar 3 */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            <span className="flex h-6 w-6 rounded-full bg-[#00AA13] text-white text-xs items-center justify-center font-bold">
              3
            </span>
            <span>Gaya Desain Gojek & Standar Anti-Slop</span>
          </div>
          <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00AA13] shrink-0 mt-0.5" />
              <span>Gunakan warna primer khas Gojek <strong className="text-neutral-900 dark:text-neutral-100">#00AA13</strong> dengan aksen putih, hitam, dan netral slate.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00AA13] shrink-0 mt-0.5" />
              <span>Hindari gradien ungu murahan, text cyan di latar gelap, atau drop-shadow berlebihan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00AA13] shrink-0 mt-0.5" />
              <span>Gunakan border radius seragam (rounded-xl 12-16px) dan kontras keterbacaan WCAG AA.</span>
            </li>
          </ul>
        </Card>

        {/* Pilar 4 */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            <span className="flex h-6 w-6 rounded-full bg-[#00AA13] text-white text-xs items-center justify-center font-bold">
              4
            </span>
            <span>Dukungan Dark Mode & Responsivitas</span>
          </div>
          <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00AA13] shrink-0 mt-0.5" />
              <span>Layout adaptif: Sidebar runtuh menjadi drawer di mobile, tabel dilengkapi scroll horizontal.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00AA13] shrink-0 mt-0.5" />
              <span>Dark mode toggle yang tersimpan di localStorage agar preferensi pengguna tidak hilang saat reload.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
