import { createTheme } from '@mui/material/styles'
import themeMain from './themeMain'

const headerTheme = createTheme({
  ...themeMain,

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
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          width: '100%',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // color: '#ffffff',
          textDecoration: 'none',
          alignItems: 'center',
          display: 'flex',
          '&:hover, &:focus': { textDecoration: 'none' },
          // '&[aria-current]': {
          //   textDecoration: 'none',
          //   color: '#ffffff',
          //   padding: '8px',
          //   borderRadius: '7px',
          //   lineHeight: '0.7em',
          //   boxShadow: '0px 0px 0px 2px #ffffff',
          //   border: '2px solid transparent',
          //   transition: 'box-shadow 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
          // },
        },
      },
    },
  },
})
export default headerTheme
