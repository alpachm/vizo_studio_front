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