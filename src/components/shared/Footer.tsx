// ---------------------------------------------------------------------------
// Footer — Global footer with branding, contact, navigation & back-to-top
// ---------------------------------------------------------------------------
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiPhone, FiArrowUp } from "react-icons/fi";
import type { FooterNavItem } from "../../interfaces/FooterInterface";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_NAV_ITEMS: FooterNavItem[] = [
    { labelKey: "Footer.nav.blog", to: "/blog" },
    { labelKey: "Footer.nav.services", to: "/services" },
    { labelKey: "Footer.nav.aboutUs", to: "/about" },
];

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

function Footer() {
    const { t } = useTranslation();

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <footer className="bg-bg py-32 px-6 sm:px-12 lg:px-20 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 items-start md:flex-row md:justify-between md:items-center">
                {/* ---- Left: Brand & Contact ---- */}
                <div className="flex flex-col gap-4">
                    <span className="font-title text-2xl sm:text-3xl font-black tracking-tight text-text">
                        {t("Common.appName")}
                    </span>

                    <div className="flex flex-col gap-2">
                        {/* Email */}
                        <a
                            href={`mailto:${DEFAULT_EMAIL}`}
                            className="inline-flex items-center gap-2 font-body text-lg text-text-muted hover:text-secondary transition-colors duration-200"
                        >
                            <FiMail className="w-5 h-5" aria-hidden="true" />
                            {DEFAULT_EMAIL}
                        </a>

                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/${digitsOnly(DEFAULT_WHATSAPP)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-body text-lg text-text-muted hover:text-secondary transition-colors duration-200"
                        >
                            <FiPhone className="w-5 h-5" aria-hidden="true" />
                            {DEFAULT_WHATSAPP}
                        </a>
                    </div>
                </div>

                {/* ---- Right: Navigation & Back to Top ---- */}
                <div className="flex flex-col gap-4 items-start md:items-end">
                    <nav
                        className="flex flex-wrap gap-4 sm:gap-6"
                        aria-label={t("Footer.navAriaLabel")}
                    >
                        {DEFAULT_NAV_ITEMS.map((item) => (
                            <a
                                key={item.to}
                                href={item.to}
                                className="font-body text-lg text-text-muted hover:text-primary transition-colors duration-150"
                            >
                                {t(item.labelKey)}
                            </a>
                        ))}
                    </nav>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 font-body text-lg text-text-muted hover:text-secondary transition-colors duration-200 cursor-pointer"
                    >
                        <FiArrowUp className="w-5 h-5" aria-hidden="true" />
                        {t("Footer.backToTop")}
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
