// ---------------------------------------------------------------------------
// PrincipalLayout — Main application shell wrapper
// ---------------------------------------------------------------------------
import { Outlet } from "@tanstack/react-router";

function PrincipalLayout() {
    return (
        <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
            <Outlet />
        </main>
    );
}

export default PrincipalLayout;
