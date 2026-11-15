// ---------------------------------------------------------------------------
// Root Route — Wraps the entire app inside PrincipalLayout
// ---------------------------------------------------------------------------
import { createRootRoute } from "@tanstack/react-router";
import PrincipalLayout from "../layouts/PrincipalLayout";
import NotFound from "../screens/NotFound";

export const Route = createRootRoute({
    component: PrincipalLayout,
    notFoundComponent: NotFound,
});
