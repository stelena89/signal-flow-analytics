
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Trading specific colors - updated for premium dark theme
				up: "#0ECB81",
				down: "#F6465D",
				positive: "#0ECB81",
				negative: "#F6465D",
				neutral: "#8A8F98",
				"premium-accent": "#03DAC5", // Teal/aqua accent
				"premium-blue": "#3182CE", // Blue accent
				"chart-bg": "#10141E", // Darker chart background
				"card-bg": "#1A1F2C", // Card background
				"sidebar-bg": "#0F1319", // Darker sidebar background
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"slide-in": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				pulse: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"card-hover": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-5px)" },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"slide-in": "slide-in 0.4s ease-out",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				float: "float 3s ease-in-out infinite",
				"card-hover": "card-hover 0.2s ease-out",
			},
			boxShadow: {
				'premium': '0 4px 20px rgba(3, 218, 197, 0.15)',
				'card': '0 8px 16px rgba(0, 0, 0, 0.2)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
