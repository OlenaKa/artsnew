
import Stikeri from "./Components/Stikeri/Stikeri"

const categories = [

  {
    title: '3d stikeri',
    path: '/stikeri',
    component: <Stikeri/>,
    imageSrc:'artstikers.jpg',
    items: [],
  },
  {
    title: 'Nalepnice',
    path: '/nalepnice',
    component: 'Nalepnice',
    imageSrc:'stikermainimage.jpg',
    items: [
      { title: 'PVC nalepnice', path: '/pvc_nalepnice', component: 'PVCnalepnice', },
      { title: 'Zaštitne nalepnice', path: '/zastitne_nalepnice', component: 'ZastitneNalepnice', },
      { title: 'Papirne nalepnice', path: '/papirne_nalepnice', component: 'PapirneNalepnice', },
    ],
  },
  {
    title: 'Štampa i brendiranje',
    path: '/stampa',
    component: 'StampaIBrendiranje', 
    imageSrc:'artstikers.jpg',
    items: [
      { title: 'Digitalna štampa', path: '/digitalna_stampa', component: 'DigitalnaStampa', },
      {
        title: 'Digitalna stampa velikog formata',
        path: '/digitalna_stampa_velikog_formata',
        component: 'DigitalnaStampaVelikogFormata',
      },
      { title: 'UV štampa', path: '/uv_stampa', component: 'UVStampa', },
      { title: 'Lasersko graviranje', path: '/lasersko_graviranje', component: 'LaserskoGraviranje', },
    ],
  },
  {
    title: 'Štampane proizvode',
    path: '/stampane_proizvode',
    component: 'StampaneProizvode',
    imageSrc:'stikermainimage.jpg',
    items: [
      { title: 'Vizit karte', path: '/vizit_karte', component: 'VizitKarte', },
      {
        title: 'Flajeri',
        path: '/flajeri',
        component: 'Flajeri',
      },
    ],
  },
  {
    title: 'Magneti',
    path: '/magneti',
    component: 'Magneti',
    imageSrc:'artstikers.jpg',
    items: [{ title: '2d magneti', path: '/2d_magneti',  component: '2dMagneti', },{ title: '3d magneti', path: '/3d_magneti', component: '3dMagneti', },],
  },
  {
    title: 'Rollup',
    path: '/rollup',
    imageSrc:'artstikers.jpg',
    component: 'Rollup',
    items: [{ title: 'Rollup 85', path: '/rollup_85', component: 'Rollup85', },{ title: 'Rollup 100', path: '/rollup_100',component: 'Rollup100', },{ title: 'Rollup 120', path: '/rollup_120', component: 'Rollup120', },],
  },
  {
    title: 'Promo materijal',
    path: '/promo_materijal',
    component: 'PromoMaterijal',
    imageSrc:'artstikers.jpg',
    items: [{ title: 'Privesci', path: '/privesci', component: 'Privesci', },{ title: 'Olovke', path: '/olovke', component: 'Olovke', },],
  },
  {
    title: 'CD/DVD umnožavanje',
    path: '/umnozavanje',
    component: 'CDDVDUmnožavanje',
    imageSrc:'artstikers.jpg',
    items: [],
  },
  {
    title: 'O nama',
    path: '/',
    component: 'ONama',
    imageSrc:'artstikers.jpg',
    items: [],
  },
]

export default categories