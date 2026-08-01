// ---------------------------------------------------------------------------
// Header — Global fixed header with navigation and CTA
// ---------------------------------------------------------------------------
import { useState, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";
import type { NavItem } from "../../interfaces/HeaderInterface";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_NAV_ITEMS: NavItem[] = [
    { labelKey: "Header.nav.blog", to: "/blog" },
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const navItems = DEFAULT_NAV_ITEMS;

    return (
        <header
            className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-bg shadow-sm py-3" : "bg-transparent py-5"
            }`}
        >
            {/* Container 1: Centering and Max-Width */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Container 2: Flex distribution */}
                <div className="flex items-center justify-between">
                    {/* ---- Logo / Brand ---- */}
                    <Link
                        to="/"
                        className="flex items-center shrink-0 gap-2 group"
                        aria-label={t("Common.appName")}
                    >
                        <span className="font-title text-2xl sm:text-3xl font-black tracking-tight text-text">
                            {t("Common.appName")}
                        </span>
                    </Link>

                    {/* ---- Desktop Navigation ---- */}
                    <nav
                        className="hidden md:flex items-center gap-6 sm:gap-8"
                        aria-label={t("Header.nav.desktopAriaLabel")}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.to}
                                href={item.to}
                                className="font-body text-lg text-text-muted hover:text-primary transition-colors duration-150"
                            >
                                {t(item.labelKey)}
                            </a>
                        ))}

                        <a
                            href="/contact"
                            className={`inline-flex items-center justify-center px-4 py-2 font-body font-medium text-lg transition-all duration-300 border ${
                                isScrolled
                                    ? "bg-primary border-primary text-white hover:opacity-90"
                                    : "bg-transparent border-text-muted text-text-muted hover:border-text hover:text-text"
                            }`}
                        >
                            {t("Header.buttons.contact")}
                        </a>
                    </nav>

                    {/* ---- Mobile Menu Toggle ---- */}
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

            {/* ---- Mobile Dropdown (CSS Grid Accordion) ---- */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out grid ${
                    mobileOpen
                        ? "grid-rows-[1fr] opacity-100 border-b border-text-muted/10"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 bg-bg/95 backdrop-blur-md">
                    <nav
                        className="flex flex-col px-4 py-4 gap-3 max-w-7xl mx-auto"
                        aria-label={t("Header.nav.mobileAriaLabel")}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.to}
                                href={item.to}
                                className="font-body text-lg text-color-text hover:text-primary transition-colors duration-150 py-1"
                                onClick={closeMobile}
                            >
                                {t(item.labelKey)}
                            </a>
                        ))}

                        <a
                            href="/contact"
                            className={`inline-flex items-center justify-center px-4 py-2 font-body font-medium text-lg transition-all duration-300 border mt-2 ${
                                isScrolled
                                    ? "bg-primary border-primary text-white hover:opacity-90"
                                    : "bg-transparent border-text-muted text-text-muted hover:border-text hover:text-text"
                            }`}
                            onClick={closeMobile}
                        >
                            {t("Header.buttons.contact")}
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
