import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
        <path
            fill="#1e6091"
            d="m0 160 48-21.3C96 117 192 75 288 80s192 59 288 74.7c96 16.3 192-5.7 288-21.4 96-16.3 192-26.3 288-32 96-5.3 192-5.3 240-5.3h48v224H0Z"
        />
    </svg>
);
export default SvgComponent;
