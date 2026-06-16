# Dokumentasi Dependency Proyek

Dokumen ini merangkum dependency pada proyek **Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard** serta rencana package untuk mendukung kebutuhan bisnis.

> **Dasar verifikasi dependency terpasang:** file `composer.json` dan `package.json` pada branch `main` repository, diperiksa pada 29 Mei 2026. Package yang belum tercantum pada file tersebut ditulis sebagai **rencana** atau **opsional**, bukan sebagai dependency yang sudah digunakan.

---

## 1. Dependency Backend yang Sudah Tercantum pada `composer.json`

### Production Dependencies

| Package | Versi Constraint | Fungsi dalam Proyek | Risiko / Catatan |
|---|---:|---|---|
| `php` | `^8.3` | Runtime aplikasi backend. | Mesin development/hosting wajib menggunakan versi kompatibel. |
| `laravel/framework` | `^13.8` | Framework utama aplikasi. | Upgrade major dapat mengubah API atau konfigurasi. |
| `inertiajs/inertia-laravel` | `^2.0` | Jembatan Laravel dengan page React melalui Inertia. | Perlu menjaga kompatibilitas frontend dan backend. |
| `laravel/sanctum` | `^4.0` | Dukungan autentikasi berbasis token/API bila digunakan. | Konfigurasi token dan keamanan endpoint perlu diperhatikan. |
| `laravel/tinker` | `^3.0` | Interaksi dengan aplikasi melalui console saat development. | Tidak digunakan sebagai fitur pengguna. |
| `tightenco/ziggy` | `^2.0` | Menggunakan named route Laravel pada kode JavaScript/React. | Perubahan nama route dapat berdampak pada frontend. |

### Development Dependencies

| Package | Versi Constraint | Fungsi | Risiko / Catatan |
|---|---:|---|---|
| `laravel/breeze` | `^2.4` | Scaffolding autentikasi yang menghasilkan login, registrasi, reset password, dan verifikasi email. | Setelah scaffolding dibuat, perubahan UI/logic harus dipelihara tim. |
| `laravel/pint` | `^1.27` | Menjaga konsistensi format kode PHP. | Jalankan sebelum merge agar style konsisten. |
| `phpunit/phpunit` | `^12.5.12` | Automated testing backend. | Test harus ditambah seiring penambahan fitur. |
| `fakerphp/faker` | `^1.23` | Membuat data dummy untuk factory/seeder/testing. | Hanya untuk development/testing. |
| `mockery/mockery` | `^1.6` | Mocking object pada pengujian. | Hanya relevan untuk test. |
| `nunomaduro/collision` | `^8.6` | Tampilan error console yang lebih informatif. | Dependency development. |
| `laravel/pail` | `^1.2.5` | Membaca log aplikasi saat development. | Jangan digunakan sebagai pengganti monitoring produksi. |
| `laravel/pao` | `^1.0.6` | Dependency development Laravel pada repository saat ini. | Fungsi spesifik perlu mengikuti dokumentasi package yang dipakai proyek. |

---

## 2. Dependency Frontend yang Sudah Tercantum pada `package.json`

| Package | Versi Constraint | Fungsi | Risiko / Catatan |
|---|---:|---|---|
| `react` dan `react-dom` | `^18.2.0` | Membangun antarmuka pengguna. | Komponen harus dijaga konsistensi state dan routing-nya. |
| `@inertiajs/react` | `^2.0.0` | Rendering page React yang terhubung dengan Laravel/Inertia. | Bergantung pada struktur response Laravel. |
| `tailwindcss` | `^3.4.19` | Styling antarmuka. | Konsistensi desain perlu dijaga melalui komponen/konvensi tim. |
| `vite` | `^8.0.0` | Build tool frontend. | Memerlukan Node.js yang kompatibel. |
| `laravel-vite-plugin` | `^3.1` | Integrasi asset Vite dengan Laravel. | Perlu build asset saat deployment. |
| `axios` | `^1.16.1` | HTTP client pada frontend. | Endpoint dan penanganan error harus diamankan. |
| `@headlessui/react` | `^2.0.0` | Komponen UI aksesibel tanpa style bawaan. | Perlu styling dan testing interaksi. |
| `@tailwindcss/forms` | `^0.5.3` | Style dasar elemen form. | Sesuaikan dengan desain aplikasi. |

---

## 3. Dependency yang Direncanakan Berdasarkan Kebutuhan Fitur

Package berikut belum dinyatakan terpasang pada branch `main` ketika dokumen ini disusun. Instalasi hanya dilakukan setelah fitur terkait benar-benar disetujui dan mulai diimplementasikan.

| Package Rencana | Fitur yang Didukung | Alasan Pemilihan | Status | Risiko |
|---|---|---|---|---|
| `spatie/laravel-permission` | Role dan permission | Sistem memiliki Customer, Admin/Cashier, Kitchen Staff, Billiard Staff, dan Owner dengan akses berbeda. | Direkomendasikan | Konfigurasi role/middleware harus diuji dengan baik. |
| `maatwebsite/excel` | Export laporan | Owner dapat mengunduh laporan dalam format spreadsheet apabila kebutuhan export disetujui. | Rencana | Kompatibilitas versi Laravel perlu diverifikasi sebelum install. |
| `barryvdh/laravel-dompdf` | Cetak laporan atau struk PDF | Memudahkan penyediaan dokumen cetak. | Rencana | Rendering dokumen besar dapat menambah beban proses. |
| `intervention/image` | Foto menu, galeri, bukti pembayaran | Mengatur ukuran dan kompresi file upload. | Rencana | Validasi file dan storage wajib diamankan. |
| `spatie/laravel-activitylog` | Audit aktivitas | Mencatat perubahan penting pada pembayaran, reservasi, atau stok. | Rencana | Ukuran tabel log bertambah; perlu retensi data. |
| `simplesoftwareio/simple-qrcode` | QR Code meja/menu | Hanya diperlukan apabila tim mempertahankan akses menu melalui QR Code sebagai fitur final. | Opsional | Jangan diinstal apabila kebutuhan QR Code dihapus. |

---

## 4. Dependency yang Tidak Menjadi Prioritas pada Scope Saat Ini

| Package / Integrasi | Alasan Tidak Menjadi Prioritas |
|---|---|
| HTTP client untuk payment gateway eksternal | Pembayaran transfer dan QRIS pada kebutuhan saat ini diverifikasi manual oleh Admin/Cashier, bukan terintegrasi otomatis dengan payment gateway. |
| Debugbar tambahan | Repository telah memiliki sarana development seperti Laravel Pail; package debugging tambahan hanya dipasang bila benar-benar dibutuhkan tim. |

---

## 5. Cara Memeriksa Dependency Aktual

### Backend / Composer

```bash
composer show
composer outdated
```

### Frontend / NPM

```bash
npm list --depth=0
npm outdated
```

Sebelum mendokumentasikan package sebagai “digunakan”, pastikan package tersebut tercantum pada `composer.json`, `composer.lock`, `package.json`, atau `package-lock.json`.

---

## 6. Cara Instal Package Baru

### Composer Package

```bash
composer require nama-vendor/nama-package
```

Untuk package development:

```bash
composer require --dev nama-vendor/nama-package
```

Contoh apabila role/permission mulai diimplementasikan:

```bash
composer require spatie/laravel-permission
```

### NPM Package

```bash
npm install nama-package
```

Setelah dependency berubah, dokumentasikan pada:

1. `docs/dependency.md`;
2. `CHANGELOG.md` bagian `Dependency`;
3. commit Git dengan pesan yang menjelaskan package dan tujuan penggunaannya.

---

## 7. Dampak Dependency pada Proyek

### Dampak Positif

- mempercepat implementasi fitur umum;
- membantu menjaga kualitas kode dan testing;
- mengurangi pembuatan fitur teknis dari nol.

### Risiko

- konflik versi dengan Laravel, PHP, React, atau Vite;
- penambahan ukuran instalasi dan waktu build;
- maintenance bergantung pada package pihak ketiga;
- potensi celah keamanan pada dependency lama.

### Strategi Mitigasi

- hanya memasang package yang memiliki kebutuhan fitur jelas;
- meninjau dokumentasi kompatibilitas sebelum instalasi;
- mencatat setiap perubahan dependency dalam changelog;
- menjalankan test dan build setelah perubahan dependency;
- memeriksa dependency usang secara berkala.
