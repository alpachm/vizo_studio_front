// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import Hero from "../components/HomeScreen/Hero";
import AboutUs from "../components/HomeScreen/AboutUs";
import WhyUs from "../components/HomeScreen/WhyUs";
import Services from "../components/HomeScreen/Services";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";
import Portfolio from "../components/HomeScreen/Portfolio";
import Contact from "../components/HomeScreen/Contact";

function HomeScreen(_props: IHomeScreenProps) {
    return (
        <>
            <Hero />
            <Services />
            <Portfolio />
            <AboutUs />
            <WhyUs />
            <Contact />
        </>
    );
}

export default HomeScreen;
