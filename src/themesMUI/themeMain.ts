import { createTheme } from '@mui/material/styles'
const themeMain = createTheme({
  palette: {
    primary: {
      light: '#ff8a65',
      main: '#f37435',
      dark: '#e65100',
      contrastText: '#fff',
    },
    secondary: {
      light: '#eeeeee',
      main: '#96989a',
      dark: '#616161',
      contrastText: '#000',
    },
    text: {
      primary: '#616161',
      secondary: '#96989a',
    },
  },
  typography: {
    fontFamily: "'Maven Pro', sans-serif",
    h4: {
      color: '#f37435',
      margin: 2,
    },
    h5: {
      color: '#96989a',
      margin: 2,
    },
  },
  components: {
    // MuiInputBase-input-MuiOutlinedInput-input
    MuiInputBase: {
      styleOverrides: {
        input: {
          textAlign: 'center',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: '2px',
          borderColor: '#ff8a65',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: 200,
          margin: 4,
          justifyContent: 'center',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        variant: 'outlined',
        required: false,
      },
      styleOverrides: {
        root: {
          // transform: 'translate(14px, -20px) scale(0.75)',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
})
export default themeMain
