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
    '',
    // `@keyframes glow { from {
    //   text-shadow: 0 0 8px #999;
    // }
    // to {
    //   text-shadow:2px 7px 30px -1px rgba(0,0,0,0.75);
      
      
      
    // }};
    
    // @keyframes slide {100% { left: 0; }};`
 
    // 0 0 2px #d44a06a8, 0 0 2px #d44a06a8;
  },

MuiCard:{
styleOverrides:{
root:{
  width: '100%',
},
},
},

 MuiPaper:{
  styleOverrides:{ root:{
    padding:'2%',
    width:'100%',
   display:'flex',
   flexDirection: 'row',
   justifyContent: 'space-evenly',
   alignItems:'center',
   border:'none',
   boxShadow:'none',
   borderRadius:'none',
  //  '::before':{
  //   content:'"a"',
  //   fontSize:'650px',
  //   color:'#999',
  //   position:'absolute',
  //   left:'24px',
  //   top:'-278px',
  //   fontFamily:'auto',
  //   opacity: '20%'
  //     },
  //     '::after':{
  //       content:'url(http://nfc.rs/gallery/bg_brush.jpg)',
  //       fontSize:'650px',
  //       color:'#999',
  //       position:'absolute',
  //       left:'24px',
  //       top:'-278px',
  //       fontFamily:'auto',
  //       opacity: '20%'
  //         },

  },},
 
 },
 MuiCardMedia:{
  styleOverrides:{
    root:{
      width: '40%',
      maxHeight: '600px',
      borderRadius: '2%',
      position: 'relative',
    boxShadow: '20px 20px 35px -13px #616161',
    margin: '5%',
  

    },
    },
  },
 
 MuiTypography:{
styleOverrides:{
root:{
width: '40%',
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
