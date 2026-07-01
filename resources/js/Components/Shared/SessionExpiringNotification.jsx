import { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function SessionExpiringNotification() {
    const { auth } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const progressInterval = useRef(null);

    // Sintesis suara alarm peringatan digital menggunakan Web Audio API
    const playWarningSound = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Bunyi alarm bip ganda (bip.. bip..)
            const playBeep = (startTime, frequency, duration) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle'; // Suara peringatan yang halus tapi tegas
                osc.frequency.setValueAtTime(frequency, startTime);
                
                gain.gain.setValueAtTime(0.15, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            // Alarm 1
            playBeep(audioCtx.currentTime, 880, 0.25); // Pitch tinggi
            playBeep(audioCtx.currentTime + 0.1, 880, 0.25);
            
            // Alarm 2 (1 detik kemudian)
            playBeep(audioCtx.currentTime + 0.8, 880, 0.25);
            playBeep(audioCtx.currentTime + 0.9, 880, 0.25);
        } catch (e) {
            console.warn("Audio autoplay dicegah oleh browser. Interaksi pengguna diperlukan.", e);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
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
            playWarningSound();
        });

        // Fallback for namespaced event if listener above doesn't trigger
        channel.listen('.App\\Events\\SessionExpiringEvent', (data) => {
            console.log('Received namespaced SessionExpiringEvent:', data);
            setNotification(data);
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
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

        setProgress(100);
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

    // Fungsi simulasi instan untuk presentasi dosen
    const triggerSimulation = () => {
        const dummyData = {
            reservation_id: 99,
            reservation_code: 'RSV-DEMO-LECTURER',
            table_name: 'Meja VIP Executive 3',
            remaining_minutes: 5,
            end_time: new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: 'Waktu bermain Anda di Meja VIP Executive 3 tersisa 5 menit!'
        };
        
        setNotification(dummyData);
        setIsVisible(true);
        setProgress(100);
        playWarningSound();
    };

    if (!auth.user) return null;

    return (
        <>
            {/* Tombol Simulasi - Hanya muncul di environment lokal/dev untuk presentasi */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={triggerSimulation}
                    className="flex items-center gap-2 rounded-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#151919] px-4 py-2.5 text-xs font-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#ffd633]"
                >
                    <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span>Simulasi Peringatan (Dosen)</span>
                </button>
            </div>

            {/* Modal Pop-up Notifikasi */}
            {isVisible && notification && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/75 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-[#111515] border border-[#ffcc00]/40 w-full max-w-md rounded-[20px] shadow-2xl shadow-[#ffcc00]/10 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Header Warning */}
                        <div className="bg-gradient-to-r from-red-600/20 to-[#ffcc00]/25 p-5 border-b border-[#ffcc00]/20 flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 bg-[#ffcc00] text-[#151919] rounded-full flex items-center justify-center animate-pulse">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    PERINGATAN WAKTU BERMAIN
                                </h3>
                                <p className="text-[10px] text-[#ffcc00] font-bold tracking-widest font-mono">
                                    SISA WAKTU: {notification.remaining_minutes} MENIT!
                                </p>
                            </div>
                        </div>

                        {/* Detail Info */}
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                                {notification.message}
                            </p>

                            <div className="bg-[#151919] rounded-[14px] p-4 border border-[#222727] space-y-2.5">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold">Kode Reservasi</span>
                                    <span className="text-[#ffcc00] font-black font-mono bg-[#ffcc00]/10 px-2 py-0.5 rounded border border-[#ffcc00]/20">
                                        {notification.reservation_code}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold">Nama Meja</span>
                                    <span className="text-white font-extrabold">{notification.table_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold">Selesai Pukul</span>
                                    <span className="text-red-400 font-black font-mono">{notification.end_time} WIB</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons & Progress Bar */}
                        <div className="p-6 pt-0 space-y-4">
                            <button
                                onClick={handleDismiss}
                                className="w-full flex items-center justify-center rounded-[12px] bg-[#ffcc00] hover:bg-[#e6b800] text-[#151919] px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#ffcc00]/10"
                            >
                                OK, Saya Mengerti
                            </button>

                            {/* Auto Dismiss Progress Bar */}
                            <div className="w-full bg-[#1c2222] h-1 rounded-full overflow-hidden">
                                <div 
                                    className="bg-[#ffcc00] h-full transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
