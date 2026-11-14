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
const ROTATING_LANGUAGE_KEYS = ["en", "fr", "pt", "de", "it", "es"] as const;

/** Final index in `ROTATING_LANGUAGE_KEYS` ("es" — Spanish). */
const FINAL_ROTATING_INDEX = ROTATING_LANGUAGE_KEYS.length - 1;

/** Interval (ms) between each language step while the headline rotates. */
const ROTATION_STEP_MS = 650;

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
                rootMargin: "-30% 0px -30% 0px",
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
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* -------------------------------------------------- */}
                    {/* Left Column — Interactive Language Switcher Card    */}
                    {/* -------------------------------------------------- */}
                    <div className="order-2 lg:order-1 lg:col-span-6">
                        <div className="rounded-3xl border border-text/10 bg-text/[0.03] p-7 shadow-sm transition-colors duration-500 sm:p-10">
                            {/* Top Row — Language Icon + Interactive Switch Pill */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <HiOutlineLanguage
                                    className="h-8 w-8 text-primary"
                                    aria-hidden="true"
                                />

                                <button
                                    type="button"
                                    onClick={handleLanguageToggle}
                                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:text-sm"
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
                            <div className="mt-10 grid min-h-[4.25rem] items-center sm:min-h-[4.75rem]">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.h3
                                        key={`${displayedPhraseIndex}-${currentPhrase}`}
                                        initial={
                                            shouldReduceMotion
                                                ? false
                                                : { opacity: 0, y: 10 }
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={
                                            shouldReduceMotion
                                                ? undefined
                                                : { opacity: 0, y: -10 }
                                        }
                                        transition={{
                                            duration: shouldReduceMotion
                                                ? 0
                                                : 0.28,
                                            ease: EASE_OUT,
                                        }}
                                        className="font-title text-xl font-bold leading-snug text-text transition-colors duration-500 sm:text-2xl"
                                    >
                                        {currentPhrase}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>

                            {/* Divider */}
                            <div className="my-7 border-t border-text/10 transition-colors duration-500" />

                            {/* Bottom Footnote */}
                            <p className="text-xs leading-relaxed text-text-muted transition-colors duration-500 sm:text-sm">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.card.footnote",
                                )}
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Right Column — Stacked headline, summary & CTA     */}
                    {/* -------------------------------------------------- */}
                    <div className="order-1 lg:order-2 lg:col-span-6">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text transition-colors duration-500">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.titleLine1",
                                )}
                            </span>
                            <span className="mt-1 block text-primary">
                                {t(
                                    "HomeScreen.LanguageSwitcherDemo.titleLine2",
                                )}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                            {t("HomeScreen.LanguageSwitcherDemo.subtitle")}
                        </p>

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={() => scrollToSection("contacto")}
                                className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-secondary focus-visible:outline-none sm:text-base"
                            >
                                <span>
                                    {t("HomeScreen.LanguageSwitcherDemo.cta")}
                                </span>
                                <FiArrowUpRight
                                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LanguageSwitcherDemo;
