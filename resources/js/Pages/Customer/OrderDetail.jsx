import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function OrderDetail({ order }) {
    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6 mb-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Detail Pesanan
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-mono">
                        {order.order_code}
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Rincian item kuliner yang dipesan dan status pembayaran Anda.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-center">
                    <StatusBadge value={order.order_status} />
                    <StatusBadge value={order.payment_status} />
                    <Link
                        href="/customer/orders"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                    >
                        <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        KEMBALI
                    </Link>
                </div>
            </div>

            {/* Invoice Receipt Card */}
            <div className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#181d1d] to-[#111515] overflow-hidden shadow-lg">
                <div className="border-b border-[#222727] bg-[#151919]/50 px-6 py-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">Item Pesanan</h2>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        {order.items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b border-[#222727]/50 pb-4 last:border-0 last:pb-0"
                            >
                                <div className="space-y-1">
                                    <h4 className="text-sm font-extrabold text-white">{item.menu_name}</h4>
                                    <span className="text-xs text-[#9aa7b3] font-mono">
                                        Qty: {item.quantity} x {money(item.subtotal / item.quantity)}
                                    </span>
                                </div>
                                <span className="text-sm font-black text-white font-mono">
                                    {money(item.subtotal)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-[#222727]" />

                    {/* Total Area */}
                    <div className="flex items-center justify-between bg-[#151919]/30 rounded-xl p-4 border border-[#222727]/50">
                        <div>
                            <span className="text-xs font-bold text-[#9aa7b3] uppercase tracking-wider block">Total Pembayaran</span>
                            <span className="text-[10px] text-[#5b6e6e] font-bold mt-0.5 block">(Sudah termasuk pajak café)</span>
                        </div>
                        <span className="text-2xl font-black text-[#ffcc00] tracking-tight font-sans">
                            {money(order.total_amount)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {order.payment_status !== "verified" && (
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href={`/customer/payments/upload?type=order&id=${order.id}`}
                        className="inline-flex items-center gap-2 rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200 shadow-md shadow-black/20"
                    >
                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Unggah Bukti Pembayaran
                    </Link>
                </div>
            )}
        </CustomerLayout>
    );
}

