/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        tertiary: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
        },
      },
    },
  },
  plugins: [],
};
