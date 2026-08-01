// ---------------------------------------------------------------------------
// Contact — Multi-step contact section (step manager) with framer-motion
// ---------------------------------------------------------------------------
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import type {
    ContactFormData,
    IContactProps,
    TContactStep,
} from "../../interfaces/HomeScreenInterface";
import { ContactStep } from "../../interfaces/HomeScreenInterface";
import Step1 from "./Contact/Step1";
import Step2 from "./Contact/Step2";
import Step3 from "./Contact/Step3";

/** Custom cubic-bezier easing for a natural slide feel */
const EASE_CUBIC = [0.25, 1, 0.5, 1] as const;

/** Direction-aware page transition variants */
const pageVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 40 : -40,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: EASE_CUBIC,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -40 : 40,
        transition: {
            duration: 0.25,
            ease: EASE_CUBIC,
        },
    }),
};

function Contact(_props: IContactProps) {
    const { t } = useTranslation();
    const [[currentStep, direction], setStepState] = useState<[TContactStep, number]>([
        ContactStep.Step1,
        0,
    ]);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const navigateTo = (nextStep: TContactStep) => {
        const newDirection = nextStep > currentStep ? 1 : -1;
        setSubmitError(null);
        setStepState([nextStep, newDirection]);
    };

    const goToStep1 = () => navigateTo(ContactStep.Step1);
    const goToStep2 = () => navigateTo(ContactStep.Step2);
    const goToStep3 = () => navigateTo(ContactStep.Step3);

    const handleFormSubmit = async (data: ContactFormData) => {
        setSubmitError(null);

        try {
            // TODO: Integrate with backend API / email service
            console.log("Contact form submitted:", data);

            // Simulate API call — replace with real fetch/axios request
            // await fetch("/api/contact", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(data),
            // });

            goToStep3();
        } catch {
            setSubmitError(t("HomeScreen.Contact.step2.form.errors.submitError") as string);
        }
    };

    return (
        <section
            className={`w-full ${
                currentStep === ContactStep.Step1 ? "h-dvh overflow-hidden" : "h-auto min-h-dvh"
            } relative bg-bg`}
        >
            <div className="w-full h-full flex-1 flex flex-col relative overflow-x-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    {currentStep === ContactStep.Step1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full h-full"
                        >
                            <Step1 onNextStep={goToStep2} />
                        </motion.div>
                    )}

                    {currentStep === ContactStep.Step2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full h-full"
                        >
                            <Step2
                                onBack={goToStep1}
                                onSubmitForm={handleFormSubmit}
                                submitError={submitError}
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
                            className="w-full h-full"
                        >
                            <Step3 onWriteAgain={goToStep2} onExit={goToStep1} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Contact;
