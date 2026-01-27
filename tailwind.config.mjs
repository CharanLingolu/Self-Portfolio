/** @type {import('tailwindcss').Config} */
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
// 1. We import the package here
import tailwindAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translate(0)" },
          "100%": { transform: "translate(-50%)" },
        },
      },
      colors: {
        cyan: {
          500: "#06b6d4",
          900: "#164e63",
        },
      },
    },
  },
  // 2. We add it to the plugins list here
  plugins: [addVariablesForColors, tailwindAnimate],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ":root": newVars,
  });
}
