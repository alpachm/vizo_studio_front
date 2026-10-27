// ---------------------------------------------------------------------------
// PrincipalLayout — Main application shell wrapper
// ---------------------------------------------------------------------------
import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

/**
 * Routes that must render as isolated/standalone experiences without the
 * global site shell (Header & Footer).
 */
const STANDALONE_ROUTES: ReadonlySet<string> = new Set(["/fluya-vital"]);

function PrincipalLayout() {
    const { pathname } = useLocation();

    // Standalone screens render directly, skipping the Header/Footer shell.
    if (STANDALONE_ROUTES.has(pathname)) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-bg text-text transition-colors duration-300">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PrincipalLayout;
