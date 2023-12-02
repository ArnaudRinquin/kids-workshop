/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    print: {
      "avoid-page-break": {
        "page-break-inside": "avoid",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
