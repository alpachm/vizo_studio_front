import type { SVGProps } from "react";

/**
 * Vizo Studio brand mark (`>_` terminal lockup). Uses `currentColor` so the
 * mark inherits the surrounding text colour — pair with a `text-[#F96316]`
 * ancestor to render it in the vibrant brand orange.
 *
 * `viewBox="0 0 117 87"` mirrors the 117px × 87px source raster, and
 * `preserveAspectRatio="xMinYMax meet"` pins the base underscore to the bottom
 * edge so it can sit cleanly on the text baseline next to the wordmark.
 */
const Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 117 87"
        preserveAspectRatio="xMinYMax meet"
        width="1em"
        height="1em"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M.159 0a88.505 88.505 0 0 1 7.692 3.127c10.431 4.779 20.882 9.363 31.352 14.045 5.187 2.311 10.237 4.934 15.249 7.575l.194 11.85c-2.234 1.165-4.37 2.447-6.624 3.593-4.779 2.448-9.79 4.449-14.782 6.469C22.323 51.069 11.795 56.585.683 60.45L.45 46.736l38.112-17.23c-4.468-1.049-7.653-2.156-12.315-4.176C17.99 21.795 8.104 17.832.412 13.52-.171 9.052-.016 4.507.159 0ZM49.79 74.203l67.21-.175-.078 12.51-67.132-.097V74.203Z"
        />
    </svg>
);
export default Icon;
