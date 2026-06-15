import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";

export default function ReservationDetail({ reservation }) {
    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6 mb-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Detail Reservasi
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-mono">
                        {reservation.reservation_code}
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Informasi jadwal bermain billiard dan status booking meja Anda.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-center">
                    <StatusBadge value={reservation.booking_status} />
                    <StatusBadge value={reservation.payment_status} />
                    <Link
                        href="/customer/reservations"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                    >
                        <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        KEMBALI
                    </Link>
                </div>
            </div>

            {/* Detail Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Table Detail */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                    <div className="flex items-center gap-3 border-b border-[#222727] pb-4">
                        <div className="rounded-lg bg-[#ffcc00]/10 p-2 text-[#ffcc00] border border-[#ffcc00]/20">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="font-extrabold text-white text-base">Informasi Meja</h3>
                    </div>
                    <div className="mt-4 space-y-3.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Meja Billiard:</span>
                            <span className="text-white font-extrabold">Meja {reservation.table?.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Tanggal Main:</span>
                            <span className="text-white font-extrabold font-mono">{date(reservation.reservation_date)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Waktu Durasi:</span>
                            <span className="text-white font-extrabold font-mono">
                                {reservation.start_time?.substring(0, 5)} - {reservation.end_time?.substring(0, 5) || "Selesai"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Package Detail */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                    <div className="flex items-center gap-3 border-b border-[#222727] pb-4">
                        <div className="rounded-lg bg-[#ffcc00]/10 p-2 text-[#ffcc00] border border-[#ffcc00]/20">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="font-extrabold text-white text-base">Paket Pilihan</h3>
                    </div>
                    <div className="mt-4 space-y-3.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Nama Paket:</span>
                            <span className="text-white font-extrabold">{reservation.package?.name || "Biasa"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Tipe Layanan:</span>
                            <span className="text-white font-extrabold uppercase text-xs tracking-wider">
                                {reservation.package_type === "personal" ? "Personal (Pay After Play)" : "Reguler"}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Biaya Paket:</span>
                            <span className="text-[#ffcc00] font-black font-sans text-base">
                                {money(reservation.total_price)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {reservation.payment_status !== "verified" &&
                reservation.package_type === "regular" && (
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={`/customer/payments/upload?type=reservation&id=${reservation.id}`}
                            className="inline-flex items-center gap-2 rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-all duration-200 shadow-md shadow-black/20"
                        >
                            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Unggah Bukti Pembayaran
                        </Link>
                    </div>
                )}
        </CustomerLayout>
    );
}

