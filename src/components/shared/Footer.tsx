// ---------------------------------------------------------------------------
// Footer — Premium global footer with branding, availability badge,
//           contact, navigation, back-to-top, and sub-footer legal row.
// ---------------------------------------------------------------------------
import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiMail, FiArrowUp } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import BrandLogo from "./BrandLogo";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import {
    saveHomeScrollY,
    skipNextHomeScrollRestore,
} from "../../utils/homeScrollPosition";
import type {
    FooterProps,
    FooterNavItem,
    FooterSocialLink,
} from "../../interfaces/FooterInterface";

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
    "/contact": "contacto",
};

const DEFAULT_EMAIL = import.meta.env.VITE_EMAIL;
const DEFAULT_WHATSAPP = "+58 4146536468";
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL;

const SOCIAL_LINKS: FooterSocialLink[] = [
    {
        labelKey: "Footer.social.facebook",
        href: "https://www.facebook.com/profile.php?id=61594388864816",
        icon: FaFacebookF,
    },
    {
        labelKey: "Footer.social.instagram",
        href: "https://www.instagram.com/vizostudio.dev/",
        icon: FaInstagram,
    },
    {
        labelKey: "Footer.social.tiktok",
        href: "https://www.tiktok.com/@vizostudio.dev",
        icon: FaTiktok,
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Footer({
    navItems = DEFAULT_NAV_ITEMS,
    email = DEFAULT_EMAIL,
    whatsapp = DEFAULT_WHATSAPP,
}: FooterProps) {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { scrollToSection } = useScrollToSection();

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <footer className="bg-bg border-t border-neutral-500/15 py-20 sm:py-24 px-6 sm:px-10 lg:px-16 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto">
                {/* ---- Main footer grid ---- */}
                <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
                    {/* ============================================================
                        LEFT COLUMN — Brand, status badge, tagline, contact
                        ============================================================ */}
                    <div className="flex flex-col gap-6">
                        {/* Logo / Brand name */}
                        <BrandLogo className="text-2xl sm:text-3xl" monochrome />

                        {/* Availability badge — green pulsing dot */}
                        <div className="inline-flex items-center gap-2.5 w-fit rounded-full border border-neutral-500/20 bg-neutral-500/[0.04] px-3.5 py-1.5">
                            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                            </span>
                            <span className="font-body text-xs sm:text-sm font-medium text-text">
                                {t("Footer.status")}
                            </span>
                        </div>

                        {/* Tagline */}
                        <p className="font-body text-base sm:text-lg text-text-muted max-w-md leading-relaxed">
                            {t("Footer.tagline")}
                        </p>

                        {/* Contact links */}
                        <div className="flex flex-col gap-2.5 mt-1">
                            {/* Email */}
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center gap-2.5 font-body text-base sm:text-lg text-text-muted hover:text-primary transition-colors duration-200 w-fit"
                            >
                                <FiMail className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                                {email}
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 font-body text-base sm:text-lg text-text-muted hover:text-primary transition-colors duration-200 w-fit"
                            >
                                <FaWhatsapp className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                                {whatsapp}
                            </a>
                        </div>

                        {/* Social media links */}
                        <div className="flex items-center gap-3 mt-1">
                            {SOCIAL_LINKS.map(({ href, labelKey, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={t(labelKey)}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-500/20 bg-neutral-500/[0.04] text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ============================================================
                        RIGHT COLUMN — Nav title, links, back-to-top button
                        ============================================================ */}
                    <div className="flex flex-col gap-6 md:items-end">
                        {/* Navigation header */}
                        <span className="font-title text-xs sm:text-sm uppercase tracking-[0.2em] text-text-muted font-semibold">
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
                                            if (pathname === "/") {
                                                scrollToSection(sectionId);
                                            } else {
                                                skipNextHomeScrollRestore();
                                                void navigate({ to: "/" }).then(() => {
                                                    window.setTimeout(() => {
                                                        scrollToSection(sectionId);
                                                    }, 120);
                                                });
                                            }
                                            return;
                                        }
                                        if (pathname === "/") {
                                            saveHomeScrollY(window.scrollY);
                                        }
                                        void navigate({ to: item.to });
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
                            className="mt-4 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] text-sm sm:text-base font-body font-medium text-text-muted hover:text-text hover:border-primary/50 transition-all duration-300 cursor-pointer w-fit group"
                        >
                            <FiArrowUp
                                className="w-4 h-4 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                            {t("Footer.backToTop")}
                        </button>
                    </div>
                </div>

                {/* ================================================================
                    SUB-FOOTER — Copyright & Legal (separated by top border)
                    ================================================================ */}
                <div className="mt-14 sm:mt-16 pt-8 border-t border-neutral-500/15">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left: copyright + location */}
                        <p className="font-body text-xs sm:text-sm text-text-muted">
                            {t("Footer.copyright")} &bull; {t("Footer.location")}
                        </p>

                        {/* Right: Legal links */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-xs sm:text-sm">
                            <Link
                                to="/terms"
                                className="text-text-muted transition-colors duration-200 hover:text-primary"
                            >
                                {t("Footer.legal.terms")}
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-text-muted transition-colors duration-200 hover:text-primary"
                            >
                                {t("Footer.legal.privacy")}
                            </Link>
                            <Link
                                to="/cookies"
                                className="text-text-muted transition-colors duration-200 hover:text-primary"
                            >
                                {t("Footer.legal.cookies")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
