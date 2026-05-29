# Dokumentasi Fitur Aplikasi

Dokumen ini memuat fitur pada proyek **Sistem Manajemen Pemesanan dan Reservasi QM Cafe & Billiard**.

> **Target kelengkapan:** dokumentasi fitur difinalkan pada Minggu ke-14 setelah analisis kebutuhan dan implementasi fitur utama telah stabil. Saat ini, bagian route/controller untuk fitur bisnis serta screenshot akan dilengkapi sesuai implementasi aktual.

---

## 1. Status Fitur pada Repository

Berdasarkan struktur route pada branch `main`, fondasi aplikasi saat ini sudah menyediakan route halaman utama, autentikasi, dashboard, dan pengelolaan profil. Fitur operasional QM Cafe & Billiard masih berstatus rencana implementasi.

| Fitur | Status Saat Ini | Bukti Teknis yang Perlu Dilengkapi |
|---|---|---|
| Autentikasi dasar dan profil | Fondasi tersedia | Screenshot UI dan hasil pengujian |
| Dashboard awal | Fondasi tersedia | Screenshot dashboard |
| Homepage khusus QM Cafe & Billiard | Direncanakan | Route, page React, screenshot |
| Menu, pemesanan, reservasi, pembayaran, laporan | Direncanakan | Route, controller/service, screenshot, test |

---

## 2. Aktor dan Hak Akses

| Aktor | Hak Akses Utama |
|---|---|
| Pengunjung | Melihat informasi publik, galeri, FAQ, testimoni, menu, dan ketersediaan meja. |
| Customer | Login; membuat pesanan dan reservasi; mengirim bukti pembayaran jika diperlukan; melihat status transaksi sendiri. |
| Admin/Cashier | Memverifikasi pembayaran transfer/QRIS; mengelola transaksi, menu, stok, dan data operasional. |
| Kitchen Staff | Memproses dan memperbarui status pesanan makanan/minuman. |
| Billiard Staff | Menangani sesi billiard dan Update Table Availability/Schedule. |
| Owner | Melihat laporan serta statistik usaha. |

---

# Fitur yang Telah Memiliki Fondasi Implementasi

## 3. Autentikasi Pengguna

### Tujuan

Memberikan akses akun yang aman bagi pengguna aplikasi sebelum menggunakan fitur yang memerlukan identitas pengguna.

### Aktor

Customer, Admin/Cashier, Kitchen Staff, Billiard Staff, Owner.

### Alur Dasar

```text
Pengguna registrasi atau login
→ sistem memvalidasi data akun
→ pengguna terautentikasi
→ pengguna dapat mengakses halaman sesuai otorisasi
```

### Route / Controller yang Tersedia

| Aktivitas | Route | Controller |
|---|---|---|
| Tampilkan form registrasi | `GET /register` | `RegisteredUserController@create` |
| Proses registrasi | `POST /register` | `RegisteredUserController@store` |
| Tampilkan form login | `GET /login` | `AuthenticatedSessionController@create` |
| Proses login | `POST /login` | `AuthenticatedSessionController@store` |
| Reset password | `GET/POST /forgot-password` dan `GET/POST /reset-password` | Controller autentikasi Laravel Breeze |
| Verifikasi email | `GET /verify-email/...` | `VerifyEmailController` |
| Logout | `POST /logout` | `AuthenticatedSessionController@destroy` |

### Catatan Pengembangan

Fondasi autentikasi sudah tersedia. Penambahan role dan permission untuk setiap aktor bisnis harus didokumentasikan setelah implementasi otorisasi selesai.

### Screenshot

Belum ditambahkan pada dokumentasi ini.

---

## 4. Dashboard dan Profil Pengguna

### Tujuan

Menyediakan halaman awal setelah login dan memungkinkan pengguna memperbarui profil.

### Aktor

Pengguna yang sudah login.

### Route / Controller yang Tersedia

| Aktivitas | Route | Keterangan |
|---|---|---|
| Menampilkan dashboard | `GET /dashboard` | Dilindungi middleware `auth` dan `verified` |
| Menampilkan form profil | `GET /profile` | `ProfileController@edit` |
| Memperbarui profil | `PATCH /profile` | `ProfileController@update` |
| Menghapus profil | `DELETE /profile` | `ProfileController@destroy` |

### Screenshot

Belum ditambahkan pada dokumentasi ini.

---

# Fitur Bisnis yang Direncanakan

## 5. Homepage dan Informasi Publik

### Tujuan

Memperkenalkan QM Cafe & Billiard kepada pengunjung dan menyediakan informasi umum tanpa mengharuskan login.

### Aktor

Pengunjung dan seluruh pengguna.

### Cakupan Informasi

- profil usaha;
- lokasi, kontak, dan jam operasional;
- galeri;
- FAQ;
- testimoni;
- menu;
- ketersediaan meja billiard.

### Alur

```text
Pengunjung membuka website
→ sistem menampilkan informasi publik
→ pengunjung dapat melihat menu atau ketersediaan meja
→ login diperlukan apabila ingin membuat pesanan atau reservasi
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 6. Pemesanan Makanan dan Minuman

### Tujuan

Memungkinkan customer membuat pesanan makanan atau minuman melalui aplikasi.

### Aktor

Customer, Kitchen Staff, Admin/Cashier.

### Aturan Akses

Customer harus login sebelum membuat pesanan. Pengunjung hanya dapat melihat daftar menu.

### Alur Utama

```text
Customer login
→ memilih menu
→ menentukan jumlah pesanan
→ mengonfirmasi pesanan
→ pesanan diterima Kitchen Staff
→ Kitchen Staff memperbarui status pesanan
→ Admin/Cashier memproses pembayaran terkait
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 7. Reservasi Billiard — Paket Regular

### Tujuan

Memungkinkan customer memesan meja billiard dengan durasi yang sudah ditentukan dan pembayaran di awal.

### Aktor

Customer, Admin/Cashier, Billiard Staff.

### Aturan Bisnis

- pilihan durasi disediakan sistem, misalnya 1, 2, atau 3 jam;
- customer melakukan pembayaran sebelum booking dinyatakan aktif;
- pembayaran transfer/QRIS diverifikasi manual oleh Admin/Cashier;
- meja dijadwalkan setelah pembayaran berhasil diverifikasi.

### Alur Utama

```text
Customer login
→ melihat ketersediaan meja
→ memilih Paket Regular, tanggal, waktu, dan durasi
→ sistem membuat reservasi menunggu pembayaran
→ customer mengunggah bukti pembayaran
→ Admin/Cashier memverifikasi
→ reservasi aktif
→ Billiard Staff memperbarui jadwal/ketersediaan meja
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 8. Reservasi Billiard — Paket Personal

### Tujuan

Memungkinkan customer mereservasi meja dan membayar berdasarkan durasi bermain aktual.

### Aktor

Customer, Billiard Staff, Admin/Cashier.

### Aturan Bisnis

- tidak ada pembayaran di awal untuk aktivasi reservasi;
- waktu mulai dan selesai sesi dicatat oleh staf;
- biaya dihitung setelah permainan selesai berdasarkan durasi aktual;
- pembayaran diproses setelah sesi selesai.

### Alur Utama

```text
Customer login
→ melihat ketersediaan meja
→ memilih Paket Personal dan membuat reservasi
→ Billiard Staff memulai sesi
→ sistem/staf mencatat durasi aktual
→ sesi selesai dan tagihan dihitung
→ customer melakukan pembayaran
→ Admin/Cashier menyelesaikan transaksi
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 9. Verifikasi Pembayaran

### Tujuan

Memastikan pembayaran transfer atau QRIS terkonfirmasi sebelum layanan tertentu diaktifkan atau transaksi diselesaikan.

### Aktor

Customer, Admin/Cashier.

### Alur Utama

```text
Customer memilih metode transfer/QRIS
→ customer mengunggah bukti pembayaran
→ transaksi berstatus menunggu verifikasi
→ Admin/Cashier membuka dashboard bukti pembayaran
→ pembayaran disetujui atau ditolak
→ status transaksi diperbarui
```

### Catatan

Verifikasi dilakukan secara manual. Integrasi payment gateway bukan bagian dari kebutuhan yang ditetapkan saat dokumen ini dibuat.

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 10. Update Table Availability/Schedule

### Tujuan

Menjaga informasi ketersediaan dan jadwal meja billiard tetap akurat.

### Aktor

Billiard Staff dan Admin/Cashier.

### Alur Utama

```text
Staf membuka daftar meja/jadwal
→ memilih meja atau reservasi
→ memperbarui status/jadwal
→ sistem menyimpan perubahan
→ informasi ketersediaan terbaru dapat dilihat pelanggan
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 11. Pengelolaan Menu dan Stok

### Tujuan

Memastikan data menu dan stok tersedia untuk mendukung pesanan customer.

### Aktor

Admin/Cashier.

### Operasi Utama

- menambahkan menu;
- memperbarui nama, deskripsi, harga, foto, dan status ketersediaan;
- menambah atau mengurangi stok;
- menonaktifkan menu yang tidak tersedia.

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 12. Pemrosesan Pesanan Dapur

### Tujuan

Memberikan antrian pesanan yang perlu disiapkan oleh Kitchen Staff.

### Aktor

Kitchen Staff.

### Alur Utama

```text
Pesanan customer terkonfirmasi
→ Kitchen Staff melihat daftar pesanan
→ status diperbarui: diterima / diproses / siap
→ customer dan Admin/Cashier dapat memantau status
```

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 13. Laporan dan Statistik Owner

### Tujuan

Menyediakan ringkasan informasi usaha untuk mendukung evaluasi dan pengambilan keputusan.

### Aktor

Owner.

### Data yang Direncanakan

- pendapatan berdasarkan periode;
- jumlah pesanan makanan/minuman;
- jumlah reservasi Regular dan Personal;
- penggunaan meja billiard;
- status pembayaran dan transaksi.

### Route / Controller dan Screenshot

Akan dilengkapi setelah implementasi.

---

## 14. Template Dokumentasi untuk Fitur Baru

Gunakan format berikut setiap kali fitur telah diimplementasikan:

```md
## [Nama Fitur]

### Tujuan
[Jelaskan tujuan fitur.]

### Aktor
[Sebutkan aktor yang menggunakan fitur.]

### Aturan Bisnis
[Tuliskan aturan penting fitur.]

### Alur Fitur
[Uraikan alur utama.]

### Route / Controller / Service
| Method | URI | Controller / Service | Keterangan |
|---|---|---|---|
| ... | ... | ... | ... |

### Screenshot
[Tambahkan screenshot aktual.]

### Status Pengujian
[Tambahkan hasil uji atau bukti fitur berjalan.]
```
