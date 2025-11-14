
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
				'2xl': '1440px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Open Sans', 'sans-serif'], // Body text
				'serif': ['Playfair Display', 'serif'], // Quotes/accents
				'heading': ['Montserrat', 'sans-serif'], // Headlines and subheadings
			},
			fontSize: {
				// Override default font sizes to ensure minimum 16px
				'xs': ['1rem', { lineHeight: '1.5' }], // 16px minimum instead of 12px
				'sm': ['1rem', { lineHeight: '1.5' }], // 16px minimum instead of 14px
				'base': ['1rem', { lineHeight: '1.6' }], // 16px
				'lg': ['1.125rem', { lineHeight: '1.75' }], // 18px
				'xl': ['1.25rem', { lineHeight: '1.75' }], // 20px
				'2xl': ['1.5rem', { lineHeight: '2' }], // 24px
				'3xl': ['1.875rem', { lineHeight: '2.25' }], // 30px
				'4xl': ['2.25rem', { lineHeight: '2.5' }], // 36px
				'5xl': ['3rem', { lineHeight: '1' }], // 48px
				'6xl': ['3.75rem', { lineHeight: '1' }], // 60px
			},
			colors: {
				// Phresh Phactory Brand Colors (using HSL variables)
				'ink-black': 'hsl(var(--primary))',
				'bright-white': 'hsl(var(--primary-foreground))',
				'phresh-smoke': 'hsl(var(--secondary))',
				'jet-gray': 'hsl(var(--muted-foreground))',
				'strategic-gold': 'hsl(var(--tertiary))',
				'global-teal': 'hsl(var(--teal))',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: 'hsl(0 0% 97%)',
					100: 'hsl(0 0% 91%)',
					200: 'hsl(0 0% 82%)',
					300: 'hsl(0 0% 72%)',
					400: 'hsl(0 0% 63%)',
					500: 'hsl(var(--primary))', // Ink Black
					600: 'hsl(var(--primary))',
					700: 'hsl(var(--primary))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					100: 'hsl(0 0% 96%)',
					200: 'hsl(0 0% 92%)',
					300: 'hsl(0 0% 88%)',
					400: 'hsl(0 0% 84%)',
					500: 'hsl(var(--secondary))', // Phresh Smoke
					600: 'hsl(var(--muted-foreground))', // Jet Gray
					700: 'hsl(0 0% 20%)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					100: 'hsl(0 0% 96%)',
					200: 'hsl(0 0% 92%)',
					300: 'hsl(0 0% 88%)',
					400: 'hsl(0 0% 84%)',
					500: 'hsl(var(--accent))', // Phresh Smoke
				},
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary))',
					foreground: 'hsl(var(--tertiary-foreground))',
					50: 'hsl(49 69% 95%)',
					100: 'hsl(49 69% 85%)',
					200: 'hsl(49 69% 75%)',
					300: 'hsl(49 69% 65%)',
					400: 'hsl(49 69% 58%)',
					500: 'hsl(var(--tertiary))', // Strategic Gold
					600: 'hsl(49 69% 45%)',
					700: 'hsl(49 69% 35%)',
				},
				teal: {
					DEFAULT: 'hsl(var(--teal))',
					foreground: 'hsl(var(--teal-foreground))',
					50: 'hsl(180 100% 95%)',
					100: 'hsl(180 100% 85%)',
					200: 'hsl(180 100% 75%)',
					300: 'hsl(180 100% 65%)',
					400: 'hsl(180 100% 35%)',
					500: 'hsl(var(--teal))', // Global Teal
					600: 'hsl(180 100% 17%)',
					700: 'hsl(180 100% 13%)',
				},
				rust: {
					DEFAULT: 'hsl(var(--rust))',
					foreground: 'hsl(var(--rust-foreground))',
					50: 'hsl(15 78% 95%)',
					100: 'hsl(15 78% 85%)',
					200: 'hsl(15 78% 75%)',
					300: 'hsl(15 78% 65%)',
					400: 'hsl(15 78% 55%)',
					500: 'hsl(var(--rust))', // Rust Accent
					600: 'hsl(15 78% 35%)',
					700: 'hsl(15 78% 25%)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--tertiary) / 0.3)' },
					'50%': { boxShadow: '0 0 30px hsl(var(--tertiary) / 0.6)' }
				},
				'infinite-scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'infinite-scroll': 'infinite-scroll 20s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
