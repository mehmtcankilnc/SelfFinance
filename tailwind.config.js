/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#F9F9F9",
        headerBg: "#313131",
        action: "#C67C4E",
        textColor: "#242424",
        secondaryText: "#374151",
      },
    },
  },
  plugins: [],
};
