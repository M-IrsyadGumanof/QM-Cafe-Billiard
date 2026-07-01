<?php

namespace App\Http\Controllers\Customer;

use App\Events\SessionExpiredEvent;
use App\Http\Controllers\Controller;
use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\QmNotification;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Customer/Reservations', [
            'reservations' => auth()->user()->reservations()->with(['table', 'package'])->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Customer/ReservationCreate', [
            'tables' => BilliardTable::whereIn('status', ['available', 'reserved'])->orderBy('table_number')->get(),
            'packages' => BilliardPackage::where('status', 'active')->orderBy('type')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'billiard_table_id' => 'required|exists:billiard_tables,id',
            'billiard_package_id' => 'required|exists:billiard_packages,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'duration_minutes' => 'nullable|integer|min:30|max:360',
            'notes' => 'nullable|string|max:1000',
        ]);

        $table = BilliardTable::findOrFail($validated['billiard_table_id']);
        abort_if(in_array($table->status, ['occupied', 'maintenance'], true), 422, 'Meja sedang tidak tersedia.');

        $package = BilliardPackage::findOrFail($validated['billiard_package_id']);
        $duration = $package->type === 'regular' ? $package->duration_minutes : ($validated['duration_minutes'] ?? 60);
        $start = Carbon::parse($validated['reservation_date'].' '.$validated['start_time']);
        $end = $start->copy()->addMinutes($duration);

        $conflict = Reservation::where('billiard_table_id', $table->id)
            ->where('reservation_date', $validated['reservation_date'])
            ->whereNotIn('booking_status', ['cancelled', 'completed'])
            ->where(function ($query) use ($validated, $end) {
                $query->whereBetween('start_time', [$validated['start_time'], $end->format('H:i')])
                    ->orWhereBetween('end_time', [$validated['start_time'], $end->format('H:i')]);
            })->exists();

        abort_if($conflict, 422, 'Jadwal meja bentrok dengan reservasi lain.');

        $reservation = Reservation::create([
            'user_id' => auth()->id(),
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'reservation_code' => $this->generateReservationCode(),
            'package_type' => $package->type,
            'reservation_date' => $validated['reservation_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $end->format('H:i'),
            'duration_minutes' => $duration,
            'total_price' => $package->type === 'regular' ? $package->price : 0,
            'booking_status' => 'pending',
            'payment_status' => $package->type === 'personal' ? 'paid_after_play' : 'unpaid',
            'notes' => $validated['notes'] ?? null,
        ]);

        QmNotification::create([
            'target_role' => 'admin',
            'title' => 'New Reservation',
            'message' => 'Reservasi '.$reservation->reservation_code.' menunggu pengecekan admin/cashier.',
            'type' => 'reservation',
        ]);

        return redirect()->route('customer.reservations.show', $reservation)->with('success', 'Reservasi berhasil dibuat.');
    }

    public function show(Reservation $reservation): Response
    {
        abort_unless($reservation->user_id === auth()->id(), 403);

        return Inertia::render('Customer/ReservationDetail', [
            'reservation' => $reservation->load(['table', 'package', 'payments']),
        ]);
    }

    /**
     * API: Cek apakah customer memiliki sesi bermain yang sedang aktif.
     * Digunakan oleh frontend untuk menampilkan countdown timer saat halaman pertama kali di-load.
     */
    public function activeSession(): JsonResponse
    {
        $session = Reservation::with(['table', 'package'])
            ->where('user_id', auth()->id())
            ->activePlaying()
            ->first();

        if (! $session) {
            return response()->json(['active' => false]);
        }

        return response()->json([
            'active' => true,
            'reservation_id' => $session->id,
            'reservation_code' => $session->reservation_code,
            'table_name' => $session->table?->name,
            'package_name' => $session->package?->name,
            'remaining_minutes' => $session->remaining_minutes,
            'end_time' => $session->end_time,
            'start_time' => $session->start_time,
            'actual_start_time' => $session->actual_start_time?->toIso8601String(),
            'duration_minutes' => $session->duration_minutes,
        ]);
    }

    public function handleExpiredSession(Reservation $reservation): JsonResponse
    {
        abort_unless($reservation->user_id === auth()->id(), 403);

        if ($reservation->booking_status === 'playing') {
            $cacheKey = "session_expired_notified:{$reservation->id}";
            if (! cache()->has($cacheKey)) {
                cache()->put($cacheKey, true, now()->addDay());

                // Customer notification
                QmNotification::create([
                    'user_id' => $reservation->user_id,
                    'target_role' => 'customer',
                    'title' => 'WAKTU BERMAIN SELESAI',
                    'message' => "Waktu bermain Anda di {$reservation->table?->name} telah habis!",
                    'type' => 'session_expired',
                    'is_read' => false,
                ]);

                // Admin notification
                QmNotification::create([
                    'target_role' => 'admin',
                    'title' => 'Sesi Bermain Habis',
                    'message' => "Sesi bermain customer {$reservation->user?->name} di {$reservation->table?->name} telah habis.",
                    'type' => 'session_expired',
                    'is_read' => false,
                ]);

                // Billiard Staff notification
                QmNotification::create([
                    'target_role' => 'billiard_staff',
                    'title' => 'Sesi Bermain Habis',
                    'message' => "Sesi bermain customer {$reservation->user?->name} di {$reservation->table?->name} telah habis.",
                    'type' => 'session_expired',
                    'is_read' => false,
                ]);

                event(new SessionExpiredEvent($reservation));
            }
        }

        return response()->json(['success' => true]);
    }

    private function generateReservationCode(): string
    {
        $prefix = 'RSV-'.now()->format('Ymd').'-';
        $number = Reservation::where('reservation_code', 'like', $prefix.'%')->count() + 1;

        return $prefix.str_pad((string) $number, 4, '0', STR_PAD_LEFT);
    }
}
