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

/** Union of available contact form steps */
export const ContactStep = {
  Step1: 1,
  Step2: 2,
} as const;

export type TContactStep = (typeof ContactStep)[keyof typeof ContactStep];

/** Data shape for a single interest option in Step 2 */
export interface IContactInterestOption {
  id: string;
  translationKey: string;
}

/** Props for the Contact section root component (step manager) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IContactProps {}

/** Props for the Contact Step 1 component */
export interface IContactStep1Props {
  onNextStep?: () => void;
}

/** Props for the Contact Step 2 component */
export interface IContactStep2Props {
  onBack?: () => void;
}
