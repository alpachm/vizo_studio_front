// ---------------------------------------------------------------------------
// Step 4 — Final confirmation screen (successful form submission)
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiCheckCircle } from "react-icons/fi";
import type { IContactStep4Props } from "../../../interfaces/HomeScreenInterface";

function Step4({ onWriteAgain }: IContactStep4Props) {
    const { t } = useTranslation();

    return (
        <div className="w-full py-8 sm:py-10 flex flex-col justify-center items-center text-center">
            {/* Success Icon */}
            <FiCheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-primary mb-5" />

            {/* Confirmation Title */}
            <h3 className="font-title text-2xl sm:text-3xl font-bold text-text mb-3">
                {t("HomeScreen.Contact.step4.title")}
            </h3>

            {/* Message Body */}
            <p className="font-body text-sm sm:text-base text-text-muted max-w-md mb-8 leading-relaxed">
                {t("HomeScreen.Contact.step4.message")}
            </p>

            {/* Action Button */}
            <button
                type="button"
                onClick={onWriteAgain}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-body text-sm sm:text-base font-semibold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
                {t("HomeScreen.Contact.step4.buttons.writeAgain")}
            </button>
        </div>
    );
}

export default Step4;
