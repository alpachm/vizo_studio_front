import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={363} height={808} fill="none" {...props}>
        <path
            fill="url(#a)"
            d="M181.5 0C281.74 0 363 83.499 363 186.5c0 17.298-2.296 34.044-6.585 49.938C335.201 365.508 257.006 808 182 808 106.078 808 25.768 354.642 5.408 231.854a190.71 190.71 0 0 1-4.743-29.302L.5 201.5l.073-.092C.195 196.49 0 191.518 0 186.5 0 83.499 81.26 0 181.5 0Z"
        />
        <defs>
            <linearGradient id="a" x1={363} x2={0} y1={404} y2={404} gradientUnits="userSpaceOnUse">
                <stop stopColor="#F4A53B" />
                <stop offset={1} stopColor="#FED665" />
            </linearGradient>
        </defs>
    </svg>
);
export default SvgComponent;
