// ---------------------------------------------------------------------------
// Header — Global fixed header with navigation and CTA
// ---------------------------------------------------------------------------
import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import type { NavItem } from "../../interfaces/HeaderInterface";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps route paths to their corresponding home‑page section IDs. */
const ROUTE_TO_SECTION_ID: Record<string, string> = {
    "/services": "services",
    "/about": "about-us",
    "/contact": "contacto",
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
    // { labelKey: "Header.nav.blog", to: "/blog" },
    { labelKey: "Header.nav.services", to: "/services" },
    { labelKey: "Header.nav.aboutUs", to: "/about" },
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

    // Header background is active when scrolled OR mobile menu is open
    const isHeaderActive = isScrolled || mobileOpen;
    const navItems = DEFAULT_NAV_ITEMS;

    return (
        <header
            ref={headerRef}
            className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                isOverlapping
                    ? "-translate-y-full opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100"
            } ${isHeaderActive ? "bg-bg shadow-sm py-3" : "bg-transparent py-5"}`}
        >
            {/* Container 1: Centering and Max-Width */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Container 2: Flex distribution */}
                <div className="flex items-center justify-between">
                    {/* ---- Logo / Brand ---- */}
                    <Link
                        to="/"
                        className="flex items-center shrink-0 gap-2 group cursor-pointer"
                        aria-label={t("Common.appName")}
                        onClick={() => scrollToTop(closeMobile)}
                    >
                        <span
                            className={`font-title text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300 ${
                                isScrolled ? "text-white" : "text-text-muted"
                            }`}
                        >
                            {t("Common.logoVizo")}
                        </span>
                        <span
                            className={`font-title text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300 ${
                                isScrolled ? "text-primary" : "text-text-muted"
                            }`}
                        >
                            {t("Common.logoStudio")}
                        </span>
                    </Link>

                    {/* ---- Desktop Navigation ---- */}
                    <nav
                        className="hidden md:flex items-center gap-6 sm:gap-8"
                        aria-label={t("Header.nav.desktopAriaLabel")}
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.to}
                                type="button"
                                onClick={(e) => handleNavClick(item.to, e)}
                                className="font-body text-lg text-text-muted hover:text-primary transition-colors duration-150 bg-transparent border-none cursor-pointer"
                            >
                                {t(item.labelKey)}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={(e) => handleNavClick("/contact", e)}
                            className={`inline-flex items-center justify-center px-4 py-2 font-body font-medium text-lg transition-all duration-300 border ${
                                isScrolled
                                    ? "bg-primary border-primary text-white hover:opacity-90"
                                    : "bg-transparent border-text-muted text-text-muted hover:border-text hover:text-text"
                            }`}
                        >
                            {t("Header.buttons.contact")}
                        </button>
                    </nav>

                    {/* ---- Mobile Menu Toggle ---- */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 text-text-muted hover:text-primary hover:bg-bg transition-colors"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-expanded={mobileOpen}
                            aria-label={
                                mobileOpen ? t("Header.nav.closeMenu") : t("Header.nav.openMenu")
                            }
                        >
                            {mobileOpen ? (
                                <FiX className="w-7 h-7 stroke-[2.5]" aria-hidden="true" />
                            ) : (
                                <FiMenu className="w-7 h-7 stroke-[2.5]" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* ---- Mobile Dropdown (CSS Grid Accordion) ---- */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out grid ${
                    mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 bg-bg">
                    <nav
                        className="flex flex-col px-4 py-4 gap-3 max-w-7xl mx-auto"
                        aria-label={t("Header.nav.mobileAriaLabel")}
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.to}
                                type="button"
                                onClick={(e) => handleNavClick(item.to, e)}
                                className="font-body text-lg text-text-muted hover:text-primary transition-colors duration-150 py-1 bg-transparent border-none cursor-pointer text-left"
                            >
                                {t(item.labelKey)}
                            </button>
                        ))}

                        {/* Mobile Dropdown CTA — Always Primary Filled */}
                        <button
                            type="button"
                            onClick={(e) => handleNavClick("/contact", e)}
                            className="inline-flex items-center justify-center px-4 py-2 font-body font-medium text-lg transition-all duration-300 border mt-2 bg-primary border-primary text-white hover:opacity-90"
                        >
                            {t("Header.buttons.contact")}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
