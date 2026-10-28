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
            },
            fontFamily: {
                title: ["var(--font-title-val)", "sans-serif"],
                body: ["var(--font-body-val)", "sans-serif"],
            },
            animation: {
                "marquee-scroll": "marquee 40s linear infinite",
                "wave-drift-left": "wave-drift-left 12s ease-in-out infinite",
                "wave-drift-right": "wave-drift-right 10s ease-in-out infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "wave-drift-left": {
                    "0%": { transform: "translateX(0%)" },
                    "50%": { transform: "translateX(55%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                "wave-drift-right": {
                    "0%": { transform: "translateX(0%)" },
                    "50%": { transform: "translate(55%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
