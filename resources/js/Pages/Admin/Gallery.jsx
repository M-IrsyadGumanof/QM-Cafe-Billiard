import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { useForm, router } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function Gallery({ galleries }) {
    const rows = galleries?.data || [];
    const [editingId, setEditingId] = useState(null);

    const fileInputRef = useRef(null);

    // Image Cropping States
    const [imagePreview, setImagePreview] = useState(null);
    const [openCropModal, setOpenCropModal] = useState(false);
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const [imgAspect, setImgAspect] = useState(1);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const f = useForm({
        title: "",
        image: null,
        description: "",
        status: "active",
        delete_image: false,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                f.setError('image', 'Ukuran file tidak boleh melebihi 10MB.');
                return;
            }
            f.clearErrors('image');
            f.setData('delete_image', false);

            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImgAspect(img.width / img.height);
                    setCropImageSrc(reader.result);
                    setPosX(0);
                    setPosY(0);
                    setZoom(1);
                    setOpenCropModal(true);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStart = (clientX, clientY) => {
        setIsDragging(true);
        setDragStart({ x: clientX - posX, y: clientY - posY });
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;
        setPosX(clientX - dragStart.x);
        setPosY(clientY - dragStart.y);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const handleCropSave = () => {
        if (!cropImageSrc) return;

        const img = new Image();
        img.src = cropImageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 640, 400);

            ctx.save();
            ctx.translate(320, 200);
            ctx.scale(zoom, zoom);
            
            const ratio = 640 / 320; // Canvas width / Viewport width
            ctx.translate((posX * ratio) / zoom, (posY * ratio) / zoom);

            let drawWidth = 640;
            let drawHeight = 400;
            const targetAspect = 320 / 200; // 1.6
            if (imgAspect > targetAspect) {
                drawHeight = 400;
                drawWidth = 400 * imgAspect;
            } else {
                drawWidth = 640;
                drawHeight = 640 / imgAspect;
            }

            ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
            ctx.restore();

            canvas.toBlob((blob) => {
                const croppedFile = new File([blob], 'gallery.png', { type: 'image/png' });
                f.setData('image', croppedFile);
                f.setData('delete_image', false);
                
                // Clear previous object URL to prevent memory leak
                if (imagePreview && imagePreview.startsWith('blob:')) {
                    URL.revokeObjectURL(imagePreview);
                }
                setImagePreview(URL.createObjectURL(croppedFile));
                setOpenCropModal(false);
            }, 'image/png');
        };
    };

    const clearImage = () => {
        f.setData('image', null);
        f.setData('delete_image', true);
        if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.post(`/admin/gallery/${editingId}`, {
                forceFormData: true,
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                    setImagePreview(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }
            });
            return;
        }

        f.post("/admin/gallery", {
            forceFormData: true,
            onSuccess: () => {
                f.reset();
                setImagePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            },
        });
    };

    const startEdit = (g) => {
        setEditingId(g.id);
        f.setData({
            _method: 'PATCH',
            title: g.title,
            description: g.description || "",
            status: g.status,
            image: null,
            delete_image: false,
        });
        setImagePreview(g.image ? `/storage/${g.image}` : null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus foto galeri ini?")) {
            router.delete(`/admin/gallery/${id}`);
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Café & Billiard Space
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Kelola Galeri Foto
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola dokumentasi suasana billiard, event, menu makanan, dan keseruan aktivitas café.
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Foto Galeri" : "Tambah Foto Baru"}
                    </h2>
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded-[10px] border border-[#222727] bg-[#151919] px-3.5 py-1.5 text-xs font-bold text-[#9aa7b3] hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
                        >
                            Batal
                        </button>
                    )}
                </div>

                <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Judul Foto</span>
                        <input
                            type="text"
                            placeholder="Contoh: Turnamen Billiard QM 2026"
                            value={f.data.title}
                            onChange={(e) => f.setData("title", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.title && <p className="mt-1 text-xs text-red-400">{f.errors.title}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">File Gambar / Foto</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs text-[#9aa7b3] file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#ffcc00] file:text-[#151919] file:hover:bg-[#e6b800] focus:outline-none transition-all duration-200"
                            required={!editingId}
                        />
                        {f.errors.image && <p className="mt-1 text-xs text-red-400">{f.errors.image}</p>}
                        {imagePreview && (
                            <div className="mt-3 relative h-20 w-32 rounded-lg border border-[#222727] bg-[#151919] overflow-hidden group/preview">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute top-1 right-1 rounded-full bg-red-500/80 p-1 text-white hover:bg-red-600 transition opacity-0 group-hover/preview:opacity-100"
                                    title="Hapus Foto"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status Publikasi</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="active">Aktif / Tampilkan (Active)</option>
                            <option value="inactive">Nonaktif / Sembunyikan (Inactive)</option>
                        </select>
                        {f.errors.status && <p className="mt-1 text-xs text-red-400">{f.errors.status}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Keterangan / Deskripsi Foto</span>
                        <textarea
                            placeholder="Tulis penjelasan singkat mengenai foto atau momen ini..."
                            value={f.data.description}
                            onChange={(e) => f.setData("description", e.target.value)}
                            rows="2"
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.description && <p className="mt-1 text-xs text-red-400">{f.errors.description}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan Foto" : "Unggah Foto Galeri"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-10 border-b border-[#222727] pb-3 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white tracking-wide">Koleksi Galeri Foto</h3>
                <span className="rounded-full bg-[#181d1d] border border-[#222727] px-3 py-1 text-[10px] font-bold text-[#ffcc00] uppercase tracking-wider">
                    Total: {galleries?.total || 0} Item
                </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rows.length > 0 ? (
                    rows.map((g) => (
                        <div
                            key={g.id}
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                {/* Photo Container */}
                                <div className="mb-4 h-48 rounded-xl border border-[#222727] bg-[#151919] overflow-hidden flex items-center justify-center relative">
                                    {g.image ? (
                                        <img
                                            src={`/storage/${g.image}`}
                                            alt={g.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <svg className="w-12 h-12 text-[#ffcc00]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>

                                <div className="flex justify-between gap-3 items-start">
                                    <h3 className="font-extrabold text-base leading-snug text-white tracking-wide">{g.title}</h3>
                                    <StatusBadge value={g.status} />
                                </div>

                                {g.description && (
                                    <p className="mt-2 text-xs text-[#9aa7b3] line-clamp-3 leading-relaxed">
                                        {g.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 pt-4 border-t border-[#222727] flex gap-2.5">
                                <button
                                    onClick={() => startEdit(g)}
                                    className="flex-1 rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(g.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada dokumentasi foto galeri terdaftar.
                    </div>
                )}
            </div>

            {/* Pagination Links */}
            {galleries?.links && galleries.links.length > 3 && (
                <div className="mt-10 flex justify-center items-center gap-1.5 border-t border-[#222727] pt-6">
                    {galleries.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url || link.active}
                            onClick={() => router.visit(link.url)}
                            className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                                link.active
                                    ? "bg-[#ffcc00] text-[#151919] border-[#ffcc00] shadow-sm shadow-[#ffcc00]/10"
                                    : "bg-[#111515] text-[#9aa7b3] border-[#222727] hover:text-white hover:border-[#ffcc00]/20 disabled:opacity-40"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {/* Image Crop Modal */}
            {openCropModal && cropImageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-[15px] border border-[#2b3232] bg-[#151919] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="mb-4">
                            <h3 className="text-base font-extrabold text-white tracking-wide font-serif">Sesuaikan Foto Galeri</h3>
                            <p className="text-[11px] text-[#9aa7b3] mt-1">
                                Geser untuk mengatur posisi dan gunakan slider di bawah untuk memperbesar foto.
                            </p>
                        </div>

                        {/* Viewport Area */}
                        <div className="relative mx-auto my-6 h-[200px] w-[320px] rounded-xl border border-[#2b3232] bg-[#111515] overflow-hidden select-none shadow-lg shadow-black/40">
                            {/* Crop Viewport Mask */}
                            <div 
                                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                                onMouseUp={handleEnd}
                                onMouseLeave={handleEnd}
                                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                                onTouchEnd={handleEnd}
                            />
                            
                            <img
                                src={cropImageSrc}
                                alt="Preview"
                                className="absolute top-1/2 left-1/2 max-w-none select-none pointer-events-none origin-center"
                                style={{
                                    transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${zoom})`,
                                    width: imgAspect > 1.6 ? 'auto' : '100%',
                                    height: imgAspect > 1.6 ? '100%' : 'auto',
                                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                }}
                            />
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] text-[#c7d0d8] font-bold uppercase tracking-wider">
                                    <span>Zoom</span>
                                    <span>{Math.round(zoom * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.01"
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-[#1d2222] rounded-lg appearance-none cursor-pointer accent-[#ffcc00] focus:outline-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenCropModal(false);
                                        setCropImageSrc(null);
                                    }}
                                    className="flex-1 rounded-[10px] border border-[#2b3232] bg-[#151919] py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-[#1d2222] active:scale-98 transition-all duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCropSave}
                                    className="flex-1 rounded-[10px] bg-[#ffcc00] py-2.5 text-xs font-extrabold text-[#151919] hover:bg-[#ffe066] active:scale-98 transition-all duration-200 shadow-md shadow-[#ffcc00]/10 flex items-center justify-center gap-2"
                                >
                                    Terapkan & Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
