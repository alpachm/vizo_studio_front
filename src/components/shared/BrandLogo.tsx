// ---------------------------------------------------------------------------
// BrandLogo — Reusable Vizo Studio brand lockup (icon + `vizostudio.dev`).
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import Icon from "../../assets/icon";
import type { IBrandLogoProps } from "../../interfaces/BrandLogoInterface";

function BrandLogo({
    className = "text-lg",
    iconClassName = "",
    monochrome = false,
}: IBrandLogoProps) {
    const { t } = useTranslation();

    // Brand primary by default; switches to theme text color for monochrome variants.
    const accentClass = monochrome ? "text-text" : "text-primary";

    return (
        <span className={`group inline-flex items-baseline gap-2 ${className}`}>
            <Icon
                aria-hidden="true"
                className={`h-[1em] w-auto shrink-0 ${accentClass} transition-[opacity,color] duration-300 motion-reduce:transition-none group-hover:opacity-80 ${iconClassName}`}
            />
            <span className="font-mono font-bold lowercase leading-none tracking-tight">
                <span className="text-text transition-colors duration-500">
                    {t("Common.brandName")}
                </span>
                <span className={`${accentClass} transition-colors duration-500`}>
                    {t("Common.brandDomain")}
                </span>
            </span>
        </span>
    );
}

export default BrandLogo;
