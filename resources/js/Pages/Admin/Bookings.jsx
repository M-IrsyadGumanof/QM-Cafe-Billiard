import { Link, router } from '@inertiajs/react';

export default function Bookings({ reservations, filters }) {
    const handleFilter = (status) => {
        router.get(route('admin.bookings.index'), { status }, { preserveState: true });
    };

    const statuses = ['', 'pending', 'confirmed', 'playing', 'completed', 'cancelled'];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
                {statuses.map((s) => (
                    <button
                        key={s}
                        onClick={() => handleFilter(s)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            (filters.status ?? '') === s
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                        }`}
                    >
                        {s === '' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Kode</th>
                            <th className="px-6 py-3 text-left">Customer</th>
                            <th className="px-6 py-3 text-left">Meja</th>
                            <th className="px-6 py-3 text-left">Paket</th>
                            <th className="px-6 py-3 text-left">Tanggal</th>
                            <th className="px-6 py-3 text-left">Jam</th>
                            <th className="px-6 py-3 text-left">Booking Status</th>
                            <th className="px-6 py-3 text-left">Payment Status</th>
                            <th className="px-6 py-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reservations.data.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
                                    Tidak ada data booking.
                                </td>
                            </tr>
                        ) : (
                            reservations.data.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono">{r.reservation_code}</td>
                                    <td className="px-6 py-4">{r.user?.name ?? '-'}</td>
                                    <td className="px-6 py-4">{r.table?.name ?? '-'}</td>
                                    <td className="px-6 py-4">{r.package?.name ?? '-'}</td>
                                    <td className="px-6 py-4">{r.reservation_date}</td>
                                    <td className="px-6 py-4">{r.start_time} - {r.end_time}</td>
                                    <td className="px-6 py-4">
                                        <BookingBadge status={r.booking_status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <PaymentBadge status={r.payment_status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route('admin.bookings.show', r.id)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {reservations.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex gap-2">
                        {reservations.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                className={`px-3 py-1 rounded text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BookingBadge({ status }) {
    const map = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        playing: 'bg-green-100 text-green-700',
        completed: 'bg-gray-100 text-gray-700',
        cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
}

function PaymentBadge({ status }) {
    const map = {
        unpaid: 'bg-red-100 text-red-700',
        pending: 'bg-yellow-100 text-yellow-700',
        verified: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        paid_after_play: 'bg-purple-100 text-purple-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
}