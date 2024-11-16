import type { Config } from 'tailwindcss'

export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cyber: ['Inter', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#FF10F0',
          blue: '#00FFF0',
          purple: '#BD00FF',
          yellow: '#FFE600'
        },
        cyber: {
          black: '#0A0A0A',
          darker: '#141414',
          dark: '#1A1A1A',
          primary: '#00FFF0',
          secondary: '#FF10F0',
          accent: '#BD00FF'
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 255, 240, 0.2)',
        'neon-strong': '0 0 20px rgba(0, 255, 240, 0.3)',
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