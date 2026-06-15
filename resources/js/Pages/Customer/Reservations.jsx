import { Link } from "@inertiajs/react";

const STATUS_BOOKING = {
    pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800",
    },
    confirmed: {
        label: "Confirmed",
        className: "bg-blue-100 text-blue-800",
    },
    playing: {
        label: "Playing",
        className: "bg-green-100 text-green-800",
    },
    completed: {
        label: "Completed",
        className: "bg-gray-100 text-gray-800",
    },
    cancelled: {
        label: "Cancelled",
        className: "bg-red-100 text-red-800",
    },
};

const STATUS_PAYMENT = {
    unpaid: { label: "Unpaid", className: "bg-red-100 text-red-700" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
    verified: {
        label: "Verified",
        className: "bg-green-100 text-green-700",
    },
    rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-700",
    },
    paid_after_play: {
        label: "Bayar Setelah Main",
        className: "bg-purple-100 text-purple-700",
    },
};

function StatusBadge({ map, value }) {
    const entry = map[value] ?? {
        label: value,
        className: "bg-gray-100 text-gray-600",
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${entry.className}`}
        >
            {entry.label}
        </span>
    );
}

export default function Reservations({ reservations }) {
    const { data, links, meta } = reservations;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Reservasi Saya
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Riwayat dan status semua reservasi meja billiard Anda.
                    </p>
                </div>
                <Link
                    href={route("customer.reservations.create")}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Buat Reservasi
                </Link>
            </div>

            {/* Table */}
            {data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                    </svg>
                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Belum ada reservasi
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                        Mulai buat reservasi meja billiard pertama Anda.
                    </p>
                    <Link
                        href={route("customer.reservations.create")}
                        className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Buat Sekarang
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "Kode",
                                        "Meja",
                                        "Paket",
                                        "Tanggal",
                                        "Jam",
                                        "Status Booking",
                                        "Status Pembayaran",
                                        "",
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {data.map((res) => (
                                    <tr
                                        key={res.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-sm font-semibold text-gray-800">
                                                {res.reservation_code}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            <div className="font-medium">
                                                {res.table?.name ?? "-"}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Meja {res.table?.table_number}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            <div className="font-medium">
                                                {res.package?.name ?? "-"}
                                            </div>
                                            <div className="text-xs capitalize text-gray-400">
                                                {res.package_type}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                                            {res.reservation_date
                                                ? new Date(
                                                      res.reservation_date
                                                  ).toLocaleDateString("id-ID", {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                  })
                                                : "-"}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                                            {res.start_time
                                                ? res.start_time.slice(0, 5)
                                                : "-"}
                                            {res.end_time
                                                ? ` – ${res.end_time.slice(0, 5)}`
                                                : ""}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                map={STATUS_BOOKING}
                                                value={res.booking_status}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                map={STATUS_PAYMENT}
                                                value={res.payment_status}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={route(
                                                    "customer.reservations.show",
                                                    res.id
                                                )}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                Detail →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {links && links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                            <p className="text-sm text-gray-500">
                                {meta?.from ?? "-"} – {meta?.to ?? "-"} dari{" "}
                                {meta?.total ?? "-"} reservasi
                            </p>
                            <div className="flex gap-1">
                                {links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url ?? "#"}
                                        preserveScroll
                                        className={`rounded px-3 py-1 text-sm ${
                                            link.active
                                                ? "bg-blue-600 font-semibold text-white"
                                                : link.url
                                                  ? "text-gray-600 hover:bg-gray-100"
                                                  : "cursor-not-allowed text-gray-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
