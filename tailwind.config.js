/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
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
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
