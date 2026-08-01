// ---------------------------------------------------------------------------
// Footer — Premium global footer with branding, availability badge,
//           contact, navigation, back-to-top, and sub-footer legal row.
// ---------------------------------------------------------------------------
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiArrowUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { FooterProps, FooterNavItem } from "../../interfaces/FooterInterface";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_NAV_ITEMS: FooterNavItem[] = [
    { labelKey: "Footer.nav.services", to: "/services" },
    { labelKey: "Footer.nav.aboutUs", to: "/about" },
    // { labelKey: "Footer.nav.blog", to: "/blog" },
    { labelKey: "Footer.nav.contact", to: "/contact" },
];

/** Maps route paths to their corresponding home‑page section IDs. */
const ROUTE_TO_SECTION_ID: Record<string, string> = {
    "/services": "services",
    "/about": "about-us",
    "/contact": "contacto",
};

const DEFAULT_EMAIL = "correo@email.com";
const DEFAULT_WHATSAPP = "+58 4140004343";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strips non-digit characters from a phone string for URL usage. */
function digitsOnly(value: string): string {
    return value.replace(/\D/g, "");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Footer({
    navItems = DEFAULT_NAV_ITEMS,
    email = DEFAULT_EMAIL,
    whatsapp = DEFAULT_WHATSAPP,
}: FooterProps) {
    const { t } = useTranslation();

    const { scrollToSection } = useScrollToSection();

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <footer className="bg-bg py-24 sm:py-28 px-6 sm:px-12 lg:px-20 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto">
                {/* ---- Main footer grid ---- */}
                <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
                    {/* ============================================================
                        LEFT COLUMN — Brand, status badge, tagline, contact
                        ============================================================ */}
                    <div className="flex flex-col gap-6">
                        {/* Logo / Brand name */}
                        <span className="font-title text-3xl sm:text-4xl font-black tracking-tight text-text">
                            {t("Common.appName")}
                        </span>

                        {/* Availability badge — green pulsing dot */}
                        <div className="inline-flex items-center gap-2.5">
                            <span className="relative flex h-3 w-3" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                            </span>
                            <span className="font-body text-sm sm:text-base font-medium text-text/80">
                                {t("Footer.status")}
                            </span>
                        </div>

                        {/* Tagline */}
                        <p className="font-body text-base sm:text-lg text-text-muted max-w-md leading-relaxed">
                            {t("Footer.tagline")}
                        </p>

                        {/* Contact links */}
                        <div className="flex flex-col gap-2.5 mt-2">
                            {/* Email */}
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center gap-2.5 font-body text-base sm:text-lg text-text-muted hover:text-primary transition-colors duration-200 w-fit"
                            >
                                <FiMail className="w-5 h-5 shrink-0" aria-hidden="true" />
                                {email}
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/${digitsOnly(whatsapp)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 font-body text-base sm:text-lg text-text-muted hover:text-primary transition-colors duration-200 w-fit"
                            >
                                <FaWhatsapp className="w-5 h-5 shrink-0" aria-hidden="true" />
                                {whatsapp}
                            </a>
                        </div>
                    </div>

                    {/* ============================================================
                        RIGHT COLUMN — Nav title, links, back-to-top button
                        ============================================================ */}
                    <div className="flex flex-col gap-6 md:items-end">
                        {/* Navigation header */}
                        <span className="font-title text-xs sm:text-sm uppercase tracking-[0.2em] text-text/50 font-semibold">
                            {t("Footer.navTitle")}
                        </span>

                        {/* Vertical nav links */}
                        <nav
                            className="flex flex-col gap-3 sm:gap-4 md:items-end"
                            aria-label={t("Footer.navTitle")}
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.to}
                                    type="button"
                                    onClick={() => {
                                        const sectionId = ROUTE_TO_SECTION_ID[item.to];
                                        if (sectionId) {
                                            scrollToSection(sectionId);
                                        }
                                    }}
                                    className="font-body text-base sm:text-lg text-text-muted hover:text-primary transition-colors duration-200 w-fit bg-transparent border-none cursor-pointer"
                                >
                                    {t(item.labelKey)}
                                </button>
                            ))}
                        </nav>

                        {/* Back to top button */}
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="mt-4 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-text/15 bg-bg text-sm sm:text-base font-body font-medium text-text-muted hover:text-text hover:border-text/30 transition-all duration-300 cursor-pointer w-fit group"
                        >
                            <FiArrowUp
                                className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                            {t("Footer.backToTop")}
                        </button>
                    </div>
                </div>

                {/* ================================================================
                    SUB-FOOTER — Copyright & Legal (separated by top border)
                    ================================================================ */}
                <div className="mt-14 sm:mt-16 pt-8 border-t border-text/10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left: copyright + location */}
                        <p className="font-body text-xs sm:text-sm text-text/40">
                            {t("Footer.copyright")} &bull; {t("Footer.location")}
                        </p>

                        {/* Right: legal links */}
                        {/* <div className="flex items-center gap-5 sm:gap-6">
                            <a
                                href="/privacy"
                                className="font-body text-xs sm:text-sm text-text/40 hover:text-text-muted transition-colors duration-200"
                            >
                                {t("Footer.legal.privacy")}
                            </a>
                            <a
                                href="/terms"
                                className="font-body text-xs sm:text-sm text-text/40 hover:text-text-muted transition-colors duration-200"
                            >
                                {t("Footer.legal.terms")}
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
