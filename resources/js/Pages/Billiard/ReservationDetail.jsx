import BilliardLayout from '@/Layouts/BilliardLayout';
import { Link, useForm } from '@inertiajs/react';

export default function ReservationDetail({ reservation }) {
    const { data, setData, patch, processing, errors } = useForm({
        booking_status: reservation.booking_status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('billiard.reservations.status', reservation.id));
    };

    return (
        <BilliardLayout>
            <div className="space-y-6 max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('billiard.reservations.index')}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Kembali
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Detail Reservasi</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Info Reservasi */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Info Reservasi</h2>
                        <InfoRow label="Kode" value={reservation.reservation_code} mono />
                        <InfoRow label="Tanggal" value={reservation.reservation_date} />
                        <InfoRow label="Jam Mulai" value={reservation.start_time} />
                        <InfoRow label="Jam Selesai" value={reservation.end_time} />
                        <InfoRow label="Durasi" value={`${reservation.duration_minutes} menit`} />
                        <InfoRow label="Tipe Paket" value={reservation.package_type} />
                        <InfoRow label="Total Harga" value={`Rp ${Number(reservation.total_price).toLocaleString('id-ID')}`} />
                        <InfoRow label="Payment Status" value={reservation.payment_status} />
                        {reservation.notes && <InfoRow label="Catatan" value={reservation.notes} />}
                    </div>

                    {/* Info Customer & Meja */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Customer</h2>
                            <InfoRow label="Nama" value={reservation.user?.name ?? '-'} />
                            <InfoRow label="Email" value={reservation.user?.email ?? '-'} />
                        </div>

                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Meja & Paket</h2>
                            <InfoRow label="Meja" value={reservation.table?.name ?? '-'} />
                            <InfoRow label="Nomor Meja" value={reservation.table?.table_number ?? '-'} />
                            <InfoRow label="Paket" value={reservation.package?.name ?? '-'} />
                        </div>
                    </div>
                </div>

                {/* Update Status */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Update Status</h2>
                    <form onSubmit={handleSubmit} className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Booking Status
                            </label>
                            <select
                                value={data.booking_status}
                                onChange={(e) => setData('booking_status', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="playing">Playing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.booking_status && (
                                <p className="text-red-500 text-xs mt-1">{errors.booking_status}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </form>
                </div>

                {/* Personal Billing Link */}
                {reservation.package_type === 'personal' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                        <p className="text-sm text-yellow-700">Reservasi ini menggunakan paket personal.</p>
                        <Link
                            href={route('billiard.personal-billing.show', reservation.id)}
                            className="text-sm text-yellow-700 font-medium hover:underline"
                        >
                            Lihat Personal Billing →
                        </Link>
                    </div>
                )}
            </div>
        </BilliardLayout>
    );
}

function InfoRow({ label, value, mono = false }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className={`font-medium text-gray-800 ${mono ? 'font-mono' : ''}`}>{value}</span>
        </div>
    );
}