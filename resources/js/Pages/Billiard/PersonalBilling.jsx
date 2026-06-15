import BilliardLayout from "@/Layouts/BilliardLayout";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function PersonalBilling({ reservation }) {
    const hourly = reservation.package?.price || 40000;

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Billing
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Personal Package Billing
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Detail tarif billing sewa meja billiard personal berdasarkan durasi bermain aktual.
                    </p>
                </div>
                <Link
                    href={`/billiard/reservations/${reservation.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                >
                    <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    KEMBALI
                </Link>
            </div>

            {/* Billing Card Container */}
            <div className="mt-8 max-w-xl mx-auto">
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b border-[#222727] pb-3">
                        Rincian Billing Personal
                    </h3>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[#9aa7b3] font-bold">Kode Reservasi:</span>
                            <span className="text-white font-mono font-extrabold">{reservation.reservation_code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#9aa7b3] font-bold">Nama Pelanggan:</span>
                            <span className="text-white font-extrabold">{reservation.user?.name || "Customer"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#9aa7b3] font-bold">Meja Billiard:</span>
                            <span className="text-white font-extrabold">{reservation.table?.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-end border-t border-[#222727]/50 pt-4">
                            <span className="text-[#9aa7b3] font-bold">Tarif Sewa (Per Jam):</span>
                            <span className="text-2xl font-black text-[#ffcc00] font-sans">
                                {money(hourly)} <span className="text-xs text-[#9aa7b3] font-bold">/ Jam</span>
                            </span>
                        </div>
                    </div>

                    {/* Alert Info Box */}
                    <div className="mt-6 p-4 rounded-xl bg-[#ffcc00]/5 border border-[#ffcc00]/10 flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#ffcc00] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-xs text-[#c7d0d8] leading-relaxed">
                            <p className="font-bold text-white mb-0.5">Catatan Staf Billiard:</p>
                            Untuk demo MVP ini, perhitungan durasi bermain aktual dapat dicatat dan dihitung manual oleh staf billiard saat pelanggan checkout dari meja.
                        </div>
                    </div>
                </div>
            </div>
        </BilliardLayout>
    );
}
