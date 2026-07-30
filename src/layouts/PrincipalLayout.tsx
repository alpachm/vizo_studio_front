// ---------------------------------------------------------------------------
// PrincipalLayout — Main application shell wrapper
// ---------------------------------------------------------------------------
import { Outlet } from "@tanstack/react-router";
import Header from "../components/shared/Header";

function PrincipalLayout() {
    return (
        <div className="min-h-screen bg-bg text-text transition-colors duration-300">
            <Header />
            <Outlet />
        </div>
    );
}

export default PrincipalLayout;
