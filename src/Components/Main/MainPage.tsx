import * as React from "react";
import {
  Link,
  Paper,
  Box,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import categories from "../../categories";
import MainSlider from "./mainSlider/MainSlider";
import themeMainPage from "./themeMainPage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import useViewport from "../../hooks/useViewport";
import { Slide } from "@mui/material";
import { motion, Variants } from "framer-motion";

const categoryVariants: Variants = {
  offscreen: {
    opacity: 0,
    // scale: 0.5
  },
  onscreen: {
    opacity: 1,
    // scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0, 0.3, 0.5, 0.7, 0.8, 0.6, 1.0],
    },
  },
};

const barVariants: Variants = {
  offscreen: {
    // width: 0,
    opacity: 0,
  },
  onscreen: {
    // width: "100%",
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: [0, 0.3, 0.5, 0.7, 1.0],
    },
  },
};

export default function MainPage() {
  let string = "http://nfc.rs/gallery/";

  const { width } = useViewport();

  return (
    <ThemeProvider theme={themeMainPage}>
      <CssBaseline />
      {/* <MainSlider /> */}
      <ImageList cols={width > 600 ? 3 : 1}>
        {categories.map((category) => (
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            key={category.title}
          >
            <motion.div variants={categoryVariants}>
              <ImageListItem key={category.title}>
                {/* <Typography variant="h2">{category.title}</Typography> */}
                <img
                  // component="img"
                  alt={category.title}
                  src={string.concat(category.imageSrc)}
                  title={category.title}
                  loading="lazy"
                />

                <motion.div variants={barVariants}>
                  <ImageListItemBar
                    title={category.title}
                    actionIcon={
                      <IconButton
                      // sx={{ color: 'white' }}
                      // aria-label={`star ${item.title}`}
                      >
                        <KeyboardDoubleArrowRightIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                  {/* <Typography >{category.title}</Typography> */}
                </motion.div>
              </ImageListItem>
            </motion.div>
          </motion.div>
        ))}

        {/* </motion.div> */}
      </ImageList>
    </ThemeProvider>
  );
}
