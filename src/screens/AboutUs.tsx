// ---------------------------------------------------------------------------
// AboutUs — Dedicated "Sobre nosotros" screen (/about)
// Expands the original AboutUs & WhyUs components into a full editorial page
// with 3D pop-out team visual, regional presence, key metrics, mission/vision,
// 6 core value pillars, and a direct CTA to the contact section.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import {
    FiArrowLeft,
    FiArrowUpRight,
    FiCompass,
    FiGlobe,
    FiLayers,
    FiTarget,
    FiTrendingUp,
} from "react-icons/fi";
import {
    HiOutlineChatBubbleLeftRight,
    HiOutlineClipboardDocumentCheck,
    HiOutlineRocketLaunch,
    HiOutlineShieldCheck,
} from "react-icons/hi2";
import aboutUsImg from "../assets/HomeScreen/images/about_us.webp";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { skipNextHomeScrollRestore } from "../utils/homeScrollPosition";
import type {
    IAboutUsPhilosophyItem,
    IAboutUsScreenProps,
    IAboutUsStatItem,
    IAboutUsValueCardItem,
} from "../interfaces/AboutUsInterface";

/** Editorial exponential ease-out curve used across reveals. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Key metrics displayed below the main story section. */
const ABOUT_STATS: readonly IAboutUsStatItem[] = [
    {
        id: "experience",
        valueKey: "AboutUsScreen.stats.experience.value",
        labelKey: "AboutUsScreen.stats.experience.label",
        descriptionKey: "AboutUsScreen.stats.experience.description",
    },
    {
        id: "countries",
        valueKey: "AboutUsScreen.stats.countries.value",
        labelKey: "AboutUsScreen.stats.countries.label",
        descriptionKey: "AboutUsScreen.stats.countries.description",
    },
    {
        id: "custom",
        valueKey: "AboutUsScreen.stats.custom.value",
        labelKey: "AboutUsScreen.stats.custom.label",
        descriptionKey: "AboutUsScreen.stats.custom.description",
    },
];

/** Mission & Vision cards. */
const PHILOSOPHY_ITEMS: readonly IAboutUsPhilosophyItem[] = [
    {
        id: "mission",
        icon: FiTarget,
        badgeKey: "AboutUsScreen.philosophy.mission.badge",
        titleKey: "AboutUsScreen.philosophy.mission.title",
        descriptionKey: "AboutUsScreen.philosophy.mission.description",
    },
    {
        id: "vision",
        icon: FiCompass,
        badgeKey: "AboutUsScreen.philosophy.vision.badge",
        titleKey: "AboutUsScreen.philosophy.vision.title",
        descriptionKey: "AboutUsScreen.philosophy.vision.description",
    },
];

/** Six core pillars expanding on the original WhyUs cards. */
const VALUE_PILLARS: readonly IAboutUsValueCardItem[] = [
    {
        id: "proactive",
        icon: HiOutlineRocketLaunch,
        titleKey: "AboutUsScreen.pillars.cards.proactive.title",
        descriptionKey: "AboutUsScreen.pillars.cards.proactive.description",
    },
    {
        id: "organized",
        icon: HiOutlineClipboardDocumentCheck,
        titleKey: "AboutUsScreen.pillars.cards.organized.title",
        descriptionKey: "AboutUsScreen.pillars.cards.organized.description",
    },
    {
        id: "quality",
        icon: HiOutlineShieldCheck,
        titleKey: "AboutUsScreen.pillars.cards.quality.title",
        descriptionKey: "AboutUsScreen.pillars.cards.quality.description",
    },
    {
        id: "communication",
        icon: HiOutlineChatBubbleLeftRight,
        titleKey: "AboutUsScreen.pillars.cards.communication.title",
        descriptionKey: "AboutUsScreen.pillars.cards.communication.description",
    },
    {
        id: "scalability",
        icon: FiLayers,
        titleKey: "AboutUsScreen.pillars.cards.scalability.title",
        descriptionKey: "AboutUsScreen.pillars.cards.scalability.description",
    },
    {
        id: "partnership",
        icon: FiTrendingUp,
        titleKey: "AboutUsScreen.pillars.cards.partnership.title",
        descriptionKey: "AboutUsScreen.pillars.cards.partnership.description",
    },
];

function AboutUs(_props: IAboutUsScreenProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    // Ensure the page starts at the top when navigating to /about
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const handleGoToContact = () => {
        skipNextHomeScrollRestore();
        void navigate({ to: "/" }).then(() => {
            window.setTimeout(() => {
                scrollToSection("contacto");
            }, 120);
        });
    };

    return (
        <div className="w-full bg-bg text-text overflow-x-clip">
            {/* ================================================================
                1. HERO & STORY SECTION — Editorial Header + 3D Team Pop-Out
                ================================================================ */}
            <section className="relative w-full pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-clip isolate">
                {/* Ambient top-right glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-orange-500/[0.04] blur-3xl"
                />

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Quick-access Back to Home button */}
                    <div className="mb-8">
                        <Link
                            to="/"
                            resetScroll={false}
                            className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-500/30 bg-neutral-500/[0.04] px-4 py-2 font-body text-xs font-medium text-text-muted transition-all duration-300 hover:border-primary/60 hover:text-text sm:text-sm"
                        >
                            <FiArrowLeft
                                className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-x-1"
                                aria-hidden="true"
                            />
                            <span>{t("AboutUsScreen.backToHome")}</span>
                        </Link>
                    </div>

                    {/* Editorial Page Header */}
                    <motion.div
                        initial={
                            shouldReduceMotion ? false : { opacity: 0, y: 24 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: EASE_OUT }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-widest text-primary">
                            {t("AboutUsScreen.hero.eyebrow")}
                        </span>

                        <h1 className="mt-5 font-title text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-text">
                                {t("AboutUsScreen.hero.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("AboutUsScreen.hero.titleLine2")}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-text-muted sm:text-lg lg:text-xl">
                            {t("AboutUsScreen.hero.lead")}
                        </p>
                    </motion.div>

                    {/* Two-Column Story + 3D Pop-Out Image */}
                    <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
                        {/* Left Column — 3D Pop-Out Team Illustration */}
                        <motion.div
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 40 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                            className="lg:col-span-6 flex flex-col items-center justify-center"
                        >
                            <div className="relative my-4 flex aspect-square w-full max-w-md items-center justify-center overflow-visible">
                                {/* Glowing circular backdrop stage */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/30 bg-white shadow-[0_0_60px_rgba(243,102,29,0.16)]"
                                />
                                {/* 3D Pop-Out Image */}
                                <img
                                    src={aboutUsImg}
                                    alt={t("AboutUsScreen.story.imageAlt")}
                                    className="pointer-events-none relative z-10 h-[110%] w-[110%] max-w-none object-contain drop-shadow-2xl"
                                    loading="eager"
                                />
                            </div>

                            {/* Regional presence pill */}
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-500/25 bg-neutral-500/[0.05] px-4 py-2 text-xs font-medium text-text-muted sm:text-sm">
                                <FiGlobe
                                    className="h-4 w-4 text-primary shrink-0"
                                    aria-hidden="true"
                                />
                                <span>
                                    {t("AboutUsScreen.story.regionBadge")}
                                </span>
                            </div>
                        </motion.div>

                        {/* Right Column — Expanded Story Copy */}
                        <motion.div
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 28 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.1,
                                ease: EASE_OUT,
                            }}
                            className="lg:col-span-6 flex flex-col items-start gap-5"
                        >
                            <h2 className="font-title text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
                                {t("AboutUsScreen.story.title")}
                            </h2>

                            <p className="font-body text-base leading-relaxed text-text-muted sm:text-lg">
                                <Trans
                                    i18nKey="AboutUsScreen.story.paragraph1"
                                    components={{
                                        country: (
                                            <span className="font-semibold text-primary" />
                                        ),
                                    }}
                                />
                            </p>

                            <p className="font-body text-base leading-relaxed text-text-muted sm:text-lg">
                                {t("AboutUsScreen.story.paragraph2")}
                            </p>

                            <p className="font-body text-base leading-relaxed text-text-muted sm:text-lg">
                                {t("AboutUsScreen.story.paragraph3")}
                            </p>
                        </motion.div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3 lg:gap-8">
                        {ABOUT_STATS.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, y: 24 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.1,
                                    ease: EASE_OUT,
                                }}
                                className="flex flex-col rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-7 sm:p-8 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)]"
                            >
                                <span className="font-title text-3xl font-bold text-primary sm:text-4xl">
                                    {t(stat.valueKey)}
                                </span>
                                <h3 className="mt-3 font-title text-lg font-bold text-text sm:text-xl">
                                    {t(stat.labelKey)}
                                </h3>
                                <p className="mt-2 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                                    {t(stat.descriptionKey)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================
                2. PHILOSOPHY SECTION — Mission & Vision
                ================================================================ */}
            <section className="w-full border-t border-neutral-500/15 py-20 sm:py-24 lg:py-28">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text">
                                {t("AboutUsScreen.philosophy.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("AboutUsScreen.philosophy.titleLine2")}
                            </span>
                        </h2>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {PHILOSOPHY_ITEMS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={item.id}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 24 }
                                    }
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.12,
                                        ease: EASE_OUT,
                                    }}
                                    className="flex flex-col rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-7 sm:p-10 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_65%,transparent)]"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="rounded-full border border-orange-500/35 bg-orange-500/10 px-4 py-1.5 font-body text-xs font-medium text-primary">
                                            {t(item.badgeKey)}
                                        </span>
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] text-primary">
                                            <Icon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="mt-6 font-title text-xl font-bold leading-snug text-text sm:text-2xl">
                                        {t(item.titleKey)}
                                    </h3>

                                    <p className="mt-3 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                                        {t(item.descriptionKey)}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================================================================
                3. CORE PILLARS / WHY CHOOSE US SECTION
                ================================================================ */}
            <section className="w-full border-t border-neutral-500/15 py-20 sm:py-24 lg:py-28">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text">
                                {t("AboutUsScreen.pillars.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("AboutUsScreen.pillars.titleLine2")}
                            </span>
                        </h2>
                        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-text-muted sm:text-lg">
                            {t("AboutUsScreen.pillars.subtitle")}
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
                        {VALUE_PILLARS.map((card, index) => {
                            const IconComponent = card.icon;

                            return (
                                <motion.article
                                    key={card.id}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 28 }
                                    }
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.55,
                                        delay: index * 0.08,
                                        ease: EASE_OUT,
                                    }}
                                    className="flex flex-col rounded-2xl border border-neutral-500/20 bg-neutral-500/[0.04] p-6 sm:p-8 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-primary">
                                        <IconComponent
                                            className="text-2xl"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="mt-6 font-title text-xl font-bold text-text sm:text-2xl">
                                        {t(card.titleKey)}
                                    </h3>

                                    <p className="mt-3 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                                        {t(card.descriptionKey)}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================================================================
                4. BOTTOM CTA BANNER
                ================================================================ */}
            <section className="w-full py-16 sm:py-20 lg:py-24">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-orange-500/[0.04] p-8 sm:p-12 lg:p-16">
                        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="max-w-2xl">
                                <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                    <span className="block text-text">
                                        {t("AboutUsScreen.cta.titleLine1")}
                                    </span>
                                    <span className="mt-1 block font-playfair-display italic text-primary">
                                        {t("AboutUsScreen.cta.titleLine2")}
                                    </span>
                                </h2>
                                <p className="mt-4 font-body text-base leading-relaxed text-text-muted sm:text-lg">
                                    {t("AboutUsScreen.cta.subtitle")}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    to="/"
                                    resetScroll={false}
                                    className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-6 py-3.5 font-body text-sm font-medium text-text-muted transition-all duration-300 hover:border-neutral-500/50 hover:text-text sm:text-base"
                                >
                                    <FiArrowLeft
                                        className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-x-1"
                                        aria-hidden="true"
                                    />
                                    <span>{t("AboutUsScreen.backToHome")}</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleGoToContact}
                                    className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-neutral-500/35 bg-bg px-6 py-3.5 font-body text-sm font-medium text-text transition-[border-color,box-shadow,color] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] sm:text-base"
                                >
                                    <span>{t("AboutUsScreen.cta.button")}</span>
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

export default AboutUs;
