import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";
import { Padding } from "@mui/icons-material";

const themePapirneNalepnice = createTheme({
  ...themeMain,
  components: {
    MuiCssBaseline: {
      styleOverrides: "",
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          width: "100%",
          textAlign: "center",
        },
      },
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
            "&#shape": {
              // width: "100%",
              // flexDirection: "row",
            },
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
    MuiFormGroup: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          outline: "1px solid #f37435",
          "&#shape": {
            padding: "15px 0px",
            "&::after": {
              content: '"Izaberite oblik"', // Text to display
              position: "absolute",
              top: "-15px", // Adjust position as needed
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#fff",
              padding: "2px 5px",
              borderRadius: "3px",
              // boxShadow: "0 0 0 2px #f37435", // Outline effect
            },
          },
          [themeMain.breakpoints.up("sm")]: {
            "&#shape": {
              marginLeft: "auto",
              marginRight: "auto",
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          [themeMain.breakpoints.up("sm")]: {
            width: "28%",
            flexDirection: "row",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused#shape": {
            color: themeMain.palette.secondary.main,
          },
          "&.select": {
            padding: "5%",
            [themeMain.breakpoints.up("sm")]: {
              padding: "0",
            },
          },
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
export default themePapirneNalepnice;
