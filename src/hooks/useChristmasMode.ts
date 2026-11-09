// ---------------------------------------------------------------------------
// useChristmasMode — hook exposing the global Christmas mode flag
// ---------------------------------------------------------------------------
import { CHRISTMAS_MODE } from "../config/christmasMode";

/**
 * Returns whether the Fluye Vital "Modo Navidad" is enabled. Read-only for now:
 * it resolves the build-time `VITE_CHRISTMAS_MODE` flag so components can branch
 * on it for future conditional styling without touching the config directly.
 */

export const useChristmasMode = (): boolean => CHRISTMAS_MODE;