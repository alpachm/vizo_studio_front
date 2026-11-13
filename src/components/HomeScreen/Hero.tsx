// ---------------------------------------------------------------------------
// Hero — Minimal, full-screen typewriter hero for the Home screen
// ---------------------------------------------------------------------------
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiArrowDown } from "react-icons/fi";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useTypewriter } from "../../hooks/useTypewriter";

/** Editorial exponential ease-out curve used for reveals. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Delay (ms) before the typewriter starts typing. */
const TYPEWRITER_START_DELAY_MS = 300;

/** Interval (ms) between each typed character. */
const TYPEWRITER_SPEED_MS = 55;

/** Per-line color treatment: line 0 white, line 1 brand orange (#F96316). */
const LINE_CLASS_NAMES = ["text-white", "text-[#F96316]"] as const;

function Hero() {
    const { t } = useTranslation();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    // Two-line display heading — source of truth lives in i18n.
    const headingLines = useMemo(
        () => [
            t("HomeScreen.Hero.headingLine1"),
            t("HomeScreen.Hero.headingLine2"),
        ],
        [t],
    );

    const { displayedLines, activeLineIndex, isComplete } = useTypewriter(
        headingLines,
        TYPEWRITER_START_DELAY_MS,
        TYPEWRITER_SPEED_MS,
    );

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
            {/* Ambient brand glow — soft blurred pulse behind the message */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={
                        shouldReduceMotion
                            ? { opacity: 0.4, scale: 1 }
                            : {
                                  opacity: [0.4, 0.58, 0.4],
                                  scale: [1, 1.06, 1],
                              }
                    }
                    transition={{
                        duration: 5.5,
                        repeat: shouldReduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-[380px] w-[380px] rounded-full bg-[#F96316]/15 blur-[120px] will-change-transform sm:h-[540px] sm:w-[540px]"
                />
            </div>

            {/* Central message */}
            <h1 className="relative z-10 text-center font-mono font-bold leading-[1.1] tracking-tight text-[clamp(1.25rem,6vw,6.5rem)]">
                {headingLines.map((line, index) => (
                    <span
                        key={line}
                        className={`block whitespace-nowrap ${LINE_CLASS_NAMES[index]}`}
                    >
                        {displayedLines[index]}
                        {index === activeLineIndex && (
                            <motion.span
                                aria-hidden="true"
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : { opacity: [1, 1, 0, 0] }
                                }
                                transition={{
                                    duration: 1.1,
                                    times: [0, 0.5, 0.5, 1],
                                    repeat: shouldReduceMotion ? 0 : Infinity,
                                }}
                                className="ml-1.5 inline-block h-[0.9em] w-[0.08em] bg-current align-baseline"
                            />
                        )}
                    </span>
                ))}
            </h1>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10">
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isComplete ? 1 : 0,
                        y: isComplete ? 0 : 16,
                    }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.6,
                        ease: EASE_OUT,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => scrollToSection("services")}
                        aria-label={t("HomeScreen.Hero.scrollPrompt")}
                        className="group flex cursor-pointer flex-col items-center gap-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-300 focus-visible:text-neutral-300 focus-visible:outline-none"
                    >
                        <span className="text-xs font-medium uppercase tracking-widest">
                            {t("HomeScreen.Hero.scrollPrompt")}
                        </span>
                        <motion.span
                            aria-hidden="true"
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: [0, 6, 0] }
                            }
                            transition={{
                                duration: 1.6,
                                repeat: shouldReduceMotion ? 0 : Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-xl leading-none"
                        >
                            <FiArrowDown />
                        </motion.span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
