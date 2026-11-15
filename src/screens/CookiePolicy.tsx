// ---------------------------------------------------------------------------
// CookiePolicy — Dedicated "Política de Cookies" screen (/cookies)
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    FiActivity,
    FiArrowLeft,
    FiArrowUpRight,
    FiCheck,
    FiClock,
    FiInfo,
    FiMail,
    FiShield,
    FiSliders,
} from "react-icons/fi";
import { useScrollToSection } from "../hooks/useScrollToSection";
import {
    COOKIE_CONSENT_EVENT,
    getCookieConsent,
    setCookieConsent,
} from "../utils/cookieConsent";
import { skipNextHomeScrollRestore } from "../utils/homeScrollPosition";
import type {
    CookieConsentDecision,
    ICookiePolicyProps,
    ICookieSectionItem,
    ICookieTableRowItem,
} from "../interfaces/CookiePolicyInterface";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const CONTACT_EMAIL: string = import.meta.env.VITE_EMAIL ?? "";

const COOKIE_TABLE_ROWS: readonly ICookieTableRowItem[] = [
    {
        id: "theme",
        nameKey: "CookiePolicyScreen.table.rows.theme.name",
        providerKey: "CookiePolicyScreen.table.rows.theme.provider",
        purposeKey: "CookiePolicyScreen.table.rows.theme.purpose",
        durationKey: "CookiePolicyScreen.table.rows.theme.duration",
        typeKey: "CookiePolicyScreen.table.types.essential",
        isEssential: true,
    },
    {
        id: "lang",
        nameKey: "CookiePolicyScreen.table.rows.lang.name",
        providerKey: "CookiePolicyScreen.table.rows.lang.provider",
        purposeKey: "CookiePolicyScreen.table.rows.lang.purpose",
        durationKey: "CookiePolicyScreen.table.rows.lang.duration",
        typeKey: "CookiePolicyScreen.table.types.essential",
        isEssential: true,
    },
    {
        id: "consent",
        nameKey: "CookiePolicyScreen.table.rows.consent.name",
        providerKey: "CookiePolicyScreen.table.rows.consent.provider",
        purposeKey: "CookiePolicyScreen.table.rows.consent.purpose",
        durationKey: "CookiePolicyScreen.table.rows.consent.duration",
        typeKey: "CookiePolicyScreen.table.types.essential",
        isEssential: true,
    },
    {
        id: "ga",
        nameKey: "CookiePolicyScreen.table.rows.ga.name",
        providerKey: "CookiePolicyScreen.table.rows.ga.provider",
        purposeKey: "CookiePolicyScreen.table.rows.ga.purpose",
        durationKey: "CookiePolicyScreen.table.rows.ga.duration",
        typeKey: "CookiePolicyScreen.table.types.analytics",
        isEssential: false,
    },
    {
        id: "gaSession",
        nameKey: "CookiePolicyScreen.table.rows.gaSession.name",
        providerKey: "CookiePolicyScreen.table.rows.gaSession.provider",
        purposeKey: "CookiePolicyScreen.table.rows.gaSession.purpose",
        durationKey: "CookiePolicyScreen.table.rows.gaSession.duration",
        typeKey: "CookiePolicyScreen.table.types.analytics",
        isEssential: false,
    },
];

const COOKIE_SECTIONS: readonly ICookieSectionItem[] = [
    {
        id: "s1",
        number: "01",
        icon: FiInfo,
        titleKey: "CookiePolicyScreen.sections.s1.title",
        paragraphsKeys: [
            "CookiePolicyScreen.sections.s1.p1",
            "CookiePolicyScreen.sections.s1.p2",
        ],
    },
    {
        id: "s2",
        number: "02",
        icon: FiActivity,
        titleKey: "CookiePolicyScreen.sections.s2.title",
        paragraphsKeys: ["CookiePolicyScreen.sections.s2.p1"],
        bulletsKeys: [
            "CookiePolicyScreen.sections.s2.b1",
            "CookiePolicyScreen.sections.s2.b2",
            "CookiePolicyScreen.sections.s2.b3",
        ],
    },
    {
        id: "s3",
        number: "03",
        icon: FiSliders,
        titleKey: "CookiePolicyScreen.sections.s3.title",
        paragraphsKeys: [
            "CookiePolicyScreen.sections.s3.p1",
            "CookiePolicyScreen.sections.s3.p2",
        ],
    },
];

function CookiePolicy(_props: ICookiePolicyProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const [consent, setConsent] = useState<CookieConsentDecision | null>(() =>
        getCookieConsent(),
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        const handleConsentChange = () => {
            setConsent(getCookieConsent());
        };
        window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
        return () =>
            window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    }, []);

    const handleGoToContact = () => {
        skipNextHomeScrollRestore();
        void navigate({ to: "/" }).then(() => {
            window.setTimeout(() => {
                scrollToSection("contacto");
            }, 120);
        });
    };

    const statusTextKey =
        consent === "all"
            ? "CookiePolicyScreen.preferencesCard.statusAll"
            : consent === "essential"
              ? "CookiePolicyScreen.preferencesCard.statusEssential"
              : "CookiePolicyScreen.preferencesCard.statusUnset";

    return (
        <div className="w-full bg-bg text-text overflow-x-clip">
            {/* ================================================================
                1. HERO, LEGAL NAVIGATION & LIVE PREFERENCES PANEL
                ================================================================ */}
            <section className="relative w-full pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 overflow-clip isolate">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
                />

                <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Top bar: Back to Home + Legal Document Switcher */}
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                        <Link
                            to="/"
                            resetScroll={false}
                            className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-500/30 bg-neutral-500/[0.04] px-4 py-2 font-body text-xs font-medium text-text-muted transition-all duration-300 hover:border-primary/60 hover:text-text sm:text-sm"
                        >
                            <FiArrowLeft
                                className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-x-1"
                                aria-hidden="true"
                            />
                            <span>{t("LegalCommon.backToHome")}</span>
                        </Link>

                        <nav
                            aria-label={t("LegalCommon.navAriaLabel")}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <Link
                                to="/terms"
                                className="rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-3.5 py-1.5 font-body text-xs font-medium text-text-muted transition-colors duration-200 hover:border-neutral-500/45 hover:text-text"
                            >
                                {t("LegalCommon.tabs.terms")}
                            </Link>
                            <Link
                                to="/privacy"
                                className="rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-3.5 py-1.5 font-body text-xs font-medium text-text-muted transition-colors duration-200 hover:border-neutral-500/45 hover:text-text"
                            >
                                {t("LegalCommon.tabs.privacy")}
                            </Link>
                            <Link
                                to="/cookies"
                                className="rounded-full border border-orange-500/50 bg-orange-500/15 px-3.5 py-1.5 font-body text-xs font-semibold text-primary transition-colors duration-200"
                            >
                                {t("LegalCommon.tabs.cookies")}
                            </Link>
                        </nav>
                    </div>

                    {/* Editorial Heading */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-widest text-primary">
                                {t("CookiePolicyScreen.hero.eyebrow")}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-3.5 py-1.5 font-body text-xs text-text-muted">
                                <FiClock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                {t("LegalCommon.lastUpdated")}
                            </span>
                        </div>

                        <h1 className="mt-5 font-title text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-text">
                                {t("CookiePolicyScreen.hero.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("CookiePolicyScreen.hero.titleLine2")}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-text-muted sm:text-lg">
                            {t("CookiePolicyScreen.hero.lead")}
                        </p>
                    </motion.div>

                    {/* Live Cookie Preferences Control Card */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                        className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/[0.04] p-6 sm:p-8"
                    >
                        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 font-title text-xs font-bold uppercase tracking-widest text-primary">
                                    <FiShield className="h-4 w-4" aria-hidden="true" />
                                    {t("CookiePolicyScreen.preferencesCard.badge")}
                                </span>
                                <h2 className="mt-2 font-title text-lg font-bold text-text sm:text-xl">
                                    {t("CookiePolicyScreen.preferencesCard.title")}
                                </h2>
                                <p className="mt-1.5 font-body text-sm text-text-muted">
                                    {t(statusTextKey)}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setCookieConsent("all")}
                                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-body text-xs font-medium transition-all duration-200 sm:text-sm ${
                                        consent === "all"
                                            ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(243,102,29,0.3)]"
                                            : "border-neutral-500/30 bg-neutral-500/[0.05] text-text hover:border-primary/60"
                                    }`}
                                >
                                    {consent === "all" && (
                                        <FiCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    )}
                                    <span>
                                        {t("CookiePolicyScreen.preferencesCard.allowAllBtn")}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setCookieConsent("essential")}
                                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-body text-xs font-medium transition-all duration-200 sm:text-sm ${
                                        consent === "essential"
                                            ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(243,102,29,0.3)]"
                                            : "border-neutral-500/30 bg-neutral-500/[0.05] text-text hover:border-primary/60"
                                    }`}
                                >
                                    {consent === "essential" && (
                                        <FiCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    )}
                                    <span>
                                        {t("CookiePolicyScreen.preferencesCard.essentialOnlyBtn")}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================================================================
                2. TECHNICAL COOKIE & STORAGE INVENTORY TABLE
                ================================================================ */}
            <section className="w-full pb-16 sm:pb-20">
                <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="font-title text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                            <span className="block text-text">
                                {t("CookiePolicyScreen.table.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("CookiePolicyScreen.table.titleLine2")}
                            </span>
                        </h2>
                        <p className="mt-3 font-body text-sm text-text-muted sm:text-base">
                            {t("CookiePolicyScreen.table.subtitle")}
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-neutral-500/20 bg-neutral-500/[0.02]">
                        <table className="w-full min-w-[680px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-neutral-500/20 bg-neutral-500/[0.05]">
                                    <th className="px-5 py-4 font-title text-xs font-bold uppercase tracking-wider text-text">
                                        {t("CookiePolicyScreen.table.headers.name")}
                                    </th>
                                    <th className="px-5 py-4 font-title text-xs font-bold uppercase tracking-wider text-text">
                                        {t("CookiePolicyScreen.table.headers.provider")}
                                    </th>
                                    <th className="px-5 py-4 font-title text-xs font-bold uppercase tracking-wider text-text">
                                        {t("CookiePolicyScreen.table.headers.purpose")}
                                    </th>
                                    <th className="px-5 py-4 font-title text-xs font-bold uppercase tracking-wider text-text">
                                        {t("CookiePolicyScreen.table.headers.duration")}
                                    </th>
                                    <th className="px-5 py-4 font-title text-xs font-bold uppercase tracking-wider text-text">
                                        {t("CookiePolicyScreen.table.headers.type")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-500/15">
                                {COOKIE_TABLE_ROWS.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="transition-colors duration-200 hover:bg-neutral-500/[0.04]"
                                    >
                                        <td className="px-5 py-4 font-title text-xs font-semibold text-primary sm:text-sm whitespace-nowrap">
                                            {t(row.nameKey)}
                                        </td>
                                        <td className="px-5 py-4 font-body text-xs text-text sm:text-sm whitespace-nowrap">
                                            {t(row.providerKey)}
                                        </td>
                                        <td className="px-5 py-4 font-body text-xs leading-relaxed text-text-muted sm:text-sm max-w-md">
                                            {t(row.purposeKey)}
                                        </td>
                                        <td className="px-5 py-4 font-body text-xs text-text-muted sm:text-sm whitespace-nowrap">
                                            {t(row.durationKey)}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex rounded-full border px-2.5 py-1 font-body text-xs font-medium ${
                                                    row.isEssential
                                                        ? "border-neutral-500/30 bg-neutral-500/10 text-text"
                                                        : "border-orange-500/35 bg-orange-500/10 text-primary"
                                                }`}
                                            >
                                                {t(row.typeKey)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ================================================================
                3. NUMBERED EXPLANATORY SECTIONS
                ================================================================ */}
            <section className="w-full pb-16 sm:pb-20">
                <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:gap-8">
                        {COOKIE_SECTIONS.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <motion.article
                                    key={section.id}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                        ease: EASE_OUT,
                                    }}
                                    className="rounded-2xl border border-neutral-500/20 bg-neutral-500/[0.03] p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:border-orange-500/35"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-primary">
                                            <Icon className="h-6 w-6" aria-hidden="true" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-title text-xs font-bold uppercase tracking-widest text-primary">
                                                    {section.number}
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className="h-px w-6 bg-orange-500/40"
                                                />
                                            </div>

                                            <h2 className="mt-1.5 font-title text-xl font-bold leading-snug text-text sm:text-2xl">
                                                {t(section.titleKey)}
                                            </h2>

                                            <div className="mt-4 space-y-3.5 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                                                {section.paragraphsKeys.map((pKey) => (
                                                    <p key={pKey}>{t(pKey)}</p>
                                                ))}
                                            </div>

                                            {section.bulletsKeys &&
                                                section.bulletsKeys.length > 0 && (
                                                    <ul className="mt-4 space-y-2.5">
                                                        {section.bulletsKeys.map((bKey) => (
                                                            <li
                                                                key={bKey}
                                                                className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-muted sm:text-base"
                                                            >
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                                                                />
                                                                <span>{t(bKey)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================================================================
                4. LEGAL CONTACT & BACK TO HOME BANNER
                ================================================================ */}
            <section className="w-full pb-20 sm:pb-24">
                <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-orange-500/30 bg-orange-500/[0.04] p-8 sm:p-10 lg:p-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="max-w-2xl">
                                <h2 className="font-title text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                                    <span className="block text-text">
                                        {t("LegalCommon.contactBox.titleLine1")}
                                    </span>
                                    <span className="mt-1 block font-playfair-display italic text-primary">
                                        {t("LegalCommon.contactBox.titleLine2")}
                                    </span>
                                </h2>
                                <p className="mt-3 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                                    {t("LegalCommon.contactBox.description")}
                                </p>
                                {CONTACT_EMAIL && (
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline sm:text-base"
                                    >
                                        <FiMail className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        <span>{CONTACT_EMAIL}</span>
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3.5">
                                <Link
                                    to="/"
                                    resetScroll={false}
                                    className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-5 py-3 font-body text-sm font-medium text-text-muted transition-all duration-300 hover:border-neutral-500/50 hover:text-text"
                                >
                                    <FiArrowLeft
                                        className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-x-1"
                                        aria-hidden="true"
                                    />
                                    <span>{t("LegalCommon.backToHome")}</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleGoToContact}
                                    className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-neutral-500/35 bg-bg px-5 py-3 font-body text-sm font-medium text-text transition-[border-color,box-shadow,color] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
                                >
                                    <span>{t("LegalCommon.contactBox.contactButton")}</span>
                                    <FiArrowUpRight
                                        className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CookiePolicy;
