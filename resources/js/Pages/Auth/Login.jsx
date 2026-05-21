import { Head, Link, useForm } from '@inertiajs/react';

// import Navbar from '@/Components/Navbar';
// import Footer from '@/Components/Footer';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen bg-[#111315] text-white flex flex-col">

                {/* <Navbar /> */}

                {/* Login Section */}
                <div className="flex-1 flex items-center justify-center px-6 py-20">

                    <div className="w-full max-w-md">

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold font-playfairDisplay">
                                Welcome <span className="text-yellow-400">Back</span>
                            </h1>

                            <p className="text-gray-400 mt-2">
                                Sign in to your account
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-md bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="you@example.com"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-md bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="********"
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md transition"
                            >
                                {processing ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Register */}
                        <p className="text-center text-gray-400 text-sm mt-6">
                            Don’t have an account?{' '}

                            <Link
                                href="/register"
                                className="text-yellow-400 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                {/* <Footer /> */}
            </div>
        </>
    );
}