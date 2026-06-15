import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, Link } from "@inertiajs/react";

export default function MenuDetail({ menu = null, slug = "", isSkeleton = false }) {
    return (
        <CustomerLayout>
            <Head title="Detail Menu" />

            <section className="mx-auto max-w-4xl space-y-6">
                <div>
                    <p className="text-sm font-semibold text-[#ffcc00]">Customer Menu</p>
                    <h1 className="text-3xl font-bold text-white">Detail Menu</h1>
                    <p className="mt-2 text-sm text-[#9aa7b3]">
                        Halaman detail menu customer.
                    </p>
                </div>

                {!menu && (
                    <div className="rounded-2xl border border-dashed border-[#2b3232] bg-[#151a1a] p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Data menu belum tersedia
                        </h2>
                        <p className="mt-2 text-sm text-[#9aa7b3]">
                            Slug yang dibuka: <span className="text-[#ffcc00]">{slug}</span>
                        </p>
                        <p className="mt-2 text-sm text-[#9aa7b3]">
                            Halaman ini masih skeleton. Detail menu final menunggu data
                            Menu dan MenuCategory dari modul Irsyad.
                        </p>

                        <Link
                            href="/customer/menu"
                            className="mt-5 inline-flex rounded-lg bg-[#ffcc00] px-4 py-2 font-semibold text-[#151919]"
                        >
                            Kembali ke Menu
                        </Link>
                    </div>
                )}
            </section>
        </CustomerLayout>
    );
}
