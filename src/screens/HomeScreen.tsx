// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import Hero from "../components/HomeScreen/Hero";
import ValueProposition from "../components/HomeScreen/ValueProposition";
import AboutUs from "../components/HomeScreen/AboutUs";
import WhyUs from "../components/HomeScreen/WhyUs";
import Services from "../components/HomeScreen/Services";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";
import Portfolio from "../components/HomeScreen/Portfolio";
import SeoMetricsDemo from "../components/HomeScreen/SeoMetricsDemo";
import ThemeToggleDemo from "../components/HomeScreen/ThemeToggleDemo";
import LanguageSwitcherDemo from "../components/HomeScreen/LanguageSwitcherDemo";
import Methodology from "../components/HomeScreen/Methodology";
import Contact from "../components/HomeScreen/Contact";

function HomeScreen(_props: IHomeScreenProps) {
    return (
        <>
            <Hero />
            <ValueProposition />
            <Services />
            <Portfolio />
            <SeoMetricsDemo />
            <ThemeToggleDemo />
            <LanguageSwitcherDemo />
            <Methodology />
            <Contact />
        </>
    );
}

export default HomeScreen;
