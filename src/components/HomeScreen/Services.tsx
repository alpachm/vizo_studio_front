// ---------------------------------------------------------------------------
// Services — Services section for the Home screen
// Two-block alternating layout: Mobile Apps (40/60) & Web Development (60/40)
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IServicesProps } from "../../interfaces/HomeScreenInterface";
import { FiSmartphone, FiGlobe } from "react-icons/fi";

function Services(_props: IServicesProps) {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-bg py-16 sm:py-20 lg:py-24">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                    {t("HomeScreen.Services.title")}
                </h2>

                <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
                    {/* -------------------------------------------------- */}
                    {/* Block 1 — Mobile App Development (40/60)            */}
                    {/* -------------------------------------------------- */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        {/* Left Column — Image Placeholder (40%) */}
                        <div className="w-full lg:w-2/5">
                            <div className="flex aspect-square w-full items-center justify-center bg-white shadow-md">
                                <FiSmartphone className="text-6xl text-text-muted/40 lg:text-7xl" />
                            </div>
                        </div>

                        {/* Right Column — Content (60%) */}
                        <div className="flex w-full flex-col justify-center lg:w-3/5">
                            <h3 className="font-title text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
                                {t("HomeScreen.Services.apps.title")}
                            </h3>
                            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-muted sm:text-lg lg:mt-6">
                                {t("HomeScreen.Services.apps.description")}
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Block 2 — Web Development (60/40, inverted)         */}
                    {/* -------------------------------------------------- */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        {/* Left Column — Content (60%) */}
                        <div className="flex w-full flex-col justify-center lg:w-3/5">
                            <h3 className="font-title text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
                                {t("HomeScreen.Services.web.title")}
                            </h3>
                            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-muted sm:text-lg lg:mt-6">
                                {t("HomeScreen.Services.web.description")}
                            </p>
                        </div>

                        {/* Right Column — Image Placeholder (40%) */}
                        <div className="w-full lg:w-2/5">
                            <div className="flex aspect-square w-full items-center justify-center bg-white shadow-md">
                                <FiGlobe className="text-6xl text-text-muted/40 lg:text-7xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
