// ---------------------------------------------------------------------------
// TermsAndConditionsInterface — Centralized Interfaces for TermsAndConditions screen
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** Props for the TermsAndConditions screen component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITermsAndConditionsProps {}

/** Data shape for a numbered clause/section in the Terms & Conditions screen */
export interface ITermsSectionItem {
    id: string;
    number: string;
    icon: IconType;
    titleKey: string;
    paragraphsKeys: readonly string[];
    bulletsKeys?: readonly string[];
}
