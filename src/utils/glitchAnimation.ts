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
    durationSeconds = 4.2,
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
    0%   { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 1 — Intense RGB chromatic split + horizontal slice */
    2%   { ${baseFontCss} text-shadow: -3px 0 rgba(255, 31, 107, 0.85), 3px 0 rgba(0, 224, 255, 0.85); transform: translate(2.5px, -1px) skewX(-6deg); }
    4%   { ${baseFontCss} text-shadow: 3px 0 rgba(0, 224, 255, 0.9), -3px 0 rgba(255, 31, 107, 0.9); transform: translate(-3px, 1px) skewX(5deg); clip-path: inset(10% 0 58% 0); }
    6%   { ${baseFontCss} text-shadow: -2px 0 rgba(255, 31, 107, 0.75), 2px 0 rgba(0, 224, 255, 0.75); transform: translate(1.5px, 1px); clip-path: inset(62% 0 8% 0); }
    8%   { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 2 — Momentary typography swap glitch #1 */
    24%  { ${swappedFontCss} text-shadow: -3.5px 0 rgba(255, 31, 107, 0.9), 3.5px 0 rgba(0, 224, 255, 0.9); transform: translate(-2px, 0) skewX(-5deg); }
    27%  { ${swappedFontCss} text-shadow: 2.5px 0 rgba(0, 224, 255, 0.85), -2.5px 0 rgba(255, 31, 107, 0.85), 0 0 12px rgba(243, 102, 29, 0.65); transform: translate(2px, -1px) skewX(3deg); }
    30%  { ${baseFontCss} text-shadow: -2px 0 rgba(255, 31, 107, 0.7), 2px 0 rgba(0, 224, 255, 0.7); transform: translate(-1px, 0); clip-path: inset(20% 0 45% 0); }
    32%  { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 3 — Sharp orange pulse + slice cut */
    52%  { ${baseFontCss} text-shadow: 0 0 14px rgba(243, 102, 29, 0.8), -2.5px 0 rgba(255, 31, 107, 0.8), 2.5px 0 rgba(0, 224, 255, 0.8); transform: translate(-2.5px, 1px) skewX(6deg); opacity: 0.94; }
    54%  { ${baseFontCss} text-shadow: 3px 0 rgba(255, 31, 107, 0.85), -3px 0 rgba(0, 224, 255, 0.85); transform: translate(2.5px, -1px) skewX(-4deg); clip-path: inset(68% 0 5% 0); }
    56%  { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 4 — Momentary typography swap glitch #2 */
    74%  { ${swappedFontCss} text-shadow: 3px 0 rgba(0, 224, 255, 0.9), -3px 0 rgba(255, 31, 107, 0.9); transform: translate(2px, 1px) skewX(-4deg); }
    78%  { ${swappedFontCss} text-shadow: -2.5px 0 rgba(255, 31, 107, 0.85), 2.5px 0 rgba(0, 224, 255, 0.85); transform: translate(-2px, -0.5px) skewX(4deg); }
    80%  { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }

    /* Burst 5 — Quick micro-slice before loop reset */
    91%  { ${baseFontCss} text-shadow: -2.5px 0 rgba(255, 31, 107, 0.8), 2.5px 0 rgba(0, 224, 255, 0.8); transform: translate(0, 1.5px) skewX(-3deg); clip-path: inset(12% 0 65% 0); opacity: 0.95; }
    93%  { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
    100% { ${baseFontCss} text-shadow: none; transform: none; clip-path: inset(0 0 0 0); opacity: 1; }
}
`;
}
