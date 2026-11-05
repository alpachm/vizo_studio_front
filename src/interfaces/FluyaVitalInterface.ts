// ---------------------------------------------------------------------------
// FluyaVital — Centralized Interfaces
// ---------------------------------------------------------------------------

import type { SVGProps } from "react";
import type { IconType } from "react-icons";

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
    /** True while the wheel is animating toward its final slice. */
    isSpinning: boolean;
    /** Current (accumulated) wheel rotation in degrees. */
    rotation: number;
    /** The slice the wheel landed on, or null before the first spin. */
    selectedPrize: IFluyaVitalRouletteSlice | null;
    /** True once the user has completed a spin and cannot spin again. */
    hasSpun: boolean;
    /** Starts a new spin (no-op while the wheel is already spinning). */
    onSpin: () => void;
}

/** Props for the Fluye Vital prize result modal. */
export interface IPrizeResultModalProps {
    /** Whether the modal is currently visible. */
    isOpen: boolean;
    /** Closes the modal (close button, backdrop click, Escape key or primary CTA). */
    onClose: () => void;
    /** The slice the wheel landed on, or null before the first spin. */
    prize: IFluyaVitalRouletteSlice | null;
    /** Whether the result is a winning "Premio" slice. */
    isWinner: boolean;
}

/** Props for the Fluye Vital post-spin view. */
export interface IPostSpinViewProps {
    /** Optional extra classes applied to the root section. */
    className?: string;
    /** Returns to the roulette view and resets the spin state. */
    onBackToRoulette: () => void;
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
    /** Prize number (1–4) for "Premio" slices; absent on consolation slices. */
    prizeNumber?: number;
    /** Prize display name (e.g. "5 recargas", "2x1"); absent on consolation slices. */
    prizeLabel?: string;
    /** Icon rendered alongside the prize name in the wheel and the result modal. */
    prizeIcon?: IconType;
}

/** Serializable snapshot of the resolved roulette slice persisted to localStorage. */
export interface IPersistedSpinResult {
    /** Radial centre of the winning slice, measured clockwise from 12 o'clock (degrees). */
    angle: number;
    /** Whether this slice is a winning "Premio" slice (vs. the consolation slice). */
    isPrize: boolean;
    /** Prize number (1–4) for "Premio" slices; absent on consolation slices. */
    prizeNumber?: number;
    /** Prize display name (e.g. "5 recargas", "2x1"); absent on consolation slices. */
    prizeLabel?: string;
}

/** Persisted single-spin lock record stored in localStorage. */
export interface ISpinLockRecord {
    /** Epoch ms when the spin was executed. */
    executedAt: number;
    /** Epoch ms when the lock expires (executedAt + 48 hours). */
    expiresAt: number;
}

/** State and actions exposed by the useRoulette hook. */
export interface IUseRouletteResult {
    /** True while the wheel is animating toward its final slice. */
    isSpinning: boolean;
    /** Current (accumulated) wheel rotation in degrees. */
    rotation: number;
    /** The slice the wheel landed on, or null before the first spin. */
    selectedPrize: IFluyaVitalRouletteSlice | null;
    /** True once the user has completed a spin during this session. */
    hasSpun: boolean;
    /** Starts a new spin (no-op while the wheel is already spinning). */
    spinWheel: () => void;
    /** Resets the wheel and prize state back to the initial, pre-spin state. */
    resetRoulette: () => void;
}

/** Props for the Fluye Vital footer component. */
export interface IFluyaVitalFooterProps {
    className?: string;
}
