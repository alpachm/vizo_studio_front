import type { SVGProps } from "react";

const RouletteSVG = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={512} height={558} fill="none" {...props}>
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
        </g>
        <circle cx={255.849} cy={301.5} r={58.386} fill="url(#f)" />
        <circle cx={255.851} cy={301.5} r={43.144} fill="#fff" />
        <g filter="url(#g)">
            <circle cx={77.913} cy={145.782} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#h)">
            <circle cx={77.913} cy={145.782} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#i)">
            <circle cx={17.853} cy={304.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#j)">
            <circle cx={17.852} cy={304.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#k)">
            <circle cx={67.972} cy={447.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#l)">
            <circle cx={67.972} cy={447.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#m)">
            <circle cx={255.782} cy={539.373} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#n)">
            <circle cx={255.782} cy={539.373} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#o)">
            <circle cx={443.342} cy={447.793} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#p)">
            <circle cx={443.342} cy={447.793} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#q)">
            <circle cx={493.722} cy={304.023} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#r)">
            <circle cx={493.722} cy={304.023} r={8.336} fill="#fff" />
        </g>
        <g filter="url(#s)">
            <circle cx={434.952} cy={145.783} r={12.853} fill="#F7FF24" />
        </g>
        <g filter="url(#t)">
            <circle cx={434.952} cy={145.783} r={8.336} fill="#fff" />
        </g>
        <path
            fill="url(#u)"
            d="M255.785 18.095c12.948 0 23.445 10.785 23.445 24.09 0 2.239-.299 4.407-.855 6.464-2.744 16.69-12.839 73.817-22.525 73.817-9.805-.002-20.175-58.532-22.808-74.41a24.62 24.62 0 0 1-.613-3.783l-.024-.15.01-.013a25.04 25.04 0 0 1-.074-1.925c0-13.305 10.496-24.09 23.444-24.09Z"
        />
        <defs>
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
                <stop stopColor="#F2B040" />
                <stop offset={1} stopColor="#FAD060" />
            </linearGradient>
            <linearGradient
                id="b"
                x1={255.85}
                x2={255.85}
                y1={50}
                y2={553}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F2A83B" />
                <stop offset={1} stopColor="#FED967" />
            </linearGradient>
            <linearGradient
                id="c"
                x1={255.849}
                x2={255.849}
                y1={63.563}
                y2={539.437}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FFD766" />
                <stop offset={1} stopColor="#F4A73B" />
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
