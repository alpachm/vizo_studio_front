// ---------------------------------------------------------------------------
// WhyUs — "Why choose us?" value-cards section for the Home screen
// 2x2 responsive grid with react-icons, full i18n localization,
// and scroll-triggered directional slide animations via IntersectionObserver
// ---------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    HiOutlineRocketLaunch,
    HiOutlineClipboardDocumentCheck,
    HiOutlineShieldCheck,
    HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import type { IWhyUsProps, IWhyUsCardItem } from "../../interfaces/HomeScreenInterface";

const WHY_US_CARDS: IWhyUsCardItem[] = [
    {
        id: "proactive",
        icon: HiOutlineRocketLaunch,
        titleKey: "HomeScreen.WhyUs.cards.proactive.title",
        descriptionKey: "HomeScreen.WhyUs.cards.proactive.description",
    },
    {
        id: "organized",
        icon: HiOutlineClipboardDocumentCheck,
        titleKey: "HomeScreen.WhyUs.cards.organized.title",
        descriptionKey: "HomeScreen.WhyUs.cards.organized.description",
    },
    {
        id: "quality",
        icon: HiOutlineShieldCheck,
        titleKey: "HomeScreen.WhyUs.cards.quality.title",
        descriptionKey: "HomeScreen.WhyUs.cards.quality.description",
    },
    {
        id: "communication",
        icon: HiOutlineChatBubbleLeftRight,
        titleKey: "HomeScreen.WhyUs.cards.communication.title",
        descriptionKey: "HomeScreen.WhyUs.cards.communication.description",
    },
];

export const WhyUs: React.FC<IWhyUsProps> = ({ className = "" }) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`w-full py-16 sm:py-24 bg-white overflow-x-clip isolate relative ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ---- Right-Aligned Header ---- */}
                <div className="flex flex-col items-end text-right mb-12">
                    <h2 className="font-title text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-[#000] mb-2">
                        {t("HomeScreen.WhyUs.title")}
                    </h2>
                    <p className="text-[var(--color-secondary)] text-base sm:text-lg">
                        {t("HomeScreen.WhyUs.subtitle")}
                    </p>
                </div>

                {/* ---- 2×2 Grid with Directional Slide Animations ---- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {WHY_US_CARDS.map((card, index) => {
                        const IconComponent = card.icon;
                        // Cards at index 0 and 2 (left column) slide from left (-translate-x-full)
                        // Cards at index 1 and 3 (right column) slide from right (translate-x-full)
                        const isLeftColumn = index % 2 === 0;

                        const transformClass = isVisible
                            ? "translate-x-0 opacity-100"
                            : isLeftColumn
                              ? "-translate-x-full opacity-0"
                              : "translate-x-full opacity-0";

                        return (
                            <div
                                key={card.id}
                                className={`p-8 sm:p-10 rounded-none border border-[#000]/10 shadow-sm shadow-md flex flex-col items-center text-center transition-all duration-700 ease-out will-change-transform ${transformClass}`}
                            >
                                <div className="text-4xl sm:text-5xl text-[var(--color-secondary)] mb-5">
                                    <IconComponent />
                                </div>
                                <h3 className="font-title text-lg sm:text-xl font-bold text-[#000] mb-3">
                                    {t(card.titleKey)}
                                </h3>
                                <p className="text-[#000] text-sm sm:text-base leading-relaxed">
                                    {t(card.descriptionKey)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
