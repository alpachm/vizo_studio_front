// ---------------------------------------------------------------------------
// useRoulette — Spin state machine for the Fluye Vital prize wheel
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from "react";
import type { IFluyaVitalRouletteSlice, IUseRouletteResult } from "../interfaces/FluyaVitalInterface";
import { SPIN_DURATION_MS, calculateTargetRotation, pickWeightedSlice } from "../utils/rouletteUtils";

/**
 * Owns the roulette spin lifecycle: it picks the winning slice, computes the
 * target rotation, drives the `isSpinning` flag and resolves the selected prize
 * once the wheel animation finishes.
 */
export const useRoulette = (): IUseRouletteResult => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedPrize, setSelectedPrize] = useState<IFluyaVitalRouletteSlice | null>(null);

    // Refs guard against double-clicks and let us clean up the timeout on unmount.
    const spinningRef = useRef(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const spinWheel = useCallback(() => {
        if (spinningRef.current) return;

        const winner = pickWeightedSlice();
        spinningRef.current = true;
        setIsSpinning(true);
        setSelectedPrize(null);

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
    // leaves the post-spin view and returns to the roulette).
    const resetRoulette = useCallback(() => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        spinningRef.current = false;
        setIsSpinning(false);
        setRotation(0);
        setSelectedPrize(null);
    }, []);

    return { isSpinning, rotation, selectedPrize, spinWheel, resetRoulette };
};
