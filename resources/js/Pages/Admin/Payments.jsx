import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Payments({ payments }) {
    const rows = payments?.data || [];
    return (
        <AdminLayout>
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Transactions
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Payment Verification
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Verifikasi bukti pembayaran transfer bank/E-Wallet dari pelanggan.
                </p>
            </div>

            <div className="mt-8 grid gap-3.5">
                {rows.length > 0 ? (
                    rows.map((p) => (
                        <Link
                            key={p.id}
                            href={`/admin/payments/${p.id}`}
                            className="rounded-[12px] border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/20 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px_120px] items-center gap-4">
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-sm font-black text-[#ffcc00]">
                                            {p.payment_code}
                                        </p>
                                        <p className="text-xs text-[#9aa7b3] font-bold mt-0.5 truncate">
                                            {p.user?.name || "Customer"} • <span className="text-slate-300">{p.payment_method}</span>
                                        </p>
                                    </div>
                                </div>

                                <table className="w-full md:w-[240px]" style={{ borderSpacing: "0", borderCollapse: "separate" }}>
                                    <tbody>
                                        <tr>
                                            <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#5b6e6e" }}>Status:</td>
                                            <td><StatusBadge value={p.status} /></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="text-right">
                                    <p className="text-base font-black text-[#ffcc00]">
                                        {money(p.amount)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[12px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Tidak ada data pembayaran</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
