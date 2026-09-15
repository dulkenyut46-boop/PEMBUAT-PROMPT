import { PromptItem } from "../types/prompt";

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: "prm-001",
    title: "Web Platform LMS Sekolah Digital & Ujian CBT Indonesia",
    description: "Prompt arsitektur lengkap LMS untuk kurikulum merdeka dengan modul bank soal, ujian CBT realtime, nilai otomatis, dan rapor siswa.",
    category: "Edukasi",
    tags: ["LMS", "Kurikulum Merdeka", "CBT", "Next.js", "Firebase"],
    techStack: {
      framework: "Next.js 14 (App Router) + TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore & Firebase Auth)",
      stateManagement: "Zustand",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    fullPromptContent: `### SPESIFIKASI PROMPT PENGEMBANGAN APLIKASI WEB
**Nama Produk:** LMS EduNusantara - Portal Belajar & Ujian CBT
**Industri:** Edukasi Indonesia (Sekolah Menengah & Kejuruan)
**Bahasa & Mata Uang:** Bahasa Indonesia / IDR

#### 1. ARSITEKTUR & TECH STACK
- Frontend: Next.js 14 App Router, TypeScript, React 18+
- Styling: TailwindCSS (Modern clean Gojek-green accent #00AA13)
- Komponen: shadcn/ui (Button, Card, Dialog, Table, Badge, Tabs)
- Backend & DB: Firebase Firestore & Authentication
- State Management: Zustand untuk sesi ujian & timer
- Deployment: Vercel dengan config vercel.json SPA rewrite

#### 2. FITUR UTAMA & WORKFLOW
1. **Modul Autentikasi**: Login multi-role (Guru, Siswa, Admin Sekolah).
2. **Bank Soal & Ujian CBT**: Pembuat soal pilihan ganda & esai, countdown timer anti-curang (deteksi pindah tab), auto-submit.
3. **Penilaian Otomatis & Rapor**: Kalkulasi skor instan, ekspor PDF rapor hasil belajar siswa.
4. **Dashboard Guru & Siswa**: Grafik performa nilai siswa (Bar Chart), ringkasan kehadiran.

#### 3. ATURAN UI/UX & KODE
- Skema warna: Dominan putih/abu-abu netral (#F8FAFC) dengan aksen hijau #00AA13.
- Dark mode toggle berfungsi penuh tanpa flicker.
- Semua tombol dan interaksi CRUD (buat soal, edit jadwal, hapus ujian) wajib memiliki event handler aktif.
- Jangan gunakan mock kosong atau UI tanpa logika.`,
    status: "Aktif",
    isFavorite: true,
    copyCount: 428,
    viewCount: 1250,
    complexity: "Kompleks",
    tokenEstimate: 1850,
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-09-02T14:30:00.000Z",
    createdBy: "Budi Santoso",
    authorRole: "Lead Education Architect"
  },
  {
    id: "prm-002",
    title: "Aplikasi On-Demand Kurir Logistik & Pemesanan Makanan Lokal",
    description: "Prompt spesifikasi sistem on-demand ala Gojek lokal: pelacakan kurir realtime, katalog resto UMKM, kalkulasi ongkir per KM, dan dompet digital.",
    category: "On-Demand & Logistik",
    tags: ["On-Demand", "Gojek Style", "Logistik", "Peta", "React"],
    techStack: {
      framework: "Vite + React 18+ TypeScript SPA",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore & Firebase Auth)",
      stateManagement: "React Context + localStorage",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    fullPromptContent: `### SPESIFIKASI TEKNIK WEB ON-DEMAND LOGISTIK & FOOD
**Produk:** AntarKilat - Platform Ekosistem Layanan Lokal
**Gaya Desain:** Gojek-inspired Modern UI (Hijau #00AA13, Putih, Hitam)

#### 1. SPESIFIKASI TEKNOLOGI
- Stack: Vite + React 19, TypeScript, TailwindCSS v4
- Library UI: shadcn/ui custom styled with Gojek Green
- Database: Firebase Firestore dengan koleksi orders, drivers, merchants
- Konfigurasi Vercel: vercel.json rewrites: [{"source": "/(.*)", "destination": "/index.html"}]

#### 2. MODUL UTAMA
- **Order Tracking Grid**: Status pesanan live (Mencari Kurir, Menuju Resto, Mengantar, Selesai).
- **Katalog Merchant UMKM**: Filter kategori kuliner, pencarian menu, add-to-cart dengan modal catatan khusus.
- **Kalkulator Ongkir Dinamis**: Hitung jarak estimasi tarif per KM dalam Rupiah (IDR).
- **CRUD Manajemen Menu**: Merchant dapat menambah, menyunting harga, dan menonaktifkan menu habis.

#### 3. STANDAR DESAIN ANTI-SLOP
- Tidak menggunakan gradien ungu murahan atau drop-shadow berlebihan.
- Sudut radius kartu seragam (rounded-xl 12px), spasi konsisten Tailwind.
- Support Dark Mode penuh dengan adaptasi warna kartu kontras tinggi.`,
    status: "Aktif",
    isFavorite: true,
    copyCount: 382,
    viewCount: 994,
    complexity: "Kompleks",
    tokenEstimate: 2100,
    createdAt: "2026-08-15T11:20:00.000Z",
    updatedAt: "2026-09-10T16:15:00.000Z",
    createdBy: "Siti Rahmawati",
    authorRole: "Senior Product Designer"
  },
  {
    id: "prm-003",
    title: "SaaS Dashboard HRIS & Penggajian Karyawan (Payroll Indonesia PPh 21)",
    description: "Prompt komprehensif sistem manajemen SDM: absensi geolokasi, cuti, klaim reimbursement, dan slip gaji otomatis perhitungan tarif PPh 21 TER.",
    category: "SaaS & Dashboard",
    tags: ["HRIS", "Payroll", "PPh 21", "Dashboard", "TailwindCSS"],
    techStack: {
      framework: "Next.js (Vite + React SPA) + TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore & Auth)",
      stateManagement: "Zustand",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    fullPromptContent: `### PROMPT ARSITEKTUR LENGKAP: SAAS HRIS & PAYROLL NUSANTARA
**Tujuan:** Membangun aplikasi web dashboard manajemen karyawan dan penggajian sesuai regulasi perpajakan Indonesia (PPh 21 TER 2024).

#### TEKNOLOGI & ARSITEKTUR
- Framework: Vite + React SPA TypeScript
- Komponen: shadcn/ui Table, DropdownMenu, Sheet, Dialog, Tabs, KPI Cards
- Styling: TailwindCSS (Nuansa Hijau Gojek #00AA13 + Slate Dark Mode)
- Charting: Donut chart distribusi divisi, Bar chart biaya penggajian bulanan

#### FITUR UTAMA
1. **Data Karyawan (Full CRUD)**: Tabel karyawan dengan filter departemen, pagination, pencarian nama/NIK, export data.
2. **Kalkulator Slip Gaji**: Gaji pokok, tunjangan, BPJS Ketenagakerjaan (JKK, JKM, JHT, JP), BPJS Kesehatan, potongan PPh 21 tarif efektif rata-rata (TER).
3. **Pengajuan Cuti & Izin**: Workflow persetujuan manajer (Approved/Pending/Rejected).
4. **Analitik Metrik HR**: Rata-rata retensi, total pengeluaran gaji (IDR), kehadiran tim.`,
    status: "Aktif",
    isFavorite: false,
    copyCount: 265,
    viewCount: 740,
    complexity: "Enterprise",
    tokenEstimate: 2450,
    createdAt: "2026-08-20T08:30:00.000Z",
    updatedAt: "2026-09-08T10:00:00.000Z",
    createdBy: "Budi Santoso",
    authorRole: "Lead Education Architect"
  },
  {
    id: "prm-004",
    title: "Marketplace Multi-Vendor Pengrajin UMKM Nusantara",
    description: "Prompt pembuatan platform belanja kerajinan lokal Indonesia dengan integrasi ongkir JNE/J&T, pembayaran QRIS, dan dashboard toko pengrajin.",
    category: "E-Commerce",
    tags: ["E-Commerce", "UMKM", "QRIS", "Marketplace", "Indonesia"],
    techStack: {
      framework: "Vite + React 18+ TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase Firestore",
      stateManagement: "React Context",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    fullPromptContent: `### PROMPT PENGEMBANGAN MARKETPLACE UMKM KERAJINAN LOKAL
**Nama Aplikasi:** KriyaNusantara Web Platform
**Pasar:** Indonesia (Mendukung transaksi Rupiah & pembayaran QRIS)

#### ARSITEKTUR SISTEM
- Layout: Header dengan pencarian cerdas, kategori batik/anyaman/ukir, keranjang belanja interaktif.
- Sidebar Vendor Dashboard: Kelola stok, pesanan masuk, cetak label pengiriman, ringkasan saldo.
- Stack: React 19, TailwindCSS, shadcn/ui, Firebase Firestore.

#### ALUR TRANSAKSI LENGKAP
1. Buyer memilih produk -> Masuk keranjang -> Checkout pilih alamat provinsi/kota.
2. Simulasi pemilihan kurir (JNE Reguler, J&T Express, SiCepat) dengan kalkulasi ongkir.
3. Pembayaran simulasi QRIS & Virtual Account Bank Mandiri/BCA/BRI.
4. Notifikasi status pesanan berhasil & riwayat pembelian.`,
    status: "Aktif",
    isFavorite: true,
    copyCount: 310,
    viewCount: 880,
    complexity: "Menengah",
    tokenEstimate: 1680,
    createdAt: "2026-08-25T14:15:00.000Z",
    updatedAt: "2026-09-12T11:45:00.000Z",
    createdBy: "Dewi Lestari",
    authorRole: "E-Commerce Consultant"
  },
  {
    id: "prm-005",
    title: "Aplikasi Pencatatan Keuangan Pribadi & UMKM Kas Digital",
    description: "Prompt sistem akuntansi sederhana: buku kas kasir, arus kas masuk/keluar, scan nota pengeluaran, cetak laporan laba rugi bulanan.",
    category: "Fintech",
    tags: ["Fintech", "Buku Kas", "Laba Rugi", "Kasir", "Excel Export"],
    techStack: {
      framework: "React 18+ SPA Vite TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase (Firestore)",
      stateManagement: "Zustand",
      deployment: "Vercel SPA rewrite (vercel.json)"
    },
    fullPromptContent: `### SPESIFIKASI PROMPT: APLIKASI BUKU KAS DIGITAL UMKM
**Tujuan:** Membantu pemilik warung & usaha mikro mencatat transaksi harian tanpa kerumitan software akuntansi tradisional.

#### FITUR & INTERAKSI
- **Catat Transaksi Cepat**: Modal popup input kas masuk/keluar dengan pilihan kategori (Penjualan, Bahan Baku, Sewa, Gaji).
- **Laporan Laba/Rugi Otomatis**: Menghitung omset bersih, margin kotor, dan proyeksi kas bulan berjalan.
- **Export Data**: Ekspor rekap transaksi ke format CSV / Excel dan print siap cetak.
- **Visualisasi Arus Kas**: Line chart tren pengeluaran harian dan Donut chart alokasi biaya terbesar.`,
    status: "Aktif",
    isFavorite: false,
    copyCount: 195,
    viewCount: 520,
    complexity: "Menengah",
    tokenEstimate: 1420,
    createdAt: "2026-09-01T07:45:00.000Z",
    updatedAt: "2026-09-14T09:20:00.000Z",
    createdBy: "Budi Santoso",
    authorRole: "Lead Education Architect"
  },
  {
    id: "prm-006",
    title: "Sistem Manajemen Rekam Medis & Antrean Klinik Pratama",
    description: "Prompt web sistem klinik terpadu: antrean online nomor loket, rekam medis elektronik (RME), stok obat apotek, dan rujukan BPJS.",
    category: "Kesehatan",
    tags: ["Klinik", "Rekam Medis", "Antrean", "BPJS", "Apotek"],
    techStack: {
      framework: "Vite + React SPA + TypeScript",
      uiFramework: "TailwindCSS",
      componentLibrary: "shadcn/ui",
      database: "Firebase Firestore",
      stateManagement: "React Context",
      deployment: "Vercel (vercel.json)"
    },
    fullPromptContent: `### PROMPT ARSITEKTUR WEB: KLINIK SEHAT NUSANTARA
**Standar:** Sesuai panduan Rekam Medis Elektronik (RME) Kemenkes RI.

#### MODUL KLINIS & OPERASIONAL
1. **Layar Antrean Loket Pasien**: Display nomor antrean poli umum, poli gigi, dan apotek dengan audio bell simulator.
2. **Pencatatan RME**: Riwayat anamnesis dokter, diagnosa kode ICD-10, resep obat digital langsung ke loket farmasi.
3. **Inventori Obat & Kadaluarsa**: Peringatan stok menipis dan tanggal kadaluarsa obat di apotek klinik.
4. **Validasi & Hak Akses**: Role Dokter, Perawat, Petugas Pendaftaran, Kasir, dan Administrator.`,
    status: "Draft",
    isFavorite: false,
    copyCount: 78,
    viewCount: 290,
    complexity: "Kompleks",
    tokenEstimate: 2150,
    createdAt: "2026-09-05T13:00:00.000Z",
    updatedAt: "2026-09-13T16:00:00.000Z",
    createdBy: "dr. Hendra Kurniawan",
    authorRole: "HealthTech Specialist"
  }
];

export const PROMPT_CATEGORIES = [
  "Semua Kategori",
  "Edukasi",
  "SaaS & Dashboard",
  "E-Commerce",
  "On-Demand & Logistik",
  "Fintech",
  "Kesehatan",
  "UMKM & Bisnis"
];
