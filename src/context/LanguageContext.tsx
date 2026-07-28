// ---------------------------------------------------------------------------
// LanguageContext — Global language management integrated with react-i18next
// ---------------------------------------------------------------------------
import { createContext, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { ILanguageContextValue, LanguageCode } from "../interfaces/AppContextInterface";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const LanguageContext = createContext<ILanguageContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    const { i18n } = useTranslation();

    const resolvedLanguage: LanguageCode =
        i18n.language === "es" || i18n.language === "en" ? i18n.language : "es";

    const changeLanguage = useCallback(
        (lang: LanguageCode) => {
            void i18n.changeLanguage(lang);
        },
        [i18n],
    );

    const value: ILanguageContextValue = {
        language: resolvedLanguage,
        changeLanguage,
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// ---------------------------------------------------------------------------
// Custom hook with safety guard
// ---------------------------------------------------------------------------
function useLanguage(): ILanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (ctx === undefined) {
        throw new Error(
            "useLanguage must be used within a LanguageProvider (wrapped by AppProvider).",
        );
    }
    return ctx;
}

// ---------------------------------------------------------------------------
export { LanguageProvider, useLanguage };
export default LanguageContext;
