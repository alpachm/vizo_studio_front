// ---------------------------------------------------------------------------
// ThemeContext — Global theme management ('light' | 'dark')
// ---------------------------------------------------------------------------
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { IThemeContextValue, ThemeMode } from "../interfaces/AppContextInterface";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const ThemeContext = createContext<IThemeContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
interface ThemeProviderProps {
    children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        // Read persisted preference or fall back to system preference
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme") as ThemeMode | null;
            if (stored === "light" || stored === "dark") return stored;

            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return prefersDark ? "dark" : "light";
        }
        return "dark"; // safe fallback
    });

    // Sync the `data-theme` attribute on <html> and persist to localStorage
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = useCallback((mode?: ThemeMode) => {
        setTheme((prev) => mode ?? (prev === "dark" ? "light" : "dark"));
    }, []);

    const value: IThemeContextValue = { theme, toggleTheme };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ---------------------------------------------------------------------------
// Custom hook with safety guard
// ---------------------------------------------------------------------------
function useTheme(): IThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (ctx === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider (wrapped by AppProvider).");
    }
    return ctx;
}

// ---------------------------------------------------------------------------
export { ThemeProvider, useTheme };
export default ThemeContext;
