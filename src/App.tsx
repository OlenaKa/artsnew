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
import { fetchCategories, type Category } from "./categories";
import generateRoutes from "./generateRoutes";
import { ReactFragment, ReactNode, useEffect, useState } from "react";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={themeMain}>
        {matches ? (
          <Header categories={categories}></Header>
        ) : (
          <HeaderMobile categories={categories}></HeaderMobile>
        )}
        <Routes>
          <Route path="/" element={<MainPage categories={categories} />} />
          {generateRoutes(categories)}
        </Routes>
        <Footer categories={categories} />
      </ThemeProvider>
    </>
  );
}

export default App;
