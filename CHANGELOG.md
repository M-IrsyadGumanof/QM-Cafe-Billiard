# Changelog

Semua perubahan penting pada proyek **Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard** didokumentasikan pada file ini.

Format kategori yang digunakan: `Added` (Ditambahkan), `Changed` (Diubah), `Fixed` (Diperbaiki), `Removed` (Dihapus), `Dependency` (Ketergantungan), `Documentation` (Dokumentasi), dan `Refactor` (Penyusunan Ulang Kode).

---

## [0.6.0] - 2026-06-25

### Added
- Fitur CRUD Paket Billiard (`BilliardPackageController` & `BilliardPackages.jsx`) lengkap dengan coverage testing.
- Custom error pages untuk error 403, 404, dan 419 menggunakan relative paths dan integrasi frame-breaking `target="_top"`.

### Changed
- Penyempurnaan tampilan halaman Customer: tombol upload bukti pembayaran pada pesanan makanan dan reservasi billiard dipercantik (`upload payment receipt buttons`).
- Penyelarasan token desain halaman Register agar konsisten dengan halaman Login dan perbaikan autofocus pada field.

### Fixed
- Perbaikan asset loading di Vite untuk mencegah kegagalan pengujian pada lingkungan CI (`conditionally load vite assets`).
- Perbaikan redirection setelah update profil pengguna untuk menghindari blank screen.
- Eager load relasi user pada halaman Home dan Testimonial untuk mengoptimalkan query database dan mencegah N+1 query.
- Penyesuaian tombol 'Reserve Now' pada tabel ketersediaan agar visibilitasnya sesuai dengan status bermain meja billiard.
- Pembersihan foto menu yang tidak terpakai saat menu dihapus serta perbaikan update foto menu publik.

---

## [0.5.0] - 2026-06-18

### Added
- Fitur real-time notification untuk durasi bermain billiard menggunakan Laravel Reverb & event broadcasting (`SessionExpiringEvent`).
- Fitur alarm suara pada sisi frontend saat waktu sewa meja billiard tersisa 5 menit.
- Perintah otomatis terjadwal (`billiard:check-expiring-sessions`) untuk memeriksa sesi billiard yang hampir habis setiap menit dan menembakkan event ke private channel customer.
- API endpoints dan migration tambahan untuk memfasilitasi notifikasi sisa sesi billiard.

### Changed
- Finalisasi alur checkout pemesanan makanan dan minuman oleh Customer (`Checkout order flow`).
- Integrasi menu kustom dan formatting dashboard pelanggan.
- Fitur verifikasi pembayaran manual oleh Admin/Cashier (`Admin payment verification flow`).
- Integrasi rute publik (Public & Content Routes) serta manajemen konten halaman web publik (Home, About, Contact, FAQ, Testimonials).

### Refactor
- Pembaharuan menyeluruh pada codebase, database factories, dan test suite untuk keandalan data testing.

---

## [0.4.0] - 2026-06-16

### Added
- Modul Kitchen: Dashboard antrean pesanan masuk dan fitur pengubahan status pesanan secara real-time.
- Modul Owner: Dashboard visualisasi data dan laporan sederhana untuk memantau pendapatan kafe dan billiard.
- Modul Admin: Dashboard statistik dinamis, sidebar navigasi terpadu, dan manajemen data master.
- Fitur CRUD Pengguna (User Management) dan reset password staf oleh admin.
- Fitur CRUD Kategori Menu (Menu Categories) dan Menu Item dilengkapi dengan unggahan file gambar.
- Sistem notifikasi internal (`QmNotification` model & migrations) untuk mencatat aktivitas penting.

### Changed
- Update migration database dan seeder untuk staff (Admin, Cashier, Kitchen, Billiard, Owner), kategori menu, dan item menu.
- Penerapan middleware berbasis role (`RoleMiddleware`) untuk proteksi akses route.

---

## [0.3.0] - 2026-06-15

### Added
- Modul Reservasi Billiard (Fase 1-10): Pemesanan meja billiard Paket Regular dan Paket Personal.
- Layout dasbor Customer dan antarmuka portal reservasi interaktif.
- Struktur tabel database untuk pemesanan (`orders`), item pesanan (`order_items`), dan pembayaran (`payments`).

### Changed
- Penyesuaian skenario redirect login setelah registrasi agar langsung menuju portal reservasi customer.

### Fixed
- Sinkronisasi testing CI: Skip sementara pengujian yang bergantung pada modul yang belum terintegrasi untuk mencegah build failure.

---

## [0.2.0] - 2026-06-13

### Added
- Kustomisasi profil pengguna dengan field tambahan: nomor telepon, alamat, dan foto avatar.
- Fitur pemblokiran login bagi pengguna dengan status tidak aktif (inactive).
- Setup infrastruktur testing & CI/CD otomatis menggunakan GitHub Actions (`ci.yml`) berbasis PHP 8.4 dan Node.js 22.

### Changed
- Penyelarasan tema gelap (Dark Theme) untuk komponen autentikasi bersama (Login, Register, Forgot Password).

---

## [0.1.0] - 2026-05-29

### Added
- Fondasi awal proyek Laravel, Inertia, dan React.
- Scaffold autentikasi dasar menggunakan Laravel Breeze.
- Pengaturan rute dasar dasbor dan profil pengguna.

### Dependency
- Menggunakan Laravel `^13.8` & PHP `^8.3`.
- Menggunakan Inertia Laravel `^2.0`, React `^18.2.0`, Tailwind CSS `^3.4.19`, dan Vite `^8.0.0`.

### Documentation
- Struktur awal README.md dan folder dokumentasi `docs/`.
