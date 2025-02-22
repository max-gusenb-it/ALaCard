/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/app/src/**/*.{html,scss,ts}",
    "./projects/features/src/**/*.{html,scss,ts}",
    "./projects/shared/src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      colors: {
        it_yellow: {
          900: "var(--default-900)",
          700: "var(--default-700)",
          600: "var(--default-600)",
          500: "var(--default-500)",
          300: "var(--default-300)",
          200: "var(--default-200)",
          100: "var(--default-100)",
          0o0: "var(--default-000)"
        },
        primary: {
          900: "rgb(var(--primary-900) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          0o0: "rgb(var(--primary-000) / <alpha-value>)"
        },
        neutral: {
          950: "rgb(var(--neutral-950) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
        }
      },
      brightness: {
        80: '.8'
      },
      dropShadow: {
        'card': '0 0 6px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}