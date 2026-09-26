import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#080b14',
          850: '#0c1120',
          800: '#111829',
          700: '#1b2338',
          600: '#2a3350',
        },
        pulse: {
          50: '#eefcff',
          100: '#cff7fe',
          200: '#a5eefd',
          300: '#6fe0fa',
          400: '#33c9f2',
          500: '#12aee0',
          600: '#0a89bb',
          700: '#0c6b95',
        },
        volt: {
          300: '#d9f99d',
          400: '#bef264',
          500: '#a3e635',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(51,201,242,0.25), 0 20px 60px -20px rgba(18,174,224,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
