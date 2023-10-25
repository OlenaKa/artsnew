import * as React from "react";
import { Link, Paper, List, ListItem, Card, CardMedia, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles'
import categories from "../../categories";
import themeMainPage from "./themeMainPage";

export default function MainPage (){

let string = 'http://nfc.rs/gallery/'
  
  return (<ThemeProvider theme={themeMainPage} >
  <List>
  {categories.map((category) =>
            
            <ListItem key={category.title}>
              <Card><CardMedia 
          
           image={string.concat(category.imageSrc)}
        title={category.title}><Typography>{category.title}</Typography></CardMedia>
        </Card>
              </ListItem>
          
        )}
  </List>

  </ThemeProvider>)
}