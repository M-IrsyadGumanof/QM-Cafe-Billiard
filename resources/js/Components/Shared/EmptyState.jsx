export default function EmptyState({
    title = 'Data belum tersedia',
    description = 'Belum ada data yang bisa ditampilkan.',
}) {
    return (
        <div className="rounded-[7px] border border-dashed border-border-strong bg-surface-card p-8 text-center">
            <p className="font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
    );
}
