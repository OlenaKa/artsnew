import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './Components/Header'
import themeMain from './themesMUI/themeMain'
import headerTheme from './themesMUI/headerTheme'
import { Grid } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline>
        <Grid>
          <ThemeProvider theme={headerTheme}>
            <Header></Header>
          </ThemeProvider>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App
