// ---------------------------------------------------------------------------
// Christmas mode — global Fluye Vital "Modo Navidad" feature flag
// ---------------------------------------------------------------------------

/**
 * VITE_CHRISTMAS_MODE switches the Fluye Vital screen into its Christmas
 * experience. This is a build-time toggle only: it establishes the flag and
 * state infrastructure for future conditional styling, so no visual change is
 * applied here yet.
 *
 * - "true"  → Christmas mode is active.
 * - anything else ("false" / unset) → Normal mode (default).
 */
const rawChristmasMode: string = import.meta.env.VITE_CHRISTMAS_MODE;

/** Centralized source of truth for the Christmas mode state. */
export const CHRISTMAS_MODE: boolean = rawChristmasMode === "true";

/** Returns whether Christmas mode is currently active. */
export const isChristmasModeActive = (): boolean => CHRISTMAS_MODE;