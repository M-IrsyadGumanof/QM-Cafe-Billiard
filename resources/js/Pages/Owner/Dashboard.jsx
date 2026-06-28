import OwnerLayout from "@/Layouts/OwnerLayout";
import { money, date } from "@/Components/Shared/Format";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ summary, orders, reservations }) {
    const { auth } = usePage().props;
    const ownerName = auth.user?.name || "Owner";

    const [timeRange, setTimeRange] = useState("7d");
    const [activeTab, setActiveTab] = useState("reservations");

    const chartData = {
        "7d": {
            average: "Rp 3.450.000 / hari",
            trend: "+12.4% Tren Positif",
            trendColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
            linePath: "M0,150 C30,150 70,125 100,125 C130,125 170,75 200,75 C230,75 270,90 300,90 C330,90 370,45 400,45 C430,45 470,35 500,35 C530,35 570,15 600,15",
            areaPath: "M0,150 C30,150 70,125 100,125 C130,125 170,75 200,75 C230,75 270,90 300,90 C330,90 370,45 400,45 C430,45 470,35 500,35 C530,35 570,15 600,15 L600,180 L0,180 Z",
            dots: [
                { cx: 100, cy: 125 },
                { cx: 200, cy: 75 },
                { cx: 300, cy: 90 },
                { cx: 400, cy: 45 },
                { cx: 500, cy: 35 },
                { cx: 600, cy: 15 }
            ]
        },
        "30d": {
            average: "Rp 24.600.000 / minggu",
            trend: "+8.7% Kenaikan",
            trendColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
            linePath: "M0,130 C60,130 140,95 200,95 C260,95 340,35 400,35 C460,35 540,10 600,10",
            areaPath: "M0,130 C60,130 140,95 200,95 C260,95 340,35 400,35 C460,35 540,10 600,10 L600,180 L0,180 Z",
            dots: [
                { cx: 200, cy: 95 },
                { cx: 400, cy: 35 },
                { cx: 600, cy: 10 }
            ]
        },
        "12m": {
            average: "Rp 98.400.000 / bulan",
            trend: "+15.2% Pertumbuhan",
            trendColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            labels: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Okt-Des"],
            linePath: "M0,140 C90,140 210,70 300,70 C390,70 510,8 600,8",
            areaPath: "M0,140 C90,140 210,70 300,70 C390,70 510,8 600,8 L600,180 L0,180 Z",
            dots: [
                { cx: 300, cy: 70 },
                { cx: 600, cy: 8 }
            ]
        }
    };

    const stats = [
        {
            key: "revenue",
            label: "Total Pendapatan",
            value: money(summary?.revenue || 0),
            badge: "Akumulasi Bersih",
            badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
            icon: (
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgGlow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
            topBar: "bg-emerald-500",
        },
        {
            key: "users",
            label: "Pelanggan Terdaftar",
            value: summary?.users || 0,
            badge: "Akun Aktif",
            badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
            icon: (
                <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            bgGlow: "hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.15)] hover:border-sky-500/30",
            topBar: "bg-sky-500",
        },
        {
            key: "reservations",
            label: "Reservasi Meja",
            value: summary?.reservations || 0,
            badge: "Billiard Bookings",
            badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
            icon: (
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgGlow: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:border-purple-500/30",
            topBar: "bg-purple-500",
        },
        {
            key: "orders",
            label: "Pesanan Kafe",
            value: summary?.orders || 0,
            badge: "Makanan & Minuman",
            badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
            icon: (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            bgGlow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)] hover:border-amber-500/30",
            topBar: "bg-amber-500",
        },
        {
            key: "pending_payments",
            label: "Pending Verifikasi",
            value: summary?.pending_payments || 0,
            badge: "Butuh Persetujuan",
            badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
            icon: (
                <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            bgGlow: "hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)] hover:border-rose-500/30",
            topBar: "bg-rose-500",
        },
    ];

    return (
        <OwnerLayout>
            {/* Header Banner - Sleek Modern Welcoming Card */}
            <div className="relative overflow-hidden rounded-3xl border border-[#2b3232]/50 bg-gradient-to-r from-[#181d1d] via-[#111515] to-[#111515] p-6 md:p-8 mb-8 shadow-xl">
                {/* Glowing light spots */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-[#ffcc00]/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 rounded-full bg-emerald-500/3 blur-3xl pointer-events-none" />
                
                {/* Background dotted pattern */}
                <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#ffcc00]">
                                Owner Control Center
                            </p>
                        </div>
                        
                        <h1 className="mt-3 text-3xl font-black text-white font-serif tracking-tight leading-tight">
                            Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#ffcc00]">{ownerName}</span>
                        </h1>
                        
                        <p className="mt-2.5 text-xs text-[#9aa7b3] max-w-2xl leading-relaxed">
                            Pantau kesehatan bisnis Anda secara keseluruhan. Dapatkan wawasan langsung mengenai reservasi billiard, pesanan kafe, pembayaran masuk, serta tren keuangan dalam satu layar yang terintegrasi.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 shrink-0 self-start md:self-center">
                        <Link 
                            href="/owner/reports" 
                            className="inline-flex items-center gap-2.5 rounded-xl border border-[#2b3232] bg-[#151919]/60 backdrop-blur-sm px-4.5 py-3 text-xs font-bold uppercase tracking-wider text-[#ffcc00] hover:border-[#ffcc00]/30 hover:bg-[#ffcc00]/5 transition-all duration-300 shadow-md active:scale-95"
                        >
                            <svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Analisis Laporan
                        </Link>
                        
                        <a 
                            href="/" 
                            target="_blank"
                            className="inline-flex items-center gap-2.5 rounded-xl bg-[#ffcc00] hover:bg-[#ffe066] px-4.5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#111515] transition-all duration-300 shadow-lg shadow-[#ffcc00]/15 active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Kunjungi Web
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {stats.map((s) => (
                    <div
                        key={s.key}
                        className={`group relative overflow-hidden rounded-2xl border border-[#2b3232]/50 bg-[#111515]/80 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${s.bgGlow}`}
                    >
                        {/* Hover top accent glow bar */}
                        <div className={`absolute top-0 left-0 w-full h-[3px] ${s.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">
                                {s.label}
                            </span>
                            <div className="rounded-xl p-2 bg-[#181d1d] border border-[#2b3232]/60 transition-all duration-300 group-hover:bg-[#1e2424] group-hover:scale-105">
                                {s.icon}
                            </div>
                        </div>
                        
                        <div className="mt-5">
                            <h2 className="text-2xl font-black text-white tracking-tight font-sans">
                                {s.value}
                            </h2>
                            <span className={`inline-flex items-center mt-3 rounded-full border px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${s.badgeBg}`}>
                                {s.badge}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="mt-8">
                
                {/* Weekly Income Sparkline Chart Card */}
                <div className="rounded-2xl border border-[#2b3232]/50 bg-gradient-to-b from-[#181d1d] to-[#111515] p-6 shadow-xl relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-4 gap-3">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ffcc00]" />
                                Ringkasan Pendapatan Usaha
                            </h3>
                            <p className="text-[10px] text-[#9aa7b3] mt-1">
                                Visualisasi tren keuangan dari verifikasi transaksi pembayaran masuk
                            </p>
                        </div>

                        {/* Interactive Filter Tabs */}
                        <div className="flex bg-[#111515] border border-[#2b3232]/80 p-0.5 rounded-lg shrink-0">
                            {Object.keys(chartData).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                                        timeRange === range
                                            ? "bg-[#ffcc00] text-[#111515]"
                                            : "text-[#9aa7b3] hover:text-white"
                                    }`}
                                >
                                    {range === "7d" ? "7 Hari" : range === "30d" ? "30 Hari" : "12 Bulan"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-baseline gap-3">
                        <span className="text-lg font-black text-white font-mono">
                            {chartData[timeRange].average}
                        </span>
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider ${chartData[timeRange].trendColor}`}>
                            {chartData[timeRange].trend}
                        </span>
                    </div>
                    
                    {/* SVG Chart */}
                    <div className="mt-6 h-48 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.20" />
                                    <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.00" />
                                </linearGradient>
                            </defs>
                            
                            {/* Horizontal Gridlines */}
                            <line x1="0" y1="30" x2="600" y2="30" stroke="#222727" strokeDasharray="6,6" />
                            <line x1="0" y1="75" x2="600" y2="75" stroke="#222727" strokeDasharray="6,6" />
                            <line x1="0" y1="120" x2="600" y2="120" stroke="#222727" strokeDasharray="6,6" />
                            <line x1="0" y1="165" x2="600" y2="165" stroke="#2b3232" />

                            {/* Area path */}
                            <path
                                d={chartData[timeRange].areaPath}
                                fill="url(#area-grad)"
                                className="transition-all duration-500 ease-in-out"
                            />

                            {/* Line path */}
                            <path
                                d={chartData[timeRange].linePath}
                                fill="none"
                                stroke="#ffcc00"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                className="transition-all duration-500 ease-in-out"
                            />

                            {/* Bullet Dots */}
                            {chartData[timeRange].dots.map((dot, index) => (
                                <circle
                                    key={index}
                                    cx={dot.cx}
                                    cy={dot.cy}
                                    r="5.5"
                                    fill="#ffcc00"
                                    stroke="#111515"
                                    strokeWidth="2.5"
                                    className="transition-all duration-500 ease-in-out cursor-pointer hover:r-7"
                                />
                            ))}
                        </svg>
                    </div>
                    
                    {/* Days Label Grid */}
                    <div className="mt-3 flex justify-between text-[10px] font-bold font-mono text-[#9aa7b3] px-2">
                        {chartData[timeRange].labels.map((lbl, idx) => (
                            <span key={idx}>{lbl}</span>
                        ))}
                    </div>
                </div>

            </div>

            {/* Latest Activities Section with Tabs */}
            <div className="mt-8 rounded-2xl border border-[#2b3232]/50 bg-gradient-to-b from-[#181d1d] to-[#111515] p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-4 gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ffcc00]" />
                            Aktivitas Sistem Terbaru
                        </h3>
                        <p className="text-[10px] text-[#9aa7b3] mt-1">
                            Memantau transaksi billiard dan kafe secara real-time
                        </p>
                    </div>

                    {/* Tab Toggles */}
                    <div className="flex bg-[#111515] border border-[#2b3232]/80 p-0.5 rounded-lg">
                        <button
                            onClick={() => setActiveTab("reservations")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                                activeTab === "reservations"
                                    ? "bg-[#ffcc00] text-[#111515]"
                                    : "text-[#9aa7b3] hover:text-white"
                            }`}
                        >
                            Reservasi Billiard
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-200 ${
                                activeTab === "orders"
                                    ? "bg-[#ffcc00] text-[#111515]"
                                    : "text-[#9aa7b3] hover:text-white"
                            }`}
                        >
                            Pesanan Kafe
                        </button>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {activeTab === "reservations" ? (
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727] text-[#9aa7b3] font-bold uppercase tracking-wider">
                                    <th className="py-3 px-4">Kode Reservasi</th>
                                    <th className="py-3 px-4">Pelanggan</th>
                                    <th className="py-3 px-4">Meja Billiard</th>
                                    <th className="py-3 px-4">Status Pemesanan</th>
                                    <th className="py-3 px-4 text-right">Tanggal Booking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/30">
                                {reservations && reservations.length > 0 ? (
                                    reservations.map((r) => (
                                        <tr key={r.id} className="text-white hover:bg-[#151919]/40 transition-colors group">
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#ffcc00] group-hover:underline">
                                                {r.reservation_code}
                                            </td>
                                            <td className="py-3.5 px-4 font-medium">{r.user?.name || "Customer"}</td>
                                            <td className="py-3.5 px-4 font-bold text-slate-300">Meja {r.table?.name || "N/A"}</td>
                                            <td className="py-3.5 px-4">
                                                <StatusBadge value={r.booking_status} />
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-mono text-[10px] text-[#9aa7b3]">
                                                {date(r.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-xs text-[#9aa7b3] italic">
                                            Belum ada riwayat transaksi reservasi billiard masuk
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727] text-[#9aa7b3] font-bold uppercase tracking-wider">
                                    <th className="py-3 px-4">Kode Pesanan</th>
                                    <th className="py-3 px-4">Pelanggan</th>
                                    <th className="py-3 px-4">Total Belanja</th>
                                    <th className="py-3 px-4">Status Pesanan</th>
                                    <th className="py-3 px-4 text-right">Tanggal Order</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/30">
                                {orders && orders.length > 0 ? (
                                    orders.map((o) => (
                                        <tr key={o.id} className="text-white hover:bg-[#151919]/40 transition-colors group">
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#ffcc00] group-hover:underline">
                                                {o.order_code}
                                            </td>
                                            <td className="py-3.5 px-4 font-medium">{o.user?.name || "Customer"}</td>
                                            <td className="py-3.5 px-4 font-bold text-slate-300">{money(o.total_amount)}</td>
                                            <td className="py-3.5 px-4">
                                                <StatusBadge value={o.order_status} />
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-mono text-[10px] text-[#9aa7b3]">
                                                {date(o.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-xs text-[#9aa7b3] italic">
                                            Belum ada riwayat transaksi pesanan kafe masuk
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </OwnerLayout>
    );
}
