import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'

const themeMainPage = createTheme({
 components:{
 MuiPaper:{
  styleOverrides:{ root:{
    width:'100%',
   

  },},
 
 },
 MuiCardMedia:{
  styleOverrides:{
    root:{
    
      height: '500px',
    },
  },
 },
 MuiTypography:{
styleOverrides:{
root:{
width: '100%',
height:'100%',
display: 'flex',
justifyContent:'center',
alignItems: 'center',
fontSize:'150px',
background: 'linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4))', 
color: 'white',

},
},
 },
 },
   
  
})
export default themeMainPage
