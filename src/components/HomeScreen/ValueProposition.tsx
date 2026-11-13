// ---------------------------------------------------------------------------
// ValueProposition — "Por qué tener una página web" editorial statement section
// Asymmetric two-column split: high-impact headline (left) paired with
// persuasive copy + CTA (right), revealed via a subtle scroll entrance that
// respects prefers-reduced-motion.
// ---------------------------------------------------------------------------
import { motion, useReducedMotion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import type { IValuePropositionProps } from "../../interfaces/HomeScreenInterface";
import { useScrollToSection } from "../../hooks/useScrollToSection";

/** Editorial exponential ease-out curve (cubic-bezier). */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Subtle vertical spatial travel for the scroll entrance (px). */
const ENTRANCE_TRAVEL = 20;

/** Stagger step (seconds) between the right-column copy blocks. */
const STAGGER_DELAY = 0.08;

/** Single-block fade-up reveal used for the eyebrow and the headline. */
const fadeUpVariants = {
    hidden: { opacity: 0, y: ENTRANCE_TRAVEL },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

/** Parent orchestration for the copy column: stagger its children. */
const copyContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: STAGGER_DELAY,
            delayChildren: 0.15,
        },
    },
};

/** Child copy block: gentle rise + fade with an editorial ease-out. */
const copyItemVariants = {
    hidden: { opacity: 0, y: ENTRANCE_TRAVEL },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

function ValueProposition({ className = "" }: IValuePropositionProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const { scrollToSection } = useScrollToSection();

    return (
        <section
            id="value-proposition"
            className={`w-full bg-black py-24 sm:py-28 lg:py-32 ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Eyebrow / index tag — accent line + uppercase mono label */}
                <motion.div
                    variants={shouldReduceMotion ? undefined : fadeUpVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-primary" />
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
                            {t("HomeScreen.ValueProposition.eyebrow")}
                        </span>
                    </div>
                </motion.div>

                {/* Two-column asymmetric grid */}
                <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
                    {/* Left — high-impact headline */}
                    <motion.div
                        variants={shouldReduceMotion ? undefined : fadeUpVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <h2 className="font-title text-3xl font-bold leading-[1.1] tracking-tight text-balance text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                            {t("HomeScreen.ValueProposition.titleLead")}{" "}
                            <span className="text-neutral-400">
                                {t("HomeScreen.ValueProposition.titleContrast")}
                            </span>
                        </h2>
                    </motion.div>

                    {/* Right — persuasive copy & CTA */}
                    <motion.div
                        variants={
                            shouldReduceMotion ? undefined : copyContainerVariants
                        }
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="font-body lg:col-span-5"
                    >
                        <motion.p
                            variants={
                                shouldReduceMotion ? undefined : copyItemVariants
                            }
                            className="text-pretty text-lg leading-relaxed text-neutral-300"
                        >
                            {t("HomeScreen.ValueProposition.paragraph1")}
                        </motion.p>

                        <motion.p
                            variants={
                                shouldReduceMotion ? undefined : copyItemVariants
                            }
                            className="mt-6 text-pretty text-lg leading-relaxed text-neutral-300"
                        >
                            <Trans
                                i18nKey="HomeScreen.ValueProposition.paragraph2"
                                components={{
                                    brand: (
                                        <span className="font-semibold text-primary" />
                                    ),
                                }}
                            />
                        </motion.p>

                        <motion.p
                            variants={
                                shouldReduceMotion ? undefined : copyItemVariants
                            }
                            className="mt-6 text-pretty text-lg leading-relaxed text-neutral-300"
                        >
                            {t("HomeScreen.ValueProposition.paragraph3")}
                        </motion.p>

                        <motion.div
                            variants={
                                shouldReduceMotion ? undefined : copyItemVariants
                            }
                            className="mt-10"
                        >
                            <button
                                type="button"
                                onClick={() => scrollToSection("services")}
                                className="group inline-flex cursor-pointer items-center gap-2 text-base font-medium text-primary transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-lg"
                            >
                                <span>{t("HomeScreen.ValueProposition.cta")}</span>
                                <FiArrowRight
                                    aria-hidden="true"
                                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ValueProposition;