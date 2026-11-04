// ---------------------------------------------------------------------------
// Feature flags — runtime behaviour toggles driven by environment variables
// ---------------------------------------------------------------------------

/**
 * VITE_ALLOW_MULTIPLE_SPINS switches the Fluye Vital roulette between two
 * non-winning experiences:
 *
 * - "true"  → Unlimited / test mode: a non-winning spin can be retried.
 * - anything else ("false" / unset) → Production / single-spin mode: a
 *   non-winning spin is conclusive and the modal only offers to close.
 */
const rawAllowMultipleSpins: string =
    import.meta.env.VITE_ALLOW_MULTIPLE_SPINS;

export const ALLOW_MULTIPLE_SPINS: boolean = rawAllowMultipleSpins === "true" ? true : false;
