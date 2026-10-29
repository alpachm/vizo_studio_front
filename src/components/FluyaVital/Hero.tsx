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
            {/* ---- Overline: rewards hint ---- */}
            <p className={`${styles.fvBrand} text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm`}>
                {t("FluyaVital.hero.overline")}
            </p>

            {/* ---- Main heading with brand accent ---- */}
            <h1 className={`${styles.fvBrand} mt-5 max-w-4xl text-4xl font-black leading-tight text-[#0b2545] sm:text-6xl lg:text-7xl`}>
                {t("FluyaVital.hero.headingLead")}{" "}
                <span className="text-[#00b4d8]">{t("FluyaVital.hero.headingBrand")}</span>
            </h1>

            {/* ---- Subtitle / description ---- */}
            <p className={`${styles.fvBrand} mt-6 max-w-2xl text-base font-light leading-relaxed text-[#1e6091] sm:text-lg lg:text-xl`}>
                {t("FluyaVital.hero.subtitle")}
            </p>
        </section>
    );
};

export default FluyaVitalHero;