import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'

const themeMobileNavBar = createTheme({
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
    MuiCssBaseline: {
      styleOverrides:
        `img {
          display: block;
            width: 30%;
            object-fit: contain;
        },
       
        ul {
          display:block;
          line-height: 2.5;
          list-style: none;
          margin: 0;
          padding:0;
          
        },

        a {
          text-decoration: none;
          color: white;

        },
        @-webkit-keyframes slide-in-right {
          0% {
            -webkit-transform: translateX(1000px);
                    transform: translateX(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-right {
          0% {
            -webkit-transform: translateX(1000px);
                    transform: translateX(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
          }
        }
        @-webkit-keyframes slide-out-right {
          0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
          }
          100% {
            -webkit-transform: translateX(1000px);
                    transform: translateX(1000px);
            opacity: 0;
          }
        }
        @keyframes slide-out-right {
          0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
          }
          100% {
            -webkit-transform: translateX(1000px);
                    transform: translateX(1000px);
            opacity: 0;
          }
        }        
       
        ` ,
      },
      
   MuiPaper:{
    styleOverrides:{
      root:{
        backgroundColor: '#999',
        color: 'white',
        width: '90%',
        margin: 'auto',
        textAlign: 'left',
        padding: '3%',
        '&.slide-out-bck-right': {
          webkitAnimation: 'slide-out-bck-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
                  animation: 'slide-out-bck-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        },
        '&.slide-in-right': {
          transition: 'none',
          webkitAnimation: 'slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                  animation: 'slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        },
        '&.slide-out-right': {
          transition: 'none',
          webkitAnimation: 'slide-out-right 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
                  animation: 'slide-out-right 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        },

      }
    }
   },
   MuiCollapse:{
    styleOverrides:{
      root:{
        paddingLeft: '10%',
      }
    }
   },
  
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fill:"#white",
          margin: "0% 0% -2% 2%",
          '&.closeNavBar':{
            display: 'block',
            marginLeft: 'auto',
          }
          // '&:hover, &:focus': { fill: '#999' },
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
export default themeMobileNavBar
