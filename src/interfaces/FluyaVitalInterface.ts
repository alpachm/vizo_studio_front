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

/** A single slice of the Fluye Vital roulette wheel. */
export interface IFluyaVitalRouletteSlice {
    /** Radial centre of the slice, measured clockwise from 12 o'clock (degrees). */
    angle: number;
    /** Whether this slice is a winning "Premio" slice (vs. the consolation slice). */
    isPrize: boolean;
}

/** State and actions exposed by the useRoulette hook. */
export interface IUseRouletteResult {
    /** True while the wheel is animating toward its final slice. */
    isSpinning: boolean;
    /** Current (accumulated) wheel rotation in degrees. */
    rotation: number;
    /** The slice the wheel landed on, or null before the first spin. */
    selectedPrize: IFluyaVitalRouletteSlice | null;
    /** Starts a new spin (no-op while the wheel is already spinning). */
    spinWheel: () => void;
}

/** Props for the Fluye Vital footer component. */
export interface IFluyaVitalFooterProps {
    className?: string;
}
