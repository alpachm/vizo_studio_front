// ---------------------------------------------------------------------------
// Terms Route (/terms) — Renders TermsAndConditions
// ---------------------------------------------------------------------------
import { createFileRoute } from "@tanstack/react-router";
import TermsAndConditions from "../screens/TermsAndConditions";

export const Route = createFileRoute("/terms")({
    component: TermsAndConditions,
});
