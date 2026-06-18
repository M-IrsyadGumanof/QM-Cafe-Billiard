import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, router } from '@inertiajs/react';

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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                avatarForm.setError('avatar', 'Ukuran file tidak boleh melebihi 2MB.');
                return;
            }
            avatarForm.clearErrors();
            router.post(route('profile.avatar.update'), {
                avatar: file,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    avatarForm.reset();
                },
                onError: (errs) => {
                    if (errs.avatar) {
                        avatarForm.setError('avatar', errs.avatar);
                    }
                }
            });
        }
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
                        {user.avatar ? (
                            <img
                                src={`/storage/${user.avatar}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            user.name ? user.name[0] : 'U'
                        )}
                    </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">Foto Profil</h3>
                    <p className="text-[11px] text-[#9aa7b3] leading-relaxed">
                        Mendukung format JPG, PNG, atau GIF. Ukuran file maksimal 2 MB.
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
        </section>
    );
}
