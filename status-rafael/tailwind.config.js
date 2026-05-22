/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0052a3',
          dark: '#003d7a',
          light: '#4a90e2',
          soft: '#ddf0ff',
        },
        accent: {
          DEFAULT: '#00b4d8',
          soft: '#d4f5ff',
        },
        status: {
          active: '#06a77d',
          warning: '#ff9f43',
          error: '#ee5a52',
        },
      },
      boxShadow: {
        brand: '0 20px 40px rgba(15, 78, 150, 0.12)',
        'brand-lg': '0 30px 80px rgba(0, 180, 216, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
