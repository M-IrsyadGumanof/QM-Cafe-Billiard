import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [captchaKey, setCaptchaKey] = useState(0);
    const refreshCaptcha = () => setCaptchaKey((prev) => prev + 1);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        captcha: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => {
                reset("password");
                refreshCaptcha();
            },
            onError: () => {
                refreshCaptcha();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-6">
                <h2 className="text-xl font-black text-white font-serif">Sign In</h2>
                <p className="mt-1.5 text-xs text-[#9aa7b3] font-medium">Please enter your credentials to access your account.</p>
            </div>

            {status && (
                <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-md">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                    <div className="relative mt-1.5">
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
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                    <div className="relative mt-1.5">
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
                            className="block w-full pl-10.5 pr-20 py-2.5 text-sm"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="••••••••"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center rounded-r-[7px] border border-transparent px-3 text-[#ffcc00] hover:bg-[#111515] hover:text-[#ffe17a] focus:outline-none transition-colors duration-200"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M3 3l18 18" />
                                    <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                                    <path d="M9.1 5.1A10.9 10.9 0 0 1 12 4c6 0 9.5 6 9.5 6a17.7 17.7 0 0 1-4 4.3" />
                                    <path d="M6.2 7.7A17.9 17.9 0 0 0 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.2 3.9-.6" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="captcha" value="Captcha Verification" className="text-xs font-bold text-[#c7d0d8] uppercase tracking-wider" />

                    <div className="flex items-center gap-2.5 mt-1.5">
                        <div className="relative overflow-hidden rounded-[7px] border border-[#2b3232] h-[42px] w-[130px] shrink-0 bg-[#111515] flex items-center justify-center shadow-inner shadow-black/20">
                            <img
                                src={`/captcha?t=${captchaKey}`}
                                alt="Captcha"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        
                        <button
                            type="button"
                            onClick={refreshCaptcha}
                            className="flex items-center justify-center h-[42px] w-[42px] shrink-0 rounded-[7px] border border-[#2b3232] bg-[#111515] text-[#ffcc00] hover:bg-[#1d2222] hover:text-[#ffe17a] transition-all duration-200 shadow-md focus:outline-none focus:ring-1 focus:ring-[#ffcc00]"
                            title="Refresh Captcha"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>

                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#5b6e6e]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <TextInput
                                id="captcha"
                                type="text"
                                name="captcha"
                                value={data.captcha}
                                className="block w-full pl-9 py-2.5 text-sm"
                                placeholder="6 chars..."
                                autoComplete="off"
                                maxLength={6}
                                required
                                onChange={(e) =>
                                    setData("captcha", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <InputError message={errors.captcha} className="mt-1.5 text-xs" />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center select-none cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs font-bold text-[#c7d0d8] hover:text-white transition-colors duration-200">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-xs font-extrabold text-[#ffcc00] hover:text-[#ffe17a] transition-colors duration-200 focus:outline-none"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-6 pt-6 border-t border-[#2b3232]/50 text-center">
                    <p className="text-xs text-[#9aa7b3] font-medium">
                        Don't have an account?{" "}
                        <Link
                            href={route("register")}
                            className="font-extrabold text-[#ffcc00] hover:text-[#ffe17a] transition-colors duration-200"
                        >
                            Register now
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
