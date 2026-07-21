/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        ember: 'rgb(var(--ember) / <alpha-value>)',
      },
      borderColor: {
        // hairline rules render softer than text ink
        ink: 'rgb(var(--ink) / 0.3)',
      },
    },
  },
  plugins: [],
}
