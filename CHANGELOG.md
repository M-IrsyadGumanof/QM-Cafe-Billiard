# Changelog

Semua perubahan penting pada proyek **Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard** didokumentasikan pada file ini.

Format kategori yang digunakan: `Added`, `Changed`, `Fixed`, `Removed`, `Dependency`, `Documentation`, dan `Refactor`.

> Catatan: entri dokumentasi pada versi awal ini berlaku ketika berkas dokumentasi digabungkan ke repository. Perbarui tanggal rilis sesuai tanggal commit atau merge aktual.

---

## [Unreleased]

### Planned

- Implementasi homepage dan informasi publik QM Cafe & Billiard.
- Implementasi role: Customer, Admin/Cashier, Kitchen Staff, Billiard Staff, dan Owner.
- Implementasi menu serta pemesanan makanan/minuman untuk customer login.
- Implementasi reservasi billiard Paket Regular dan Paket Personal.
- Implementasi dashboard verifikasi pembayaran transfer/QRIS secara manual.
- Implementasi Update Table Availability/Schedule.
- Implementasi laporan dan statistik untuk Owner.
- Implementasi workflow GitHub Actions/CI.

---

## [0.1.0] - 2026-05-29

### Added

- Fondasi project Laravel, Inertia, dan React.
- Autentikasi dasar menggunakan Laravel Breeze.
- Route dashboard dan pengelolaan profil pengguna.

### Dependency

- Menggunakan Laravel `^13.8`.
- Menggunakan PHP `^8.3`.
- Menggunakan Inertia Laravel `^2.0`, React `^18.2.0`, Tailwind CSS `^3.4.19`, dan Vite `^8.0.0`.
- Menggunakan Laravel Breeze `^2.4` sebagai dependency development untuk scaffolding autentikasi.
- Menggunakan PHPUnit `^12.5.12` dan Laravel Pint `^1.27` untuk pengujian serta konsistensi kode.

### Documentation

- Menyusun ulang `README.md` sesuai ruang lingkup proyek dan kondisi repository.
- Menambahkan `CHANGELOG.md`.
- Menambahkan dokumentasi instalasi pada `docs/installation.md`.
- Menambahkan dokumentasi fitur awal pada `docs/features.md`.
- Menambahkan dokumentasi dependency aktual dan rencana pada `docs/dependency.md`.
- Menambahkan template dokumentasi refactoring pada `docs/refactoring.md`.
- Menambahkan rencana dokumentasi GitHub Actions pada `docs/github-actions.md`.

---

## Template Entry Mingguan

Salin format berikut ketika terdapat perubahan baru:

```md
## [Unreleased] atau [versi] - YYYY-MM-DD

### Added
- Fitur atau file baru yang ditambahkan.

### Changed
- Perubahan perilaku atau tampilan yang sudah ada.

### Fixed
- Bug yang diperbaiki.

### Dependency
- Package baru, update versi, atau penghapusan package.

### Refactor
- Perubahan struktur kode tanpa mengubah fungsi utama.

### Documentation
- Pembaruan dokumen atau screenshot.
```
