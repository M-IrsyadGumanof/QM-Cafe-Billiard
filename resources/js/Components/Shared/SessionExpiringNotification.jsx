import { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function SessionExpiringNotification() {
    const { auth } = usePage().props;
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
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
            setNotification({ ...data, type: 'expiring' });
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
        });

        channel.listen('.App\\Events\\SessionExpiringEvent', (data) => {
            console.log('Received namespaced SessionExpiringEvent:', data);
            setNotification({ ...data, type: 'expiring' });
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
        });

        channel.listen('SessionExpiredEvent', (data) => {
            console.log('Received SessionExpiredEvent:', data);
            setNotification({ ...data, type: 'expired' });
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
        });

        channel.listen('.App\\Events\\SessionExpiredEvent', (data) => {
            console.log('Received namespaced SessionExpiredEvent:', data);
            setNotification({ ...data, type: 'expired' });
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
        });

        const handleLocalExpired = (e) => {
            console.log('Received local-session-expired event:', e.detail);
            setNotification({ ...e.detail, type: 'expired' });
            setIsVisible(true);
            setProgress(100);
            playWarningSound();
        };

        window.addEventListener('local-session-expired', handleLocalExpired);

        return () => {
            console.log(`Leaving private channel: customer.${auth.user.id}`);
            window.Echo.leave(`customer.${auth.user.id}`);
            window.removeEventListener('local-session-expired', handleLocalExpired);
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
            message: 'Waktu bermain Anda di Meja VIP Executive 3 tersisa 5 menit!',
            type: 'expiring'
        };
        
        setNotification(dummyData);
        setIsVisible(true);
        setProgress(100);
        playWarningSound();
    };

    const triggerExpiredSimulation = () => {
        const dummyData = {
            reservation_id: 99,
            reservation_code: 'RSV-DEMO-LECTURER',
            table_name: 'Meja VIP Executive 3',
            remaining_minutes: 0,
            end_time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: 'Waktu bermain Anda di Meja VIP Executive 3 telah habis!',
            type: 'expired'
        };
        
        setNotification(dummyData);
        setIsVisible(true);
        setProgress(100);
        playWarningSound();
    };

    if (!auth.user) return null;

    const isExpired = notification?.type === 'expired';

    return (
        <>
            {/* Tombol Simulasi - Hanya muncul di environment lokal/dev untuk presentasi */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
                {isDemoOpen ? (
                    <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#111515] border border-[#222727] shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
                        <div className="flex items-center justify-between gap-4 border-b border-[#222727] pb-2 mb-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#ffcc00] font-sans">
                                Panel Demo Dosen
                            </span>
                            <button 
                                onClick={() => setIsDemoOpen(false)}
                                className="text-[#9aa7b3] hover:text-white text-[10px] font-black px-2 py-0.5 rounded bg-[#181d1d] border border-[#222727] hover:bg-[#222727] transition-all duration-200"
                            >
                                Tutup
                            </button>
                        </div>
                        
                        <button
                            onClick={triggerSimulation}
                            className="flex items-center gap-2 rounded-xl bg-[#ffcc00] hover:bg-[#e6b800] text-[#151919] px-3.5 py-2 text-[11px] font-black shadow-md transition-all duration-300 transform hover:scale-[1.02] border border-[#ffd633]"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span>Simulasi 5 Menit</span>
                        </button>
                        <button
                            onClick={triggerExpiredSimulation}
                            className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 text-[11px] font-black shadow-md transition-all duration-300 transform hover:scale-[1.02] border border-red-500"
                        >
                            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Simulasi Habis</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsDemoOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#151919] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-[#ffd633] relative group"
                        title="Buka Panel Demo Dosen"
                    >
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <svg className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Modal Pop-up Notifikasi */}
            {isVisible && notification && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/75 backdrop-blur-sm transition-all duration-300">
                    <div className={`bg-[#111515] border ${isExpired ? 'border-red-500/40' : 'border-[#ffcc00]/40'} w-full max-w-md rounded-[20px] shadow-2xl ${isExpired ? 'shadow-red-500/10' : 'shadow-[#ffcc00]/10'} overflow-hidden transform animate-in fade-in zoom-in-95 duration-200`}>
                        
                        {/* Header Warning */}
                        <div className={`bg-gradient-to-r ${isExpired ? 'from-red-800/40 to-red-600/20' : 'from-red-600/20 to-[#ffcc00]/25'} p-5 border-b ${isExpired ? 'border-red-500/20' : 'border-[#ffcc00]/20'} flex items-center gap-3`}>
                            <div className={`h-10 w-10 shrink-0 ${isExpired ? 'bg-red-600 text-white animate-bounce' : 'bg-[#ffcc00] text-[#151919] animate-pulse'} rounded-full flex items-center justify-center`}>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    {isExpired ? 'WAKTU BERMAIN SELESAI' : 'PERINGATAN WAKTU BERMAIN'}
                                </h3>
                                <p className={`text-[10px] ${isExpired ? 'text-red-400' : 'text-[#ffcc00]'} font-bold tracking-widest font-mono`}>
                                    {isExpired ? 'STATUS: WAKTU HABIS!' : `SISA WAKTU: ${notification.remaining_minutes} MENIT!`}
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
                                    <span className={`font-black font-mono ${isExpired ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/20'} px-2 py-0.5 rounded border`}>
                                        {notification.reservation_code}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold">Nama Meja</span>
                                    <span className="text-white font-extrabold">{notification.table_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold">{isExpired ? 'Selesai Pada' : 'Selesai Pukul'}</span>
                                    <span className={`${isExpired ? 'text-red-400' : 'text-red-400'} font-black font-mono`}>{notification.end_time} WIB</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons & Progress Bar */}
                        <div className="p-6 pt-0 space-y-4">
                            <button
                                onClick={handleDismiss}
                                className={`w-full flex items-center justify-center rounded-[12px] ${isExpired ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/10' : 'bg-[#ffcc00] hover:bg-[#e6b800] text-[#151919] shadow-[#ffcc00]/10'} px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md`}
                            >
                                {isExpired ? 'Tutup' : 'OK, Saya Mengerti'}
                            </button>

                            {/* Auto Dismiss Progress Bar */}
                            <div className="w-full bg-[#1c2222] h-1 rounded-full overflow-hidden">
                                <div 
                                    className={`${isExpired ? 'bg-red-600' : 'bg-[#ffcc00]'} h-full transition-all duration-100 ease-linear`}
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
