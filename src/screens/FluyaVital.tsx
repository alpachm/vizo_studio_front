// ---------------------------------------------------------------------------
// FluyaVital — Placeholder screen view
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";

export const FluyaVital: React.FC<IFluyaVitalProps> = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-black px-6 text-center">
            <h1 className="font-title text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("FluyaVital.title")}
            </h1>
            <p className="font-body text-base text-white/70 sm:text-lg">
                {t("FluyaVital.subtitle")}
            </p>
        </div>
    );
};

export default FluyaVital;
