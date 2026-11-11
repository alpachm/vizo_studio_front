// ---------------------------------------------------------------------------
// PrincipalLayout — Main application shell wrapper
// ---------------------------------------------------------------------------
import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import FloatingButtons from "../components/shared/FloatingButtons";

/**
 * Routes that must render as isolated/standalone experiences without the
 * global site shell (Header & Footer).
 */
const STANDALONE_ROUTES: ReadonlySet<string> = new Set(["/fluya-vital"]);

function PrincipalLayout() {
    const { pathname } = useLocation();

    // Standalone screens render directly, skipping the Header/Footer shell.
    const isStandalone = STANDALONE_ROUTES.has(pathname);

    return (
        <>
            {isStandalone ? (
                <Outlet />
            ) : (
                <div className="min-h-screen flex flex-col bg-bg text-text transition-colors duration-300">
                    <Header />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            )}

            {/* Global floating action buttons — visible on every route */}
            <FloatingButtons />
        </>
    );
}

export default PrincipalLayout;
