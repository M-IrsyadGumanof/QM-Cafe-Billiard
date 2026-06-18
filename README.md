# QM Cafe & Billiard

QM Cafe & Billiard adalah project PBL berbasis Laravel 13, Inertia, React, dan Tailwind CSS untuk mengelola informasi cafe, pemesanan makanan/minuman, cart, checkout, reservasi billiard, upload bukti pembayaran, verifikasi pembayaran manual, dashboard staff, dan laporan owner.

## Role Demo

| Role | Email | Password |
|---|---|---|
| Admin/Cashier | admin@qmcafe.com | Admin@12345 |
| Customer | customer@qmcafe.com | Customer@12345 |
| Kitchen Staff | kitchen@qmcafe.com | Kitchen@12345 |
| Billiard Staff | billiard@qmcafe.com | Billiard@12345 |
| Owner | owner@qmcafe.com | Owner@12345 |

## Fitur MVP

- Public website: home, about, contact, menu, menu detail, billiard packages, table availability, gallery, FAQ, testimonials.
- Auth: login, register customer, reset password, profile Breeze.
- Customer: dashboard, menu, cart, checkout, order history, reservation, payment upload, notifications.
- Admin/Cashier: dashboard, users, menu, categories, billiard tables, bookings, orders, payments, FAQ, reports, notifications.
- Kitchen Staff: dashboard order dan update status order.
- Billiard Staff: dashboard reservasi, table schedule, playing sessions, personal billing.
- Owner: dashboard dan reports sederhana.

## Cara Menjalankan

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate:fresh --seed
npm run dev
php artisan serve
```

Buka aplikasi:

```text
http://127.0.0.1:8000
```

## Konfigurasi Real-Time & Background Jobs (Local Development)

Mulai versi terbaru, project ini menggunakan Laravel Reverb dan sistem Queue (Database) untuk notifikasi *Real-Time* waktu bermain billiard yang hampir habis.
Untuk menjalankan seluruh *service* secara bersamaan (Server Web, Vite, Queue Worker, Reverb WebSocket, dan Scheduler), cukup gunakan satu command `dev`:

```bash
npm run dev
```

Command di atas otomatis menjalankan kelima proses tersebut di belakang layar menggunakan `concurrently`.

## Deployment ke Production

Saat deploy ke Production (VPS / Shared Hosting dengan akses SSH), pastikan Anda mensetup **Supervisor** atau daemon manager lainnya agar ketiga service berikut selalu berjalan:

1. **Queue Worker:** `php artisan queue:listen`
2. **Reverb Server:** `php artisan reverb:start`
3. **Scheduler:** Tambahkan entri Cron Job `* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1`

## Catatan Database

Default `.env.example` memakai SQLite. Jika memakai MySQL, ubah konfigurasi database di `.env` sesuai database lokal.

## Catatan Demo

Project ini disiapkan sebagai MVP siap demo PBL. Fitur production seperti audit log, backup, monitoring error, real-time notification, WhatsApp/email notification, export PDF/Excel, dan hardening server belum menjadi scope utama.
