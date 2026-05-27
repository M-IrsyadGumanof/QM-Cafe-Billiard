# 🎱 Sistem Manajemen Booking dan Pemesanan QM Biliard & Cafe

![Laravel](https://img.shields.io/badge/Laravel-11.x-red?logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.2+-blue?logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)
![License](https://img.shields.io/badge/License-Academic-green)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

Sistem informasi manajemen berbasis web untuk **QM Biliard & Cafe** — mencakup pemesanan makanan & minuman via QR Code, booking meja billiard secara online, manajemen stok & menu, kasir digital, serta laporan pendapatan otomatis.

---

## 📋 Deskripsi Proyek

**QM Biliard & Cafe** adalah usaha hiburan dan kuliner yang berlokasi dalam satu gedung dua lantai:
- **Lantai 1** → Area Cafe (buka 09.00–23.00, Sabtu hingga 00.00)
- **Lantai 2** → Area Billiard dengan 5 meja (buka 12.00–03.00)

Saat ini operasional masih dilakukan secara **manual**, yang menyebabkan:
- Kesalahan pencatatan transaksi
- Kesulitan monitoring penggunaan meja billiard
- Keterbatasan dalam pembuatan laporan penjualan

Proyek ini hadir sebagai solusi digital yang **efisien, akurat, dan mudah digunakan** untuk meningkatkan kualitas pengelolaan usaha.

> Proyek ini mendukung **SDG 8** (Decent Work and Economic Growth) dan **SDG 9** (Industry, Innovation and Infrastructure).

---

## ✨ Fitur Utama

- 🔐 **Autentikasi** — Login & Registrasi pengguna dengan validasi
- 🏠 **Homepage** — Profil, lokasi, kontak, dan informasi umum QM Biliard & Cafe
- 🍔 **Pemesanan via QR Code** — Pelanggan scan QR di meja untuk memesan makanan & minuman
- 🎱 **Booking Meja Billiard** — Reservasi online dengan pilihan tanggal, waktu, dan jumlah meja
- ⏱️ **Timer & Perhitungan Biaya Otomatis** — Durasi bermain tercatat dan biaya dihitung otomatis
- 🍽️ **Manajemen Menu & Stok** — Admin kelola menu dan pantau ketersediaan stok
- 💳 **Kasir Digital** — Proses pembayaran QRIS / Cash
- 📊 **Statistik & Laporan** — Laporan pendapatan harian, bulanan, dan riwayat transaksi
- 🖨️ **Cetak Laporan** — Generate dan cetak laporan mingguan/bulanan
- 🖼️ **Galeri Foto** — Showcase foto tempat untuk menarik calon pelanggan
- 💬 **Testimoni Pelanggan** — Ulasan dari pelanggan yang telah berkunjung
- ❓ **FAQ** — Pertanyaan umum seputar layanan, harga, dan cara reservasi
- 🛡️ **Panel Admin** — Dashboard admin untuk kelola seluruh data sistem

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Backend Framework | Laravel 13.x |
| Bahasa | PHP 8.4+ |
| Database | MySQL 8.0 |
| Frontend | React + Tailwind |
| Package Manager | Composer |
| Version Control | Git & GitHub |
| CI/CD | GitHub Actions |
| Deployment | VPS + Domain Resmi |

---

## ⚡ Instalasi Singkat

```bash
# Clone repository
git clone https://github.com/[username]/qm-biliard-cafe.git
cd qm-biliard-cafe

# Install dependency
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate
php artisan db:seed

# Jalankan aplikasi
php artisan serve
```

> 📖 Lihat panduan lengkap di [docs/installation.md](docs/installation.md)

---

## 📸 Screenshot

> _Screenshot akan ditambahkan setelah implementasi UI selesai._

| Halaman | Preview |
|---------|---------|
| Login | _Coming Soon_ |
| Dashboard Admin | _Coming Soon_ |
| Pemesanan via QR | _Coming Soon_ |
| Booking Billiard | _Coming Soon_ |
| Laporan | _Coming Soon_ |

---

## 📁 Struktur Dokumentasi

```
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

## 👥 Tim Pengembang — Kelompok 2

| Nama | NIM | Peran |
|------|-----|-------|
| Muhammad Irsyad Gumanof | 2411082031 | Project Manager |
| M. Galang Pratama | 2411081032 | System Analyst |
| Suhafdal Zikri | 2411083018 | Lead Programmer |
| Muhammad Ihqfal | 2411083013 | Lead Programmer 2 |
| Febriansyah Putra | 2411081030 | Quality Assurance |

---

## 📅 Milestone Proyek

| Milestone | Waktu | Target |
|-----------|-------|--------|
| Milestone 1 | Minggu 4 | Project Charter & SRS |
| Milestone 2 | Minggu 8 (UTS) | Desain Sistem & Prototype |
| Milestone 3 | Minggu 13 | Rilis Versi Beta (Online) |
| Milestone 4 | Minggu 16 (UAS) | Demo Day & Laporan Akhir |

---

## 📄 Lisensi

Proyek ini dikembangkan untuk keperluan akademik sebagai bagian dari Program Based Learning (PBL) Politeknik Negeri Padang.
