// ---------------------------------------------------------------------------
// About Route (/about) — About Us screen
// ---------------------------------------------------------------------------
import { createFileRoute } from "@tanstack/react-router";
import AboutUs from "../screens/AboutUs";

export const Route = createFileRoute("/about")({
    component: AboutUs,
});
