import BilliardLayout from '@/Layouts/BilliardLayout';
import { Link } from '@inertiajs/react';

export default function PlayingSessions({ reservations }) {
    return (
        <BilliardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Playing Sessions</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <p className="text-sm text-blue-600 font-medium">Confirmed</p>
                        <p className="text-3xl font-bold text-blue-700 mt-1">
                            {reservations.filter((r) => r.booking_status === 'confirmed').length}
                        </p>
                        <p className="text-xs text-blue-500 mt-1">Menunggu mulai bermain</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <p className="text-sm text-green-600 font-medium">Playing</p>
                        <p className="text-3xl font-bold text-green-700 mt-1">
                            {reservations.filter((r) => r.booking_status === 'playing').length}
                        </p>
                        <p className="text-xs text-green-500 mt-1">Sedang bermain</p>
                    </div>
                </div>

                {/* Tabel Sesi */}
                <div className="bg-white rounded-xl shadow">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">Sesi Aktif</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-left">Kode</th>
                                    <th className="px-6 py-3 text-left">Customer</th>
                                    <th className="px-6 py-3 text-left">Meja</th>
                                    <th className="px-6 py-3 text-left">Paket</th>
                                    <th className="px-6 py-3 text-left">Tanggal</th>
                                    <th className="px-6 py-3 text-left">Jam</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reservations.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                                            Tidak ada sesi aktif saat ini.
                                        </td>
                                    </tr>
                                ) : (
                                    reservations.map((r) => (
                                        <tr key={r.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono">{r.reservation_code}</td>
                                            <td className="px-6 py-4">{r.user?.name ?? '-'}</td>
                                            <td className="px-6 py-4">{r.table?.name ?? '-'}</td>
                                            <td className="px-6 py-4">{r.package?.name ?? '-'}</td>
                                            <td className="px-6 py-4">{r.reservation_date}</td>
                                            <td className="px-6 py-4">{r.start_time} - {r.end_time}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={r.booking_status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route('billiard.reservations.show', r.id)}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    Detail
                                                </Link>
                                                {r.package_type === 'personal' && (
                                                    <Link
                                                        href={route('billiard.personal-billing.show', r.id)}
                                                        className="ml-3 text-yellow-600 hover:underline text-sm"
                                                    >
                                                        Billing
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BilliardLayout>
    );
}

function StatusBadge({ status }) {
    const map = {
        confirmed: 'bg-blue-100 text-blue-700',
        playing: 'bg-green-100 text-green-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
}