<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'billiard_table_id',
        'billiard_package_id',
        'reservation_code',
        'package_type',
        'reservation_date',
        'start_time',
        'end_time',
        'duration_minutes',
        'actual_start_time',
        'actual_end_time',
        'actual_duration_minutes',
        'total_price',
        'booking_status',
        'payment_status',
        'notes',
        'expiry_notified',
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'actual_start_time' => 'datetime',
        'actual_end_time' => 'datetime',
        'expiry_notified' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(BilliardTable::class, 'billiard_table_id');
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(BilliardPackage::class, 'billiard_package_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    protected static function booted(): void
    {
        static::updating(function ($reservation) {
            // Ketika status berubah menjadi playing
            if ($reservation->isDirty('booking_status') && $reservation->booking_status === 'playing') {
                if (! $reservation->actual_start_time) {
                    $reservation->actual_start_time = now();
                }

                // Ubah status meja menjadi occupied
                if ($reservation->billiard_table_id) {
                    BilliardTable::where('id', $reservation->billiard_table_id)
                        ->update(['status' => 'occupied']);
                }
            }

            // Ketika status berubah menjadi completed
            if ($reservation->isDirty('booking_status') && $reservation->booking_status === 'completed') {
                if (! $reservation->actual_end_time) {
                    $reservation->actual_end_time = now();
                }
                if ($reservation->actual_start_time) {
                    $reservation->actual_duration_minutes = (int) $reservation->actual_start_time->diffInMinutes($reservation->actual_end_time);
                }

                // Ubah status meja menjadi available
                if ($reservation->billiard_table_id) {
                    BilliardTable::where('id', $reservation->billiard_table_id)
                        ->update(['status' => 'available']);
                }
            }

            // Ketika status berubah menjadi cancelled
            if ($reservation->isDirty('booking_status') && $reservation->booking_status === 'cancelled') {
                // Ubah status meja menjadi available
                if ($reservation->billiard_table_id) {
                    BilliardTable::where('id', $reservation->billiard_table_id)
                        ->update(['status' => 'available']);
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // Scopes
    // -------------------------------------------------------------------------

    /**
     * Scope untuk query reservasi yang sedang aktif bermain.
     * Digunakan oleh CheckExpiringSessionsCommand untuk mencari sesi yang perlu dinotifikasi.
     */
    public function scopeActivePlaying(Builder $query): Builder
    {
        return $query->where('booking_status', 'playing');
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Menghitung sisa menit bermain berdasarkan actual_start_time + duration_minutes.
     * Mengembalikan null jika actual_start_time atau duration_minutes belum diisi.
     * Mengembalikan 0 jika waktu sudah habis.
     */
    public function getRemainingMinutesAttribute(): ?int
    {
        if (! $this->actual_start_time || ! $this->duration_minutes) {
            return null;
        }

        // Gunakan ->copy() agar tidak merubah data aslinya (karena Carbon mutable)
        $endTime = $this->actual_start_time->copy()->addMinutes($this->duration_minutes);

        return (int) max(0, now()->diffInMinutes($endTime, false));
    }
}
