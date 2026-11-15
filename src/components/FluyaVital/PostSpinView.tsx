// ---------------------------------------------------------------------------
// PostSpinView — Google Maps 5-star review invitation shown after the spin
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiArrowUpRight, FiStar } from "react-icons/fi";
import type { IPostSpinViewProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

/** Direct Google Maps place link where visitors can leave a 5-star review. */
const GOOGLE_MAPS_REVIEW_URL =
    "https://www.google.com/maps/place/Fluya+vital/@11.412017,-69.6605292,17z/data=!4m8!3m7!1s0x8e842beccd3efabb:0xb26f0c2c04038b4e!8m2!3d11.412017!4d-69.6579489!9m1!1b1!16s%2Fg%2F11z7fk4mg4?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D";

const STAR_INDICES = [0, 1, 2, 3, 4];

/**
 * Post-spin view that invites the user to rate Fluya Vital with 5 stars and
 * leave a positive comment on Google Maps, or return to the roulette.
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
            <div className="flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/80 bg-white/85 p-8 shadow-xl shadow-sky-950/10 backdrop-blur-md sm:p-12">
                {/* Eyebrow pill */}
                <p
                    className={`${styles.fvBrand} inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/25 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#1e6091] shadow-sm sm:text-sm`}
                >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#00b4d8]" aria-hidden="true" />
                    {t("FluyaVital.postSpin.eyebrow")}
                </p>

                {/* 5-star visual cue */}
                <div
                    role="img"
                    aria-label={t("FluyaVital.postSpin.starsAriaLabel")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50/90 px-5 py-2.5 shadow-sm ring-1 ring-amber-200/70"
                >
                    {STAR_INDICES.map((index) => (
                        <FiStar
                            key={index}
                            aria-hidden="true"
                            className="h-6 w-6 fill-[#F2A83B] text-[#F2A83B] sm:h-7 sm:w-7"
                        />
                    ))}
                </div>

                {/* Brand accent divider */}
                <div className={`${styles.fvAccent} mx-auto my-6`} aria-hidden="true" />

                {/* Main headline */}
                <h1
                    className={`${styles.fvBrand} max-w-xl text-3xl font-black leading-tight text-[#0b2545] sm:text-4xl lg:text-5xl`}
                >
                    {t("FluyaVital.postSpin.headline")}
                </h1>

                {/* Supporting text */}
                <p
                    className={`${styles.fvBrand} mt-5 max-w-lg text-base font-light leading-relaxed text-[#1e6091] sm:text-lg`}
                >
                    {t("FluyaVital.postSpin.description")}
                </p>

                {/* Action buttons */}
                <div className="mt-9 flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                    {/* Primary CTA — open Google Maps review page */}
                    <a
                        href={GOOGLE_MAPS_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.fvBrand} inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F2A83B] to-[#FED967] px-7 py-4 text-base font-bold text-[#0b2545] shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-300/60 active:scale-95 sm:w-auto sm:text-lg`}
                    >
                        {t("FluyaVital.postSpin.reviewCta")}
                        <FiArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </a>

                    {/* Secondary CTA — return to the roulette */}
                    <button
                        type="button"
                        onClick={onBackToRoulette}
                        className={`${styles.fvBrand} inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0b2545] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#0b2545]/30 transition-all duration-200 hover:scale-[1.03] hover:bg-[#1e6091] focus:outline-none focus:ring-4 focus:ring-[#00b4d8]/40 active:scale-95 sm:w-auto sm:text-lg`}
                    >
                        <FiArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
                        {t("FluyaVital.postSpin.backCta")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PostSpinView;
