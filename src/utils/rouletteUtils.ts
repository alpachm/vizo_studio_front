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
    { angle: 0, isPrize: true, prizeNumber: 1, prizeLabel: "5 recargas" },
    { angle: 45, isPrize: false },
    { angle: 90, isPrize: true, prizeNumber: 2, prizeLabel: "2x1" },
    { angle: 135, isPrize: false },
    { angle: 180, isPrize: true, prizeNumber: 3, prizeLabel: "1 recarga" },
    { angle: 225, isPrize: false },
    { angle: 270, isPrize: true, prizeNumber: 4, prizeLabel: "1 bolsa de hielo" },
    { angle: 315, isPrize: false },
];

/**
 * Winning odds (as a percentage) for each slice, aligned by index with
 * `ROULETTE_SLICES`. Reading clockwise from 12 o'clock:
 *
 *   0 — Premio 1 (prize)          4 — Premio 3 (prize)
 *   1 — Sigue participando        5 — Sigue participando
 *   2 — Premio 2 (prize)          6 — Premio 4 (prize)
 *   3 — Sigue participando        7 — Sigue participando
 *
 * Values are treated as relative weights and are normalized internally, so they
 * never need to sum to exactly 100 — but keeping the total near 100 makes the
 * odds easy to read and tweak. Edit these numbers any time to change the chance
 * of landing on a given slice.
 */
export const ROULETTE_SLICE_WEIGHTS: ReadonlyArray<number> = [
    5, // Premio 1 — rarest top prize
    30, // Sigue participando
    10, // Premio 2
    20, // Sigue participando
    15, // Premio 3
    10, // Sigue participando
    5, // Premio 4
    5, // Sigue participando
];

/** Returns a random integer in the inclusive range [min, max]. */
const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Picks a winning slice index according to the configured weights, so rarer
 * prizes land less often than the consolation slices. Each weight represents
 * the relative chance of its slice; the total is normalized before the random
 * draw, so the array never needs to sum to exactly 100.
 *
 * @param weights Per-slice weights, aligned by index with `ROULETTE_SLICES`.
 * @returns The selected slice index (0–7).
 */
export const pickWeightedSliceIndex = (
    weights: ReadonlyArray<number> = ROULETTE_SLICE_WEIGHTS,
): number => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Guard against an empty or non-positive configuration so the wheel never
    // breaks if the odds are misconfigured: fall back to a uniform pick.
    if (totalWeight <= 0) {
        return randomInt(0, ROULETTE_SLICES.length - 1);
    }

    let roll = Math.random() * totalWeight;
    const sliceCount = Math.min(ROULETTE_SLICES.length, weights.length);

    for (let index = 0; index < sliceCount; index += 1) {
        roll -= weights[index];
        if (roll < 0) {
            return index;
        }
    }

    // Floating-point rounding safety net: default to the final slice.
    return sliceCount - 1;
};

/**
 * Picks a winning slice using the weighted odds. Used by `useRoulette` before
 * the target rotation is calculated, so the animation always stops on the slice
 * that was actually chosen by the probability draw.
 */
export const pickWeightedSlice = (): IFluyaVitalRouletteSlice =>
    ROULETTE_SLICES[pickWeightedSliceIndex()];

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
