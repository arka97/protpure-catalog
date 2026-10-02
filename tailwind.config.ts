import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: hsl("border"),
        input: hsl("input"),
        ring: hsl("ring"),
        background: hsl("background"),
        foreground: hsl("foreground"),

        /* Brand palette */
        paper: { DEFAULT: hsl("paper"), 2: hsl("paper-2") },
        rule: hsl("rule"),
        ink: {
          DEFAULT: hsl("ink"),
          2: hsl("ink-2"),
          3: hsl("ink-3"),
          line: hsl("ink-line"),
          raised: hsl("ink-raised"),
        },
        "on-ink": { DEFAULT: hsl("on-ink"), 2: hsl("on-ink-2") },
        brand: { DEFAULT: hsl("brand"), dot: hsl("brand-dot") },
        signal: { DEFAULT: hsl("signal"), ink: hsl("signal-ink") },

        /* Chromatography families */
        imac: { DEFAULT: hsl("imac"), tint: hsl("imac-tint") },
        iex: { DEFAULT: hsl("iex"), tint: hsl("iex-tint") },
        hic: { DEFAULT: hsl("hic"), tint: hsl("hic-tint") },
        mrc: { DEFAULT: hsl("mrc"), tint: hsl("mrc-tint") },
        sec: { DEFAULT: hsl("sec"), tint: hsl("sec-tint") },
        fmt: { DEFAULT: hsl("fmt"), tint: hsl("fmt-tint") },

        /* shadcn/ui */
        primary: { DEFAULT: hsl("primary"), foreground: hsl("primary-foreground") },
        secondary: { DEFAULT: hsl("secondary"), foreground: hsl("secondary-foreground") },
        destructive: { DEFAULT: hsl("destructive"), foreground: hsl("destructive-foreground") },
        muted: { DEFAULT: hsl("muted"), foreground: hsl("muted-foreground") },
        accent: { DEFAULT: hsl("accent"), foreground: hsl("accent-foreground") },
        popover: { DEFAULT: hsl("popover"), foreground: hsl("popover-foreground") },
        card: { DEFAULT: hsl("card"), foreground: hsl("card-foreground") },
        sidebar: {
          DEFAULT: hsl("sidebar-background"),
          foreground: hsl("sidebar-foreground"),
          primary: hsl("sidebar-primary"),
          "primary-foreground": hsl("sidebar-primary-foreground"),
          accent: hsl("sidebar-accent"),
          "accent-foreground": hsl("sidebar-accent-foreground"),
          border: hsl("sidebar-border"),
          ring: hsl("sidebar-ring"),
        },
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        serif: ['"Old Standard TT"', "Georgia", '"Times New Roman"', "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        panel: "1.75rem",
      },
      screens: {
        xs: "420px",
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
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
