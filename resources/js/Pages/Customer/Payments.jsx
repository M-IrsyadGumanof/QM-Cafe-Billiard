import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";

export default function Payments({ payments }) {
    const data = payments?.data || [];

    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Riwayat Transaksi
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Daftar Pembayaran Anda
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Pantau status verifikasi pembayaran untuk reservasi meja billiard dan pesanan makanan Anda.
                </p>
            </div>

            {/* List */}
            <div className="mt-8 grid gap-4">
                {data.map((p) => (
                    <div
                        key={p.id}
                        className="group relative rounded-[15px] border border-[#222727] bg-gradient-to-r from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/20 hover:shadow-lg hover:shadow-[#ffcc00]/2 hover:-translate-y-0.5"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                                <span className="font-mono text-xs font-black text-[#ffcc00]">
                                    {p.payment_code}
                                </span>
                                <p className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                    Metode: <span className="text-[#c7d0d8] font-bold font-sans">{p.payment_method}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider block">
                                        Jumlah Pembayaran
                                    </span>
                                    <span className="text-base font-black text-white">
                                        {money(p.amount)}
                                    </span>
                                </div>
                                <StatusBadge value={p.status} />
                            </div>
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="rounded-[15px] border border-[#222727] bg-[#111515] p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-[#3b4747]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                        <h3 className="mt-4 text-sm font-bold text-white">
                            Belum Ada Transaksi
                        </h3>
                        <p className="mt-1 text-xs text-[#5b6e6e]">
                            Semua riwayat pembayaran Anda akan dicatat dan ditampilkan di sini.
                        </p>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
