import { ComponentType } from "react";
import Stikeri from "./Components/Stikeri/Stikeri";
import PvcNalepnice from "./Components/PvcNalepnice/PvcNalepnice";
import ZastitneNalepnice from "./Components/ZastitneNalepnice/ZastitneNalepnice";
import PapirneNalepnice from "./Components/PapirneNalepnice/PapirneNalepnice";
import DigitalnaStampa from "./Components/DigitalnaStampa/DigitalnaStampa";
import Magneti2d from "./Components/2dMagneti/2dMagneti";
import Magneti3d from "./Components/3dMagneti/3dMagneti";
import Rollup from "./Components/Rollup/Rollup";

type CategoryComponent = ComponentType<{ imageSrc: string }>;

export interface Category {
  id?: number;
  title: string;
  slug?: string;
  path: string;
  component: CategoryComponent | string;
  componentName?: string;
  imageSrc?: string;
  parentId?: number | null;
  sortOrder?: number;
  isVisible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  items?: Category[];
}

interface RawCategoryRow {
  id: number;
  title: string;
  slug?: string;
  parent_id?: number | null;
  parentId?: number | null;
  component?: string;
  image_src?: string;
  imageSrc?: string;
  sort_order?: number;
  sortOrder?: number;
  is_visible?: boolean | number;
  isVisible?: boolean | number;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: RawCategoryRow[];
}

const componentMap: Record<string, CategoryComponent> = {
  Stikeri,
  PvcNalepnice,
  ZastitneNalepnice,
  PapirneNalepnice,
  DigitalnaStampa,
  Magneti2d,
  Magneti3d,
  Rollup,
};

// const categories = [
//   {
//     title: "3d stikeri",
//     path: "/stikeri",
//     component: Stikeri,
//     imageSrc: "porsche_stiker.jpg",
//   },
//   {
//     title: "Nalepnice",
//     path: "/nalepnice",
//     component: "Nalepnice",
//     imageSrc: "zastitna.png",
//     items: [
//       {
//         title: "PVC nalepnice",
//         path: "/nalepnice/pvc_nalepnice",
//         component: PvcNalepnice,
//         imageSrc: "download.jpg",
//       },
//       {
//         title: "Zaštitne nalepnice",
//         path: "/zastitne_nalepnice",
//         component: ZastitneNalepnice,
//         imageSrc: "download.jpg",
//       },
//       {
//         title: "Papirne nalepnice",
//         path: "/papirne_nalepnice",
//         component: PapirneNalepnice,
//         imageSrc: "download.jpg",
//       },
//     ],
//   },
//   {
//     title: "Štampa i brendiranje",
//     path: "/stampa",
//     component: "StampaIBrendiranje",
//     imageSrc: "images.png",
//     items: [
//       {
//         title: "Digitalna štampa",
//         path: "/digitalna_stampa",
//         component: DigitalnaStampa,
//       },
//       {
//         title: "Digitalna stampa velikog formata",
//         path: "/digitalna_stampa_velikog_formata",
//         component: "DigitalnaStampaVelikogFormata",
//       },
//       { title: "UV štampa", path: "/uv_stampa", component: "UVStampa" },
//       {
//         title: "Lasersko graviranje",
//         path: "/lasersko_graviranje",
//         component: "LaserskoGraviranje",
//       },
//     ],
//   },
//   {
//     title: "Štampani proizvodi",
//     path: "/stampane_proizvode",
//     component: "StampaneProizvode",
//     imageSrc: "download.jpg",
//     items: [
//       { title: "Vizit karte", path: "/vizit_karte", component: "VizitKarte" },
//       {
//         title: "Flajeri",
//         path: "/flajeri",
//         component: "Flajeri",
//       },
//     ],
//   },
//   {
//     title: "Magneti",
//     path: "/magneti",
//     component: "Magneti",
//     imageSrc: "magneti.jpg",
//     items: [
//       {
//         title: "2d magneti",
//         path: "/2d_magneti",
//         component: Magneti2d,
//         imageSrc: "magneti.jpg",
//       },
//       {
//         title: "3d magneti",
//         path: "/3d_magneti",
//         component: Magneti3d,
//         imageSrc: "magneti.jpg",
//       },
//     ],
//   },
//   {
//     title: "Rollup",
//     path: "/rollup",
//     imageSrc: "rollup picture.jpg",
//     component: Rollup,
//   },
//   {
//     title: "Promo materijal",
//     path: "/promo_materijal",
//     component: "PromoMaterijal",
//     imageSrc: "images.png",
//     items: [
//       { title: "Privesci", path: "/privesci", component: "Privesci" },
//       { title: "Olovke", path: "/olovke", component: "Olovke" },
//     ],
//   },
//   {
//     title: "CD/DVD umnožavanje",
//     path: "/umnozavanje",
//     component: "CDDVDUmnožavanje",
//     imageSrc: "artstikers.jpg",
//     items: [],
//   },
//   {
//     title: "O nama",
//     path: "/",
//     component: "ONama",
//     imageSrc: "artstikers.jpg",
//     items: [],
//   },
// ];

function getParentId(category: RawCategoryRow): number | null {
  return category.parent_id ?? category.parentId ?? null;
}

function getSortOrder(category: RawCategoryRow): number {
  return category.sort_order ?? category.sortOrder ?? 0;
}

function getImageSrc(category: RawCategoryRow): string | undefined {
  return category.image_src ?? category.imageSrc;
}

function getIsVisible(category: RawCategoryRow): boolean {
  const isVisible = category.is_visible ?? category.isVisible;

  if (typeof isVisible === "number") {
    return isVisible === 1;
  }

  return isVisible ?? true;
}

function buildPath(
  parentPath: string,
  slug: string | undefined,
  id: number,
): string {
  if (!slug) {
    return parentPath ? `${parentPath}/${id}` : `/${id}`;
  }

  return parentPath ? `${parentPath}/${slug}` : `/${slug}`;
}

function buildCategoryTree(
  rows: RawCategoryRow[],
  parentId: number | null = null,
  parentPath = "",
): Category[] {
  return rows
    .filter((row) => getParentId(row) === parentId && getIsVisible(row))
    .sort((left, right) => getSortOrder(left) - getSortOrder(right))
    .map((row) => {
      const path = buildPath(parentPath, row.slug, row.id);
      const items = buildCategoryTree(rows, row.id, path);
      const componentName = row.component ?? "";

      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        path,
        component: componentMap[componentName] ?? componentName,
        componentName,
        imageSrc: getImageSrc(row),
        parentId: getParentId(row),
        sortOrder: getSortOrder(row),
        isVisible: getIsVisible(row),
        createdAt: row.created_at ?? row.createdAt,
        updatedAt: row.updated_at ?? row.updatedAt,
        items: items.length > 0 ? items : undefined,
      };
    });
}

export async function fetchCategories(): Promise<Category[]> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) throw new Error("REACT_APP_MAINLINK is not defined");

  const res = await fetch(`${mainLink}/categories`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = (await res.json()) as CategoriesResponse | RawCategoryRow[];
  const rows = Array.isArray(json) ? json : json.data;

  if (!Array.isArray(json) && !json.success) {
    throw new Error("Backend returned success=false");
  }

  const categories = buildCategoryTree(rows);

  return categories;
}
