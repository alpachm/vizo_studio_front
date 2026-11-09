import type { CSSProperties } from "react";
import type { IRouletteSVGProps } from "../../../interfaces/FluyaVitalInterface";
import { ROULETTE_SLICES, SPIN_DURATION_MS, SPIN_EASING } from "../../../utils/rouletteUtils";
import { CHRISTMAS_MODE } from "../../../config/christmasMode";
import christmasHatPng from "../christmas-hat.png";
import fluyaVitalLogo from "../fluyta-vital-logo.png";

// ---------------------------------------------------------------------------
// Roulette slice labels — geometry helpers & slice content configuration.
// ---------------------------------------------------------------------------

/** Centre of the roulette wheel, shared by the eight coloured slices. */
const WHEEL_CX = 255.85;
const WHEEL_CY = 301.5;

/**
 * Fluye Vital brand mark overlaid on the static white hub at the wheel's
 * geometric centre. The height is sized so the mark sits comfortably inside
 * the white cap (radius ≈ 43.1) with an even breathing border, while the width
 * preserves the asset's intrinsic 398 × 482 aspect ratio to avoid distortion.
 */
const LOGO_HEIGHT = 54;
const LOGO_WIDTH = LOGO_HEIGHT * (398 / 482);
const LOGO_X = WHEEL_CX - LOGO_WIDTH / 2;
const LOGO_Y = WHEEL_CY - LOGO_HEIGHT / 2;

/**
 * Decorative Santa hat overlaid on the roulette when the Fluye Vital Christmas
 * mode is enabled. It is rendered outside the rotating wheel group, so the
 * slices spin underneath while the hat stays fixed on top. The 740 × 636 asset
 * is scaled to a prominent height and repositioned to drape over the upper-right
 * quadrant of the golden rim (instead of the dead-centre top pin), then tilted
 * 15° clockwise around its brim's bottom-centre so it rests comfortably over
 * the rim while leaning to the right.
 */
const CHRISTMAS_HAT_HEIGHT = 160;
const CHRISTMAS_HAT_WIDTH = 1000;
const CHRISTMAS_HAT_CENTER_X = 380;
const CHRISTMAS_HAT_CENTER_Y = 42;
const CHRISTMAS_HAT_X = CHRISTMAS_HAT_CENTER_X - CHRISTMAS_HAT_WIDTH / 2;
const CHRISTMAS_HAT_Y = CHRISTMAS_HAT_CENTER_Y - CHRISTMAS_HAT_HEIGHT / 2;
const CHRISTMAS_HAT_TILT = 27;
/** Bottom-centre of the brim: the pivot the hat swings around as it tilts. */
const CHRISTMAS_HAT_PIVOT_X = CHRISTMAS_HAT_CENTER_X;
const CHRISTMAS_HAT_PIVOT_Y = CHRISTMAS_HAT_CENTER_Y + CHRISTMAS_HAT_HEIGHT / 2;

/** Radial distance (from the wheel centre) of the label text block anchor. */
const TEXT_RADIUS = 162;

/** Vertical gap between the two stacked text lines of the white slice label. */
const TEXT_LINE_GAP = 12;

/** Vertical gap between the text block and the icon placed directly below it. */
const ICON_GAP = 24;

/** Typography used by the slice labels (Fluye Vital brand font). */
const SLICE_FONT_FAMILY = "'Montserrat', sans-serif";

/**
 * Computes the (x, y) coordinate that lies `radius` units away from the wheel
 * centre along the radial axis of a slice. `angle` is measured clockwise from
 * the 12 o'clock position, matching the SVG's y-down coordinate system.
 */
const radialPoint = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
        x: WHEEL_CX + radius * Math.sin(radians),
        y: WHEEL_CY - radius * Math.cos(radians),
    };
};

/**
 * The eight slices in clockwise order starting at 12 o'clock are declared once
 * in `src/utils/rouletteUtils.ts` (`ROULETTE_SLICES`) so the labels, icons and
 * winning geometry stay in sync with the spin logic. `isPrize` identifies the
 * blue "Premio" slices (each tagged with its `prizeNumber` and `prizeIcon`);
 * the white slices display the "Sigue participando" consolation message.
 */

/**
 * Staggered twinkle timings for the seven rim lightbulbs. The outer glow and
 * the inner white core of a single bulb share the same entry so they pulse in
 * perfect sync, while delays and durations vary across bulbs to produce an
 * organic, non-uniform blinking pattern (no two bulbs blink in lockstep).
 */
const BULB_TWINKLE_TIMINGS: ReadonlyArray<{ duration: string; delay: string }> = [
    { duration: "0.5s", delay: "0s" },
    { duration: "0.5s", delay: "0.2s" },
    { duration: "0.5s", delay: "0.4s" },
    { duration: "0.5s", delay: "0.6s" },
    { duration: "0.5s", delay: "0.8s" },
    { duration: "0.5s", delay: "1s" },
    { duration: "0.5s", delay: "1.2s" },
];

/** Builds the inline style that applies the twinkle animation to a bulb group. */
const twinkleStyle = (index: number): CSSProperties => ({
    animationName: "bulb-twinkle",
    animationDuration: BULB_TWINKLE_TIMINGS[index].duration,
    animationDelay: BULB_TWINKLE_TIMINGS[index].delay,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
});

/**
 * Festive orange/gold accent colours for the roulette outer frame, applied only
 * when the Fluye Vital Christmas mode is enabled (`VITE_CHRISTMAS_MODE=true`).
 */
const CHRISTMAS_FRAME_START = "#E89228";
const CHRISTMAS_FRAME_END = "#F39C12";

const RouletteSVG = ({ rotation = 0, isChristmas = false, ...props }: IRouletteSVGProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={512} height={558} fill="none" {...props}>
        <style>{`
            @keyframes bulb-twinkle {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
        `}</style>
        <ellipse cx={255.85} cy={70.5} fill="url(#a)" rx={47.5} ry={70.5} />
        <circle cx={255.85} cy={301.5} r={251.5} fill="url(#b)" />
        <circle cx={255.849} cy={301.5} r={237.937} fill="url(#c)" />
        <circle cx={255.849} cy={301.5} r={223.469} fill="#0B2545" />
        <mask
            id="d"
            width={424}
            height={425}
            x={44}
            y={89}
            maskUnits="userSpaceOnUse"
            style={{
                maskType: "alpha",
            }}
        >
            <circle cx={255.85} cy={301.5} r={211.585} fill="#5E87FF" />
        </mask>
        <g mask="url(#d)">
            {/* ---- Rotating wheel group: slices + labels spin together around the centre ---- */}
            <g
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: "center",
                    transformBox: "fill-box",
                    transition: `transform ${SPIN_DURATION_MS}ms ${SPIN_EASING}`,
                    willChange: "transform",
                }}
            >
                <path
                    fill="#00B4D8"
                    d="M255.85 41.918c38.612 0 75.255 8.43 108.189 23.551L255.85 301.5 166.137 57.838c27.959-10.298 58.179-15.92 89.713-15.92Z"
                />
                <path
                    fill="#00B4D8"
                    d="M515.432 301.486c0 38.612-8.43 75.255-23.551 108.189L255.85 301.486l243.662-89.713c10.297 27.959 15.92 58.179 15.92 89.713ZM255.781 561.082c-38.612 0-75.256-8.431-108.19-23.551L255.78 301.5l89.713 243.662c-27.959 10.298-58.179 15.92-89.712 15.92Z"
                />
                <path
                    fill="#00B4D8"
                    d="M-3.733 301.564c0-38.612 8.43-75.255 23.551-108.189L255.85 301.564 12.188 391.277C1.89 363.318-3.733 333.098-3.733 301.564Z"
                />
                <path
                    fill="#fff"
                    d="M439.376 118.02c27.304 27.303 47.253 59.176 59.849 93.156l-243.4 90.397L364.683 65.842c27.051 12.488 52.396 29.88 74.693 52.178Z"
                />
                <path
                    fill="#fff"
                    d="M439.376 485.027c-27.303 27.303-59.175 47.252-93.155 59.848l-90.398-243.401 235.732 108.858c-12.489 27.052-29.882 52.397-52.179 74.695ZM72.237 485.026c-27.303-27.303-47.253-59.175-59.849-93.156l243.4-90.397L146.93 537.205c-27.051-12.488-52.396-29.881-74.693-52.179Z"
                />
                <path
                    fill="#fff"
                    d="M72.37 118.02c27.303-27.303 59.175-47.252 93.154-59.848l90.398 243.401-235.73-108.859c12.488-27.052 29.88-52.397 52.178-74.694Z"
                />
                <g filter="url(#e)">
                    <circle cx={255.85} cy={301.5} r={208.948} stroke="#000" strokeWidth={20} />
                </g>
                {/* ---- Slice labels: text + icon rotated to follow each wedge's radial angle ---- */}
                {ROULETTE_SLICES.map((slice) => {
                    const { angle, isPrize, prizeLabel, prizeIcon } = slice;
                    const PrizeIcon = prizeIcon;
                    const labelFill = isPrize ? "#FFFFFF" : "#0B2545";

                    // Each label is rotated by the slice's own radial angle so the top
                    // of every glyph always points outward toward the rim. `radialPoint`
                    // already positions each anchor along the slice axis (0° at 12
                    // o'clock, increasing clockwise), so reusing that same angle as the
                    // rotation keeps the copy readable and uniformly oriented around the
                    // whole wheel — no extra 180° counter-rotation is required (that
                    // flip was inverting the right-side and bottom sectors).

                    // Text sits at the outer edge (rim); the icon sits just below it,
                    // radially inward (closer to the centre of the wheel).
                    const textAnchor = radialPoint(angle, TEXT_RADIUS);
                    const iconAnchor = radialPoint(
                        angle,
                        isPrize ? TEXT_RADIUS - ICON_GAP : TEXT_RADIUS - TEXT_LINE_GAP - ICON_GAP,
                    );
                    const topLineAnchor = radialPoint(angle, TEXT_RADIUS + TEXT_LINE_GAP);
                    const bottomLineAnchor = radialPoint(angle, TEXT_RADIUS - TEXT_LINE_GAP);

                    return (
                        <g key={angle}>
                            {isPrize ? (
                                <text
                                    x={textAnchor.x}
                                    y={textAnchor.y}
                                    transform={`rotate(${angle} ${textAnchor.x} ${textAnchor.y})`}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontFamily={SLICE_FONT_FAMILY}
                                    fontSize={13}
                                    fontWeight={700}
                                    fill={labelFill}
                                >
                                    {prizeLabel}
                                </text>
                            ) : (
                                <>
                                    <text
                                        x={topLineAnchor.x}
                                        y={topLineAnchor.y}
                                        transform={`rotate(${angle} ${topLineAnchor.x} ${topLineAnchor.y})`}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontFamily={SLICE_FONT_FAMILY}
                                        fontSize={14}
                                        fontWeight={700}
                                        fill={labelFill}
                                    >
                                        Sigue
                                    </text>
                                    <text
                                        x={bottomLineAnchor.x}
                                        y={bottomLineAnchor.y}
                                        transform={`rotate(${angle} ${bottomLineAnchor.x} ${bottomLineAnchor.y})`}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontFamily={SLICE_FONT_FAMILY}
                                        fontSize={13}
                                        fontWeight={700}
                                        fill={labelFill}
                                    >
                                        participando
                                    </text>
                                </>
                            )}

                            <g transform={`rotate(${angle} ${iconAnchor.x} ${iconAnchor.y})`}>
                                {isPrize ? (
                                    PrizeIcon ? (
                                        <PrizeIcon
                                            x={iconAnchor.x - 13}
                                            y={iconAnchor.y - 13}
                                            size={26}
                                            color={labelFill}
                                            aria-hidden="true"
                                        />
                                    ) : null
                                ) : (
                                    <>
                                        <circle
                                            cx={iconAnchor.x}
                                            cy={iconAnchor.y}
                                            r={10}
                                            fill={labelFill}
                                        />
                                        <circle
                                            cx={iconAnchor.x - 3.5}
                                            cy={iconAnchor.y - 2}
                                            r={1.7}
                                            fill="#FFFFFF"
                                        />
                                        <circle
                                            cx={iconAnchor.x + 3.5}
                                            cy={iconAnchor.y - 2}
                                            r={1.7}
                                            fill="#FFFFFF"
                                        />
                                        <path
                                            d={`M ${iconAnchor.x - 5} ${iconAnchor.y + 3} Q ${iconAnchor.x} ${iconAnchor.y + 7} ${iconAnchor.x + 5} ${iconAnchor.y + 3}`}
                                            stroke="#FFFFFF"
                                            strokeWidth={2}
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </>
                                )}
                            </g>
                        </g>
                    );
                })}
            </g>
        </g>
        <circle cx={255.849} cy={301.5} r={58.386} fill="url(#f)" />
        <circle cx={255.851} cy={301.5} r={43.144} fill="#fff" />
        {/* ---- Centre cap: static Fluye Vital brand mark (does not rotate) ---- */}
        <image
            href={fluyaVitalLogo}
            x={LOGO_X}
            y={LOGO_Y}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            preserveAspectRatio="xMidYMid meet"
        />
        <g filter="url(#g)" style={twinkleStyle(0)}>
            <circle cx={77.913} cy={145.782} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#h)" style={twinkleStyle(0)}>
            <circle cx={77.913} cy={145.782} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#i)" style={twinkleStyle(1)}>
            <circle cx={17.853} cy={304.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#j)" style={twinkleStyle(1)}>
            <circle cx={17.852} cy={304.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#k)" style={twinkleStyle(2)}>
            <circle cx={67.972} cy={447.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#l)" style={twinkleStyle(2)}>
            <circle cx={67.972} cy={447.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#m)" style={twinkleStyle(3)}>
            <circle cx={255.782} cy={539.373} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#n)" style={twinkleStyle(3)}>
            <circle cx={255.782} cy={539.373} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#o)" style={twinkleStyle(4)}>
            <circle cx={443.342} cy={447.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#p)" style={twinkleStyle(4)}>
            <circle cx={443.342} cy={447.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#q)" style={twinkleStyle(5)}>
            <circle cx={493.722} cy={304.023} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#r)" style={twinkleStyle(5)}>
            <circle cx={493.722} cy={304.023} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#s)" style={twinkleStyle(6)}>
            <circle cx={434.952} cy={145.783} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#t)" style={twinkleStyle(6)}>
            <circle cx={434.952} cy={145.783} r={8.336} fill="#fff" />
        </g>
        <path
            fill="url(#u)"
            d="M255.785 18.095c12.948 0 23.445 10.785 23.445 24.09 0 2.239-.299 4.407-.855 6.464-2.744 16.69-12.839 73.817-22.525 73.817-9.805-.002-20.175-58.532-22.808-74.41a24.62 24.62 0 0 1-.613-3.783l-.024-.15.01-.013a25.04 25.04 0 0 1-.074-1.925c0-13.305 10.496-24.09 23.444-24.09Z"
        />
        {/* ---- Static festive overlay: Santa hat draped over the upper-right rim ---- */}
        {/* Rendered outside the rotating wheel group so the slices spin underneath */}
        {/* while the hat stays fixed on top of the golden ring. */}
        {CHRISTMAS_MODE && (
            <g aria-hidden="true">
                <image
                    href={christmasHatPng}
                    x={CHRISTMAS_HAT_X}
                    y={CHRISTMAS_HAT_Y}
                    width={CHRISTMAS_HAT_WIDTH}
                    height={CHRISTMAS_HAT_HEIGHT}
                    preserveAspectRatio="xMidYMid meet"
                    filter="url(#christmas-hat-shadow)"
                    transform={`rotate(${CHRISTMAS_HAT_TILT} ${CHRISTMAS_HAT_PIVOT_X} ${CHRISTMAS_HAT_PIVOT_Y})`}
                />
            </g>
        )}
        <defs>
            <filter id="christmas-hat-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx={2} dy={6} stdDeviation={4} floodColor="#000000" floodOpacity={0.45} />
            </filter>
            <filter
                id="e"
                width={485.896}
                height={485.897}
                x={12.901}
                y={58.551}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={12} />
            </filter>
            <filter
                id="g"
                width={35.705}
                height={35.706}
                x={60.06}
                y={127.929}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="h"
                width={22.672}
                height={22.672}
                x={66.577}
                y={134.446}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="i"
                width={35.705}
                height={35.706}
                x={0}
                y={286.94}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="j"
                width={22.672}
                height={22.672}
                x={6.517}
                y={293.457}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="k"
                width={35.705}
                height={35.706}
                x={50.119}
                y={429.94}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="l"
                width={22.672}
                height={22.672}
                x={56.636}
                y={436.457}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="m"
                width={35.705}
                height={35.706}
                x={237.93}
                y={521.52}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="n"
                width={22.672}
                height={22.672}
                x={244.446}
                y={528.037}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="o"
                width={35.705}
                height={35.706}
                x={425.489}
                y={429.94}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="p"
                width={22.672}
                height={22.672}
                x={432.006}
                y={436.457}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="q"
                width={35.705}
                height={35.706}
                x={475.869}
                y={286.17}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="r"
                width={22.672}
                height={22.672}
                x={482.386}
                y={292.687}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <filter
                id="s"
                width={35.705}
                height={35.706}
                x={417.1}
                y={127.93}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={2.5} />
            </filter>
            <filter
                id="t"
                width={22.672}
                height={22.672}
                x={423.616}
                y={134.447}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_121_46" stdDeviation={1.5} />
            </filter>
            <linearGradient
                id="a"
                x1={208.35}
                x2={303.35}
                y1={70.5}
                y2={70.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor={isChristmas ? CHRISTMAS_FRAME_START : "#F2B040"} />
                <stop offset={1} stopColor={isChristmas ? CHRISTMAS_FRAME_END : "#FAD060"} />
            </linearGradient>
            <linearGradient
                id="b"
                x1={255.85}
                x2={255.85}
                y1={50}
                y2={553}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor={isChristmas ? CHRISTMAS_FRAME_START : "#F2A83B"} />
                <stop offset={1} stopColor={isChristmas ? CHRISTMAS_FRAME_END : "#FED967"} />
            </linearGradient>
            <linearGradient
                id="c"
                x1={255.849}
                x2={255.849}
                y1={63.563}
                y2={539.437}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor={isChristmas ? CHRISTMAS_FRAME_END : "#FFD766"} />
                <stop offset={1} stopColor={isChristmas ? CHRISTMAS_FRAME_START : "#F4A73B"} />
            </linearGradient>
            <linearGradient
                id="f"
                x1={255.849}
                x2={255.849}
                y1={243.114}
                y2={359.886}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#EA9D31" />
                <stop offset={1} stopColor="#FED665" />
            </linearGradient>
            <linearGradient
                id="u"
                x1={279.23}
                x2={232.341}
                y1={70.28}
                y2={70.28}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F4A53B" />
                <stop offset={1} stopColor="#FED665" />
            </linearGradient>
        </defs>
    </svg>
);
export default RouletteSVG;
