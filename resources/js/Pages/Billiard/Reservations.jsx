import BilliardLayout from "@/Layouts/BilliardLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Link } from "@inertiajs/react";

export default function Reservations({ reservations }) {
    const rows = reservations?.data || [];

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Reservations
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Table Reservations
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Daftar lengkap antrean reservasi meja billiard yang masuk dari pelanggan.
                    </p>
                </div>
            </div>

            {/* Reservations List */}
            <div className="mt-8 grid gap-3.5">
                {rows.length > 0 ? (
                    rows.map((r) => (
                        <Link
                            href={`/billiard/reservations/${r.id}`}
                            key={r.id}
                            className="rounded-[12px] border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/20 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20"
                        >
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-sm font-black text-[#ffcc00]">
                                            {r.reservation_code}
                                        </p>
                                        <p className="text-xs text-[#9aa7b3] font-bold mt-0.5 truncate">
                                            Pelanggan: <span className="text-slate-300">{r.user?.name || "Customer"}</span> • Meja: <span className="text-slate-300">{r.table?.name || "N/A"}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <table className="w-full md:w-[240px]" style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
                                    <tbody>
                                        <tr>
                                            <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#5b6e6e" }}>Booking:</td>
                                            <td><StatusBadge value={r.booking_status} /></td>
                                        </tr>
                                        <tr>
                                            <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#5b6e6e" }}>Bayar:</td>
                                            <td><StatusBadge value={r.payment_status} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[12px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Tidak ada antrean reservasi billiard saat ini</p>
                    </div>
                )}
            </div>
        </BilliardLayout>
    );
}
