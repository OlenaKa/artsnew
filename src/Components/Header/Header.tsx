import logo from '../../arts_promote.png'
import headerTheme from './themeHeader'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  Container,
  List,
  ListItem,
  Link,
  Typography,
} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import NavBar from '../Nav/NavBar'
import categories from "../../categories";

export default function Header(): JSX.Element {

  
  return (
    <>
    <ThemeProvider theme={headerTheme}>
    <CssBaseline/>
      <Container>
        <img src={logo} alt="logo"/>
        <List>
          <ListItem>
          <Link href="tel:+381113988377">
            <LocalPhoneIcon />
            <Typography noWrap>0113988377</Typography>
          </Link>
          </ListItem>
        <ListItem><Link href="tel:+381646156081">
            <SmartphoneIcon />
            <Typography noWrap>0646156081</Typography>
          </Link></ListItem>
          <ListItem>
          <Link href="mailto:info@arts.rs">
            <AlternateEmailIcon />
            <Typography noWrap>info@arts.rs</Typography>
          </Link>
          </ListItem>
        </List>
      
      </Container>
    
    </ThemeProvider>
      <NavBar categories={categories}/>
      </>
  )
}
