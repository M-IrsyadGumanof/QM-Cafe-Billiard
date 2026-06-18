import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm";

export default function Profile({ mustVerifyEmail, status }) {
    return (
        <CustomerLayout>
            <Head title="Profile" />

            <section className="rounded-[30px] border border-[#2b3232] bg-[#111515] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] md:p-8">
                <div className="flex flex-col gap-3 border-b border-[#2b3232] pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffcc00]">
                            Profile
                        </p>
                        <h1 className="mt-2 text-2xl font-black text-white md:text-3xl">
                            Kelola informasi akun Anda
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#dbe3ea] md:text-base">
                            Perbarui data diri, kata sandi, dan pengaturan
                            keamanan dengan tampilan yang konsisten dengan panel
                            customer.
                        </p>
                    </div>
                    <div className="rounded-[18px] border border-[#2b3232] bg-[#151919] px-4 py-3 text-sm text-[#dbe3ea]">
                        Aman • Personal • Konsisten
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <article className="rounded-[24px] border border-[#2b3232] bg-[#151919] p-5 shadow-inner shadow-black/20 md:p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </article>

                    <article className="rounded-[24px] border border-[#2b3232] bg-[#151919] p-5 shadow-inner shadow-black/20 md:p-6">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </article>

                    <article className="rounded-[24px] border border-[#2b3232] bg-[#151919] p-5 shadow-inner shadow-black/20 md:p-6">
                        <DeleteUserForm className="max-w-2xl" />
                    </article>
                </div>
            </section>
        </CustomerLayout>
    );
}
