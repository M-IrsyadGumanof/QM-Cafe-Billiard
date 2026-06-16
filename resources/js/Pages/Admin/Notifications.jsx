import AdminLayout from "@/Layouts/AdminLayout";
import { date } from "@/Components/Shared/Format";

export default function Notifications({ notifications }) {
    const rows = notifications?.data || [];

    return (
        <AdminLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    System
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Admin Notifications
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Pesan sistem dan pemberitahuan aktivitas transaksi QM Cafe & Billiard.
                </p>
            </div>

            {/* Notifications List */}
            <div className="mt-8 space-y-3.5">
                {rows.length > 0 ? (
                    rows.map((n) => (
                        <div
                            key={n.id}
                            className="rounded-[12px] border border-[#222727] bg-[#111515]/60 p-4 transition-all duration-300 hover:bg-[#181d1d] hover:border-[#ffcc00]/10 flex gap-4 items-start"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <p className="font-bold text-white text-sm">{n.title}</p>
                                    {n.created_at && (
                                        <span className="text-[10px] text-[#5b6e6e] font-mono">
                                            {date(n.created_at)}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-xs text-[#c7d0d8] leading-relaxed">{n.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-[12px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Tidak ada notifikasi sistem saat ini</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

