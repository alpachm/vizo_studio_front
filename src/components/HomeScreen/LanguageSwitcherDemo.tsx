// ---------------------------------------------------------------------------
// LanguageSwitcherDemo — Multilingual showcase section for the Home screen.
// Cycles the card headline through multiple languages when centered in the
// viewport before settling on Spanish, and lets the user toggle ES/EN live.
// ---------------------------------------------------------------------------
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { ILanguageSwitcherDemoProps } from "../../interfaces/HomeScreenInterface";

/** Ordered keys for the multi-language card headline sequence (settles on "es"). */
const ROTATING_LANGUAGE_KEYS = [
    "en",
    "zh",
    "ar",
    "fr",
    "pt",
    "de",
    "it",
    "es",
] as const;

/**
 * Per-language typography classes (mirrors the expressive Google Fonts in
 * `tailwind.config.js`) to accentuate each script/language swap before landing
 * on `font-title` (`JetBrains Mono`) for the final Spanish headline.
 */
const ROTATING_LANGUAGE_FONTS = [
    "font-space-grotesk font-bold tracking-tight", // en — geometric display sans
    "font-plus-jakarta-sans font-bold tracking-wider", // zh — clean modern CJK/sans rhythm
    "font-playfair-display font-bold tracking-normal", // ar — high-contrast calligraphic feel
    "font-playfair-display italic font-semibold tracking-wide", // fr — editorial serif italic
    "font-syne font-bold tracking-tight", // pt — expressive display sans
    "font-mono font-bold tracking-tight", // de — technical monospace
    "font-instrument-serif italic font-normal tracking-wide text-[1.12em]", // it — classic editorial serif
    "font-title font-bold tracking-tight", // es (final) — brand heading mono
] as const;

/** Final index in `ROTATING_LANGUAGE_KEYS` ("es" — Spanish). */
const FINAL_ROTATING_INDEX = ROTATING_LANGUAGE_KEYS.length - 1;

/** Faster interval (ms) between each language step while the headline rotates. */
const ROTATION_STEP_MS = 360;

/** Editorial exponential ease-out curve for the headline transition. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function LanguageSwitcherDemo({ className = "" }: ILanguageSwitcherDemoProps) {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    const sectionRef = useRef<HTMLElement | null>(null);
    const [activePhraseIndex, setActivePhraseIndex] =
        useState<number>(FINAL_ROTATING_INDEX);

    const rotatingPhrases = useMemo(
        () =>
            ROTATING_LANGUAGE_KEYS.map((key) =>
                t(`HomeScreen.LanguageSwitcherDemo.card.rotatingTitles.${key}`),
            ),
        [t],
    );

    // Trigger the multi-language cycling sequence whenever the section centers in the viewport.
    useEffect(() => {
        const sectionNode = sectionRef.current;
        if (!sectionNode || shouldReduceMotion) return;

        let timers: number[] = [];

        const clearRotationTimers = () => {
            timers.forEach((id) => window.clearTimeout(id));
            timers = [];
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                clearRotationTimers();

                if (entry.isIntersecting) {
                    setActivePhraseIndex(0);

                    for (
                        let step = 1;
                        step <= FINAL_ROTATING_INDEX;
                        step += 1
                    ) {
                        const timerId = window.setTimeout(() => {
                            setActivePhraseIndex(step);
                        }, step * ROTATION_STEP_MS);
                        timers.push(timerId);
                    }
                }
            },
            {
                root: null,
                rootMargin: "-20% 0px -20% 0px",
                threshold: 0,
            },
        );

        observer.observe(sectionNode);

        return () => {
            observer.disconnect();
            clearRotationTimers();
        };
    }, [shouldReduceMotion]);

    const displayedPhraseIndex = shouldReduceMotion
        ? FINAL_ROTATING_INDEX
        : activePhraseIndex;
    const currentPhrase = rotatingPhrases[displayedPhraseIndex];
    const currentFontClass = ROTATING_LANGUAGE_FONTS[displayedPhraseIndex];
    const currentLangKey = ROTATING_LANGUAGE_KEYS[displayedPhraseIndex];

    const handleLanguageToggle = () => {
        changeLanguage(language === "es" ? "en" : "es");
    };

    return (
        <section
            ref={sectionRef}
            id="language-switcher-demo"
            className={`w-full bg-bg py-24 sm:py-28 lg:py-32 transition-colors duration-500 ease-out ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8">
                    {/* -------------------------------------------------- */}
                    {/* 1 (Mobile) / Right Top (Desktop) — Headline & copy */}
                    {/* -------------------------------------------------- */}
                    <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text transition-colors duration-500">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.titleLine1",
                                )}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.titleLine2",
                                )}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                            {t("HomeScreen.LanguageSwitcherDemo.subtitle")}
                        </p>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 2 (Mobile) / Left Column (Desktop) — Language Card */}
                    {/* -------------------------------------------------- */}
                    <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
                        <div className="rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-7 shadow-sm transition-colors duration-500 sm:p-10">
                            {/* Top Row — Language Icon + Interactive Switch Pill */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <HiOutlineLanguage
                                    className="h-8 w-8 text-primary"
                                    aria-hidden="true"
                                />

                                <button
                                    type="button"
                                    onClick={handleLanguageToggle}
                                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/5 px-4 py-2 text-xs font-medium text-primary transition-all duration-300 hover:border-primary hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm"
                                >
                                    <HiOutlineLanguage
                                        className="h-4 w-4 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        {language === "es"
                                            ? t(
                                                  "HomeScreen.LanguageSwitcherDemo.card.switchToEn",
                                              )
                                            : t(
                                                  "HomeScreen.LanguageSwitcherDemo.card.switchToEs",
                                              )}
                                    </span>
                                    <FiArrowUpRight
                                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Middle — Multi-language rotating headline (settles on Spanish) */}
                            <div className="mt-10 grid min-h-[4.5rem] items-center sm:min-h-[5rem]">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.h3
                                        key={`${displayedPhraseIndex}-${currentPhrase}`}
                                        dir={
                                            currentLangKey === "ar"
                                                ? "rtl"
                                                : "ltr"
                                        }
                                        initial={
                                            shouldReduceMotion
                                                ? false
                                                : { opacity: 0, y: 8 }
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={
                                            shouldReduceMotion
                                                ? undefined
                                                : { opacity: 0, y: -8 }
                                        }
                                        transition={{
                                            duration: shouldReduceMotion
                                                ? 0
                                                : 0.18,
                                            ease: EASE_OUT,
                                        }}
                                        className={`${currentFontClass} text-xl leading-snug text-text transition-colors duration-500 sm:text-2xl`}
                                    >
                                        {currentPhrase}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>

                            {/* Divider */}
                            <div className="my-7 border-t border-neutral-500/20 transition-colors duration-500" />

                            {/* Bottom Footnote */}
                            <p className="text-xs leading-relaxed text-text-muted transition-colors duration-500 sm:text-sm">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.card.footnote",
                                )}
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 3 (Mobile, Last) / Right Bottom (Desktop) — CTA    */}
                    {/* -------------------------------------------------- */}
                    <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start">
                        <button
                            type="button"
                            onClick={() => scrollToSection("contacto")}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-500/35 px-5 py-2.5 font-body text-sm font-medium text-text transition-[border-color,box-shadow,color] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]"
                        >
                            <span>
                                {t("HomeScreen.LanguageSwitcherDemo.cta")}
                            </span>
                            <FiArrowUpRight
                                className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LanguageSwitcherDemo;
