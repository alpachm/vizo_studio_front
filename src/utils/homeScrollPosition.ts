// ---------------------------------------------------------------------------
// homeScrollPosition — Preserves the user's scroll position and Hero intro
// completion state across client-side route transitions (e.g. "/" <-> "/about")
// so returning to the Home screen resumes at the exact spot the user left off.
// ---------------------------------------------------------------------------

let savedHomeScrollY = 0;
let shouldSkipRestoreOnce = false;
let heroIntroCompleted = false;

/** Records the current vertical scroll offset of the Home screen. */
export function saveHomeScrollY(scrollY: number): void {
    savedHomeScrollY = Math.max(0, scrollY);
}

/** Returns the last recorded vertical scroll offset of the Home screen. */
export function getSavedHomeScrollY(): number {
    return savedHomeScrollY;
}

/**
 * Flags that the next Home screen mount should NOT restore the previous scroll
 * position (used when explicitly jumping to a specific section or top of page).
 */
export function skipNextHomeScrollRestore(): void {
    shouldSkipRestoreOnce = true;
}

/** Consumes and returns whether scroll restoration should be skipped once. */
export function consumeSkipHomeScrollRestore(): boolean {
    const skip = shouldSkipRestoreOnce;
    shouldSkipRestoreOnce = false;
    return skip;
}

/** Marks the Hero typewriter/rolling intro as already seen in this session. */
export function markHeroIntroCompleted(): void {
    heroIntroCompleted = true;
}

/** Returns whether the Hero typewriter/rolling intro was already completed. */
export function hasCompletedHeroIntro(): boolean {
    return heroIntroCompleted;
}
