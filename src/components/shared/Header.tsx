// ---------------------------------------------------------------------------
// Header — Global fixed header with navigation and CTA
// ---------------------------------------------------------------------------
import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiCodesandbox } from "react-icons/fi";
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

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const navItems = DEFAULT_NAV_ITEMS;

    return (
        <header className="w-full fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-text-muted/10 transition-colors duration-300">
            {/* Container 1: Centering and Max-Width */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Container 2: Flex distribution */}
                <div className="h-16 sm:h-20 flex items-center justify-between">
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
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-primary text-primary font-body font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200"
                        >
                            {t("Header.buttons.contact")}
                        </a>
                    </nav>

                    {/* ---- Mobile Menu Toggle ---- */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-muted hover:text-primary hover:bg-bg transition-colors"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-expanded={mobileOpen}
                        aria-label={
                            mobileOpen ? t("Header.nav.closeMenu") : t("Header.nav.openMenu")
                        }
                    >
                        {mobileOpen ? (
                            <FiX className="w-6 h-6" aria-hidden="true" />
                        ) : (
                            <FiMenu className="w-6 h-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* ---- Mobile Dropdown ---- */}
            {mobileOpen && (
                <nav
                    className="md:hidden border-t border-text-muted/10 bg-bg/95 backdrop-blur-md"
                    aria-label={t("Header.nav.mobileAriaLabel")}
                >
                    <div className="flex flex-col px-4 py-4 gap-3 max-w-7xl mx-auto">
                        {navItems.map((item) => (
                            <a
                                key={item.to}
                                href={item.to}
                                className="font-body text-base text-text-muted hover:text-primary transition-colors duration-150"
                                onClick={closeMobile}
                            >
                                {t(item.labelKey)}
                            </a>
                        ))}

                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-primary text-primary font-body font-medium text-lg hover:bg-primary hover:text-white transition-all duration-200"
                            onClick={closeMobile}
                        >
                            {t("Header.buttons.contact")}
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
