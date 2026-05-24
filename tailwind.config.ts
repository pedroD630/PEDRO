import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "430px" },
    },
    extend: {
      colors: {
        background: "#0F1923",
        surface: "#1C2B3A",
        primary: {
          DEFAULT: "#1A3C5E",
          foreground: "#F0F4F8",
        },
        accent: {
          DEFAULT: "#E8A020",
          foreground: "#0F1923",
        },
        foreground: "#F0F4F8",
        muted: {
          DEFAULT: "#1C2B3A",
          foreground: "#8AA0B4",
        },
        success: "#2D7D46",
        destructive: {
          DEFAULT: "#7F1D1D",
          foreground: "#F0F4F8",
        },
        border: "#1C2B3A",
        input: "#1C2B3A",
        ring: "#E8A020",
        card: {
          DEFAULT: "#1C2B3A",
          foreground: "#F0F4F8",
        },
        popover: {
          DEFAULT: "#1C2B3A",
          foreground: "#F0F4F8",
        },
        secondary: {
          DEFAULT: "#1A3C5E",
          foreground: "#F0F4F8",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Roboto", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
