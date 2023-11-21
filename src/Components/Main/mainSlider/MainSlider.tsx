import * as React from "react";
import {  Box,  Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import mainSlider from '../../../mainSlider'
import themeMainSlider from "./themeMainSlider";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


export default function MainSlider (){

  const [activeStep, setActiveStep] = React.useState(0);

let string = 'http://nfc.rs/gallery/'
  
  return (<ThemeProvider theme={themeMainSlider} >
     <CssBaseline />
     <AutoPlaySwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        // index={activeStep}
        // onChangeIndex={handleStepChange}
        // enableMouseEvents
      >
        {mainSlider.map((step, index) => (
          <div key={step.alt}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={string.concat(step.img)}
                alt={step.alt}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
  
  </ThemeProvider>)
}