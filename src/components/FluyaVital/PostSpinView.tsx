// ---------------------------------------------------------------------------
// PostSpinView — Final brand view shown after the Fluye Vital spin resolves
// ---------------------------------------------------------------------------
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import type { IPostSpinViewProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Minimal, corporate closing view that replaces the roulette once the result
 * modal is dismissed. It credits the agency, states the value proposition and
 * offers two actions: meet Vizo Studio (home) or return to the wheel.
 */
export const PostSpinView: React.FC<IPostSpinViewProps> = ({
    onBackToRoulette,
    className = "",
}) => {
    const { t } = useTranslation();

    return (
        <section
            aria-label={t("FluyaVital.postSpin.ariaLabel")}
            className={`relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8 ${className}`}
        >
            {/* Branding line */}
            <p
                className={`${styles.fvVizoBrand} text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm`}
            >
                {t("FluyaVital.postSpin.branding")}
            </p>

            {/* Brand accent divider */}
            <div className={styles.fvAccent} aria-hidden="true" />

            {/* Main headline */}
            <h1
                className={`${styles.fvVizoBrand} max-w-3xl text-4xl font-black leading-tight text-[#0b2545] sm:text-5xl lg:text-6xl`}
            >
                {t("FluyaVital.postSpin.headline")}
            </h1>

            {/* Supporting text */}
            <p
                className={`${styles.fvVizoBrand} mt-6 max-w-2xl text-base font-light leading-relaxed text-[#1e6091] sm:text-lg lg:text-xl`}
            >
                {t("FluyaVital.postSpin.description")}
            </p>

            {/* Action buttons */}
            <div className="mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                {/* Primary CTA — go to the Vizo Studio home page */}
                <Link
                    to="/"
                    className={`${styles.fvVizoBrand} inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F2A83B] to-[#FED967] px-8 py-4 text-base font-bold text-[#0b2545] shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-300/60 active:scale-95 sm:w-auto sm:text-lg`}
                >
                    {t("FluyaVital.footer.cta")}
                    <FiArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </Link>

                {/* Secondary CTA — return to the roulette */}
                <button
                    type="button"
                    onClick={onBackToRoulette}
                    className={`${styles.fvVizoBrand} inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b2545] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0b2545]/30 transition-all duration-200 hover:scale-[1.03] hover:bg-[#1e6091] focus:outline-none focus:ring-4 focus:ring-[#00b4d8]/40 active:scale-95 sm:w-auto sm:text-lg`}
                >
                    <FiArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {t("FluyaVital.postSpin.backCta")}
                </button>
            </div>
        </section>
    );
};

export default PostSpinView;
