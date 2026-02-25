import Stikeri from "./Components/Stikeri/Stikeri";
import PvcNalepnice from "./Components/PvcNalepnice/PvcNalepnice";
import ZastitneNalepnice from "./Components/ZastitneNalepnice/ZastitneNalepnice";
import PapirneNalepnice from "./Components/PapirneNalepnice/PapirneNalepnice";
import DigitalnaStampa from "./Components/DigitalnaStampa/DigitalnaStampa";
import Magneti2d from "./Components/2dMagneti/2dMagneti";
import Magneti3d from "./Components/3dMagneti/3dMagneti";
import Rollup from "./Components/Rollup/Rollup";
const categories = [
  {
    title: "3d stikeri",
    path: "/stikeri",
    component: Stikeri,
    imageSrc: "porsche_stiker.jpg",
  },
  {
    title: "Nalepnice",
    path: "/nalepnice",
    component: "Nalepnice",
    imageSrc: "zastitna.png",
    items: [
      {
        title: "PVC nalepnice",
        path: "/nalepnice/pvc_nalepnice",
        component: PvcNalepnice,
        imageSrc: "download.jpg",
      },
      {
        title: "Zaštitne nalepnice",
        path: "/zastitne_nalepnice",
        component: ZastitneNalepnice,
        imageSrc: "download.jpg",
      },
      {
        title: "Papirne nalepnice",
        path: "/papirne_nalepnice",
        component: PapirneNalepnice,
        imageSrc: "download.jpg",
      },
    ],
  },
  {
    title: "Štampa i brendiranje",
    path: "/stampa",
    component: "StampaIBrendiranje",
    imageSrc: "images.png",
    items: [
      {
        title: "Digitalna štampa",
        path: "/digitalna_stampa",
        component: DigitalnaStampa,
      },
      {
        title: "Digitalna stampa velikog formata",
        path: "/digitalna_stampa_velikog_formata",
        component: "DigitalnaStampaVelikogFormata",
      },
      { title: "UV štampa", path: "/uv_stampa", component: "UVStampa" },
      {
        title: "Lasersko graviranje",
        path: "/lasersko_graviranje",
        component: "LaserskoGraviranje",
      },
    ],
  },
  {
    title: "Štampani proizvodi",
    path: "/stampane_proizvode",
    component: "StampaneProizvode",
    imageSrc: "download.jpg",
    items: [
      { title: "Vizit karte", path: "/vizit_karte", component: "VizitKarte" },
      {
        title: "Flajeri",
        path: "/flajeri",
        component: "Flajeri",
      },
    ],
  },
  {
    title: "Magneti",
    path: "/magneti",
    component: "Magneti",
    imageSrc: "magneti.jpg",
    items: [
      {
        title: "2d magneti",
        path: "/2d_magneti",
        component: Magneti2d,
        imageSrc: "magneti.jpg",
      },
      {
        title: "3d magneti",
        path: "/3d_magneti",
        component: Magneti3d,
        imageSrc: "magneti.jpg",
      },
    ],
  },
  {
    title: "Rollup",
    path: "/rollup",
    imageSrc: "rollup picture.jpg",
    component: Rollup,
  },
  {
    title: "Promo materijal",
    path: "/promo_materijal",
    component: "PromoMaterijal",
    imageSrc: "images.png",
    items: [
      { title: "Privesci", path: "/privesci", component: "Privesci" },
      { title: "Olovke", path: "/olovke", component: "Olovke" },
    ],
  },
  {
    title: "CD/DVD umnožavanje",
    path: "/umnozavanje",
    component: "CDDVDUmnožavanje",
    imageSrc: "artstikers.jpg",
    items: [],
  },
  {
    title: "O nama",
    path: "/",
    component: "ONama",
    imageSrc: "artstikers.jpg",
    items: [],
  },
];

export default categories;
