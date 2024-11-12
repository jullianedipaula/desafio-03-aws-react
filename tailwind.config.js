/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '375px' },
        ls: { max: '650px' },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      lineHeight: {
        130: '130%',
      },
      colors: {
        primary_text: '#18191F',
        secondary_text: '#FFFFFF',
        tertiary_text: '#D1D5DB',
        primary_color: '#09BC8A',
        secondary_color: '#004346',
        card_color: '#508991',
       dark_green: '#172A3A',
       red: '#992020',
       blue_green: '#09404D',
       soil_brown: '#340808',
      },
      keyframes: {
        'open-menu': {
          '0%': { width: '0px' },
          '100%': { width: '12rem' },
        },
        'close-menu': {
          '0%': { width: '12rem' },
          '100%': { width: '0' },
        },
      },
      animation: {
        'to-open': 'open-menu 0.5s forwards',
        'to-close': 'close-menu 0.5s forwards',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      preferredStrategy: 'pseudoelements',
      nocompatible: true,
    }),
  ],
};
