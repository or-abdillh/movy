/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Inter', 'serif'],
      },

      colors: {
        primary: {
          100: '#FFF2E5',
          200: '#FFE0BF',
          300: '#FFCB94',
          400: '#FFB86D',
          500: '#FEA94E',
          600: '#FE9939',
          700: '#FE8E2E',
          800: '#FE962F',
          900: '#FE922D', // original
        },
        secondary: {
          100: '#FFE6EE',
          200: '#FFBFD2',
          300: '#FF94B5',
          400: '#FF6F9C',
          500: '#FD5286',
          600: '#FD3C79',
          700: '#FD316F',
          800: '#FD2B6A',
          900: '#FD2F73', // original
        },
        tersier: {
          100: '#F7E6FA',
          200: '#EDC2F4',
          300: '#E198EE',
          400: '#D471E7',
          500: '#C94EE1',
          600: '#C036DB',
          700: '#BC2BD7',
          800: '#B927D5',
          900: '#C536C9', // original
        },
      },
    },
  },
  plugins: [],
}

