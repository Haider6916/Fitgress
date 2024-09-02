/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ibmMedium: "IBMPlexSans-Medium",
        ibmRegular: "IBMPlexSans-Regular",
        ibmExtraThin: "IBMPlexSans-ExtraLight",
        ibmThin: "IBMPlexSans-Thin",
        ibmBold: "IBMPlexSans-Bold",
      },
    },
  },
  plugins: [],
};
