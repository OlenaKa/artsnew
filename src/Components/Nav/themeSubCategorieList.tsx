import { createTheme } from '@mui/material/styles'
import themeMain from '../../themesMUI/themeMain'
const themeSubCategoriesListNavBar = createTheme({

components:{
  MuiList:{
    styleOverrides:{
      root:{
display: "flex",
flexDirection:'column',
      },
    },
  },
  MuiPaper:{
    styleOverrides:{
      
      root:{     boxShadow: '1px 1px 5px 1px grey', marginTop:'10px'},
      
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: '#f37435',
        textDecoration: 'none',
        display: 'flex',
        '&:hover, &:focus': { color: '#f37435', backgoundColor:'#999', },
        '&:active' :{textDecoration:'underline'},
        '&:hover > .MuiSvgIcon-root, &:focus > .MuiSvgIcon-root': { fill: '#999' },
        '&[aria-current]': {
          textDecoration: 'none',
          transition: 'box-shadow 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)',
        },


     
      },
    },
  },
 MuiButton:{
  styleOverrides:{
    root:{
      maxWidth: 'min-content',
      textWrap: 'nowrap',
      border:'2px solid #999',
      color: 'white',
      backgroundColor:'#999',
      '&:hover':{
        color: '#f37435', backgoundColor:'#999', borderColor:'#f37435'
      },
     


    },     
  }
 },

}
})

export default themeSubCategoriesListNavBar