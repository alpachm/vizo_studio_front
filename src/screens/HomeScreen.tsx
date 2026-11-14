// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import { useEffect, useLayoutEffect, useRef } from "react";
import Hero from "../components/HomeScreen/Hero";
import ValueProposition from "../components/HomeScreen/ValueProposition";
import Services from "../components/HomeScreen/Services";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";
import Portfolio from "../components/HomeScreen/Portfolio";
import ResponsiveDemo from "../components/HomeScreen/ResponsiveDemo";
import SeoMetricsDemo from "../components/HomeScreen/SeoMetricsDemo";
import ThemeToggleDemo from "../components/HomeScreen/ThemeToggleDemo";
import LanguageSwitcherDemo from "../components/HomeScreen/LanguageSwitcherDemo";
import Methodology from "../components/HomeScreen/Methodology";
import Contact from "../components/HomeScreen/Contact";
import {
    consumeSkipHomeScrollRestore,
    getSavedHomeScrollY,
    saveHomeScrollY,
} from "../utils/homeScrollPosition";

function HomeScreen(_props: IHomeScreenProps) {
    const isRestoringScrollRef = useRef<boolean>(false);

    // Restore the user's previous scroll position when returning to "/" from
    // another route (such as "/about"), unless a specific section jump was requested.
    useLayoutEffect(() => {
        const shouldSkip = consumeSkipHomeScrollRestore();
        const targetY = getSavedHomeScrollY();

        if (shouldSkip || targetY <= 0) {
            isRestoringScrollRef.current = false;
            return;
        }

        isRestoringScrollRef.current = true;

        const applyScroll = () => {
            window.scrollTo({ top: targetY, behavior: "instant" });
            window.dispatchEvent(new Event("scroll"));
        };

        applyScroll();

        let raf2Id: number | null = null;
        const raf1Id = window.requestAnimationFrame(() => {
            applyScroll();
            raf2Id = window.requestAnimationFrame(() => {
                applyScroll();
                isRestoringScrollRef.current = false;
            });
        });

        return () => {
            window.cancelAnimationFrame(raf1Id);
            if (raf2Id !== null) {
                window.cancelAnimationFrame(raf2Id);
            }
            isRestoringScrollRef.current = false;
        };
    }, []);

    // Continuously record the current scroll position while browsing the Home screen.
    useEffect(() => {
        const handleScroll = () => {
            if (isRestoringScrollRef.current) return;
            if (window.location.pathname !== "/") return;
            saveHomeScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Hero />
            <ValueProposition />
            <Services />
            <Portfolio />
            <ResponsiveDemo />
            <SeoMetricsDemo />
            <ThemeToggleDemo />
            <LanguageSwitcherDemo />
            <Methodology />
            <Contact />
        </>
    );
}

export default HomeScreen;
