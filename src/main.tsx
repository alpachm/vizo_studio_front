import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./config/i18n";
import "./index.css";
import AppProvider from "./context/AppProvider";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Import the auto-generated route tree (produced by TanStack Router Vite plugin)
import { routeTree } from "./routeTree.gen";

// Create the router instance
const router = createRouter({ routeTree });

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
