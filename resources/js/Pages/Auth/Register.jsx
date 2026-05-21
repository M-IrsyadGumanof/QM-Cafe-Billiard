import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/register');
    };

    return (
        <>
            <Head title="Register" />

            <section className="bg-[#111315] min-h-screen flex flex-col">

                {/* CONTENT */}
                <div className="flex-1 flex items-center justify-center px-4 py-20">

                    <div className="w-full max-w-md">

                        {/* TITLE */}
                        <div className="text-center mb-8">

                            <h1 className="text-[44px] font-bold text-white leading-tight">
                                Create <span className="text-[#FFC800]">Account</span>
                            </h1>

                            <p className="text-[#777777] mt-2 text-sm">
                                Join the QM community
                            </p>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >

                            {/* FULL NAME */}
                            <div>

                                <label className="block text-sm text-[#F2F2F2] mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full h-[48px] rounded-lg border border-[#303436] bg-transparent px-4 text-white placeholder-[#777777] focus:border-[#FFC800] focus:outline-none"
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="block text-sm text-[#F2F2F2] mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full h-[48px] rounded-lg border border-[#303436] bg-transparent px-4 text-white placeholder-[#777777] focus:border-[#FFC800] focus:outline-none"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="block text-sm text-[#F2F2F2] mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Min 6 characters"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full h-[48px] rounded-lg border border-[#303436] bg-transparent px-4 text-white placeholder-[#777777] focus:border-[#FFC800] focus:outline-none"
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="block text-sm text-[#F2F2F2] mb-2">
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full h-[48px] rounded-lg border border-[#303436] bg-transparent px-4 text-white placeholder-[#777777] focus:border-[#FFC800] focus:outline-none"
                                />

                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password_confirmation}
                                    </p>
                                )}

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-[48px] rounded-lg bg-[#FFC800] text-[#181A1B] font-semibold transition hover:bg-[#ffd84d]"
                            >
                                Create Account
                            </button>

                        </form>

                        {/* FOOTER */}
                        <p className="mt-6 text-center text-sm text-[#777777]">

                            Already have an account?{' '}

                            <Link
                                href="/login"
                                className="text-[#FFC800] hover:underline"
                            >
                                Sign In
                            </Link>

                        </p>

                    </div>

                </div>

            </section>
        </>
    );
}