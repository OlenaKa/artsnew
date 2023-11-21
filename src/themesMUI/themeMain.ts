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
    MuiCssBaseline:{
      styleOverrides:
      '.mainPic{  width:22%;  position: absolute; top: 0; right: 0;z-index: 2;}',
      // `@keyframes glow { from {
      //   text-shadow: 0 0 8px #999;
      // }
      // to {
      //   text-shadow:2px 7px 30px -1px rgba(0,0,0,0.75);
        
        
        
      // }};
      
      // @keyframes slide {100% { left: 0; }};`
   
      // 0 0 2px #d44a06a8, 0 0 2px #d44a06a8;
    },

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
