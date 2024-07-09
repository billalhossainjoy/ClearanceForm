/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1040px",
          "2xl": "1496px",
        },
      },
    },
  },
  plugins: [],
};
