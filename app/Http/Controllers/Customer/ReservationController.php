<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Auth::user()
            ->reservations()
            ->with(['table', 'package'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Customer/Reservations', [
            'reservations' => $reservations,
        ]);
    }

    public function create()
    {
        $tables = BilliardTable::whereIn('status', ['available', 'reserved'])
            ->orderBy('table_number')
            ->get();

        $packages = BilliardPackage::where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('Customer/ReservationCreate', [
            'tables' => $tables,
            'packages' => $packages,
        ]);
    }

    public function store(Request $request)
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

        if (in_array($table->status, ['occupied', 'maintenance'])) {
            return back()->withErrors(['billiard_table_id' => 'Meja tidak tersedia.']);
        }

        $package = BilliardPackage::findOrFail($validated['billiard_package_id']);

        if ($package->type === 'regular') {
            $duration = $package->duration_minutes;
            $totalPrice = $package->price;
            $paymentStatus = 'unpaid';
        } else {
            $duration = $validated['duration_minutes'] ?? 60;
            $totalPrice = 0;
            $paymentStatus = 'paid_after_play';
        }

        $startTime = \Carbon\Carbon::parse($validated['reservation_date'] . ' ' . $validated['start_time']);
        $endTime = $startTime->copy()->addMinutes($duration);

        // Cek konflik jadwal
        $conflict = Reservation::where('billiard_table_id', $validated['billiard_table_id'])
            ->where('reservation_date', $validated['reservation_date'])
            ->whereNotIn('booking_status', ['cancelled'])
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime->format('H:i'), $endTime->format('H:i')])
                    ->orWhereBetween('end_time', [$startTime->format('H:i'), $endTime->format('H:i')])
                    ->orWhere(function ($q) use ($startTime, $endTime) {
                        $q->where('start_time', '<=', $startTime->format('H:i'))
                            ->where('end_time', '>=', $endTime->format('H:i'));
                    });
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors(['start_time' => 'Jadwal meja sudah terisi pada waktu tersebut.']);
        }

        Reservation::create([
            'user_id' => Auth::id(),
            'billiard_table_id' => $validated['billiard_table_id'],
            'billiard_package_id' => $validated['billiard_package_id'],
            'reservation_code' => $this->generateReservationCode(),
            'package_type' => $package->type,
            'reservation_date' => $validated['reservation_date'],
            'start_time' => $startTime->format('H:i'),
            'end_time' => $endTime->format('H:i'),
            'duration_minutes' => $duration,
            'total_price' => $totalPrice,
            'booking_status' => 'pending',
            'payment_status' => $paymentStatus,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('customer.reservations.index')
            ->with('success', 'Reservasi berhasil dibuat.');
    }

    public function show(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }

        $reservation->load(['table', 'package', 'payments']);

        return Inertia::render('Customer/ReservationDetail', [
            'reservation' => $reservation,
        ]);
    }

    private function generateReservationCode(): string
    {
        $date = now()->format('Ymd');
        $prefix = 'RSV-' . $date . '-';

        $last = Reservation::where('reservation_code', 'like', $prefix . '%')
            ->orderBy('reservation_code', 'desc')
            ->first();

        $number = $last ? (int) substr($last->reservation_code, -4) + 1 : 1;

        return $prefix . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}