// ---------------------------------------------------------------------------
// AboutUs — About Us section for the Home screen
// 70/30 two-column layout with 3D pop-out image and i18n country highlighting
// ---------------------------------------------------------------------------
import { Trans, useTranslation } from "react-i18next";
import type { IAboutUsProps } from "../../interfaces/HomeScreenInterface";
import aboutUsImg from "../../assets/HomeScreen/images/about_us.png";

export const AboutUs: React.FC<IAboutUsProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        /* Fix FE-08: overflow-x-clip isolates horizontal & vertical overflow
       without creating an internal scrolling context, preventing the
       double-scrollbar bug caused by the 3D pop-out image. */
        <section className={`w-full py-16 sm:py-24 bg-bg overflow-x-clip relative ${className}`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="font-title text-2xl font-bold text-text sm:text-3xl mb-8 sm:mb-12 text-left">
                    {t("HomeScreen.AboutUs.title")}
                </h2>

                {/* Two-Column Layout */}
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
                    {/* -------------------------------------------------- */}
                    {/* Left Column — 3D Pop-Out Image (70% on lg:)        */}
                    {/* -------------------------------------------------- */}
                    <div className="w-full lg:w-7/12 flex items-center justify-center p-4">
                        {/* Constrained bounding box prevents height overflow
                while padding permits top 3D pop-out visibility */}
                        <div className="aspect-square w-full max-w-md relative flex items-center justify-center my-4">
                            {/* White Circle Stage Base */}
                            <div className="w-[85%] h-[85%] rounded-full bg-white shadow-xl absolute inset-0 m-auto z-0" />
                            {/* Pop-Out Image */}
                            <img
                                src={aboutUsImg}
                                alt={t("HomeScreen.AboutUs.imageAlt")}
                                className="relative z-10 h-[110%] w-[110%] max-w-none object-contain filter drop-shadow-2xl -translate-y-2 pointer-events-none"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Right Column — Text Block (30% on lg:)              */}
                    {/* -------------------------------------------------- */}
                    <div className="w-full lg:w-5/12 flex flex-col items-end text-right">
                        <p className="font-body text-base font-light leading-relaxed text-text/80 sm:text-lg mb-4">
                            <Trans
                                i18nKey="HomeScreen.AboutUs.paragraph1"
                                components={{
                                    country: <span className="font-bold text-secondary" />,
                                }}
                            />
                        </p>
                        <p className="font-body text-base font-light leading-relaxed text-text/80 sm:text-lg">
                            {t("HomeScreen.AboutUs.paragraph2")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
