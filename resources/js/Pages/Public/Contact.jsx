import PublicLayout from "@/Layouts/PublicLayout";

const contactInfo = [
    {
        title: "Alamat",
        detail: "Padang, Sumatera Barat",
        sub: "Lokasi strategis di pusat kota",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
    },
    {
        title: "Jam Operasional",
        detail: "10.00 — 23.00 WIB",
        sub: "Buka setiap hari",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: "WhatsApp",
        detail: "08xx-xxxx-xxxx",
        sub: "Fast response",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ),
    },
];

export default function Contact() {
    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Hubungi Kami
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Contact
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    Hubungi kami untuk informasi lebih lanjut mengenai reservasi, menu, atau kerja sama. Kami siap membantu!
                </p>
            </div>

            {/* Contact Cards */}
            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {contactInfo.map((c) => (
                    <article
                        key={c.title}
                        className="rounded-[18px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:shadow-lg group"
                    >
                        <div className="flex items-center gap-3.5">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffcc00]/20 bg-[#ffcc00]/5 text-[#ffcc00] transition-all duration-300 group-hover:bg-[#ffcc00]/10">
                                {c.icon}
                            </span>
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#ffcc00]">
                                    {c.title}
                                </p>
                                <p className="mt-0.5 text-sm font-extrabold text-white">
                                    {c.detail}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-[#9aa7b3] leading-5">
                            {c.sub}
                        </p>
                    </article>
                ))}
            </div>

            {/* Map & CTA Section */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Lokasi
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Temukan Kami
                        </h2>
                    </div>
                    <a
                        href="https://wa.me/628xxxxxxxxxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[10px] bg-[#ffcc00] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#151919] hover:bg-[#ffe066] active:scale-95 transition-all duration-200 shadow-lg shadow-[#ffcc00]/10"
                    >
                        Hubungi via WhatsApp
                    </a>
                </div>

                {/* Stylized Map Placeholder */}
                <div className="mt-6 relative overflow-hidden rounded-[18px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#0f1212] h-64 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.06),transparent_60%)]" />
                    {/* Decorative Grid Lines */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }} />
                    <div className="relative z-10 text-center">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ffcc00]/20 bg-[#ffcc00]/5 text-[#ffcc00] mb-3">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        </span>
                        <p className="text-xs font-extrabold text-white uppercase tracking-wider">
                            QM Cafe & Billiard
                        </p>
                        <p className="mt-1 text-[10px] text-[#5b6e6e]">
                            Padang, Sumatera Barat
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
