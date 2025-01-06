/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/preline/preline.js',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
  darkMode: 'class',
};
