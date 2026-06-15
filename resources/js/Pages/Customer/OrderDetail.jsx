import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, Link } from "@inertiajs/react";

export default function OrderDetail({ order = null, orderId = "", isSkeleton = false }) {
    return (
        <CustomerLayout>
            <Head title="Detail Order" />

            <section className="mx-auto max-w-4xl space-y-6">
                <div>
                    <p className="text-sm font-semibold text-[#ffcc00]">Customer Order</p>
                    <h1 className="text-3xl font-bold text-white">Detail Order</h1>
                    <p className="mt-2 text-sm text-[#9aa7b3]">
                        Halaman detail pesanan customer.
                    </p>
                </div>

                {!order && (
                    <div className="rounded-2xl border border-dashed border-[#2b3232] bg-[#151a1a] p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Data order belum tersedia
                        </h2>
                        <p className="mt-2 text-sm text-[#9aa7b3]">
                            ID/parameter yang dibuka:{" "}
                            <span className="text-[#ffcc00]">{orderId}</span>
                        </p>
                        <p className="mt-2 text-sm text-[#9aa7b3]">
                            Halaman ini masih skeleton. Detail order final menunggu
                            checkout dan penyimpanan orders/order_items.
                        </p>

                        <Link
                            href="/customer/orders"
                            className="mt-5 inline-flex rounded-lg bg-[#ffcc00] px-4 py-2 font-semibold text-[#151919]"
                        >
                            Kembali ke Riwayat Order
                        </Link>
                    </div>
                )}
            </section>
        </CustomerLayout>
    );
}
