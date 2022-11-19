import { createTheme } from '@mui/material/styles'
import themeMain from './themeMain'

const navTheme = createTheme({
  ...themeMain,
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
  components: {
    // MuiInputBase-input-MuiOutlinedInput-input
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#f37435',
          width: '100%',
          color: '#ffffff',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '2px solid #ffffff',
          boxShadow: '0px 0px 0px 2px transparent',
          transition: 'border-bottom 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
          '&:hover, &:focus': { textDecoration: 'none' },
          '&[aria-current]': {
            textDecoration: 'none',
            color: '#ffffff',
            padding: '8px',
            borderRadius: '7px',
            lineHeight: '0.7em',
            boxShadow: '0px 0px 0px 2px #ffffff',
            border: '2px solid transparent',
            transition: 'box-shadow 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
          },
        },
      },
    },

    // MuiCssBaseline: {
    //   styleOverrides: `
    //     svg {
    //       fill: white !important;
    //     }
    //   `,
    // },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderWidth: '2px',
    //       borderColor: '#ff8a65',
    //     },
    //   },
    // },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       minWidth: 200,
    //       margin: 4,
    //       justifyContent: 'center',
    //     },
    //   },
    // },
    // MuiButton: {
    //   defaultProps: {
    //     variant: 'contained',
    //   },
    // },
    // MuiInputLabel: {
    //   defaultProps: {
    //     variant: 'outlined',
    //     required: false,
    //   },
    //   styleOverrides: {
    //     root: {
    //       // transform: 'translate(14px, -20px) scale(0.75)',
    //     },
    //   },
    // },
    // MuiCardMedia: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 6,
    //     },
    //   },
    // },
  },
})
export default navTheme
