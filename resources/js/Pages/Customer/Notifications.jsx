import CustomerLayout from "@/Layouts/CustomerLayout";
import { date } from "@/Components/Shared/Format";

export default function Notifications({ notifications }) {
    const data = notifications?.data || [];
    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Pusat Informasi
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Notifikasi Anda
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Terima informasi status reservasi billiard, pesanan kuliner, serta info promo terbaru langsung ke akun Anda.
                </p>
            </div>

            {/* List */}
            <div className="mt-8 grid gap-4">
                {data.length > 0 ? (
                    data.map((n) => (
                        <div
                            key={n.id}
                            className="group relative flex gap-4 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            {/* Notification Dot Indicator */}
                            <div className="flex mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ffcc00] shadow-sm shadow-[#ffcc00]/50 animate-pulse" />

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between gap-2.5">
                                    <h3 className="font-extrabold text-base leading-snug text-white tracking-wide">
                                        {n.title}
                                    </h3>
                                    {n.created_at && (
                                        <span className="text-[10px] font-bold text-[#5b6e6e] font-mono shrink-0">
                                            {date(n.created_at)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[#c7d0d8] leading-relaxed">
                                    {n.message}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20">
                        <svg className="mx-auto h-12 w-12 text-[#5b6e6e]/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <h3 className="font-extrabold text-white mb-1">Tidak Ada Notifikasi</h3>
                        <p className="text-xs text-[#9aa7b3] max-w-sm mx-auto">
                            Kotak masuk Anda kosong. Semua update status transaksi akan muncul di sini.
                        </p>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}

