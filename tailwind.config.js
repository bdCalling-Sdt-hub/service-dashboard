/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4F9EC",
        secondary: "#95C343",
        btn: "#95C343",
        bgColor: "#FFFFFF",
        textColor: "#333333",
      },
    },
  },
  plugins: [],
}

