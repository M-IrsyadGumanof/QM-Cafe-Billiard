# Dokumentasi Instalasi

Dokumen ini menjelaskan langkah menjalankan proyek **Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard** pada lingkungan development lokal.

> **Status dokumen:** panduan ini disusun berdasarkan isi repository branch `main`, khususnya `composer.json`, `package.json`, dan `.env.example`. Pada saat dokumen dibuat, `.env.example` menggunakan SQLite sebagai database default development.

---

## 1. Persyaratan Sistem

| Kebutuhan | Versi / Keterangan |
|---|---|
| Git | Versi terbaru yang stabil |
| PHP | `^8.3`, sesuai `composer.json` |
| Composer | Versi 2.x |
| Node.js | Gunakan Node.js 22.x agar memenuhi kebutuhan Vite 8 |
| NPM | Mengikuti instalasi Node.js |
| SQLite | Pilihan default dari `.env.example` |
| MySQL | Opsional jika database proyek akan dialihkan ke MySQL |

Untuk Windows, environment seperti Laragon, Herd, atau instalasi PHP/Composer terpisah dapat digunakan selama versi PHP memenuhi kebutuhan proyek.

---

## 2. Clone Repository

Buka terminal pada folder tempat proyek akan disimpan, lalu jalankan:

```bash
git clone https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard.git
cd QM-Cafe-Billiard
```

---

## 3. Install Dependency Backend dan Frontend

Install package PHP:

```bash
composer install
```

Install package frontend:

```bash
npm install
```

Dependency backend dibaca dari `composer.json`, sedangkan dependency frontend dibaca dari `package.json`.

---

## 4. Setup File Environment

Salin file `.env.example` menjadi `.env`.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### Command Prompt Windows

```cmd
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Generate application key Laravel:

```bash
php artisan key:generate
```

Untuk memperjelas nama aplikasi saat development, ubah bagian berikut pada file `.env`:

```env
APP_NAME="QM Cafe & Billiard"
APP_URL=http://localhost:8000
```

---

## 5. Setup Database

### Opsi A — SQLite, sesuai konfigurasi default repository

Pada `.env.example`, database default adalah:

```env
DB_CONNECTION=sqlite
```

Buat file database:

#### Windows PowerShell

```powershell
New-Item database/database.sqlite -ItemType File -Force
```

#### Command Prompt Windows

```cmd
type nul > database\database.sqlite
```

#### Linux / macOS

```bash
touch database/database.sqlite
```

Jalankan migrasi:

```bash
php artisan migrate
```

### Opsi B — MySQL

Gunakan opsi ini apabila tim menetapkan MySQL sebagai database development bersama.

1. Buat database baru, misalnya:

```sql
CREATE DATABASE qm_cafe_billiard;
```

2. Ubah konfigurasi `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=qm_cafe_billiard
DB_USERNAME=root
DB_PASSWORD=
```

3. Jalankan migrasi:

```bash
php artisan migrate
```

Catatan: jangan mengunggah file `.env` yang berisi konfigurasi lokal atau kredensial ke repository GitHub.

---

## 6. Menjalankan Aplikasi

Repository telah menyediakan script development pada Composer yang menjalankan server Laravel, queue listener, log viewer, dan Vite secara bersamaan:

```bash
composer run dev
```

Setelah server berjalan, akses aplikasi pada browser:

```text
http://localhost:8000
```

Alternatif apabila hanya ingin menjalankan bagian tertentu:

Terminal pertama:

```bash
php artisan serve
```

Terminal kedua:

```bash
npm run dev
```

---

## 7. Memastikan Instalasi Berhasil

Setelah aplikasi berjalan, lakukan pemeriksaan berikut:

| Pemeriksaan | Hasil yang Diharapkan |
|---|---|
| Membuka halaman utama | Halaman aplikasi dapat ditampilkan tanpa error server. |
| Membuka halaman register | Form registrasi dapat diakses. |
| Membuat akun dan login | User berhasil masuk setelah autentikasi. |
| Membuka dashboard | Dashboard dapat diakses oleh user terautentikasi dan terverifikasi sesuai middleware. |
| Menjalankan test | Perintah `composer test` atau `php artisan test` dapat dijalankan. |

Fitur operasional QM Cafe & Billiard seperti reservasi, pemesanan, dan verifikasi pembayaran baru dapat diuji setelah implementasinya tersedia.

---

## 8. Menjalankan Test dan Pemeriksaan Format Kode

Jalankan automated test:

```bash
composer test
```

atau:

```bash
php artisan test
```

Laravel Pint telah tercantum sebagai dependency development. Untuk memeriksa format kode tanpa mengubah file:

```bash
./vendor/bin/pint --test
```

Pada Windows PowerShell:

```powershell
.\vendor\bin\pint --test
```

---

## 9. Troubleshooting

### Error: Composer meminta versi PHP yang lebih tinggi

Penyebab: versi PHP lokal belum memenuhi kebutuhan `^8.3`.

Pemeriksaan:

```bash
php -v
composer check-platform-reqs
```

Solusi: aktifkan atau instal PHP 8.3 atau versi kompatibel yang lebih baru, lalu jalankan kembali `composer install`.

### Error: `No application encryption key has been specified`

Jalankan:

```bash
php artisan key:generate
```

### Error SQLite: database file tidak ditemukan

Buat file SQLite pada folder `database/`, lalu migrasi ulang:

```bash
php artisan migrate
```

### Error koneksi MySQL

Pastikan MySQL sedang berjalan, database telah dibuat, dan nilai `DB_DATABASE`, `DB_USERNAME`, serta `DB_PASSWORD` pada `.env` sudah benar. Setelah mengubah `.env`, bersihkan cache konfigurasi:

```bash
php artisan config:clear
```

### Error frontend atau asset Vite tidak tampil

Pastikan dependency frontend sudah terpasang dan Vite sedang berjalan:

```bash
npm install
npm run dev
```

### Error akibat cache Laravel

```bash
php artisan optimize:clear
```

### Error permission pada Linux/macOS

```bash
chmod -R 775 storage bootstrap/cache
```

---

## 10. Catatan Pengembangan Berikutnya

Panduan ini perlu diperbarui ketika:

- database tim sudah ditetapkan secara final;
- seeder akun dan data awal sudah tersedia;
- dependency baru ditambahkan;
- workflow CI berhasil dijalankan;
- aplikasi telah dideploy pada server.
