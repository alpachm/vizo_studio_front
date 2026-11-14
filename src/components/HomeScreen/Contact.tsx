// ---------------------------------------------------------------------------
// Contact — Two-column editorial contact section with multi-step card
// ---------------------------------------------------------------------------
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import type {
    ContactFormData,
    IContactProps,
    IContactQuestionnaireAnswers,
    TContactStep,
} from "../../interfaces/HomeScreenInterface";
import { ContactStep } from "../../interfaces/HomeScreenInterface";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { submitContact } from "../../services/contactService";
import Step2 from "./Contact/Step2";
import Step3 from "./Contact/Step3";
import Step4 from "./Contact/Step4";

/** Custom cubic-bezier easing for a natural slide feel */
const EASE_CUBIC = [0.25, 1, 0.5, 1] as const;

/** Direction-aware step transition variants inside the right-hand card */
const pageVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 32 : -32,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.32,
            ease: EASE_CUBIC,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -32 : 32,
        transition: {
            duration: 0.22,
            ease: EASE_CUBIC,
        },
    }),
};

function Contact(_props: IContactProps) {
    const { t } = useTranslation();
    const [[currentStep, direction], setStepState] = useState<[TContactStep, number]>([
        ContactStep.Step2,
        0,
    ]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [questionnaire, setQuestionnaire] = useState<IContactQuestionnaireAnswers | null>(null);
    const { scrollToSection } = useScrollToSection();

    const navigateTo = (nextStep: TContactStep) => {
        const newDirection = nextStep > currentStep ? 1 : -1;
        setSubmitError(null);
        setStepState([nextStep, newDirection]);
    };

    const goToStep2 = () => navigateTo(ContactStep.Step2);
    const goToStep3 = () => navigateTo(ContactStep.Step3);
    const goToStep4 = () => navigateTo(ContactStep.Step4);

    const handleQuestionnaireComplete = (answers: IContactQuestionnaireAnswers) => {
        setQuestionnaire(answers);
        goToStep3();
    };

    const handleWriteAgain = () => {
        setQuestionnaire(null);
        goToStep2();
    };

    /**
     * Resolves a service-layer error to a localized user-facing message.
     * Falls back to the generic submit error when the message is unrecognized.
     */
    const resolveErrorMessage = (err: unknown): string => {
        if (!(err instanceof Error)) {
            return t("HomeScreen.Contact.step3.form.errors.submitError") as string;
        }
        const msg = err.message;

        if (msg.includes("VITE_BASE_URL")) {
            return t("HomeScreen.Contact.step3.form.errors.configError") as string;
        }
        if (msg.startsWith("Network error") || msg.includes("Unable to reach the server")) {
            return t("HomeScreen.Contact.step3.form.errors.networkError") as string;
        }
        if (msg.includes("Server responded with status")) {
            return t("HomeScreen.Contact.step3.form.errors.serverError") as string;
        }

        return t("HomeScreen.Contact.step3.form.errors.submitError") as string;
    };

    const handleFormSubmit = async (data: ContactFormData) => {
        setSubmitError(null);

        try {
            await submitContact(data);
            scrollToSection("contacto");
            goToStep4();
        } catch (err) {
            setSubmitError(resolveErrorMessage(err));
        }
    };

    return (
        <section
            id="contacto"
            aria-labelledby="contact-heading"
            className="relative w-full overflow-hidden bg-bg py-24 sm:py-32 px-6 sm:px-10 lg:px-16 transition-colors duration-300"
        >
            {/* Subtle ambient glow in the bottom-left corner */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-orange-500/15 bg-orange-500/[0.03] blur-2xl"
            />

            <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* ============================================================
                    LEFT COLUMN — Editorial Headline, Copy & Tagline
                    ============================================================ */}
                <div className="lg:col-span-6 flex flex-col items-start gap-6">
                    <h2
                        id="contact-heading"
                        className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-text"
                    >
                        <span className="block text-text">
                            {t("HomeScreen.Contact.titleLine1")}
                        </span>
                        <span className="block text-primary mt-1">
                            {t("HomeScreen.Contact.titleLine2")}
                        </span>
                    </h2>

                    <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
                        {t("HomeScreen.Contact.subtitle")}
                    </p>

                    <div className="inline-flex items-center gap-3 pt-2">
                        <FiMessageCircle
                            className="w-5 h-5 text-primary shrink-0"
                            aria-hidden="true"
                        />
                        <span className="font-body text-sm sm:text-base text-text-muted">
                            {t("HomeScreen.Contact.tagline")}
                        </span>
                    </div>
                </div>

                {/* ============================================================
                    RIGHT COLUMN — Multi-Step Interactive Card
                    ============================================================ */}
                <div className="lg:col-span-6 w-full">
                    <div className="w-full rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-6 sm:p-9 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            {currentStep === ContactStep.Step2 && (
                                <motion.div
                                    key="step2"
                                    custom={direction}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="w-full"
                                >
                                    <Step2
                                        onComplete={handleQuestionnaireComplete}
                                        initialAnswers={questionnaire}
                                    />
                                </motion.div>
                            )}

                            {currentStep === ContactStep.Step3 && (
                                <motion.div
                                    key="step3"
                                    custom={direction}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="w-full"
                                >
                                    <Step3
                                        onBack={goToStep2}
                                        onSubmitForm={handleFormSubmit}
                                        submitError={submitError}
                                        initialBudget={questionnaire?.budget ?? ""}
                                    />
                                </motion.div>
                            )}

                            {currentStep === ContactStep.Step4 && (
                                <motion.div
                                    key="step4"
                                    custom={direction}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="w-full"
                                >
                                    <Step4
                                        onWriteAgain={handleWriteAgain}
                                        onExit={handleWriteAgain}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
