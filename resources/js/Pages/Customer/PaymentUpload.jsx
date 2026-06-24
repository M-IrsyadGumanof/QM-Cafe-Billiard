import CustomerLayout from "@/Layouts/CustomerLayout";
import { useForm } from "@inertiajs/react";
import { money } from "@/Components/Shared/Format";

export default function PaymentUpload({ targetType, target }) {
    const { data, setData, post, processing, errors } = useForm({
        type: targetType,
        id: target.id,
        payment_method: "transfer",
        proof_image: null,
        notes: "",
    });

    const amount = target.total_amount || target.total_price;

    const handleMethodChange = (method) => {
        setData((prev) => ({
            ...prev,
            payment_method: method,
            proof_image: method === "cash" ? null : prev.proof_image,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post("/customer/payments", { forceFormData: true });
    };

    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Upload Pembayaran
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Unggah Bukti Pembayaran
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Selesaikan transaksi Anda dengan memilih metode pembayaran dan mengunggah berkas bukti transfer jika diperlukan.
                </p>
            </div>

            <div className="mt-8 max-w-xl">
                {/* Transaction Card */}
                <div className="mb-6 rounded-[15px] border border-[#222727] bg-gradient-to-r from-[#181d1d] to-[#111515] p-5 flex items-center justify-between shadow-sm">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">
                            Kode Transaksi
                        </span>
                        <p className="font-mono text-sm font-black text-[#ffcc00] mt-1">
                            {target.order_code || target.reservation_code}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">
                            Total Tagihan
                        </span>
                        <p className="text-lg font-black text-white mt-1">
                            {money(amount)}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="grid gap-5 rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-6 shadow-lg"
                >
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                            Metode Pembayaran
                        </span>
                        <select
                            value={data.payment_method}
                            onChange={(e) => handleMethodChange(e.target.value)}
                            className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        >
                            <option value="transfer">Transfer Bank</option>
                            <option value="qris">QRIS</option>
                            <option value="cash">Cash (Bayar di Kasir)</option>
                        </select>
                        {errors.payment_method && (
                            <p className="mt-1.5 text-xs font-bold text-red-400">
                                {errors.payment_method}
                            </p>
                        )}
                    </div>

                    {/* Conditional File Upload */}
                    {data.payment_method !== "cash" ? (
                        <div className="flex flex-col transition-all duration-300">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                                Berkas Bukti Transfer / Pembayaran
                            </span>
                            <div className="mt-2 relative rounded-[10px] border border-dashed border-[#222727] bg-[#151919] p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-[#ffcc00]/40">
                                <svg
                                    className="h-8 w-8 text-[#9aa7b3] mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setData("proof_image", e.target.files[0])
                                    }
                                    className="text-xs text-[#9aa7b3] cursor-pointer"
                                />
                                <p className="mt-1 text-[10px] text-[#5b6e6e]">
                                    Format: JPG, PNG, atau WEBP. Maks 2MB.
                                </p>
                            </div>
                            {errors.proof_image && (
                                <p className="mt-1.5 text-xs font-bold text-red-400">
                                    {errors.proof_image}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-[12px] border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">Metode Cash Terpilih</span>
                            </div>
                            <p className="mt-2 text-xs text-[#9aa7b3] leading-relaxed">
                                Anda memilih membayar di tempat (Cash). Silakan temui kasir / staf billiard saat Anda tiba untuk melakukan pembayaran langsung. Anda tidak perlu mengunggah bukti gambar apapun.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                            Catatan Tambahan (Opsional)
                        </span>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            placeholder="Masukkan catatan mengenai pembayaran Anda..."
                            rows={3}
                            className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {errors.notes && (
                            <p className="mt-1.5 text-xs font-bold text-red-400">
                                {errors.notes}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        className="mt-4 rounded-[10px] bg-[#ffcc00] px-6 py-3.5 font-extrabold text-[#151919] hover:bg-[#e6b800] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:scale-100"
                    >
                        {processing ? "Memproses..." : "Konfirmasi & Upload"}
                    </button>
                </form>
            </div>
        </CustomerLayout>
    );
}
