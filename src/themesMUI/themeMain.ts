import { createTheme } from "@mui/material/styles";
const themeMain = createTheme({
  palette: {
    primary: {
      light: "#ff8a65",
      main: "#f37435",
      dark: "#e65100",
      contrastText: "#fff",
    },
    secondary: {
      light: "#eeeeee",
      main: "#96989a",
      dark: "#616161",
      contrastText: "#000",
    },
    text: {
      primary: "#616161",
      secondary: "#96989a",
    },
  },
  typography: {
    fontFamily: "'Maven Pro', sans-serif",
    h4: {
      color: "#f37435",
      textAlign: "center",
    },
    h5: {
      color: "#f37435",
      textAlign: "center",
    },
    subtitle1: {
      color: "#616161",
    },
    subtitle2: {
      color: "#f37435",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides:
        ".mainPic{  width:22%;  position: absolute; top: 0; right: 0;z-index: 2;}",
    },
  },
});
export default themeMain;
