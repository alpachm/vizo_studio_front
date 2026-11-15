// ---------------------------------------------------------------------------
// SeoMetricsDemo — SEO & search visibility showcase for the Home screen.
// Features an animated search results mockup on the right where the featured
// business result starts at the bottom and climbs to the #1 spot when the
// section enters view.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    FiArrowUpRight,
    FiGlobe,
    FiSearch,
    FiTrendingUp,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { ISeoMetricsDemoProps } from "../../interfaces/HomeScreenInterface";

/** Ordered result item identifiers for each step of the ranking climb animation. */
const RANKING_STEPS: readonly (readonly string[])[] = [
    ["competitor-1", "competitor-2", "featured"], // Step 0: starts at the bottom (#3)
    ["competitor-1", "featured", "competitor-2"], // Step 1: climbs to #2
    ["featured", "competitor-1", "competitor-2"], // Step 2: reaches #1 (top result)
];

/** Delay (ms) before advancing from #3 -> #2 and #2 -> #1. */
const CLIMB_STEP_DELAY_MS = 650;

/** Hold duration (ms) at #1 before restarting the continuous loop. */
const TOP_RANK_HOLD_MS = 2000;

/** Editorial exponential ease-out curve for the layout reorder. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Pill tags displayed in the left editorial column. */
const SEO_TAG_KEYS = ["technical", "content", "performance"] as const;

function SeoMetricsDemo({ className = "" }: ISeoMetricsDemoProps) {
    const { t } = useTranslation();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    const sectionRef = useRef<HTMLElement | null>(null);
    const [stepIndex, setStepIndex] = useState<number>(0);

    // Animate the featured business result from #3 (bottom) -> #2 -> #1 (top)
    // whenever the section enters the viewport.
    useEffect(() => {
        const sectionNode = sectionRef.current;
        if (!sectionNode || shouldReduceMotion) return;

        let timers: number[] = [];

        const clearClimbTimers = () => {
            timers.forEach((id) => window.clearTimeout(id));
            timers = [];
        };

        const runClimbCycle = () => {
            clearClimbTimers();
            setStepIndex(0);

            timers.push(
                window.setTimeout(() => {
                    setStepIndex(1);
                }, CLIMB_STEP_DELAY_MS),
            );

            timers.push(
                window.setTimeout(() => {
                    setStepIndex(2);
                }, CLIMB_STEP_DELAY_MS * 2),
            );

            timers.push(
                window.setTimeout(() => {
                    runClimbCycle();
                }, CLIMB_STEP_DELAY_MS * 2 + TOP_RANK_HOLD_MS),
            );
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    runClimbCycle();
                } else {
                    clearClimbTimers();
                    setStepIndex(0);
                }
            },
            {
                root: null,
                rootMargin: "-10% 0px -10% 0px",
                threshold: 0,
            },
        );

        observer.observe(sectionNode);

        return () => {
            observer.disconnect();
            clearClimbTimers();
        };
    }, [shouldReduceMotion]);

    const effectiveStepIndex = shouldReduceMotion ? 2 : stepIndex;
    const currentOrder = RANKING_STEPS[effectiveStepIndex];
    const isTopRanked = effectiveStepIndex === 2;

    const renderSearchResultItem = (itemId: string) => {
        if (itemId === "featured") {
            return (
                <motion.div
                    key="featured"
                    layout
                    transition={{
                        layout: {
                            duration: shouldReduceMotion ? 0 : 0.55,
                            ease: EASE_OUT,
                        },
                    }}
                    className={`relative z-10 flex items-center gap-3.5 rounded-2xl border p-4 transition-colors duration-500 sm:gap-4 sm:p-5 ${
                        isTopRanked
                            ? "border-orange-500/50 bg-orange-500/[0.08] shadow-[0_0_25px_rgba(243,102,29,0.12)]"
                            : "border-orange-500/25 bg-orange-500/[0.04]"
                    }`}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-primary">
                        <HiOutlineSparkles
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-medium text-text-muted sm:text-xs">
                            {t("HomeScreen.SeoMetricsDemo.card.featuredDomain")}
                        </p>
                        <p className="mt-0.5 truncate font-title text-sm font-bold text-primary sm:text-base">
                            {t("HomeScreen.SeoMetricsDemo.card.featuredTitle")}
                        </p>
                        <p className="mt-1 truncate text-xs text-text/80 sm:text-sm">
                            {t(
                                "HomeScreen.SeoMetricsDemo.card.featuredSnippet",
                            )}
                        </p>
                    </div>
                </motion.div>
            );
        }

        const isSecondSkeleton = itemId === "competitor-2";

        return (
            <motion.div
                key={itemId}
                layout
                transition={{
                    layout: {
                        duration: shouldReduceMotion ? 0 : 0.55,
                        ease: EASE_OUT,
                    },
                }}
                aria-hidden="true"
                className="flex items-center gap-3.5 rounded-2xl border border-neutral-500/15 bg-neutral-500/[0.03] p-4 transition-colors duration-500 sm:gap-4 sm:p-5"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-500/10 text-text-muted">
                    <FiGlobe className="h-4 w-4" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    <span className="h-2 w-24 rounded-full bg-neutral-500/25" />
                    <span
                        className={`h-2.5 rounded-full bg-neutral-500/35 ${
                            isSecondSkeleton ? "w-3/5" : "w-2/3"
                        }`}
                    />
                    <span
                        className={`h-2 rounded-full bg-neutral-500/20 ${
                            isSecondSkeleton ? "w-3/4" : "w-5/6"
                        }`}
                    />
                </div>
            </motion.div>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="seo-metrics-demo"
            className={`w-full bg-bg py-24 sm:py-28 lg:py-32 transition-colors duration-500 ease-out ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8">
                    {/* -------------------------------------------------- */}
                    {/* 1 (Mobile) / Right Top (Desktop) — Copy & Tags     */}
                    {/* -------------------------------------------------- */}
                    <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text transition-colors duration-500">
                                {t("HomeScreen.SeoMetricsDemo.titleLine1")}
                            </span>
                            <span className="mt-1 block font-playfair-display italic text-primary">
                                {t("HomeScreen.SeoMetricsDemo.titleLine2")}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                            {t("HomeScreen.SeoMetricsDemo.subtitle")}
                        </p>

                        {/* SEO Feature Pills */}
                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {SEO_TAG_KEYS.map((tagKey) => (
                                <span
                                    key={tagKey}
                                    className="rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-4 py-1.5 text-xs font-medium text-text-muted transition-colors duration-500"
                                >
                                    {t(
                                        `HomeScreen.SeoMetricsDemo.tags.${tagKey}`,
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 2 (Mobile) / Left Column (Desktop) — Animated Card */}
                    {/* -------------------------------------------------- */}
                    <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
                        <div className="rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-6 shadow-sm transition-colors duration-500 sm:p-9">
                            {/* Top Header — Google wordmark + Search icon */}
                            <div className="flex items-center justify-between">
                                <span className="font-title text-xl font-bold tracking-tight text-text transition-colors duration-500 sm:text-2xl">
                                    {t("HomeScreen.SeoMetricsDemo.card.brand")}
                                </span>
                                <FiSearch
                                    className="h-5 w-5 text-text-muted"
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Search Bar Pill */}
                            <div className="mt-5 flex items-center gap-3 rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-4 py-3">
                                <FiSearch
                                    className="h-4 w-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <span className="truncate text-xs text-text/80 transition-colors duration-500 sm:text-sm">
                                    {t(
                                        "HomeScreen.SeoMetricsDemo.card.searchQuery",
                                    )}
                                </span>
                            </div>

                            {/* Results Subheader Row */}
                            <div className="mt-5 flex items-center justify-between text-xs">
                                <span className="text-text-muted">
                                    {t(
                                        "HomeScreen.SeoMetricsDemo.card.resultsLabel",
                                    )}
                                </span>
                                <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                                    <FiTrendingUp
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                    {t(
                                        "HomeScreen.SeoMetricsDemo.card.visibilityBadge",
                                    )}
                                </span>
                            </div>

                            <div className="my-4 border-t border-neutral-500/15 transition-colors duration-500" />

                            {/* Animated Search Result Stack (#3 -> #2 -> #1) */}
                            <LayoutGroup>
                                <div className="flex flex-col gap-3">
                                    {currentOrder.map(renderSearchResultItem)}
                                </div>
                            </LayoutGroup>

                            <div className="my-5 border-t border-neutral-500/15 transition-colors duration-500" />

                            {/* Footnote */}
                            <p className="text-xs leading-relaxed text-text-muted transition-colors duration-500">
                                {t("HomeScreen.SeoMetricsDemo.card.footnote")}
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
                                {t("HomeScreen.SeoMetricsDemo.cta")}
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

export default SeoMetricsDemo;
