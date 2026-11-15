// ---------------------------------------------------------------------------
// FluyaVitalHero — Brand hero section for the Fluye Vital standalone screen
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IFluyaVitalHeroProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

export const FluyaVitalHero: React.FC<IFluyaVitalHeroProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        <section
            aria-label={t("FluyaVital.hero.ariaLabel")}
            className={`relative z-10 flex w-full flex-col items-center justify-center text-center ${className}`}
        >
            {/* ---- Overline: rewards hint pill ---- */}
            <p
                className={`${styles.fvBrand} inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/25 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#1e6091] shadow-sm backdrop-blur-sm sm:text-sm`}
            >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#00b4d8]" aria-hidden="true" />
                {t("FluyaVital.hero.overline")}
            </p>

            {/* ---- Main heading with brand accent ---- */}
            <h1
                className={`${styles.fvBrand} mt-5 max-w-4xl text-4xl font-black leading-tight text-[#0b2545] sm:text-6xl lg:text-7xl`}
            >
                {t("FluyaVital.hero.headingLead")}{" "}
                <span className="text-[#00b4d8]">{t("FluyaVital.hero.headingBrand")}</span>
            </h1>

            {/* ---- Brand accent divider ---- */}
            <div className={`${styles.fvAccent} mx-auto my-6`} aria-hidden="true" />

            {/* ---- Subtitle / description ---- */}
            <p
                className={`${styles.fvBrand} bg-transparent max-w-2xl text-base font-light leading-relaxed text-[#1e6091] sm:text-lg lg:text-xl`}
            >
                {t("FluyaVital.hero.subtitle")}
            </p>
        </section>
    );
};

export default FluyaVitalHero;
