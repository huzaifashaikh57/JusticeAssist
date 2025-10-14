/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'very-light-gray': '#F9F7F7',
        'soft-blue-gray': '#DBE2EF',
        'deep-blue': '#3F72AF',
        'dark-navy': '#112D4E',
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
}
