// ---------------------------------------------------------------------------
// Step 2 — Multi-select interest options ("Estoy interesado en...")
// ---------------------------------------------------------------------------
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type {
    IContactInterestOption,
    IContactStep2Props,
} from "../../../interfaces/HomeScreenInterface";

/** Interest options sourced from translation keys */
const INTEREST_OPTIONS: IContactInterestOption[] = [
    { id: "website", translationKey: "HomeScreen.Contact.step2.options.website" },
    { id: "mobileApp", translationKey: "HomeScreen.Contact.step2.options.mobileApp" },
    { id: "customSoftware", translationKey: "HomeScreen.Contact.step2.options.customSoftware" },
];

function Step2(_props: IContactStep2Props) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOption = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    return (
        <div className="w-full min-h-dvh flex flex-col bg-bg px-4 py-12 sm:px-8 md:px-16 lg:px-24">
            {/* Title */}
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-bold text-text mb-8">
                {t("HomeScreen.Contact.step2.title")}
            </h2>

            {/* Subtitle */}
            <p className=" text-xl sm:text-2xl font-thin text-text mb-4">
                {t("HomeScreen.Contact.step2.subtitle")}
            </p>

            {/* Multi-Select Interest Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
                {INTEREST_OPTIONS.map((option) => {
                    const isActive = selected.includes(option.id);

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleOption(option.id)}
                            className={`font-body text-base sm:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-none transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent border border-text/20 text-text hover:border-text/50"
                            }`}
                        >
                            {t(option.translationKey)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Step2;
