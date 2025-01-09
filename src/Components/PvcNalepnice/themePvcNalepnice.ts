import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themePvcNalepnice = createTheme({
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
            [themeMain.breakpoints.up("sm")]: {
              width: "100%",
            },
          },
          h5: {
            width: "100%",
          },
          padding: "20px",
          ".MuiBox-root": {
            margin: "20px 0px",
          },
          [themeMain.breakpoints.up("sm")]: {
            display: "flex",
            flexWrap: "wrap",
            ".MuiBox-root": {
              width: "70%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            },
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          [themeMain.breakpoints.up("sm")]: {
            width: "30%",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "15px",
          [themeMain.breakpoints.up("sm")]: {
            display: "flex",
            margin: "10px",
            minWidth: "35%",
            padding: "0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.select": {
            padding: "5%",
            [themeMain.breakpoints.up("sm")]: {
              padding: "0",
            },
          },
          // padding: "5%",
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
    MuiButton: {
      styleOverrides: {
        root: {
          display: "block",
          margin: "0 auto",
          [themeMain.breakpoints.up("sm")]: {
            display: "flex",
            alignSelf: "flex-start",
            margin: "0 45%",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: themeMain.palette.primary.main,
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
export default themePvcNalepnice;
