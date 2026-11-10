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

// Create the router instance
const router = createRouter({ routeTree });

const TRACKING_ID: string | undefined = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);

    // Track the initial page view and every subsequent client-side navigation
    // (TanStack Router) as a single `pageview` hit, without double-counting the
    // first route when the app mounts.
    router.subscribe("onResolved", ({ toLocation }) => {
        ReactGA.send({ hitType: "pageview", page: toLocation.pathname });
    });
}

// Register the router type for type-safe navigation
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
            <SpeedInsights />
        </AppProvider>
    </StrictMode>,
);
