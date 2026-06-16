import KitchenLayout from "@/Layouts/KitchenLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Link } from "@inertiajs/react";

export default function Dashboard({ stats, orders }) {
    // Format stats keys nicely
    const formatKey = (key) => {
        return key.replaceAll("_", " ").toUpperCase();
    };

    // Mapping colors and icons for kitchen dashboard stats
    const getStatColor = (key) => {
        if (key.includes("processing")) return "text-[#ffcc00]";
        if (key.includes("ready")) return "text-emerald-400";
        if (key.includes("completed")) return "text-sky-400";
        return "text-slate-300";
    };

    return (
        <KitchenLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Kitchen Dashboard
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Pantau pesanan masakan & minuman masuk, kelola status persiapan hidangan secara langsung.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(stats || {}).map(([k, v]) => (
                    <div
                        key={k}
                        className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/10"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#9aa7b3] uppercase tracking-wider">
                                {formatKey(k)}
                            </span>
                            <div className="rounded-lg p-1.5 bg-[#151919] border border-[#222727]">
                                <svg className={`w-4 h-4 ${getStatColor(k)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-black text-white font-sans md:text-3xl">
                                {v}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Incoming Orders */}
            <div className="mt-10 border-b border-[#222727] pb-3 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white tracking-wide">
                    Pesanan Masuk Terbaru
                </h3>
                <Link
                    href="/kitchen/orders"
                    className="text-xs font-bold text-[#ffcc00] hover:underline"
                >
                    Lihat Semua &rarr;
                </Link>
            </div>

            <div className="mt-6 grid gap-3.5">
                {orders && orders.length > 0 ? (
                    orders.map((o) => (
                        <Link
                            href={`/kitchen/orders/${o.id}`}
                            key={o.id}
                            className="rounded-[12px] border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/20 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20"
                        >
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-sm font-black text-[#ffcc00]">
                                            {o.order_code}
                                        </p>
                                        <p className="text-xs text-[#9aa7b3] font-bold mt-0.5 truncate">
                                            Pemesan: <span className="text-slate-300">{o.user?.name || "Customer"}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <table className="w-full md:w-[240px]" style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
                                    <tbody>
                                        <tr>
                                            <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#5b6e6e" }}>Pesanan:</td>
                                            <td><StatusBadge value={o.order_status} /></td>
                                        </tr>
                                        <tr>
                                            <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#5b6e6e" }}>Bayar:</td>
                                            <td><StatusBadge value={o.payment_status} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[12px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Tidak ada pesanan aktif dapur saat ini</p>
                    </div>
                )}
            </div>
        </KitchenLayout>
    );
}
