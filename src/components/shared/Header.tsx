// ---------------------------------------------------------------------------
// Header — Global fixed header with navigation and CTA
// ---------------------------------------------------------------------------
import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import type { NavItem } from "../../interfaces/HeaderInterface";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Editorial ease-out curve used across header reveals. */
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Maps route paths to their corresponding home‑page section IDs. */
const ROUTE_TO_SECTION_ID: Record<string, string> = {
    "/services": "services",
    "/about": "about-us",
    "/portfolio": "portfolio",
    "/contact": "contacto",
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
    { labelKey: "Header.nav.services", to: "/services" },
    { labelKey: "Header.nav.aboutUs", to: "/about" },
    { labelKey: "Header.nav.projects", to: "/portfolio" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Header() {
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOverlapping, setIsOverlapping] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        let rafId: number | null = null;

        const handleScroll = () => {
            // Throttle: skip if a frame is already queued
            if (rafId !== null) return;

            rafId = requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 20);

                // Pixel-perfect overlap detection with #contacto via getBoundingClientRect
                const contactSection = document.getElementById("contacto");
                if (contactSection) {
                    const headerHeight = headerRef.current?.offsetHeight ?? 80;
                    const contactRect = contactSection.getBoundingClientRect();
                    // Header overlaps Contact ONLY when Contact's top edge is
                    // at or above the Header's bottom edge AND Contact's bottom
                    // edge is still below the viewport's top.
                    setIsOverlapping(contactRect.top <= headerHeight && contactRect.bottom >= 0);
                }

                rafId = null;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const { scrollToSection } = useScrollToSection();
    const { scrollToTop } = useScrollToTop();

    // -----------------------------------------------------------------------
    // Click handler for navigation items (desktop & mobile)
    // -----------------------------------------------------------------------

    const handleNavClick = useCallback(
        (to: string, e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
            const sectionId = ROUTE_TO_SECTION_ID[to];
            if (!sectionId) return; // fallback to default link behavior

            e.preventDefault();
            scrollToSection(sectionId, closeMobile);
        },
        [scrollToSection, closeMobile],
    );

    const navItems = DEFAULT_NAV_ITEMS;

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 w-full ease-[cubic-bezier(0.22,1,0.36,1)] transition-[opacity,transform] duration-300 ${
                isOverlapping
                    ? "-translate-y-full opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100"
            }`}
        >
            {/* ---- Glass bar — bottom hairline separates it from the page ---- */}
            <div
                className={`border-b border-white/10 backdrop-blur-md transition-colors duration-300 ${
                    isScrolled ? "bg-black/90" : "bg-black/80"
                }`}
            >
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center py-5">
                        {/* ---- Logo / Brand ---- */}
                        <Link
                            to="/"
                            className="col-start-1 flex shrink-0 items-center justify-self-start"
                            aria-label={t("Common.appName")}
                            onClick={() => scrollToTop(closeMobile)}
                        >
                            <BrandLogo className="text-lg sm:text-xl" />
                        </Link>

                        {/* ---- Desktop Navigation (centered) ---- */}
                        <nav
                            className="col-start-2 hidden items-center justify-self-center gap-8 md:flex lg:gap-10"
                            aria-label={t("Header.nav.desktopAriaLabel")}
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.to}
                                    type="button"
                                    onClick={(e) => handleNavClick(item.to, e)}
                                    className="font-body text-sm font-medium text-neutral-400 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none"
                                >
                                    {t(item.labelKey)}
                                </button>
                            ))}
                        </nav>

                        {/* ---- Right: Desktop CTA + Mobile toggle ---- */}
                        <div className="col-start-3 flex items-center justify-self-end gap-3">
                            <button
                                type="button"
                                onClick={(e) => handleNavClick("/contact", e)}
                                className="group hidden items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-body text-sm font-medium text-white transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] md:inline-flex"
                            >
                                {t("Header.buttons.contact")}
                                <FiArrowUpRight
                                    className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* ---- Mobile Menu Toggle ---- */}
                            <button
                                type="button"
                                onClick={() => setMobileOpen((prev) => !prev)}
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-menu"
                                aria-label={
                                    mobileOpen
                                        ? t("Header.nav.closeMenu")
                                        : t("Header.nav.openMenu")
                                }
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 md:hidden"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={mobileOpen ? "close" : "open"}
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { opacity: 0, rotate: -90, scale: 0.8 }
                                        }
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { opacity: 0, rotate: 90, scale: 0.8 }
                                        }
                                        transition={{
                                            duration: shouldReduceMotion ? 0 : 0.2,
                                            ease: "easeOut",
                                        }}
                                        className="flex"
                                    >
                                        {mobileOpen ? (
                                            <FiX className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <FiMenu className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Mobile Drawer — clip-path reveal with staggered links ---- */}
            <AnimatePresence initial={false}>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        id="mobile-menu"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
                        }
                        animate={
                            shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
                        }
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
                        }
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.45,
                            ease: EASE_OUT_EXPO,
                        }}
                        className="md:hidden bg-black/95 backdrop-blur-lg"
                    >
                        <nav
                            className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
                            aria-label={t("Header.nav.mobileAriaLabel")}
                        >
                            <div className="flex flex-col">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.to}
                                        type="button"
                                        onClick={(e) => handleNavClick(item.to, e)}
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { opacity: 0, y: 16 }
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: shouldReduceMotion ? 0 : 0.5,
                                            ease: EASE_OUT_EXPO,
                                            delay: shouldReduceMotion ? 0 : index * 0.07,
                                        }}
                                        className="border-b border-white/10 py-4 text-left font-body text-lg font-medium text-neutral-200 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none"
                                    >
                                        {t(item.labelKey)}
                                    </motion.button>
                                ))}

                                {/* Mobile CTA — clean outline pill */}
                                <motion.div
                                    initial={
                                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.5,
                                        ease: EASE_OUT_EXPO,
                                        delay: shouldReduceMotion ? 0 : navItems.length * 0.07,
                                    }}
                                    className="pt-6"
                                >
                                    <button
                                        type="button"
                                        onClick={(e) => handleNavClick("/contact", e)}
                                        className="group inline-flex w-full items-center justify-between rounded-full border border-white/30 px-6 py-4 font-body text-base font-medium text-white transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]"
                                    >
                                        {t("Header.buttons.contact")}
                                        <FiArrowUpRight
                                            className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </motion.div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
