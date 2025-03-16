const config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.4s ease-in-out forwards",
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
