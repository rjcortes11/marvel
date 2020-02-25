// src/ui/theme/index.js

import { createMuiTheme } from "@material-ui/core/styles";

// const palette = {};

// A custom theme for this app
const Theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "fff" },
    primary: {
      light: "rgba(236, 29, 36, 0.8)",
      main: "rgba(236, 29, 36, 1)",
      dark: "rgba(247, 23, 31, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(32, 32, 32, 0.8)",
      main: "rgba(32, 32, 32, 1)",
      dark: "rgba(32, 32, 32, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(236, 29, 36, 1)",
      dark: "rgba(245, 23, 31, 1)",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});

export default Theme;
