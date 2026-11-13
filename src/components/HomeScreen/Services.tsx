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
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ---- Section Header ---- */}
                <div className="max-w-3xl">
                    <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                        <Trans
                            i18nKey="HomeScreen.Services.title"
                            components={{ brand: <span className="font-mono lowercase text-primary" /> }}
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
