/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                text: "var(--color-text)",
                "text-muted": "var(--color-text-muted)",
                whatsapp: {
                    DEFAULT: "#25D366",
                    dark: "#20BD5A",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
                // Backward-compatible aliases for the existing `font-title`
                // (headings / logo) and `font-body` (copy) utility classes.
                title: ["JetBrains Mono", "monospace"],
                body: ["Inter", "sans-serif"],
            },
            animation: {
                "marquee-scroll": "marquee 40s linear infinite",
                "wave-drift-left": "wave-drift-left 12s ease-in-out infinite",
                "wave-drift-right": "wave-drift-right 10s ease-in-out infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-5%)" },
                },
                "wave-drift-left": {
                    "0%": { transform: "translateX(0%)" },
                    "50%": { transform: "translateX(5%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                "wave-drift-right": {
                    "0%": { transform: "translateX(0%)" },
                    "50%": { transform: "translateX(5%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
