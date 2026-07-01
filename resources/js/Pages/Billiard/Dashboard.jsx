import BilliardLayout from "@/Layouts/BilliardLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Link } from "@inertiajs/react";
import CountdownTimer from "@/Components/Shared/CountdownTimer";
import { useState } from "react";

export default function Dashboard({ stats, reservations, activeSessions }) {
    const [expiredSessions, setExpiredSessions] = useState([]);

    const handleSessionFinished = (id) => {
        setExpiredSessions((prev) => [...prev, id]);
    };

    const visibleSessions = (activeSessions || []).filter((s) => {
        const startTimestamp = new Date(s.actual_start_time).getTime();
        const totalDurationMs = s.duration_minutes * 60 * 1000;
        const endTimestamp = startTimestamp + totalDurationMs;
        
        // Filter out if already expired on load
        if (Date.now() >= endTimestamp) {
            return false;
        }
        // Filter out if expired live
        return !expiredSessions.includes(s.id);
    });

    const formatKey = (key) => {
        return key.replaceAll("_", " ").toUpperCase();
    };

    const getStatColor = (key) => {
        if (key.includes("playing")) return "text-amber-400";
        if (key.includes("confirmed")) return "text-emerald-400";
        if (key.includes("pending")) return "text-[#ffcc00]";
        return "text-slate-300";
    };

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Billiard Dashboard
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Pantau status permainan, reservasi masuk, dan kelola aktivitas sewa meja billiard secara real-time.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(stats || {}).map(([k, v]) => (
                    <div
                        key={k}
                        className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/10"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#9aa7b3] uppercase tracking-wider">
                                {formatKey(k)}
                            </span>
                            <div className="rounded-lg p-1.5 bg-[#151919] border border-[#222727]">
                                <svg className={`w-4 h-4 ${getStatColor(k)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-black text-white font-sans md:text-3xl">
                                {v}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Active Billiard Sessions Section */}
            {visibleSessions.length > 0 && (
                <div className="mt-10">
                    <div className="border-b border-[#222727] pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="text-base font-extrabold text-white tracking-wide">
                                Sesi Bermain Aktif (Billiard)
                            </h3>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                            {visibleSessions.length} MEJA AKTIF
                        </span>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleSessions.map((session) => (
                            <Link
                                key={session.id}
                                href={`/billiard/reservations/${session.id}`}
                                className="rounded-[15px] border border-[#222727] bg-[#111515]/60 p-5 shadow-sm transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/25 block hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex justify-between items-start border-b border-[#222727] pb-3 mb-3">
                                    <div>
                                        <h4 className="font-bold text-white text-sm">
                                            {session.table?.name || "Meja Billiard"}
                                        </h4>
                                        <p className="text-[10px] text-[#ffcc00] font-mono mt-0.5 font-bold">
                                            {session.reservation_code}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-[#9aa7b3] uppercase font-bold">Pemain</p>
                                        <p className="text-xs text-white font-bold">{session.user?.name || "Customer"}</p>
                                    </div>
                                </div>

                                <div className="mt-2 bg-[#0f1212]/40 p-3.5 rounded-xl border border-[#222727]/60">
                                    <CountdownTimer 
                                        startTime={session.actual_start_time} 
                                        durationMinutes={session.duration_minutes} 
                                        onFinish={() => handleSessionFinished(session.id)}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Reservations list */}
            <div className="mt-10 border-b border-[#222727] pb-3 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white tracking-wide">
                    Antrean Reservasi Terbaru
                </h3>
                <Link
                    href="/billiard/reservations"
                    className="text-xs font-bold text-[#ffcc00] hover:underline"
                >
                    Lihat Semua &rarr;
                </Link>
            </div>

            <div className="mt-6 grid gap-3.5">
                {reservations && reservations.length > 0 ? (
                    reservations.map((r) => (
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
                        <p className="text-sm text-[#5b6e6e]">Tidak ada antrean reservasi meja saat ini</p>
                    </div>
                )}
            </div>
        </BilliardLayout>
    );
}
