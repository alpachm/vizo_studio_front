// ---------------------------------------------------------------------------
// FluyaVitalRoulette — Static prize-wheel assembly for the Fluye Vital screen
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGift } from "react-icons/fi";
import type { IFluyaVitalRouletteProps } from "../../interfaces/FluyaVitalInterface";
import RouletteSVG from "../../assets/FluyaVital/SVG/rouletteSVG";
import { useChristmasMode } from "../../hooks/useChristmasMode";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Roulette visual + call-to-action block for the Fluye Vital screen.
 *
 * The unified SVG asset rotates its inner wheel group (driven by the
 * useRoulette hook) while the clapper, frame and lights stay static. An
 * explicit `viewBox` lets it scale proportionally at every breakpoint.
 * On large screens the wheel sits on the left and the CTA copy on the right;
 * on mobile the two blocks stack vertically and centre themselves.
 */
export const FluyaVitalRoulette: React.FC<IFluyaVitalRouletteProps> = ({
    className = "",
    isSpinning,
    rotation,
    selectedPrize,
    hasSpun,
    onSpin,
}) => {
    const { t } = useTranslation();
    const isChristmas = useChristmasMode();

    // The button is locked while the wheel animates or once the user has already
    // participated in single-spin (production) mode.
    const isSpinDisabled = isSpinning || hasSpun;

    // Icon shown next to the prize name in the result box; null before a win.
    const PrizeIcon = selectedPrize?.isPrize ? (selectedPrize.prizeIcon ?? null) : null;

    // Stable key identifying the current result state, driving the entrance/exit
    // animation whenever the resolved prize changes (placeholder → win/loss).
    const resultKey = selectedPrize
        ? selectedPrize.isPrize
            ? `prize-${selectedPrize.prizeNumber ?? 0}`
            : "consolation"
        : "placeholder";

    // Imperative animation controls for the wheel's idle swing. Using controls
    // (rather than a plain `animate` prop) lets us start the repeating loop only
    // while the roulette is idle and stop it deterministically once the user
    // spins, a result resolves or the wheel locks.
    const wheelControls = useAnimationControls();

    // The roulette is in its idle/ready state only before any spin has happened:
    // it is not spinning, the wheel has not been locked by a previous spin and
    // there is no resolved prize yet (so no result modal is showing).
    const isIdle = !isSpinning && !hasSpun && selectedPrize === null;

    useEffect(() => {
        // Play the gentle side-to-side swing, paused 3s between repetitions so
        // the wheel keeps subtly breathing while it waits for the user.
        if (isIdle) {
            void wheelControls.start({
                rotate: [0, -3, 3, -2, 2, 0],
                transition: {
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3,
                },
            });
            return;
        }

        // Once the spin begins (or a previous spin has locked the wheel), freeze
        // the swing back to its resting angle and cancel all pending repetitions.
        wheelControls.stop();
        wheelControls.set({ rotate: 0 });
    }, [isIdle, wheelControls]);

    // Stop the running loop on unmount (e.g. when swapping to PostSpinView) so
    // no animation keeps running against a detached element.
    useEffect(() => {
        return () => {
            wheelControls.stop();
        };
    }, [wheelControls]);

    // ---- Christmas mode visual accents (gated by VITE_CHRISTMAS_MODE) ----
    // The wheel, spin button and result box swap to holiday colours while the
    // rest of the layout, typography and spacing stay untouched.
    const svgGlowClass = isChristmas
        ? "drop-shadow-[0_0_45px_rgba(232,146,40,0.55)]"
        : "drop-shadow-xl";

    const spinButtonThemeClass = isChristmas
        ? "bg-gradient-to-r from-[#D62828] to-[#C0392B] text-white shadow-xl shadow-red-600/40 focus:ring-red-400/60"
        : "bg-gradient-to-r from-[#F2A83B] to-[#FED967] text-[#0b2545] shadow-lg shadow-amber-500/30 focus:ring-amber-300/60";

    const resultBoxThemeClass = isChristmas
        ? "rounded-full border-2 border-dashed border-[#F39C12] bg-orange-50/80 shadow-xl shadow-orange-500/20"
        : "rounded-2xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-900/5";

    const prizeIconThemeClass = isChristmas ? "text-[#E89228]" : "text-[#00b4d8]";

    return (
        <section
            aria-label={t("FluyaVital.roulette.ariaLabel")}
            className={`relative z-10 flex w-full flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row ${className}`}
        >
            {/* ---- Left / desktop: unified static roulette SVG ---- */}
            {/* Periodic idle swing: a subtle side-to-side rotation that hints the */}
            {/* wheel is interactive. It repeats every 3s while the wheel is idle. */}
            <motion.div
                className="flex w-full max-w-md shrink-0 items-center justify-center lg:max-w-lg"
                animate={wheelControls}
            >
                <RouletteSVG
                    viewBox="0 0 512 558"
                    rotation={rotation}
                    isChristmas={isChristmas}
                    className={`h-auto w-full ${svgGlowClass}`}
                />
            </motion.div>

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

                {/* Spin button — triggers the wheel animation via useRoulette */}
                <button
                    type="button"
                    onClick={onSpin}
                    disabled={isSpinDisabled}
                    className={`${styles.fvBrand} mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 sm:text-lg ${spinButtonThemeClass}`}
                >
                    {t(
                        isSpinning
                            ? "FluyaVital.roulette.spinning"
                            : hasSpun
                                ? "FluyaVital.roulette.alreadyParticipated"
                                : "FluyaVital.roulette.spinCta",
                    )}
                </button>

                {/* Prize result box — swaps placeholder → prize name / consolation
                    message with a smooth fade + slide once the spin resolves. */}
                <div
                    role="status"
                    aria-live="polite"
                    className={`mt-6 w-full max-w-sm px-6 py-4 ${resultBoxThemeClass}`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={resultKey}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {PrizeIcon ? (
                                <div className="flex items-center justify-center gap-3">
                                    <PrizeIcon className={`h-6 w-6 shrink-0 ${prizeIconThemeClass}`} aria-hidden="true" />
                                    <p className={`${styles.fvBrand} text-base font-bold text-[#0b2545]`}>
                                        {t(`FluyaVital.prizes.${selectedPrize?.prizeNumber}`)}
                                    </p>
                                </div>
                            ) : (
                                <p
                                    className={`${styles.fvBrand} text-center text-sm font-light text-[#1e6091]`}
                                >
                                    {selectedPrize
                                        ? t(
                                              selectedPrize.isPrize
                                                  ? "FluyaVital.roulette.prizeWon"
                                                  : "FluyaVital.roulette.prizeLost",
                                          )
                                        : t("FluyaVital.roulette.prizePlaceholder")}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FluyaVitalRoulette;
