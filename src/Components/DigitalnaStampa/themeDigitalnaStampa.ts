import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themeDigitalnaStampa = createTheme({
  ...themeMain,
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     .digitalnaIntroText {
    //       margin-top: 32px !important;
    //       margin-bottom: 16px !important;
    //     }
    //   `,
    // },
    // // MuiTypography: {
    // //   styleOverrides: {
    // //     body2: {
    // //       sx: { textAlign: "center" },
    // //       textAlign: "center",
    // //     },
    // //   },
    // // },
    MuiPaper: {
      styleOverrides: {
        root: {
          h2: {
            color: themeMain.palette.primary.main,
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "2.5rem",
            fontWeight: "300",
            [themeMain.breakpoints.up("sm")]: {
              width: "100%",
            },
          },
          h5: {
            width: "100%",
          },

          // ".MuiBox-root": {
          //   margin: "20px 0px",
          // },
          [themeMain.breakpoints.up("sm")]: {
            display: "flex",
            flexWrap: "wrap",
            ".MuiBox-root": {
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            },
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "visible",
          position: "relative",
          border: `2px solid ${themeMain.palette.primary.main}75`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&.quantityCard": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          "&.quantityCard:hover": {
            transform: "translateY(-4px)",
            boxShadow: themeMain.shadows[6],
          },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          "&.quantityCardContent": {
            flexGrow: 1,
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          "&.quantityAvatar": {
            width: 36,
            height: 36,
            backgroundColor: themeMain.palette.primary.main,
            color: themeMain.palette.common.white,
          },
        },
      },
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: "subtitle1", className: "digitalnaCardTitle" },
          style: {
            fontWeight: "bold",
            textTransform: "uppercase",
            // textAlign: "center",
          },
        },
        {
          props: { variant: "body2", className: "digitalnaIntroText" },
          style: {
            margin: "10px 15px",
          },
        },
        {
          props: { className: "digitalnaPopularBadge" },
          style: {
            display: "block",
            position: "absolute",
            top: "-3%",
            left: "7%",
            fontWeight: "bold",
            textTransform: "uppercase",
            // textAlign: "center",
            backgroundColor: themeMain.palette.primary.main,
            color: themeMain.palette.common.white,
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "0.60rem",
          },
        },
      ],
    },
  },
});
export default themeDigitalnaStampa;
