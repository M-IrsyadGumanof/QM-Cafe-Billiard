export default function TableSchedule({ tables }) {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Table Schedule</h1>

            {tables.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                    Belum ada data meja.
                </div>
            ) : (
                tables.map((table) => (
                    <div key={table.id} className="bg-white rounded-xl shadow">
                        <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-700">{table.name}</h2>
                                <p className="text-xs text-gray-400">No. {table.table_number}</p>
                            </div>
                            <StatusBadge status={table.status} />
                        </div>

                        {table.reservations.length === 0 ? (
                            <div className="px-6 py-4 text-sm text-gray-400">
                                Tidak ada reservasi untuk meja ini.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-gray-600 uppercase text-xs bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Kode</th>
                                            <th className="px-6 py-3 text-left">Customer</th>
                                            <th className="px-6 py-3 text-left">Tanggal</th>
                                            <th className="px-6 py-3 text-left">Jam Mulai</th>
                                            <th className="px-6 py-3 text-left">Jam Selesai</th>
                                            <th className="px-6 py-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {table.reservations.map((r) => (
                                            <tr key={r.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-mono">{r.reservation_code}</td>
                                                <td className="px-6 py-4">{r.user?.name ?? '-'}</td>
                                                <td className="px-6 py-4">{r.reservation_date}</td>
                                                <td className="px-6 py-4">{r.start_time}</td>
                                                <td className="px-6 py-4">{r.end_time}</td>
                                                <td className="px-6 py-4">
                                                    <BookingBadge status={r.booking_status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const map = {
        available: 'bg-green-100 text-green-700',
        reserved: 'bg-blue-100 text-blue-700',
        occupied: 'bg-yellow-100 text-yellow-700',
        maintenance: 'bg-red-100 text-red-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
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