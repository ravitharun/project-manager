/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include your HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in the src directory
  ],
  theme: {
    extend: {}, // Use this to extend the default theme
  },
  plugins: [], // Add plugins here if needed
};
