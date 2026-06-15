import BilliardLayout from '@/Layouts/BilliardLayout';
import { Link } from '@inertiajs/react';

export default function PersonalBilling({ reservation }) {
    const totalPrice = Number(reservation.total_price).toLocaleString('id-ID');

    return (
        <BilliardLayout>
            <div className="space-y-6 max-w-3xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('billiard.reservations.show', reservation.id)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Kembali
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Personal Billing</h1>
                </div>

                {/* Billing Card */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gray-900 text-white px-6 py-5">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Kode Reservasi</p>
                        <p className="text-xl font-mono font-bold mt-1">{reservation.reservation_code}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Info Customer */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Informasi Customer
                            </h2>
                            <div className="space-y-2">
                                <InfoRow label="Nama" value={reservation.user?.name ?? '-'} />
                                <InfoRow label="Email" value={reservation.user?.email ?? '-'} />
                            </div>
                        </div>

                        <hr />

                        {/* Info Meja & Paket */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Meja & Paket
                            </h2>
                            <div className="space-y-2">
                                <InfoRow label="Meja" value={reservation.table?.name ?? '-'} />
                                <InfoRow label="Nomor Meja" value={reservation.table?.table_number ?? '-'} />
                                <InfoRow label="Paket" value={reservation.package?.name ?? '-'} />
                                <InfoRow label="Tipe Paket" value={reservation.package_type} />
                            </div>
                        </div>

                        <hr />

                        {/* Info Sesi */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Detail Sesi
                            </h2>
                            <div className="space-y-2">
                                <InfoRow label="Tanggal" value={reservation.reservation_date} />
                                <InfoRow label="Jam Mulai" value={reservation.start_time} />
                                <InfoRow label="Jam Selesai" value={reservation.end_time} />
                                <InfoRow label="Durasi Rencana" value={`${reservation.duration_minutes} menit`} />
                                {reservation.actual_start_time && (
                                    <InfoRow label="Mulai Aktual" value={reservation.actual_start_time} />
                                )}
                                {reservation.actual_end_time && (
                                    <InfoRow label="Selesai Aktual" value={reservation.actual_end_time} />
                                )}
                                {reservation.actual_duration_minutes && (
                                    <InfoRow label="Durasi Aktual" value={`${reservation.actual_duration_minutes} menit`} />
                                )}
                            </div>
                        </div>

                        <hr />

                        {/* Total Billing */}
                        <div className="bg-gray-50 rounded-xl px-6 py-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Tagihan</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Status: <span className="font-medium">{reservation.payment_status}</span>
                                </p>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">
                                Rp {totalPrice}
                            </p>
                        </div>

                        {/* Catatan */}
                        {reservation.notes && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <p className="text-sm font-medium text-yellow-700 mb-1">Catatan</p>
                                <p className="text-sm text-yellow-600">{reservation.notes}</p>
                            </div>
                        )}

                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Booking Status</p>
                            <StatusBadge status={reservation.booking_status} />
                        </div>
                    </div>
                </div>
            </div>
        </BilliardLayout>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
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