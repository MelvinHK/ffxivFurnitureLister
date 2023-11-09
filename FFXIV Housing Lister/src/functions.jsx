import { useEffect } from "react";

// Checks if cursor is clicked outside of the ref
export const useOutsideClickAlerter = (ref, isOutside) => {
    useEffect(() => {
        const handleClickOutside = (event) => isOutside(ref.current && !ref.current.contains(event.target));
        document.addEventListener("mouseup", handleClickOutside);
        return () => document.removeEventListener("mouseup", handleClickOutside);
    }, [ref]);
};