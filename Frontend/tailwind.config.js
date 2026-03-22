/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#392cc1',
        primary_container: '#534ad9',
        surface: '#faf8ff',
        surface_container_low: '#f2f3ff',
        surface_container: '#eaedff',
        surface_container_highest: '#dae2fd',
        on_surface: '#131b2e',
        tertiary_container: '#7531e6',
        secondary_fixed: '#d3e4fe',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
