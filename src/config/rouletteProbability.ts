// ---------------------------------------------------------------------------
// Roulette probability — VITE_ROULETTE_PROBABILITY_LEVEL configuration
// ---------------------------------------------------------------------------
import type { RouletteProbabilityLevel } from "../interfaces/FluyaVitalInterface";

/**
 * VITE_ROULETTE_PROBABILITY_LEVEL tunes how often the Fluye Vital wheel lands
 * on a winning slice:
 *
 * - "low"    → mostly "Sigue participando"; top prizes are very rare.
 * - "medium" → balanced / standard distribution (default).
 * - "high"   → very frequent wins (recargas and special prizes).
 *
 * Missing, empty or unrecognized values gracefully fall back to "medium" so a
 * misconfiguration never breaks the wheel or silently rigs the odds.
 */
const rawLevel: unknown = import.meta.env.VITE_ROULETTE_PROBABILITY_LEVEL;

/** Type guard: narrows an unknown value down to a valid probability level. */
const isRouletteProbabilityLevel = (
    value: unknown,
): value is RouletteProbabilityLevel =>
    value === "low" || value === "medium" || value === "high";

const normalizedLevel: string =
    typeof rawLevel === "string" ? rawLevel.trim().toLowerCase() : "";

/** Centralized, validated source of truth for the win-probability level. */
export const ROULETTE_PROBABILITY_LEVEL: RouletteProbabilityLevel =
    isRouletteProbabilityLevel(normalizedLevel) ? normalizedLevel : "medium";

/** Returns the resolved win-probability level (with graceful fallback). */
export const getRouletteProbabilityLevel = (): RouletteProbabilityLevel =>
    ROULETTE_PROBABILITY_LEVEL;