import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function Reservations({ reservations }) {
    const data = reservations?.data || [];
    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Reservasi Meja
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Riwayat Reservasi Anda
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3] max-w-xl">
                        Pantau status pesanan meja billiard, jadwal bermain, serta detail pembayaran Anda di sini.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <Link
                        href="/customer/reservations/create"
                        className="rounded-[10px] bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200 shadow-md shadow-black/20"
                    >
                        + Reservasi Baru
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="mt-8 grid gap-4">
                {data.length > 0 ? (
                    data.map((r) => (
                        <Link
                            href={`/customer/reservations/${r.id}`}
                            key={r.id}
                            className="group relative rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/20 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_120px] items-center gap-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 min-w-0">
                                    {/* Visual Icon */}
                                    <div className="hidden h-12 w-12 shrink-0 rounded-xl bg-[#ffcc00]/5 border border-[#ffcc00]/10 items-center justify-center text-[#ffcc00] md:flex">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2.5">
                                            <span className="font-mono text-sm font-black text-[#ffcc00] tracking-wide">
                                                {r.reservation_code}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                                • {date(r.reservation_date)}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-extrabold text-white truncate">
                                            Meja {r.table?.name || "N/A"}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9aa7b3]">
                                            <span>Paket: <strong className="text-[#c7d0d8] font-bold">{r.package?.name || "Biasa"}</strong></span>
                                            <span className="text-[#2b3232]">•</span>
                                            <span>Waktu: <strong className="text-[#c7d0d8] font-mono">{r.start_time?.substring(0, 5)} - {r.end_time?.substring(0, 5) || "Selesai"}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-[#222727] pt-4 md:mt-0 md:border-0 md:pt-0">
                                    <table className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider w-full md:w-[240px]" style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}>
                                        <tbody>
                                            <tr>
                                                <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap" }}>Booking:</td>
                                                <td><StatusBadge value={r.booking_status} /></td>
                                            </tr>
                                            <tr>
                                                <td className="w-20" style={{ paddingRight: "8px", whiteSpace: "nowrap" }}>Bayar:</td>
                                                <td><StatusBadge value={r.payment_status} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-2 text-left md:text-right md:mt-0">
                                    <span className="text-sm font-bold text-[#5b6e6e] block md:hidden">Total Biaya:</span>
                                    <span className="text-lg font-black text-[#ffcc00] tracking-tight md:text-xl font-sans">
                                        {money(r.total_price)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20">
                        <svg className="mx-auto h-12 w-12 text-[#5b6e6e]/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="font-extrabold text-white mb-1">Belum Ada Reservasi</h3>
                        <p className="text-xs text-[#9aa7b3] mb-5 max-w-sm mx-auto">
                            Anda belum pernah melakukan reservasi meja billiard. Ingin mencoba sekarang?
                        </p>
                        <Link
                            href="/customer/reservations/create"
                            className="inline-block rounded-[10px] bg-[#ffcc00] px-5 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200"
                        >
                            Buat Reservasi Baru
                        </Link>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}

    