import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
        animation: {
            scale: "scaleAnimation 1.3s ease-in-out infinite",
        },
        keyframes: {
            scaleAnimation: {
                "0%, 70%, 100%": { transform: "scale(1)" },
                "35%": { transform: "scale(0)" },
            },
        },
    },
    plugins: [],
} satisfies Config;
