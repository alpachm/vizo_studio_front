// ---------------------------------------------------------------------------
// Hero — Minimal, full-screen typewriter hero for the Home screen
// ---------------------------------------------------------------------------
import { useLayoutEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiArrowDown } from "react-icons/fi";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useHeroVisibility } from "../../context/HeroVisibilityContext";

/** Editorial exponential ease-out curve used for reveals. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Delay (ms) before the typewriter starts typing. */
const TYPEWRITER_START_DELAY_MS = 300;

/** Interval (ms) between each typed character. */
const TYPEWRITER_SPEED_MS = 55;

/** Per-line color treatment: line 0 white, line 1 brand primary (--color-primary). */
const LINE_CLASS_NAMES = ["text-white", "text-primary"] as const;

function Hero() {
    const { t } = useTranslation();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const { setIsHeroInView } = useHeroVisibility();

    // Two-line display heading — source of truth lives in i18n.
    const headingLines = useMemo(
        () => [t("HomeScreen.Hero.headingLine1"), t("HomeScreen.Hero.headingLine2")],
        [t],
    );

    const { displayedLines, activeLineIndex, isComplete } = useTypewriter(
        headingLines,
        TYPEWRITER_START_DELAY_MS,
        TYPEWRITER_SPEED_MS,
    );

    // Report visibility upward so the global Header & FloatingButtons can step
    // aside while the hero occupies the viewport. A synchronous first evaluation
    // (inside useLayoutEffect, before paint) prevents a one-frame flash on load.
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const applyVisibility = (isInView: boolean) => setIsHeroInView(isInView);

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rect = section.getBoundingClientRect();
        applyVisibility(rect.bottom > 0 && rect.top < viewportHeight);

        const observer = new IntersectionObserver(
            ([entry]) => applyVisibility(entry.isIntersecting),
            { threshold: 0 },
        );
        observer.observe(section);

        return () => {
            observer.disconnect();
            setIsHeroInView(false);
        };
    }, [setIsHeroInView]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
        >
            {/* Ambient brand glow — soft blurred breathing pulse behind the
                message. Uses the canonical `bg-primary` token at low opacities
                (≈15% peak) so it stays theme-aware and renders reliably. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            >
                <motion.div
                    initial={false}
                    animate={
                        shouldReduceMotion
                            ? { opacity: 0.12, scale: 1 }
                            : {
                                  opacity: [0.06, 0.14, 0.06],
                                  scale: [1, 1.06, 1],
                              }
                    }
                    transition={{
                        duration: 6,
                        repeat: shouldReduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-[380px] w-[380px] rounded-full bg-primary blur-[120px] will-change-[opacity,transform] sm:h-[540px] sm:w-[540px]"
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
                                animate={shouldReduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
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
                            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
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
