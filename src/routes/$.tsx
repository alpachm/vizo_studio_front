// ---------------------------------------------------------------------------
// Catch-All Splat Route ($) — Renders the 404 NotFound screen for unknown paths
// ---------------------------------------------------------------------------
import { createFileRoute } from "@tanstack/react-router";
import NotFound from "../screens/NotFound";

export const Route = createFileRoute("/$")({
    component: NotFound,
});
