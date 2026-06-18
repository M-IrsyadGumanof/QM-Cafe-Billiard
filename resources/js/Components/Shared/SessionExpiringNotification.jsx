import { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function SessionExpiringNotification() {
    const { auth } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const progressInterval = useRef(null);
    const audioRef = useRef(null);

    const playNotificationSound = () => {
        try {
            if (!audioRef.current) {
                audioRef.current = new Audio('/sounds/warning-alert.mpeg');
            }
            // Reset to beginning if already playing
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.warn('Audio play blocked or failed:', err);
            });
        } catch (e) {
            console.error('Audio initialization error:', e);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        if (!auth.user || !window.Echo) {
            console.log('Echo or User is not ready for notifications.');
            return;
        }

        console.log(`Subscribing to private channel: customer.${auth.user.id}`);
        const channel = window.Echo.private(`customer.${auth.user.id}`);

        channel.listen('SessionExpiringEvent', (data) => {
            console.log('Received SessionExpiringEvent:', data);
            setNotification(data);
            setIsVisible(true);
            setProgress(100);
            playNotificationSound();
        });

        // Fallback for namespaced event if listener above doesn't trigger
        channel.listen('.App\\Events\\SessionExpiringEvent', (data) => {
            console.log('Received namespaced SessionExpiringEvent:', data);
            setNotification(data);
            setIsVisible(true);
            setProgress(100);
            playNotificationSound();
        });

        return () => {
            console.log(`Leaving private channel: customer.${auth.user.id}`);
            window.Echo.leave(`customer.${auth.user.id}`);
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [auth.user]);

    // Handle the 30-second progress bar countdown and auto-dismiss
    useEffect(() => {
        if (!isVisible) return;

        const duration = 30000; // 30 seconds
        const step = 100; // Update every 100ms
        const decrement = (step / duration) * 100;

        progressInterval.current = setInterval(() => {
            setProgress((prev) => {
                if (prev <= decrement) {
                    setIsVisible(false);
                    clearInterval(progressInterval.current);
                    return 0;
                }
                return prev - decrement;
            });
        }, step);

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [isVisible]);

    if (!isVisible || !notification) return null;

    const formatEndTime = (timeStr) => {
        if (!timeStr) return '';
        try {
            // If it's just a time like "14:30:00" or similar
            if (typeof timeStr === 'string' && timeStr.includes(':') && !timeStr.includes('-') && !timeStr.includes('T')) {
                const parts = timeStr.split(':');
                if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
                return timeStr;
            }
            const date = new Date(timeStr);
            if (isNaN(date.getTime())) return timeStr;
            return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return timeStr;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300">
            {/* Modal Container with glowing warning border */}
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#ffcc00]/30 bg-[#111515] p-6 shadow-2xl shadow-[#ffcc00]/10 transition-all duration-300">
                
                {/* Warning Light Pulse Overlay */}
                <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-[#ffcc00]/10 blur-xl animate-pulse" />
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-[#ffcc00]/10 blur-xl animate-pulse" />

                <div className="flex flex-col items-center text-center space-y-4">
                    {/* Animated Warning Icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/30 animate-bounce">
                        <svg 
                            className="h-9 w-9 text-[#ffcc00]" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-black uppercase tracking-wider text-white">
                            Peringatan Waktu Bermain!
                        </h3>
                        <p className="text-xs text-[#9aa7b3] font-medium">
                            Sesi Anda di meja billiard akan segera berakhir.
                        </p>
                    </div>

                    {/* Information Box */}
                    <div className="w-full rounded-xl border border-[#222727] bg-[#151919] p-4 text-left space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-[#222727]">
                            <span className="text-[10px] font-bold text-[#4f5e5e] uppercase tracking-wider">Meja Billiard</span>
                            <span className="text-sm font-extrabold text-[#ffcc00]">{notification.table_name || '-'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-2 border-b border-[#222727]">
                            <span className="text-[10px] font-bold text-[#4f5e5e] uppercase tracking-wider">Sisa Waktu</span>
                            <span className="text-sm font-extrabold text-red-400 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping inline-block" />
                                {notification.remaining_minutes || '5'} Menit
                            </span>
                        </div>

                        <div className="flex justify-between items-center pb-2 border-b border-[#222727]">
                            <span className="text-[10px] font-bold text-[#4f5e5e] uppercase tracking-wider">Kode Reservasi</span>
                            <span className="text-xs font-mono font-bold text-slate-300">{notification.reservation_code || '-'}</span>
                        </div>

                        {notification.end_time && (
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-[#4f5e5e] uppercase tracking-wider">Berakhir Pukul</span>
                                <span className="text-xs font-bold text-slate-300">{formatEndTime(notification.end_time)} WIB</span>
                            </div>
                        )}
                    </div>

                    {/* Dismiss Button */}
                    <button
                        onClick={handleDismiss}
                        className="w-full py-3 px-4 rounded-xl bg-[#ffcc00] text-[#151919] font-black text-xs uppercase tracking-wider hover:bg-[#ffd633] transition-all duration-300 hover:shadow-lg hover:shadow-[#ffcc00]/20 active:scale-95 focus:outline-none"
                    >
                        OK, Saya Mengerti
                    </button>
                </div>

                {/* Progress Bar (Auto dismiss indicator) */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#222727]">
                    <div 
                        className="h-full bg-gradient-to-r from-[#ffcc00] to-[#ffd633] transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
