// ---------------------------------------------------------------------------
// FluyaVitalRoulette — Static prize-wheel assembly for the Fluye Vital screen
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IFluyaVitalRouletteProps } from "../../interfaces/FluyaVitalInterface";
import RolutteSVG from "../../assets/FluyaVital/SVG/rouletteSVG";

/**
 * Roulette visual composed of three layered SVGs:
 *
 *   1. `Base`    — elliptical backplate (foundation layer, z-0)
 *   2. `Wheel`   — circular prize wheel centred on the base (z-10)
 *   3. `Clapper` — indicator/pointer aligned top-centre over the wheel (z-20)
 *
 * Each asset is consumed with an explicit `viewBox` (the exported SVGs only
 * carry `width`/`height`, so a viewBox is required for proportional scaling).
 * The wheel is intentionally kept static — no rotation animation yet.
 */
export const FluyaVitalRoulette: React.FC<IFluyaVitalRouletteProps> = ({ className = "" }) => {
    const { t } = useTranslation();

    return (
        <section
            aria-label={t("FluyaVital.roulette.ariaLabel")}
            className={`relative z-10 flex w-full items-center justify-center ${className}`}
        >
            {/* Inline-flex wrapper shrink-wraps to the base so the absolutely
                positioned layers stay aligned at every breakpoint. */}
            <div className="relative inline-flex">
                <RolutteSVG />
            </div>
        </section>
    );
};

export default FluyaVitalRoulette;
