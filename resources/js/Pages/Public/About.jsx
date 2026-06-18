import PublicLayout from "@/Layouts/PublicLayout";

const features = [
    {
        number: "01",
        title: "Cafe Nyaman",
        description:
            "Ruang cafe modern dengan suasana hangat, pencahayaan ambient, dan interior premium yang membuat setiap kunjungan terasa spesial.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Billiard Premium",
        description:
            "Meja billiard berkualitas tinggi dengan perawatan rutin, stik premium, dan area bermain yang luas untuk pengalaman bermain terbaik.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Reservasi Online",
        description:
            "Sistem reservasi digital yang mudah digunakan — cek ketersediaan, pilih meja, dan konfirmasi booking dalam hitungan detik.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Menu Kuliner Lengkap",
        description:
            "Pilihan makanan & minuman beragam, dari kopi premium hingga hidangan berat, siap menemani sesi bermain billiard Anda.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.124 1.124H2.124A1.124 1.124 0 011 20.874V15.7c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" />
            </svg>
        ),
    },
    {
        number: "05",
        title: "Pembayaran Transparan",
        description:
            "Pantau semua riwayat transaksi melalui dashboard personal. Tidak ada biaya tersembunyi — semua tercatat dengan jelas.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
        ),
    },
    {
        number: "06",
        title: "Lokasi Strategis",
        description:
            "Terletak di pusat kota Padang yang mudah dijangkau, dengan area parkir yang luas dan akses transportasi umum.",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
    },
];

export default function About() {
    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Tentang Kami
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    About QM Cafe & Billiard
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    QM Cafe & Billiard adalah tempat nongkrong modern yang menggabungkan cafe, billiard, pemesanan menu, dan reservasi meja dalam satu pengalaman digital yang seamless.
                </p>
            </div>

            {/* Story Section */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8 lg:p-10">
                <div className="flex flex-col gap-5 rounded-[18px] border border-[#222727] bg-[#151919]/90 p-5 md:flex-row md:items-end md:justify-between md:p-6">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                            Our Story
                        </p>
                        <h2 className="mt-2 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Pengalaman Premium di Padang
                        </h2>
                        <p className="mt-2 text-xs leading-5 text-[#9aa7b3]">
                            Berawal dari visi menghadirkan ruang rekreasi modern di kota Padang, QM Cafe & Billiard hadir sebagai destinasi nongkrong yang menggabungkan kenyamanan cafe, keseruan billiard, dan kemudahan teknologi digital dalam satu tempat.
                        </p>
                    </div>
                    <div className="shrink-0 self-start md:self-end rounded-[12px] border border-[#222727] bg-[#111515] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        Est. 2024 • Padang
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { value: "6+", label: "Meja Billiard", note: "Premium quality" },
                        { value: "30+", label: "Menu Kuliner", note: "Makanan & minuman" },
                        { value: "500+", label: "Pelanggan", note: "Dan terus bertambah" },
                        { value: "24/7", label: "Dukungan", note: "Reservasi online" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-[18px] border border-[#222727] bg-[#151919]/60 p-5 text-center group transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25"
                        >
                            <p className="text-2xl font-black text-[#ffcc00] font-sans transition-transform duration-300 group-hover:scale-105">
                                {s.value}
                            </p>
                            <p className="text-[10px] font-extrabold text-white uppercase tracking-wider mt-1.5">
                                {s.label}
                            </p>
                            <p className="text-[9px] text-[#5b6e6e] mt-0.5">
                                {s.note}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Fasilitas
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Apa yang Kami Tawarkan?
                        </h2>
                    </div>
                    <div className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        6 Fasilitas Utama
                    </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <article
                            key={f.title}
                            className="rounded-[18px] border border-[#222727] bg-[#151919]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:bg-[#181d1d]"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ffcc00]/20 bg-[#ffcc00]/5 text-[#ffcc00]">
                                    {f.icon}
                                </span>
                                <span className="text-xs font-black text-[#ffcc00]/30">
                                    {f.number}
                                </span>
                            </div>
                            <h3 className="mt-4 text-sm font-extrabold text-white tracking-wide">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-[#9aa7b3]">
                                {f.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
