import { createTheme } from "@mui/material/styles";
import themeMain from "../../themesMUI/themeMain";

const themeRollup = createTheme({
  ...themeMain,
  components: {
    MuiCssBaseline: {
      styleOverrides: "",
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          h2: {
            color: themeMain.palette.primary.main,
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "2.5rem",
            fontWeight: "400",
            marginBottom: "20px",
          },
          h5: {
            color: themeMain.palette.primary.main,
            fontWeight: "500",
          },
          ".cards-container": {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",

            [themeMain.breakpoints.up("md")]: {
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "&.rollup-card": {
            display: "flex",
            flexDirection: "row",
            border: `2px solid ${themeMain.palette.primary.main}`,
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            },
            ".rollup-card-image": {
              width: "120px",
              minHeight: "200px",
              backgroundColor: "#f3f4f6",
              borderRight: `1px solid ${themeMain.palette.primary.main}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            ".rollup-card-content": {
              flex: 1,
              padding: "16px !important",
            },
            ".rollup-card-title": {
              color: themeMain.palette.primary.main,
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontSize: "1.1rem",
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "&.rollup-table": {
            "& .MuiTableCell-root": {
              borderBottom: `1px solid ${themeMain.palette.primary.main}40`,
              padding: "8px 4px",
              fontSize: "0.95rem",
              "&:first-of-type": {
                fontWeight: "500",
                color: themeMain.palette.text.secondary,
              },
              "&.price-cell": {
                fontWeight: "bold",
                color: themeMain.palette.primary.main,
              },
            },
            "& .MuiTableRow-root:last-child .MuiTableCell-root": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  },
});

export default themeRollup;
