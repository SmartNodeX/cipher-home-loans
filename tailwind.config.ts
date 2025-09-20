import type { Config } from "tailwindcss";

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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        // Security-specific colors
        encrypted: {
          DEFAULT: "hsl(var(--encrypted))",
          foreground: "hsl(var(--encrypted-foreground))",
        },
        approved: {
          DEFAULT: "hsl(var(--approved))",
          foreground: "hsl(var(--approved-foreground))",
        },
        pending: {
          DEFAULT: "hsl(var(--pending))",
          foreground: "hsl(var(--pending-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-security": "var(--gradient-security)",
        "gradient-encrypted": "var(--gradient-encrypted)",
        "gradient-financial": "var(--gradient-financial)",
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        "security": "var(--shadow-security)",
        "encrypted": "var(--shadow-encrypted)",
        "card": "var(--shadow-card)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Security-focused animations
        "encrypt": {
          "0%": { 
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1"
          },
          "50%": { 
            transform: "scale(1.05)",
            filter: "blur(2px)",
            opacity: "0.7"
          },
          "100%": { 
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1"
          },
        },
        "decrypt": {
          "0%": { 
            filter: "blur(4px)",
            opacity: "0.3",
            transform: "scale(0.95)"
          },
          "100%": { 
            filter: "blur(0px)",
            opacity: "1",
            transform: "scale(1)"
          },
        },
        "lock-bounce": {
          "0%, 100%": { 
            transform: "translateY(0px)",
            rotate: "0deg"
          },
          "25%": { 
            transform: "translateY(-3px)",
            rotate: "-2deg"
          },
          "75%": { 
            transform: "translateY(-1px)",
            rotate: "1deg"
          },
        },
        "house-pop": {
          "0%": { 
            transform: "scale(1) translateY(0px)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "scale(1.1) translateY(-5px)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(1) translateY(0px)",
            opacity: "0.9"
          },
        },
        "security-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 hsl(210, 100%, 45% / 0.7)"
          },
          "50%": {
            boxShadow: "0 0 0 10px hsl(210, 100%, 45% / 0)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "encrypt": "encrypt 2s ease-in-out infinite",
        "decrypt": "decrypt 0.8s ease-out",
        "lock-bounce": "lock-bounce 2s ease-in-out infinite",
        "house-pop": "house-pop 3s ease-in-out infinite",
        "security-pulse": "security-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
