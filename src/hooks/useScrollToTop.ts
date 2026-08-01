// ---------------------------------------------------------------------------
// useScrollToTop — Reusable smooth-scroll-to-top hook
// ---------------------------------------------------------------------------
import { useCallback } from "react";

export const useScrollToTop = () => {
    const scrollToTop = useCallback((onComplete?: () => void) => {
        // Execute optional callback (e.g. close mobile menu)
        if (onComplete) {
            onComplete();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return { scrollToTop };
};