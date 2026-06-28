# Dokumentasi Dependency Proyek - QM Cafe & Billiard

Dokumen ini merangkum seluruh paket dependensi (packages) backend dan frontend yang **benar-benar terpasang** pada proyek **QM Cafe & Billiard**, serta penyesuaian status terhadap rencana package awal.

---

## 1. Dependensi Backend Aktual (`composer.json`)

Berikut adalah daftar package PHP yang dipasang dan digunakan di backend Laravel:

### Production Dependencies (Aplikasi Utama)

| Package | Versi Constraint | Fungsi Utama dalam Proyek | Catatan / Risiko |
| :--- | :---: | :--- | :--- |
| `php` | `^8.3` | Runtime utama backend (mendukung PHP 8.4 pada CI). | Server target harus menjalankan PHP minimal versi 8.3. |
| `laravel/framework` | `^13.8` | Framework inti MVC aplikasi. | Pembaruan versi major memerlukan pemeriksaan ulang API yang digunakan. |
| `inertiajs/inertia-laravel` | `^2.0` | Protokol transfer data dari controller Laravel ke views React. | Menghilangkan kebutuhan REST API tradisional untuk frontend. |
| `laravel/sanctum` | `^4.0` | Autentikasi API berbasis token jika dibutuhkan di masa mendatang. | Saat ini auth berbasis cookie/session Inertia. |
| `laravel/tinker` | `^3.0` | Konsol interaktif REPL untuk debug database via CLI. | Hanya untuk keperluan administratif pengembang. |
| `tightenco/ziggy` | `^2.0` | Mengintegrasikan fungsi route named Laravel (`route('name')`) ke JSX. | Perubahan penamaan route pada laravel akan berdampak ke frontend. |

### Development Dependencies (Alat Bantu Pengembangan & Pengujian)

| Package | Versi Constraint | Fungsi Utama | Keterangan |
| :--- | :---: | :--- | :--- |
| `laravel/breeze` | `^2.4` | Scaffolding awal modul otentikasi. | Login, Register, & Forgot Password. |
| `laravel/pint` | `^1.27` | Alat otomatis penyeragaman coding style PHP. | Dijalankan sebelum melakukan push/merge. |
| `phpunit/phpunit` | `^12.5.12` | Automated testing framework untuk backend. | Berjalan otomatis di workflow GitHub Actions CI. |
| `fakerphp/faker` | `^1.23` | Generator data tiruan untuk database seeder. | Digunakan pada testing database factories. |
| `mockery/mockery` | `^1.6` | Mocking objek untuk pengujian unit. | Hanya aktif di lingkungan testing. |
| `nunomaduro/collision` | `^8.6` | Mempercantik error screen saat terjadi bug di konsol. | Dependensi development saja. |
| `laravel/pail` | `^1.2.5` | Membaca log Laravel secara real-time di terminal. | Dipanggil secara otomatis oleh script `composer dev`. |
| `laravel/pao` | `^1.0.6` | Alat bantu internal tim development. | Penyelarasan format database & pengujian lokal. |

---

## 2. Dependensi Frontend Aktual (`package.json`)

Berikut adalah daftar library JavaScript/React yang dipasang dan digunakan di frontend:

| Package | Versi Constraint | Fungsi Utama dalam Proyek | Catatan / Status |
| :--- | :---: | :--- | :--- |
| `react` & `react-dom` | `^18.2.0` | Pustaka dasar pembangun antarmuka pengguna (UI). | State management lokal. |
| `@inertiajs/react` | `^2.0.0` | Core adapter Inertia untuk komponen React. | Mengelola transisi halaman dan form posting. |
| `tailwindcss` | `^3.4.19` | Framework CSS utilitas utama untuk styling. | Dikombinasikan dengan token desain tema gelap. |
| `@tailwindcss/vite` | `^4.3.0` | Integrasi engine Tailwind dengan build tool Vite. | Mempercepat proses kompilasi asset CSS. |
| `vite` | `^8.0.0` | Bundler dan development server frontend super cepat. | Berjalan berdampingan dengan server php artisan. |
| `laravel-vite-plugin` | `^3.1` | Mengintegrasikan output build Vite dengan Blade Laravel. | Mengarahkan asset JS/CSS ke template blade. |
| `axios` | `^1.16.1` | HTTP client untuk request AJAX manual ke server. | Digunakan untuk request di luar Inertia (bila ada). |
| `@headlessui/react` | `^2.0.0` | Komponen interaktif tanpa style (Modal, Dropdown). | Untuk komponen UI aksesibel. |
| `@tailwindcss/forms` | `^0.5.3` | Plugin penyeragaman style default input form CSS. | Untuk form input. |
| `concurrently` | `^9.0.1` | Menjalankan beberapa perintah terminal sekaligus. | Digunakan untuk perintah `composer dev`. |
| `autoprefixer` | `^10.4.12` | Otomatisasi prefix CSS vendor. | Diperlukan oleh Tailwind. |
| `postcss` | `^8.4.31` | Pemrosesan file CSS pasca kompilasi. | Diperlukan oleh Tailwind. |

---

## 3. Penyesuaian Terhadap Rencana Awal Dependensi

Berikut adalah perubahan keputusan arsitektur mengenai dependensi yang direncanakan sebelumnya:

- **Laravel Reverb (Status: Terpasang & Aktif)**
  - *Fungsi:* Digunakan sebagai WebSocket server lokal untuk event broadcasting real-time ketika durasi bermain billiard pelanggan tersisa 5 menit.
- **Spatie Laravel Permission (Status: Dibatalkan / Menggunakan Custom Middleware)**
  - *Keputusan:* Tim memutuskan untuk **tidak memasang** package ini guna menghindari kompleksitas database schema di SQLite. Sebagai gantinya, otorisasi peran menggunakan middleware custom bawaan (`RoleMiddleware.php`) dan pengecekan properti `role` langsung pada objek User.
- **Maatwebsite Excel & Barryvdh Dompdf (Status: Ditunda / Menggunakan Browser Native)**
  - *Keputusan:* Fitur ekspor laporan keuangan Owner diselesaikan menggunakan template tampilan HTML yang rapi dilengkapi CSS `@media print` sehingga Owner dapat mencetak langsung ke PDF secara native lewat browser tanpa membebani server backend.
- **Spatie Activitylog (Status: Dibatalkan)**
  - *Keputusan:* Audit log aktivitas admin dinilai di luar cakupan (out-of-scope) kebutuhan MVP saat ini.

---

## 4. Cara Memeriksa Dependensi Aktual

### Memeriksa Dependensi Backend
```bash
composer show
```
Untuk melihat dependensi yang memiliki pembaruan versi:
```bash
composer outdated
```

### Memeriksa Dependensi Frontend
```bash
npm list --depth=0
```
Untuk melihat paket javascript yang out-of-date:
```bash
npm outdated
```
