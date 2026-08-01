// ---------------------------------------------------------------------------
// PrincipalLayout — Main application shell wrapper
// ---------------------------------------------------------------------------
import { Outlet } from "@tanstack/react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

function PrincipalLayout() {
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
