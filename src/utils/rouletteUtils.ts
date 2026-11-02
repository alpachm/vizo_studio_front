// ---------------------------------------------------------------------------
// rouletteUtils — Shared geometry & rotation helpers for the Fluye Vital wheel
// ---------------------------------------------------------------------------
import type { IFluyaVitalRouletteSlice } from "../interfaces/FluyaVitalInterface";

/** Degrees in a single full rotation. */
export const FULL_TURN = 360;

/** Minimum number of full rotations performed on every spin. */
export const MIN_FULL_SPINS = 5;

/** Maximum number of full rotations performed on every spin. */
export const MAX_FULL_SPINS = 8;

/** Duration (ms) of the wheel animation. Must match the CSS transition. */
export const SPIN_DURATION_MS = 6000;

/** Easing curve applied to the wheel's CSS transform transition. */
export const SPIN_EASING = "cubic-bezier(0.15, 0.95, 0.25, 1)";

/**
 * The eight slices in clockwise order starting at 12 o'clock. This mirrors the
 * geometry declared in `src/assets/FluyaVital/SVG/rouletteSVG.tsx` (45° per
 * slice, alternating prize / consolation), so the winning slice that lands
 * under the pointer always matches what is rendered on screen.
 */
export const ROULETTE_SLICES: ReadonlyArray<IFluyaVitalRouletteSlice> = [
    { angle: 0, isPrize: true },
    { angle: 45, isPrize: false },
    { angle: 90, isPrize: true },
    { angle: 135, isPrize: false },
    { angle: 180, isPrize: true },
    { angle: 225, isPrize: false },
    { angle: 270, isPrize: true },
    { angle: 315, isPrize: false },
];

/** Returns a random integer in the inclusive range [min, max]. */
const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/** Picks a random slice as the outcome of a spin. */
export const pickRandomSlice = (): IFluyaVitalRouletteSlice => {
    const index = randomInt(0, ROULETTE_SLICES.length - 1);
    return ROULETTE_SLICES[index];
};

/**
 * Calculates the absolute target rotation (degrees) that ends with the winning
 * slice centred under the pointer at 12 o'clock.
 *
 * The wheel rotates clockwise while the pointer stays fixed at the top, so a
 * slice located at `winningSliceAngle` (measured clockwise from 12 o'clock)
 * must be rotated by `360 - winningSliceAngle` to reach the pointer. A handful
 * of full turns are prepended so the stop always feels dynamic, and the current
 * rotation is carried forward so consecutive spins keep accumulating instead of
 * rewinding.
 *
 * @param currentRotation Current accumulated rotation in degrees.
 * @param winningSliceAngle Radial centre of the slice to land on (degrees).
 * @param fullSpins Number of complete 360° rotations to prepend.
 * @returns The new absolute rotation to apply to the rotating group.
 */
export const calculateTargetRotation = (
    currentRotation: number,
    winningSliceAngle: number,
    fullSpins: number = randomInt(MIN_FULL_SPINS, MAX_FULL_SPINS),
): number => {
    const normalizedCurrent = ((currentRotation % FULL_TURN) + FULL_TURN) % FULL_TURN;
    const normalizedWinning = ((winningSliceAngle % FULL_TURN) + FULL_TURN) % FULL_TURN;
    const offset = (FULL_TURN - normalizedWinning - normalizedCurrent + FULL_TURN) % FULL_TURN;

    return currentRotation + fullSpins * FULL_TURN + offset;
};
