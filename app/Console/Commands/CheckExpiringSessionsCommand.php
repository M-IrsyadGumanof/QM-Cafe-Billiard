<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use App\Models\QmNotification;
use App\Events\SessionExpiringEvent;
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
    protected $description = 'Check for billiard sessions expiring in 5 minutes and send notifications';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $reservations = Reservation::with(['user', 'table', 'package'])
            ->activePlaying()
            ->get()
            ->filter(function ($reservation) {
                $remaining = $reservation->remaining_minutes;
                // Notifikasi saat tersisa 5 menit (antara 4-5 menit, agar tidak duplikat)
                return $remaining !== null && $remaining <= 5 && $remaining >= 4;
            });

        foreach ($reservations as $reservation) {
            // Cek apakah notifikasi sudah dikirim (pakai cache untuk hindari duplikat)
            $cacheKey = "session_expiring_notified:{$reservation->id}";
            if (!Cache::has($cacheKey)) {
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

        $this->info("Checked {$reservations->count()} expiring sessions.");
    }
}
