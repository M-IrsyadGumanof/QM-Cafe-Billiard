# Riwayat Refactoring Kode - QM Cafe & Billiard

Dokumen ini mencatat riwayat pembenahan dan penyusunan ulang struktur kode internal (refactoring) yang telah dilakukan pada proyek **QM Cafe & Billiard** untuk meningkatkan readability, testability, dan kompabilitas sistem.

---

## 1. Refactoring: Penyelarasan Database Factories dan Kompatibilitas SQLite CI — 18 Juni 2026

### Masalah Sebelum Perubahan
Ketika repositori diintegrasikan dengan GitHub Actions, beberapa pengujian integrasi terkait reservasi billiard dan pemesanan menu gagal (*failed*). Hal ini disebabkan oleh:
1. Adanya ketidakcocokan sintaksis query pencarian tanggal (date query) antara MySQL dengan SQLite (yang digunakan di lingkungan testing CI).
2. Kesalahan *Mass Assignment Exception* pada beberapa model akibat properti `$fillable` yang belum lengkap ketika instansiasi data dummy melalui Database Factories.

### File yang Terlibat
| Jalur File (File Path) | Peran Sebelum Perubahan | Peran Setelah Perubahan |
| :--- | :--- | :--- |
| `tests/Feature/CustomerReservationTest.php` | Menggunakan raw query tanggal yang hanya kompatibel di MySQL. | Menggunakan query modular Eloquent yang kompatibel silang (cross-compatible). |
| `database/factories/` | Definisi factory kurang presisi untuk model-model baru. | Penyesuaian skema factory agar sinkron dengan model relasional. |
| `app/Models/Reservation.php` | Belum membatasi field mass assignment secara ketat. | Pengamanan field menggunakan properti `$fillable` terstruktur. |

### Perubahan Kode
- Mengubah kueri tanggal yang awalnya menggunakan fungsi SQL spesifik MySQL menjadi metode pembantu (helper) Eloquent bawaan Laravel (`whereDate`).
- Memperbarui database seeders dan factories agar menghasilkan relasi user dan table billiard yang valid saat test dijalankan.

### Alasan Teknis
Menjamin agar *test suite* dapat dijalankan secara konsisten di mesin lokal developer (yang mungkin memakai MySQL/SQLite) maupun di lingkungan virtual GitHub Actions CI (yang menggunakan SQLite in-memory).

### Dampak yang Dihasilkan
- Test suite lolos 100% di GitHub Actions.
- Mempermudah pembuatan data uji baru karena factory sudah andal dan presisi.

---

## 2. Refactoring: Penanganan Asset Loading Bersyarat di Vite untuk CI — 25 Juni 2026

### Masalah Sebelum Perubahan
Proses pengujian fitur (feature testing) Laravel yang merender antarmuka React/Inertia mencoba memanggil manifes kompilasi Vite. Di lingkungan CI, server Vite development tidak berjalan, sehingga pemanggilan helper `@vite` di template Blade menimbulkan *exception error* dan menggagalkan seluruh pengujian visual/halaman.

### File yang Terlibat
| Jalur File (File Path) | Peran Sebelum Perubahan | Peran Setelah Perubahan |
| :--- | :--- | :--- |
| `resources/views/app.blade.php` | Memanggil `@vite` secara langsung tanpa kondisi lingkungan. | Memuat aset secara bersyarat (conditional loading) khusus saat pengujian. |

### Perubahan Kode
Menambahkan pemeriksaan logika environment: jika aplikasi berada di lingkungan `testing` (CI), sistem akan menghindari pemanggilan hot-reload server Vite dan memuat aset cadangan/mocking agar view ter-render tanpa memicu error HTTP 500.

### Alasan Teknis
Memisahkan ketergantungan proses testing dari keberadaan server aset frontend (Vite port 5173).

### Dampak yang Dihasilkan
- Eksekusi testing di lingkungan CI berjalan lebih cepat.
- Tidak ada lagi kegagalan build testing akibat hilangnya tautan server Vite lokal.

---

## 3. Refactoring: Halaman Error Kustom dan Keamanan Frame Layout — 25 Juni 2026

### Masalah Sebelum Perubahan
1. Jika terjadi kesalahan otorisasi (403), rute tidak ditemukan (404), atau session expired (419), Laravel menyajikan halaman error default yang berwarna putih polos. Hal ini merusak estetika aplikasi yang didesain menggunakan tema gelap (Dark Theme).
2. Halaman error yang dimuat di dalam sub-iframe (seperti modal) tidak dapat mengalihkan halaman induk, menyebabkan kekacauan navigasi.
3. Proses pembaruan profil pengguna mengalihkan (redirect) ke rute yang salah dan memicu *blank screen*.

### File yang Terlibat
| Jalur File (File Path) | Peran Sebelum Perubahan | Peran Setelah Perubahan |
| :--- | :--- | :--- |
| `resources/views/errors/403.blade.php` | Halaman bawaan Laravel. | Halaman kustom bertema gelap dengan tautan relatif. |
| `resources/views/errors/404.blade.php` | Halaman bawaan Laravel. | Halaman kustom bertema gelap dengan tautan relatif. |
| `resources/views/errors/419.blade.php` | Halaman bawaan Laravel. | Halaman kustom bertema gelap dilengkapi atribut `target="_top"`. |
| `app/Http/Controllers/Customer/ProfileController.php` | Mengarahkan ke rute redirect yang tidak valid. | Memperbaiki respons redirect pasca-simpan data profil. |

### Perubahan Kode
- Mendesain ulang 3 file tampilan Blade error (403, 404, 419) dengan CSS Tailwind kustom bertema gelap.
- Menambahkan atribut HTML `target="_top"` pada tautan tombol kembali halaman error agar memaksa browser keluar dari frame bersarang (frame-breaking redirection).

### Alasan Teknis
Penyelarasan pengalaman pengguna (UX) agar tetap konsisten dalam satu tema visual gelap (Dark Mode) dan mengamankan navigasi antar-halaman.

### Dampak yang Dihasilkan
- Tampilan kesalahan sistem terlihat profesional dan selaras dengan tema aplikasi.
- Redirection profil berjalan mulus tanpa kendala layar putih kosong.

---

## 4. Refactoring: Standardisasi Codebase dan Laravel Pint — 2 Juli 2026

### Masalah Sebelum Perubahan
1. Penulisan kode PHP di berbagai file controller, model, request, dan test masih bervariasi (tidak seragam dalam penggunaan spasi, tanda kurung, indentasi, pengurutan impor, dsb).
2. Terdapat sisa-sisa state/variabel manual dismiss sesi aktif yang tidak terpakai pasca-implementasi sensor otomatis.

### File yang Terlibat
| Jalur File (File Path) | Peran Sebelum Perubahan | Peran Setelah Perubahan |
| :--- | :--- | :--- |
| `app/`, `database/`, `routes/`, `tests/` | Format berkas PHP bervariasi. | Format rapi seragam sesuai standar PSR-12 menggunakan Laravel Pint. |
| `resources/js/Pages/` | Memiliki sisa variabel manual dismiss sesi aktif. | Kode bersih dari fungsi manual dismiss, full otomatis. |

### Perubahan Kode
- Mengatur gaya penulisan kode PHP secara otomatis menggunakan tool Laravel Pint.
- Menghapus method `dismissSession` dan state `dismissedSessions` di seluruh file dashboard React/JSX.

### Alasan Teknis
Penyelarasan kualitas dan keterbacaan kode (*code readability*) di seluruh tim pengembang sesuai standar resmi ekosistem Laravel.

### Dampak yang Dihasilkan
- Riwayat git commit bersih dan konsisten.
- Seluruh 99 tes berjalan sukses dengan format kode yang rapi.

