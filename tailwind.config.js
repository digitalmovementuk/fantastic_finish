/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08110b",
        leaf: "#37ca37",
        moss: "#147c2d",
        acid: "#b8ff62",
        glow: "#ecffe7",
        gold: "#ffc527",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(8, 17, 11, 0.14)",
        line: "0 1px 0 rgba(8, 17, 11, 0.08)",
      },
    },
  },
  plugins: [],
};
