import { PromptTemplate } from "../types/prompt";

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "tpl-gojek",
    name: "Aplikasi On-Demand & Ekosistem Layanan (Ala Gojek)",
    description: "Template prompt arsitektur aplikasi multi-layanan: pemesanan makanan, pengantaran barang, kalkulasi tarif jarak, dan dompet digital.",
    category: "On-Demand & Logistik",
    recommendedStack: {
      framework: "Vite + React 18+ SPA",
      uiFramework: "TailwindCSS (Warna Hijau Gojek #00AA13)",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore & Authentication)",
      stateManagement: "Zustand / React Context",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    popularRank: 1,
    tags: ["On-Demand", "Food Delivery", "Gojek Style", "Realtime"],
    samplePrompt: `Anda adalah Principal Full-Stack Architect. Buat aplikasi web On-Demand Service dengan gaya visual Gojek modern:
1. Arsitektur Layout: Header pencarian dinamis, grid kategori layanan (Antar, Makanan, Kirim Dokumen, Belanja).
2. Modul Resto & Menu: Filter kategori, keranjang belanja dinamis, kalkulator estimasi waktu tempuh & ongkir per kilometer.
3. Desain: Nuansa Hijau Gojek (#00AA13), sudut kartu melengkung rapi (rounded-xl), dark mode toggle yang konsisten.
4. Deployment: Sediakan file vercel.json dengan konfigurasi routing SPA agar tidak 404 saat refresh.`
  },
  {
    id: "tpl-lms",
    name: "LMS Edukasi & Portal Ujian Sekolah Indonesia",
    description: "Template prompt sistem pembelajaran daring: materi video/modul, penugasan, bank soal pilihan ganda, dan ujian CBT acak nomor.",
    category: "Edukasi",
    recommendedStack: {
      framework: "Next.js 14 App Router / Vite React",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase Firestore",
      stateManagement: "React Context",
      deployment: "Vercel (vercel.json)"
    },
    popularRank: 2,
    tags: ["Sekolah", "CBT", "Kurikulum Merdeka", "E-Learning"],
    samplePrompt: `Anda adalah Senior Edutech Developer. Buat sistem portal pembelajaran LMS dan ujian berbasis komputer (CBT):
- Role: Siswa dan Guru / Pengawas.
- Fitur CBT: Countdown timer interaktif, panel nomor soal dengan indikator status (sudah dijawab/ragu-ragu/belum), auto-save jawaban ke state/database.
- Dashboard Guru: Input bank soal, rekapitulasi nilai otomatis, ekspor daftar nilai ke format tabel.
- UI: Bersih, tipografi jelas (Plus Jakarta Sans), mode kontras tinggi untuk kenyamanan membaca siswa.`
  },
  {
    id: "tpl-saas",
    name: "SaaS Dashboard B2B & Analytics Platform",
    description: "Template prompt aplikasi dashboard analitik metrik bisnis: KPI cards, filter rentang tanggal, grafik interaktif, dan tabel manajemen data.",
    category: "SaaS & Dashboard",
    recommendedStack: {
      framework: "Vite + React SPA + TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore & Auth)",
      stateManagement: "Zustand",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    popularRank: 3,
    tags: ["Dashboard", "KPI", "Analytics", "SaaS B2B"],
    samplePrompt: `Buat aplikasi web SaaS Dashboard modern dengan spesifikasi:
- Layout: Sidebar dapat di-collapse, Topbar dengan pencarian global, notifikasi, dan profil user.
- KPI Metrik: 4 kartu metrik utama dengan persentase pertumbuhan (+/- %).
- Grafik: Visualisasi data bar chart, line chart tren, dan donut chart distribusi status.
- Tabel CRUD: Pencarian instan, filter multi-kategori, sorting kolom, pagination, dan tombol aksi view/edit/delete.`
  },
  {
    id: "tpl-ecommerce",
    name: "E-Commerce Toko Online & UMKM Nusantara",
    description: "Template toko online produk lokal Indonesia: katalog barang, checkout pengiriman ekspedisi, simulasi QRIS, dan invoice.",
    category: "E-Commerce",
    recommendedStack: {
      framework: "Vite + React 18+ TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase Firestore",
      stateManagement: "React Context + localStorage",
      deployment: "Vercel (vercel.json)"
    },
    popularRank: 4,
    tags: ["Toko Online", "QRIS", "UMKM", "Checkout"],
    samplePrompt: `Rancang aplikasi web toko online e-commerce untuk UMKM Indonesia:
- Fitur Pembeli: Katalog produk dengan badge diskon/stok, modal detail produk, keranjang belanja mengambang, checkout pengiriman ekspedisi lokal.
- Pembayaran: Pilihan QRIS otomatis generate dummy QR, Virtual Account Bank (BCA, Mandiri, BRI).
- Dashboard Pemilik: Tambah produk baru, ubah status pesanan (Menunggu Pembayaran -> Diproses -> Dikirim -> Selesai).`
  },
  {
    id: "tpl-fintech",
    name: "Sistem Keuangan & Arus Kas Bisnis (Kasir POS)",
    description: "Template prompt aplikasi point of sale (POS) kasir dan pencatatan arus kas masuk/keluar harian dengan kalkulasi laba rugi.",
    category: "Fintech",
    recommendedStack: {
      framework: "Vite + React SPA + TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase Firestore",
      stateManagement: "Zustand",
      deployment: "Vercel (vercel.json)"
    },
    popularRank: 5,
    tags: ["POS Kasir", "Arus Kas", "Laba Rugi", "Keuangan"],
    samplePrompt: `Bangun aplikasi web Kasir POS & Arus Kas Keuangan Bisnis:
- Layar Kasir: Pilih item menu/produk dengan satu klik, kalkulator kembalian instan, cetak struk nota belanja.
- Pencatatan Beban: Form pengeluaran operasional (sewa, listrik, bahan baku, gaji).
- Laporan Laba Rugi: Ringkasan pendapatan kotor, beban, dan laba bersih per periode.`
  }
];
