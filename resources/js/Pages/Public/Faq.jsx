import PublicLayout from "@/Layouts/PublicLayout";
import { useState } from "react";

export default function Faq({ faqs }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Bantuan
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    FAQ & Booking Policy
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    Temukan jawaban untuk pertanyaan yang sering diajukan seputar reservasi, pembayaran, dan kebijakan bermain di QM Cafe & Billiard.
                </p>
            </div>

            {/* FAQ List */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4 mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Pertanyaan Umum
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Yang Sering Ditanyakan
                        </h2>
                    </div>
                    <div className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        {(faqs || []).length} Pertanyaan
                    </div>
                </div>

                {(faqs || []).length > 0 ? (
                    <div className="grid gap-3">
                        {(faqs || []).map((f, index) => {
                            const isOpen = openId === f.id;
                            return (
                                <div
                                    key={f.id}
                                    className={`rounded-[18px] border bg-[#151919]/60 transition-all duration-300 overflow-hidden ${
                                        isOpen
                                            ? "border-[#ffcc00]/25 bg-[#181d1d]"
                                            : "border-[#222727] hover:border-[#ffcc00]/15"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(f.id)}
                                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#ffcc00]/20 bg-[#ffcc00]/5 text-[10px] font-black text-[#ffcc00]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <div className="min-w-0">
                                                {f.category && (
                                                    <span className="inline-flex rounded-full border border-[#ffcc00]/20 bg-[#ffcc00]/5 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-[#ffcc00] mb-1">
                                                        {f.category}
                                                    </span>
                                                )}
                                                <p className="text-sm font-extrabold text-white truncate">
                                                    {f.question}
                                                </p>
                                            </div>
                                        </div>
                                        <svg
                                            className={`h-4 w-4 shrink-0 text-[#5b6e6e] transition-transform duration-300 ${
                                                isOpen ? "rotate-180 text-[#ffcc00]" : ""
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="border-t border-[#222727] px-5 pb-5 pt-4 ml-[52px]">
                                            <p className="text-xs leading-6 text-[#c7d0d8]">
                                                {f.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-[18px] border border-[#222727] bg-[#151919]/30 p-16 text-center">
                        <svg className="mx-auto h-10 w-10 text-[#5b6e6e] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        <p className="text-xs text-[#5b6e6e] font-bold">
                            Belum ada FAQ yang tersedia.
                        </p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
