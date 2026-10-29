// ---------------------------------------------------------------------------
// FluyaVitalHeader — Brand header for the Fluye Vital standalone screen
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import type { IFluyaVitalHeaderProps } from "../../interfaces/FluyaVitalInterface";
import fluyaVitalLogo from "../../assets/FluyaVital/fluyta-vital-logo.png";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Crisp black outline applied to the white "Vizo" word so it remains legible
 * against the light Fluye Vital background.
 */
const VIZO_OUTLINE_STYLE: React.CSSProperties = {
    color: "#ffffff",
    WebkitTextStroke: "1.5px #000000",
    paintOrder: "stroke fill",
};

export const FluyaVitalHeader: React.FC<IFluyaVitalHeaderProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        <header
            aria-label={t("FluyaVital.header.ariaLabel")}
            className={`relative z-10 w-full bg-transparent ${className}`}
        >
            <div className="flex flex-row items-center justify-center gap-2 py-3 sm:flex-row sm:justify-start sm:gap-4 sm:py-6 lg:gap-6">
                {/* ---- Vizo Studio brand ---- */}
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <span
                        className={`${styles.fvBrand} text-lg font-black leading-none sm:text-2xl lg:text-3xl`}
                        style={VIZO_OUTLINE_STYLE}
                    >
                        {t("Common.logoVizo")}
                    </span>
                    <span
                        className={`${styles.fvBrand} text-lg font-black leading-none text-[#d97706] sm:text-2xl lg:text-3xl`}
                    >
                        {t("Common.logoStudio")}
                    </span>
                </div>

                {/* ---- Collaboration plus ---- */}
                <FiPlus
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-sky-900/50 sm:h-6 sm:w-6"
                    strokeWidth={3}
                />

                {/* ---- Fluye Vital brand ---- */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <img
                        src={fluyaVitalLogo}
                        alt={t("FluyaVital.header.logoAlt")}
                        className="h-8 w-auto object-contain sm:h-10 lg:h-12"
                    />
                    <span
                        className={`${styles.fvBrand} flex items-baseline gap-1.5 leading-none sm:gap-2`}
                    >
                        <span className="text-lg font-black text-[#0b2545] sm:text-2xl lg:text-3xl">
                            {t("FluyaVital.header.fluye")}
                        </span>
                        <span className="text-lg font-light text-[#0b2545] sm:text-2xl lg:text-3xl">
                            {t("FluyaVital.header.vital")}
                        </span>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default FluyaVitalHeader;
