import { Paper, List, ListItem, Link, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import themeFooter from "./themeFooter";
import categories from "../../categories";
import { NavLink } from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

let string = 'http://nfc.rs/gallery/'

// let map: google.maps.Map;
// const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

// function initMap(): void {
//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//     center,
//     zoom: 8
//   });
// }


export default function Footer(): JSX.Element {



  return (
    <ThemeProvider theme={themeFooter} >
     <CssBaseline/>
    <Paper>
    <img className='logoFooter' src={string.concat('adwhite.png')}/>
    <List>
      {categories.map((category)=><ListItem key={category.title}><NavLink to={category.path}>{category.title}</NavLink></ListItem>)}
    </List>
    <List className="socials">
      <ListItem><Link className="socials" href="https://www.facebook.com/arts.designdoo" rel="noopener noreferrer" target="_blank"> <FacebookIcon/></Link></ListItem>
      <ListItem>
      <Link className="socials" href="https://www.instagram.com/arts_design_belgrade/" rel="noopener noreferrer" target="_blank"><InstagramIcon/></Link>
      </ListItem>
      <ListItem>
      <Link className="socials" href="https://www.youtube.com/channel/UC9QvsvynPKgh8g5LZsm8Qqw" rel="noopener noreferrer" target="_blank"><YouTubeIcon/></Link>
      </ListItem>

    </List>
    <List>
          <ListItem>
          <Link href="tel:+381113988377">
           
          <Typography noWrap>  <LocalPhoneIcon /> 0113988377</Typography>
          </Link>
          </ListItem>
        <ListItem><Link href="tel:+381646156081">
           
            <Typography noWrap> <SmartphoneIcon />0646156081</Typography>
          </Link></ListItem>
          <ListItem>
          <Link href="mailto:info@arts.rs">
            
            <Typography noWrap><AlternateEmailIcon />info@arts.rs</Typography>
          </Link>
          </ListItem>
        </List>
  

      <iframe
        src={
          "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11330.214027283302!2d20.4809263!3d44.7695199!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70f855371f85%3A0xcb92ac1e7c0c7198!2sArtS%20Design%20DOO!5e0!3m2!1sen!2srs!4v1700568056502!5m2!1sen!2srs"
        }
        width="200"
        height="200"
        style={{ border: "0" }}
        allowFullScreen={false}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Paper>
    </ThemeProvider>
  );
}
