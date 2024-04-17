import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      "koodak",
    ].join(','),
  },
  palette: {
    primary: {
      main: '#3C8DAD',
      dark: '#F5A962',
      contrastText: '#fff',
    },
    secondary: {
      main: '#125D98',
      contrastText: '#fff',
    },
    error: {
      light: '#f44336',
      main: '#f44336',
      dark: '#f44336',
      contrastText: '#fff',
    },
    warning: {
      light: '#ffeb3b',
      main: '#ffeb3b',
      dark: '#ffeb3b',
      contrastText: '#fff',
    },
    info: {
      light: '#00bcd4',
      main: '#00bcd4',
      dark: '#00bcd4',
      contrastText: '#fff',
    },
    success: {
      light: '#7cb342',
      main: '#8bc34a',
      dark: '#c5e1a5',
      contrastText: '#fff',
    },
  },
});

export default theme
