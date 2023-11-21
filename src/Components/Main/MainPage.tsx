import * as React from "react";
import { Link, Paper, Box, List, ListItem, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import categories from "../../categories";
import MainSlider from "./mainSlider/MainSlider";
import themeMainPage from "./themeMainPage";
import {Slide} from "@mui/material";



export default function MainPage (){

  

let string = 'http://nfc.rs/gallery/'
  
  return (<ThemeProvider theme={themeMainPage} >
     <CssBaseline />
     <MainSlider/>
  <List>
  {categories.map((category) =>
            
            <ListItem key={category.title}>
              <Card><Slide in = {true} direction="left" easing={{enter:'easeOut'}}><Typography variant="h2">{category.title}</Typography></Slide><CardMedia 
          component="img"
          alt={category.title}
           image={string.concat(category.imageSrc)}
        title={category.title}></CardMedia>
       
       
        
        </Card>
              </ListItem>
          
        )}
  </List>

  </ThemeProvider>)
}