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

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="relative mt-1">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="block w-full pr-20"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center rounded-r-[7px] border border-transparent px-3 text-[#ffcc00] hover:bg-[#151919] hover:text-[#ffe17a] focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:ring-offset-2 focus:ring-offset-[#151919]"
                            aria-label={
                                showPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                        >
                            {showPassword ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-5 w-5"
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
                                    strokeWidth="1.8"
                                    className="h-5 w-5"
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

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="captcha" value="Verifikasi Captcha" />

                    <div className="flex items-center gap-3 mt-1">
                        <div className="relative overflow-hidden rounded-[7px] border border-[#2b3232] h-[42px] w-[140px] shrink-0 bg-[#151919] flex items-center justify-center">
                            <img
                                src={`/captcha?t=${captchaKey}`}
                                alt="Captcha"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        
                        <button
                            type="button"
                            onClick={refreshCaptcha}
                            className="flex items-center justify-center h-[42px] w-[42px] shrink-0 rounded-[7px] border border-[#2b3232] bg-[#151919] text-[#ffcc00] hover:bg-[#222727] hover:text-[#ffe17a] transition-all duration-200"
                            title="Segarkan Captcha"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
                            </svg>
                        </button>

                        <TextInput
                            id="captcha"
                            type="text"
                            name="captcha"
                            value={data.captcha}
                            className="block w-full"
                            placeholder="6 karakter..."
                            autoComplete="off"
                            maxLength={6}
                            required
                            onChange={(e) =>
                                setData("captcha", e.target.value)
                            }
                        />
                    </div>

                    <InputError message={errors.captcha} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-[#c7d0d8]">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-[#ffcc00] underline hover:text-[#ffe17a] focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:ring-offset-2 focus:ring-offset-[#151919]"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <p className="mt-6 text-center text-sm text-[#dbe3ea]">
                    Belum punya akun?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-[#ffcc00] hover:text-[#ffe17a]"
                    >
                        Buat akun sekarang
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
