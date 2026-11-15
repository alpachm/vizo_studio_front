// ---------------------------------------------------------------------------
// Privacy Route (/privacy) — Renders PrivacyPolicy
// ---------------------------------------------------------------------------
import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "../screens/PrivacyPolicy";

export const Route = createFileRoute("/privacy")({
    component: PrivacyPolicy,
});
