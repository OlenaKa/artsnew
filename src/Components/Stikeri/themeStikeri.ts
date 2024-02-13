import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themeStikeri = createTheme({
  ...themeMain,
  components: {
    MuiCssBaseline: {
      styleOverrides: "",
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          h2: {
            color: themeMain.palette.primary.main,
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "2.5rem",
            fontWeight: "400",
          },
          // width: '100%',
          [themeMain.breakpoints.up("sm")]: {
            h2: {
              fontSize: "2.5rem",
              fontWeight: "400",
            },
            p: {
              // color: themeMain.palette.text.secondary,
              textAlign: "center",
              textTransform: "uppercase",
            },
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "15px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          padding: "5%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: themeMain.palette.primary.main,
        },
        root: {
          // borderColor: themeMain.palette.primary.main,
          // margin: '5px',
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {},
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
export default themeStikeri;
