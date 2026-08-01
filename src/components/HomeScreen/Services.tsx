// ---------------------------------------------------------------------------
// Services — Services section for the Home screen
// Two-block alternating layout: Mobile Apps (40/60) & Web Development (60/40)
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { IServicesProps } from "../../interfaces/HomeScreenInterface";
import service1Img from "../../assets/HomeScreen/images/service_1.png";
import service2Img from "../../assets/HomeScreen/images/service_2.png";

function Services(_props: IServicesProps) {
    const { t } = useTranslation();

    // ---- Refs & Intersection Observer state ----
    const block1Ref = useRef<HTMLDivElement | null>(null);
    const block2Ref = useRef<HTMLDivElement | null>(null);

    const [isBlock1Visible, setIsBlock1Visible] = useState(false);
    const [isBlock2Visible, setIsBlock2Visible] = useState(false);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "0px",
            threshold: 0.25,
        };

        const block1Observer = new IntersectionObserver(([entry]) => {
            setIsBlock1Visible(entry.isIntersecting);
        }, observerOptions);

        const block2Observer = new IntersectionObserver(([entry]) => {
            setIsBlock2Visible(entry.isIntersecting);
        }, observerOptions);

        if (block1Ref.current) block1Observer.observe(block1Ref.current);
        if (block2Ref.current) block2Observer.observe(block2Ref.current);

        return () => {
            block1Observer.disconnect();
            block2Observer.disconnect();
        };
    }, []);

    return (
        <section
            id="services"
            className="w-full bg-bg py-16 sm:py-20 lg:py-24 overflow-x-clip relative"
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                    {t("HomeScreen.Services.title")}
                </h2>

                <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
                    {/* -------------------------------------------------- */}
                    {/* Block 1 — Mobile App Development (40/60)            */}
                    {/* -------------------------------------------------- */}
                    <div
                        ref={block1Ref}
                        className="flex flex-col gap-8 lg:flex-row lg:items-center"
                    >
                        {/* Left Column — Service Image 1 (40%) */}
                        <div className="w-full lg:w-2/5 flex items-center justify-center p-4">
                            {/* Outer Stage Container (Square Aspect, Clips Bottom Overflow) */}
                            <div className="aspect-square w-full relative flex items-center justify-center overflow-hidden">
                                {/* White Circle Stage Base */}
                                <div className="w-[85%] h-[85%] rounded-full bg-white shadow-xl absolute inset-0 m-auto z-0" />
                                {/* Pop-Out Animated Image */}
                                <img
                                    src={service1Img}
                                    alt={t("HomeScreen.Services.apps.imageAlt")}
                                    className={`relative z-10 h-full w-full object-contain filter drop-shadow-2xl transition-all duration-700 ease-out ${
                                        isBlock1Visible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-full opacity-0"
                                    }`}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Right Column — Content (60%) */}
                        <div className="flex w-full flex-col items-end justify-center text-right lg:w-3/5">
                            <h3 className="font-title text-2xl font-extrabold text-text sm:text-3xl lg:text-4xl">
                                <Trans
                                    i18nKey="HomeScreen.Services.apps.title"
                                    components={{
                                        highlight: <span className="text-secondary" />,
                                    }}
                                />
                            </h3>
                            <p className="mt-4 max-w-xl font-light text-lg leading-relaxed text-text-muted sm:text-xl lg:mt-6">
                                {t("HomeScreen.Services.apps.description")}
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Block 2 — Web Development (60/40, inverted)         */}
                    {/* -------------------------------------------------- */}
                    <div
                        ref={block2Ref}
                        className="flex flex-col gap-8 lg:flex-row lg:items-center"
                    >
                        {/* Left Column — Content (60%) */}
                        <div className="flex w-full flex-col items-start justify-center text-left lg:w-3/5">
                            <h3 className="font-title text-2xl font-extrabold text-text sm:text-3xl lg:text-4xl">
                                <Trans
                                    i18nKey="HomeScreen.Services.web.title"
                                    components={{
                                        highlight: <span className="text-secondary" />,
                                    }}
                                />
                            </h3>
                            <p className="mt-4 max-w-xl font-light text-lg leading-relaxed text-text-muted sm:text-xl lg:mt-6">
                                {t("HomeScreen.Services.web.description")}
                            </p>
                        </div>

                        {/* Right Column — Service Image 2 (40%) */}
                        <div className="w-full lg:w-2/5 flex items-center justify-center p-4">
                            {/* Outer Stage Container (Square Aspect, Clips Bottom Overflow) */}
                            <div className="aspect-square w-full relative flex items-center justify-center overflow-hidden">
                                {/* White Circle Stage Base */}
                                <div className="w-[85%] h-[85%] rounded-full bg-white shadow-xl absolute inset-0 m-auto z-0" />
                                {/* Pop-Out Animated Image */}
                                <img
                                    src={service2Img}
                                    alt={t("HomeScreen.Services.web.imageAlt")}
                                    className={`relative z-10 h-full w-full object-contain filter drop-shadow-2xl transition-all duration-700 ease-out ${
                                        isBlock2Visible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-full opacity-0"
                                    }`}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
