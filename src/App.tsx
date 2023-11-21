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
import Footer from './Components/Footer/Footer';

let string = 'http://nfc.rs/gallery/'

function App() {
  const matches=  useMediaQuery('(min-width:801px)')
  return (
    <ThemeProvider theme={themeMain}>
       <CssBaseline/>
      {/* {matches &&  <img className='mainPic' src={string.concat('bg_brush_fromtop.jpg')}/>} */}
        {/* <Grid> */}
          {/* <ThemeProvider theme={headerTheme}>
          <CssBaseline/> */}
            {matches?<Header></Header>:<HeaderMobile></HeaderMobile>}
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              {/* {matches&& <NavBar></NavBar>} */}
            </Routes>
           <Footer/>
          {/* </ThemeProvider> */}
        {/* </Grid> */}
     
    </ThemeProvider>

  )
}

export default App
