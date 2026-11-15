// ---------------------------------------------------------------------------
// Services — "What we build" section: editorial header + 3 service cards.
// Rounded dark cards with top-left accent icon badges and a soft reveal.
// On mobile (no hover affordance), each card auto-triggers the same accent
// border highlight as it scrolls through the vertical center of the viewport.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { FiCode, FiGlobe, FiSmartphone } from "react-icons/fi";
import type { IServicesProps, IServiceCardItem, IServiceCardProps } from "../../interfaces/HomeScreenInterface";
import { getGlitchAnimationStyles } from "../../utils/glitchAnimation";

/** Spring-like cubic-bezier curve for the card-stacking entrance & exit */
const EASE_STACK = [0.22, 1, 0.36, 1] as const;

const BRAND_GLITCH_STYLES = getGlitchAnimationStyles({
    className: "services-brand-glitch",
    fontSwapMode: "mono-to-playfair",
    minWidth: "6.6em",
});

const SERVICE_CARDS: IServiceCardItem[] = [
    {
        id: "web",
        icon: FiGlobe,
        titleKey: "HomeScreen.Services.cards.web.title",
        descriptionKey: "HomeScreen.Services.cards.web.description",
    },
    {
        id: "apps",
        icon: FiSmartphone,
        titleKey: "HomeScreen.Services.cards.apps.title",
        descriptionKey: "HomeScreen.Services.cards.apps.description",
    },
    {
        id: "custom",
        icon: FiCode,
        titleKey: "HomeScreen.Services.cards.custom.title",
        descriptionKey: "HomeScreen.Services.cards.custom.description",
    },
];

/**
 * A single service card. It reveals together with the section, then — on mobile,
 * where there is no hover affordance — it automatically triggers the same
 * accent-border highlight as it scrolls through the vertical center of the
 * viewport, lighting cards up sequentially as the user scrolls.
 */
/**
 * A single service card.
 * Choreographs a two-stage entrance whenever the section enters view:
 *   1. "colliding": cards fly into a central pile one after another and collide
 *      with an impact recoil (`scale` + slight tilt).
 *   2. "settled": once all 3 cards have stacked/collided, each card unstacks and
 *      glides into its own grid column/row.
 * When the section leaves view, cards fold back out so the sequence replays on return.
 */
function ServiceCard({ card, index, isSectionVisible }: IServiceCardProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const cardRef = useRef<HTMLElement | null>(null);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 768px)").matches
            : true,
    );
    const [animationStage, setAnimationStage] = useState<
        "hidden" | "colliding" | "settled"
    >("hidden");

    useEffect(() => {
        const desktopMedia = window.matchMedia("(min-width: 768px)");
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };
        setIsDesktop(desktopMedia.matches);
        desktopMedia.addEventListener("change", handleMediaChange);
        return () => desktopMedia.removeEventListener("change", handleMediaChange);
    }, []);

    useEffect(() => {
        const cardNode = cardRef.current;
        if (!cardNode) return;

        // The automatic highlight only makes sense on the stacked mobile layout
        // (below the `md` 3-column breakpoint). On desktop the hover state covers it.
        const mobileQuery = window.matchMedia("(max-width: 767px)");
        if (!mobileQuery.matches) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsHighlighted(entry.isIntersecting),
            { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
        );

        observer.observe(cardNode);

        return () => observer.disconnect();
    }, []);

    // Drive the 2-phase choreography: hidden -> colliding (one by one) -> settled (spread to slots)
    useEffect(() => {
        if (shouldReduceMotion) {
            setAnimationStage("settled");
            return;
        }

        if (!isSectionVisible) {
            setAnimationStage("hidden");
            return;
        }

        setAnimationStage("colliding");

        // Wait until all 3 cards have slammed into the central stack, then fan them out
        const spreadTimer = window.setTimeout(() => {
            setAnimationStage("settled");
        }, 820);

        return () => window.clearTimeout(spreadTimer);
    }, [isSectionVisible, shouldReduceMotion]);

    const IconComponent = card.icon;

    // Coordinates that pull all 3 cards into the exact same central stack:
    // - Desktop (3 columns): Card 0 shifts right (+106%), Card 1 stays centered (0%), Card 2 shifts left (-106%).
    // - Mobile (1 column): Card 0 shifts down (+95%), Card 1 stays centered (0%), Card 2 shifts up (-95%).
    const stackOffsetPercent = (1 - index) * (isDesktop ? 106 : 92);
    const stackX = isDesktop ? `${stackOffsetPercent}%` : "0%";
    const stackY = isDesktop ? `${index * 6}px` : `${stackOffsetPercent}%`;
    const stackRotate = index === 0 ? -5 : index === 1 ? 3.5 : -2.5;

    // Entry origin before colliding into the central stack
    const entryX = isDesktop ? `${stackOffsetPercent + (index - 1) * 35}%` : "0%";
    const entryY = isDesktop ? "90px" : `${stackOffsetPercent + 45}%`;

    const collideDelay = index * 0.22;
    const spreadDelay = index * 0.07;
    const exitDelay = (SERVICE_CARDS.length - 1 - index) * 0.06;

    return (
        <motion.article
            ref={cardRef}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          x: entryX,
                          y: entryY,
                          scale: 0.82,
                          rotate: stackRotate * 2,
                      }
            }
            animate={
                shouldReduceMotion
                    ? { opacity: 1, x: "0%", y: "0%", scale: 1, rotate: 0 }
                    : animationStage === "colliding"
                      ? {
                            opacity: [0, 1, 1],
                            x: [entryX, stackX, stackX],
                            y: [entryY, stackY, stackY],
                            scale: [0.82, 1.07, 0.98],
                            rotate: [
                                stackRotate * 2,
                                stackRotate * -1.2,
                                stackRotate,
                            ],
                            transition: {
                                duration: 0.36,
                                delay: collideDelay,
                                times: [0, 0.72, 1],
                                ease: EASE_STACK,
                            },
                        }
                      : animationStage === "settled"
                        ? {
                              opacity: 1,
                              x: "0%",
                              y: "0%",
                              scale: 1,
                              rotate: 0,
                              transition: {
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 20,
                                  mass: 0.9,
                                  delay: spreadDelay,
                              },
                          }
                        : {
                              opacity: 0,
                              x: stackX,
                              y: entryY,
                              scale: 0.84,
                              rotate: stackRotate,
                              transition: {
                                  duration: 0.38,
                                  delay: exitDelay,
                                  ease: EASE_STACK,
                              },
                          }
            }
            style={{ zIndex: index + 1 }}
            className={`flex flex-col rounded-2xl border bg-[color-mix(in_srgb,var(--color-bg)_93%,var(--color-text))] p-6 sm:p-8 shadow-[0_18px_50px_-15px_rgba(0,0,0,0.65)] transition-colors duration-500 will-change-transform ${
                isHighlighted
                    ? "border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]"
                    : "border-neutral-500/25"
            } hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]`}
        >
            {/* Top-left accent icon badge (color-mix keeps the tint theme-aware) */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-primary">
                <IconComponent className="text-2xl" aria-hidden="true" />
            </div>

            <h3 className="mt-6 font-title text-xl font-bold text-text sm:text-2xl">
                {t(card.titleKey)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                {t(card.descriptionKey)}
            </p>
        </motion.article>
    );
}

function Services(_props: IServicesProps) {
    const { t } = useTranslation();

    // ---- Scroll-reveal state (lightweight, keeps the entrance smooth) ----
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { root: null, rootMargin: "-10% 0px -10% 0px", threshold: 0.12 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="w-full bg-bg py-32 sm:py-32 lg:py-36 overflow-x-clip relative"
        >
            {/* Inline keyframes for the "vizo studio" interference/glitch lockup */}
            <style>{BRAND_GLITCH_STYLES}</style>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ---- Section Header ---- */}
                <div className="max-w-3xl">
                    <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                        <Trans
                            i18nKey="HomeScreen.Services.title"
                            components={{ brand: <span className="services-brand-glitch font-mono lowercase text-primary" /> }}
                        />
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
                        {t("HomeScreen.Services.subtitle")}
                    </p>
                </div>

                {/* ---- 3-Column Service Cards Grid ---- */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
                    {SERVICE_CARDS.map((card, index) => (
                        <ServiceCard
                            key={card.id}
                            card={card}
                            index={index}
                            isSectionVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
