import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
        <path
            fill="#00b4d8"
            d="m0 96 48 26.7C96 149 192 203 288 197.3 384 192 480 128 576 90.7 672 53 768 43 864 37.3c96-5.3 192-5.3 288 16 96 21.7 192 63.7 240 85.4l48 21.3v160H0Z"
        />
    </svg>
);
export default SvgComponent;
