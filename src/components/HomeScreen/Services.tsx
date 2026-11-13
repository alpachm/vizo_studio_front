// ---------------------------------------------------------------------------
// Services — "What we build" section: editorial header + 3 service cards.
// Rounded dark cards with top-left accent icon badges and a soft reveal.
// On mobile (no hover affordance), each card auto-triggers the same accent
// border highlight as it scrolls through the vertical center of the viewport.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FiCode, FiGlobe, FiSmartphone } from "react-icons/fi";
import type { IServicesProps, IServiceCardItem, IServiceCardProps } from "../../interfaces/HomeScreenInterface";

// ---------------------------------------------------------------------------
// Brand glitch — self-contained inline keyframes for the "vizo studio" lockup.
// A slow 6s loop punctuated by a few ~60–120ms hard-cut bursts: a chromatic
// fringe (RGB split via text-shadow), a 1px jitter/skew and a single thin
// `clip-path` slice. `steps(1, end)` is intentional — digital interference
// should snap like a dropped frame rather than ease. The whole effect is
// scoped to `.services-brand-glitch` and disabled for reduced-motion users.
// ---------------------------------------------------------------------------
const BRAND_GLITCH_KEYFRAMES = `
@media (prefers-reduced-motion: no-preference) {
    .services-brand-glitch {
        display: inline-block;
        animation: vizo-brand-glitch 6s steps(1, end) infinite;
    }
}

@keyframes vizo-brand-glitch {
    0%   { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
    2%   { text-shadow: -1.5px 0 rgba(255, 31, 107, 0.55), 1.5px 0 rgba(0, 224, 255, 0.55); transform: translate(1px, 0) skewX(-2deg); }
    4%   { text-shadow: 1px 0 rgba(0, 224, 255, 0.55), -1px 0 rgba(255, 31, 107, 0.55); transform: translate(-1px, -0.5px) skewX(1.5deg); clip-path: inset(8% 0 64% 0); }
    6%   { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    39%  { text-shadow: 0 0 6px rgba(243, 102, 29, 0.45); transform: translate(-0.5px, 0) skewX(0.5deg); opacity: 0.96; }
    40%  { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    64%  { text-shadow: -1px 0 rgba(255, 31, 107, 0.5), 1px 0 rgba(0, 224, 255, 0.5); transform: translate(0.5px, 0) skewX(-1deg); }
    65%  { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); }

    89%  { transform: translate(0, 1px); clip-path: inset(74% 0 4% 0); opacity: 0.98; }
    90%  { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
    100% { text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
}
`;

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
function ServiceCard({ card, isSectionVisible }: IServiceCardProps) {
    const { t } = useTranslation();
    const cardRef = useRef<HTMLElement | null>(null);
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        const cardNode = cardRef.current;
        if (!cardNode) return;

        // The automatic highlight only makes sense on the stacked mobile layout
        // (below the `md` 3-column breakpoint). On desktop the hover state covers it.
        const mobileQuery = window.matchMedia("(max-width: 767px)");
        if (!mobileQuery.matches) return;

        // Narrow the observation root to the middle band of the viewport so a
        // card turns "active" exactly as it crosses the screen's center while
        // the user scrolls — cards highlight in order, one after another.
        const observer = new IntersectionObserver(
            ([entry]) => setIsHighlighted(entry.isIntersecting),
            { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
        );

        observer.observe(cardNode);

        return () => observer.disconnect();
    }, []);

    const IconComponent = card.icon;

    return (
        <article
            ref={cardRef}
            className={`flex flex-col rounded-2xl border bg-white/5 p-6 sm:p-8 transition-all duration-700 ease-out will-change-transform ${
                isSectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } ${
                isHighlighted
                    ? "border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]"
                    : "border-neutral-500/20"
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
        </article>
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
            { root: null, rootMargin: "0px", threshold: 0.2 },
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
            <style>{BRAND_GLITCH_KEYFRAMES}</style>

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
                    {SERVICE_CARDS.map((card) => (
                        <ServiceCard key={card.id} card={card} isSectionVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
