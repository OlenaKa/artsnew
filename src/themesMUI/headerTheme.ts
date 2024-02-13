import { createTheme } from '@mui/material/styles'
import themeMain from './themeMain'

const headerTheme = createTheme({
  ...themeMain,

  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides:
  //       `img {
  //         display: block;
  //           width: 90%;
  //       }
  //       @media only screen and (min-width: 900px){
  //         img {
  //          width: 30%;
  //         }
  //       }
  //       ` ,
  //     },
  

    
  //  MuiContainer:{
  //   styleOverrides:{
  //     root:{
  //       xs:{
  //         display: 'flex',
  //         width: '100%',
  //         margin: '10px',
  //         padding: '0'
  //       },
  //     }
  //   }
  //  },
  //   MuiList: {
  //     styleOverrides: {
  //       root: {
  //         // display: 'flex',  
  //         // justifyContent: 'center'  
  //   },  },
      
  //   },
  //   MuiSvgIcon:{
  //     styleOverrides:{
  //       root:{
  //         fill:"#f37435",
  //         '&:hover, &:focus': { fill: '#999' },
  //       } ,
  //     }
  //   },
  
  //   MuiLink: {
  //     styleOverrides: {
  //       root: {
  //         color: '#999',
  //         textDecoration: 'none',
  //         // alignItems: 'center',
  //         display: 'flex',
  //         '&:hover, &:focus': { color: '#f37435'},
  //         '&:active' :{textDecoration:'underline'},
  //         '&:hover > .MuiSvgIcon-root, &:focus > .MuiSvgIcon-root': { fill: '#999' },
  //         // '&[aria-current]': {
  //         //   textDecoration: 'none',
  //         //   color: '#ffffff',
  //         //   padding: '8px',
  //         //   borderRadius: '7px',
  //         //   lineHeight: '0.7em',
  //         //   boxShadow: '0px 0px 0px 2px #ffffff',
  //         //   border: '2px solid transparent',
  //         //   transition: 'box-shadow 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
  //         // },

       
  //       },
  //     },
  //   },
  // },
})
export default headerTheme
