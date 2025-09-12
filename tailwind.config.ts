
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
				// Phresh Phactory Brand Colors
				'ink-black': '#000000',
				'bright-white': '#FFFFFF',
				'phresh-smoke': '#BDBDBD',
				'jet-gray': '#555454',
				'strategic-gold': '#D4AF37',
				'global-teal': '#006A6A',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#F7F7F7',
					100: '#E8E8E8',
					200: '#D0D0D0',
					300: '#B8B8B8',
					400: '#A0A0A0',
					500: '#000000', // Ink Black
					600: '#000000',
					700: '#000000',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					100: '#F5F5F5',
					200: '#EBEBEB',
					300: '#E0E0E0',
					400: '#D6D6D6',
					500: '#BDBDBD', // Phresh Smoke
					600: '#555454', // Jet Gray
					700: '#333333',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					100: '#F5F5F5',
					200: '#EBEBEB',
					300: '#E0E0E0',
					400: '#D6D6D6',
					500: '#BDBDBD', // Phresh Smoke
				},
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary))',
					foreground: 'hsl(var(--tertiary-foreground))',
					50: '#FDF9E7',
					100: '#FAF1C2',
					200: '#F5E899',
					300: '#EFDE70',
					400: '#E8D54D',
					500: '#D4AF37', // Strategic Gold
					600: '#B8941F',
					700: '#9C7A0A',
				},
				teal: {
					DEFAULT: 'hsl(var(--teal))',
					foreground: 'hsl(var(--teal-foreground))',
					50: '#E6F7F7',
					100: '#B3EBEB',
					200: '#80DEDE',
					300: '#4DD1D1',
					400: '#26BABA',
					500: '#006A6A', // Global Teal
					600: '#005555',
					700: '#004040',
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
