/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        appearing:{
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        appearTitle: 'appearing 0.5s ease-in-out',
        appearImage: 'appearing 1s ease-in-out',
        appearFirstProductName: 'appearing 1.5s ease-in-out', 
        appearsSecondProductName: 'appearing 1.5s ease-in-out',
        appearMoreProducts: 'appearing 2s ease-in-out',
        appearButton: 'appearing 2s ease-in-out',
      },
    },
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1366px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3200px',
      '6xl': '3840px',
    },
  },
};
