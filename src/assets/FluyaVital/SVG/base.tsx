import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={737} height={1099} fill="none" {...props}>
        <ellipse cx={368.5} cy={549.5} fill="url(#a)" rx={368.5} ry={549.5} />
        <defs>
            <linearGradient
                id="a"
                x1={0}
                x2={737}
                y1={549.5}
                y2={549.5}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F2B040" />
                <stop offset={1} stopColor="#FAD060" />
            </linearGradient>
        </defs>
    </svg>
);
export default SvgComponent;
