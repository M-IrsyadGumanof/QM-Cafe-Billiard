export default function PageHeader({ title, subtitle, action }) {
    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-black text-white">{title}</h1>
                {subtitle && (
                    <p className="mt-1 text-sm text-muted">{subtitle}</p>
                )}
            </div>
            {action}
        </div>
    );
}
