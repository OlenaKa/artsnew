import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Components/Header/Header";
import HeaderMobile from "./Components/HeaderMobile/HeaderMobile";
import MainPage from "./Components/Main/MainPage";
// import NavBar from './Components/Nav/NavBar';
import themeMain from "./themesMUI/themeMain";
import headerTheme from "./themesMUI/headerTheme";
import { Grid } from "@mui/material";
import { Route, Routes, useRoutes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Stikeri from "./Components/Stikeri/Stikeri";
import categories from "./categories";
import { ReactFragment, ReactNode } from "react";
let string = "http://nfc.rs/gallery/";

interface Category {
  title: string;
  path: string;
  imageSrc: string;
  component: string;
  items?: {
    title: string;
    path: string;
    component: string;
  }[];
}

function App() {
  const matches = useMediaQuery("(min-width:801px)");
  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />

      {matches ? <Header></Header> : <HeaderMobile></HeaderMobile>}
      <Routes>
        <Route path="/" element={<MainPage />} />

        {categories.map(({ title, path, component }) => {
          return <Route path={path} element={component} key={title} />;
        })}
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
