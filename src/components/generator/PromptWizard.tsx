import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Save,
  RotateCcw,
  Layers,
  Code2,
  Cpu,
  Layout,
  FileCheck,
  Wand2,
  FileText
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { Badge } from "../ui/Badge";
import { usePrompts } from "../../context/PromptContext";
import { PromptCategory, ComplexityLevel } from "../../types/prompt";

export const PromptWizard: React.FC = () => {
  const { addPrompt, showToast, generatorPrefillData, clearGeneratorPrefill, setActiveTab } = usePrompts();

  // Wizard Form States
  const [productName, setProductName] = useState("Sistem Manajemen Sekolah & CBT");
  const [productType, setProductType] = useState("Web App (SPA / Dashboard)");
  const [industry, setIndustry] = useState<PromptCategory>("Edukasi");
  const [targetUsers, setTargetUsers] = useState("Publik, Guru, dan Siswa Indonesia");
  const [primaryProblem, setPrimaryProblem] = useState("Kebutuhan data administrasi sekolah terintegrasi dan ujian digital otomatis");
  const [valueProposition, setValueProposition] = useState("Lebih cepat buat ujian, kalkulasi rapor otomatis, dan hemat waktu koreksi guru");

  // Tech Stack States
  const [framework, setFramework] = useState("Next.js (atau Vite + React SPA) + TypeScript");
  const [uiFramework, setUiFramework] = useState("TailwindCSS");
  const [componentLibrary, setComponentLibrary] = useState("shadcn/ui (Table, Card, Modal, Tabs, Select, Badge)");
  const [database, setDatabase] = useState("Firebase (Firestore & Authentication)");
  const [stateManagement, setStateManagement] = useState("Zustand / React Context + localStorage");
  const [includeVercelJson, setIncludeVercelJson] = useState(true);

  // Features & Workflow Options
  const [hasAuth, setHasAuth] = useState(true);
  const [hasCrud, setHasCrud] = useState(true);
  const [hasFiltering, setHasFiltering] = useState(true);
  const [hasAnalytics, setHasAnalytics] = useState(true);
  const [hasDarkMode, setHasDarkMode] = useState(true);
  const [customFeatures, setCustomFeatures] = useState("Bank soal pilihan ganda, timer hitung mundur ujian, cetak rapor PDF nilai siswa, export rekap nilai");

  // UI/UX Styling
  const [uiStyle, setUiStyle] = useState("Modern Clean (Gojek-inspired Hijau #00AA13)");
  const [complexity, setComplexity] = useState<ComplexityLevel>("Menengah");
  const [enforceAntiSlop, setEnforceAntiSlop] = useState(true);

  // Active step
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Handle prefill if triggered from templates or duplicate
  useEffect(() => {
    if (generatorPrefillData) {
      if (generatorPrefillData.title) setProductName(generatorPrefillData.title);
      if (generatorPrefillData.category) setIndustry(generatorPrefillData.category as PromptCategory);
      if (generatorPrefillData.description) setPrimaryProblem(generatorPrefillData.description);
      if (generatorPrefillData.techStack) {
        setFramework(generatorPrefillData.techStack.framework || framework);
        setUiFramework(generatorPrefillData.techStack.uiFramework || uiFramework);
        setDatabase(generatorPrefillData.techStack.database || database);
      }
      clearGeneratorPrefill();
    }
  }, [generatorPrefillData]);

  // Generate the formatted Markdown prompt string
  const generatePromptText = (): string => {
    const modules: string[] = [];
    if (hasAuth) {
      modules.push("- Modul Autentikasi: Login multi-role, logout, dan proteksi rute pengguna.");
    }
    if (hasCrud) {
      modules.push(
        "- Full CRUD State Management:\n  * Tambah Data Baru (Create via Modal/Form dengan validasi lengkap)\n  * Edit Data (Update langsung memperbarui tampilan antarmuka secara instan)\n  * Hapus Data (Delete dengan dialog konfirmasi aman)\n  * Tinjau Detail (View modal data lengkap)"
      );
    }
    if (hasFiltering) {
      modules.push(
        "- Logika Filter & Pencarian:\n  * Pencarian instan berdasarkan judul, nama, atau tag\n  * Dropdown filter kategori dan status\n  * Pengurutan (Terbaru, Terlama, Paling Banyak Disalin, A-Z)\n  * Navigasi paginasi data (Next, Prev, Items per page)"
      );
    }
    if (hasAnalytics) {
      modules.push(
        "- Metrik & Analitik Bisnis:\n  * KPI Cards dengan persentase pertumbuhan (+/- %)\n  * Visualisasi Bar Chart & Line Chart tren performa\n  * Donut Chart distribusi data kategori produk"
      );
    }

    const deploymentBlock = includeVercelJson
      ? "- Konfigurasi Deployment (CRITICAL):\n  Buat file vercel.json di root untuk menangani SPA routing agar tidak error 404 saat refresh:\n  {\n    \"rewrites\": [\n      { \"source\": \"/(.*)\", \"destination\": \"/index.html\" }\n    ]\n  }"
      : "- Konfigurasi Deployment: Standard production build.";

    const antiSlopBlock = enforceAntiSlop
      ? "- Aturan Desain Anti-Slop (MANDATORY):\n  * DILARANG menggunakan gradien ungu murahan, text cyan di latar gelap, atau drop-shadow berlebihan.\n  * Sudut radius kartu konsisten (rounded-xl 12-16px).\n  * Tipografi berhierarki jelas dengan keterbacaan tinggi (WCAG AA).\n  * Padding dan whitespace ritmis yang proporsional."
      : "";

    return `### SPESIFIKASI PROMPT LENGKAP PENGEMBANGAN APLIKASI WEB
Anda adalah Principal Full-Stack Engineer, UI/UX Designer, dan Startup Product Architect handal.
Bangun aplikasi web production-ready yang lengkap, fungsional, dan modular berdasarkan instruksi berikut.

==================================================
1. INFORMASI PRODUK
==================================================
- Nama Produk: ${productName}
- Tipe Produk: ${productType}
- Target Pengguna: ${targetUsers}
- Industri: ${industry} (Pasar: Indonesia)
- Bahasa Utama: Bahasa Indonesia
- Mata Uang: IDR (Rupiah)
- Masalah yang Diselesaikan: ${primaryProblem}
- Proposisi Nilai: ${valueProposition}

==================================================
2. ARSITEKTUR TEKNOLOGI & BACKEND
==================================================
- Framework: ${framework}
- UI Framework: ${uiFramework}
- Component Library: ${componentLibrary}
- Database & Backend: ${database}
- State Management: ${stateManagement}
${deploymentBlock}

==================================================
3. STRUKTUR APLIKASI & NAVIGASI SAAS
==================================================
- Arsitektur Layout:
  * Sidebar: Logo brand, link navigasi halaman, indikator aktif, dan status profil user.
  * Topbar: Breadcrumbs, quick search bar, tombol aksi cepat, dark mode toggle, dan notifikasi.
  * Content Grid: Area konten modular yang fleksibel dan responsif.
- Breakpoint Responsif:
  * Desktop: Layout multi-kolom penuh.
  * Tablet: Sidebar dapat di-collapse secara otomatis.
  * Mobile: Drawer navigasi samping dan tabel yang dapat di-scroll horizontal secara halus.

==================================================
4. MODUL & ALUR KERJA PENGGUNA (WORKFLOWS)
==================================================
${modules.join("\n")}
- Fitur Kustom Produk:
  ${customFeatures}

==================================================
5. SISTEM DESAIN & UI/UX STYLE
==================================================
- Gaya Desain: ${uiStyle}
- Skema Warna:
  * Warna Utama: Hijau Gojek (#00AA13 / #00880D)
  * Warna Sekunder: Putih, Hitam, dan Abu-abu Netral Slate
  * Status Semantik: Hijau (Sukses), Amber (Peringatan), Merah (Error), Biru (Info)
${hasDarkMode ? "- Dark Mode System: Transisi warna latar, penyesuaian kontras teks, dan adaptasi warna chart." : ""}
${antiSlopBlock}

==================================================
6. ATURAN KRITIS IMPLEMENTASI KODE
==================================================
- NO UI PLACEHOLDERS: Setiap tombol dan form WAJIB memiliki fungsi event handler aktif.
- MUTABLE DUMMY DATA: Siapkan data awal yang kaya dan realistis dalam Bahasa Indonesia yang dapat diedit dan dihapus oleh pengguna.
- MODULARITAS: Pisahkan tipe data, komponen UI, konteks state, dan data dummy ke file terpisah.`;
  };

  const generatedPrompt = generatePromptText();
  const wordCount = generatedPrompt.split(/\s+/).filter(Boolean).length;
  const tokenEstimate = Math.ceil(generatedPrompt.length / 4);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      showToast("Prompt berhasil disalin ke clipboard! Siap di-paste ke AI.", "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Gagal menyalin otomatis, silakan salin manual.", "error");
    }
  };

  const handleSaveToLibrary = () => {
    addPrompt({
      title: productName,
      description: primaryProblem,
      category: industry,
      tags: [productType.split(" ")[0], "TailwindCSS", "Firebase"],
      techStack: {
        framework,
        uiFramework,
        componentLibrary,
        database,
        stateManagement,
        deployment: includeVercelJson ? "Vercel SPA rewrite (vercel.json)" : "Standar"
      },
      fullPromptContent: generatedPrompt,
      complexity,
      status: "Aktif",
      isFavorite: false
    });
    setActiveTab("library");
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generatedPrompt], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PROMPT-${productName.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("File prompt (.md) berhasil diunduh.", "success");
  };

  const handleQuickPreset = (presetType: "gojek" | "lms" | "saas" | "toko") => {
    if (presetType === "gojek") {
      setProductName("Aplikasi On-Demand Kurir & Pesan Makanan");
      setProductType("Web App Super App");
      setIndustry("On-Demand & Logistik");
      setTargetUsers("Pelanggan, Mitra Pengemudi, dan Merchant UMKM");
      setPrimaryProblem("Kebutuhan layanan pengantaran kilat, katalog kuliner terdekat, dan tarif jarak per KM transparan");
      setValueProposition("Pemesanan instan 1-klik, kalkulasi ongkos kirim realtime, dan dukungan dompet digital");
      setCustomFeatures("Peta pelacakan kurir, status pesanan realtime, kalkulator ongkir tarif dinamis per kilometer, voucher promo");
      setUiStyle("Gojek-inspired Modern UI (Hijau #00AA13, Putih, Hitam)");
      setComplexity("Kompleks");
    } else if (presetType === "lms") {
      setProductName("Platform LMS Sekolah & Ujian CBT Siswa");
      setProductType("Portal Pembelajaran & Evaluasi");
      setIndustry("Edukasi");
      setTargetUsers("Guru, Siswa, dan Pengawas Sekolah");
      setPrimaryProblem("Manajemen bank soal kurikulum merdeka dan sistem ujian online dengan koreksi nilai otomatis");
      setValueProposition("Memangkas waktu rekap nilai ujian dari hitungan hari menjadi instan hitungan detik");
      setCustomFeatures("Countdown timer ujian CBT, indikator nomor soal ragu-ragu/dijawab, rekap rapor nilai otomatis, ekspor ke PDF");
      setComplexity("Menengah");
    } else if (presetType === "saas") {
      setProductName("SaaS Dashboard HRIS & Penggajian Payroll");
      setProductType("SaaS B2B Multi-Tenant Dashboard");
      setIndustry("SaaS & Dashboard");
      setTargetUsers("HR Manager, Staf Finance, dan Karyawan");
      setPrimaryProblem("Pencatatan absensi karyawan, pengajuan cuti, dan perhitungan tarif pajak PPh 21 TER yang rumit");
      setValueProposition("Slip gaji digital otomatis bebas pusing regulasi pajak Indonesia");
      setCustomFeatures("Tabel karyawan lengkap filter divisi, kalkulator PPh 21 TER 2024, approval cuti berjenjang, grafik pengeluaran gaji");
      setComplexity("Enterprise");
    } else if (presetType === "toko") {
      setProductName("Toko Online UMKM & Pengrajin Nusantara");
      setProductType("E-Commerce Web Store");
      setIndustry("E-Commerce");
      setTargetUsers("Pembeli Online dan Penjual UMKM");
      setPrimaryProblem("Katalog produk lokal dan integrasi ekspedisi kurir Indonesia yang mudah dikelola penjual awam");
      setValueProposition("Bikin toko online siap jualan dengan integrasi QRIS instan");
      setCustomFeatures("Katalog filter kategori batik/kerajinan, simulasi kalkulasi ongkir JNE/J&T, modal pembayaran QRIS dinamis");
      setComplexity("Menengah");
    }
    showToast("Preset formulir berhasil dimuat!", "info");
  };

  return (
    <div className="space-y-6">
      {/* Quick Preset Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          <Wand2 className="h-4 w-4 text-[#00AA13]" />
          <span>Preset Kilat:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickPreset("gojek")}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#00AA13] hover:text-[#00AA13] transition-colors cursor-pointer"
          >
            🛵 On-Demand Gojek
          </button>
          <button
            onClick={() => handleQuickPreset("lms")}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#00AA13] hover:text-[#00AA13] transition-colors cursor-pointer"
          >
            🎓 LMS Sekolah CBT
          </button>
          <button
            onClick={() => handleQuickPreset("saas")}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#00AA13] hover:text-[#00AA13] transition-colors cursor-pointer"
          >
            📊 SaaS HR Payroll
          </button>
          <button
            onClick={() => handleQuickPreset("toko")}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-[#00AA13] hover:text-[#00AA13] transition-colors cursor-pointer"
          >
            🛍️ E-Commerce UMKM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Form Builder & Steps (7 Cols) */}
        <div className="xl:col-span-6 space-y-5">
          {/* Step Navigation Tabs */}
          <div className="flex bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                step === 1
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              1. Produk & Konsep
            </button>
            <button
              onClick={() => setStep(2)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                step === 2
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              2. Tech Stack & DB
            </button>
            <button
              onClick={() => setStep(3)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                step === 3
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              3. Fitur & Workflow
            </button>
            <button
              onClick={() => setStep(4)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                step === 4
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              4. UI/UX & Standar
            </button>
          </div>

          {/* Form Card */}
          <Card className="p-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <Layout className="h-5 w-5 text-[#00AA13]" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Langkah 1: Identitas Produk & Kebutuhan Solusi
                  </h3>
                </div>

                <Input
                  label="Nama Produk / Aplikasi Web"
                  placeholder="Contoh: LMS EduNusantara"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Tipe Produk"
                    placeholder="Contoh: Web App, SaaS, E-Commerce"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  />
                  <Select
                    label="Kategori / Industri"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as PromptCategory)}
                  >
                    <option value="Edukasi">Edukasi</option>
                    <option value="SaaS & Dashboard">SaaS & Dashboard</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="On-Demand & Logistik">On-Demand & Logistik</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="UMKM & Bisnis">UMKM & Bisnis</option>
                  </Select>
                </div>

                <Input
                  label="Target Pengguna"
                  placeholder="Contoh: Publik, Pelanggan, Karyawan, Guru & Siswa"
                  value={targetUsers}
                  onChange={(e) => setTargetUsers(e.target.value)}
                />

                <Textarea
                  label="Masalah Utama yang Diselesaikan"
                  placeholder="Deskripsikan masalah apa yang ingin diatasi secara tuntas..."
                  value={primaryProblem}
                  onChange={(e) => setPrimaryProblem(e.target.value)}
                  rows={3}
                />

                <Input
                  label="Proposisi Nilai Utama (Value Proposition)"
                  placeholder="Contoh: Lebih cepat buat prompt dan otomatisasi arsitektur web..."
                  value={valueProposition}
                  onChange={(e) => setValueProposition(e.target.value)}
                />

                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(2)}>
                    Lanjut ke Tech Stack &rarr;
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <Cpu className="h-5 w-5 text-[#00AA13]" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Langkah 2: Arsitektur Teknologi & Database
                  </h3>
                </div>

                <Input
                  label="Frontend Framework"
                  placeholder="Next.js (atau Vite + React SPA) + TypeScript"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="UI Framework"
                    value={uiFramework}
                    onChange={(e) => setUiFramework(e.target.value)}
                  />
                  <Input
                    label="Component Library"
                    value={componentLibrary}
                    onChange={(e) => setComponentLibrary(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Database & Backend"
                    value={database}
                    onChange={(e) => setDatabase(e.target.value)}
                  />
                  <Input
                    label="State Management"
                    value={stateManagement}
                    onChange={(e) => setStateManagement(e.target.value)}
                  />
                </div>

                {/* Vercel JSON Critical Config Switch */}
                <div className="p-3.5 rounded-xl border border-[#00AA13]/30 bg-[#00AA13]/5 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="vercelJsonToggle"
                    checked={includeVercelJson}
                    onChange={(e) => setIncludeVercelJson(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded accent-[#00AA13] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="vercelJsonToggle" className="text-xs font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer">
                      Sertakan Konfigurasi vercel.json SPA Rewrite (Wajib Sesuai Ketentuan)
                    </label>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Menambahkan instruksi pembuatan file vercel.json dengan rewrite /(.*) ke /index.html untuk mencegah error 404 saat refresh URL.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    &larr; Kembali
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Lanjut ke Fitur &rarr;
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <Code2 className="h-5 w-5 text-[#00AA13]" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Langkah 3: Fitur Utama & Alur Kerja Pengguna
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAuth}
                      onChange={(e) => setHasAuth(e.target.checked)}
                      className="accent-[#00AA13] h-4 w-4"
                    />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Modul Login & Profil
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasCrud}
                      onChange={(e) => setHasCrud(e.target.checked)}
                      className="accent-[#00AA13] h-4 w-4"
                    />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Full CRUD State Lengkap
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFiltering}
                      onChange={(e) => setHasFiltering(e.target.checked)}
                      className="accent-[#00AA13] h-4 w-4"
                    />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Pencarian & Multi-Filter
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAnalytics}
                      onChange={(e) => setHasAnalytics(e.target.checked)}
                      className="accent-[#00AA13] h-4 w-4"
                    />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      KPI & Grafik Analitik
                    </span>
                  </label>
                </div>

                <Textarea
                  label="Fitur Kustom Spesifik Produk"
                  placeholder="Tuliskan modul unik atau spesifik yang wajib ada..."
                  value={customFeatures}
                  onChange={(e) => setCustomFeatures(e.target.value)}
                  rows={4}
                />

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    &larr; Kembali
                  </Button>
                  <Button onClick={() => setStep(4)}>
                    Lanjut ke Standar UI/UX &rarr;
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <FileCheck className="h-5 w-5 text-[#00AA13]" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Langkah 4: Standar UI/UX & Aturan Kritis
                  </h3>
                </div>

                <Input
                  label="Gaya Desain Visual & Warna Utama"
                  value={uiStyle}
                  onChange={(e) => setUiStyle(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Tingkat Kompleksitas"
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value as ComplexityLevel)}
                  >
                    <option value="Pemula">Pemula (Simple Tool)</option>
                    <option value="Menengah">Menengah (Full Features)</option>
                    <option value="Kompleks">Kompleks (Multi-Role)</option>
                    <option value="Enterprise">Enterprise (Full SaaS)</option>
                  </Select>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasDarkMode}
                        onChange={(e) => setHasDarkMode(e.target.checked)}
                        className="accent-[#00AA13] h-4 w-4"
                      />
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        Wajib Dukungan Dark Mode
                      </span>
                    </label>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enforceAntiSlop}
                      onChange={(e) => setEnforceAntiSlop(e.target.checked)}
                      className="mt-1 accent-[#00AA13] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        Tegakkan Aturan Desain Anti-Slop
                      </span>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Menambahkan larangan gradien ungu klise, teks unreadable, dan mewajibkan hierarki tipografi serta kontras WCAG AA.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    &larr; Kembali
                  </Button>
                  <Button onClick={() => setStep(1)} variant="secondary">
                    Review dari Awal
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Live Output & Action Controls (5 Cols) */}
        <div className="xl:col-span-6 space-y-4">
          <Card className="flex flex-col h-full overflow-hidden border-2 border-[#00AA13]/30">
            {/* Output Header */}
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/70 dark:bg-neutral-900/70">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#00AA13]" />
                <span className="text-xs font-extrabold uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
                  Hasil Prompt Tergenerate
                </span>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-2">
                <Badge variant="gojek">
                  ~{tokenEstimate.toLocaleString()} Token
                </Badge>
                <Badge variant="secondary">
                  {wordCount} Kata
                </Badge>
              </div>
            </div>

            {/* Prompt Code Container */}
            <div className="p-4 flex-1 bg-neutral-950 text-neutral-100 font-mono text-xs overflow-y-auto max-h-[520px] custom-scrollbar selection:bg-[#00AA13] selection:text-white">
              <pre className="whitespace-pre-wrap leading-relaxed font-mono">
                {generatedPrompt}
              </pre>
            </div>

            {/* Actions Toolbar */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCopyPrompt}
                  className="font-bold shadow-md shadow-[#00AA13]/20"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Tersalin!" : "Salin Prompt"}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSaveToLibrary}
                  className="font-semibold"
                >
                  <Save className="h-4 w-4 text-[#00AA13]" />
                  <span>Simpan ke Koleksi</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadMarkdown}
                  title="Unduh File Markdown"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">.md</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
