import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themeFooter = createTheme({
  
  components: {
    
    MuiCssBaseline: {
      styleOverrides: ".logoFooter { display: block; width: 50%; object-fit: contain;}; a{color:white; text-decoration: none}; @media only screen and (min-width: 600px) {.logoFooter {width: 20%;};",
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "5%",
          width: "100%",
          display: "flex",
          flexDirection:'column',
          alignItems: 'center',
          justifyContent:'center',
          border: "none",
          boxShadow: "none",
          borderRadius: "0",
          backgroundColor:'#212121',
          [themeMain.breakpoints.up('sm')]:{
            flexDirection: 'row',
            justifyContent: 'space-between',

          }
        },
      },
    },
MuiList: {
styleOverrides:{
root:{
"&&.socials":{
display:'flex',
flexDirection:'row',
},
},
},
},

MuiSvgIcon:{
styleOverrides:{
  root:{
    
    
  }
}
},

   MuiListItem:{
    styleOverrides:{
root:{
  justifyContent: 'center',
},
    },
   }, 
MuiLink:{
  styleOverrides:{
    root:{
      textDecoration:'none',
      color:'white',
      '&:hover, &:focus':{
        color:'#f37435',
      },
      '&&.socials':{
        color:'#f37435',
        '&:hover, &:focus':{
          color:'white',
        }
      }
    }
  },
},
    MuiTypography: {
      styleOverrides: {
        root: {},
        h2: {
          fontWeight: "bolder",
        },
      },
    },
  },
});
export default themeFooter;
