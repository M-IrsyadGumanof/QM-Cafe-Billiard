import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function TableSchedule({ tables }) {
    return (
        <AdminLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Billiard Tables
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Table Schedule
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Pantau status ketersediaan dan daftar reservasi aktif pada setiap meja billiard.
                </p>
            </div>

            {/* Tables Schedule Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(tables || []).map((t) => (
                    <div
                        key={t.id}
                        className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                    >
                        <div>
                            {/* Table Header */}
                            <div className="flex justify-between items-start border-b border-[#222727] pb-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm leading-tight">{t.name}</p>
                                        <p className="text-[10px] text-[#ffcc00] font-mono mt-0.5">#{t.table_number}</p>
                                    </div>
                                </div>
                                <StatusBadge value={t.status} />
                            </div>

                            {/* Active Reservations list */}
                            <div className="mt-4">
                                <p className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider mb-2.5">
                                    Reservasi Aktif ({t.reservations?.length || 0})
                                </p>
                                {t.reservations && t.reservations.length > 0 ? (
                                    <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                        {t.reservations.map((res) => (
                                            <div
                                                key={res.id}
                                                className="text-[11px] bg-[#111515]/70 border border-[#222727] rounded-lg p-2.5 flex justify-between items-center transition-colors duration-200 hover:bg-[#151919]"
                                            >
                                                <div>
                                                    <p className="font-bold text-slate-200 truncate max-w-[120px]">
                                                        {res.user?.name || "Customer"}
                                                    </p>
                                                    <p className="text-[9px] text-[#ffcc00] font-mono mt-0.5">
                                                        {res.reservation_date} • {res.start_time?.substring(0, 5)} - {res.end_time?.substring(0, 5)}
                                                    </p>
                                                </div>
                                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border text-[#ffcc00] bg-[#ffcc00]/5 border-[#ffcc00]/10">
                                                    {res.booking_status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-[#222727] border-dashed bg-[#111515]/20 py-6 text-center">
                                        <p className="text-[11px] text-[#5b6e6e] italic">Belum ada reservasi aktif</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

