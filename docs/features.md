# Spesifikasi Fitur Terimplementasi - QM Cafe & Billiard

Dokumen ini mendokumentasikan seluruh modul dan fitur yang telah berhasil diimplementasikan (`[x]`) pada aplikasi **QM Cafe & Billiard**.

---

## 🌐 1. Portal Publik (Guest / Pengunjung)
Halaman yang dapat diakses oleh publik tanpa memerlukan login:

- **[x] Beranda (Home):** Landing page dengan banner dinamis, deskripsi singkat bisnis, tautan cepat, dan daftar testimoni pelanggan.
- **[x] Tentang Kami (About Us):** Informasi latar belakang QM Cafe & Billiard, lokasi, jam operasional, dan keunggulan layanan.
- **[x] Hubungi Kami (Contact):** Formulir kontak untuk mengirimkan pesan/pertanyaan beserta peta lokasi Google Maps.
- **[x] Menu Cafe:** Menampilkan seluruh daftar makanan dan minuman lengkap dengan kategori, filter pencarian menu, harga, status ketersediaan, serta modal detail deskripsi menu.
- **[x] Paket Billiard:** Menampilkan daftar paket billiard yang tersedia (Regular, VIP, dll.) beserta harga sewa per jam dan fasilitasnya.
- **[x] Ketersediaan Meja (Table Availability):** Visualisasi daftar meja billiard beserta status terisi (`Playing`), sedang dipersiapkan (`Ready`), atau dalam reservasi (`Reserved`).
- **[x] FAQ & Testimoni:** Halaman interaktif tanya jawab umum dan daftar ulasan pelanggan.
- **[x] Galeri:** Foto-foto dokumentasi suasana kafe dan area billiard.

---

## 👥 2. Portal Pelanggan (Customer)
Halaman khusus bagi pelanggan yang telah melakukan login untuk bertransaksi:

- **[x] Registrasi Mandiri:** Pendaftaran akun baru dengan validasi nomor telepon dan alamat.
- **[x] Kustomisasi Profil:** Mengubah informasi profil, mengganti kata sandi, dan mengunggah foto avatar.
- **[x] Pemesanan Makanan & Minuman:**
  - **[x] Keranjang Belanja (Cart):** Menyimpan daftar menu pilihan ke dalam keranjang lokal (`localStorage`).
  - **[x] Checkout Order:** Memproses pesanan makanan/minuman dengan metode pembayaran transfer/QRIS.
  - **[x] Riwayat Pesanan (Order History):** Melihat status proses makanan dan mengunduh detail pesanan.
- **[x] Reservasi Meja Billiard:**
  - **[x] Formulir Pemesanan:** Reservasi meja billiard dengan menentukan tanggal, jam mulai, durasi bermain, serta pemilihan paket billiard.
  - **[x] Riwayat Reservasi:** Monitoring status reservasi (Pending -> Approved/Playing -> Completed).
- **[x] Unggah Bukti Pembayaran:** Fitur mengunggah berkas gambar bukti transfer bank atau scan QRIS untuk pesanan makanan maupun reservasi billiard.
- **[x] Real-Time Session Alert:**
  - **[x] Alarm Durasi:** Menerima notifikasi langsung pada browser ketika waktu sewa meja billiard tersisa 5 menit.
  - **[x] Efek Suara:** Menyalakan alarm audio otomatis untuk memperingatkan pengguna agar bersiap menyelesaikan permainan atau melakukan perpanjangan.
- **[x] Pusat Notifikasi:** Membaca pesan pemberitahuan yang dikirimkan oleh sistem atau admin.

---

## 🔑 3. Portal Administrasi (Admin / Cashier)
Panel kontrol utama untuk memelihara data master dan mengonfirmasi transaksi keuangan:

- **[x] Dashboard Statistik:** Menampilkan data ringkasan total pengguna, total menu, antrean order makanan aktif, dan reservasi meja hari ini.
- **[x] Manajemen Pengguna (Users):** Fitur CRUD (Create, Read, Update, Delete) pengguna, menentukan level hak akses (Admin, Kitchen, Billiard, Owner, Customer), serta mereset sandi staf.
- **[x] Manajemen Menu & Kategori:**
  - **[x] CRUD Kategori:** Mengelompokkan makanan dan minuman.
  - **[x] CRUD Menu:** Mengelola informasi item menu, harga, status ketersediaan, serta kustomisasi gambar (crop, zoom, drag) dan mengunggah foto menu baru (dilengkapi penghapusan otomatis gambar lama di storage).
- **[x] CRUD Paket Billiard:** Mengelola data paket billiard beserta deskripsi fasilitas, harga per jam, jenis meja, dan pengujian unit test.
- **[x] CRUD Meja Billiard (Billiard Tables):** Mengelola nomor meja billiard dan tipe fasilitas.
- **[x] Verifikasi Pembayaran (Payment Verification):**
  - **[x] Peninjauan Bukti Transfer:** Melihat lampiran gambar bukti transfer yang dikirim customer.
  - **[x] Aksi Approval/Rejection:** Mengubah status pembayaran menjadi `Paid` (Lunas) atau `Rejected` (Ditolak) secara manual.
- **[x] Manajemen Konten:** Mengelola data FAQ, Testimoni, dan Galeri untuk website publik (dilengkapi pemotongan gambar kustom pada foto galeri baru).
- **[x] Laporan Transaksi:** Filter data transaksi kafe dan reservasi billiard berdasarkan rentang tanggal.

---

## 🍳 4. Portal Dapur (Kitchen Staff)
Antarmuka khusus yang dirancang responsif untuk staf dapur:

- **[x] Antrean Pesanan Masuk:** Menampilkan daftar antrean makanan dan minuman yang harus dimasak secara real-time.
- **[x] Pembaruan Status Hidangan:** Mengubah status pengerjaan pesanan (`Pending` -> `Cooking` -> `Ready` -> `Served`).

---

## 🎱 5. Portal Staf Billiard (Billiard Staff)
Antarmuka khusus untuk pengelola meja billiard di lapangan:

- **[x] Dasbor Aktivitas Meja:** Memantau meja billiard yang sedang digunakan beserta sisa durasi bermain masing-masing meja.
- **[x] Manajemen Jadwal Reservasi:** Memverifikasi kedatangan pelanggan dan mengubah status meja menjadi `Playing` (Mulai Bermain).
- **[x] Personal Package Billing:** Menangani kebutuhan sewa meja billiard yang dimulai langsung di tempat (walk-in) dan penambahan billing personal.

---

## 📊 6. Portal Pemilik (Owner)
Portal pemantauan bisnis jarak jauh bagi pemilik QM Cafe & Billiard:

- **[x] Dasbor Eksekutif:** Visualisasi grafik pendapatan bulanan, total omzet kafe, dan total omzet billiard.
- **[x] Laporan Keuangan Terpadu:** Akses laporan keuangan historis untuk kebutuhan audit internal.
