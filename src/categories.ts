const categories = [
  {
    title: 'Naslovna',
    path: '/',
    imageSrc:'stikermainimage.jpg',
    items: [],
  },
  {
    title: '3d stikeri',
    path: '/stiker',
    imageSrc:'stickersprinting.jpg',
    items: [],
  },
  {
    title: 'Nalepnice',
    path: '/nalepnice',
    imageSrc:'stikermainimage.jpg',
    items: [
      { title: 'PVC nalepnice', path: '/PVC_nalepnice' },
      { title: 'Zaštitne nalepnice', path: '/Zastitne_nalepnice' },
      { title: 'Papirne nalepnice', path: '/Papirne_nalepnice' },
    ],
  },
  {
    title: 'Štampa i brendiranje',
    path: '/stampa',
    imageSrc:'stickersprinting.jpg',
    items: [
      { title: 'Digitalna štampa', path: '/digitalna_stampa' },
      {
        title: 'Digitalna stampa velikog formata',
        path: '/digitalna_stampa_velikog_formata',
      },
    ],
  },
  {
    title: 'Štampane proizvode',
    path: '/stampane_proizvode',
    imageSrc:'stikermainimage.jpg',
    items: [
      { title: 'Digitalna štampa', path: '/digitalna_stampa' },
      {
        title: 'Digitalna štampa velikog formata',
        path: '/digitalna_štampa_velikog_formata',
      },
    ],
  },
]

export default categories