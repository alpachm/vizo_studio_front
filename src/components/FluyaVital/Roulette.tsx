// ---------------------------------------------------------------------------
// FluyaVitalRoulette — Static prize-wheel assembly for the Fluye Vital screen
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiGift } from "react-icons/fi";
import type { IFluyaVitalRouletteProps } from "../../interfaces/FluyaVitalInterface";
import RouletteSVG from "../../assets/FluyaVital/SVG/rouletteSVG";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Roulette visual + call-to-action block for the Fluye Vital screen.
 *
 * The unified SVG asset is rendered statically (no rotation animation yet)
 * with an explicit `viewBox` so it scales proportionally at every breakpoint.
 * On large screens the wheel sits on the left and the CTA copy on the right;
 * on mobile the two blocks stack vertically and centre themselves.
 */
export const FluyaVitalRoulette: React.FC<IFluyaVitalRouletteProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        <section
            aria-label={t("FluyaVital.roulette.ariaLabel")}
            className={`relative z-10 flex w-full flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row ${className}`}
        >
            {/* ---- Left / desktop: unified static roulette SVG ---- */}
            <div className="flex w-full max-w-md shrink-0 items-center justify-center lg:max-w-lg">
                <RouletteSVG viewBox="0 0 512 558" className="h-auto w-full drop-shadow-xl" />
            </div>

            {/* ---- Right / desktop: call-to-action block ---- */}
            <div className="flex w-full max-w-lg flex-col items-center text-center lg:items-start lg:text-left">
                {/* Overline */}
                <p
                    className={`${styles.fvBrand} flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm`}
                >
                    <FiGift aria-hidden="true" className="h-4 w-4 shrink-0 text-[#00b4d8]" />
                    {t("FluyaVital.roulette.overline")}
                </p>

                {/* Main heading */}
                <h2
                    className={`${styles.fvBrand} mt-5 text-3xl font-black leading-tight text-[#0b2545] sm:text-4xl lg:text-5xl`}
                >
                    {t("FluyaVital.roulette.heading")}
                </h2>

                {/* Description */}
                <p
                    className={`${styles.fvBrand} mt-5 max-w-md text-base font-light leading-relaxed text-[#1e6091] sm:text-lg`}
                >
                    {t("FluyaVital.roulette.description")}
                </p>

                {/* Spin button (placeholder — spin logic/rotation arrives later) */}
                <button
                    type="button"
                    className={`${styles.fvBrand} mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F2A83B] to-[#FED967] px-8 py-4 text-base font-bold text-[#0b2545] shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-300/60 active:scale-95 sm:text-lg`}
                >
                    {t("FluyaVital.roulette.spinCta")}
                </button>

                {/* Prize result box */}
                <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 w-full max-w-sm rounded-2xl border border-slate-200/60 bg-white px-6 py-4 shadow-2xl shadow-slate-900/5"
                >
                    <p
                        className={`${styles.fvBrand} text-center text-sm font-light text-[#1e6091]`}
                    >
                        {t("FluyaVital.roulette.prizePlaceholder")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FluyaVitalRoulette;
