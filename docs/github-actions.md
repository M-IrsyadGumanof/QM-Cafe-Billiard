# Dokumentasi GitHub Actions / Continuous Integration

> **Status:** workflow CI sudah diimplementasikan dan berhasil dijalankan pada repository **QM Cafe & Billiard**. Workflow aktif berada pada file `.github/workflows/ci.yml`.

---

## 1. Tujuan Workflow

Continuous Integration (CI) digunakan untuk memeriksa perubahan kode secara otomatis sebelum perubahan digabungkan ke branch integrasi atau branch utama. Pada proyek Laravel, Inertia, dan React ini, workflow digunakan untuk:

- menginstal dependency PHP dan JavaScript;
- menyiapkan environment testing Laravel;
- menyiapkan database SQLite untuk pengujian;
- menjalankan database migration;
- membangun asset React/Vite;
- menjalankan test Laravel;
- membantu reviewer memastikan perubahan aman sebelum merge.

---

## 2. Lokasi File Workflow

Workflow aktif berada pada:

```text
.github/workflows/ci.yml
```

---

## 3. Nama Workflow

```text
CI - QM Cafe and Billiard
```

---

## 4. Trigger Workflow

| Trigger | Branch | Tujuan |
|---|---|---|
| `push` | `main` | Memeriksa perubahan yang masuk ke branch stabil. |
| `push` | `develop` | Memeriksa perubahan yang masuk ke branch integrasi. |
| `push` | `suhafdal`, `irsyad`, `iqhfal`, `galang`, `febri` | Memeriksa perubahan pada branch anggota. |
| `pull_request` | menuju `develop` | Memeriksa perubahan sebelum digabung ke branch integrasi. |
| `pull_request` | menuju `main` | Memeriksa perubahan sebelum masuk ke branch stabil. |

---

## 5. Environment CI

| Komponen | Versi/Konfigurasi |
|---|---|
| Runner | `ubuntu-latest` |
| PHP | `8.4` |
| Node.js | `22` |
| Database testing | SQLite |
| Cache | `array` |
| Session | `array` |
| Queue | `sync` |
| Mail | `array` |

> CI menggunakan PHP `8.4` karena dependency pada `composer.lock` membutuhkan PHP versi tersebut.

---

## 6. Tahapan Workflow

| No. | Tahap | Keterangan |
|---:|---|---|
| 1 | Checkout repository | Mengambil source code dari repository. |
| 2 | Setup PHP 8.4 | Menyiapkan PHP dan extension yang dibutuhkan Laravel. |
| 3 | Setup Node.js 22 | Menyiapkan Node.js untuk proses frontend. |
| 4 | Install PHP dependencies | Menjalankan `composer install`. |
| 5 | Install Node dependencies | Menjalankan `npm ci` berdasarkan `package-lock.json`. |
| 6 | Prepare Laravel environment | Membuat `.env`, generate app key, membuat database SQLite, dan clear config. |
| 7 | Run database migrations | Menjalankan migration pada database testing. |
| 8 | Build frontend assets | Menjalankan `npm run build` agar Vite manifest tersedia. |
| 9 | Run Laravel tests | Menjalankan `php artisan test`. |

---

## 7. Isi File `ci.yml`

```yaml
name: CI - QM Cafe and Billiard

on:
  push:
    branches:
      - main
      - develop
      - suhafdal
      - irsyad
      - iqhfal
      - galang
      - febri
  pull_request:
    branches:
      - develop
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality-check:
    name: Quality Check
    runs-on: ubuntu-latest
    timeout-minutes: 15

    env:
      APP_ENV: testing
      DB_CONNECTION: sqlite
      DB_DATABASE: database/database.sqlite
      CACHE_STORE: array
      SESSION_DRIVER: array
      QUEUE_CONNECTION: sync
      MAIL_MAILER: array

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: "8.4"
          extensions: mbstring, dom, fileinfo, sqlite3, pdo_sqlite, openssl, tokenizer, xml, ctype, json, bcmath
          coverage: none
          tools: composer:v2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Install PHP dependencies
        run: composer install --no-interaction --prefer-dist --no-progress

      - name: Install Node dependencies
        run: npm ci

      - name: Prepare Laravel environment
        run: |
          cp .env.example .env
          php artisan key:generate --ansi
          mkdir -p database
          touch database/database.sqlite
          php artisan config:clear --ansi

      - name: Run database migrations
        run: php artisan migrate --force --ansi

      - name: Build frontend assets
        run: npm run build

      - name: Run Laravel tests
        run: php artisan test --ansi
```

---

## 8. Alasan `npm run build` Dijalankan Sebelum Test

Beberapa feature test membuka halaman Inertia seperti `/login`. Halaman Inertia memakai Vite melalui file `resources/views/app.blade.php`, sehingga membutuhkan Vite manifest pada:

```text
public/build/manifest.json
```

File tersebut dibuat oleh perintah:

```bash
npm run build
```

Karena itu, `npm run build` dijalankan sebelum `php artisan test` agar test tidak gagal karena Vite manifest belum tersedia.

---

## 9. Kriteria Keberhasilan

Workflow dinyatakan berhasil apabila:

| Pemeriksaan | Hasil yang Diharapkan |
|---|---|
| Composer install | Dependency backend berhasil diinstal tanpa konflik. |
| NPM install | `npm ci` berhasil karena `package.json` dan `package-lock.json` sinkron. |
| Environment Laravel | `.env`, app key, dan database SQLite berhasil disiapkan. |
| Database migration | Migration berhasil dijalankan pada database testing. |
| Frontend build | Asset React/Vite berhasil dibangun tanpa error. |
| Laravel test | Semua test Laravel lulus. |

---

## 10. Badge Status Workflow

Badge CI dapat ditambahkan pada `README.md` karena workflow sudah tersedia dan berhasil berjalan:

```md
[![CI](https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard/actions/workflows/ci.yml/badge.svg)](https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard/actions/workflows/ci.yml)
```

---

## 11. Bukti Implementasi

| Bukti | Status |
|---|---|
| File `.github/workflows/ci.yml` pada repository | Sudah diimplementasikan |
| Workflow berjalan pada tab Actions GitHub | Sudah berjalan |
| Quality Check berhasil | Sudah berhasil/checklist hijau |
| Badge CI pada README | Ditambahkan |
| Perbaikan error CI | Sudah dilakukan |

---

## 12. Riwayat Error dan Perbaikan

| Masalah | Penyebab | Perbaikan |
|---|---|---|
| Composer gagal pada CI | PHP CI menggunakan 8.3, sedangkan dependency membutuhkan PHP 8.4 | Mengubah `php-version` menjadi `8.4` |
| `npm ci` gagal | `package.json` dan `package-lock.json` tidak sinkron | Menjalankan `npm install`, lalu commit perubahan `package-lock.json` |
| Laravel test gagal karena Vite manifest tidak ditemukan | `php artisan test` dijalankan sebelum `npm run build` | Memindahkan step `npm run build` sebelum `php artisan test` |

---

## 13. Perintah Lokal yang Setara

Sebelum membuat commit atau pull request, developer disarankan menjalankan:

```bash
php artisan migrate:fresh
npm run build
php artisan test
```

Jika dependency frontend berubah, jalankan:

```bash
npm install
```

Kemudian pastikan `package-lock.json` ikut diperbarui apabila memang berubah.

---

## 14. Catatan Pemeliharaan

Workflow perlu diperbarui apabila tim:

- mengganti versi PHP, Laravel, React, Node.js, atau Vite;
- beralih dari SQLite testing ke MySQL testing;
- menambahkan Laravel Pint sebagai quality gate wajib;
- menambahkan linter frontend;
- menambahkan unit test frontend;
- menambahkan proses deployment otomatis.

Laravel Pint belum dijadikan step wajib pada workflow ini agar CI tidak gagal hanya karena format kode saat project masih aktif dikembangkan. Pint dapat ditambahkan pada PR khusus code style setelah struktur project lebih stabil.
