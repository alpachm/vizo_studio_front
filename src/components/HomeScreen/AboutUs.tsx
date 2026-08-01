// ---------------------------------------------------------------------------
// AboutUs — About Us section for the Home screen
// 70/30 two-column layout with 3D pop-out image and i18n country highlighting
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { IAboutUsProps } from "../../interfaces/HomeScreenInterface";
import aboutUsImg from "../../assets/HomeScreen/images/about_us.png";

export const AboutUs: React.FC<IAboutUsProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    // ---- Refs & Intersection Observer state ----
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsAboutUsVisible(entry.isIntersecting);
            },
            { threshold: 0.25 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        /* Fix FE-08: overflow-clip clips horizontal & vertical overflow
       without creating an internal scrolling context, preventing the
       double-scrollbar bug caused by the 3D pop-out image.
       isolate creates a new stacking context to contain the off-screen
       translate-y-full transform within the section boundary. */
        <section
            id="about-us"
            ref={sectionRef}
            className={`w-full py-20 sm:py-24 bg-bg overflow-clip isolate relative ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl mb-10">
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
                        <div className="aspect-square w-full max-w-md relative flex items-center justify-center my-4 overflow-visible">
                            {/* White Circle Stage Base */}
                            <div className="w-[80%] aspect-square rounded-full bg-white shadow-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
                            {/* Pop-Out Image with scroll-triggered animation */}
                            <img
                                src={aboutUsImg}
                                alt={t("HomeScreen.AboutUs.imageAlt")}
                                className={`relative z-10 h-[110%] w-[110%] max-w-none object-contain filter drop-shadow-2xl pointer-events-none transition-all duration-700 ease-out will-change-transform ${
                                    isAboutUsVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-full opacity-0"
                                }`}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Right Column — Text Block (30% on lg:)              */}
                    {/* -------------------------------------------------- */}
                    <div className="w-full lg:w-5/12 flex flex-col items-end text-right">
                        <p className="max-w-xl font-light text-lg leading-relaxed text-text-muted sm:text-xl lg:mt-6">
                            <Trans
                                i18nKey="HomeScreen.AboutUs.paragraph1"
                                components={{
                                    country: <span className="font-bold text-secondary" />,
                                }}
                            />
                        </p>
                        <p className="max-w-xl font-light text-lg leading-relaxed text-text-muted sm:text-xl lg:mt-6">
                            {t("HomeScreen.AboutUs.paragraph2")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
