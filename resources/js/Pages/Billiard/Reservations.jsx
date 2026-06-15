import BilliardLayout from '@/Layouts/BilliardLayout';
import { Link } from '@inertiajs/react';

export default function Reservations({ reservations }) {
    return (
        <BilliardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Reservasi</h1>

                <div className="bg-white rounded-xl shadow">
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
                                {reservations.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                                            Belum ada reservasi.
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
                                                <StatusBadge status={r.booking_status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route('billiard.reservations.show', r.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

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
        </BilliardLayout>
    );
}

function StatusBadge({ status }) {
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