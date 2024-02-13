
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
      

       
        },
      },
    },
  },
})
export default headerTheme
