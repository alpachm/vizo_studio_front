// ---------------------------------------------------------------------------
// cookieConsent — Centralized cookie consent storage & Google Analytics sync
// ---------------------------------------------------------------------------

import type { CookieConsentDecision } from "../interfaces/CookiePolicyInterface";

const COOKIE_CONSENT_STORAGE_KEY = "vizo_cookie_consent";
export const COOKIE_CONSENT_EVENT = "vizo:cookie-consent-change";

/**
 * Reads the stored cookie consent decision from `localStorage`.
 * Returns `null` if the user has not made a choice yet.
 */
export function getCookieConsent(): CookieConsentDecision | null {
    if (typeof window === "undefined") return null;

    try {
        const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
        if (stored === "all" || stored === "essential") {
            return stored;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Clears Google Analytics cookies (`_ga`, `_gid`, `_gat`, `_ga_*`) when the
 * user opts for essential cookies only.
 */
function clearGoogleAnalyticsCookies(): void {
    if (typeof document === "undefined") return;

    const cookies = document.cookie.split(";");
    const hostname = window.location.hostname;
    const domainParts = hostname.split(".");
    const rootDomain =
        domainParts.length >= 2
            ? `.${domainParts.slice(-2).join(".")}`
            : hostname;

    for (const rawCookie of cookies) {
        const cookieName = rawCookie.split("=")[0]?.trim();
        if (
            cookieName &&
            (cookieName === "_ga" ||
                cookieName === "_gid" ||
                cookieName === "_gat" ||
                cookieName.startsWith("_ga_"))
        ) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${hostname}`;
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${rootDomain}`;
        }
    }
}

/**
 * Persists the user's cookie consent decision and notifies listeners across the app.
 */
export function setCookieConsent(decision: CookieConsentDecision): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, decision);
    } catch {
        // Ignore storage write errors in restricted browsing modes
    }

    if (decision === "essential") {
        clearGoogleAnalyticsCookies();
    }

    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: decision }));
}

/**
 * Clears the stored cookie consent decision so the banner can be shown again.
 */
export function resetCookieConsent(): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
        // Ignore storage errors
    }

    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: null }));
}
