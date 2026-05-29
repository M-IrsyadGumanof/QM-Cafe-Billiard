# Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard

![Laravel](https://img.shields.io/badge/Laravel-13.8+-FF2D20?logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=black)
![Status](https://img.shields.io/badge/Status-Dalam%20Pengembangan-F2C94C)

Sistem informasi berbasis web untuk mendukung kegiatan operasional **QM Cafe & Billiard**, meliputi penyajian informasi usaha, pemesanan makanan dan minuman, reservasi meja billiard, verifikasi pembayaran, pemrosesan pesanan, pengelolaan ketersediaan meja, serta laporan bagi pemilik usaha.

> **Status implementasi:** repository telah memuat fondasi aplikasi Laravel, Inertia, React, autentikasi dasar, dashboard, dan pengelolaan profil pengguna. Fitur bisnis QM Cafe & Billiard masih dikembangkan secara bertahap.

---

## Deskripsi Proyek

QM Cafe & Billiard merupakan usaha kuliner dan hiburan yang membutuhkan pengelolaan layanan secara lebih terstruktur. Proses manual berpotensi menimbulkan kendala dalam pencatatan pesanan, penjadwalan meja billiard, verifikasi pembayaran, pemantauan status layanan, dan penyusunan laporan.

Proyek ini bertujuan membangun aplikasi yang:

- memudahkan pelanggan melihat informasi layanan, menu, dan ketersediaan meja;
- memungkinkan pelanggan terdaftar melakukan pemesanan dan reservasi;
- membantu staf memproses layanan sesuai tugas masing-masing;
- menyediakan data transaksi dan statistik bagi owner.

---

## Aktor Sistem

| Aktor | Tanggung Jawab Utama |
|---|---|
| Pengunjung | Melihat homepage, informasi cafe, galeri, FAQ, testimoni, daftar menu, dan ketersediaan meja tanpa login. |
| Customer | Login, melakukan pemesanan makanan/minuman, membuat reservasi billiard, mengunggah bukti pembayaran jika diperlukan, dan melihat status layanan. |
| Admin/Cashier | Mengelola transaksi, memverifikasi pembayaran transfer/QRIS secara manual, mengelola menu/stok, data utama, serta membantu proses kasir. |
| Kitchen Staff | Melihat dan memperbarui status pesanan makanan/minuman yang perlu disiapkan. |
| Billiard Staff | Mengelola sesi billiard dan melakukan **Update Table Availability/Schedule**. |
| Owner | Login untuk melihat laporan dan statistik usaha. |

---

## Fitur Sistem

### Fitur publik

| Fitur | Status |
|---|---|
| Homepage dan informasi cafe | Direncanakan |
| Galeri, FAQ, dan testimoni | Direncanakan |
| Melihat daftar menu | Direncanakan |
| Melihat ketersediaan meja billiard | Direncanakan |

### Fitur customer

| Fitur | Status |
|---|---|
| Login, registrasi, verifikasi email, reset password, dan profil | Fondasi autentikasi tersedia |
| Pemesanan makanan/minuman setelah login | Direncanakan |
| Reservasi billiard Paket Regular | Direncanakan |
| Reservasi billiard Paket Personal | Direncanakan |
| Upload bukti pembayaran dan pemantauan status | Direncanakan |

### Fitur operasional dan manajerial

| Fitur | Status |
|---|---|
| Dashboard dasar setelah login | Fondasi tersedia |
| Pengelolaan menu dan stok oleh Admin/Cashier | Direncanakan |
| Verifikasi pembayaran transfer/QRIS oleh Admin/Cashier | Direncanakan |
| Pemrosesan pesanan oleh Kitchen Staff | Direncanakan |
| Update Table Availability/Schedule oleh Billiard Staff/Admin | Direncanakan |
| Laporan dan statistik untuk Owner | Direncanakan |

---

## Aturan Bisnis Utama

1. Pengunjung tanpa login hanya dapat melihat informasi publik, menu, dan ketersediaan meja.
2. Customer wajib login sebelum membuat pesanan makanan/minuman atau reservasi billiard.
3. **Paket Regular** memiliki durasi yang sudah ditentukan, misalnya 1, 2, atau 3 jam, serta dibayar di awal. Booking aktif setelah pembayaran diverifikasi.
4. **Paket Personal** memungkinkan customer bermain terlebih dahulu dan melakukan pembayaran setelah sesi selesai berdasarkan durasi aktual.
5. Pembayaran melalui transfer atau QRIS diverifikasi secara manual oleh Admin/Cashier melalui halaman khusus bukti pembayaran.
6. Owner memiliki akun tersendiri untuk mengakses laporan dan statistik.

---

## Teknologi yang Digunakan

Teknologi berikut mengacu pada konfigurasi repository pada branch `main`.

| Komponen | Teknologi / Versi |
|---|---|
| Backend Framework | Laravel `^13.8` |
| Bahasa Backend | PHP `^8.3` |
| Integrasi Server–Frontend | Inertia Laravel `^2.0` |
| Frontend | React `^18.2.0` |
| UI Styling | Tailwind CSS `^3.4.19` |
| Build Tool | Vite `^8.0.0` |
| Autentikasi Awal | Laravel Breeze `^2.4` |
| Testing | PHPUnit `^12.5.12` |
| Code Style | Laravel Pint `^1.27` |
| Database Default Development | SQLite pada `.env.example` |
| Version Control | Git dan GitHub |

---

## Instalasi Singkat

### 1. Clone repository

```bash
git clone https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard.git
cd QM-Cafe-Billiard
```

### 2. Install dependency dan siapkan aplikasi

```bash
composer install
npm install
```

Salin file environment:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

Jalankan perintah berikut:

```bash
php artisan key:generate
```

### 3. Siapkan database SQLite default

```bash
# Windows PowerShell
New-Item database/database.sqlite -ItemType File -Force

# Linux / macOS
touch database/database.sqlite

php artisan migrate
```

### 4. Jalankan aplikasi

```bash
composer run dev
```

Panduan instalasi lengkap, termasuk penggunaan MySQL dan troubleshooting, tersedia pada [`docs/installation.md`](docs/installation.md).

---

## Dokumentasi Proyek

| Dokumen | Keterangan |
|---|---|
| [`docs/installation.md`](docs/installation.md) | Panduan instalasi dan troubleshooting. |
| [`docs/features.md`](docs/features.md) | Dokumentasi fitur aktual dan fitur yang direncanakan. |
| [`docs/dependency.md`](docs/dependency.md) | Daftar dependency terpasang serta dependency rencana. |
| [`docs/refactoring.md`](docs/refactoring.md) | Template dan riwayat refactoring saat final. |
| [`docs/github-actions.md`](docs/github-actions.md) | Rencana dan bukti implementasi GitHub Actions/CI. |
| [`CHANGELOG.md`](CHANGELOG.md) | Catatan perubahan proyek secara berkala. |

---

## Screenshot

Screenshot aktual akan ditambahkan setelah halaman bisnis diimplementasikan dan siap diuji.

| Halaman | Status Bukti Screenshot |
|---|---|
| Login / Registrasi | Perlu ditambahkan |
| Dashboard | Perlu ditambahkan |
| Pemesanan Menu | Menunggu implementasi |
| Reservasi Billiard | Menunggu implementasi |
| Verifikasi Pembayaran | Menunggu implementasi |
| Laporan Owner | Menunggu implementasi |

---

## Struktur Dokumentasi

```text
QM-Cafe-Billiard/
├── README.md
├── CHANGELOG.md
└── docs/
    ├── installation.md
    ├── features.md
    ├── dependency.md
    ├── refactoring.md
    └── github-actions.md
```

---

## Tim Pengembang — Kelompok 2 TRPL 2C

| Nama | NIM | Peran |
|---|---:|---|
| Muhammad Irsyad Gumanof | 2411082031 | Project Manager |
| M. Galang Pratama | 2411081032 | System Analyst |
| Suhafdal Zikri | 2411083018 | Lead Programmer |
| Muhammad Ihqfal | 2411083013 | AI Specialist |
| Febriansyah Putra | 2411081030 | Quality Assurance |

---

## Status Akademik

Proyek ini dikembangkan untuk keperluan Project-Based Learning pada mata kuliah **Konstruksi dan Evolusi Perangkat Lunak**, Program Studi D4 Teknologi Rekayasa Perangkat Lunak, Jurusan Teknologi Informasi, Politeknik Negeri Padang.
