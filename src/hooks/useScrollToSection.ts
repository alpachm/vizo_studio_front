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

            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                const isContact =
                    sectionId === "contacto" || sectionId === "contact";

                if (isContact) {
                    // Absolute position calculation for Contact to trigger
                    // auto-hiding header
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
                    // adjustments
                    setTimeout(() => {
                        const finalTop =
                            element.getBoundingClientRect().top +
                            window.scrollY;
                        if (Math.abs(window.scrollY - finalTop) > 2) {
                            window.scrollTo({
                                top: finalTop,
                                behavior: "smooth",
                            });
                        }
                    }, 700);
                } else {
                    // 70px offset deduction for compact Mobile Header on
                    // standard sections
                    const offset = 70;
                    const targetPosition = Math.floor(
                        element.getBoundingClientRect().top +
                            window.scrollY -
                            offset,
                    );

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                }
            } else {
                // Desktop navigation
                element.scrollIntoView({ behavior: "smooth" });
            }
        },
        [],
    );

    return { scrollToSection };
};