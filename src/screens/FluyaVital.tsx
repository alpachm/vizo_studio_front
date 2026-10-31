// ---------------------------------------------------------------------------
// FluyaVital — Standalone screen with layered water background
// ---------------------------------------------------------------------------
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";
import Wave1 from "../assets/FluyaVital/SVG/wave-1";
import Wave2 from "../assets/FluyaVital/SVG/wave-2";
import styles from "./FluyaVital.module.css";
import Header from "../components/FluyaVital/Header";
import Hero from "../components/FluyaVital/Hero";
import FluyaVitalRoulette from "../components/FluyaVital/Roulette";

export const FluyaVital: React.FC<IFluyaVitalProps> = () => {
    return (
        <div
            className={`${styles.fvContainer} relative flex min-h-screen w-full flex-col overflow-hidden bg-sky-50 text-sky-950`}
        >
            {/* Contenedor responsivo — replica la estructura de espaciado de Vizo Studio */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Header />
                <Hero className="mt-8 sm:mt12 lg:mt-12" />
                <FluyaVitalRoulette />
            </div>

            {/* Fondo de Agua — olas SVG apiladas (de atrás hacia delante) */}
            <Wave1
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[-10%] z-0 block h-auto w-[120%] will-change-transform animate-wave-drift-left"
                style={{ animationDuration: "3.5s" }}
            />
            <Wave2
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[-10%] z-[1] block h-auto w-[120%] will-change-transform animate-wave-drift-right"
                style={{ animationDuration: "2s" }}
            />
        </div>
    );
};

export default FluyaVital;
