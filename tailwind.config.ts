import type { Config } from 'tailwindcss'

export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: {
            DEFAULT: '#0A0A0A',
            light: '#F5F5F5'
          },
          darker: {
            DEFAULT: '#141414',
            light: '#cfcfcf'
          },
          lighter: {
            DEFAULT: '#cfcfcf',
            light: '#cfcfcf'
          },
          dark: {
            DEFAULT: '#1A1A1A',
            light: '#F8F8F8'
          },
          primary: {
            DEFAULT: '#00FFF0',
            light: '#4F46E5'
          },
          secondary: {
            DEFAULT: '#4F46E5',
            light: '#4F46E5'
          },
          accent: {
            DEFAULT: '#BD00FF',
            light: '#6366F1'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 15px rgba(79, 70, 229, 0.2)',
        'neon-strong': '0 0 20px rgba(79, 70, 229, 0.3)',
      },
      transitionTimingFunction: {
        'cyber': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config