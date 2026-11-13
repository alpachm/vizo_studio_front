// ---------------------------------------------------------------------------
// Hero — Editorial typewriter hero with a rolling accent word & fixed "?"
// ---------------------------------------------------------------------------
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/** Pause (ms) on the freshly typed accent word before the counter rolls. */
const ROLLING_HOLD_MS = 700;

/** Interval (ms) between each rolling-word swap. */
const ROLLING_STEP_MS = 900;

/**
 * Ordered i18n keys of the rolling accent words. The dynamic slot cycles
 * through these in order and settles permanently on the final one.
 */
const WORD_KEYS = [
    "modern",
    "aesthetic",
    "profitable",
    "selling",
    "competitive",
    "impeccable",
    "attractive",
    "authentic",
    "professional",
] as const;

/**
 * Per-position typography variant for each rolling word (must stay in sync
 * with `WORD_KEYS`). Families alternate between JetBrains Mono (`font-mono`)
 * and Inter (`font-body`), with shifting weight, slant and tracking for an
 * editorial, agency-grade rhythm. Every weight used here is actually shipped
 * by the font imports in `src/index.css`.
 */
const WORD_VARIANTS = [
    "font-mono font-medium", // modern
    "font-body font-normal tracking-wide", // aesthetic
    "font-mono font-bold", // profitable
    "font-body font-medium italic", // selling
    "font-mono font-semibold", // competitive
    "font-mono font-bold", // impeccable
    "font-body font-medium tracking-tight", // attractive
    "font-mono font-medium", // authentic
    "font-mono font-bold", // professional (final)
] as const;

const LAST_WORD_INDEX = WORD_KEYS.length - 1;

function Hero() {
    const { t } = useTranslation();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const { setIsHeroInView } = useHeroVisibility();

    const prefix = t("HomeScreen.Hero.headlinePrefix");
    const suffix = t("HomeScreen.Hero.headlineSuffix");

    const words = useMemo(() => WORD_KEYS.map((key) => t(`HomeScreen.Hero.words.${key}`)), [t]);

    // The typewriter reveals the static prefix first, then the initial accent
    // word, which doubles as the first occupant of the rolling slot.
    const typewriterLines = useMemo(() => [prefix, words[0]], [prefix, words]);

    const {
        displayedLines,
        activeLineIndex,
        isComplete: isTypingComplete,
    } = useTypewriter(typewriterLines, TYPEWRITER_START_DELAY_MS, TYPEWRITER_SPEED_MS);

    // Index of the currently-visible rolling word. Once typing finishes the
    // counter advances one step at a time until it lands on the final word.
    const [wordIndex, setWordIndex] = useState(0);

    // Reduced motion skips the sequence and settles straight on the last word.
    const effectiveWordIndex = shouldReduceMotion ? LAST_WORD_INDEX : wordIndex;

    // Restart the sequence from scratch whenever the language (and therefore
    // the word list) changes. Uses React's documented "adjust state during
    // render" pattern (like `useTypewriter`) instead of an effect so the reset
    // never triggers a cascading render.
    const wordsSignature = words.join("\u0000");
    const [prevWordsSignature, setPrevWordsSignature] = useState(wordsSignature);
    if (prevWordsSignature !== wordsSignature) {
        setPrevWordsSignature(wordsSignature);
        setWordIndex(0);
    }

    // Schedule the rolling counter once the typewriter finishes typing.
    useEffect(() => {
        if (!isTypingComplete || shouldReduceMotion) return;

        const timers: number[] = [];
        for (let index = 1; index <= LAST_WORD_INDEX; index += 1) {
            const delay = ROLLING_HOLD_MS + (index - 1) * ROLLING_STEP_MS;
            timers.push(window.setTimeout(() => setWordIndex(index), delay));
        }

        return () => {
            timers.forEach((id) => window.clearTimeout(id));
        };
    }, [isTypingComplete, shouldReduceMotion]);

    const isSettled = isTypingComplete && effectiveWordIndex === LAST_WORD_INDEX;
    const currentWord = words[effectiveWordIndex];
    const wordVariant = WORD_VARIANTS[effectiveWordIndex];
    const wordColorClass = isSettled ? "text-primary" : "text-white";

    // Blinking block caret shown on whichever line is currently being typed.
    const caret = (
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
            {/* Central message */}
            <h1 className="relative z-10 text-center font-mono font-bold leading-[1.1] tracking-tight text-[clamp(1.25rem,6vw,6.5rem)]">
                {/* Static prefix — line 1 */}
                <span className="block whitespace-nowrap text-white">
                    {displayedLines[0]}
                    {!isTypingComplete && activeLineIndex === 0 && caret}
                </span>

                {/* Rolling accent word + fixed question mark — line 2 */}
                <span className="block whitespace-nowrap text-white">
                    <span className="relative inline-grid whitespace-nowrap align-baseline text-left">
                        {/* Invisible sizers reserve the widest word so the
                            trailing `?` never shifts horizontally. */}
                        {words.map((word, index) => (
                            <span
                                key={`sizer-${index}`}
                                aria-hidden="true"
                                className={`invisible col-start-1 row-start-1 whitespace-nowrap ${WORD_VARIANTS[index]}`}
                            >
                                {word}
                            </span>
                        ))}

                        {isTypingComplete ? (
                            <AnimatePresence initial={false}>
                                <motion.span
                                    key={currentWord}
                                    className={`col-start-1 row-start-1 whitespace-nowrap ${wordVariant} ${wordColorClass}`}
                                    initial={{ opacity: 0.35, y: "100%" }}
                                    animate={{ opacity: 1, y: "0%" }}
                                    exit={{ opacity: 0, y: "-100%" }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.45,
                                        ease: EASE_OUT,
                                    }}
                                >
                                    {isSettled ? (
                                        <motion.span
                                            animate={
                                                shouldReduceMotion
                                                    ? { opacity: 1 }
                                                    : { opacity: [1, 0.45, 1] }
                                            }
                                            transition={{
                                                duration: 1.7,
                                                times: [0, 0.5, 1],
                                                repeat: shouldReduceMotion ? 0 : Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="inline-block"
                                        >
                                            {currentWord}
                                        </motion.span>
                                    ) : (
                                        currentWord
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        ) : (
                            <span
                                className={`col-start-1 row-start-1 whitespace-nowrap ${WORD_VARIANTS[0]}`}
                            >
                                {displayedLines[1]}
                                {activeLineIndex === 1 && caret}
                            </span>
                        )}
                    </span>

                    <span>{suffix}</span>
                </span>
            </h1>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10">
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isTypingComplete ? 1 : 0,
                        y: isTypingComplete ? 0 : 16,
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
