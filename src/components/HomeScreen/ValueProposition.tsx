// ---------------------------------------------------------------------------
// ValueProposition — Centered, high-impact editorial statement section.
// Single-column typographic hierarchy: a bold display headline driving the
// message, followed by a supporting subtitle with a subtle brand highlight.
// ---------------------------------------------------------------------------
import { useLayoutEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useHeroVisibility } from "../../context/HeroVisibilityContext";
import type { IValuePropositionProps } from "../../interfaces/HomeScreenInterface";

function ValueProposition({ className = "" }: IValuePropositionProps) {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const { setIsValuePropositionInView } = useHeroVisibility();

    // Report visibility upward so the global Header & FloatingButtons can step
    // aside while the Value Proposition occupies the viewport. A synchronous
    // first evaluation (inside useLayoutEffect, before paint) prevents a
    // one-frame flash on load.
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const applyVisibility = (isInView: boolean) => setIsValuePropositionInView(isInView);

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rect = section.getBoundingClientRect();
        applyVisibility(rect.bottom > 0 && rect.top < viewportHeight);

        const observer = new IntersectionObserver(
            ([entry]) => applyVisibility(entry.isIntersecting),
            { threshold: 0 },
        );
        observer.observe(section);

        return () => {
            observer.disconnect();
            setIsValuePropositionInView(false);
        };
    }, [setIsValuePropositionInView]);

    return (
        <section
            id="value-proposition"
            ref={sectionRef}
            className={`w-full bg-black scroll-mt-32 ${className} py-52`}
        >
            <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-32 text-center md:py-44">
                {/* Centered display headline */}
                <h2 className="font-title text-3xl font-bold leading-[1.08] tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {t("HomeScreen.ValueProposition.title")}
                </h2>

                {/* Supporting subtitle with subtle brand highlight */}
                <p className="mt-6 max-w-2xl font-body text-base font-medium leading-relaxed text-neutral-400 sm:text-lg md:mt-8 md:text-xl">
                    <Trans
                        i18nKey="HomeScreen.ValueProposition.subtitle"
                        components={{
                            brand: <span className="font-semibold text-primary" />,
                        }}
                    />
                </p>
            </div>
        </section>
    );
}

export default ValueProposition;
