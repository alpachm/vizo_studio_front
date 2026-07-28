// ---------------------------------------------------------------------------
// AppProvider — Unified global state wrapper
// ---------------------------------------------------------------------------
import type { IAppProviderProps } from "../interfaces/AppContextInterface";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";
// i18n must be imported so it initializes before any useTranslation call
import "../config/i18n";

function AppProvider({ children }: IAppProviderProps) {
    return (
        <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
    );
}

export default AppProvider;
