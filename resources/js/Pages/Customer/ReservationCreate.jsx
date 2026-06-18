import CustomerLayout from "@/Layouts/CustomerLayout";
import { useForm } from "@inertiajs/react";
import { money } from "@/Components/Shared/Format";

export default function ReservationCreate({ tables, packages }) {
    const { data, setData, post, processing, errors } = useForm({
        billiard_table_id: tables?.[0]?.id || "",
        billiard_package_id: packages?.[0]?.id || "",
        reservation_date: new Date().toISOString().slice(0, 10),
        start_time: "19:00",
        duration_minutes: packages?.[0]?.type === "regular" ? packages?.[0]?.duration_minutes : 60,
        notes: "",
    });

    const pkg = (packages || []).find((p) => p.id == data.billiard_package_id);

    const calculateEndTime = (startTime, durationMinutes) => {
        if (!startTime || !durationMinutes) return "";
        const [hours, minutes] = startTime.split(":").map(Number);
        const dateObj = new Date();
        dateObj.setHours(hours, minutes, 0, 0);
        dateObj.setMinutes(dateObj.getMinutes() + Number(durationMinutes));
        const endHours = String(dateObj.getHours()).padStart(2, "0");
        const endMinutes = String(dateObj.getMinutes()).padStart(2, "0");
        return `${endHours}:${endMinutes}`;
    };

    const handlePackageChange = (packageId) => {
        const selectedPkg = (packages || []).find((p) => p.id == packageId);
        setData({
            ...data,
            billiard_package_id: packageId,
            duration_minutes: selectedPkg?.type === "regular" ? selectedPkg.duration_minutes : 60,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post("/customer/reservations");
    };

    return (
        <CustomerLayout>
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Reservasi Baru
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Formulir Reservasi Meja
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Silakan tentukan paket, meja, tanggal, dan jam mulai bermain billiard Anda.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="mt-8 grid gap-6 rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-6 md:grid-cols-2 shadow-lg"
            >
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                        Paket Bermain
                    </span>
                    <select
                        value={data.billiard_package_id}
                        onChange={(e) => handlePackageChange(e.target.value)}
                        className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                    >
                        {(packages || []).map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name} ({p.type === "regular" ? "Reguler" : "Personal"})
                            </option>
                        ))}
                    </select>
                    {errors.billiard_package_id && (
                        <p className="mt-1.5 text-xs font-bold text-red-400">
                            {errors.billiard_package_id}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                        Pilih Meja
                    </span>
                    <select
                        value={data.billiard_table_id}
                        onChange={(e) => setData("billiard_table_id", e.target.value)}
                        className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                    >
                        {(tables || []).map((t) => (
                            <option key={t.id} value={t.id}>
                                Meja {t.table_number} - {t.name} ({t.status})
                            </option>
                        ))}
                    </select>
                    {errors.billiard_table_id && (
                        <p className="mt-1.5 text-xs font-bold text-red-400">
                            {errors.billiard_table_id}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                        Tanggal Reservasi
                    </span>
                    <input
                        type="date"
                        value={data.reservation_date}
                        onChange={(e) => setData("reservation_date", e.target.value)}
                        className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                    />
                    {errors.reservation_date && (
                        <p className="mt-1.5 text-xs font-bold text-red-400">
                            {errors.reservation_date}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                        Jam Mulai Bermain
                    </span>
                    <input
                        type="time"
                        value={data.start_time}
                        onChange={(e) => setData("start_time", e.target.value)}
                        className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                    />
                    {errors.start_time && (
                        <p className="mt-1.5 text-xs font-bold text-red-400">
                            {errors.start_time}
                        </p>
                    )}
                </div>

                {/* Package Info & Durations */}
                {pkg?.type === "regular" && (
                    <div className="md:col-span-2 rounded-[12px] border border-blue-500/20 bg-blue-500/5 p-4 transition-all duration-300">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Durasi Paket:</span>
                            <span className="text-white font-extrabold">{pkg.duration_minutes} menit ({pkg.duration_minutes / 60} Jam)</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-[#9aa7b3] font-bold">Waktu Mulai:</span>
                            <span className="text-white font-extrabold font-mono">{data.start_time}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-blue-500/10 pt-2 text-base">
                            <span className="text-[#ffcc00] font-black">Estimasi Selesai:</span>
                            <span className="text-[#ffcc00] font-black font-mono">
                                {calculateEndTime(data.start_time, pkg.duration_minutes)}
                            </span>
                        </div>
                    </div>
                )}

                {pkg?.type === "personal" && (
                    <div className="md:col-span-2 rounded-[12px] border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all duration-300">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-400 font-extrabold text-sm uppercase tracking-wider">Paket Personal</span>
                        </div>
                        <p className="mt-2 text-xs text-[#9aa7b3] leading-relaxed">
                            Paket personal dikenakan biaya berdasarkan durasi waktu bermain Anda. Timer akan diaktifkan oleh petugas ketika Anda mulai bermain, dan total tagihan dihitung secara akurat saat Anda selesai.
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-emerald-500/10 pt-2 text-sm">
                            <span className="text-white font-bold">Tarif Bermain:</span>
                            <span className="text-[#ffcc00] font-extrabold font-mono">{money(pkg.price)} / jam</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                        Catatan Tambahan
                    </span>
                    <textarea
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        placeholder="Masukkan catatan jika ada..."
                        rows={3}
                        className="mt-2 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                    />
                    {errors.notes && (
                        <p className="mt-1.5 text-xs font-bold text-red-400">
                            {errors.notes}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2 border-t border-[#222727] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm font-bold text-[#c7d0d8]">
                        Estimasi Biaya:{" "}
                        <span className="text-lg font-black text-[#ffcc00] ml-1">
                            {pkg?.type === "personal"
                                ? "Bayar setelah bermain"
                                : money(pkg?.price || 0)}
                        </span>
                    </div>
                    <button
                        disabled={processing}
                        className="rounded-[10px] bg-[#ffcc00] px-6 py-3 font-extrabold text-[#151919] hover:bg-[#e6b800] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:scale-100"
                    >
                        {processing ? "Memproses..." : "Buat Reservasi"}
                    </button>
                </div>
            </form>
        </CustomerLayout>
    );
}
