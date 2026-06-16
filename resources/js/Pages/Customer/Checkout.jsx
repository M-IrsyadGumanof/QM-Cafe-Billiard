import CustomerLayout from "@/Layouts/CustomerLayout";
import { money } from "@/Components/Shared/Format";
import { useForm, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Checkout() {
    const [items, setItems] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        items: [],
        payment_method: "transfer",
        notes: "",
    });

    useEffect(() => {
        const c = JSON.parse(localStorage.getItem("qm_cart") || "[]");
        setItems(c);
        setData(
            "items",
            c.map((i) => ({ menu_id: i.menu_id, quantity: i.quantity })),
        );
    }, []);

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

    const submit = (e) => {
        e.preventDefault();
        post("/customer/checkout", {
            onSuccess: () => localStorage.removeItem("qm_cart"),
        });
    };

    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-border pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand">
                    Proses Checkout
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Selesaikan Pesanan Anda
                </h1>
                <p className="text-xs text-muted">
                    Tinjau item pesanan Anda dan pilih metode pembayaran untuk menyelesaikan transaksi kuliner Anda.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="mt-8 grid gap-8 lg:grid-cols-[1fr,380px]"
            >
                {/* Left side: Order Items Summary */}
                <div className="space-y-6">
                    <div className="glass-card rounded-[15px] p-6 shadow-md">
                        <h3 className="text-base font-bold text-white border-b border-border pb-4 mb-4 flex items-center gap-2">
                            <svg className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Daftar Item Pesanan
                        </h3>

                        <div className="divide-y divide-border-strong/60">
                            {items.map((i) => (
                                <div
                                    key={i.menu_id}
                                    className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-white text-sm tracking-wide">
                                            {i.name}
                                        </span>
                                        <span className="text-xs text-muted font-mono mt-1">
                                            {money(i.price)} x {i.quantity}
                                        </span>
                                    </div>
                                    <span className="text-sm font-black text-brand font-sans">
                                        {money(i.price * i.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {items.length === 0 && (
                            <div className="text-center py-10">
                                <svg
                                    className="mx-auto h-12 w-12 text-dim mb-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <p className="text-sm text-muted">Keranjang belanja Anda kosong.</p>
                                <Link
                                    href="/customer/menu"
                                    className="mt-4 inline-flex rounded-[10px] bg-brand px-5 py-2.5 text-xs font-bold text-surface-elevated hover:bg-brand-hover transition-colors"
                                >
                                    Pilih Menu Kuliner
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side: Payment & Submit Card */}
                <div className="glass-card rounded-[15px] p-6 shadow-lg h-fit space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-border pb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Rincian Pembayaran
                    </h3>

                    {/* Payment Method Selector */}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted">
                            Metode Pembayaran
                        </span>
                        <select
                            value={data.payment_method}
                            onChange={(e) =>
                                setData("payment_method", e.target.value)
                            }
                            className="modern-select w-full mt-2"
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

                    {/* Conditional Info Banner based on chosen payment method */}
                    {data.payment_method === "cash" && (
                        <div className="rounded-[12px] border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">Metode Cash</span>
                            </div>
                            <p className="mt-2 text-xs text-muted leading-relaxed">
                                Silakan bayar langsung ke kasir café billiard setelah memesan. Pesanan Anda akan langsung diproses.
                            </p>
                        </div>
                    )}

                    {data.payment_method === "transfer" && (
                        <div className="rounded-[12px] border border-brand/20 bg-brand/5 p-4 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                                <span className="text-brand font-extrabold text-xs uppercase tracking-wider">Transfer Bank</span>
                            </div>
                            <p className="mt-2 text-xs text-muted leading-relaxed">
                                Setelah membuat pesanan, Anda perlu mengunggah bukti transfer bank pada halaman detail pesanan.
                            </p>
                        </div>
                    )}

                    {data.payment_method === "qris" && (
                        <div className="rounded-[12px] border border-brand/20 bg-brand/5 p-4 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                                <span className="text-brand font-extrabold text-xs uppercase tracking-wider">QRIS</span>
                            </div>
                            <p className="mt-2 text-xs text-muted leading-relaxed">
                                Pindai kode QRIS pada halaman detail pesanan setelah checkout, lalu unggah bukti transfer.
                            </p>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted">
                            Catatan Tambahan (Opsional)
                        </span>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            placeholder="Contoh: Es batu dipisah, kurangi pedas..."
                            rows={3}
                            className="modern-input w-full mt-2 resize-none"
                        />
                        {errors.notes && (
                            <p className="mt-1.5 text-xs font-bold text-red-400">
                                {errors.notes}
                            </p>
                        )}
                    </div>

                    {/* Total Price */}
                    <div className="border-t border-border pt-4 flex justify-between items-center text-lg font-bold">
                        <span className="text-muted">Total Bayar:</span>
                        <span className="text-2xl font-black text-brand font-sans">
                            {money(total)}
                        </span>
                    </div>

                    {/* Actions */}
                    <button
                        disabled={processing || items.length === 0}
                        className="modern-btn-primary w-full py-3.5 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-surface-elevated" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Buat Pesanan</span>
                            </>
                        )}
                    </button>

                    {errors.items && (
                        <p className="mt-2 text-center text-xs font-bold text-red-400">
                            {errors.items}
                        </p>
                    )}
                </div>
            </form>
        </CustomerLayout>
    );
}
