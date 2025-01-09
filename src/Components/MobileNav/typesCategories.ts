import { Component, ReactNode } from "react";

export interface Category {
  title: string;
  path: string;
  component: React.ComponentType<{ imageSrc: string }> | String;
  imageSrc: string;
  items?: {
    title: string;
    path: string;
    component: React.ComponentType<{ imageSrc: string }> | String;
    imageSrc?: string;
  }[];
}
