import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Dashboard({
    summary,
    recentOrders,
    recentReservations,
    recentPayments,
}) {
    const cardItems = [
        {
            key: "orders",
            label: "Total Pesanan",
            value: summary?.orders || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-purple-500/30 hover:shadow-purple-500/5",
            iconBgClass: "bg-purple-500/10 border-purple-500/20",
        },
        {
            key: "reservations",
            label: "Total Reservasi",
            value: summary?.reservations || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-rose-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-rose-500/30 hover:shadow-rose-500/5",
            iconBgClass: "bg-rose-500/10 border-rose-500/20",
        },
        {
            key: "pending_payments",
            label: "Pembayaran Pending",
            value: summary?.pending_payments || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-[#ffcc00]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-[#ffcc00]/30 hover:shadow-[#ffcc00]/5",
            iconBgClass: "bg-[#ffcc00]/10 border-[#ffcc00]/20",
        },
        {
            key: "notifications",
            label: "Notifikasi Baru",
            value: summary?.notifications || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
            ),
            hoverClass: "hover:border-blue-500/30 hover:shadow-blue-500/5",
            iconBgClass: "bg-blue-500/10 border-blue-500/20",
        },
    ];

    return (
        <CustomerLayout>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#2b3232] pb-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Customer Dashboard
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3] max-w-xl">
                        Pantau pesanan makanan, reservasi meja billiard, pembayaran, dan update notifikasi Anda secara real-time.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <Link
                        href="/customer/menu"
                        className="rounded-[10px] bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200"
                    >
                        Pesan Makanan
                    </Link>
                    <Link
                        href="/customer/reservations/create"
                        className="rounded-[10px] border border-[#2b3232] bg-[#111515] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-[#1d2222] transition-all duration-200"
                    >
                        Reservasi Billiard
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {cardItems.map((c) => (
                    <div
                        key={c.key}
                        className={`group relative rounded-[15px] border border-[#2b3232] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.hoverClass}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#9aa7b3] transition-colors group-hover:text-white">
                                {c.label}
                            </span>
                            <div className={`rounded-xl p-2.5 border transition-all duration-300 ${c.iconBgClass}`}>
                                {c.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-black tracking-tight text-white font-sans md:text-3xl">
                                {c.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activities Section */}
            <div className="mt-12 flex items-center justify-between border-b border-[#2b3232] pb-4">
                <h2 className="text-base font-extrabold text-white tracking-wide">
                    Aktivitas & Transaksi Anda
                </h2>
                <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                    Terakhir diperbarui: Baru saja
                </span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Orders Panel */}
                <div className="rounded-[15px] border border-[#2b3232] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#2b3232] pb-4">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Pesanan Menu</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/customer/orders/${order.id}`}
                                    className="block rounded-xl border border-[#2b3232]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#2b3232] hover:scale-[1.01]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-black text-[#ffcc00]">
                                            {order.order_code}
                                        </span>
                                        <span className="text-xs font-black text-white">
                                            {money(order.total_amount)}
                                        </span>
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                                        <span className="text-[#9aa7b3] font-bold">
                                            {date(order.created_at)}
                                        </span>
                                        <StatusBadge
                                            value={order.order_status}
                                        />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada pesanan terbaru
                            </p>
                        )}
                    </div>
                </div>

                {/* Reservations Panel */}
                <div className="rounded-[15px] border border-[#2b3232] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#2b3232] pb-4">
                        <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Reservasi Meja</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentReservations && recentReservations.length > 0 ? (
                            recentReservations.map((res) => (
                                <Link
                                    key={res.id}
                                    href={`/customer/reservations/${res.id}`}
                                    className="block rounded-xl border border-[#2b3232]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#2b3232] hover:scale-[1.01]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-black text-[#ffcc00]">
                                            {res.reservation_code}
                                        </span>
                                        <span className="text-xs font-black text-white">
                                            {money(res.total_price)}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-[11px] text-[#9aa7b3] font-bold">
                                        Meja: {res.table?.name || "N/A"} • {res.package?.name || "Biasa"}
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                                        <span className="text-[#5b6e6e] font-mono">
                                            {date(res.reservation_date)} • {res.start_time?.substring(0, 5)}
                                        </span>
                                        <StatusBadge
                                            value={res.booking_status}
                                        />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada reservasi terbaru
                            </p>
                        )}
                    </div>
                </div>

                {/* Payments Panel */}
                <div className="rounded-[15px] border border-[#2b3232] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#2b3232] pb-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Pembayaran</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentPayments && recentPayments.length > 0 ? (
                            recentPayments.map((pay) => (
                                <Link
                                    key={pay.id}
                                    href="/customer/payments"
                                    className="block rounded-xl border border-[#2b3232]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#2b3232] hover:scale-[1.01]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-black text-[#ffcc00]">
                                            {pay.payment_code}
                                        </span>
                                        <span className="text-xs font-black text-white">
                                            {money(pay.amount)}
                                        </span>
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                                        <span className="text-[#9aa7b3] font-bold">
                                            Metode: {pay.payment_method || "-"}
                                        </span>
                                        <StatusBadge value={pay.status} />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada pembayaran terbaru
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
