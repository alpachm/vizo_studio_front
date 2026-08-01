// ---------------------------------------------------------------------------
// useScrollToSection — Centralized smooth-scroll navigation hook
// ---------------------------------------------------------------------------
import { useCallback } from "react";

export const useScrollToSection = () => {
    const scrollToSection = useCallback(
        (sectionId: string, onCloseMobileMenu?: () => void) => {
            // Close mobile menu/drawer if callback provided
            if (onCloseMobileMenu) {
                onCloseMobileMenu();
            }

            const element = document.getElementById(sectionId);
            if (!element) return;

            const isContact =
                sectionId === "contacto" || sectionId === "contact";

            if (isContact) {
                // Absolute position calculation for Contact to trigger
                // auto-hiding header (top: 0, no header offset)
                let targetTop = 0;
                let currentElement: HTMLElement | null = element;

                while (currentElement) {
                    targetTop += currentElement.offsetTop;
                    currentElement =
                        currentElement.offsetParent as HTMLElement | null;
                }

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth",
                });

                // Smooth fallback for dynamic mobile browser bar
                // adjustments (harmless no-op on desktop)
                setTimeout(() => {
                    const finalTop =
                        element.getBoundingClientRect().top + window.scrollY;
                    if (Math.abs(window.scrollY - finalTop) > 2) {
                        window.scrollTo({
                            top: finalTop,
                            behavior: "smooth",
                        });
                    }
                }, 700);
            } else {
                // Standard sections: deduct 70px Header height on all
                // devices (mobile & desktop)
                const HEADER_HEIGHT = 70;
                const targetPosition = Math.floor(
                    element.getBoundingClientRect().top +
                        window.scrollY -
                        HEADER_HEIGHT,
                );

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        },
        [],
    );

    return { scrollToSection };
};