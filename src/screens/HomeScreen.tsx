// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import Hero from "../components/HomeScreen/Hero";
import AboutUs from "../components/HomeScreen/AboutUs";
import WhyUs from "../components/HomeScreen/WhyUs";
import Services from "../components/HomeScreen/Services";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";
import Portfolio from "../components/HomeScreen/Portfolio";
import Methodology from "../components/HomeScreen/Methodology";
import Contact from "../components/HomeScreen/Contact";

function HomeScreen(_props: IHomeScreenProps) {
    return (
        <>
            <Hero />
            <Services />
            <Portfolio />
            <AboutUs />
            <Methodology />
            <WhyUs />
            <Contact />
        </>
    );
}

export default HomeScreen;
