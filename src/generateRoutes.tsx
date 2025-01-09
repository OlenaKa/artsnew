import { Route } from "react-router-dom";

interface Category {
  title: string;
  path: string;
  imageSrc?: string;
  component: React.ComponentType<{ imageSrc: string }> | string;
  items?: {
    title: string;
    path: string;
    imageSrc?: string;
    component: React.ComponentType<{ imageSrc: string }> | string;
    items?: [];
  }[];
}

export default function generateRoutes(categories: Category[]): JSX.Element[] {
  return categories
    .map(({ title, path, component, imageSrc, items }) => {
      if (typeof component === "string" && !items) {
        // Skip this item if component is a string
        return null;
      } else if (typeof component === "string" && items) {
        return generateRoutes(items);
      } else {
        const Component = component as React.ComponentType<{
          imageSrc: string;
        }>;

        return (
          <Route
            path={path}
            element={<Component imageSrc={imageSrc ?? ""} />}
            key={title}
          >
            {items && items.length > 0 && generateRoutes(items)}
          </Route>
        );
      }
    })

    .filter(Boolean) as JSX.Element[]; // Filter out null values and cast to JSX.Element[]
}
