// ---------------------------------------------------------------------------
// CookiePolicyInterface — Centralized Interfaces for CookiePolicy screen & Banner
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** User's stored cookie consent preference */
export type CookieConsentDecision = "all" | "essential";

/** Props for the CookiePolicy screen component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICookiePolicyProps {}

/** Props for the global CookieConsentBanner component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICookieConsentBannerProps {}

/** Data shape for a numbered section in the Cookie Policy screen */
export interface ICookieSectionItem {
    id: string;
    number: string;
    icon: IconType;
    titleKey: string;
    paragraphsKeys: readonly string[];
    bulletsKeys?: readonly string[];
}

/** Data shape for a single row in the technical cookie breakdown table */
export interface ICookieTableRowItem {
    id: string;
    nameKey: string;
    providerKey: string;
    purposeKey: string;
    durationKey: string;
    typeKey: string;
    isEssential: boolean;
}
