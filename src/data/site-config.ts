export const siteConfig = {
  name: "Peregrino Coffee Roasters",
  shortName: "Peregrino",
  tagline: "Coffee Roasters",
  description:
    "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Costa Rica y Brasil. Envíos a todo Chile.",
  url: "https://peregrinocoffee.cl",
  locale: "es_CL",
  foundedYear: 2016,

  contact: {
    email: "hola@peregrinocoffee.cl",
    phone: "+56 9 4347 2182",
    whatsapp: "56943472182",
    location: "Santiago, Chile",
  },

  social: {
    instagram: "https://instagram.com/peregrinocoffee",
    facebook: "https://facebook.com/peregrinocoffee",
    youtube: "https://youtube.com/@peregrinocoffee",
  },

  commerce: {
    currency: "CLP",
    freeShippingThreshold: 35000,
    freeShippingLabel: "Envío gratis para comunas de RM",
  },
} as const;

export type SiteConfig = typeof siteConfig;
