// ---------------------------------------------------------------------------
// Methodology — "Nuestra Metodología" process section for the Home screen
// Editorial split-layout: intro column (left) paired with a vertical
// architectural step list (right). Steps reveal with a staggered scroll
// entrance via framer-motion, respecting prefers-reduced-motion.
// ---------------------------------------------------------------------------
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type {
    IMethodologyProps,
    IMethodologyStep,
} from "../../interfaces/HomeScreenInterface";

/** Editorial exponential ease-out curve (cubic-bezier). */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Stagger step (seconds): each step reveals ~70ms after the previous one. */
const STAGGER_DELAY = 0.07;

/** Subtle vertical spatial travel for the entrance (px). */
const ENTRANCE_TRAVEL = 20;

/** The four sequential process steps. Titles/descriptions live in i18n. */
const METHODOLOGY_STEPS: IMethodologyStep[] = [
    {
        id: "discovery",
        number: "01",
        titleKey: "HomeScreen.Methodology.steps.discovery.title",
        descriptionKey: "HomeScreen.Methodology.steps.discovery.description",
    },
    {
        id: "development",
        number: "02",
        titleKey: "HomeScreen.Methodology.steps.development.title",
        descriptionKey: "HomeScreen.Methodology.steps.development.description",
    },
    {
        id: "qa",
        number: "03",
        titleKey: "HomeScreen.Methodology.steps.qa.title",
        descriptionKey: "HomeScreen.Methodology.steps.qa.description",
    },
    {
        id: "support",
        number: "04",
        titleKey: "HomeScreen.Methodology.steps.support.title",
        descriptionKey: "HomeScreen.Methodology.steps.support.description",
    },
];

/** Parent orchestration: fade the list in and stagger its children. */
const listVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: STAGGER_DELAY,
            delayChildren: 0.1,
        },
    },
};

/** Child step: gentle rise + fade with an editorial ease-out. */
const stepVariants = {
    hidden: { opacity: 0, y: ENTRANCE_TRAVEL },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

/** Single-block reveal used for the intro column. */
const fadeUpVariants = {
    hidden: { opacity: 0, y: ENTRANCE_TRAVEL },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

function Methodology({ className = "" }: IMethodologyProps) {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <section id="methodology" className={`w-full bg-bg py-24 sm:py-28 ${className}`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
                    {/* -------------------------------------------------- */}
                    {/* Left — intro column                               */}
                    {/* -------------------------------------------------- */}
                    <div className="lg:col-span-5">
                        <motion.div
                            variants={shouldReduceMotion ? undefined : fadeUpVariants}
                            initial={shouldReduceMotion ? false : "hidden"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <p className="text-xs font-medium uppercase tracking-widest text-primary">
                                {t("HomeScreen.Methodology.eyebrow")}
                            </p>
                            <h2 className="mt-4 font-title text-3xl font-bold leading-[1.1] tracking-tight text-text sm:text-4xl lg:text-5xl">
                                {t("HomeScreen.Methodology.title")}
                            </h2>
                            <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-muted">
                                {t("HomeScreen.Methodology.intro")}
                            </p>
                        </motion.div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Right — vertical architectural step list          */}
                    {/* -------------------------------------------------- */}
                    <motion.ol
                        className="border-t border-neutral-500/20 lg:col-span-7"
                        variants={shouldReduceMotion ? undefined : listVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {METHODOLOGY_STEPS.map((step) => (
                            <motion.li
                                key={step.id}
                                variants={shouldReduceMotion ? undefined : stepVariants}
                                className="group grid grid-cols-[auto_1fr] gap-x-6 border-b border-neutral-500/20 py-8 transition-colors duration-200 hover:border-neutral-300/40 hover:bg-neutral-500/5 sm:gap-x-10 sm:py-10"
                            >
                                <span className="pt-1.5 font-mono text-sm leading-none tracking-[0.3em] text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary">
                                    {step.number}
                                </span>
                                <div>
                                    <h3 className="font-title text-xl font-bold leading-tight tracking-tight text-text sm:text-2xl">
                                        {t(step.titleKey)}
                                    </h3>
                                    <p className="mt-3 max-w-prose text-base leading-relaxed text-text-muted sm:text-lg">
                                        {t(step.descriptionKey)}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
}

export default Methodology;