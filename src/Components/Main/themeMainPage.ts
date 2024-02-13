import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'

const themeMainPage = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
 components:{
  MuiCssBaseline:{
    styleOverrides:
    '@keyframes fadeIn { 0% { opacity: 0; }100% { opacity: 1; }}',
    // `@keyframes glow { from {
    //   text-shadow: 0 0 8px #999;
    // }
    // to {
    //   text-shadow:2px 7px 30px -1px rgba(0,0,0,0.75);
      
      
      
    // }};
    
    // @keyframes slide {100% { left: 0; }};`
 
    // 0 0 2px #d44a06a8, 0 0 2px #d44a06a8;
  },
MuiImageList:{
  styleOverrides:{
    root:{
     
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '4px',
      [themeMain.breakpoints.up('sm')]:{
        // flexDirection: 'row',
        // justifyContent: 'space-between',

      },
    },
  },
},
MuiImageListItem:{
  styleOverrides:{
    root:{
      margin:'5px',
      padding:'20px 20px 0px 20px',
      border:'solid 2px #f37435',
      borderRadius:'5px',
      // '::after':{
      //       content:"radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%)",
      //       width:'95%',
      //       height:'95%',
                         
      //         position:'absolute',
      //         // left:'24px',
      //         // top:'-278px',
      //         fontFamily:'auto',
      //         opacity: '20%'
      //       },
      },
      img:{
        borderRadius:'inherit',
      }
    },
  
},
MuiImageListItemBar:{
  styleOverrides:{
    root:{
      position:'relative',
      background:'white',

      
     
// background: 'no-repeat right/70% url(http://nfc.rs/gallery/brush_white_1.png)',

    },
title:{
  textAlign: 'end',
  color: '#f37435',
  textTransform: 'uppercase',
  fontWeight: 'bold',
}
  },
},

 MuiSvgIcon:{
  styleOverrides:{
    root:{
      color: '#f37435',
  

    },
    },
  },
 
MuiIconButton:{
  styleOverrides:{
    root:{
// padding:'0px',
    },
  },
},


 MuiTypography:{
styleOverrides:{
root:{
// width: '40%',
height:'100%',
display: 'flex',
justifyContent:'center',
alignItems: 'center',
textAlign: 'center',
textTransform: 'uppercase',

// fontSize:'30%',

color: '#f37435',
textShadow:'1px 4px 6px rgba(0,0,0,0.25)',




},
h2:{
  fontWeight: 'bolder',
}



},

},
 },
 
   
  
})
export default themeMainPage
