import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Reports({ summary, orders, reservations }) {
    const revenueVal = summary?.revenue || 0;
    
    const printPage = () => {
        window.print();
    };

    return (
        <AdminLayout>
            {/* Header / Actions - Hide on print */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6 print:hidden">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Laporan Bisnis
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Laporan & Analisis Penjualan
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Pantau data transaksi, statistik omset pendapatan, serta unduh berkas laporan dalam format Excel/CSV & PDF.
                    </p>
                </div>
                
                {/* Export Buttons */}
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <button
                        onClick={printPage}
                        className="rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:text-white hover:border-[#ffcc00]/25 transition-all duration-200"
                    >
                        Cetak PDF
                    </button>
                    <div className="relative group inline-block">
                        <button className="rounded-[10px] bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200">
                            Unduh Laporan (CSV) ▾
                        </button>
                        <div className="absolute right-0 mt-1.5 w-48 rounded-[12px] border border-[#222727] bg-[#111515] py-2 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-1.5 before:content-['']">
                            <a
                                href="/admin/reports/export?type=payments"
                                download
                                className="block px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                            >
                                Laporan Pembayaran
                            </a>
                            <a
                                href="/admin/reports/export?type=orders"
                                download
                                className="block px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                            >
                                Laporan Pesanan Café
                            </a>
                            <a
                                href="/admin/reports/export?type=reservations"
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
                <p className="text-sm text-gray-600 mt-1">Laporan Penjualan dan Transaksi Sistem - Dicetak tanggal: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
                <StatBox label="Total Pendapatan" value={money(revenueVal)} isRevenue={true} />
                <StatBox label="Total Reservasi" value={summary?.reservations || 0} />
                <StatBox label="Total Pesanan" value={summary?.orders || 0} />
                <StatBox label="Pembayaran Pending" value={summary?.pending_payments || 0} isWarning={summary?.pending_payments > 0} />
            </div>

            {/* Recent Orders & Reservations lists */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2 print:grid-cols-1">
                {/* Recent Orders Card */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm print:bg-white print:text-black print:border-gray-300">
                    <h3 className="text-sm font-extrabold text-white tracking-wide border-b border-[#222727] pb-3 mb-4 print:text-black print:border-gray-300">
                        Pesanan Café Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727]/80 text-[#5b6e6e] font-extrabold uppercase print:text-gray-600 print:border-gray-300">
                                    <th className="py-2.5">Kode</th>
                                    <th>Pelanggan</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/40 print:divide-gray-200">
                                {(orders || []).map((o) => (
                                    <tr key={o.id} className="text-white hover:bg-[#151919]/30 transition-colors print:text-black">
                                        <td className="py-3 font-mono font-bold text-[#ffcc00] print:text-black">{o.order_code}</td>
                                        <td>{o.user?.name || "Customer"}</td>
                                        <td className="font-bold">{money(o.total_amount)}</td>
                                        <td className="py-1.5"><StatusBadge value={o.order_status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Reservations Card */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm print:bg-white print:text-black print:border-gray-300">
                    <h3 className="text-sm font-extrabold text-white tracking-wide border-b border-[#222727] pb-3 mb-4 print:text-black print:border-gray-300">
                        Reservasi Meja Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#222727]/80 text-[#5b6e6e] font-extrabold uppercase print:text-gray-600 print:border-gray-300">
                                    <th className="py-2.5">Kode</th>
                                    <th>Pelanggan</th>
                                    <th>Meja</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222727]/40 print:divide-gray-200">
                                {(reservations || []).map((r) => (
                                    <tr key={r.id} className="text-white hover:bg-[#151919]/30 transition-colors print:text-black">
                                        <td className="py-3 font-mono font-bold text-[#ffcc00] print:text-black">{r.reservation_code}</td>
                                        <td>{r.user?.name || "Customer"}</td>
                                        <td>Meja {r.table?.name || "N/A"}</td>
                                        <td className="font-bold">{money(r.total_price)}</td>
                                        <td className="py-1.5"><StatusBadge value={r.booking_status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatBox({ label, value, isRevenue, isWarning }) {
    return (
        <div className={`rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 print:bg-white print:text-black print:border-gray-300`}>
            <span className="text-xs font-bold text-[#9aa7b3] uppercase tracking-wider block print:text-gray-500">
                {label}
            </span>
            <span className={`text-2xl font-black tracking-tight block mt-3 font-sans md:text-3xl ${
                isRevenue ? 'text-[#ffcc00]' : isWarning ? 'text-[#ff9900]' : 'text-white print:text-black'
            }`}>
                {value}
            </span>
        </div>
    );
}
