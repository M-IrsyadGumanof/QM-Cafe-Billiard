import BilliardLayout from "@/Layouts/BilliardLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { date } from "@/Components/Shared/Format";

export default function TableSchedule({ reservations }) {
    const rows = reservations || [];

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Schedule
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Table Schedule
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Jadwal pemakaian aktif meja billiard yang telah dipesan oleh pelanggan.
                </p>
            </div>

            {/* Schedule Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rows.length > 0 ? (
                    rows.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                <div className="flex justify-between items-start border-b border-[#222727] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm leading-tight">
                                                {r.table?.name || "N/A"}
                                            </p>
                                            <p className="text-[10px] text-[#ffcc00] font-mono mt-0.5">
                                                {r.reservation_code}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusBadge value={r.booking_status} />
                                </div>

                                <div className="mt-4 space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-[#9aa7b3] font-bold">Tanggal:</span>
                                        <span className="text-white font-semibold font-mono">{date(r.reservation_date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#9aa7b3] font-bold">Jam:</span>
                                        <span className="text-white font-semibold font-mono">
                                            {r.start_time?.substring(0, 5)} - {r.end_time?.substring(0, 5)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#9aa7b3] font-bold">Pelanggan:</span>
                                        <span className="text-white font-semibold">{r.user?.name || "Customer"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Tidak ada jadwal reservasi aktif meja billiard saat ini.
                    </div>
                )}
            </div>
        </BilliardLayout>
    );
}
