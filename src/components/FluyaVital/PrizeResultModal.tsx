// ---------------------------------------------------------------------------
// PrizeResultModal — Result modal shown after the Fluye Vital wheel stops
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { FiCheck, FiGift, FiStar, FiX } from "react-icons/fi";
import type { IPrizeResultModalProps } from "../../interfaces/FluyaVitalInterface";
import styles from "../../screens/FluyaVital.module.css";

/**
 * Self-contained entrance keyframes for the backdrop (fade) and the floating
 * card (pop/scale). Kept inline so the modal stays isolated from the global
 * Tailwind config, mirroring the pattern used by the roulette SVG asset.
 */
const MODAL_KEYFRAMES = `
@keyframes prize-modal-fade {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes prize-modal-pop {
    from { opacity: 0; transform: translateY(16px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
`;

/**
 * Centered result dialog for the Fluye Vital prize wheel. The winning layout is
 * always a celebratory yellow badge + prize name + claim instruction. The
 * non-winning layout is always conclusive: a neutral consolation icon,
 * "thanks for playing" copy and a "close" CTA that dismisses the modal and
 * advances the flow into the post-spin view.
 *
 * Closes on the X button, a backdrop click, the Escape key or the primary CTA.
 */
export const PrizeResultModal: React.FC<IPrizeResultModalProps> = ({
    isOpen,
    onClose,
    prize,
    isWinner,
}) => {
    const { t } = useTranslation();

    // Escape-to-close + body scroll lock while the modal is open.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Celebratory confetti — fires exactly once whenever a winning modal opens.
    useEffect(() => {
        if (!isOpen || !isWinner) return;

        // Project palette: navy, blue, cyan, amber, yellow + white.
        const PALETTE = ["#0b2545", "#1e6091", "#00b4d8", "#F2A83B", "#FED967", "#ffffff"];

        // Central burst over the prize card for an immediate celebration.
        confetti({
            particleCount: 140,
            spread: 120,
            startVelocity: 40,
            origin: { x: 0.5, y: 0.55 },
            colors: PALETTE,
            disableForReducedMotion: true,
        });

        // Gentle side cannons for a couple of seconds for a fuller effect.
        const end = Date.now() + 2200;
        let frameId = 0;

        const sideBurst = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                startVelocity: 55,
                origin: { x: 0, y: 0.7 },
                colors: PALETTE,
                disableForReducedMotion: true,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                startVelocity: 55,
                origin: { x: 1, y: 0.7 },
                colors: PALETTE,
                disableForReducedMotion: true,
            });

            if (Date.now() < end) {
                frameId = requestAnimationFrame(sideBurst);
            }
        };

        frameId = requestAnimationFrame(sideBurst);

        // Clear any in-flight frames and leftover particles when closing.
        return () => {
            cancelAnimationFrame(frameId);
            confetti.reset();
        };
    }, [isOpen, isWinner]);

    if (!isOpen) return null;

    const prizeNumber = prize?.prizeNumber ?? 1;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t("FluyaVital.modal.ariaLabel")}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0b2545]/70 px-4 py-8 backdrop-blur-sm"
            style={{ animation: "prize-modal-fade 0.25s ease-out" }}
            onClick={onClose}
        >
            <style>{MODAL_KEYFRAMES}</style>

            {/* ---- Floating card ---- */}
            <div
                onClick={(event) => event.stopPropagation()}
                className={`${styles.fvBrand} relative w-full max-w-md rounded-3xl border border-white/70 bg-white p-6 text-center shadow-[0_24px_80px_rgba(11,37,69,0.45)] sm:p-10`}
                style={{ animation: "prize-modal-pop 0.3s cubic-bezier(0.15, 0.95, 0.25, 1)" }}
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t("FluyaVital.modal.close")}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#0b2545] transition-colors duration-200 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-[#00b4d8]/40"
                >
                    <FiX className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Featured icon — yellow/orange for prizes, cool slate otherwise */}
                <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${
                        isWinner
                            ? "bg-gradient-to-br from-[#F2A83B] to-[#FED967] text-[#0b2545] shadow-amber-500/30"
                            : "bg-gradient-to-br from-slate-400 to-slate-200 text-[#0b2545] shadow-slate-400/30"
                    }`}
                >
                    {isWinner ? (
                        <FiGift className="h-9 w-9" aria-hidden="true" />
                    ) : (
                        <FiStar className="h-9 w-9" aria-hidden="true" />
                    )}
                </div>

                {/* Eyebrow */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm">
                    {t(
                        isWinner
                            ? "FluyaVital.modal.winnerEyebrow"
                            : "FluyaVital.modal.noPrizeEyebrow",
                    )}
                </p>

                {/* Dynamic main title */}
                <h2 className={`${styles.fvBrand} mt-4 text-3xl font-black leading-tight text-[#0b2545] sm:text-4xl`}>
                    {isWinner
                        ? t("FluyaVital.modal.winnerTitle", { number: prizeNumber })
                        : t("FluyaVital.modal.noPrizeTitle")}
                </h2>

                {/* Supporting description */}
                <p className="mt-4 text-base font-light leading-relaxed text-[#1e6091] sm:text-lg">
                    {t(
                        isWinner
                            ? "FluyaVital.modal.winnerDescription"
                            : "FluyaVital.modal.noPrizeDescription",
                    )}
                </p>

                {/* Instruction pill — winners only */}
                {isWinner && (
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00b4d8]/10 px-5 py-2.5 text-sm font-semibold text-[#0b2545]">
                        <FiCheck className="h-4 w-4 shrink-0 text-[#00b4d8]" aria-hidden="true" />
                        {t("FluyaVital.modal.winnerInstruction")}
                    </div>
                )}

                {/* Primary CTA */}
                <button
                    type="button"
                    onClick={onClose}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 active:scale-95 sm:text-lg ${
                        isWinner
                            ? "bg-gradient-to-r from-[#F2A83B] to-[#FED967] text-[#0b2545] shadow-lg shadow-amber-500/30 focus:ring-amber-300/60"
                            : "bg-slate-200 text-[#0b2545] shadow-lg shadow-slate-400/20 hover:bg-slate-300 focus:ring-slate-400/40"
                    }`}
                >
                    {t(
                        isWinner
                            ? "FluyaVital.modal.winnerCta"
                            : "FluyaVital.modal.noPrizeCta",
                    )}
                </button>
            </div>
        </div>
    );
};

export default PrizeResultModal;
