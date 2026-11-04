// ---------------------------------------------------------------------------
// FluyaVital — Standalone screen with layered water background
// ---------------------------------------------------------------------------
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";
import Wave1 from "../assets/FluyaVital/SVG/wave-1";
import Wave2 from "../assets/FluyaVital/SVG/wave-2";
import styles from "./FluyaVital.module.css";
import Header from "../components/FluyaVital/Header";
import Hero from "../components/FluyaVital/Hero";
import FluyaVitalRoulette from "../components/FluyaVital/Roulette";
import PrizeResultModal from "../components/FluyaVital/PrizeResultModal";
import PostSpinView from "../components/FluyaVital/PostSpinView";
import Footer from "../components/FluyaVital/Footer";
import { useRoulette } from "../hooks/useRoulette";
import { ALLOW_MULTIPLE_SPINS } from "../utils/featureFlags";

/** Shared easing curve for the roulette ↔ post-spin view swap. */
const VIEW_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** Fade + subtle vertical slide transition between the two main views. */
const viewVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: VIEW_EASE },
    },
    exit: {
        opacity: 0,
        y: -24,
        transition: { duration: 0.3, ease: VIEW_EASE },
    },
};

export const FluyaVital: React.FC<IFluyaVitalProps> = () => {
    const { isSpinning, rotation, selectedPrize, hasSpun, spinWheel, resetRoulette } = useRoulette();
    const [hasDismissed, setHasDismissed] = useState(false);
    const [showPostSpin, setShowPostSpin] = useState(false);

    // The modal is open whenever a result is available and hasn't been
    // dismissed yet. Deriving this avoids a setState-in-effect.
    const isModalOpen = selectedPrize !== null && !hasDismissed;

    // Closing the result modal advances the flow into the post-spin view.
    const handleClose = useCallback(() => {
        setHasDismissed(true);
        setShowPostSpin(true);
    }, []);

    // Resets the dismissed flag before starting a new spin (also used as the
    // modal's "try again" action, since spinWheel clears selectedPrize).
    const handleSpin = useCallback(() => {
        setHasDismissed(false);
        setShowPostSpin(false);
        spinWheel();
    }, [spinWheel]);

    // Returns from the post-spin view to the roulette, resetting the wheel.
    const handleBackToRoulette = useCallback(() => {
        setHasDismissed(false);
        setShowPostSpin(false);
        resetRoulette();
    }, [resetRoulette]);

    return (
        <div
            className={`${styles.fvContainer} relative flex min-h-screen w-full flex-col overflow-hidden bg-sky-50 text-sky-950`}
        >
            {/* Vista principal intercambiable — ruleta ↔ post-spin */}
            <AnimatePresence mode="wait">
                {!showPostSpin ? (
                    <motion.div
                        key="roulette"
                        variants={viewVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative z-10 w-full"
                    >
                        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            <Header />
                            <Hero className="mt-8 sm:mt12 lg:mt-12" />
                            <FluyaVitalRoulette
                                isSpinning={isSpinning}
                                rotation={rotation}
                                selectedPrize={selectedPrize}
                                hasSpun={hasSpun}
                                onSpin={handleSpin}
                            />
                            <Footer className="mt-16 sm:mt-20" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="postSpin"
                        variants={viewVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative z-10 w-full"
                    >
                        <PostSpinView onBackToRoulette={handleBackToRoulette} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fondo de Agua — olas SVG apiladas (de atrás hacia delante).
                Contenedor fijo al viewport (fixed inset-0) para que las olas
                permanezcan ancladas al fondo durante el scroll. overflow-hidden
                recorta el sobredimensionado de las olas y evita scrollbars
                horizontales; pointer-events-none impide bloquear la interacción. */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            >
                <Wave1
                    className="pointer-events-none absolute bottom-0 left-[-10%] block h-auto w-[120%] will-change-transform animate-wave-drift-left"
                    style={{ animationDuration: "3.5s" }}
                />
                <Wave2
                    className="pointer-events-none absolute bottom-0 left-[-10%] block h-auto w-[120%] will-change-transform animate-wave-drift-right"
                    style={{ animationDuration: "2s" }}
                />
            </div>

            {/* Resultado del giro — se abre automáticamente al terminar la animación */}
            <PrizeResultModal
                isOpen={isModalOpen}
                onClose={handleClose}
                prize={selectedPrize}
                isWinner={selectedPrize?.isPrize ?? false}
                onRetry={handleSpin}
                allowMultipleSpins={ALLOW_MULTIPLE_SPINS}
            />
        </div>
    );
};

export default FluyaVital;
