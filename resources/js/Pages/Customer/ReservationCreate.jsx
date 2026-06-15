import { useForm, Link } from "@inertiajs/react";

export default function ReservationCreate({ tables, packages }) {
    const { data, setData, post, processing, errors } = useForm({
        billiard_table_id: "",
        billiard_package_id: "",
        reservation_date: "",
        start_time: "",
        duration_minutes: "60",
        notes: "",
    });

    // Paket yang dipilih saat ini
    const selectedPackage = packages.find(
        (p) => String(p.id) === String(data.billiard_package_id)
    );
    const isPersonal = selectedPackage?.type === "personal";

    function handleSubmit(e) {
        e.preventDefault();
        post(route("customer.reservations.store"));
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <Link
                        href={route("customer.reservations.index")}
                        className="hover:text-blue-600"
                    >
                        Reservasi Saya
                    </Link>
                    <span>/</span>
                    <span className="text-gray-700">Buat Reservasi</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Buat Reservasi Baru
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Pilih meja dan paket yang tersedia, lalu tentukan jadwal
                    bermain.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl space-y-6"
            >
                {/* Pilih Meja */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Pilih Meja
                    </h2>
                    <div>
                        <label
                            htmlFor="billiard_table_id"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Meja Billiard{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="billiard_table_id"
                            value={data.billiard_table_id}
                            onChange={(e) =>
                                setData("billiard_table_id", e.target.value)
                            }
                            className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.billiard_table_id
                                    ? "border-red-400 bg-red-50"
                                    : "border-gray-300"
                            }`}
                        >
                            <option value="">-- Pilih Meja --</option>
                            {tables.map((t) => (
                                <option
                                    key={t.id}
                                    value={t.id}
                                    disabled={t.status !== "available"}
                                >
                                    Meja {t.table_number} – {t.name}
                                    {t.status !== "available"
                                        ? ` (${t.status})`
                                        : ""}
                                </option>
                            ))}
                        </select>
                        {errors.billiard_table_id && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.billiard_table_id}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">
                            Hanya meja berstatus{" "}
                            <span className="font-medium text-green-600">
                                available
                            </span>{" "}
                            yang dapat dipilih.
                        </p>
                    </div>
                </div>

                {/* Pilih Paket */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Pilih Paket
                    </h2>

                    {packages.length === 0 ? (
                        <p className="text-sm text-gray-400">
                            Tidak ada paket aktif tersedia.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {packages.map((pkg) => (
                                <label
                                    key={pkg.id}
                                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                                        String(data.billiard_package_id) ===
                                        String(pkg.id)
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="billiard_package_id"
                                        value={pkg.id}
                                        checked={
                                            String(data.billiard_package_id) ===
                                            String(pkg.id)
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "billiard_package_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-0.5 accent-blue-600"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {pkg.name}
                                            </span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                                                    pkg.type === "personal"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {pkg.type}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 text-xs text-gray-500">
                                            {pkg.type === "regular"
                                                ? `${pkg.duration_minutes} menit · Rp ${Number(pkg.price).toLocaleString("id-ID")}`
                                                : "Durasi fleksibel · Bayar setelah main"}
                                        </p>
                                        {pkg.description && (
                                            <p className="mt-1 text-xs text-gray-400">
                                                {pkg.description}
                                            </p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}

                    {errors.billiard_package_id && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.billiard_package_id}
                        </p>
                    )}
                </div>

                {/* Jadwal */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Jadwal Bermain
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Tanggal */}
                        <div>
                            <label
                                htmlFor="reservation_date"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Tanggal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="reservation_date"
                                value={data.reservation_date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setData("reservation_date", e.target.value)
                                }
                                className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.reservation_date
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.reservation_date && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.reservation_date}
                                </p>
                            )}
                        </div>

                        {/* Jam Mulai */}
                        <div>
                            <label
                                htmlFor="start_time"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Jam Mulai <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                id="start_time"
                                value={data.start_time}
                                onChange={(e) =>
                                    setData("start_time", e.target.value)
                                }
                                className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.start_time
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.start_time && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.start_time}
                                </p>
                            )}
                        </div>

                        {/* Durasi — hanya muncul untuk paket personal */}
                        {isPersonal && (
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="duration_minutes"
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                    Durasi (menit){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="duration_minutes"
                                    value={data.duration_minutes}
                                    min={30}
                                    step={15}
                                    onChange={(e) =>
                                        setData(
                                            "duration_minutes",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs ${
                                        errors.duration_minutes
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.duration_minutes && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.duration_minutes}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-400">
                                    Minimal 30 menit. Total harga dihitung
                                    setelah sesi selesai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Catatan */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Catatan Tambahan
                    </h2>
                    <textarea
                        id="notes"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        rows={3}
                        placeholder="Permintaan khusus, jumlah pemain, dll. (opsional)"
                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.notes
                                ? "border-red-400 bg-red-50"
                                : "border-gray-300"
                        }`}
                    />
                    {errors.notes && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.notes}
                        </p>
                    )}
                </div>

                {/* Info ringkas sebelum submit */}
                {selectedPackage && (
                    <div
                        className={`rounded-lg border px-4 py-3 text-sm ${
                            isPersonal
                                ? "border-purple-200 bg-purple-50 text-purple-800"
                                : "border-blue-200 bg-blue-50 text-blue-800"
                        }`}
                    >
                        {isPersonal ? (
                            <>
                                <strong>Paket Personal:</strong> Durasi dihitung
                                dari input Anda. Total harga akan ditetapkan
                                setelah sesi bermain selesai (
                                <em>paid after play</em>).
                            </>
                        ) : (
                            <>
                                <strong>Paket Regular:</strong> Durasi{" "}
                                {selectedPackage.duration_minutes} menit, total
                                harga{" "}
                                <strong>
                                    Rp{" "}
                                    {Number(
                                        selectedPackage.price
                                    ).toLocaleString("id-ID")}
                                </strong>
                                . Pembayaran dilakukan sebelum sesi dimulai.
                            </>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <Link
                        href={route("customer.reservations.index")}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing && (
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        )}
                        {processing ? "Memproses..." : "Buat Reservasi"}
                    </button>
                </div>
            </form>
        </div>
    );
}
