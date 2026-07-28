import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./config/i18n";
import "./index.css";
import App from "./App";
import AppProvider from "./context/AppProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
);
