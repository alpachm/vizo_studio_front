// ---------------------------------------------------------------------------
// CookieConsentBanner — Compact & subtle global cookie consent bar
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useHeroVisibility } from "../../context/HeroVisibilityContext";
import {
    COOKIE_CONSENT_EVENT,
    getCookieConsent,
    setCookieConsent,
} from "../../utils/cookieConsent";
import type {
    CookieConsentDecision,
    ICookieConsentBannerProps,
} from "../../interfaces/CookiePolicyInterface";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function CookieConsentBanner(_props: ICookieConsentBannerProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const { isHeroInView, isValuePropositionInView } = useHeroVisibility();
    const [consent, setConsent] = useState<CookieConsentDecision | null>(() =>
        getCookieConsent(),
    );

    useEffect(() => {
        const handleConsentChange = () => {
            setConsent(getCookieConsent());
        };

        window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
        return () =>
            window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    }, []);

    const isHiddenByIntroSections = isHeroInView || isValuePropositionInView;
    const isVisible = consent === null && !isHiddenByIntroSections;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.aside
                    role="region"
                    aria-label={t("CookieConsentBanner.ariaLabel")}
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                        shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 12 }
                    }
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm"
                >
                    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-500/25 bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] px-4 py-3.5 shadow-lg backdrop-blur-md">
                        <p className="font-body text-xs leading-relaxed text-text-muted">
                            {t("CookieConsentBanner.description")}{" "}
                            <Link
                                to="/cookies"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                {t("CookieConsentBanner.cookiePolicyLink")}
                            </Link>
                            .
                        </p>

                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setCookieConsent("essential")}
                                className="cursor-pointer rounded-full border border-neutral-500/25 bg-neutral-500/[0.05] px-3 py-1.5 font-body text-[11px] font-medium text-text-muted transition-colors duration-200 hover:border-neutral-500/45 hover:text-text"
                            >
                                {t("CookieConsentBanner.essentialOnly")}
                            </button>

                            <button
                                type="button"
                                onClick={() => setCookieConsent("all")}
                                className="cursor-pointer rounded-full bg-primary px-3.5 py-1.5 font-body text-[11px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                            >
                                {t("CookieConsentBanner.acceptAll")}
                            </button>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

export default CookieConsentBanner;
