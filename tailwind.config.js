// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        upper: "upper",
        sftext: "sftext",
        para: "para",
        sftitle: "sftitle",
        aileron: "aileron",
      },
    },
  },
  plugins: [],
};
