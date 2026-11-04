// ---------------------------------------------------------------------------
// useRoulette — Spin state machine for the Fluye Vital prize wheel
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from "react";
import type { IFluyaVitalRouletteSlice, IUseRouletteResult } from "../interfaces/FluyaVitalInterface";
import { SPIN_DURATION_MS, calculateTargetRotation, pickWeightedSlice } from "../utils/rouletteUtils";
import { ALLOW_MULTIPLE_SPINS } from "../utils/featureFlags";
import { clearSpinLock, isSpinLockActive, writeSpinLock } from "../utils/spinLock";

/**
 * Owns the roulette spin lifecycle: it picks the winning slice, computes the
 * target rotation, drives the `isSpinning` flag and resolves the selected prize
 * once the wheel animation finishes.
 *
 * It also tracks whether the user has already participated (`hasSpun`) so the
 * screen can lock the spin button when `VITE_ALLOW_MULTIPLE_SPINS` is disabled.
 */
export const useRoulette = (): IUseRouletteResult => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedPrize, setSelectedPrize] = useState<IFluyaVitalRouletteSlice | null>(null);

    // Restore the persisted single-spin lock during the initial render so a
    // reload keeps the wheel disabled for the remaining 48h window without a
    // setState-in-effect. In test mode the lock is always ignored.
    const [hasSpun, setHasSpun] = useState<boolean>(
        () => !ALLOW_MULTIPLE_SPINS && isSpinLockActive(),
    );

    // Refs guard against double-clicks, enforce the single-spin lock and let us
    // clean up the timeout on unmount.
    const spinningRef = useRef(false);
    const hasSpunRef = useRef<boolean>(hasSpun);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Reconcile the persisted lock with the current mode (side effects only).
        // Test mode drops the lock; production drops it once it has expired or
        // is missing, leaving an active lock in place to keep the wheel locked.
        if (ALLOW_MULTIPLE_SPINS || !isSpinLockActive()) {
            clearSpinLock();
        }

        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const spinWheel = useCallback(() => {
        // Single-spin mode blocks further spins once the user has already
        // participated. This guards programmatic calls even though the button is
        // also disabled in the UI for the same reason.
        if (spinningRef.current || (!ALLOW_MULTIPLE_SPINS && hasSpunRef.current)) return;

        const winner = pickWeightedSlice();
        spinningRef.current = true;
        hasSpunRef.current = true;
        setIsSpinning(true);
        setSelectedPrize(null);
        setHasSpun(true);

        // Persist the single-spin lock in production mode so the restriction
        // survives a page reload for the configured 48-hour window.
        if (!ALLOW_MULTIPLE_SPINS) {
            writeSpinLock();
        }

        // Always accumulate on top of the current rotation so the wheel keeps
        // spinning forward and the CSS transition animates between the two.
        setRotation((current) => calculateTargetRotation(current, winner.angle));

        timeoutRef.current = window.setTimeout(() => {
            spinningRef.current = false;
            setIsSpinning(false);
            setSelectedPrize(winner);
        }, SPIN_DURATION_MS);
    }, []);

    // Resets the wheel back to its pristine, pre-spin state (used when the user
    // leaves the post-spin view and returns to the roulette). In unlimited mode
    // this also re-arms the spin button; in single-spin mode the participation
    // stays locked so the button remains disabled.
    const resetRoulette = useCallback(() => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        spinningRef.current = false;
        setIsSpinning(false);
        setRotation(0);
        setSelectedPrize(null);

        if (ALLOW_MULTIPLE_SPINS) {
            hasSpunRef.current = false;
            setHasSpun(false);
        } else {
            // Production: re-read the persisted lock so returning to the wheel
            // keeps it disabled while the lock is active, and re-arms it only
            // once the 48-hour window has actually expired.
            const locked = isSpinLockActive();
            hasSpunRef.current = locked;
            setHasSpun(locked);
        }
    }, []);

    return { isSpinning, rotation, selectedPrize, hasSpun, spinWheel, resetRoulette };
};
