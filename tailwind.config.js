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
        },
    },
    plugins: [],
};
