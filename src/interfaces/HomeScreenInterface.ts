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

/** Props for the ValueProposition section component */
export interface IValuePropositionProps {
  className?: string;
}

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
  Step3: 3,
  Step4: 4,
} as const;

export type TContactStep = (typeof ContactStep)[keyof typeof ContactStep];

/** Data shape for a single interest option in the Step 3 form */
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

/** Data shape for a single answer option in the Step 2 questionnaire */
export interface IContactQuestionnaireOption {
  id: string;
  labelKey: string;
}

/** Data collected by the Step 2 questionnaire (one question at a time) */
export interface IContactQuestionnaireAnswers {
  objective: string;
  stage: string;
  timeline: string;
  budget: string;
}

/** Props for the Contact Step 2 questionnaire component */
export interface IContactStep2Props {
  onBack?: () => void;
  onComplete?: (answers: IContactQuestionnaireAnswers) => void;
  initialAnswers?: IContactQuestionnaireAnswers | null;
}

/** Props for the Contact Step 3 form component */
export interface IContactStep3Props {
  onBack?: () => void;
  onSubmitForm?: (data: ContactFormData) => void | Promise<void>;
  submitError?: string | null;
  initialBudget?: string;
}

/** Props for the Contact Step 4 confirmation component */
export interface IContactStep4Props {
  onWriteAgain?: () => void;
  onExit?: () => void;
}

/** Form data shape for the Step 3 contact form */
export interface ContactFormData {
  selectedInterests: string[];
  budget: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  projectDetails: string;
}

/** API payload shape for submitting the contact form to the backend */
export interface ContactPayload {
  app_type: string;
  fullname: string;
  email: string;
  phone: number;
  company_name: string;
  about_project: string;
  project_budget: string;
}

/** Data shape for a single budget range option */
export interface BudgetOption {
  id: string;
  label: string;
}

/** Props for the Portfolio section component */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPortfolioProps {}

/** Props for the Methodology section component */
export interface IMethodologyProps {
  className?: string;
}

/** Data shape for a single methodology process step */
export interface IMethodologyStep {
  id: string;
  number: string;
  titleKey: string;
  descriptionKey: string;
}
