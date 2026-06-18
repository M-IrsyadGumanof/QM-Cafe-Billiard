import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";

export default function Dashboard({
    stats,
    recentOrders,
    recentReservations,
    recentPayments,
}) {
    const cardItems = [
        {
            key: "revenue",
            label: "Pendapatan Bersih",
            value: money(stats?.revenue || 0),
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-emerald-500/30 hover:shadow-emerald-500/5",
            iconBgClass: "bg-emerald-500/10 border-emerald-500/20",
        },
        {
            key: "pending_payments",
            label: "Pembayaran Pending",
            value: stats?.pending_payments || 0,
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
            key: "reservations",
            label: "Total Reservasi",
            value: stats?.reservations || 0,
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
            key: "orders",
            label: "Total Pesanan",
            value: stats?.orders || 0,
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
            key: "available_tables",
            label: "Meja Tersedia",
            value: stats?.available_tables || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-sky-500/30 hover:shadow-sky-500/5",
            iconBgClass: "bg-sky-500/10 border-sky-500/20",
        },
        {
            key: "users",
            label: "Total Pengguna",
            value: stats?.users || 0,
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-blue-500/30 hover:shadow-blue-500/5",
            iconBgClass: "bg-blue-500/10 border-blue-500/20",
        },
        {
            key: "menus",
            label: "Total Menu",
            value: stats?.menus || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
            hoverClass: "hover:border-amber-500/30 hover:shadow-amber-500/5",
            iconBgClass: "bg-amber-500/10 border-amber-500/20",
        },
        {
            key: "testimonials",
            label: "Total Testimoni",
            value: stats?.testimonials || 0,
            icon: (
                <svg
                    className="h-5.5 w-5.5 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            ),
            hoverClass: "hover:border-pink-500/30 hover:shadow-pink-500/5",
            iconBgClass: "bg-pink-500/10 border-pink-500/20",
        },
    ];

    return (
        <AdminLayout>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3] max-w-xl">
                        Pantau performa cafe, billiard, transaksi, dan data
                        operasional utama Anda secara real-time.
                    </p>
                </div>
                <div className="shrink-0 self-start sm:self-center rounded-[12px] border border-[#222727] bg-[#111515] px-4 py-2 text-xs font-bold text-[#c7d0d8] shadow-sm">
                    Panel Administrator
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {cardItems.map((c) => (
                    <div
                        key={c.key}
                        className={`group relative rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.hoverClass}`}
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
            <div className="mt-12 flex items-center justify-between border-b border-[#222727] pb-4">
                <h2 className="text-base font-extrabold text-white tracking-wide">
                    Aktivitas & Transaksi Terbaru
                </h2>
                <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                    Terakhir diperbarui: Baru saja
                </span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Orders Panel */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#222727] pb-4">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Pesanan Menu</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-xl border border-[#222727]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#222727] hover:scale-[1.01]"
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
                                        <span className="text-[#9aa7b3] font-bold truncate max-w-[120px]">
                                            {order.user?.name || "Customer"}
                                        </span>
                                        <StatusBadge
                                            value={order.order_status}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada pesanan terbaru
                            </p>
                        )}
                    </div>
                </div>

                {/* Reservations Panel */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#222727] pb-4">
                        <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Reservasi Meja</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentReservations && recentReservations.length > 0 ? (
                            recentReservations.map((res) => (
                                <div
                                    key={res.id}
                                    className="rounded-xl border border-[#222727]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#222727] hover:scale-[1.01]"
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
                                        Meja: {res.table?.name || "N/A"} • {res.user?.name || "Customer"}
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                                        <span className="text-[#5b6e6e] font-mono">
                                            {date(res.reservation_date)} • {res.start_time?.substring(0, 5)}
                                        </span>
                                        <StatusBadge
                                            value={res.booking_status}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada reservasi terbaru
                            </p>
                        )}
                    </div>
                </div>

                {/* Payments Panel */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#222727] pb-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Pembayaran</h3>
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {recentPayments && recentPayments.length > 0 ? (
                            recentPayments.map((pay) => (
                                <div
                                    key={pay.id}
                                    className="rounded-xl border border-[#222727]/70 bg-[#151919]/60 p-3.5 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#222727] hover:scale-[1.01]"
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
                                        <span className="text-[#9aa7b3] font-bold truncate max-w-[120px]">
                                            {pay.user?.name || "Customer"}
                                        </span>
                                        <StatusBadge value={pay.status} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-xs text-[#5b6e6e]">
                                Tidak ada pembayaran terbaru
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
