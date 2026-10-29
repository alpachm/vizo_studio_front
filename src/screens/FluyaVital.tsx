// ---------------------------------------------------------------------------
// FluyaVital — Standalone screen with layered water background
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";
import Wave1 from "../assets/FluyaVital/SVG/wave-1";
import Wave2 from "../assets/FluyaVital/SVG/wave-2";
import styles from "./FluyaVital.module.css";
import Header from "../components/FluyaVital/Header";

export const FluyaVital: React.FC<IFluyaVitalProps> = () => {
    const { t } = useTranslation();

    return (
        <div
            className={`${styles.fvContainer} relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-sky-50 px-6 py-8 text-center text-sky-950`}
        >
            <Header />
            {/* Contenido principal */}
            <h1 className="relative z-10 font-title text-4xl font-bold leading-tight tracking-tight text-sky-950 sm:text-6xl lg:text-7xl">
                {t("FluyaVital.title")}
            </h1>

            <span
                aria-hidden="true"
                className="relative z-10 my-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#00B4D8] to-[#90E0EF] shadow-[0_0_12px_rgba(0,180,216,0.45)]"
            />

            <p className="relative z-10 font-body text-base font-light tracking-[3px] text-sky-900/70 sm:text-xl">
                {t("FluyaVital.subtitle")}
            </p>

            {/* Fondo de Agua — olas SVG apiladas (de atrás hacia delante) */}
            <Wave1
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[-10%] z-0 block h-auto w-[120%] will-change-transform animate-wave-drift-left"
                style={{ animationDuration: "5s" }}
            />
            <Wave2
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[-10%] z-[1] block h-auto w-[120%] will-change-transform animate-wave-drift-right"
                style={{ animationDuration: "3.5s" }}
            />
        </div>
    );
};

export default FluyaVital;
