// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import Hero from "../components/HomeScreen/Hero";
import Services from "../components/HomeScreen/Services";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";

function HomeScreen(_props: IHomeScreenProps) {
    return (
        <>
            <Hero />
            <Services />
        </>
    );
}

export default HomeScreen;
