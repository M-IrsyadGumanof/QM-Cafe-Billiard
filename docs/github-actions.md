# Dokumentasi GitHub Actions / Continuous Integration (CI)

> **Status:** **Aktif & Terimplementasi**  
> Alur kerja Continuous Integration (CI) telah diatur dan diaktifkan di dalam repositori untuk menguji setiap perubahan kode pada cabang (branch) utama maupun cabang kontributor.

---

## 1. Tujuan Workflow CI

Workflow CI dirancang untuk menguji kelayakan kode secara otomatis sebelum di-merge ke branch peluncuran. Alur kerja ini mencakup:
- Pemeriksaan kompatibilitas dependensi Composer (PHP) dan NPM (JavaScript).
- Setup environment database SQLite lokal khusus testing.
- Pengujian migrasi skema database (`php artisan migrate`).
- Kompilasi build asset React + Tailwind menggunakan Vite.
- Eksekusi pengujian fitur terpadu backend & frontend via PHPUnit.

---

## 2. Lokasi File Konfigurasi

File konfigurasi workflow GitHub Actions berada pada jalur berikut:
```text
.github/workflows/ci.yml
```

---

## 3. Pemicu Workflow (Triggers)

Workflow akan berjalan secara otomatis saat:
1. **Push:** Terjadi push kode ke branch `main`, `develop`, `suhafdal`, `irsyad`, `iqhfal`, `galang`, atau `febri`.
2. **Pull Request:** Diajukan pull request yang mengarah ke branch `main` atau `develop`.

---

## 4. Rincian Konfigurasi `ci.yml`

Berikut adalah isi dari file konfigurasi workflow CI yang aktif di repositori:

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

## 5. Penjelasan Tahapan Pengujian

1. **Concurrency Control:** `cancel-in-progress: true` digunakan untuk membatalkan proses build lama yang sedang berjalan apabila ada push komit baru pada branch yang sama, sehingga menghemat kuota menit GitHub Actions.
2. **Environment Variables:** Menetapkan database testing ke SQLite file in-disk `database/database.sqlite`, menonaktifkan queue (`sync`), mail (`array`), dan cache (`array`) agar pengujian berjalan terisolasi, konsisten, dan cepat.
3. **Setup Runtime:** Menggunakan PHP 8.4 dan Node.js 22 di mesin virtual Ubuntu untuk menjamin performa terbaik dan kesiapan masa depan (future-proofing).
4. **Install Dependensi:** `npm ci` digunakan alih-alih `npm install` agar dependency dipasang secara ketat mengikuti berkas kunci `package-lock.json`.
5. **Kompilasi Aset:** `npm run build` memverifikasi bahwa kode JSX React, routing Inertia, dan utility Tailwind tidak mengandung error sintaksis yang merusak proses bundling produksi.
6. **Eksekusi Test Suite:** `php artisan test` menjalankan semua berkas pengujian di bawah folder `tests/` secara otomatis.

---

## 6. Kriteria Kelulusan CI

Proses integrasi dinyatakan berhasil (Passing/Green) apabila seluruh kriteria berikut terpenuhi:

| Tahap | Hasil yang Diharapkan |
| :--- | :--- |
| **Composer & NPM Install** | Dependensi terpasang tanpa adanya konflik versi. |
| **Database Migration** | Skema tabel berhasil dibuat pada database SQLite testing. |
| **Vite Compilation** | Proses build aset frontend menghasilkan berkas bundel di `public/build/` tanpa error. |
| **Laravel Tests** | Seluruh unit test dan feature test lulus (0 failed assertions). |

---

## 7. Lencana Status (CI Badge)

Lencana status dinamis telah ditambahkan pada file `README.md` utama untuk memantau status kesehatan repositori secara visual:
```markdown
![CI Status](https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard/actions/workflows/ci.yml/badge.svg)
```
Badge akan menampilkan status berwarna **green (passing)** jika komit terakhir berhasil lolos uji, atau **red (failing)** jika terdapat test suite yang gagal atau kesalahan kompilasi aset.
