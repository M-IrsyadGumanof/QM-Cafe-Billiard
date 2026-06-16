import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money, date } from "@/Components/Shared/Format";
import { useForm, Link } from "@inertiajs/react";

export default function PaymentDetail({ payment }) {
    const f = useForm({
        status: payment.status === "pending" ? "verified" : payment.status,
        notes: payment.notes || ""
    });

    const submit = (e) => {
        e.preventDefault();
        f.patch(`/admin/payments/${payment.id}/verify`);
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6 mb-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Verifikasi Pembayaran
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-mono">
                        {payment.payment_code}
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Detail transfer dari pelanggan. Harap verifikasi bukti pembayaran di bawah ini.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-center">
                    <StatusBadge value={payment.status} />
                    <Link
                        href="/admin/payments"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:border-sky-400/30 hover:bg-[#181d1d] transition-all duration-300"
                    >
                        <svg className="h-4 w-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        KEMBALI
                    </Link>
                </div>
            </div>

            {/* Details Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Info Card */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md space-y-5 h-fit">
                    <h3 className="font-extrabold text-white text-base border-b border-[#222727] pb-3">Rincian Transaksi</h3>
                    <div className="space-y-3.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Nama Pelanggan:</span>
                            <span className="text-white font-extrabold">{payment.user?.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Email:</span>
                            <span className="text-white font-extrabold font-mono">{payment.user?.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Metode Pembayaran:</span>
                            <span className="text-white font-extrabold uppercase font-mono">{payment.payment_method}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Tanggal Kirim:</span>
                            <span className="text-white font-extrabold font-mono">{date(payment.created_at)}</span>
                        </div>
                        <div className="flex justify-between items-end border-t border-[#222727]/50 pt-3 text-sm">
                            <span className="text-[#9aa7b3] font-bold">Jumlah Pembayaran:</span>
                            <span className="text-lg font-black text-[#ffcc00] font-sans">
                                {money(payment.amount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Proof Image Card */}
                <div className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md flex flex-col items-center justify-center">
                    <h3 className="font-extrabold text-white text-base border-b border-[#222727] pb-3 w-full self-start mb-4">Bukti Upload Fisik</h3>
                    {payment.proof_image ? (
                        <a
                            href={`/storage/${payment.proof_image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block relative overflow-hidden rounded-xl border border-[#222727] bg-black max-w-xs transition-transform duration-300 hover:scale-[1.01]"
                        >
                            <img
                                src={`/storage/${payment.proof_image}`}
                                alt="Bukti Transfer"
                                className="w-full h-auto max-h-[300px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="rounded-lg bg-black/70 px-3.5 py-2 text-xs font-bold text-white tracking-wide border border-white/10">
                                    Buka Gambar Penuh
                                </span>
                            </div>
                        </a>
                    ) : (
                        <div className="rounded-xl border border-dashed border-[#222727] bg-[#151919]/30 p-12 text-center text-xs text-[#9aa7b3] w-full">
                            <svg className="mx-auto h-12 w-12 text-[#5b6e6e]/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Tidak ada file bukti pembayaran yang diunggah (misal metode pembayaran cash).
                        </div>
                    )}
                </div>
            </div>

            {/* Action Form */}
            <section className="mt-6 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <h3 className="font-extrabold text-white text-base border-b border-[#222727] pb-4">
                    Formulir Tindakan Verifikasi
                </h3>
                <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status Persetujuan</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        >
                            <option value="verified">Terima / Setujui (Approve & Verify)</option>
                            <option value="rejected">Tolak Bukti Pembayaran (Reject)</option>
                        </select>
                        {f.errors.status && <p className="text-[10px] text-red-400 mt-1.5 ml-1">{f.errors.status}</p>}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Catatan / Alasan Penolakan</span>
                        <input
                            type="text"
                            placeholder="Alasan penolakan bukti transfer atau catatan internal..."
                            value={f.data.notes}
                            onChange={(e) => f.setData("notes", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.notes && <p className="text-[10px] text-red-400 mt-1.5 ml-1">{f.errors.notes}</p>}
                    </div>

                    <div className="md:col-span-3 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            Simpan Hasil Verifikasi Pembayaran
                        </button>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}

