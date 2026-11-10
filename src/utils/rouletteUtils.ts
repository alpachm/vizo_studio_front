// ---------------------------------------------------------------------------
// rouletteUtils — Shared geometry & rotation helpers for the Fluye Vital wheel
// ---------------------------------------------------------------------------
import { FiCloudSnow, FiDroplet, FiTag } from "react-icons/fi";
import type { IFluyaVitalRouletteSlice, RouletteProbabilityLevel } from "../interfaces/FluyaVitalInterface";
import { ROULETTE_PROBABILITY_LEVEL } from "../config/rouletteProbability";

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
 * The eight slices in clockwise order starting at 12 o'clock. This is the
 * single source of truth for the wheel: `src/assets/FluyaVital/SVG/rouletteSVG.tsx`
 * consumes these same slices (45° per slice, alternating prize / consolation)
 * to render the labels and icons, so the winning slice that lands under the
 * pointer always matches what is rendered on screen.
 */
export const ROULETTE_SLICES: ReadonlyArray<IFluyaVitalRouletteSlice> = [
    { angle: 0, isPrize: true, prizeNumber: 1, prizeLabel: "5 recargas", prizeIcon: FiDroplet },
    { angle: 45, isPrize: false },
    { angle: 90, isPrize: true, prizeNumber: 2, prizeLabel: "2x1", prizeIcon: FiTag },
    { angle: 135, isPrize: false },
    { angle: 180, isPrize: true, prizeNumber: 3, prizeLabel: "1 recarga", prizeIcon: FiDroplet },
    { angle: 225, isPrize: false },
    { angle: 270, isPrize: true, prizeNumber: 4, prizeLabel: "1 bolsa de hielo", prizeIcon: FiCloudSnow },
    { angle: 315, isPrize: false },
];

/**
 * Winning odds (as a percentage) for each slice, aligned by index with
 * `ROULETTE_SLICES`. This is the balanced / standard ("medium") distribution
 * used as the default and fallback. Reading clockwise from 12 o'clock:
 *
 *   0 — Premio 1 (prize)          4 — Premio 3 (prize)
 *   1 — Sigue participando        5 — Sigue participando
 *   2 — Premio 2 (prize)          6 — Premio 4 (prize)
 *   3 — Sigue participando        7 — Sigue participando
 *
 * Values are treated as relative weights and are normalized internally, so they
 * never need to sum to exactly 100 — but keeping the total near 100 makes the
 * odds easy to read and tweak.
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

/**
 * "Low" win-probability weights: the "Sigue participando" consolation slices
 * dominate the wheel and the top prizes are reduced to a minimal chance.
 * Aligned by index with `ROULETTE_SLICES` (sums to 100 for readability).
 */
export const ROULETTE_WEIGHTS_LOW: ReadonlyArray<number> = [
    2, // Premio 1 — 5 recargas (baja de 5 a 2)
    40, // Sigue participando (sube de 30 a 40)
    5, // Premio 2 — 2x1 (baja de 10 a 5)
    25, // Sigue participando (sube de 20 a 25)
    8, // Premio 3 — 1 recarga (baja de 15 a 8)
    15, // Sigue participando (sube de 10 a 15)
    2, // Premio 4 — 1 bolsa de hielo (baja de 5 a 2)
    3, // Sigue participando (baja de 5 a 3)
];

/**
 * "High" win-probability weights: winning slices (recargas and special prizes)
 * are heavily favoured so a win happens much more frequently. Aligned by index
 * with `ROULETTE_SLICES` (sums to 100 for readability).
 */
export const ROULETTE_WEIGHTS_HIGH: ReadonlyArray<number> = [
    20, // Premio 1 — 5 recargas
    8, // Sigue participando
    16, // Premio 2 — 2x1
    6, // Sigue participando
    24, // Premio 3 — 1 recarga
    6, // Sigue participando
    12, // Premio 4 — 1 bolsa de hielo
    8, // Sigue participando
];

/**
 * Maps each win-probability level to its per-slice weight array. `medium` is
 * the balanced/default `ROULETTE_SLICE_WEIGHTS` distribution.
 */
export const ROULETTE_WEIGHTS_BY_LEVEL: Readonly<
    Record<RouletteProbabilityLevel, ReadonlyArray<number>>
> = {
    low: ROULETTE_WEIGHTS_LOW,
    medium: ROULETTE_SLICE_WEIGHTS,
    high: ROULETTE_WEIGHTS_HIGH,
};

/**
 * Resolves the per-slice weights for the requested win-probability level.
 *
 * @param level Win-probability level (`"low" | "medium" | "high"`).
 * @returns Per-slice weights, aligned by index with `ROULETTE_SLICES`.
 */
export const getRouletteWeights = (
    level: RouletteProbabilityLevel,
): ReadonlyArray<number> => ROULETTE_WEIGHTS_BY_LEVEL[level];

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
 * Picks a winning slice using the odds for the configured probability level
 * (`VITE_ROULETTE_PROBABILITY_LEVEL`). Used by `useRoulette` before the target
 * rotation is calculated, so the animation always stops on the slice that was
 * actually chosen by the probability draw.
 */
export const pickWeightedSlice = (): IFluyaVitalRouletteSlice =>
    ROULETTE_SLICES[pickWeightedSliceIndex(getRouletteWeights(ROULETTE_PROBABILITY_LEVEL))];

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
