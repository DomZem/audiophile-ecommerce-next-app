import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    fontSize: {
      // 15px, 25px
      base: [
        "0.9375rem",
        {
          lineHeight: "1.5625rem",
          fontWeight: "500",
        },
      ],
      // 18px, 24px
      lg: [
        "1.125rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "0.07em",
          fontWeight: "700",
        },
      ],
      // 24px, 33px
      xl: [
        "1.5rem",
        {
          lineHeight: "2.0625rem",
          letterSpacing: "0.071em",
          fontWeight: "700",
        },
      ],
      // 28px, 38px
      "2xl": [
        "1.75rem",
        {
          lineHeight: "2.375rem",
          letterSpacing: "0.071em",
          fontWeight: "700",
        },
      ],
      // 32px, 36px
      "3xl": [
        "2rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "0.036em",
          fontWeight: "700",
        },
      ],
      // 40px, 44px
      "4xl": [
        "2.5rem",
        { lineHeight: "2.75rem", letterSpacing: "0.0375em", fontWeight: "700" },
      ],
      // 56px, 58px
      "5xl": [
        "3.5rem",
        {
          lineHeight: "3.625rem",
          letterSpacing: "0.0357em",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        destructive: "hsl(var(--destructive))",

        background: "hsl(var(--background))",
        border: "hsl(var(--border))",

        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
