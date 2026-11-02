// ---------------------------------------------------------------------------
// PrizeResultModal — Result modal shown after the Fluye Vital wheel stops
// ---------------------------------------------------------------------------
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiGift, FiRefreshCw, FiX } from "react-icons/fi";
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
 * Centered result dialog for the Fluye Vital prize wheel. Renders a winning
 * layout (celebratory yellow badge + prize name + claim instruction) or an
 * encouraging non-winning layout depending on `isWinner`. Closes on the X
 * button, a backdrop click or the Escape key; the non-winning CTA can also
 * re-spin through the optional `onRetry` handler.
 */
export const PrizeResultModal: React.FC<IPrizeResultModalProps> = ({
    isOpen,
    onClose,
    prize,
    isWinner,
    onRetry,
}) => {
    const { t } = useTranslation();

    const handlePrimaryAction = useCallback(() => {
        if (isWinner) {
            onClose();
            return;
        }
        (onRetry ?? onClose)();
    }, [isWinner, onClose, onRetry]);

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

                {/* Featured icon — yellow/orange for prizes, cool cyan otherwise */}
                <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${
                        isWinner
                            ? "bg-gradient-to-br from-[#F2A83B] to-[#FED967] text-[#0b2545] shadow-amber-500/30"
                            : "bg-gradient-to-br from-[#00b4d8] to-[#90e0ef] text-[#0b2545] shadow-cyan-500/30"
                    }`}
                >
                    {isWinner ? (
                        <FiGift className="h-9 w-9" aria-hidden="true" />
                    ) : (
                        <FiRefreshCw className="h-9 w-9" aria-hidden="true" />
                    )}
                </div>

                {/* Eyebrow */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#1e6091] sm:text-sm">
                    {t(isWinner ? "FluyaVital.modal.winnerEyebrow" : "FluyaVital.modal.loserEyebrow")}
                </p>

                {/* Dynamic main title */}
                <h2 className={`${styles.fvBrand} mt-4 text-3xl font-black leading-tight text-[#0b2545] sm:text-4xl`}>
                    {isWinner
                        ? t("FluyaVital.modal.winnerTitle", { number: prizeNumber })
                        : t("FluyaVital.modal.loserTitle")}
                </h2>

                {/* Supporting description */}
                <p className="mt-4 text-base font-light leading-relaxed text-[#1e6091] sm:text-lg">
                    {t(isWinner ? "FluyaVital.modal.winnerDescription" : "FluyaVital.modal.loserDescription")}
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
                    onClick={handlePrimaryAction}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 active:scale-95 sm:text-lg ${
                        isWinner
                            ? "bg-gradient-to-r from-[#F2A83B] to-[#FED967] text-[#0b2545] shadow-lg shadow-amber-500/30 focus:ring-amber-300/60"
                            : "bg-[#0b2545] text-white shadow-lg shadow-[#0b2545]/30 hover:bg-[#1e6091] focus:ring-[#00b4d8]/40"
                    }`}
                >
                    {t(isWinner ? "FluyaVital.modal.winnerCta" : "FluyaVital.modal.loserCta")}
                </button>
            </div>
        </div>
    );
};

export default PrizeResultModal;
