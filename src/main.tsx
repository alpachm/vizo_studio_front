import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./config/i18n";
import "./index.css";
import AppProvider from "./context/AppProvider";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ReactGA from "react-ga4";

// Import the auto-generated route tree (produced by TanStack Router Vite plugin)
import { routeTree } from "./routeTree.gen";
import { saveHomeScrollY } from "./utils/homeScrollPosition";
import { COOKIE_CONSENT_EVENT, getCookieConsent } from "./utils/cookieConsent";

// Create the router instance.
// Returning `false` for `location.pathname === "/"` prevents TanStack Router's
// internal `onRendered` listener from resetting `window.scrollY` to `0` after
// `HomeScreen` restores the user's saved scroll position.
const router = createRouter({
    routeTree,
    scrollRestoration: ({ location }) => location.pathname !== "/",
});

// Snapshot the exact scroll position of "/" right before any route transition
// away from the Home screen begins (before DOM teardown can clamp `scrollY`).
router.subscribe("onBeforeLoad", ({ fromLocation, toLocation }) => {
    if (fromLocation?.pathname === "/" && toLocation.pathname !== "/") {
        saveHomeScrollY(window.scrollY);
    }
});

const TRACKING_ID: string | undefined = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (TRACKING_ID) {
    let isGaInitialized = false;

    const ensureGaInitialized = (): boolean => {
        if (getCookieConsent() === "essential") {
            return false;
        }
        if (!isGaInitialized) {
            ReactGA.initialize(TRACKING_ID);
            isGaInitialized = true;
        }
        return true;
    };

    if (getCookieConsent() === "all") {
        ensureGaInitialized();
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, () => {
        if (getCookieConsent() === "all" && ensureGaInitialized()) {
            ReactGA.send({
                hitType: "pageview",
                page: window.location.pathname,
            });
        }
    });

    // Track the initial page view and every subsequent client-side navigation
    // (TanStack Router) as a single `pageview` hit when analytics is allowed.
    router.subscribe("onResolved", ({ toLocation }) => {
        if (getCookieConsent() !== "essential" && ensureGaInitialized()) {
            ReactGA.send({ hitType: "pageview", page: toLocation.pathname });
        }
    });
}

// Register the router type for type-safe navigation
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// ---------------------------------------------------------------------------
// Global layout normalization — restore `position: sticky` support.
//
// `index.css` applies `overflow-x: hidden` to `html`, `body` and `#root` to
// suppress horizontal scrollbars. On `body` and `#root` that value coerces
// `overflow-y` into `auto`, which turns both elements into scroll containers —
// the classic trap that completely breaks `position: sticky` for any descendant
// (the nearest scrolling ancestor is no longer the viewport). `overflow-x:
// clip` clips horizontal overflow identically but NEVER creates a scroll
// container, so sticky anchoring is restored while horizontal scroll stays
// locked. This runs at module scope (before first paint) instead of inside
// `index.css`, which is intentionally left untouched.
// ---------------------------------------------------------------------------
document.body.style.overflowX = "clip";
document.getElementById("root")!.style.overflowX = "clip";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
            <SpeedInsights />
        </AppProvider>
    </StrictMode>,
);
