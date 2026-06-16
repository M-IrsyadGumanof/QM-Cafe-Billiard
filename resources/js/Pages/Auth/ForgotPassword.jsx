import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-6 space-y-3 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                    Forgot Password
                </p>
                <h1 className="text-2xl font-black text-white sm:text-3xl">
                    Reset your password
                </h1>
                <p className="text-sm leading-6 text-slate-300 sm:text-base">
                    Enter the email address linked to your account. We will send
                    a secure reset link that lets you set a new password.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 shadow-lg shadow-emerald-500/10">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-200"
                    >
                        Email address
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="you@example.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-300">
                    If the email is registered, you will receive a reset link
                    shortly. Please also check your spam or promotions folder.
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href={route("login")}
                        className="text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                    >
                        Back to login
                    </Link>
                    <PrimaryButton
                        className="w-full justify-center sm:w-auto"
                        disabled={processing}
                    >
                        {processing ? "Sending..." : "Send reset link"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
