// ---------------------------------------------------------------------------
// Methodology — "Nuestra Metodología" process section for the Home screen.
// Features a scroll-driven guiding vector timeline that progressively connects
// and illuminates steps 01 -> 02 -> 03 -> 04 one by one as the user scrolls.
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    FiArrowDown,
    FiCheck,
    FiLayers,
    FiRepeat,
    FiShield,
    FiTrendingUp,
} from "react-icons/fi";
import type {
    IMethodologyProps,
    IMethodologyStep,
} from "../../interfaces/HomeScreenInterface";

/** Editorial exponential ease-out curve (cubic-bezier). */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Normalized scroll thresholds (0–1) at which each step node activates. */
const STEP_THRESHOLDS = [0.05, 0.36, 0.68, 0.94] as const;

/** The four sequential process steps. Titles/descriptions live in i18n. */
const METHODOLOGY_STEPS: IMethodologyStep[] = [
    {
        id: "discovery",
        number: "01",
        icon: FiLayers,
        titleKey: "HomeScreen.Methodology.steps.discovery.title",
        descriptionKey: "HomeScreen.Methodology.steps.discovery.description",
    },
    {
        id: "development",
        number: "02",
        icon: FiRepeat,
        titleKey: "HomeScreen.Methodology.steps.development.title",
        descriptionKey: "HomeScreen.Methodology.steps.development.description",
    },
    {
        id: "qa",
        number: "03",
        icon: FiShield,
        titleKey: "HomeScreen.Methodology.steps.qa.title",
        descriptionKey: "HomeScreen.Methodology.steps.qa.description",
    },
    {
        id: "support",
        number: "04",
        icon: FiTrendingUp,
        titleKey: "HomeScreen.Methodology.steps.support.title",
        descriptionKey: "HomeScreen.Methodology.steps.support.description",
    },
];

/** Single-block reveal used for the intro column. */
const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

function Methodology({ className = "" }: IMethodologyProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion() ?? false;

    const timelineRef = useRef<HTMLOListElement | null>(null);
    const vectorFillRef = useRef<HTMLDivElement | null>(null);
    const vectorHeadRef = useRef<HTMLDivElement | null>(null);

    // Current scroll progress (0–1) along the 4-step timeline and active step index.
    const progressRef = useRef<number>(0);
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

    /** Updates the guiding vector height/tip position and determines which step is active. */
    const updateScrollVector = useCallback(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        if (shouldReduceMotion) {
            if (vectorFillRef.current) {
                vectorFillRef.current.style.height = "100%";
            }
            if (vectorHeadRef.current) {
                vectorHeadRef.current.style.top = "100%";
            }
            setActiveStepIndex(METHODOLOGY_STEPS.length - 1);
            return;
        }

        const rect = timeline.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;

        // The guiding point tracks at 58% of viewport height so steps light up
        // naturally just as they cross the reading focus zone.
        const triggerY = vh * 0.58;
        const startY = rect.top + 32;
        const endY = rect.bottom - 32;
        const totalDistance = Math.max(1, endY - startY);

        const rawProgress = (triggerY - startY) / totalDistance;
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));
        progressRef.current = clampedProgress;

        const percent = `${(clampedProgress * 100).toFixed(2)}%`;
        if (vectorFillRef.current) {
            vectorFillRef.current.style.height = percent;
        }
        if (vectorHeadRef.current) {
            vectorHeadRef.current.style.top = percent;
        }

        // Determine highest step reached by the guiding vector
        let nextActiveIndex = -1;
        for (let i = 0; i < STEP_THRESHOLDS.length; i += 1) {
            if (clampedProgress >= STEP_THRESHOLDS[i]) {
                nextActiveIndex = i;
            }
        }

        setActiveStepIndex((prev) =>
            prev !== nextActiveIndex ? nextActiveIndex : prev,
        );
    }, [shouldReduceMotion]);

    useEffect(() => {
        let rafId: number | null = null;

        const handleScrollOrResize = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                updateScrollVector();
            });
        };

        updateScrollVector();

        window.addEventListener("scroll", handleScrollOrResize, {
            passive: true,
        });
        window.addEventListener("resize", handleScrollOrResize, {
            passive: true,
        });
        window.addEventListener("touchmove", handleScrollOrResize, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            window.removeEventListener("touchmove", handleScrollOrResize);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [updateScrollVector]);

    return (
        <section
            id="methodology"
            className={`w-full bg-bg py-24 sm:py-28 lg:py-32 transition-colors duration-500 ease-out ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
                    {/* -------------------------------------------------- */}
                    {/* Left — Editorial Intro Column                      */}
                    {/* -------------------------------------------------- */}
                    <div className="lg:col-span-5">
                        <motion.div
                            variants={
                                shouldReduceMotion ? undefined : fadeUpVariants
                            }
                            initial={shouldReduceMotion ? false : "hidden"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                <span className="block text-primary">
                                    {t("HomeScreen.Methodology.eyebrow")}
                                </span>
                                <span className="mt-2 block text-text transition-colors duration-500">
                                    {t("HomeScreen.Methodology.title")}
                                </span>
                            </h2>

                            <p className="mt-6 max-w-prose text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                                {t("HomeScreen.Methodology.intro")}
                            </p>

                            {/* Step Progress Pills — synchronized with the guiding vector */}
                            <div
                                aria-hidden="true"
                                className="mt-8 flex items-center gap-2.5"
                            >
                                {METHODOLOGY_STEPS.map((step, index) => {
                                    const isReached = index <= activeStepIndex;
                                    const isCurrent = index === activeStepIndex;

                                    return (
                                        <div
                                            key={`indicator-${step.id}`}
                                            className="flex items-center gap-2.5"
                                        >
                                            <span
                                                className={`font-mono text-xs font-semibold transition-all duration-300 ${
                                                    isCurrent
                                                        ? "scale-110 text-primary"
                                                        : isReached
                                                          ? "text-text"
                                                          : "text-text-muted/50"
                                                }`}
                                            >
                                                {step.number}
                                            </span>
                                            {index <
                                            METHODOLOGY_STEPS.length - 1 ? (
                                                <span
                                                    className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
                                                        index < activeStepIndex
                                                            ? "bg-primary"
                                                            : "bg-neutral-500/25"
                                                    }`}
                                                />
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Right — Guided Vector Timeline & Step Cards        */}
                    {/* -------------------------------------------------- */}
                    <div className="relative lg:col-span-7">
                        <ol
                            ref={timelineRef}
                            className="relative flex flex-col gap-6 sm:gap-8"
                        >
                            {/* Continuous Vertical Vector Rail + Animated Guiding Vector Beam */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-10 left-6 top-10 w-0.5 -translate-x-1/2 bg-neutral-500/20 sm:left-7"
                            >
                                {/* Glowing animated vector fill driven by scroll */}
                                <div
                                    ref={vectorFillRef}
                                    style={{ height: "0%" }}
                                    className="w-full rounded-full bg-gradient-to-b from-primary via-primary to-secondary shadow-[0_0_16px_var(--color-primary)] transition-[height] duration-150 ease-out"
                                />

                                {/* Traveling vector pointer head at the tip of the beam */}
                                <div
                                    ref={vectorHeadRef}
                                    style={{ top: "0%" }}
                                    className="absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-bg text-primary shadow-[0_0_18px_var(--color-primary)] transition-[top] duration-150 ease-out"
                                >
                                    <FiArrowDown className="h-3 w-3" />
                                </div>
                            </div>

                            {METHODOLOGY_STEPS.map((step, index) => {
                                const StepIcon = step.icon;
                                const isReached = index <= activeStepIndex;
                                const isCurrent = index === activeStepIndex;
                                const isCompleted = index < activeStepIndex;

                                return (
                                    <li
                                        key={step.id}
                                        className="relative flex items-start gap-4 sm:gap-6"
                                    >
                                        {/* Left Node on the Guiding Vector Rail + Horizontal Connector */}
                                        <div className="relative z-10 flex shrink-0 items-center pt-6">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-sm font-bold transition-all duration-500 sm:h-14 sm:w-14 ${
                                                    isCurrent
                                                        ? "scale-105 border-primary bg-primary text-black shadow-[0_0_25px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]"
                                                        : isCompleted
                                                          ? "border-primary bg-bg text-primary shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
                                                          : "border-neutral-500/25 bg-bg text-text-muted"
                                                }`}
                                            >
                                                {isCompleted ? (
                                                    <FiCheck
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span>{step.number}</span>
                                                )}
                                            </div>

                                            {/* Horizontal vector connector branch into the card */}
                                            <span
                                                aria-hidden="true"
                                                className={`h-0.5 w-3 transition-colors duration-500 sm:w-5 ${
                                                    isReached
                                                        ? "bg-primary shadow-[0_0_10px_var(--color-primary)]"
                                                        : "bg-neutral-500/20"
                                                }`}
                                            />
                                        </div>

                                        {/* Step Content Card */}
                                        <article
                                            className={`group flex-1 rounded-3xl border p-6 transition-all duration-500 sm:p-8 ${
                                                isCurrent
                                                    ? "translate-x-1 border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] bg-orange-500/[0.05] shadow-[0_0_30px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
                                                    : isReached
                                                      ? "border-orange-500/30 bg-neutral-500/[0.04]"
                                                      : "border-neutral-500/20 bg-neutral-500/[0.03] opacity-75"
                                            } hover:border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] hover:opacity-100`}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500 ${
                                                            isReached
                                                                ? "bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-primary"
                                                                : "bg-neutral-500/10 text-text-muted"
                                                        }`}
                                                    >
                                                        <StepIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    <h3 className="font-title text-xl font-bold leading-tight tracking-tight text-text transition-colors duration-500 sm:text-2xl">
                                                        {t(step.titleKey)}
                                                    </h3>
                                                </div>

                                                <span
                                                    aria-hidden="true"
                                                    className={`font-mono text-xs font-semibold tracking-[0.25em] transition-colors duration-500 ${
                                                        isReached
                                                            ? "text-primary"
                                                            : "text-text-muted/50"
                                                    }`}
                                                >
                                                    {step.number}
                                                </span>
                                            </div>

                                            <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted transition-colors duration-500 sm:text-base">
                                                {t(step.descriptionKey)}
                                            </p>
                                        </article>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Methodology;
