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
import generateRoutes from "./generateRoutes";
import { ReactFragment, ReactNode } from "react";
let string = "http://nfc.rs/gallery/";

// interface Category {
//   title: string;
//   path: string;
//   imageSrc?: string;
//   component: React.ComponentType<{ imageSrc: string }> | string;
//   items?: Category[];
// }

function App() {
  const matches = useMediaQuery("(min-width:801px)");
  console.log(generateRoutes(categories));

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={themeMain}>
        {matches ? <Header></Header> : <HeaderMobile></HeaderMobile>}
        <Routes>
          <Route path="/" element={<MainPage />} />
          {generateRoutes(categories)}

          {/* {categories.map(({ title, path, component: Component, imageSrc }) => {
            return (
              <Route
                path={path}
                element={<Component imageSrc={imageSrc} />}
                key={title}
              />
            );
          })} */}
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
