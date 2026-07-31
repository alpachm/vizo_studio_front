// ---------------------------------------------------------------------------
// Step 1 — Initial contact prompt ("¿Tienes alguna idea?")
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IContactStep1Props } from "../../../interfaces/HomeScreenInterface";

function Step1(_props: IContactStep1Props) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h2 className="font-title text-3xl font-bold text-text sm:text-5xl mb-8">
                {t("HomeScreen.Contact.step1.title")}
            </h2>
            <button
                type="button"
                className="bg-primary text-white px-8 py-4 font-body text-lg font-bold rounded-none hover:opacity-90 transition-opacity shadow-lg"
            >
                {t("HomeScreen.Contact.step1.button")}
            </button>
        </div>
    );
}

export default Step1;
