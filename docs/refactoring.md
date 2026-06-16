# Dokumentasi Refactoring

> **Status:** dokumen ini dipersiapkan sebagai format pencatatan. Riwayat refactoring aktual akan dilengkapi pada tahap final setelah terdapat perubahan kode yang benar-benar dilakukan dan dapat dibuktikan melalui commit.

---

## 1. Tujuan Refactoring

Refactoring adalah perubahan struktur internal kode tanpa mengubah perilaku utama aplikasi. Dalam proyek QM Cafe & Billiard, refactoring diperlukan agar kode:

- lebih mudah dibaca dan dipelihara;
- tidak menumpuk pada controller atau komponen tertentu;
- lebih mudah diuji;
- konsisten ketika dikerjakan oleh beberapa anggota tim.

---

## 2. Prinsip Dokumentasi

Sebuah refactoring hanya dicatat sebagai **sudah dilakukan** apabila memenuhi bukti berikut:

| Bukti | Keterangan |
|---|---|
| Masalah sebelum perubahan | Dijelaskan berdasarkan kode yang benar-benar ada. |
| Perubahan kode | Menyebutkan file/class/component yang berubah. |
| Alasan teknis | Menjelaskan mengapa struktur baru lebih baik. |
| Dampak | Menjelaskan efek pada readability, testability, atau maintenance. |
| Bukti commit / pull request | Dicantumkan setelah perubahan masuk repository. |
| Pengujian | Menyebutkan test atau pemeriksaan yang dijalankan. |

---

## 3. Kandidat Refactoring yang Relevan

Bagian berikut adalah rencana evaluasi, bukan klaim bahwa perubahan telah dilakukan.

### 3.1 Memindahkan Validasi ke FormRequest

**Potensi masalah:**  
Validasi untuk pemesanan, reservasi, atau verifikasi pembayaran dapat membuat controller terlalu panjang apabila ditulis langsung pada method controller.

**Rencana perubahan:**  
Membuat class FormRequest, misalnya:

```text
StoreOrderRequest
StoreRegularReservationRequest
StorePersonalReservationRequest
VerifyPaymentRequest
```

Controller kemudian menerima data yang telah tervalidasi melalui method `validated()`.

**Alasan:**  
Memisahkan tanggung jawab validasi dari logic proses bisnis.

**Dampak yang diharapkan:**  
Controller lebih ringkas, rule validasi lebih mudah dipelihara, dan pesan error lebih konsisten.

---

### 3.2 Memindahkan Business Logic ke Service Class

**Potensi masalah:**  
Perhitungan biaya durasi billiard, aktivasi reservasi setelah pembayaran, dan perubahan status transaksi dapat kompleks jika ditaruh seluruhnya pada controller.

**Rencana perubahan:**

```text
ReservationController → ReservationService
PaymentController     → PaymentVerificationService
BilliardSessionController → BilliardBillingService
```

**Dampak yang diharapkan:**  
Logic dapat diuji secara terpisah dan dipakai kembali tanpa menduplikasi kode.

---

### 3.3 Menetapkan Policy atau Middleware Role

**Potensi masalah:**  
Akses menu operasional berbeda antara Customer, Admin/Cashier, Kitchen Staff, Billiard Staff, dan Owner.

**Rencana perubahan:**  
Menghindari pemeriksaan role yang berulang di controller/component dengan menggunakan policy atau middleware role yang terstruktur.

**Dampak yang diharapkan:**  
Otorisasi lebih konsisten dan mudah diaudit.

---

### 3.4 Merapikan Komponen React yang Berulang

**Potensi masalah:**  
Komponen tabel, modal verifikasi, form input, atau status badge berpotensi ditulis berulang pada banyak page.

**Rencana perubahan:**  
Membuat komponen reusable untuk elemen UI yang dipakai di beberapa fitur.

**Dampak yang diharapkan:**  
Tampilan lebih konsisten dan pemeliharaan frontend lebih mudah.

---

## 4. Template Riwayat Refactoring Aktual

Gunakan format berikut pada tahap final:

```md
## Refactoring: [Nama Refactoring] — [Tanggal]

### Masalah Sebelum Perubahan
[Jelaskan masalah nyata sebelum refactoring.]

### File yang Terlibat
| File | Peran Sebelum | Peran Sesudah |
|---|---|---|
| `path/file.php` | ... | ... |

### Perubahan
[Jelaskan perubahan struktur kode.]

### Alasan
[Jelaskan alasan teknis.]

### Dampak
[Jelaskan hasil perbaikan.]

### Bukti
- Commit/PR: `[isi setelah tersedia]`
- Test atau pemeriksaan: `[isi perintah dan hasil setelah tersedia]`
- Screenshot/diff: `[lampirkan bila dibutuhkan]`
```

---

## 5. Riwayat Refactoring

Belum ada entri refactoring final pada dokumen ini. Tambahkan entri setelah perubahan kode dilakukan, diuji, dan masuk ke repository.
