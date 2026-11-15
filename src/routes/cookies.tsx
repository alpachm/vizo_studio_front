// ---------------------------------------------------------------------------
// Cookies Route (/cookies) — Renders CookiePolicy
// ---------------------------------------------------------------------------
import { createFileRoute } from "@tanstack/react-router";
import CookiePolicy from "../screens/CookiePolicy";

export const Route = createFileRoute("/cookies")({
    component: CookiePolicy,
});
