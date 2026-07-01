import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout maxWidth="max-w-xl">
            <Head title="Register" />

            <div className="mb-5">
                <h2 className="text-xl font-black text-white font-serif">Create Account</h2>
                <p className="mt-1 text-xs text-[#9aa7b3] font-medium">Register today to start booking tables and ordering menu items.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full pl-10.5 py-2.5 text-sm"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <InputError message={errors.name} className="mt-1 text-xs" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                </svg>
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-10.5 py-2.5 text-sm"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>

                        <InputError message={errors.email} className="mt-1 text-xs" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number / WhatsApp" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="block w-full pl-10.5 py-2.5 text-sm"
                                autoComplete="tel"
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Example: 081234567890"
                            />
                        </div>

                        <InputError message={errors.phone} className="mt-1 text-xs" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Full Address" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="block w-full pl-10.5 py-2.5 text-sm"
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Enter address..."
                                required
                            />
                        </div>

                        <InputError message={errors.address} className="mt-1 text-xs" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="block w-full pl-10.5 pr-12 py-2.5 text-sm"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center rounded-r-[7px] border border-transparent px-3 text-[#ffcc00] hover:bg-[#111515] hover:text-[#ffe17a] focus:outline-none transition-colors duration-200"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                        <path d="M3 3l18 18" />
                                        <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                                        <path d="M9.1 5.1A10.9 10.9 0 0 1 12 4c6 0 9.5 6 9.5 6a17.7 17.7 0 0 1-4 4.3" />
                                        <path d="M6.2 7.7A17.9 17.9 0 0 0 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.2 3.9-.6" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} className="mt-1 text-xs" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider"
                        />

                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <TextInput
                                id="password_confirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full pl-10.5 pr-12 py-2.5 text-sm"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center rounded-r-[7px] border border-transparent px-3 text-[#ffcc00] hover:bg-[#111515] hover:text-[#ffe17a] focus:outline-none transition-colors duration-200"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                        <path d="M3 3l18 18" />
                                        <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                                        <path d="M9.1 5.1A10.9 10.9 0 0 1 12 4c6 0 9.5 6 9.5 6a17.7 17.7 0 0 1-4 4.3" />
                                        <path d="M6.2 7.7A17.9 17.9 0 0 0 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.2 3.9-.6" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1 text-xs"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>

                <div className="mt-4 pt-4 border-t border-[#2b3232]/50 text-center">
                    <p className="text-xs text-[#9aa7b3] font-medium">
                        Already registered?{" "}
                        <Link
                            href={route('login')}
                            className="font-extrabold text-[#ffcc00] hover:text-[#ffe17a] transition-colors duration-200"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
