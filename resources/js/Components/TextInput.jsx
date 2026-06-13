import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "rounded-[7px] border border-[#2b3232] bg-[#111515] text-white shadow-sm placeholder:text-[#9aa7b3] focus:border-[#ffcc00] focus:ring-[#ffcc00] disabled:cursor-not-allowed disabled:bg-[#151919] " +
                className
            }
            ref={localRef}
        />
    );
});
