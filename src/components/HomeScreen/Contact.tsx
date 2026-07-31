// ---------------------------------------------------------------------------
// Contact — Multi-step contact section (step manager)
// ---------------------------------------------------------------------------
import { useState } from "react";
import type {
    ContactFormData,
    IContactProps,
    TContactStep,
} from "../../interfaces/HomeScreenInterface";
import { ContactStep } from "../../interfaces/HomeScreenInterface";
import Step1 from "./Contact/Step1";
import Step2 from "./Contact/Step2";

function Contact(_props: IContactProps) {
    const [currentStep, setCurrentStep] = useState<TContactStep>(ContactStep.Step1);

    const goToStep2 = () => {
        setCurrentStep(ContactStep.Step2);
    };

    const goToStep1 = () => {
        setCurrentStep(ContactStep.Step1);
    };

    const handleFormSubmit = (data: ContactFormData) => {
        // TODO: Integrate with backend API / email service
        console.log("Contact form submitted:", data);
    };

    const renderStep = () => {
        switch (currentStep) {
            case ContactStep.Step2:
                return <Step2 onBack={goToStep1} onSubmitForm={handleFormSubmit} />;
            case ContactStep.Step1:
            default:
                return <Step1 onNextStep={goToStep2} />;
        }
    };

    return (
        <section className="w-full h-dvh flex flex-col relative bg-bg overflow-y-auto">
            <div className="w-full flex-1 flex flex-col relative">{renderStep()}</div>
        </section>
    );
}

export default Contact;
