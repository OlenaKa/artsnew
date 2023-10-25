// type NavCategory = {
//   title: string,
//   path: string,
//   items?: Array<string>
// }

interface Category {
  title: string;
  path: string;
  items?:
    {
      title: string;
      path: string;
    } [];
}
export function hasChildren(category: Category) {
  const { items: children } = category

  if (children === undefined) {
    return false
  }

  if (children.constructor !== Array) {
    return false
  }

  if (children.length < 1) {
    return false
  }

  return true
}
