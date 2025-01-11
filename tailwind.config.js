/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        appears: {
          '0%': { transform: 'translateY(0%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        appears: 'appears 0.5s ease-in-out',
      },
    },
    screens: {
      'xs': '320px',
      // => @media (min-width: 320px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1366px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }

      '4xl': '2560px',
      // => @media (min-width: 2560px) { ... }

      '5xl': '3200px',
      // => @media (min-width: 3200px) { ... }

      '6xl': '3840px',
      // => @media (min-width: 3840px) { ... }
    }
  },
};
