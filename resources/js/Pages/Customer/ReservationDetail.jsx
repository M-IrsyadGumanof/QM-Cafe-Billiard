import { Link } from "@inertiajs/react";

/* ─── Status maps ─────────────────────────────────────────── */
const STATUS_BOOKING = {
    pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 ring-yellow-200",
    },
    confirmed: {
        label: "Confirmed",
        className: "bg-blue-100 text-blue-800 ring-blue-200",
    },
    playing: {
        label: "Playing",
        className: "bg-green-100 text-green-800 ring-green-200",
    },
    completed: {
        label: "Completed",
        className: "bg-gray-100 text-gray-700 ring-gray-200",
    },
    cancelled: {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 ring-red-200",
    },
};

const STATUS_PAYMENT = {
    unpaid: {
        label: "Belum Dibayar",
        className: "bg-red-100 text-red-700 ring-red-200",
    },
    pending: {
        label: "Menunggu Verifikasi",
        className: "bg-yellow-100 text-yellow-700 ring-yellow-200",
    },
    verified: {
        label: "Terverifikasi",
        className: "bg-green-100 text-green-700 ring-green-200",
    },
    rejected: {
        label: "Ditolak",
        className: "bg-red-100 text-red-700 ring-red-200",
    },
    paid_after_play: {
        label: "Bayar Setelah Main",
        className: "bg-purple-100 text-purple-700 ring-purple-200",
    },
};

const STATUS_TABLE = {
    available: { label: "Tersedia", className: "text-green-600" },
    reserved: { label: "Dipesan", className: "text-yellow-600" },
    occupied: { label: "Digunakan", className: "text-blue-600" },
    maintenance: { label: "Maintenance", className: "text-red-600" },
};

function StatusBadge({ map, value, size = "md" }) {
    const entry = map[value] ?? {
        label: value ?? "-",
        className: "bg-gray-100 text-gray-600 ring-gray-200",
    };
    const sizeClass =
        size === "lg"
            ? "px-3 py-1 text-sm"
            : "px-2.5 py-0.5 text-xs";
    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${sizeClass} ${entry.className}`}
        >
            {entry.label}
        </span>
    );
}

/* ─── Helper formatters ───────────────────────────────────── */
function formatDate(str) {
    if (!str) return "-";
    return new Date(str).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTime(str) {
    if (!str) return "-";
    return str.slice(0, 5);
}

function formatRupiah(amount) {
    return `Rp ${Number(amount ?? 0).toLocaleString("id-ID")}`;
}

/* ─── Section card ────────────────────────────────────────── */
function Card({ title, children }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {title && (
                <div className="border-b border-gray-100 px-5 py-3">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {title}
                    </h2>
                </div>
            )}
            <div className="px-5 py-4">{children}</div>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2 text-sm">
            <dt className="min-w-[140px] text-gray-500">{label}</dt>
            <dd className="text-right font-medium text-gray-800">{value ?? "-"}</dd>
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function ReservationDetail({ reservation }) {
    const { table, package: pkg, payments } = reservation;
    const isCancelled = reservation.booking_status === "cancelled";

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <Link
                        href={route("customer.reservations.index")}
                        className="hover:text-blue-600"
                    >
                        Reservasi Saya
                    </Link>
                    <span>/</span>
                    <span className="font-mono text-gray-700">
                        {reservation.reservation_code}
                    </span>
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Detail Reservasi
                        </h1>
                        <p className="mt-0.5 font-mono text-sm text-gray-500">
                            {reservation.reservation_code}
                        </p>
                    </div>

                    {/* Status badges — prominent */}
                    <div className="flex flex-wrap gap-2">
                        <StatusBadge
                            map={STATUS_BOOKING}
                            value={reservation.booking_status}
                            size="lg"
                        />
                        <StatusBadge
                            map={STATUS_PAYMENT}
                            value={reservation.payment_status}
                            size="lg"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
                {/* Left col — main info */}
                <div className="space-y-5 lg:col-span-2">
                    {/* Jadwal */}
                    <Card title="Jadwal Reservasi">
                        <dl className="divide-y divide-gray-50">
                            <Row
                                label="Tanggal"
                                value={formatDate(reservation.reservation_date)}
                            />
                            <Row
                                label="Jam Mulai"
                                value={formatTime(reservation.start_time)}
                            />
                            <Row
                                label="Jam Selesai"
                                value={formatTime(reservation.end_time)}
                            />
                            <Row
                                label="Durasi"
                                value={
                                    reservation.duration_minutes
                                        ? `${reservation.duration_minutes} menit`
                                        : "-"
                                }
                            />
                            {reservation.actual_start_time && (
                                <Row
                                    label="Mulai Aktual"
                                    value={new Date(
                                        reservation.actual_start_time
                                    ).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                />
                            )}
                            {reservation.actual_end_time && (
                                <Row
                                    label="Selesai Aktual"
                                    value={new Date(
                                        reservation.actual_end_time
                                    ).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                />
                            )}
                            {reservation.actual_duration_minutes && (
                                <Row
                                    label="Durasi Aktual"
                                    value={`${reservation.actual_duration_minutes} menit`}
                                />
                            )}
                        </dl>
                    </Card>

                    {/* Meja */}
                    <Card title="Meja Billiard">
                        {table ? (
                            <dl className="divide-y divide-gray-50">
                                <Row
                                    label="Nomor Meja"
                                    value={`Meja ${table.table_number}`}
                                />
                                <Row label="Nama Meja" value={table.name} />
                                <Row
                                    label="Status Meja"
                                    value={
                                        <span
                                            className={`font-semibold ${STATUS_TABLE[table.status]?.className ?? "text-gray-700"}`}
                                        >
                                            {STATUS_TABLE[table.status]
                                                ?.label ?? table.status}
                                        </span>
                                    }
                                />
                                {table.description && (
                                    <Row
                                        label="Keterangan"
                                        value={table.description}
                                    />
                                )}
                            </dl>
                        ) : (
                            <p className="text-sm text-gray-400">
                                Data meja tidak tersedia.
                            </p>
                        )}
                    </Card>

                    {/* Paket */}
                    <Card title="Paket">
                        {pkg ? (
                            <dl className="divide-y divide-gray-50">
                                <Row label="Nama Paket" value={pkg.name} />
                                <Row
                                    label="Tipe"
                                    value={
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                                                pkg.type === "personal"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {pkg.type}
                                        </span>
                                    }
                                />
                                {pkg.type === "regular" &&
                                    pkg.duration_minutes && (
                                        <Row
                                            label="Durasi Paket"
                                            value={`${pkg.duration_minutes} menit`}
                                        />
                                    )}
                                <Row
                                    label="Harga Paket"
                                    value={
                                        pkg.type === "personal"
                                            ? "Dihitung setelah main"
                                            : formatRupiah(pkg.price)
                                    }
                                />
                                {pkg.description && (
                                    <Row
                                        label="Deskripsi"
                                        value={pkg.description}
                                    />
                                )}
                            </dl>
                        ) : (
                            <p className="text-sm text-gray-400">
                                Data paket tidak tersedia.
                            </p>
                        )}
                    </Card>

                    {/* Catatan */}
                    {reservation.notes && (
                        <Card title="Catatan">
                            <p className="text-sm text-gray-700">
                                {reservation.notes}
                            </p>
                        </Card>
                    )}

                    {/* Riwayat Pembayaran */}
                    <Card title="Riwayat Pembayaran">
                        {payments && payments.length > 0 ? (
                            <div className="space-y-3">
                                {payments.map((pay) => (
                                    <div
                                        key={pay.id}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {formatRupiah(pay.amount)}
                                            </p>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {pay.created_at
                                                    ? new Date(
                                                          pay.created_at
                                                      ).toLocaleDateString(
                                                          "id-ID",
                                                          {
                                                              day: "numeric",
                                                              month: "short",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "-"}
                                            </p>
                                        </div>
                                        <StatusBadge
                                            map={STATUS_PAYMENT}
                                            value={pay.status}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">
                                {reservation.payment_status === "unpaid"
                                    ? "Belum ada pembayaran. Silakan lakukan pembayaran untuk mengkonfirmasi reservasi."
                                    : reservation.payment_status ===
                                        "paid_after_play"
                                      ? "Pembayaran akan dilakukan setelah sesi bermain selesai."
                                      : "Belum ada riwayat pembayaran."}
                            </p>
                        )}
                    </Card>
                </div>

                {/* Right col — summary */}
                <div className="space-y-5">
                    {/* Total harga */}
                    <Card title="Ringkasan Biaya">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">
                                {reservation.package_type === "personal" &&
                                Number(reservation.total_price) === 0
                                    ? "—"
                                    : formatRupiah(reservation.total_price)}
                            </p>
                            {reservation.package_type === "personal" &&
                                Number(reservation.total_price) === 0 && (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Total dihitung setelah sesi selesai
                                    </p>
                                )}
                        </div>
                        <dl className="mt-4 divide-y divide-gray-50 text-sm">
                            <Row
                                label="Tipe Reservasi"
                                value={
                                    <span className="capitalize">
                                        {reservation.package_type}
                                    </span>
                                }
                            />
                            <Row
                                label="Status Booking"
                                value={
                                    <StatusBadge
                                        map={STATUS_BOOKING}
                                        value={reservation.booking_status}
                                    />
                                }
                            />
                            <Row
                                label="Status Bayar"
                                value={
                                    <StatusBadge
                                        map={STATUS_PAYMENT}
                                        value={reservation.payment_status}
                                    />
                                }
                            />
                        </dl>
                    </Card>

                    {/* Info banner untuk status tertentu */}
                    {reservation.booking_status === "pending" && (
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                            <strong>Menunggu Konfirmasi</strong>
                            <p className="mt-1 text-yellow-700">
                                Reservasi Anda sedang menunggu konfirmasi dari
                                admin. Pastikan pembayaran sudah dilakukan jika
                                diperlukan.
                            </p>
                        </div>
                    )}
                    {reservation.booking_status === "confirmed" && (
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                            <strong>Reservasi Dikonfirmasi</strong>
                            <p className="mt-1 text-blue-700">
                                Hadir tepat waktu sesuai jadwal yang telah
                                ditentukan.
                            </p>
                        </div>
                    )}
                    {isCancelled && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                            <strong>Reservasi Dibatalkan</strong>
                            <p className="mt-1 text-red-700">
                                Reservasi ini telah dibatalkan dan tidak dapat
                                diaktifkan kembali.
                            </p>
                        </div>
                    )}

                    {/* Kembali */}
                    <Link
                        href={route("customer.reservations.index")}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        ← Kembali ke Daftar Reservasi
                    </Link>
                </div>
            </div>
        </div>
    );
}
