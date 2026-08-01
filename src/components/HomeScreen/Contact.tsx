// ---------------------------------------------------------------------------
// Contact — Multi-step contact section (step manager)
// ---------------------------------------------------------------------------
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type {
    ContactFormData,
    IContactProps,
    TContactStep,
} from "../../interfaces/HomeScreenInterface";
import { ContactStep } from "../../interfaces/HomeScreenInterface";
import Step1 from "./Contact/Step1";
import Step2 from "./Contact/Step2";
import Step3 from "./Contact/Step3";

function Contact(_props: IContactProps) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState<TContactStep>(ContactStep.Step1);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const goToStep1 = () => {
        setSubmitError(null);
        setCurrentStep(ContactStep.Step1);
    };

    const goToStep2 = () => {
        setSubmitError(null);
        setCurrentStep(ContactStep.Step2);
    };

    const goToStep3 = () => {
        setSubmitError(null);
        setCurrentStep(ContactStep.Step3);
    };

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

    const renderStep = () => {
        switch (currentStep) {
            case ContactStep.Step2:
                return (
                    <Step2
                        onBack={goToStep1}
                        onSubmitForm={handleFormSubmit}
                        submitError={submitError}
                    />
                );
            case ContactStep.Step3:
                return <Step3 onWriteAgain={goToStep2} onExit={goToStep1} />;
            case ContactStep.Step1:
            default:
                return <Step1 onNextStep={goToStep2} />;
        }
    };

    return (
        <section className="w-full h-auto min-h-dvh flex flex-col relative bg-bg">
            <div className="w-full flex-1 flex flex-col relative">{renderStep()}</div>
        </section>
    );
}

export default Contact;
