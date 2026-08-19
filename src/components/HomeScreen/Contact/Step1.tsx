// ---------------------------------------------------------------------------
// Step 1 — Initial contact prompt with background video ("¿Tienes alguna idea?")
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IContactStep1Props } from "../../../interfaces/HomeScreenInterface";
import { BG_VIDEOS } from "../../../utils";

function Step1({ onNextStep }: IContactStep1Props) {
    const { t } = useTranslation();

    return (
        <div className="relative w-full h-dvh min-h-dvh flex flex-col items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
                <source src={BG_VIDEOS.contact_bg} type="video/mp4" />
            </video>

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

            {/* Foreground Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto py-12">
                <h2 className="font-title text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-10 leading-tight drop-shadow-md">
                    {t("HomeScreen.Contact.step1.title")}
                </h2>

                <button
                    type="button"
                    onClick={onNextStep}
                    className="bg-primary text-white font-body text-lg sm:text-xl font-bold px-10 py-4 sm:px-12 sm:py-5 rounded-none shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                    {t("HomeScreen.Contact.step1.button")}
                </button>
            </div>
        </div>
    );
}

export default Step1;
