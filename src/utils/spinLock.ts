// ---------------------------------------------------------------------------
// spinLock — Persistent single-spin lock for the Fluye Vital roulette
// ---------------------------------------------------------------------------
import type { ISpinLockRecord } from "../interfaces/FluyaVitalInterface";

/** localStorage key used to persist the single-spin lock. */
export const SPIN_LOCK_STORAGE_KEY = "fluya_vital_spin_lock";

/**
 * How long a completed spin stays locked in production single-spin mode.
 * 48 hours = 2 days.
 */
export const SPIN_LOCK_DURATION_MS = 48 * 60 * 60 * 1000;

/**
 * Reads the persisted lock record, if any. Returns null when the entry is
 * missing, malformed or unreadable (e.g. private browsing / quota errors),
 * treating those cases the same as "no lock" so the wheel never hard-fails.
 */
export const readSpinLock = (): ISpinLockRecord | null => {
    try {
        const raw = window.localStorage.getItem(SPIN_LOCK_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as ISpinLockRecord;
        if (
            typeof parsed.executedAt !== "number" ||
            typeof parsed.expiresAt !== "number"
        ) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
};

/**
 * True when a valid, non-expired lock exists for the given instant. The wheel
 * must stay disabled while this returns true in production single-spin mode.
 */
export const isSpinLockActive = (now: number = Date.now()): boolean => {
    const record = readSpinLock();
    return record !== null && now < record.expiresAt;
};

/**
 * Persists a fresh lock with an expiration 48 hours from the given instant.
 * Failures are swallowed so storage restrictions never break the spin itself.
 */
export const writeSpinLock = (now: number = Date.now()): void => {
    try {
        const record: ISpinLockRecord = {
            executedAt: now,
            expiresAt: now + SPIN_LOCK_DURATION_MS,
        };
        window.localStorage.setItem(SPIN_LOCK_STORAGE_KEY, JSON.stringify(record));
    } catch {
        // Storage unavailable — fail open and keep the in-memory guard.
    }
};

/** Removes the persisted lock (expired entry, test mode, or manual reset). */
export const clearSpinLock = (): void => {
    try {
        window.localStorage.removeItem(SPIN_LOCK_STORAGE_KEY);
    } catch {
        // Nothing to do when storage is unavailable.
    }
};
