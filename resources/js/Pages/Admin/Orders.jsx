import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Orders({ orders }) {
    const rows = orders?.data || [];
    return (
        <AdminLayout>
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Transactions
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Order Management
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Kelola dan pantau seluruh pesanan menu makanan &amp; minuman dari pelanggan.
                </p>
            </div>

            <div className="mt-8 grid gap-3.5">
                {rows.length > 0 ? (
                    rows.map((o) => (
                        <Link
                            key={o.id}
                            href={`/admin/orders/${o.id}`}
                            className="rounded-[12px] border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/20 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px_120px] items-center gap-4">
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
                                            {o.user?.name || "Customer"}
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

                                <div className="text-right">
                                    <p className="text-base font-black text-[#ffcc00]">
                                        {money(o.total_amount)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[12px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Tidak ada data pesanan</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
