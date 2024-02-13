import { ReactNode } from "react";

export interface Category {
  title: string;
  path: string;
  component: ReactNode;
  imageSrc: string;
    items?: {
    title: string;
    path: string;
    component: string;
  }[]
    
  ;
}



