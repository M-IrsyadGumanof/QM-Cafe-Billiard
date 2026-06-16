export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-[#c7d0d8] ` + className}
        >
            {value ? value : children}
        </label>
    );
}
