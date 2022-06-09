import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const buttonTheme = createTheme({
  palette: {
    neutral: {
      main: "#EFF0F1",
      contrastText: "#000"
    }
  }
});
