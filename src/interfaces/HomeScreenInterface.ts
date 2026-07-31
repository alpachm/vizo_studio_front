// ---------------------------------------------------------------------------
// HomeScreen — Centralized Interfaces
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** Props for the HomeScreen component (currently no external props required) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHomeScreenProps {}

/** Props for the Hero section component (currently no external props required) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHeroProps {}

/** Props for the AboutUs section component */
export interface IAboutUsProps {
  className?: string;
}

/** Props for the WhyUs section component */
export interface IWhyUsProps {
  className?: string;
}

/** Data shape for a single WhyUs value card */
export interface IWhyUsCardItem {
  id: string;
  icon: IconType;
  titleKey: string;
  descriptionKey: string;
}

/** Props for the Services section component (currently no external props required) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IServicesProps {}
