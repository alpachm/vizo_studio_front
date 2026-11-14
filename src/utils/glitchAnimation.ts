// ---------------------------------------------------------------------------
// glitchAnimation — Reusable CSS keyframe generator for digital text glitch
// with RGB chromatic aberration, slice cuts, and momentary typography swaps.
// ---------------------------------------------------------------------------
import type { IGlitchAnimationOptions } from "../interfaces/HomeScreenInterface";

/**
 * Generates a self-contained CSS `<style>` string that attaches an intense
 * digital glitch + brief typography-swap animation to `.${options.className}`.
 *
 * - `"mono-to-playfair"` (default): resting font is `JetBrains Mono`, briefly
 *   glitching into `Playfair Display Italic` before snapping back.
 * - `"playfair-to-mono"`: resting font is `Playfair Display Italic`, briefly
 *   glitching into `JetBrains Mono` before snapping back.
 */
export function getGlitchAnimationStyles({
    className,
    fontSwapMode = "mono-to-playfair",
    durationSeconds = 9,
    minWidth,
}: IGlitchAnimationOptions): string {
    const keyframeName = `${className}-keyframes`;

    const isPlayfairBase = fontSwapMode === "playfair-to-mono";
    const minWidthRule = minWidth ? `min-width: ${minWidth}; white-space: nowrap;` : "";

    const baseFontCss = isPlayfairBase
        ? `font-family: "Playfair Display", serif; font-style: italic; font-weight: 400; letter-spacing: 0em;`
        : `font-family: "JetBrains Mono", monospace; font-style: normal; font-weight: 700; letter-spacing: 0em;`;

    const swappedFontCss = isPlayfairBase
        ? `font-family: "JetBrains Mono", monospace; font-style: normal; font-weight: 700; letter-spacing: -0.04em;`
        : `font-family: "Playfair Display", serif; font-style: italic; font-weight: 700; letter-spacing: 0.03em;`;

    return `
@media (prefers-reduced-motion: no-preference) {
    .${className} {
        display: inline-block;
        ${minWidthRule}
        will-change: transform, text-shadow, clip-path;
        animation: ${keyframeName} ${durationSeconds}s steps(1, end) infinite;
    }
}

@keyframes ${keyframeName} {
    /* Calm reading window (0% -> 18%: ~1.6s) */
    0%    { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 1 — Intense RGB chromatic split + horizontal slice (~270ms) */
    18%   { ${baseFontCss} text-shadow: -3px 0 rgba(255, 31, 107, 0.85), 3px 0 rgba(0, 224, 255, 0.85); transform: translate(2.5px, -1px) skewX(-6deg); }
    19%   { ${baseFontCss} text-shadow: 3px 0 rgba(0, 224, 255, 0.9), -3px 0 rgba(255, 31, 107, 0.9); transform: translate(-3px, 1px) skewX(5deg); clip-path: inset(10% 0 58% 0); }
    20%   { ${baseFontCss} text-shadow: -2px 0 rgba(255, 31, 107, 0.75), 2px 0 rgba(0, 224, 255, 0.75); transform: translate(1.5px, 1px); clip-path: inset(62% 0 8% 0); }
    21%   { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Calm reading window (21% -> 52%: ~2.8s) */

    /* Burst 2 — Momentary typography swap + RGB glitch (~360ms) */
    52%   { ${swappedFontCss} text-shadow: -3.5px 0 rgba(255, 31, 107, 0.9), 3.5px 0 rgba(0, 224, 255, 0.9); transform: translate(-2px, 0) skewX(-5deg); }
    53.5% { ${swappedFontCss} text-shadow: 2.5px 0 rgba(0, 224, 255, 0.85), -2.5px 0 rgba(255, 31, 107, 0.85), 0 0 12px rgba(243, 102, 29, 0.65); transform: translate(2px, -1px) skewX(3deg); }
    55%   { ${baseFontCss} text-shadow: -2px 0 rgba(255, 31, 107, 0.7), 2px 0 rgba(0, 224, 255, 0.7); transform: translate(-1px, 0); clip-path: inset(20% 0 45% 0); }
    56%   { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Calm reading window (56% -> 86%: ~2.7s) */

    /* Burst 3 — Second typography swap + sharp orange pulse & slice (~360ms) */
    86%   { ${ baseFontCss } text-shadow: 0 0 14px rgba(243, 102, 29, 0.8), -2.5px 0 rgba(255, 31, 107, 0.8), 2.5px 0 rgba(0, 224, 255, 0.8); transform: translate(-2.5px, 1px) skewX(6deg); opacity: 0.94; }
    87.5% { ${swappedFontCss} text-shadow: 3px 0 rgba(0, 224, 255, 0.9), -3px 0 rgba(255, 31, 107, 0.9); transform: translate(2px, 1px) skewX(-4deg); }
    89%   { ${swappedFontCss} text-shadow: -2.5px 0 rgba(255, 31, 107, 0.85), 2.5px 0 rgba(0, 224, 255, 0.85); transform: translate(-2px, -0.5px) skewX(4deg); clip-path: inset(68% 0 5% 0); }
    90%   { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Calm reading window (90% -> 100% + 0% -> 18%: ~2.5s total) */
    100%  { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
}
`;
}
