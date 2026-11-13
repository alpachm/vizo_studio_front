// ---------------------------------------------------------------------------
// HeroVisibilityContext — Tracks whether the Home hero section is in view so
//                         the global shell (Header & FloatingButtons) can step
//                         aside while the hero occupies the viewport.
// ---------------------------------------------------------------------------
import { createContext, useCallback, useContext, useState } from "react";
import type {
    IHeroVisibilityContextValue,
    IHeroVisibilityProviderProps,
} from "../interfaces/AppContextInterface";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const HeroVisibilityContext = createContext<IHeroVisibilityContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
function HeroVisibilityProvider({ children }: IHeroVisibilityProviderProps) {
    const [isHeroInView, setIsHeroInViewState] = useState(false);

    // Stable setter so consumers (Hero's IntersectionObserver effect) don't
    // re-subscribe on every render.
    const setIsHeroInView = useCallback((isInView: boolean) => {
        setIsHeroInViewState(isInView);
    }, []);

    const value: IHeroVisibilityContextValue = { isHeroInView, setIsHeroInView };

    return <HeroVisibilityContext.Provider value={value}>{children}</HeroVisibilityContext.Provider>;
}

// ---------------------------------------------------------------------------
// Custom hook with safety guard
// ---------------------------------------------------------------------------
function useHeroVisibility(): IHeroVisibilityContextValue {
    const ctx = useContext(HeroVisibilityContext);
    if (ctx === undefined) {
        throw new Error("useHeroVisibility must be used within a HeroVisibilityProvider.");
    }
    return ctx;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export { HeroVisibilityProvider, useHeroVisibility };
export default HeroVisibilityContext;