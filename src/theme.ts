import { PaletteColor, SimplePaletteColorOptions, createTheme } from "@mui/material/styles";

declare module "@mui/material" {
  interface Palette {
    white: PaletteColor;
  }

  interface PaletteOptions {
    white: SimplePaletteColorOptions;
  }
  
  interface IconButtonPropsColorOverrides {
    white: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#616161'
    },
    white: {
      main: '#ffffff'
    }
  },
  typography: {
    h2: {
      fontSize: '24px',
      color: 'white',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none'
    }
  }
});
