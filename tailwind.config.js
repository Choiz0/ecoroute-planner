/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        g: "#B8D8BC",
        darkg: "#2A3A2F",
        mybrown: "#994F12",
        myorange: "#BC865D",
        myblack: "#241D13",
        mypink: "#F1B0AE",
        mywhite: "#F9ECD9",
        myLbrown: "#C2D69B",
        myg2: "#335B39",
        myyellow: "#F6B73B",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
