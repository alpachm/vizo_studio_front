// ---------------------------------------------------------------------------
// Global App Context — Centralized Interfaces
// ---------------------------------------------------------------------------

/** Supported theme modes */
export type ThemeMode = 'light' | 'dark';

/** Supported languages */
export type LanguageCode = 'es' | 'en';

/** Shape of the Theme context value */
export interface IThemeContextValue {
  /** Current theme mode */
  theme: ThemeMode;
  /** Toggle between light and dark (or set explicitly) */
  toggleTheme: (mode?: ThemeMode) => void;
}

/** Shape of the Language context value */
export interface ILanguageContextValue {
  /** Current language code */
  language: LanguageCode;
  /** Switch to a different language */
  changeLanguage: (lang: LanguageCode) => void;
}

/** Unified AppProvider props */
export interface IAppProviderProps {
  children: React.ReactNode;
}

/** Shape of the Hero visibility context value (drives Header/FloatingButtons hide state) */
export interface IHeroVisibilityContextValue {
  /** Whether the Home hero section is currently intersecting the viewport */
  isHeroInView: boolean;
  /** Whether the Value Proposition section is currently intersecting the viewport */
  isValuePropositionInView: boolean;
  /** Update the hero visibility flag from the Hero section */
  setIsHeroInView: (isInView: boolean) => void;
  /** Update the Value Proposition visibility flag from the ValueProposition section */
  setIsValuePropositionInView: (isInView: boolean) => void;
}

/** Props accepted by the HeroVisibilityProvider */
export interface IHeroVisibilityProviderProps {
  children: React.ReactNode;
}