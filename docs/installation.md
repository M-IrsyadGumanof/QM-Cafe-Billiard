# Panduan Instalasi dan Konfigurasi QM Cafe & Billiard

Dokumen ini menjelaskan langkah-langkah detail untuk memasang, mengonfigurasi, dan menjalankan aplikasi **QM Cafe & Billiard** di lingkungan pengembangan lokal (localhost).

---

## 📋 Persyaratan Sistem

Sebelum memulai instalasi, pastikan sistem Anda memenuhi spesifikasi berikut:

- **PHP:** Versi `^8.3` atau `>= 8.4` (Sesuai dengan target pengujian CI)
  - *PHP Extensions wajib:* `mbstring`, `dom`, `fileinfo`, `sqlite3`, `pdo_sqlite`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`.
- **Node.js:** Versi `>= 22`
- **Package Manager:** Composer (PHP) & NPM (Node.js)
- **Database:** SQLite (Direkomendasikan untuk pengembangan lokal & testing) atau MySQL.

---

## 🛠️ Langkah-Langkah Instalasi

### 1. Kloning Repositori
Buka terminal/command prompt, kemudian jalankan:
```bash
git clone https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard.git
cd QM-Cafe-Billiard
```

### 2. Instalasi Dependensi Backend (Composer)
Instal paket-paket backend PHP yang terdaftar pada `composer.json`:
```bash
composer install
```

### 3. Instalasi Dependensi Frontend (NPM)
Instal paket-paket javascript frontend React yang terdaftar pada `package.json`:
```bash
npm install
```

### 4. Konfigurasi Environment File
Salin template konfigurasi `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Generate key enkripsi aplikasi Laravel:
```bash
php artisan key:generate
```

### 5. Konfigurasi Database

#### Opsi A: Menggunakan SQLite (Rekomendasi & Default)
Buka file `.env`, pastikan konfigurasinya sebagai berikut:
```env
DB_CONNECTION=sqlite
# Kosongkan atau hapus baris DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```
Buat file database SQLite kosong di dalam folder `database/` (pada Windows PowerShell):
```powershell
New-Item -ItemType File -Path database\database.sqlite -Force
```
*Atau pada Git Bash/Linux:*
```bash
touch database/database.sqlite
```

#### Opsi B: Menggunakan MySQL
Buat database baru di server MySQL Anda (misal bernama `qm_cafe_billiard`).
Buka file `.env`, ubah konfigurasinya menjadi:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=qm_cafe_billiard
DB_USERNAME=root
DB_PASSWORD=password_anda
```

### 6. Menghubungkan Folder Storage
Laravel membutuhkan symlink untuk dapat membaca dan menyajikan file media yang diunggah (foto menu, avatar, bukti bayar). Jalankan perintah berikut:
```bash
php artisan storage:link
```

### 7. Migrasi Database dan Data Seeder
Jalankan migrasi tabel-tabel database sekaligus mengisi data master awal beserta akun demo:
```bash
php artisan migrate:fresh --seed
```

---

## 📡 Konfigurasi Real-Time Notifikasi & Queue

Aplikasi ini dilengkapi dengan fitur **Session Expiring Alert** yang memanfaatkan sistem broadcasting event.

1. **Konfigurasi Driver Broadcast (.env):**
   Secara default, di lingkungan lokal, pastikan koneksi broadcast diatur menggunakan driver yang didukung atau `reverb` jika Laravel Reverb aktif:
   ```env
   BROADCAST_CONNECTION=reverb
   QUEUE_CONNECTION=sync
   ```
   *(Untuk pengujian CI otomatis, driver broadcast diatur ke `array` dan database menggunakan `sqlite` in-memory).*

2. **Menjalankan Queue Worker:**
   Jika Anda mengubah `QUEUE_CONNECTION` ke `database` atau `redis` pada production, Anda wajib menjalankan antrean background:
   ```bash
   php artisan queue:listen --tries=1 --timeout=0
   ```

---

## ⚡ Menjalankan Aplikasi

Anda dapat menggunakan script gabungan yang sudah disediakan di dalam `composer.json` untuk menjalankan server backend, compiler Vite, queue, dan log secara bersamaan:

```bash
composer dev
```

Jika ingin menjalankan secara manual satu per satu di terminal terpisah:

1. **Jalankan Server Laravel:**
   ```bash
   php artisan serve
   ```
   Aplikasi dapat diakses melalui browser di alamat: [http://127.0.0.1:8000](http://127.0.0.1:8000)

2. **Jalankan Vite Server (Hot Reload Frontend):**
   ```bash
   npm run dev
   ```

---

## ❓ Troubleshooting (Penanganan Masalah)

- **Error: `Database file does not exist` (SQLite)**
  Pastikan Anda telah menjalankan perintah `touch database/database.sqlite` atau `New-Item` sebelum melakukan migrasi.
- **Gambar Menu / Bukti Bayar Tidak Muncul**
  Pastikan symlink storage telah dibuat. Jika masih gagal, hapus symlink lama di folder `public/storage` lalu jalankan kembali `php artisan storage:link`.
- **Gagal Build Aset Frontend**
  Jika terjadi error saat menjalankan `npm run build` atau `npm run dev`, bersihkan cache npm dan instal ulang module:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- **Error Izin Akses File (Permission Denied)**
  Pastikan web server memiliki akses tulis (write permission) ke direktori `storage/` dan `bootstrap/cache/`.
