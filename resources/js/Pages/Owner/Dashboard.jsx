import OwnerLayout from "@/Layouts/OwnerLayout";
import { money } from "@/Components/Shared/Format";

export default function Dashboard({ summary }) {
    const stats = [
        {
            key: "revenue",
            label: "Total Pendapatan",
            value: money(summary?.revenue || 0),
            badge: "Pembayaran Terverifikasi",
            badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
            icon: (
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgGlow: "hover:shadow-emerald-950/20 hover:border-emerald-500/30",
        },
        {
            key: "users",
            label: "Pelanggan Terdaftar",
            value: summary?.users || 0,
            badge: "Akun Aktif",
            badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
            icon: (
                <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            bgGlow: "hover:shadow-sky-950/20 hover:border-sky-500/30",
        },
        {
            key: "reservations",
            label: "Reservasi Meja",
            value: summary?.reservations || 0,
            badge: "Booking Billiard",
            badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
            icon: (
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgGlow: "hover:shadow-purple-950/20 hover:border-purple-500/30",
        },
        {
            key: "orders",
            label: "Pesanan Kafe",
            value: summary?.orders || 0,
            badge: "Makanan & Minuman",
            badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
            icon: (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            bgGlow: "hover:shadow-amber-950/20 hover:border-amber-500/30",
        },
        {
            key: "pending_payments",
            label: "Pending Verifikasi",
            value: summary?.pending_payments || 0,
            badge: "Butuh Tindakan",
            badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
            icon: (
                <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            bgGlow: "hover:shadow-rose-950/20 hover:border-rose-500/30",
        },
    ];

    return (
        <OwnerLayout>
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#222727] bg-[#111515]/60 p-6 md:p-8 mb-8">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-56 h-56 rounded-full bg-[#ffcc00]/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-56 h-56 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                            Overview Panel
                        </p>
                        <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                            Owner Control Dashboard
                        </h1>
                        <p className="mt-2 text-xs text-[#9aa7b3] max-w-xl leading-relaxed">
                            Pantau performa bisnis secara keseluruhan, mulai dari reservasi billiard, pesanan kafe, total pendapatan bersih, hingga verifikasi transaksi pembayaran masuk.
                        </p>
                    </div>
                    
                    <div className="flex gap-3 shrink-0">
                        <a 
                            href="/owner/reports" 
                            className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#ffcc00] hover:border-[#ffcc00]/30 hover:bg-[#181d1d] transition-all duration-300"
                        >
                            <svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Buka Laporan
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {stats.map((s) => (
                    <div
                        key={s.key}
                        className={`group relative overflow-hidden rounded-[15px] border border-[#222727] bg-[#111515]/80 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.bgGlow}`}
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffcc00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                {s.label}
                            </span>
                            <div className="rounded-lg p-1.5 bg-[#181d1d] border border-[#222727] transition-colors group-hover:bg-[#1e2424]">
                                {s.icon}
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight font-sans">
                                {s.value}
                            </h2>
                            <span className={`inline-flex items-center mt-2 rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${s.badgeBg}`}>
                                {s.badge}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Actions Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Weekly Income Sparkline Chart Mockup */}
                <div className="lg:col-span-2 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#222727]/60 pb-4">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                Estimasi Pendapatan Mingguan
                            </h3>
                            <p className="text-[10px] text-[#9aa7b3] mt-0.5">
                                Visualisasi perkiraan grafik transaksi terverifikasi (Simulasi 7 hari terakhir)
                            </p>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                            +12.4% Tren Positif
                        </span>
                    </div>
                    
                    {/* SVG Chart */}
                    <div className="mt-6 h-48 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.00" />
                                </linearGradient>
                            </defs>
                            
                            {/* Horizontal Gridlines */}
                            <line x1="0" y1="30" x2="600" y2="30" stroke="#222727" strokeDasharray="4,4" />
                            <line x1="0" y1="75" x2="600" y2="75" stroke="#222727" strokeDasharray="4,4" />
                            <line x1="0" y1="120" x2="600" y2="120" stroke="#222727" strokeDasharray="4,4" />
                            <line x1="0" y1="165" x2="600" y2="165" stroke="#222727" />

                            {/* Area path */}
                            <path
                                d="M0,165 Q75,130 100,140 T200,90 T300,105 T400,60 T500,45 T600,30 L600,165 L0,165 Z"
                                fill="url(#area-grad)"
                            />

                            {/* Line path */}
                            <path
                                d="M0,165 Q75,130 100,140 T200,90 T300,105 T400,60 T500,45 T600,30"
                                fill="none"
                                stroke="#ffcc00"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />

                            {/* Bullet Dots */}
                            <circle cx="100" cy="140" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                            <circle cx="200" cy="90" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                            <circle cx="300" cy="105" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                            <circle cx="400" cy="60" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                            <circle cx="500" cy="45" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                            <circle cx="600" cy="30" r="5" fill="#ffcc00" stroke="#111515" strokeWidth="2" />
                        </svg>
                    </div>
                    
                    {/* Days Label Grid */}
                    <div className="mt-2 flex justify-between text-[10px] font-mono text-[#5b6e6e] px-1">
                        <span>Sen</span>
                        <span>Sel</span>
                        <span>Rab</span>
                        <span>Kam</span>
                        <span>Jum</span>
                        <span>Sab</span>
                        <span>Min</span>
                    </div>
                </div>

                {/* Right Column: Shortcuts & Quick Actions */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727]/60 pb-3">
                            Navigasi & Pintasan
                        </h3>
                        <p className="text-xs text-[#9aa7b3] leading-relaxed mb-6">
                            Gunakan menu navigasi cepat ini untuk memantau performa yang mendalam serta mengelola sistem sebagai Owner.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <a
                            href="/owner/reports"
                            className="group flex items-center justify-between rounded-xl border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg p-2 bg-[#ffcc00]/5 text-[#ffcc00] border border-[#ffcc00]/10">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-white group-hover:text-[#ffcc00] transition-colors">
                                        Laporan Lengkap
                                    </p>
                                    <p className="text-[9px] text-[#9aa7b3]">
                                        Tinjau data pesanan & reservasi
                                    </p>
                                </div>
                            </div>
                            <span className="text-[#5b6e6e] group-hover:text-white transition-colors">&rarr;</span>
                        </a>

                        <div
                            className="group flex items-center justify-between rounded-xl border border-[#222727] bg-[#111515]/30 p-4 opacity-70 cursor-not-allowed"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg p-2 bg-slate-500/5 text-slate-400 border border-slate-500/10">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400">
                                        Pengaturan Kafe
                                    </p>
                                    <p className="text-[9px] text-[#5b6e6e]">
                                        Khusus peran Administrator
                                    </p>
                                </div>
                            </div>
                            <span className="text-slate-600">&rarr;</span>
                        </div>
                    </div>
                </div>

            </div>
        </OwnerLayout>
    );
}
