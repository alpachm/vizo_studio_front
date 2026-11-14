// ---------------------------------------------------------------------------
// ResponsiveDemo — Multi-device responsive design showcase for the Home screen.
// Features an editorial copy column on the left (with CTA) and an interactive,
// auto-morphing viewport preview on the right that transitions smoothly across
// Desktop, Tablet, and Mobile layouts when in view.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    FiArrowUpRight,
    FiCheckCircle,
    FiMonitor,
    FiSmartphone,
    FiTablet,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type {
    IResponsiveDemoProps,
    IResponsiveDevicePreset,
    TResponsiveDevice,
} from "../../interfaces/HomeScreenInterface";

/** Ordered device presets for the automatic morph cycle and manual tabs. */
const DEVICE_PRESETS: readonly IResponsiveDevicePreset[] = [
    {
        id: "desktop",
        icon: FiMonitor,
        labelKey: "HomeScreen.ResponsiveDemo.card.devices.desktop",
        viewportLabel: "1440px",
    },
    {
        id: "tablet",
        icon: FiTablet,
        labelKey: "HomeScreen.ResponsiveDemo.card.devices.tablet",
        viewportLabel: "768px",
    },
    {
        id: "mobile",
        icon: FiSmartphone,
        labelKey: "HomeScreen.ResponsiveDemo.card.devices.mobile",
        viewportLabel: "390px",
    },
];

/** Feature tags displayed in the left editorial column. */
const RESPONSIVE_TAG_KEYS = [
    "mobileFirst",
    "fluidLayout",
    "allDevices",
] as const;

/** Feature cards inside the simulated website preview. */
const PREVIEW_CARD_KEYS = ["card1", "card2", "card3"] as const;

/** Interval (ms) between automatic device transitions while in view. */
const DEVICE_CYCLE_MS = 2200;

/** Editorial exponential ease-out curve for the viewport morph. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function ResponsiveDemo({ className = "" }: IResponsiveDemoProps) {
    const { t } = useTranslation();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeDeviceIndex, setActiveDeviceIndex] = useState<number>(0);
    const [isInView, setIsInView] = useState<boolean>(false);
    const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

    // Track whether the section is visible in the viewport so we only run the
    // automatic device morph cycle when the user is viewing it.
    useEffect(() => {
        const sectionNode = sectionRef.current;
        if (!sectionNode || shouldReduceMotion) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "-18% 0px -18% 0px",
                threshold: 0,
            },
        );

        observer.observe(sectionNode);

        return () => {
            observer.disconnect();
        };
    }, [shouldReduceMotion]);

    // Cycle through Desktop -> Tablet -> Mobile -> Desktop while in view,
    // until the user manually selects a device tab.
    useEffect(() => {
        if (!isInView || !isAutoCycling || shouldReduceMotion) return;

        const intervalId = window.setInterval(() => {
            setActiveDeviceIndex(
                (prevIndex) => (prevIndex + 1) % DEVICE_PRESETS.length,
            );
        }, DEVICE_CYCLE_MS);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isInView, isAutoCycling, shouldReduceMotion]);

    const handleSelectDevice = (index: number) => {
        setIsAutoCycling(false);
        setActiveDeviceIndex(index);
    };

    const currentPreset = DEVICE_PRESETS[activeDeviceIndex] ?? DEVICE_PRESETS[0];
    const currentDevice: TResponsiveDevice = currentPreset.id;

    // Frame width & radius adapt to the active device preset
    const deviceFrameClasses =
        currentDevice === "desktop"
            ? "w-full rounded-2xl"
            : currentDevice === "tablet"
              ? "w-[82%] sm:w-[76%] rounded-2xl"
              : "w-[62%] sm:w-[50%] rounded-3xl";

    // Inner feature grid reflows from 3 cols (Desktop) -> 2 cols (Tablet) -> 1 col (Mobile)
    const previewGridClasses =
        currentDevice === "desktop"
            ? "grid-cols-3"
            : currentDevice === "tablet"
              ? "grid-cols-2"
              : "grid-cols-1";

    return (
        <section
            ref={sectionRef}
            id="responsive-demo"
            className={`w-full bg-bg py-24 sm:py-28 lg:py-32 transition-colors duration-500 ease-out ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8">
                    {/* -------------------------------------------------- */}
                    {/* 1 (Mobile) / Left Top (Desktop) — Copy & Tags      */}
                    {/* -------------------------------------------------- */}
                    <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text transition-colors duration-500">
                                {t("HomeScreen.ResponsiveDemo.titleLine1")}
                            </span>
                            <span className="mt-1 block text-primary">
                                {t("HomeScreen.ResponsiveDemo.titleLine2")}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                            {t("HomeScreen.ResponsiveDemo.subtitle")}
                        </p>

                        {/* Responsive Feature Pills */}
                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {RESPONSIVE_TAG_KEYS.map((tagKey) => (
                                <span
                                    key={tagKey}
                                    className="rounded-full border border-neutral-500/25 bg-neutral-500/[0.04] px-4 py-1.5 text-xs font-medium text-text-muted transition-colors duration-500"
                                >
                                    {t(
                                        `HomeScreen.ResponsiveDemo.tags.${tagKey}`,
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 2 (Mobile) / Right Column (Desktop) — Animated Card */}
                    {/* -------------------------------------------------- */}
                    <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
                        <div className="rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-6 shadow-sm transition-colors duration-500 sm:p-9">
                            {/* Top Controls — Device Tabs + Active Viewport Badge */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-1.5 rounded-full border border-neutral-500/20 bg-neutral-500/[0.04] p-1">
                                    {DEVICE_PRESETS.map((preset, index) => {
                                        const Icon = preset.icon;
                                        const isActive =
                                            index === activeDeviceIndex;

                                        return (
                                            <button
                                                key={preset.id}
                                                type="button"
                                                onClick={() =>
                                                    handleSelectDevice(index)
                                                }
                                                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-primary text-white shadow-sm"
                                                        : "text-text-muted hover:text-text"
                                                }`}
                                            >
                                                <Icon
                                                    className="h-3.5 w-3.5 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    {t(preset.labelKey)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 font-title text-xs font-semibold text-primary">
                                    <FiCheckCircle
                                        className="h-3.5 w-3.5 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {currentPreset.viewportLabel}
                                </span>
                            </div>

                            <div className="my-5 border-t border-neutral-500/15 transition-colors duration-500" />

                            {/* Animated Viewport Stage — fixed height so the card & left column never shift */}
                            <div className="flex h-[20.5rem] w-full items-center justify-center overflow-hidden sm:h-[21.5rem]">
                                <LayoutGroup id="responsive-demo-preview">
                                    <div
                                        className={`${deviceFrameClasses} overflow-hidden border border-orange-500/35 bg-neutral-500/[0.04] p-3.5 shadow-[0_0_30px_rgba(243,102,29,0.08)] transition-[width,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-4`}
                                    >
                                        {/* Simulated Browser / Device Top Bar */}
                                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-500/15">
                                            {currentDevice === "mobile" ? (
                                                <span className="mx-auto h-1.5 w-10 rounded-full bg-neutral-500/30" />
                                            ) : (
                                                <>
                                                    <div className="flex shrink-0 items-center gap-1.5">
                                                        <span className="h-2 w-2 rounded-full bg-primary/80" />
                                                        <span className="h-2 w-2 rounded-full bg-neutral-500/30" />
                                                        <span className="h-2 w-2 rounded-full bg-neutral-500/30" />
                                                    </div>
                                                    <span className="truncate rounded-full border border-neutral-500/20 bg-neutral-500/[0.04] px-2.5 py-0.5 font-body text-[10px] text-text-muted">
                                                        {t(
                                                            "HomeScreen.ResponsiveDemo.card.preview.domain",
                                                        )}
                                                    </span>
                                                    <span className="shrink-0 font-body text-[10px] font-medium text-primary">
                                                        {t(
                                                            "HomeScreen.ResponsiveDemo.card.preview.badge",
                                                        )}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Simulated Hero Block */}
                                        <div
                                            className={`mt-3 flex w-full overflow-hidden rounded-xl border border-orange-500/25 bg-orange-500/[0.06] p-3 ${
                                                currentDevice === "desktop"
                                                    ? "flex-row items-center justify-between gap-3"
                                                    : "flex-col items-stretch gap-2.5"
                                            }`}
                                        >
                                            <div className="flex w-full min-w-0 flex-1 items-center gap-2.5">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-primary">
                                                    <HiOutlineSparkles
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1 overflow-hidden">
                                                    <p className="font-title text-[11px] font-bold leading-snug text-text sm:text-xs whitespace-normal break-words">
                                                        {t(
                                                            "HomeScreen.ResponsiveDemo.card.preview.headline",
                                                        )}
                                                    </p>
                                                    <div className="mt-1.5 h-1.5 w-16 max-w-full rounded-full bg-neutral-500/30 sm:w-20" />
                                                </div>
                                            </div>

                                            <span
                                                className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-2.5 py-1.5 font-body text-[10px] font-semibold text-white ${
                                                    currentDevice === "desktop"
                                                        ? "w-auto"
                                                        : "w-full"
                                                }`}
                                            >
                                                {t(
                                                    "HomeScreen.ResponsiveDemo.card.preview.ctaPill",
                                                )}
                                            </span>
                                        </div>

                                        {/* Simulated Adaptive Grid (3 cols -> 2 cols -> 1 col) */}
                                        <div
                                            className={`mt-3 grid gap-2 ${previewGridClasses}`}
                                        >
                                            {PREVIEW_CARD_KEYS.map(
                                                (cardKey, idx) => {
                                                    const isThirdOnTablet =
                                                        currentDevice ===
                                                            "tablet" &&
                                                        idx === 2;

                                                    return (
                                                        <motion.div
                                                            key={cardKey}
                                                            layout="position"
                                                            transition={{
                                                                layout: {
                                                                    duration:
                                                                        shouldReduceMotion
                                                                            ? 0
                                                                            : 0.45,
                                                                    ease: EASE_OUT,
                                                                },
                                                            }}
                                                            className={`flex items-center justify-between gap-2 rounded-xl border border-neutral-500/20 bg-neutral-500/[0.04] px-3 py-2.5 ${
                                                                isThirdOnTablet
                                                                    ? "col-span-2"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate font-title text-[11px] font-semibold text-text">
                                                                    {t(
                                                                        `HomeScreen.ResponsiveDemo.card.preview.${cardKey}`,
                                                                    )}
                                                                </p>
                                                                <span className="mt-1 block h-1.5 w-12 rounded-full bg-neutral-500/25" />
                                                            </div>
                                                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary/70" />
                                                        </motion.div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                </LayoutGroup>
                            </div>

                            <div className="my-5 border-t border-neutral-500/15 transition-colors duration-500" />

                            {/* Footnote */}
                            <p className="text-xs leading-relaxed text-text-muted transition-colors duration-500">
                                {t("HomeScreen.ResponsiveDemo.card.footnote")}
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 3 (Mobile, Last) / Left Bottom (Desktop) — CTA     */}
                    {/* -------------------------------------------------- */}
                    <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
                        <button
                            type="button"
                            onClick={() => scrollToSection("contacto")}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-500/35 px-5 py-2.5 font-body text-sm font-medium text-text transition-[border-color,box-shadow,color] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]"
                        >
                            <span>
                                {t("HomeScreen.ResponsiveDemo.cta")}
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

export default ResponsiveDemo;
