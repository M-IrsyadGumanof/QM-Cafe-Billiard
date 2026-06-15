import { usePage } from '@inertiajs/react';

export default function Flash() {
    const { flash } = usePage().props;

    if (!flash?.success && !flash?.error) {
        return null;
    }

    return (
        <div
            className={`mb-5 rounded-[7px] border px-4 py-3 text-sm ${
                flash.success
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    : 'border-red-500/30 bg-red-500/10 text-red-200'
            }`}
        >
            {flash.success || flash.error}
        </div>
    );
}
