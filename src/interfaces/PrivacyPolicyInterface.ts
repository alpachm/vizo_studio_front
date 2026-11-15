// ---------------------------------------------------------------------------
// PrivacyPolicyInterface — Centralized Interfaces for PrivacyPolicy screen
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** Props for the PrivacyPolicy screen component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPrivacyPolicyProps {}

/** Data shape for a numbered clause/section in the Privacy Policy screen */
export interface IPrivacySectionItem {
    id: string;
    number: string;
    icon: IconType;
    titleKey: string;
    paragraphsKeys: readonly string[];
    bulletsKeys?: readonly string[];
}

/** Data shape for a highlight card summarizing key privacy guarantees */
export interface IPrivacyHighlightItem {
    id: string;
    icon: IconType;
    titleKey: string;
    descriptionKey: string;
}
