/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      primaryColor: "#0067FF",
      yellowColor: "#FEB60D",
      purpleColor: "#9771FF",
      irisBlueColor: "#01B5C5",
      headingColor: "#181A1E",
      textColor: "#4E545F",
      ajith: "#000000",
    },
    boxShadow: {
      panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
    },
    fontFamily:{
      schedule:[ 'Bree Serif', 'serif'],
      admin:[ 'Satisfy', 'cursive'],
      worker:[ 'Bree Serif', 'serif'],
      success:[ 'Sriracha', 'cursive'],
      caption:[ 'Noto Serif Devanagari', 'serif'],
      caption2:[ 'Yellowtail', 'cursiv'],

    }

  },
};
export const plugins = [];

