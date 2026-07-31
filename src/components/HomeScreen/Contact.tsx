// ---------------------------------------------------------------------------
// Contact — Multi-step contact section (step manager)
// ---------------------------------------------------------------------------
import type { IContactProps } from "../../interfaces/HomeScreenInterface";
import Step1 from "./Contact/Step1";

function Contact(_props: IContactProps) {
    const renderStep = () => {
        return <Step1 />;
    };

    return (
        <section className="relative flex min-h-[calc(100vh-var(--header-height,80px))] w-full flex-col items-center justify-center bg-bg text-center pt-20 sm:pt-24 pb-12">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{renderStep()}</div>
        </section>
    );
}

export default Contact;
