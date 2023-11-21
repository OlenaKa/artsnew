import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themeFooter = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: ".logoFooter { display: block; width: 15%; object-fit: contain;}; a{color:white; text-decoration: none}",
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "2%",
          width: "100%",
          display: "flex",
          border: "none",
          boxShadow: "none",
          borderRadius: "none",
          backgroundColor:'#212121'
        },
      },
    },
MuiLink:{
  styleOverrides:{
    root:{
      textDecoration:'none',
      color:'white'
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
