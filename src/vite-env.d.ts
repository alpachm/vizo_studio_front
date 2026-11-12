/// <reference types="vite/client" />

// ---------------------------------------------------------------------------
// Vite environment variables — strict, typed access to `import.meta.env`
// ---------------------------------------------------------------------------

// Enabling `strictImportMetaEnv` removes Vite's fallback `Record<string, any>`
// index signature, so every env key must be explicitly declared below. This
// guarantees type safety and forbids implicit `any` across the app.
interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_ALLOW_MULTIPLE_SPINS: string;
    readonly VITE_CHRISTMAS_MODE: string;
    readonly VITE_ROULETTE_PROBABILITY_LEVEL: string;
    readonly VITE_GA_MEASUREMENT_ID: string;
    readonly VITE_WHATSAPP_URL: string;
    readonly VITE_EMAIL: string;
}