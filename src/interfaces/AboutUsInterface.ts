// ---------------------------------------------------------------------------
// AboutUsScreen — Centralized Interfaces
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** Props for the AboutUs screen component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAboutUsScreenProps {}

/** Data shape for a single metric/stat highlight card on the AboutUs screen */
export interface IAboutUsStatItem {
    id: string;
    valueKey: string;
    labelKey: string;
    descriptionKey: string;
}

/** Data shape for a mission/vision philosophy card on the AboutUs screen */
export interface IAboutUsPhilosophyItem {
    id: string;
    icon: IconType;
    badgeKey: string;
    titleKey: string;
    descriptionKey: string;
}

/** Data shape for a core value / pillar card on the AboutUs screen */
export interface IAboutUsValueCardItem {
    id: string;
    icon: IconType;
    titleKey: string;
    descriptionKey: string;
}
