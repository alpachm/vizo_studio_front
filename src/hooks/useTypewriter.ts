// ---------------------------------------------------------------------------
// useTypewriter — Character-by-character typewriter reveal for display text
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reveals a list of display lines character-by-character (typewriter effect).
 *
 * Returns the partially-revealed lines, the index of the line currently being
 * typed (used to position a caret) and a flag once typing is complete.
 * Respects `prefers-reduced-motion` by revealing everything instantly.
 */
export const useTypewriter = (
    lines: string[],
    startDelayMs = 300,
    typingSpeedMs = 55,
) => {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const text = lines.join("");
    const [flatIndex, setFlatIndex] = useState(0);
    const [prevText, setPrevText] = useState(text);

    // Reset typing progress when the source text changes (e.g. a language
    // switch). React's documented "adjust state during render" pattern.
    if (prevText !== text) {
        setPrevText(text);
        setFlatIndex(0);
    }

    useEffect(() => {
        if (shouldReduceMotion) {
            return;
        }

        let current = 0;
        let typeTimer: number | undefined;

        const typeNext = () => {
            if (current >= text.length) {
                return;
            }
            current += 1;
            setFlatIndex(current);
            typeTimer = window.setTimeout(typeNext, typingSpeedMs);
        };

        const startTimer = window.setTimeout(typeNext, startDelayMs);

        return () => {
            window.clearTimeout(startTimer);
            if (typeTimer !== undefined) {
                window.clearTimeout(typeTimer);
            }
        };
    }, [text, shouldReduceMotion, typingSpeedMs, startDelayMs]);

    // Reveal everything instantly when the user prefers reduced motion.
    const totalLength = text.length;
    const effectiveIndex = shouldReduceMotion ? totalLength : flatIndex;

    // Character offset where each line begins (prefix sums).
    const lineStarts = lines.map((_, index) =>
        lines.slice(0, index).reduce((sum, line) => sum + line.length, 0),
    );

    // Partially revealed text for each line.
    const displayedLines = lines.map((line, index) => {
        const start = lineStarts[index];
        const revealed = Math.max(0, effectiveIndex - start);
        return line.slice(0, Math.min(revealed, line.length));
    });

    // The first line that is not yet complete is the one holding the caret.
    const foundIndex = lines.findIndex(
        (line, index) => effectiveIndex < lineStarts[index] + line.length,
    );
    const activeLineIndex = foundIndex === -1 ? lines.length - 1 : foundIndex;

    return {
        displayedLines,
        activeLineIndex,
        isComplete: effectiveIndex >= totalLength,
    };
};