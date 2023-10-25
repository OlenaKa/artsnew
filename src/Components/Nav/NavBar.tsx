import * as React from "react";

import { useState} from "react";
import themeNavBar from "./themeNavBar";
import themeSubCategoriesListNavBar from "./themeSubCategorieList";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Category } from "../MobileNav/typesCategories";
import { hasChildren } from "../../helpers/hasChildren";
import { MenuItem, Link, Menu, Paper, Button, Collapse, Popper, MenuList, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';



interface PropsNavBar {
  categories: Category[];
  
}


export default function NavBar({categories}: PropsNavBar): JSX.Element {
  return (
<>
<ThemeProvider theme={themeNavBar}>
      <CssBaseline />
      <Paper>
        
        <MenuList>
          {categories.map((category: Category) =>
            hasChildren(category) ? (
              <ListItem key={category.title}>{CategoryMultyLevel(category)}</ListItem>
            ) : (
              <ListItem key={category.title}>{CategorySingleLevel(category)}</ListItem>
            )
          )}
        </MenuList>
      </Paper>
      </ThemeProvider>
      </>
  );}
  
function CategorySingleLevel(category: Category): JSX.Element {
  return (<Button>
    <NavLink to={category.path}>{category.title}</NavLink>
      </Button>);
}

function CategoryMultyLevel(category: Category): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
    <Button
    ref={anchorRef}
    aria-controls={open ? 'menu-list-grow' : undefined}
    aria-haspopup="true"
    onClick={handleToggle}
  >
     {category.title}
     {open ? (
          <ExpandLessIcon className="icon"></ExpandLessIcon>
        ) : (
          <ExpandMoreIcon className="icon"></ExpandMoreIcon>
        )}
  </Button>
  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
  {({ TransitionProps, placement }) => (
    <Grow
      {...TransitionProps}
      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
    >
      <ThemeProvider theme={themeSubCategoriesListNavBar}> 
       <Paper className='subCategories'>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
          {category.items?.map((item) => (
            <MenuItem key={item.title}>
              <Button> <NavLink to={item.path}>{item.title}</NavLink></Button>
             
            </MenuItem>))}
          </MenuList>
        </ClickAwayListener>
      </Paper></ThemeProvider>
    
    </Grow>
  )}
</Popper>
</>
  )



}
