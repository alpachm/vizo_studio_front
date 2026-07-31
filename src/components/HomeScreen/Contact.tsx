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
        <section className="w-full h-dvh flex flex-col relative bg-bg overflow-hidden">
            <div className="w-full flex-1 flex flex-col relative">{renderStep()}</div>
        </section>
    );
}

export default Contact;
