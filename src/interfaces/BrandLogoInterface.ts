// ---------------------------------------------------------------------------
// BrandLogoInterface — Types & interfaces for the BrandLogo component
// ---------------------------------------------------------------------------

/** Props accepted by the reusable `<BrandLogo />` brand lockup. */
export interface IBrandLogoProps {
    /** Tailwind classes applied to the root lockup (font size, spacing, etc.). */
    className?: string;
    /** Additional Tailwind classes applied to the SVG icon (sizing overrides). */
    iconClassName?: string;
    /** When `true`, renders the entire lockup (icon + wordmark + `.dev`) in white. */
    monochrome?: boolean;
}