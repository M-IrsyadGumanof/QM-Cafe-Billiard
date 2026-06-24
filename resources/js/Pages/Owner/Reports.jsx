import OwnerLayout from "@/Layouts/OwnerLayout";
import { money, date } from "@/Components/Shared/Format";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function Reports({ summary, orders, reservations }) {
    const revenueVal = summary?.revenue || 0;

    const printPage = () => {
        window.print();
    };

    const stats = [
        {
            key: "revenue",
            label: "Total Pendapatan",
            value: money(revenueVal),
            badge: "Akumulasi Bersih",
            badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-300",
            icon: (
                <svg className="w-5 h-5 text-emerald-400 print:text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgGlow: "hover:shadow-emerald-950/20 hover:border-emerald-500/30",
        },
        {
            key: "reservations",
            label: "Total Reservasi",
            value: summary?.reservations || 0,
            badge: "Layanan Billiard",
            badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400 print:bg-purple-100 print:text-purple-800 print:border-purple-300",
            icon: (
                <svg className="w-5 h-5 text-purple-400 print:text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgGlow: "hover:shadow-purple-950/20 hover:border-purple-500/30",
        },
        {
            key: "orders",
            label: "Total Pesanan",
            value: summary?.orders || 0,
            badge: "Layanan Kafe",
            badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400 print:bg-amber-100 print:text-amber-800 print:border-amber-300",
            icon: (
                <svg className="w-5 h-5 text-amber-400 print:text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            bgGlow: "hover:shadow-amber-950/20 hover:border-amber-500/30",
        },
        {
            key: "payments",
            label: "Total Transaksi",
            value: summary?.payments || 0,
            badge: "Semua Pembayaran",
            badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-400 print:bg-sky-100 print:text-sky-800 print:border-sky-300",
            icon: (
                <svg className="w-5 h-5 text-sky-400 print:text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 0-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            bgGlow: "hover:shadow-sky-950/20 hover:border-sky-500/30",
        },
    ];

    return (
        <OwnerLayout>
            {/* Header / Actions - Hide on print */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6 mb-8 print:hidden">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Reports Panel
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Owner Business Reports
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Tinjau laporan ringkasan volume reservasi billiard, pesanan kafe, pembayaran terverifikasi, serta cetak dokumen laporan.
                    </p>
                </div>

                {/* Print & Export Buttons */}
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <button
                        onClick={printPage}
                        className="rounded-xl border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:text-white hover:border-[#ffcc00]/25 transition-all duration-200"
                    >
                        Cetak PDF
                    </button>
                    <div className="relative group inline-block">
                        <button className="rounded-xl bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200">
                            Unduh Laporan (CSV) ▾
                        </button>
                        <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-[#222727] bg-[#111515] py-2 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <a
                                href="/owner/reports/export?type=payments"
                                download
                                className="block px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                            >
                                Laporan Pembayaran
                            </a>
                            <a
                                href="/owner/reports/export?type=orders"
                                download
                                className="block px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                            >
                                Laporan Pesanan Café
                            </a>
                            <a
                                href="/owner/reports/export?type=reservations"
                                download
                                className="block px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                            >
                                Laporan Reservasi Meja
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Only Header Banner */}
            <div className="hidden print:block border-b-2 border-black pb-4 mb-6">
                <h1 className="text-3xl font-black text-black">QM CAFE & BILLIARD</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Laporan Penjualan dan Transaksi Bisnis (Owner) - Dicetak tanggal: {new Date().toLocaleDateString()}
                </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
                {stats.map((s) => (
                    <div
                        key={s.key}
                        className={`group relative overflow-hidden rounded-[15px] border border-[#222727] bg-[#111515]/80 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl print:bg-white print:text-black print:border-gray-300 ${s.bgGlow}`}
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffcc00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 print:hidden" />
                        
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider print:text-gray-500">
                                {s.label}
                            </span>
                            <div className="rounded-lg p-1.5 bg-[#181d1d] border border-[#222727] transition-colors group-hover:bg-[#1e2424] print:bg-gray-100 print:border-gray-300">
                                {s.icon}
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight font-sans print:text-black">
                                {s.value}
                            </h2>
                            <span className={`inline-flex items-center mt-2 rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${s.badgeBg}`}>
                                {s.badge}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tables Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1 print:gap-8">
                
                {/* Billiard Table Reservations List */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm print:bg-white print:text-black print:border-gray-300">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727]/60 pb-3 print:text-black print:border-gray-300">
                        Aktivitas Reservasi Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727]/80 text-[#5b6e6e] font-extrabold uppercase print:text-gray-600 print:border-gray-300">
                                    <th className="py-2.5">Kode</th>
                                    <th>Pelanggan</th>
                                    <th>Meja</th>
                                    <th>Status</th>
                                    <th className="text-right">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/40 print:divide-gray-200">
                                {reservations && reservations.length > 0 ? (
                                    reservations.map((r) => (
                                        <tr key={r.id} className="text-white hover:bg-[#151919]/30 transition-colors print:text-black">
                                            <td className="py-3 font-mono font-bold text-[#ffcc00] print:text-black">{r.reservation_code}</td>
                                            <td>{r.user?.name || "Customer"}</td>
                                            <td className="font-medium">Meja {r.table?.name || "N/A"}</td>
                                            <td className="py-1.5"><StatusBadge value={r.booking_status} /></td>
                                            <td className="text-right font-mono text-[10px] text-[#9aa7b3] print:text-black">{date(r.created_at)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-xs text-[#5b6e6e]">Tidak ada riwayat reservasi</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cafe Orders List */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm print:bg-white print:text-black print:border-gray-300">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727]/60 pb-3 print:text-black print:border-gray-300">
                        Aktivitas Pesanan Kafe Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727]/80 text-[#5b6e6e] font-extrabold uppercase print:text-gray-600 print:border-gray-300">
                                    <th className="py-2.5">Kode</th>
                                    <th>Pelanggan</th>
                                    <th>Status</th>
                                    <th className="text-right">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/40 print:divide-gray-200">
                                {orders && orders.length > 0 ? (
                                    orders.map((o) => (
                                        <tr key={o.id} className="text-white hover:bg-[#151919]/30 transition-colors print:text-black">
                                            <td className="py-3 font-mono font-bold text-[#ffcc00] print:text-black">{o.order_code}</td>
                                            <td>{o.user?.name || "Customer"}</td>
                                            <td className="py-1.5"><StatusBadge value={o.order_status} /></td>
                                            <td className="text-right font-mono text-[10px] text-[#9aa7b3] print:text-black">{date(o.created_at)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-xs text-[#5b6e6e]">Tidak ada riwayat pesanan kafe</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </OwnerLayout>
    );
}
