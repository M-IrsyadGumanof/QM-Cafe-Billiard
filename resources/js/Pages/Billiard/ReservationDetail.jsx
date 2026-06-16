import BilliardLayout from "@/Layouts/BilliardLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { date, money } from "@/Components/Shared/Format";
import { useForm, Link } from "@inertiajs/react";

export default function ReservationDetail({ reservation }) {
    const f = useForm({ booking_status: reservation.booking_status });

    const submit = (e) => {
        e.preventDefault();
        f.patch(`/billiard/reservations/${reservation.id}/status`);
    };

    return (
        <BilliardLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Booking Detail
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Code: {reservation.reservation_code}
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Detail transaksi, jadwal bermain, dan status sewa meja billiard pelanggan.
                    </p>
                </div>
                <Link
                    href="/billiard/reservations"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                >
                    <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    KEMBALI
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Reservation Info Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b border-[#222727] pb-3">
                            Informasi Sewa Meja
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Table */}
                            <div className="rounded-xl border border-[#222727]/70 bg-[#111515]/40 p-4 flex items-center gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Meja Billiard</p>
                                    <p className="font-extrabold text-white text-sm mt-0.5">{reservation.table?.name || "N/A"}</p>
                                    <p className="text-xs text-[#ffcc00] font-mono">#{reservation.table?.table_number || "N/A"}</p>
                                </div>
                            </div>

                            {/* Package */}
                            <div className="rounded-xl border border-[#222727]/70 bg-[#111515]/40 p-4 flex items-center gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Paket Billiard</p>
                                    <p className="font-extrabold text-white text-sm mt-0.5">{reservation.package?.name || "N/A"}</p>
                                    <p className="text-xs text-[#9aa7b3] truncate max-w-[150px]">{reservation.package?.description || "Paket pilihan"}</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="rounded-xl border border-[#222727]/70 bg-[#111515]/40 p-4 flex items-center gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Tanggal Bermain</p>
                                    <p className="font-extrabold text-white text-sm mt-0.5">{date(reservation.reservation_date)}</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="rounded-xl border border-[#222727]/70 bg-[#111515]/40 p-4 flex items-center gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Durasi Bermain</p>
                                    <p className="font-extrabold text-white text-sm mt-0.5">
                                        {reservation.start_time?.substring(0, 5)} - {reservation.end_time?.substring(0, 5)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Invoice summary highlight */}
                        <div className="mt-6 p-4 rounded-xl bg-[#ffcc00]/5 border border-[#ffcc00]/10 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#9aa7b3] font-bold uppercase tracking-wider">Total Pembayaran</p>
                                <p className="text-[10px] text-[#ffcc00] font-mono mt-0.5">Sewa meja + peralatan</p>
                            </div>
                            <span className="text-2xl font-black text-[#ffcc00]">
                                {money(reservation.total_price)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info & Status Action */}
                <div className="space-y-6">
                    {/* Customer Info Card */}
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727] pb-3">
                            Informasi Transaksi
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">Pelanggan</p>
                                <p className="mt-1 font-bold text-white text-sm">{reservation.user?.name || "Customer"}</p>
                                <p className="text-xs text-[#9aa7b3] font-mono">{reservation.user?.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">Waktu Pemesanan</p>
                                <p className="mt-1 text-xs text-white font-mono">{date(reservation.created_at)}</p>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b6e6e]">Status Booking</p>
                                    <StatusBadge value={reservation.booking_status} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#5b6e6e]">Status Bayar</p>
                                    <StatusBadge value={reservation.payment_status} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update Card */}
                    <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#222727] pb-3">
                            Tindakan Staf
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">
                                    Update Status Booking
                                </label>
                                <select
                                    value={f.data.booking_status}
                                    onChange={(e) => f.setData("booking_status", e.target.value)}
                                    className="modern-select w-full"
                                >
                                    <option value="pending">Pending Approval</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="playing">Playing (Sedang Bermain)</option>
                                    <option value="completed">Completed (Selesai)</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={f.processing}
                                className="modern-btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Simpan Status
                            </button>

                            {reservation.package_type === "personal" && (
                                <div className="pt-2">
                                    <Link
                                        href={`/billiard/personal-billing/${reservation.id}`}
                                        className="w-full flex items-center justify-center gap-2 rounded-[10px] border border-[#ffcc00]/25 bg-[#ffcc00]/5 px-4 py-2.5 text-xs font-bold text-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all duration-200 text-center"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Buka Personal Billing
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </BilliardLayout>
    );
}
