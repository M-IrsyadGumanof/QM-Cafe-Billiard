import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Orders({ orders }) {
    const data = orders?.data || [];
    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Pesanan Café
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Riwayat Pesanan Kuliner
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3] max-w-xl">
                        Daftar riwayat pembelian makanan dan minuman Anda di café billiard kami.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <Link
                        href="/customer/menu"
                        className="rounded-[10px] bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200 shadow-md shadow-black/20"
                    >
                        Pesan Menu Baru
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="mt-8 grid gap-4">
                {data.length > 0 ? (
                    data.map((o) => (
                        <Link
                            href={`/customer/orders/${o.id}`}
                            key={o.id}
                            className="group relative rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/20 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_120px] items-center gap-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 min-w-0">
                                    {/* Visual Icon */}
                                    <div className="hidden h-12 w-12 shrink-0 rounded-xl bg-[#ffcc00]/5 border border-[#ffcc00]/10 items-center justify-center text-[#ffcc00] md:flex">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>

                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2.5">
                                            <span className="font-mono text-sm font-black text-[#ffcc00] tracking-wide">
                                                {o.order_code}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                                • {date(o.created_at)}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-extrabold text-white truncate">
                                            Pesanan Makanan & Minuman
                                        </h3>
                                        <p className="text-xs text-[#9aa7b3] truncate">
                                            Ketuk untuk melihat detail item dan subtotal pesanan.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-[#222727] pt-4 md:mt-0 md:border-0 md:pt-0">
                                    <table className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider w-full md:w-[240px]" style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
                                        <tbody>
                                            <tr>
                                                <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap" }}>Pesanan:</td>
                                                <td><StatusBadge value={o.order_status} /></td>
                                            </tr>
                                            <tr>
                                                <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap" }}>Bayar:</td>
                                                <td><StatusBadge value={o.payment_status} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-2 text-left md:text-right md:mt-0">
                                    <span className="text-sm font-bold text-[#5b6e6e] block md:hidden">Total Bayar:</span>
                                    <span className="text-lg font-black text-[#ffcc00] tracking-tight md:text-xl font-sans">
                                        {money(o.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20">
                        <svg className="mx-auto h-12 w-12 text-[#5b6e6e]/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="font-extrabold text-white mb-1">Belum Ada Pesanan</h3>
                        <p className="text-xs text-[#9aa7b3] mb-5 max-w-sm mx-auto">
                            Anda belum memiliki riwayat pemesanan makanan atau minuman. Lapar/haus saat bermain?
                        </p>
                        <Link
                            href="/customer/menu"
                            className="inline-block rounded-[10px] bg-[#ffcc00] px-5 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200"
                        >
                            Pesan Kuliner Sekarang
                        </Link>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}

