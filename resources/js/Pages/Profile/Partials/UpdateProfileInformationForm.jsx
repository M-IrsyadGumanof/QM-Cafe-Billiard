import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            address: user.address || '',
        });

    const avatarForm = useForm({
        avatar: null,
    });

    const [imageError, setImageError] = useState(false);
    const [openCropModal, setOpenCropModal] = useState(false);
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const [imgAspect, setImgAspect] = useState(1);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [user.avatar]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                avatarForm.setError('avatar', 'Ukuran file tidak boleh melebihi 10MB.');
                return;
            }
            avatarForm.clearErrors();

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
        setIsUploading(true);

        const img = new Image();
        img.src = cropImageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 300, 300);

            ctx.save();
            ctx.translate(150, 150);
            ctx.scale(zoom, zoom);
            
            const ratio = 300 / 240;
            ctx.translate((posX * ratio) / zoom, (posY * ratio) / zoom);

            let drawWidth = 300;
            let drawHeight = 300;
            if (imgAspect > 1) {
                drawHeight = 300;
                drawWidth = 300 * imgAspect;
            } else {
                drawWidth = 300;
                drawHeight = 300 / imgAspect;
            }

            ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
            ctx.restore();

            canvas.toBlob((blob) => {
                const croppedFile = new File([blob], 'avatar.png', { type: 'image/png' });
                
                router.post(route('profile.avatar.update'), {
                    avatar: croppedFile,
                }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        avatarForm.reset();
                        setOpenCropModal(false);
                        setIsUploading(false);
                        setCropImageSrc(null);
                    },
                    onError: (errs) => {
                        setIsUploading(false);
                        if (errs.avatar) {
                            avatarForm.setError('avatar', errs.avatar);
                        }
                    }
                });
            }, 'image/png');
        };
    };

    const handleAvatarDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus foto profil?')) {
            router.delete(route('profile.avatar.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    avatarForm.reset();
                }
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-[#9aa7b3]">
                    Update your account's profile information and email address.
                </p>
            </header>

            {/* Avatar Section */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#2b3232]">
                <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-[#ffcc00] bg-gradient-to-tr from-[#1d2222] to-[#111515] flex items-center justify-center text-white font-black text-2xl uppercase overflow-hidden shadow-inner shadow-black/40">
                        {user.avatar && !imageError ? (
                            <img
                                src={`/storage/${user.avatar}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            user.name ? user.name[0] : 'U'
                        )}
                    </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Foto Profil</h3>
                    <p className="text-[11px] text-[#9aa7b3] leading-relaxed">
                        Mendukung format JPG, PNG, atau GIF. Ukuran file maksimal 10 MB.
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                        <label className="rounded-[8px] bg-[#ffcc00] px-3.5 py-2 text-xs font-extrabold text-[#151919] hover:bg-[#ffe066] cursor-pointer transition-all duration-200 shadow-md">
                            Unggah Foto
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                                disabled={avatarForm.processing}
                            />
                        </label>

                        {user.avatar && (
                            <button
                                type="button"
                                onClick={handleAvatarDelete}
                                disabled={avatarForm.processing}
                                className="rounded-[8px] border border-red-500/30 bg-red-500/5 px-3.5 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all duration-200"
                            >
                                Hapus Foto
                            </button>
                        )}
                    </div>
                    {avatarForm.errors.avatar && (
                        <p className="text-[10px] text-red-400 mt-1">{avatarForm.errors.avatar}</p>
                    )}
                    {avatarForm.recentlySuccessful && (
                        <p className="text-[10px] text-emerald-400 mt-1">Foto profil berhasil diperbarui!</p>
                    )}
                </div>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Nomor Telepon / WA" />

                    <TextInput
                        id="phone"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="Contoh: 081234567890"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Alamat Lengkap" />

                    <textarea
                        id="address"
                        className="mt-1 block w-full rounded-[7px] border border-[#2b3232] bg-[#111515] text-white shadow-sm placeholder:text-[#9aa7b3] focus:border-[#ffcc00] focus:ring-[#ffcc00] disabled:cursor-not-allowed disabled:bg-[#151919] p-3 text-sm"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        rows="3"
                        placeholder="Masukkan alamat lengkap Anda..."
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-[#c7d0d8]">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 dark:text-[#9aa7b3] underline hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-[#c7d0d8]">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>

            {/* Image Crop Modal */}
            {openCropModal && cropImageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-[20px] border border-[#2b3232] bg-[#151919] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="mb-4">
                            <h3 className="text-base font-black text-white font-serif tracking-wide">Adjust Profile Photo</h3>
                            <p className="text-[11px] text-[#9aa7b3] mt-1">
                                Drag to position and use the slider to zoom your photo.
                            </p>
                        </div>

                        {/* Viewport Area */}
                        <div className="relative mx-auto my-6 h-60 w-60 rounded-full border-2 border-[#ffcc00] bg-[#111515] overflow-hidden select-none shadow-lg shadow-black/40">
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
                                    width: imgAspect > 1 ? 'auto' : '100%',
                                    height: imgAspect > 1 ? '100%' : 'auto',
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
                                    disabled={isUploading}
                                    className="flex-1 rounded-[10px] border border-[#2b3232] py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-[#1d2222] active:scale-98 transition-all duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCropSave}
                                    disabled={isUploading}
                                    className="flex-1 rounded-[10px] bg-[#ffcc00] py-2.5 text-xs font-extrabold text-[#151919] hover:bg-[#ffe066] active:scale-98 transition-all duration-200 shadow-md shadow-[#ffcc00]/10 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isUploading ? (
                                        <>
                                            <svg className="animate-spin h-4.5 w-4.5 text-[#151919]" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        'Apply & Save'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
