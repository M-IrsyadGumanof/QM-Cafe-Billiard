# Panduan Skenario Demo Aplikasi - QM Cafe & Billiard

Dokumen ini disusun untuk memandu jalannya demonstrasi fungsionalitas sistem (PBL Demo) secara terpadu dari awal hingga akhir, melibatkan seluruh peran (*roles*) pengguna yang tersedia.

---

## 👥 Akun Demo Uji

Pastikan database telah di-seed (`php artisan migrate:fresh --seed`). Akun-akun berikut siap digunakan:

| Peran (Role) | Email | Password |
| :--- | :--- | :--- |
| **Admin/Cashier** | `admin@qmcafe.com` | `Admin@12345` |
| **Customer** | `customer@qmcafe.com` | `Customer@12345` |
| **Kitchen Staff** | `kitchen@qmcafe.com` | `Kitchen@12345` |
| **Billiard Staff** | `billiard@qmcafe.com` | `Billiard@12345` |
| **Owner** | `owner@qmcafe.com` | `Owner@12345` |

---

## 🔄 Alur Demonstrasi Terpadu

### Tahap 1: Pengunjung Publik (Guest)
1. Buka halaman utama aplikasi di: [http://127.0.0.1:8000](http://127.0.0.1:8000).
2. Navigasi ke halaman **Menu** untuk melihat katalog makanan/minuman publik. Gunakan fitur pencarian untuk mencari menu (misal: "Kopi").
3. Navigasi ke halaman **Paket Billiard** untuk melihat daftar paket yang ditawarkan beserta harga sewa per jam.
4. Navigasi ke halaman **Ketersediaan Meja** untuk mengecek status seluruh meja billiard secara real-time.
5. Klik **Login** untuk masuk ke portal transaksi.

### Tahap 2: Skenario Pelanggan (Customer)
1. Login menggunakan akun Customer: `customer@qmcafe.com` / `Customer@12345`.
2. **Pemesanan Makanan:**
   - Masuk ke menu **Order Menu**.
   - Tambahkan beberapa menu ke dalam keranjang belanja.
   - Buka keranjang belanja, tinjau kuantitas pesanan, lalu klik **Checkout**.
   - Anda akan diarahkan ke halaman riwayat belanja. Status transaksi adalah `Pending Payment`.
   - Klik **Upload Receipt**, pilih berkas gambar bukti transfer bank, lalu simpan. Status berubah menjadi `Waiting Verification`.
3. **Reservasi Meja Billiard:**
   - Navigasi ke menu **Book Table**.
   - Isi formulir reservasi: pilih nomor meja billiard, tanggal bermain, jam mulai, durasi sewa (misal: 2 jam), dan paket billiard yang diinginkan.
   - Kirim formulir. Anda akan diarahkan ke riwayat reservasi billiard dengan status `Pending Payment`.
   - Unggah bukti pembayaran untuk reservasi meja tersebut.

### Tahap 3: Verifikasi Keuangan oleh Admin/Kasir (Admin/Cashier)
1. Logout dari akun customer, kemudian login sebagai Admin: `admin@qmcafe.com` / `Admin@12345`.
2. Pada dashboard admin, perhatikan statistik jumlah transaksi baru yang masuk.
3. Masuk ke halaman **Payment Verification**. Anda akan melihat dua transaksi yang membutuhkan verifikasi (1 pesanan makanan dan 1 reservasi billiard).
4. Klik **Detail** pada pesanan makanan, tinjau gambar bukti transfer yang dikirim customer, lalu klik **Approve Payment**.
5. Ulangi proses yang sama untuk reservasi billiard, klik **Approve Payment**. Status reservasi kini menjadi `Approved` (Lunas).

### Tahap 4: Pengolahan Hidangan oleh Staf Dapur (Kitchen Staff)
1. Login sebagai Kitchen Staff: `kitchen@qmcafe.com` / `Kitchen@12345`.
2. Masuk ke halaman **Kitchen Dashboard**. Anda akan melihat antrean pesanan makanan customer yang baru saja diverifikasi lunas oleh admin.
3. Klik **Start Cooking** pada pesanan tersebut untuk mengubah status menjadi `Cooking`.
4. Jika masakan selesai, klik **Ready to Serve** (`Ready`).
5. Saat hidangan diantarkan ke meja customer, klik **Mark as Served** (`Served`) untuk menandakan pesanan selesai.

### Tahap 5: Pengelolaan Meja & Sesi Bermain oleh Staf Billiard (Billiard Staff)
1. Login sebagai Billiard Staff: `billiard@qmcafe.com` / `Billiard@12345`.
2. Masuk ke menu **Reservations**. Cari data reservasi billiard customer yang berstatus `Approved`.
3. Ketika customer tiba di lokasi pada jam reservasi, klik **Start Session**. Status meja billiard tersebut otomatis berubah menjadi **Playing** (Sedang Digunakan).

### Tahap 6: Uji Coba Alarm Sisa Waktu Bermain (Real-Time Notification & Alarm)
Untuk mendemonstrasikan alarm real-time 5 menit sebelum sewa habis secara manual:
1. Pastikan Anda membuka portal pelanggan (`customer@qmcafe.com`) di tab browser lain.
2. Buka terminal server, jalankan perintah otomatis checking scheduler:
   ```bash
   php artisan billiard:check-expiring-sessions
   ```
3. Di browser pelanggan, akan muncul notifikasi pop-up bertuliskan: **"Waktu bermain di Meja [Nomor] tersisa [X] menit!"** disertai dengan bunyi alarm berdering sebagai peringatan durasi bermain hampir habis.

### Tahap 7: Monitoring Pendapatan oleh Pemilik (Owner)
1. Login sebagai Owner: `owner@qmcafe.com` / `Owner@12345`.
2. Halaman dasbor owner akan menampilkan grafik statistik total omzet pendapatan dari penjualan kafe dan penyewaan meja billiard secara dinamis.
3. Owner dapat menyeleksi laporan keuangan berdasarkan rentang tanggal tertentu untuk dicetak atau disimpan.
