import BilliardLayout from "@/Layouts/BilliardLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import CountdownTimer from "@/Components/Shared/CountdownTimer";
import { useState } from "react";

export default function PlayingSessions({ reservations }) {
    const [expiredSessions, setExpiredSessions] = useState([]);

    const handleSessionFinished = (id) => {
        setExpiredSessions((prev) => [...prev, id]);
    };

    const visibleSessions = (reservations || []).filter((r) => {
        const startTimestamp = new Date(r.actual_start_time).getTime();
        const totalDurationMs = r.duration_minutes * 60 * 1000;
        const endTimestamp = startTimestamp + totalDurationMs;
        
        // Filter out if already expired on load
        if (Date.now() >= endTimestamp) {
            return false;
        }
        // Filter out if expired live
        return !expiredSessions.includes(r.id);
    });

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Sessions
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Playing Sessions
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Daftar sesi permainan yang sedang aktif berjalan di meja billiard saat ini.
                </p>
            </div>

            {/* Sessions Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleSessions.length > 0 ? (
                    visibleSessions.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                <div className="flex justify-between items-start border-b border-[#222727] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                        <span className="text-[#9aa7b3] font-bold">Pemain / Pelanggan:</span>
                                        <span className="text-white font-semibold">{r.user?.name || "Customer"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#9aa7b3] font-bold">Durasi Bermain:</span>
                                        <span className="text-white font-semibold font-mono">
                                            {r.start_time?.substring(0, 5)} - {r.end_time?.substring(0, 5)}
                                        </span>
                                    </div>
                                    {r.booking_status === 'playing' && r.actual_start_time && (
                                        <div className="mt-3 pt-3 border-t border-[#222727] w-full">
                                            <CountdownTimer 
                                                startTime={r.actual_start_time} 
                                                durationMinutes={r.duration_minutes} 
                                                onFinish={() => handleSessionFinished(r.id)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Tidak ada sesi permainan billiard yang sedang aktif saat ini.
                    </div>
                )}
            </div>
        </BilliardLayout>
    );
}
