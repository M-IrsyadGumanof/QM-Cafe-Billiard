<?php

namespace App\Console\Commands;

use App\Events\SessionExpiredEvent;
use App\Events\SessionExpiringEvent;
use App\Models\QmNotification;
use App\Models\Reservation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class CheckExpiringSessionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'billiard:check-expiring-sessions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for billiard sessions expiring or expired and send notifications';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $reservations = Reservation::with(['user', 'table', 'package'])
            ->activePlaying()
            ->get();

        // 1. Sesi yang hampir habis (4-5 menit tersisa)
        $expiring = $reservations->filter(function ($reservation) {
            $remaining = $reservation->remaining_minutes;

            return $remaining !== null && $remaining <= 5 && $remaining >= 4;
        });

        foreach ($expiring as $reservation) {
            // Cek apakah notifikasi sudah dikirim (pakai cache untuk hindari duplikat)
            $cacheKey = "session_expiring_notified:{$reservation->id}";
            if (! Cache::has($cacheKey)) {
                event(new SessionExpiringEvent($reservation, $reservation->remaining_minutes));

                // Simpan juga ke database QmNotification
                QmNotification::create([
                    'user_id' => $reservation->user_id,
                    'target_role' => 'customer',
                    'title' => 'Waktu Bermain Hampir Habis!',
                    'message' => "Sisa waktu bermain di {$reservation->table?->name}: {$reservation->remaining_minutes} menit",
                    'type' => 'session_expiring',
                ]);

                // Set cache 10 menit agar tidak kirim duplikat
                Cache::put($cacheKey, true, now()->addMinutes(10));
            }
        }

        // 2. Sesi yang telah habis (0 menit atau kurang tersisa)
        $expired = $reservations->filter(function ($reservation) {
            $remaining = $reservation->remaining_minutes;

            return $remaining !== null && $remaining <= 0;
        });

        foreach ($expired as $reservation) {
            $expiredCacheKey = "session_expired_notified:{$reservation->id}";
            if (! Cache::has($expiredCacheKey)) {
                // Notifikasi untuk customer
                QmNotification::create([
                    'user_id' => $reservation->user_id,
                    'target_role' => 'customer',
                    'title' => 'Waktu Bermain Habis!',
                    'message' => "Waktu bermain Anda di {$reservation->table?->name} telah habis. Terima kasih!",
                    'type' => 'session_expired',
                ]);

                // Notifikasi untuk admin
                QmNotification::create([
                    'target_role' => 'admin',
                    'title' => 'Sesi Bermain Habis!',
                    'message' => "Sesi bermain di {$reservation->table?->name} (Reservasi: {$reservation->reservation_code}) telah habis.",
                    'type' => 'session_expired',
                ]);

                // Notifikasi untuk billiard staff
                QmNotification::create([
                    'target_role' => 'billiard_staff',
                    'title' => 'Sesi Bermain Habis!',
                    'message' => "Sesi bermain di {$reservation->table?->name} (Reservasi: {$reservation->reservation_code}) telah habis.",
                    'type' => 'session_expired',
                ]);

                // Broadcast event ke customer channel
                event(new SessionExpiredEvent($reservation));

                // Cache 24 jam agar tidak kirim duplikat untuk sesi yang sama
                Cache::put($expiredCacheKey, true, now()->addHours(24));
            }
        }

        $this->info("Checked {$expiring->count()} expiring sessions.");
        $this->info("Checked {$expired->count()} expired sessions.");
    }
}
