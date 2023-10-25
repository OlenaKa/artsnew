import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Components/Header/Header'
import HeaderMobile from './Components/HeaderMobile/HeaderMobile';
import MainPage from './Components/Main/MainPage'
// import NavBar from './Components/Nav/NavBar';
import themeMain from './themesMUI/themeMain'
import headerTheme from './themesMUI/headerTheme'
import { Grid } from '@mui/material'
import { Route, Routes } from 'react-router-dom';


function App() {
  const matches=  useMediaQuery('(min-width:801px)')
  return (
    <ThemeProvider theme={themeMain}>
       <CssBaseline/>
        {/* <Grid> */}
          {/* <ThemeProvider theme={headerTheme}>
          <CssBaseline/> */}
            {matches?<Header></Header>:<HeaderMobile></HeaderMobile>}
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              {/* {matches&& <NavBar></NavBar>} */}
            </Routes>

          {/* </ThemeProvider> */}
        {/* </Grid> */}
     
    </ThemeProvider>

  )
}

export default App
