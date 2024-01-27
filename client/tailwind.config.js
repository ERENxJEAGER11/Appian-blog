/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-light-blue': '#dbeafe',
        'custom-medium-blue': '#2563eb',
        'custom-dark-blue': '#312e81',
        'custom-darker-blue': '#1e1b4b',
      },
    },
    fontFamily: {
      display: ['Poppins'],
    },
  },
  plugins: [],
};
