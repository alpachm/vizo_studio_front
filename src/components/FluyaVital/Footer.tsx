// ---------------------------------------------------------------------------
// FluyaVitalFooter — Collaboration credits & CTA banner for the Fluye Vital screen
// ---------------------------------------------------------------------------
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { IFluyaVitalFooterProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Collaboration footer for the Fluye Vital screen. Wraps the credits and CTA in
 * a clean floating white card and links back to the home page (/) so visitors
 * can meet Vizo Studio.
 */
export const FluyaVitalFooter: React.FC<IFluyaVitalFooterProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        <footer
            aria-label={t("FluyaVital.footer.ariaLabel")}
            className={`relative z-10 w-full ${className}`}
        >
            {/* ---- Floating card: eyebrow + description + CTA ---- */}
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/80 bg-white/90 p-8 shadow-xl shadow-sky-950/10 backdrop-blur-md md:p-10 lg:flex-row">
                {/* Text block (eyebrow + description) */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    {/* Eyebrow */}
                    <p
                        className={`${styles.fvBrand} text-xs font-semibold uppercase tracking-[0.3em] text-[#1e6091] sm:text-sm`}
                    >
                        {t("FluyaVital.footer.overline")}
                    </p>

                    {/* Main description */}
                    <p
                        className={`${styles.fvBrand} mt-3 max-w-3xl text-base font-light leading-relaxed text-[#1e6091] sm:text-lg`}
                    >
                        {t("FluyaVital.footer.descriptionLead")}{" "}
                        <span className={`${styles.fvVizoBrand} font-mono font-bold lowercase text-primary`}>
                            {t("Common.logoVizo")} {t("Common.logoStudio")}
                        </span>{" "}
                        {t("FluyaVital.footer.descriptionAfter")}
                    </p>
                </div>

                {/* Action button — right-aligned on desktop, centered on mobile */}
                <div className="flex shrink-0 justify-center lg:justify-end">
                    <Link
                        to="/"
                        className={`${styles.fvBrand} inline-flex items-center justify-center gap-2 rounded-full bg-[#0b2545] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0b2545]/30 transition-all duration-200 hover:scale-[1.03] hover:bg-[#1e6091] focus:outline-none focus:ring-4 focus:ring-[#00b4d8]/40 active:scale-95 sm:text-lg`}
                    >
                        {t("FluyaVital.footer.cta")}
                        <FiArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </Link>
                </div>
            </div>

            {/* ---- Bottom signature ---- */}
            <div className="mt-6 flex justify-center">
                <p
                    className={`${styles.fvBrand} inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/80 px-4 py-1.5 text-center text-sm font-normal text-[#0b2545] shadow-sm backdrop-blur-sm`}
                >
                    {t("FluyaVital.footer.creditsLead")}{" "}
                    <Link to="/" className="inline-block transition-opacity hover:opacity-80">
                        <span className="whitespace-nowrap">
                            <span className={`${styles.fvVizoBrand} font-mono font-black lowercase text-primary`}>
                                {t("Common.logoVizo")} {t("Common.logoStudio")}
                            </span>
                        </span>
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default FluyaVitalFooter;
