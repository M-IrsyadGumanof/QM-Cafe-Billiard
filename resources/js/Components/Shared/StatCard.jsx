export default function StatCard({ label, value, hint }) {
    return (
        <div className="rounded-[7px] border border-border-strong bg-surface-card p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-white">{value}</p>
            {hint && (
                <p className="mt-2 text-xs text-muted">{hint}</p>
            )}
        </div>
    );
}
