import { useTranslation } from "react-i18next";
import type { IPortfolioProps } from "../../interfaces/HomeScreenInterface";
import { PORTFOLIO_VIDEOS } from "../../utils";

function Portfolio(_props: IPortfolioProps) {
    const { t } = useTranslation();

    const renderVideoTrack = () =>
        PORTFOLIO_VIDEOS.map((src, index) => (
            <div
                key={index}
                className="flex-shrink-0 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-sm"
            >
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-auto h-full object-cover"
                />
            </div>
        ));

    return (
        <section className="w-full bg-white py-16 sm:py-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-right">
                    {t("Portfolio.title")}
                </h2>
            </div>

            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-marquee-scroll hover:[animation-play-state:paused] w-max gap-4 px-4">
                    {renderVideoTrack()}
                    {renderVideoTrack()}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
