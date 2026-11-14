// ---------------------------------------------------------------------------
// Portfolio — "Menos palabras. Más «quiero eso»." editorial project showcase.
// Groups the 8 projects into columns of 2 stacked cards:
// - Desktop (`lg:`): 2 columns visible at once (2x2 = 4 projects in view).
// - Mobile (`< lg`): 1 column visible at once (2 projects stacked vertically).
// Uses a native vertical scroll runway (`100vh + maxHorizontalOffset`) with a
// pinned 100vh stage so native vertical scroll drives horizontal translation
// at 60/120fps without fighting the browser compositor.
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type {
    IPortfolioProjectItem,
    IPortfolioProps,
} from "../../interfaces/HomeScreenInterface";
import portfolio1 from "../../assets/HomeScreen/images/portfolio/portfolio-1.webp";
import portfolio2 from "../../assets/HomeScreen/images/portfolio/portfolio-2.webp";
import portfolio3 from "../../assets/HomeScreen/images/portfolio/portfolio-3.webp";
import portfolio4 from "../../assets/HomeScreen/images/portfolio/portfolio-4.webp";
import portfolio5 from "../../assets/HomeScreen/images/portfolio/portfolio-5.webp";
import portfolio6 from "../../assets/HomeScreen/images/portfolio/portfolio-6.webp";
import portfolio7 from "../../assets/HomeScreen/images/portfolio/portfolio-7.webp";
import portfolio8 from "../../assets/HomeScreen/images/portfolio/portfolio-8.webp";

/** Number of stacked cards per vertical column in the horizontal track. */
const PROJECTS_PER_COLUMN = 2;

/** Exponential smoothing factor (0–1) used by the rAF loop to glide the horizontal track. */
const SMOOTH_LERP_FACTOR = 0.22;

/** The eight featured projects rendered along the horizontal showcase track. */
const PORTFOLIO_PROJECTS: IPortfolioProjectItem[] = [
    {
        id: "foundation",
        image: portfolio1,
        categoryKey: "Portfolio.projects.1.category",
        titleKey: "Portfolio.projects.1.title",
        imageAltKey: "Portfolio.projects.1.imageAlt",
    },
    {
        id: "lawyer",
        image: portfolio2,
        categoryKey: "Portfolio.projects.2.category",
        titleKey: "Portfolio.projects.2.title",
        imageAltKey: "Portfolio.projects.2.imageAlt",
    },
    {
        id: "psychologist",
        image: portfolio3,
        categoryKey: "Portfolio.projects.3.category",
        titleKey: "Portfolio.projects.3.title",
        imageAltKey: "Portfolio.projects.3.imageAlt",
    },
    {
        id: "developer",
        image: portfolio4,
        categoryKey: "Portfolio.projects.4.category",
        titleKey: "Portfolio.projects.4.title",
        imageAltKey: "Portfolio.projects.4.imageAlt",
    },
    {
        id: "motorcycle",
        image: portfolio5,
        categoryKey: "Portfolio.projects.5.category",
        titleKey: "Portfolio.projects.5.title",
        imageAltKey: "Portfolio.projects.5.imageAlt",
    },
    {
        id: "finance",
        image: portfolio6,
        categoryKey: "Portfolio.projects.6.category",
        titleKey: "Portfolio.projects.6.title",
        imageAltKey: "Portfolio.projects.6.imageAlt",
    },
    {
        id: "ecommerce",
        image: portfolio7,
        categoryKey: "Portfolio.projects.7.category",
        titleKey: "Portfolio.projects.7.title",
        imageAltKey: "Portfolio.projects.7.imageAlt",
    },
    {
        id: "corporate",
        image: portfolio8,
        categoryKey: "Portfolio.projects.8.category",
        titleKey: "Portfolio.projects.8.title",
        imageAltKey: "Portfolio.projects.8.imageAlt",
    },
];

/**
 * Splits the 8 projects into 4 vertical columns of 2 stacked projects each.
 * - Mobile shows 1 column at a time (2 stacked projects).
 * - Desktop shows 2 columns at a time (2x2 = 4 projects).
 */
const PORTFOLIO_COLUMNS: IPortfolioProjectItem[][] = Array.from(
    { length: Math.ceil(PORTFOLIO_PROJECTS.length / PROJECTS_PER_COLUMN) },
    (_, columnIndex) =>
        PORTFOLIO_PROJECTS.slice(
            columnIndex * PROJECTS_PER_COLUMN,
            columnIndex * PROJECTS_PER_COLUMN + PROJECTS_PER_COLUMN,
        ),
);

function Portfolio(_props: IPortfolioProps) {
    const { t } = useTranslation();

    const sectionRef = useRef<HTMLElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    // Target and smoothed horizontal translation (px) driven via requestAnimationFrame.
    const targetOffsetRef = useRef<number>(0);
    const currentOffsetRef = useRef<number>(0);
    const maxOffsetRef = useRef<number>(0);
    const rafIdRef = useRef<number | null>(null);
    const pinStateRef = useRef<string>("start");

    // Total vertical height (px) of the scroll runway (`100vh + maxOffset`).
    const [runwayHeight, setRunwayHeight] = useState<number>(0);

    // Split the localized editorial headline after the first sentence period so
    // "Menos palabras." sits on line 1 and "Más «quiero eso»." stacks underneath.
    const rawTitle = t("Portfolio.title");
    const [firstTitleLine, ...restTitleLines] = rawTitle.split(/(?<=\.)\s+/);
    const secondTitleLine = restTitleLines.join(" ");

    /** Writes the current horizontal offset directly to the DOM track node. */
    const applyTrackTransform = useCallback((x: number) => {
        const track = trackRef.current;
        if (!track) return;
        track.style.transform = `translate3d(-${x.toFixed(2)}px, 0, 0)`;
    }, []);

    /** Applies the stage positioning (`start`, `pinned`, or `end`) directly to the DOM. */
    const applyStagePinState = useCallback((nextState: string) => {
        if (pinStateRef.current === nextState) return;
        const stage = stageRef.current;
        if (!stage) return;

        pinStateRef.current = nextState;

        if (nextState === "pinned") {
            stage.style.position = "fixed";
            stage.style.top = "0px";
            stage.style.bottom = "auto";
        } else if (nextState === "end") {
            stage.style.position = "absolute";
            stage.style.top = "auto";
            stage.style.bottom = "0px";
        } else {
            stage.style.position = "absolute";
            stage.style.top = "0px";
            stage.style.bottom = "auto";
        }
    }, []);

    /** Starts the rAF interpolation loop if it is not already running. */
    const startSmoothLoop = useCallback(() => {
        if (rafIdRef.current !== null) return;

        const tick = () => {
            const target = targetOffsetRef.current;
            const current = currentOffsetRef.current;
            const diff = target - current;

            if (Math.abs(diff) <= 0.2) {
                currentOffsetRef.current = target;
                applyTrackTransform(target);
                rafIdRef.current = null;
                return;
            }

            const next = current + diff * SMOOTH_LERP_FACTOR;
            currentOffsetRef.current = next;
            applyTrackTransform(next);
            rafIdRef.current = window.requestAnimationFrame(tick);
        };

        rafIdRef.current = window.requestAnimationFrame(tick);
    }, [applyTrackTransform]);

    /** Synchronizes stage pin state and target horizontal offset from native scroll position. */
    const syncWithScroll = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        const maxOffset = maxOffsetRef.current;
        const vh = window.innerHeight;
        const rect = section.getBoundingClientRect();

        if (maxOffset <= 0 || rect.top >= 0) {
            applyStagePinState("start");
            targetOffsetRef.current = 0;
        } else if (rect.bottom <= vh) {
            applyStagePinState("end");
            targetOffsetRef.current = maxOffset;
        } else {
            applyStagePinState("pinned");
            const progressed = Math.min(maxOffset, Math.max(0, -rect.top));
            targetOffsetRef.current = progressed;
        }

        startSmoothLoop();
    }, [applyStagePinState, startSmoothLoop]);

    /** Recalculates the maximum horizontal travel and total vertical runway height. */
    const updateMeasurements = useCallback(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const nextMax = Math.max(0, track.scrollWidth - viewport.clientWidth);
        maxOffsetRef.current = nextMax;
        setRunwayHeight(window.innerHeight + nextMax);

        if (targetOffsetRef.current > nextMax) {
            targetOffsetRef.current = nextMax;
        }
        if (currentOffsetRef.current > nextMax) {
            currentOffsetRef.current = nextMax;
            applyTrackTransform(nextMax);
        }

        syncWithScroll();
    }, [applyTrackTransform, syncWithScroll]);

    useEffect(() => {
        updateMeasurements();

        const resizeObserver = new ResizeObserver(() => {
            updateMeasurements();
        });

        if (viewportRef.current) {
            resizeObserver.observe(viewportRef.current);
        }
        if (trackRef.current) {
            resizeObserver.observe(trackRef.current);
        }

        window.addEventListener("resize", updateMeasurements, { passive: true });
        window.addEventListener("scroll", syncWithScroll, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateMeasurements);
            window.removeEventListener("scroll", syncWithScroll);
            if (rafIdRef.current !== null) {
                window.cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, [syncWithScroll, updateMeasurements]);

    const renderProjectCard = (project: IPortfolioProjectItem) => (
        <article
            key={project.id}
            className="
                group relative isolate flex w-full flex-col justify-end overflow-hidden
                h-[clamp(10rem,26vh,16rem)]
                rounded-2xl border border-white/10 bg-neutral-900
                transition-colors duration-300 hover:border-white/25
            "
        >
            {/* Immersive background screenshot — subtle zoom on card hover. */}
            <img
                src={project.image}
                alt={t(project.imageAltKey)}
                loading="lazy"
                className="
                    absolute inset-0 -z-20 h-full w-full object-cover object-top
                    transition-transform duration-500 ease-out
                    hover:scale-105 group-hover:scale-105
                "
            />

            {/* Editorial dark scrim so overlaid typography stays legible. */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute inset-0 -z-10
                    bg-gradient-to-t from-black/90 via-black/45 to-black/15
                    transition-opacity duration-300 group-hover:from-black/95
                "
            />

            {/* Overlaid card copy — category overline + project title. */}
            <div className="flex flex-col gap-1 p-4 sm:gap-1.5 sm:p-5">
                <p className="text-[11px] font-medium uppercase tracking-widest text-primary sm:text-xs">
                    {t(project.categoryKey)}
                </p>
                <h3 className="font-title text-base font-bold leading-snug text-white sm:text-lg lg:text-xl">
                    {t(project.titleKey)}
                </h3>
            </div>
        </article>
    );

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            style={
                runwayHeight > 0 ? { height: `${runwayHeight}px` } : undefined
            }
            className="relative min-h-screen w-full bg-bg"
        >
            <div
                ref={stageRef}
                className="absolute inset-x-0 top-0 z-10 flex h-screen w-full flex-col justify-center bg-bg pt-20 pb-6 sm:pt-24 sm:pb-8"
            >
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section header — stacked editorial headline + supporting subtitle. */}
                    <div className="max-w-3xl">
                        <h2 className="font-title text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl lg:text-4xl">
                            <span className="block">{firstTitleLine}</span>
                            {secondTitleLine ? (
                                <span className="mt-0.5 block">
                                    {secondTitleLine
                                        .split(/(«[^»]+»)/)
                                        .map((segment, segmentIndex) =>
                                            segment.startsWith("«") &&
                                            segment.endsWith("»") ? (
                                                <span
                                                    key={segmentIndex}
                                                    className="font-playfair-display italic text-primary"
                                                >
                                                    {segment}
                                                </span>
                                            ) : (
                                                <span key={segmentIndex}>
                                                    {segment}
                                                </span>
                                            ),
                                        )}
                                </span>
                            ) : null}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-3 sm:text-base lg:text-lg">
                            {t("Portfolio.subtitle")}
                        </p>
                    </div>

                    {/* Horizontal project viewport:
                        - Mobile (< lg): 1 column of 2 vertically stacked projects in view.
                        - Desktop (lg+): 2 columns of 2 vertically stacked projects (2x2 = 4) in view. */}
                    <div
                        ref={viewportRef}
                        className="mt-5 w-full overflow-hidden sm:mt-6 lg:mt-7"
                    >
                        <div
                            ref={trackRef}
                            className="flex w-full gap-4 sm:gap-5 lg:gap-6 will-change-transform"
                        >
                            {PORTFOLIO_COLUMNS.map((column, columnIndex) => (
                                <div
                                    key={`portfolio-column-${columnIndex}`}
                                    className="flex w-full shrink-0 flex-col gap-4 sm:gap-5 lg:w-[calc((100%-1.5rem)/2)] lg:gap-5"
                                >
                                    {column.map(renderProjectCard)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
