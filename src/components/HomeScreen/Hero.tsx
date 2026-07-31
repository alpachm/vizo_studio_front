// ---------------------------------------------------------------------------
// Hero — Main hero section for the Home screen
// ---------------------------------------------------------------------------
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import type { IHeroProps } from "../../interfaces/HomeScreenInterface";
import heroVideo from "../../assets/HomeScreen/videos/hero-bg.mp4";

function Hero(_props: IHeroProps) {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleLoadedData = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 2;
            videoRef.current.play().catch(() => {
                // Autoplay blocked by browser — silently ignore
            });
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 12) {
            videoRef.current.currentTime = 2;
        }
    };

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center pt-20 sm:pt-24 pb-12">
            {/* Background Video */}
            <video
                ref={videoRef}
                src={heroVideo}
                autoPlay
                muted
                playsInline
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            />

            {/* 40% Black Overlay for Text Contrast */}
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

            {/* Hero Content Layer */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="font-title text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
                    {t("HomeScreen.Hero.title")}
                </h1>
                <p className="mx-auto mt-6 max-w-3xl font-body text-lg font-normal text-text-muted sm:text-xl">
                    {t("HomeScreen.Hero.description")}
                </p>
                <button
                    type="button"
                    className="mt-8 inline-flex cursor-pointer items-center justify-center bg-primary px-8 py-4 font-body text-base font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                    {t("HomeScreen.Hero.cta")}
                </button>
            </div>
        </section>
    );
}

export default Hero;
