/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors.js";

const contents = ["./internal/**/*.templ", `${process.env.HOME}/go/pkg/mod/github.com/hanariu/hanariu@*/**/*.{go,templ}`];

export default {
  darkMode: "class",
  content: contents,
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: colors.blue,
        secondary: colors.neutral,
        success: colors.green,
        info: colors.teal,
        warning: colors.orange,
        danger: colors.red,
      },
      borderRadius: {
        "full-percent": "50%",
      },
    },
  },
  plugins: [
    forms({
      strategy: "class",
    }),
  ],
};
