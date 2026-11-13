// ---------------------------------------------------------------------------
// Services — "What we build" section: editorial header + 3 service cards.
// Rounded dark cards with top-left accent icon badges and a soft reveal.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCode, FiGlobe, FiSmartphone } from "react-icons/fi";
import type { IServicesProps, IServiceCardItem } from "../../interfaces/HomeScreenInterface";

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
                        {t("HomeScreen.Services.title")}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
                        {t("HomeScreen.Services.subtitle")}
                    </p>
                </div>

                {/* ---- 3-Column Service Cards Grid ---- */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
                    {SERVICE_CARDS.map((card) => {
                        const IconComponent = card.icon;

                        return (
                            <article
                                key={card.id}
                                className={`flex flex-col rounded-2xl border border-neutral-500/20 bg-white/5 p-6 sm:p-8 transition-all duration-700 ease-out will-change-transform hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
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
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;
