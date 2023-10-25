import logo from '../../logo512.png'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import headerMobileTheme from './themeHeaderMobile'
import {
  Container,
  List,
  ListItem,
  Link,
  Button,
} from '@mui/material'

import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import MenuIcon from '@mui/icons-material/Menu';
import MobileNavBar  from '../MobileNav/MobileNavBar'
import { useState, useRef } from 'react'
import categories from "../../categories";


export default function HeaderMobile (): JSX.Element {
 const [isActive, setActive]= useState(false)

function handleOpen () {
return  setActive (true)
} 

function handleClose (){
  return setActive(false)
}
  return (
    <>
        <ThemeProvider theme={headerMobileTheme}>
     <CssBaseline/>
      <Container>
       <img src={logo} alt="logo"/>
       <List>
         <ListItem>
          <Link href="mailto:info@arts.rs">
            <AlternateEmailIcon />
          </Link>
         </ListItem>
         <ListItem>
         <Link href="tel:+381113988377">
           <LocalPhoneIcon />
          </Link>
         </ListItem>
         <ListItem>
          <Link href="tel:+381646156081">
           <SmartphoneIcon />
         </Link>
         </ListItem>
        </List>  
        <Button onClick={handleOpen}> <MenuIcon/> </Button> 
      </Container>
    </ThemeProvider>
    {isActive &&
  
     <MobileNavBar categories={categories} close={handleClose} /> 
    }
    </>

   
  )
}