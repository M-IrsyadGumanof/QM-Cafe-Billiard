<?php

namespace App\Events;

use App\Models\Reservation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SessionExpiringEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Reservation $reservation,
        public int $remainingMinutes
    ) {}

    /**
     * Get the channels the event should broadcast on.
     * Broadcast ke private channel milik customer yang bersangkutan.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('customer.'.$this->reservation->user_id),
        ];
    }

    /**
     * Data yang dikirim bersama event ke frontend.
     *
     * @return array<string, mixed>
     */
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

    /**
     * Nama event yang diterima di frontend (default: nama class).
     * Frontend akan listen: channel.listen('SessionExpiringEvent', ...)
     */
    public function broadcastAs(): string
    {
        return 'SessionExpiringEvent';
    }
}
