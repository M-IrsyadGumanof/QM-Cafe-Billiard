import BilliardLayout from '@/Layouts/BilliardLayout';

export default function TableSchedule({ reservations }) {
    // Group reservasi berdasarkan meja
    const grouped = reservations.reduce((acc, r) => {
        const tableName = r.table?.name ?? 'Unknown';
        if (!acc[tableName]) acc[tableName] = [];
        acc[tableName].push(r);
        return acc;
    }, {});

    return (
        <BilliardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Jadwal Meja</h1>

                {Object.keys(grouped).length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                        Belum ada jadwal reservasi.
                    </div>
                ) : (
                    Object.entries(grouped).map(([tableName, items]) => (
                        <div key={tableName} className="bg-white rounded-xl shadow">
                            <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
                                <h2 className="text-base font-semibold text-gray-700">{tableName}</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-gray-600 uppercase text-xs bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Kode</th>
                                            <th className="px-6 py-3 text-left">Customer</th>
                                            <th className="px-6 py-3 text-left">Tanggal</th>
                                            <th className="px-6 py-3 text-left">Jam Mulai</th>
                                            <th className="px-6 py-3 text-left">Jam Selesai</th>
                                            <th className="px-6 py-3 text-left">Paket</th>
                                            <th className="px-6 py-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {items.map((r) => (
                                            <tr key={r.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-mono">{r.reservation_code}</td>
                                                <td className="px-6 py-4">{r.user?.name ?? '-'}</td>
                                                <td className="px-6 py-4">{r.reservation_date}</td>
                                                <td className="px-6 py-4">{r.start_time}</td>
                                                <td className="px-6 py-4">{r.end_time}</td>
                                                <td className="px-6 py-4">{r.package?.name ?? '-'}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={r.booking_status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
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