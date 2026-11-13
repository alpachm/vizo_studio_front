// ---------------------------------------------------------------------------
// ValueProposition — Centered, high-impact editorial statement section.
// Single-column typographic hierarchy: a bold display headline driving the
// message, followed by a supporting subtitle with a subtle brand highlight.
// ---------------------------------------------------------------------------
import { Trans, useTranslation } from "react-i18next";
import type { IValuePropositionProps } from "../../interfaces/HomeScreenInterface";

function ValueProposition({ className = "" }: IValuePropositionProps) {
    const { t } = useTranslation();

    return (
        <section
            id="value-proposition"
            className={`w-full bg-black scroll-mt-32 ${className}`}
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
