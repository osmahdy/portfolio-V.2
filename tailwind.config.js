/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        overlayMove: {
          '0%': { transform: 'translate(-50%, -50%) rotate(20deg) scale(1.2)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' },
        },
        slideInOut: {
          '0%': { transform: 'translateX(100%)' },
          '10%': { transform: 'translateX(0)', opacity: '1' },
          '90%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
      },
      animation: {
        overlayMove: 'overlayMove 2s linear infinite alternate',
        slideInOut: 'slideInOut 4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
