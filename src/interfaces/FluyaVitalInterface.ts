// ---------------------------------------------------------------------------
// FluyaVital — Centralized Interfaces
// ---------------------------------------------------------------------------

import type { SVGProps } from "react";

/** Props for the FluyaVital screen component (currently no external props required) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFluyaVitalProps {}

/** Props for the Fluye Vital header component. */
export interface IFluyaVitalHeaderProps {
    className?: string;
}

/** Props for the Fluye Vital hero component. */
export interface IFluyaVitalHeroProps {
    className?: string;
}

/** Props for the Fluye Vital roulette component. */
export interface IFluyaVitalRouletteProps {
    className?: string;
}

/** Props for the Fluye Vital roulette SVG asset. */
export interface IRouletteSVGProps extends SVGProps<SVGSVGElement> {
    /** Wheel rotation angle (degrees), applied around the wheel centre. */
    rotation?: number;
}

/** Props for the Fluye Vital footer component. */
export interface IFluyaVitalFooterProps {
    className?: string;
}
