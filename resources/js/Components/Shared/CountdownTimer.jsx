import { useEffect, useState } from "react";

export default function CountdownTimer({ startTime, durationMinutes, onFinish, showProgress = true }) {
    const [timeLeft, setTimeLeft] = useState(0); // in milliseconds
    const [progress, setProgress] = useState(100);

    const startTimestamp = new Date(startTime).getTime();
    const totalDurationMs = durationMinutes * 60 * 1000;
    const endTimestamp = startTimestamp + totalDurationMs;

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            const remaining = endTimestamp - now;

            if (remaining <= 0) {
                setTimeLeft(0);
                setProgress(0);
                if (onFinish) onFinish();
            } else {
                setTimeLeft(remaining);
                const percent = (remaining / totalDurationMs) * 100;
                setProgress(Math.max(0, Math.min(100, percent)));
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [startTime, durationMinutes]);

    const formatTime = (ms) => {
        if (ms <= 0) return "WAKTU HABIS!";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => String(num).padStart(2, "0");
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const isExpiring = timeLeft > 0 && timeLeft <= 5 * 60 * 1000; // 5 minutes or less
    const isFinished = timeLeft <= 0;

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isFinished 
                        ? 'text-red-500' 
                        : isExpiring 
                            ? 'text-rose-400 animate-pulse' 
                            : 'text-[#9aa7b3]'
                }`}>
                    {isFinished 
                        ? "SESI SELESAI" 
                        : isExpiring 
                            ? "WAKTU HAMPIR HABIS" 
                            : "SISA WAKTU BERMAIN"}
                </span>
                <span className={`font-mono text-base font-black tracking-widest ${
                    isFinished 
                        ? 'text-red-500 font-sans' 
                        : isExpiring 
                            ? 'text-rose-400 animate-pulse' 
                            : 'text-[#ffcc00]'
                } drop-shadow-[0_0_8px_rgba(255,204,0,0.15)]`}>
                    {formatTime(timeLeft)}
                </span>
            </div>
            
            {showProgress && (
                <div className="w-full bg-[#1c2222] h-2 rounded-full overflow-hidden border border-[#2b3232]/50">
                    <div
                        className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                            isFinished 
                                ? "bg-red-600" 
                                : isExpiring 
                                    ? "bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" 
                                    : "bg-gradient-to-r from-[#ffcc00] to-[#ffd633] shadow-[0_0_8px_rgba(255,204,0,0.3)]"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}
