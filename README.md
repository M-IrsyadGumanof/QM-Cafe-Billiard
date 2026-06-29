# QM Cafe & Billiard

![CI Status](https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard/actions/workflows/ci.yml/badge.svg)

QM Cafe & Billiard adalah platform berbasis web terintegrasi yang dirancang untuk mengelola operasional kafe dan penyewaan meja billiard secara efisien. Proyek ini dibangun menggunakan **Laravel 13**, **Inertia.js**, **React**, dan **Tailwind CSS**. Sistem ini mendukung multi-role, verifikasi pembayaran manual, pelaporan pendapatan bagi owner, serta pelacakan durasi bermain billiard secara real-time.

---

## 🛠️ Stack Teknologi

- **Backend:** Laravel ^13.8 (PHP ^8.3/8.4)
- **Frontend:** React ^18.2, Inertia.js ^2.0, Tailwind CSS ^3.4
- **Real-Time Engine:** Laravel Reverb (WebSockets) & HTML5 Audio Alarms
- **Build Tool:** Vite ^8.0
- **Database:** SQLite (Default / Testing) atau MySQL (Production)
- **Code Styling & Testing:** Laravel Pint, PHPUnit ^12.5

---

## 👥 Akun Demo Terintegrasi

Sistem ini memiliki seeder yang otomatis membuat data uji untuk berbagai peran (role) pengguna berikut:

| Peran (Role) | Email Pengguna | Kata Sandi (Password) | Deskripsi Akses |
| :--- | :--- | :--- | :--- |
| **Admin/Cashier** | `admin@qmcafe.com` | `Admin@12345` | Kelola master data, verifikasi transaksi pembayaran, reset password staff. |
| **Customer** | `customer@qmcafe.com` | `Customer@12345` | Pesan menu cafe, reservasi meja billiard, unggah bukti bayar. |
| **Kitchen Staff** | `kitchen@qmcafe.com` | `Kitchen@12345` | Dasbor antrean dapur, perbarui status pesanan makanan & minuman. |
| **Billiard Staff** | `billiard@qmcafe.com` | `Billiard@12345` | Kelola sesi bermain, status meja, dan penambahan paket billing personal. |
| **Owner** | `owner@qmcafe.com` | `Owner@12345` | Dasbor analitik pendapatan kafe dan billiard serta laporan ringkas. |

---

## 🌟 Fitur Utama yang Telah Diimplementasikan

Sistem telah menyelesaikan seluruh fase pengembangan MVP:
- **[x] Public Website:** Landing page interaktif, menu, detail menu, ketersediaan meja, paket billiard, galeri, testimoni, dan FAQ.
- **[x] Autentikasi Breeze & Profil:** Login, register, forgot password, profil pengguna (nomor telepon, alamat, avatar kustom), serta pemblokiran staf tidak aktif.
- **[x] Portal Pelanggan (Customer):** Pemesanan menu makanan dengan keranjang belanja, modul check-out, reservasi meja billiard (Paket Regular & Personal), riwayat pesanan, dan fitur unggah bukti pembayaran.
- **[x] Verifikasi Pembayaran Admin:** Dasbor peninjauan bukti transfer/QRIS, serta aksi konfirmasi atau penolakan transaksi.
- **[x] Manajemen Dapur (Kitchen):** Antrean realtime pesanan masuk dan perubahan status penyajian (Pending -> Cooking -> Ready -> Served).
- **[x] Dasbor Staf Billiard:** Monitor sesi bermain, jadwal ketersediaan meja, dan penambahan billing paket personal/ regular.
- **[x] Real-time Expiration Alerts:** Notifikasi real-time dan bunyi alarm alarm sisa waktu bermain billiard 5 menit kepada customer via Laravel Reverb.
- **[x] Laporan Owner:** Visualisasi data ringkasan pendapatan cafe vs billiard serta data statistik performa bisnis.

---

## 📸 Screenshot Antarmuka Aplikasi

### 🔑 Autentikasi
| Halaman Login | Halaman Register |
| :---: | :---: |
| ![Halaman Login](docs/screenshots/Login/login.jpg) | ![Halaman Register](docs/screenshots/Login/register.jpg) |

### 📊 Dasbor Peran (Multi-Role Dashboard)
| Dasbor Customer | Dasbor Admin | Dasbor Owner |
| :---: | :---: | :---: |
| ![Dasbor Customer](docs/screenshots/Dashboard/customer.jpg) | ![Dasbor Admin](docs/screenshots/Dashboard/Admin.jpg) | ![Dasbor Owner](docs/screenshots/Dashboard/owner.jpg) |

### 🌟 Fitur Utama & Layanan
| Halaman Publik | Menu Kafe | Paket Billiard |
| :---: | :---: | :---: |
| ![Halaman Publik](docs/screenshots/Fitur%20Utama/Halaman%20public.jpg) | ![Halaman Menu](docs/screenshots/Fitur%20Utama/Halaman%20menu.jpg) | ![Paket Billiard](docs/screenshots/Fitur%20Utama/Halama%20paket%20billiard.jpg) |

| Pemesanan Makanan | Reservasi Billiard | Verifikasi Pembayaran |
| :---: | :---: | :---: |
| ![Order Makanan](docs/screenshots/Fitur%20Utama/order%20makanan.jpg) | ![Reservasi Billiard](docs/screenshots/Fitur%20Utama/reservasi%20billiard.jpg) | ![Pembayaran](docs/screenshots/Fitur%20Utama/Payment.jpg) |

---


## 🚀 Panduan Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah di bawah untuk menyiapkan lingkungan lokal:

### 1. Prasyarat Sistem
- PHP `>= 8.3`
- Node.js `>= 22`
- Composer & NPM

### 2. Langkah Setup
Jalankan perintah-perintah berikut di terminal:

```bash
# 1. Clone repositori dan masuk ke direktori proyek
git clone https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard.git
cd QM-Cafe-Billiard

# 2. Instal dependensi Composer (PHP)
composer install

# 3. Instal dependensi NPM (JavaScript)
npm install

# 4. Salin file environment dan generate application key
cp .env.example .env
php artisan key:generate

# 5. Buat tautan storage (untuk upload gambar menu/avatar/bukti bayar)
php artisan storage:link

# 6. Jalankan migrasi database beserta data seeder awal (SQLite default)
# (Secara default akan membuat database/database.sqlite apabila menggunakan konfigurasi SQLite)
php artisan migrate:fresh --seed
```

### 3. Menjalankan Server Operasional secara Paralel
Untuk kenyamanan development, jalankan script gabungan berikut (memanfaatkan `concurrently` yang dikonfigurasi di `composer.json`):

```bash
composer dev
```
*Perintah di atas akan menjalankan secara bersamaan:*
- Web server Laravel (`php artisan serve` pada `http://127.0.0.1:8000`)
- Vite dev server (`npm run dev`)
- Queue listener (`php artisan queue:listen` untuk pemrosesan background)
- Log tailer (`php artisan pail`)

---

## 🧪 Pengujian dan Standar Kode

### Menjalankan Automated Tests
Sistem dilengkapi dengan test suite lengkap untuk memverifikasi fungsionalitas backend dan frontend:
```bash
composer test
```
*Atau jalankan langsung via phpunit:*
```bash
php artisan test
```

## Konfigurasi Real-Time & Background Jobs (Local Development)

Mulai versi terbaru, project ini menggunakan Laravel Reverb dan sistem Queue (Database) untuk notifikasi *Real-Time* waktu bermain billiard yang hampir habis.
Untuk menjalankan seluruh *service* secara bersamaan (Server Web, Vite, Queue Worker, Reverb WebSocket, dan Scheduler), cukup gunakan satu command `dev`:

```bash
npm run dev
```

Command di atas otomatis menjalankan kelima proses tersebut di belakang layar menggunakan `concurrently`.

## Deployment ke Production

Saat deploy ke Production (VPS / Shared Hosting dengan akses SSH), pastikan Anda mensetup **Supervisor** atau daemon manager lainnya agar ketiga service berikut selalu berjalan:

1. **Queue Worker:** `php artisan queue:listen`
2. **Reverb Server:** `php artisan reverb:start`
3. **Scheduler:** Tambahkan entri Cron Job `* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1`

## Catatan Database

### Memeriksa Format Kode (Linter)
Kami menggunakan Laravel Pint untuk memastikan format penulisan kode PHP konsisten dan rapi:
```bash
./vendor/bin/pint --test
```
Untuk merapikan kode secara otomatis:
```bash
./vendor/bin/pint
```

---

## 👥 Tim Pengembang — Kelompok 2 TRPL 2C

| Nama | NIM | Peran |
|---|---:|---|
| Muhammad Irsyad Gumanof | 2411082031 | Project Manager |
| M. Galang Pratama | 2411081032 | System Analyst |
| Suhafdal Zikri | 2411083018 | Lead Programmer |
| Muhammad Ihqfal | 2411083013 | Lead Programmer 2 |
| Febriansyah Putra | 2411081030 | Quality Assurance |

---

## 📅 Dokumentasi Terkait
Dokumentasi teknis proyek yang lebih mendalam dapat dibaca pada folder [docs/](docs/):
1. **[Panduan Instalasi Lengkap](docs/installation.md)**
2. **[Spesifikasi Fitur Terpasang](docs/features.md)**
3. **[Manajemen Dependensi Proyek](docs/dependency.md)**
4. **[Dokumentasi Integrasi CI](docs/github-actions.md)**
5. **[Riwayat Refactoring Kode](docs/refactoring.md)**
6. **[Panduan Skenario Demo](docs/demo-guide.md)**

