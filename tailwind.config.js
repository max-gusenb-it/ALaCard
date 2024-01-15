/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "var(--primary-900)",
          700: "var(--primary-700)",
          600: "var(--primary-600)",
          500: "var(--primary-500)",
          300: "var(--primary-300)",
          200: "var(--primary-200)",
          100: "var(--primary-100)",
          0o0: "var(--primary-000)"
        },
        neutral: {
          950: "var(--neutral-950)",
          900: "var(--neutral-900)",
          800: "var(--neutral-800)",
          700: "var(--neutral-700)",
          600: "var(--neutral-600)",
          500: "var(--neutral-500)",
          400: "var(--neutral-400)",
          300: "var(--neutral-300)",
          200: "var(--neutral-200)",
        }
      }
    },
  },
  plugins: [],
}

