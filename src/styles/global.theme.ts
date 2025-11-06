import { createTheme } from '@mui/material/styles';

export const GLOBAL_MUI_THEME = createTheme({
  palette: {
    resume: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#2C7A7B',
      600: '#285E61',
      700: '#234E52',
      800: '#1D4044',
      900: '#153E3F',
    },
    primary: {
      main: '#1D4044',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#1D4044',
          '&:hover': { backgroundColor: '#234E52' },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '& > .MuiSwitch-thumb': {
            backgroundColor: '#FFFFFF',
          },
          '&.Mui-checked > .MuiSwitch-thumb': {
            backgroundColor: '#2C7A7B', // resume 500 variant
          },
          '& + .MuiSwitch-track': {
            backgroundColor: '#B2F5EA', // resume 100 variant
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#B2F5EA', // resume 100 variant
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    resume: Palette['grey'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    resume?: PaletteOptions['grey'];
  }
}
