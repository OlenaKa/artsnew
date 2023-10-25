import * as React from "react";

import { useState, useRef, useEffect } from "react";
import themeMobileNavBar from "./themeMobileNavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Category } from "./typesCategories";
import { hasChildren } from "../../helpers/hasChildren";
import { MenuItem, Link, Menu, Paper, Button, Collapse } from "@mui/material";
import { NavLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Popper from "@mui/material/Popper";
import useOnClickOutside from "../../hooks/useOnClickOutside";

// interface Categories  Array <Category> {}

interface ProrsMobileNavBar {
  categories: Category[];
  close: () => void;
}
export default function MobileNavBar({ categories, close }: ProrsMobileNavBar) {
  const ref = useRef<HTMLDivElement>(null);
const [className, setClassName] = useState('slide-in-right');
const onClose =()=>{
  setClassName('slide-out-right')
  setTimeout(()=>{
  
    
    close()
  }, 500)
}

  useOnClickOutside(ref, onClose);
  return (
    <ThemeProvider theme={themeMobileNavBar}>
      <CssBaseline />
      <Paper ref={ref} className={className}>
        <CloseIcon className="closeNavBar" onClick={onClose} />
        <ul>
          {categories.map((category) =>
            hasChildren(category) ? (
              <li key={category.title}>{CategoryMultyLevel(category)}</li>
            ) : (
              <li key={category.title}>{CategorySingleLevel(category)}</li>
            )
          )}
        </ul>
      </Paper>
    </ThemeProvider>
  );
}

function CategorySingleLevel(category: Category): JSX.Element {
  return <NavLink to={category.path}>{category.title}</NavLink>;
}

function CategoryMultyLevel(category: Category): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(open ? false : true);
  };

  return (
    <>
      <div onClick={handleClick}>
      
        {category.title}
        {open ? (
          <ExpandLessIcon className="icon"></ExpandLessIcon>
        ) : (
          <ExpandMoreIcon className="icon"></ExpandMoreIcon>
        )}
           <Collapse in={open}>
        <ul>
          {category.items?.map((item) => (
            <li key={item.title}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </Collapse>
      </div>

   
    </>
  );
}
