// ---------------------------------------------------------------------------
// FluyaVital — Standalone screen with layered water background
// ---------------------------------------------------------------------------
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";
import Wave1 from "../assets/FluyaVital/SVG/wave-1";
import Wave2 from "../assets/FluyaVital/SVG/wave-2";
import Garland from "../assets/FluyaVital/SVG/garland";
import GarlandMobile from "../assets/FluyaVital/SVG/garlant-mobile";
import styles from "./FluyaVital.module.css";
import Header from "../components/FluyaVital/Header";
import Hero from "../components/FluyaVital/Hero";
import FluyaVitalRoulette from "../components/FluyaVital/Roulette";
import PrizeResultModal from "../components/FluyaVital/PrizeResultModal";
import PostSpinView from "../components/FluyaVital/PostSpinView";
import Footer from "../components/FluyaVital/Footer";
import { useChristmasMode } from "../hooks/useChristmasMode";
import { useRoulette } from "../hooks/useRoulette";

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
    const { isSpinning, rotation, selectedPrize, hasSpun, spinWheel, resetRoulette } =
        useRoulette();
    const isChristmas = useChristmasMode();
    // A result restored from localStorage (single-spin reload) is treated as
    // already dismissed so the result modal does not auto-open over the display.
    const [hasDismissed, setHasDismissed] = useState(selectedPrize !== null);
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

    // Returns from the post-spin view to the roulette. The result modal stays
    // dismissed: in single-spin mode a restored result is re-shown (never a new
    // one), and in test mode the wheel starts clean for the next spin.
    const handleBackToRoulette = useCallback(() => {
        setHasDismissed(true);
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

            {/* Guirnalda navideña — banner decorativo fijo en la parte superior,
                detrás del contenido interactivo (rueda, texto). Se monta solo
                cuando el Modo Navidad está activo (CHRISTMAS_MODE). La variante
                móvil se muestra en pantallas pequeñas (md:hidden) y la de
                escritorio a partir del breakpoint md (md:block); overflow-hidden
                evita cualquier desbordamiento horizontal. */}
            {isChristmas && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none fixed top-0 left-0 z-0 w-full overflow-hidden"
                >
                    <GarlandMobile
                        className="pointer-events-none block h-auto w-full md:hidden"
                        viewBox="0 0 586 133"
                        preserveAspectRatio="xMidYMin slice"
                    />
                    <Garland
                        className="pointer-events-none hidden h-auto w-full md:block"
                        viewBox="0 0 1112 155"
                        preserveAspectRatio="xMidYMin slice"
                    />
                </div>
            )}

            {/* Resultado del giro — se abre automáticamente al terminar la animación */}
            <PrizeResultModal
                isOpen={isModalOpen}
                onClose={handleClose}
                prize={selectedPrize}
                isWinner={selectedPrize?.isPrize ?? false}
            />
        </div>
    );
};

export default FluyaVital;
