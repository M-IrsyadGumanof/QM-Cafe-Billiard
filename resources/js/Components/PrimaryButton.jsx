export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-[7px] border border-transparent bg-[#ffcc00] px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[#151919] transition duration-200 ease-in-out hover:bg-[#e6b800] hover:shadow-md hover:shadow-[#ffcc00]/10 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:ring-offset-2 focus:ring-offset-[#111515] active:bg-[#cc9900] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
