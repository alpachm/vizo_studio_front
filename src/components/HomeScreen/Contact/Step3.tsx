// ---------------------------------------------------------------------------
// Step 3 — Final confirmation screen (successful form submission)
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiCheckCircle } from "react-icons/fi";
import type { IContactStep3Props } from "../../../interfaces/HomeScreenInterface";

function Step3({ onWriteAgain, onExit }: IContactStep3Props) {
    const { t } = useTranslation();

    return (
        <div className="w-full h-dvh min-h-dvh flex flex-col justify-center items-center bg-bg px-4 sm:px-8 text-center">
            {/* Success Icon */}
            <FiCheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-primary mb-6" />

            {/* Confirmation Title */}
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
                {t("HomeScreen.Contact.step3.title")}
            </h2>

            {/* Message Body */}
            <p className="font-body text-base sm:text-lg text-text/70 max-w-xl mb-8">
                {t("HomeScreen.Contact.step3.message")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                    type="button"
                    onClick={onWriteAgain}
                    className="bg-transparent border border-text/20 text-text font-body text-lg font-semibold px-8 py-3 rounded-none hover:border-text/50 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                    {t("HomeScreen.Contact.step3.buttons.writeAgain")}
                </button>

                <button
                    type="button"
                    onClick={onExit}
                    className="bg-primary text-white font-body text-lg font-semibold px-8 py-3 rounded-none shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                    {t("HomeScreen.Contact.step3.buttons.exit")}
                </button>
            </div>
        </div>
    );
}

export default Step3;
