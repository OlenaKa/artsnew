import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'

const themeNavBar = createTheme({
  ...themeMain,
 
  components: {
    MuiCssBaseline: {
      styleOverrides:
        `  a {
          text-decoration: none;
         color: white;
                
        },
        a:hover{ color: #f37435; backgoundColor:#999},

       
        ` ,
      },
      
      MuiPaper:{
        styleOverrides:{
          root:{
            
            padding: '5px',
            display: 'flex',
            boxShadow: 'none',
            
          }
        }
       },
   MuiCollapse:{
    styleOverrides:{
      root:{
        display:'block',
        paddingLeft: '5%',
      }
    }
   },
  
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fill:"#white",
          margin: "0% 0% -2% 2%",
          '&.closeNavBar':{
            
          }
         
        } ,
      }
    },

    MuiList:{
      styleOverrides:{
        root:{
          display: 'flex',
          
        },
      }
    },
 MuiListItem:{
  styleOverrides:{
    root:{
      padding: '8px',

    },
  },
},
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#f37435',
          textDecoration: 'none',
          display: 'flex',
          '&:hover, &:focus': { color: '#f37435', backgoundColor:'#999', },
          '&:active' :{textDecoration:'underline'},
          '&:hover > .MuiSvgIcon-root, &:focus > .MuiSvgIcon-root': { fill: '#999' },
          '&[aria-current]': {
            textDecoration: 'none',
         
            transition: 'box-shadow 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
          },


       
        },
      },
    },
   MuiButton:{
    styleOverrides:{
      root:{
        maxWidth: 'min-content',
        textWrap: 'nowrap',
        border:'2px solid #999',
        color: 'white',
        backgroundColor:'#999',
        '&:hover':{
          color: '#f37435', backgoundColor:'#999', borderColor:'#f37435'
        },
       


      },     
    }
   },

   
  },
})
export default themeNavBar
