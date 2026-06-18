import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { useForm, Link } from "@inertiajs/react";

export default function OrderDetail({ order }) {
    const f = useForm({ order_status: order.order_status });
    
    const submit = (e) => {
        e.preventDefault();
        f.patch(`/admin/orders/${order.id}/status`);
    };

    return (
        <AdminLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Transaction Detail
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Order: {order.order_code}
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Detail transaksi pemesanan menu makanan & minuman pelanggan.
                    </p>
                </div>
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                >
                    <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    KEMBALI
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727] pb-3">
                            Daftar Item Menu
                        </h3>
                        <div className="divide-y divide-[#222727]/60">
                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{item.menu_name}</p>
                                            <p className="text-xs text-[#9aa7b3] font-mono mt-0.5">
                                                {money(item.subtotal / item.quantity)} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-white text-sm">
                                            {money(item.subtotal)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Invoice summary highlight */}
                        <div className="mt-6 p-4 rounded-xl bg-[#ffcc00]/5 border border-[#ffcc00]/10 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#9aa7b3] font-bold uppercase tracking-wider">Total Tagihan</p>
                                <p className="text-[10px] text-[#ffcc00] font-mono mt-0.5">Sudah termasuk pajak & service</p>
                            </div>
                            <span className="text-2xl font-black text-[#ffcc00]">
                                {money(order.total_amount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info & Status Action */}
                <div className="space-y-6">
                    {/* Customer Info Card */}
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727] pb-3">
                            Informasi Transaksi
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">Pelanggan</p>
                                <p className="mt-1 font-bold text-white text-sm">{order.user?.name || "Customer"}</p>
                                <p className="text-xs text-[#9aa7b3] font-mono">{order.user?.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">Waktu Pemesanan</p>
                                <p className="mt-1 text-xs text-white font-mono">{date(order.created_at)}</p>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b6e6e]">Status Pesanan</p>
                                    <StatusBadge value={order.order_status} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b6e6e]">Status Bayar</p>
                                    <StatusBadge value={order.payment_status} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update Card */}
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727] pb-3">
                            Tindakan Admin
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">
                                    Update Status Pesanan
                                </label>
                                <select
                                    value={f.data.order_status}
                                    onChange={(e) => f.setData("order_status", e.target.value)}
                                    className="modern-select w-full"
                                >
                                    <option value="pending_payment">Pending Payment</option>
                                    <option value="paid">Paid</option>
                                    <option value="processing">Processing</option>
                                    <option value="ready">Ready for Pickup</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={f.processing}
                                className="modern-btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Simpan Perubahan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

