# Dokumentasi GitHub Actions / Continuous Integration

> **Status:** workflow CI berikut merupakan rencana implementasi untuk tahap final. Saat dokumen ini disusun, workflow GitHub Actions belum didokumentasikan sebagai workflow aktif pada branch `main`.

---

## 1. Tujuan Workflow

Continuous Integration (CI) direncanakan untuk memeriksa setiap perubahan kode sebelum digabungkan ke branch utama. Pada proyek Laravel, Inertia, dan React ini, workflow akan digunakan untuk:

- menginstal dependency PHP dan JavaScript;
- memastikan aplikasi dapat menyiapkan environment testing;
- menjalankan test Laravel;
- memeriksa format kode PHP dengan Laravel Pint;
- memastikan asset React/Vite dapat dibangun.

---

## 2. Lokasi File Workflow

Workflow yang direncanakan:

```text
.github/workflows/ci.yml
```

---

## 3. Trigger Workflow

| Trigger | Tujuan |
|---|---|
| `push` ke branch `main` atau `develop` | Memeriksa perubahan yang sudah dikirim ke branch integrasi/utama. |
| `pull_request` menuju `main` atau `develop` | Memeriksa perubahan sebelum merge. |

---

## 4. Rencana Tahapan Workflow

| No. | Tahap | Keterangan |
|---:|---|---|
| 1 | Checkout code | Mengambil source code dari repository. |
| 2 | Setup PHP 8.3 | Menyiapkan versi PHP yang sesuai dengan `composer.json`. |
| 3 | Install Composer dependency | Menginstal dependency backend secara konsisten dari lock file. |
| 4 | Setup `.env` dan SQLite testing | Menyiapkan database ringan untuk proses pengujian CI. |
| 5 | Generate application key dan migrate | Menyiapkan aplikasi sebelum test. |
| 6 | Laravel Pint | Memeriksa konsistensi format kode PHP. |
| 7 | PHPUnit / Laravel Test | Menjalankan automated test backend. |
| 8 | Setup Node.js 22 | Menyiapkan versi Node yang kompatibel dengan Vite 8. |
| 9 | Install NPM dependency | Menginstal dependency frontend dari lock file. |
| 10 | Build frontend | Memastikan React/Vite berhasil dikompilasi. |

---

## 5. Contoh Rencana File `ci.yml`

File di bawah adalah rancangan awal yang perlu diuji ketika workflow mulai diaktifkan:

```yaml
name: CI - QM Cafe and Billiard

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test-and-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_sqlite
          coverage: none

      - name: Install Composer dependencies
        run: composer install --no-interaction --prefer-dist --no-progress

      - name: Prepare Laravel environment
        run: |
          cp .env.example .env
          touch database/database.sqlite
          php artisan key:generate
          php artisan migrate --force

      - name: Check PHP code style
        run: ./vendor/bin/pint --test

      - name: Run Laravel tests
        run: php artisan test

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm

      - name: Install NPM dependencies
        run: npm ci

      - name: Build frontend assets
        run: npm run build
```

---

## 6. Kriteria Keberhasilan

Workflow dinyatakan berhasil apabila:

| Pemeriksaan | Hasil yang Diharapkan |
|---|---|
| Composer install | Tidak terdapat konflik dependency backend. |
| Database migration | Migration berhasil dijalankan pada database testing. |
| Pint test | Tidak ada pelanggaran format kode PHP. |
| Laravel test | Semua test lulus. |
| NPM install dan build | Asset React/Vite berhasil dibangun tanpa error. |

---

## 7. Badge Status Workflow

Setelah file `.github/workflows/ci.yml` benar-benar dibuat dan berhasil berjalan, badge berikut dapat ditambahkan pada `README.md`:

```md
![CI](https://github.com/M-IrsyadGumanof/QM-Cafe-Billiard/actions/workflows/ci.yml/badge.svg)
```

Jangan menambahkan badge sebagai bukti keberhasilan sebelum workflow tersedia dan pernah dijalankan.

---

## 8. Bukti yang Harus Ditambahkan Saat Final

| Bukti | Status Saat Ini |
|---|---|
| File `.github/workflows/ci.yml` pada repository | Menunggu implementasi |
| Screenshot hasil run berhasil di tab Actions | Menunggu implementasi |
| Badge CI aktif pada README | Menunggu implementasi |
| Commit atau pull request yang diuji | Menunggu implementasi |
| Penjelasan error/perbaikan apabila pernah gagal | Menunggu implementasi |

---

## 9. Catatan Pemeliharaan

Workflow perlu diperbarui apabila tim:

- mengganti versi PHP, Laravel, React, Node.js, atau Vite;
- beralih dari SQLite testing ke MySQL testing;
- menambahkan linter frontend atau unit test frontend;
- menambahkan proses deployment otomatis.
