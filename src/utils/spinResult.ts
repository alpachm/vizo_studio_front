// ---------------------------------------------------------------------------
// spinResult — Persistent resolved prize for the Fluye Vital roulette
// ---------------------------------------------------------------------------
import type {
    IFluyaVitalRouletteSlice,
    IPersistedSpinResult,
} from "../interfaces/FluyaVitalInterface";
import { ROULETTE_SLICES } from "./rouletteUtils";

/** localStorage key used to persist the resolved spin result. */
export const SPIN_RESULT_STORAGE_KEY = "fluya_vital_spin_result";

/**
 * Reads the persisted result slice and rebuilds the canonical slice (icon
 * included) by matching its angle against the deterministic `ROULETTE_SLICES`.
 *
 * The `prizeIcon` field is a React component (`IconType`) and is therefore not
 * JSON-serializable, so only the serializable fields are stored and the full
 * slice is reconstructed here. Returns null when the entry is missing,
 * malformed or unreadable (treating those cases as "no result").
 */
export const readSpinResult = (): IFluyaVitalRouletteSlice | null => {
    try {
        const raw = window.localStorage.getItem(SPIN_RESULT_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as IPersistedSpinResult;
        if (
            typeof parsed.angle !== "number" ||
            typeof parsed.isPrize !== "boolean"
        ) {
            return null;
        }

        return (
            ROULETTE_SLICES.find((slice) => slice.angle === parsed.angle) ?? null
        );
    } catch {
        return null;
    }
};

/**
 * Persists a serializable snapshot of the resolved slice. Failures are
 * swallowed so storage restrictions never break the spin itself.
 */
export const writeSpinResult = (result: IFluyaVitalRouletteSlice): void => {
    try {
        const snapshot: IPersistedSpinResult = {
            angle: result.angle,
            isPrize: result.isPrize,
            prizeNumber: result.prizeNumber,
            prizeLabel: result.prizeLabel,
        };
        window.localStorage.setItem(SPIN_RESULT_STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
        // Storage unavailable — fail open and keep the in-memory result.
    }
};

/** Removes the persisted result (expired lock, test mode, or manual reset). */
export const clearSpinResult = (): void => {
    try {
        window.localStorage.removeItem(SPIN_RESULT_STORAGE_KEY);
    } catch {
        // Nothing to do when storage is unavailable.
    }
};
