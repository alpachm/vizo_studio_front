// ---------------------------------------------------------------------------
// FluyaVitalFooter — Collaboration credits & CTA banner for the Fluye Vital screen
// ---------------------------------------------------------------------------
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type { IFluyaVitalFooterProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Crisp black outline applied to the white "Vizo" word so it stays legible
 * against the white floating card (mirrors the header brand lockup).
 */
const VIZO_OUTLINE_STYLE: React.CSSProperties = {
    color: "#ffffff",
    WebkitTextStroke: "1.5px #000000",
    paintOrder: "stroke fill",
};

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
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-900/5 md:p-10">
                {/* Eyebrow */}
                <p
                    className={`${styles.fvBrand} text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm`}
                >
                    {t("FluyaVital.footer.overline")}
                </p>

                {/* Main description */}
                <p
                    className={`${styles.fvBrand} mt-4 max-w-3xl text-base font-light leading-relaxed text-[#1e6091] sm:text-lg`}
                >
                    {t("FluyaVital.footer.descriptionLead")}{" "}
                    <span className="font-bold" style={VIZO_OUTLINE_STYLE}>
                        {t("Common.logoVizo")}
                    </span>{" "}
                    <span className="font-bold text-[#d97706]">{t("Common.logoStudio")}</span>{" "}
                    {t("FluyaVital.footer.descriptionAfter")}
                </p>

                {/* Action button — right-aligned on desktop, centered on mobile */}
                <div className="mt-7 flex justify-center lg:justify-end">
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
            <p
                className={`${styles.fvBrand} mt-6 text-center text-sm font-light text-[#0b2545]/70`}
            >
                {t("FluyaVital.footer.creditsLead")}{" "}
                <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                    <span className="whitespace-nowrap">
                        <span className="font-black" style={VIZO_OUTLINE_STYLE}>
                            {t("Common.logoVizo")}
                        </span>{" "}
                        <span className="font-black text-[#d97706]">{t("Common.logoStudio")}</span>
                    </span>
                </Link>
            </p>
        </footer>
    );
};

export default FluyaVitalFooter;
