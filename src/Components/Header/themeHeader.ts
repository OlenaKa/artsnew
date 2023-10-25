
import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'

const headerTheme = createTheme({
  ...themeMain,
typography:{
fontSize:20,
},
  components: {
    MuiCssBaseline: {
      styleOverrides:
        `img {
          display: block;
            width: 50%;
            object-fit: contain;
        }
        ` ,
      },
   MuiButton:{
    styleOverrides:{
      root:{
        margin:0,
        padding: 0,
        display:'block'
      }
    }
   }, 
   MuiContainer:{
    styleOverrides:{
      root:{
          display: 'flex',
          flexDirection: 'row', 
          width: '100%',
          margin: '10px',
          padding: '0'
        },
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: 'flex', 
          flexDirection: 'row' 
    },  },
      
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fill:"#f37435",
          '&:hover, &:focus': { fill: '#999' },
        } ,
      }
    },
  
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#999',
          textDecoration: 'none',
          display: 'flex',
          '&:hover, &:focus': { color: '#f37435'},
          '&:active' :{textDecoration:'underline'},
          '&:hover > .MuiSvgIcon-root, &:focus > .MuiSvgIcon-root': { fill: '#999' },
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
