<?php

namespace App\Events;

use App\Models\Reservation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SessionExpiringEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Reservation $reservation,
        public int $remainingMinutes
    ) {}

    public function broadcastOn(): array
    {
        // Broadcast ke private channel milik customer
        return [new PrivateChannel('customer.' . $this->reservation->user_id)];
    }

    public function broadcastWith(): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'reservation_code' => $this->reservation->reservation_code,
            'table_name' => $this->reservation->table?->name,
            'remaining_minutes' => $this->remainingMinutes,
            'end_time' => $this->reservation->end_time,
            'message' => "Waktu bermain di {$this->reservation->table?->name} tersisa {$this->remainingMinutes} menit!",
        ];
    }
}
