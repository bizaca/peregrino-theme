import { generatedImages } from "./generated-images";

export interface NavItem {
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Ofertas", href: "/products?filter=offers" },
  { label: "Granos", href: "/products?category=granos" },
  { label: "Packs", href: "/products?category=packs" },
  { label: "Accesorios", href: "/products?category=accesorios" },
  { label: "Infusiones", href: "/products?category=infusiones" },
  { label: "Suscripciones", href: "/subscriptions" },
  { label: "Mayoristas", href: "/wholesale" },
  { label: "Locales", href: "/locations" },
  { label: "Retiro y despachos", href: "/shipping" },
  { label: "Contacto", href: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    title: "Colombia Bolívar",
    subtitle: "Proceso Natural",
    description: "Frutos rojos, chocolate y caramelo. Desde las montañas de Antioquia.",
    cta: "Descubrir",
    href: "/products/colombia-ciudad-bolivar",
    image: "/images/hero/colombia-bolivar-hero.png",
    objectPosition: "center 40%",
  },
  {
    id: 2,
    title: "Perú El Bambú",
    subtitle: "Especialidad del Mes",
    description: "Notas de miel con frutas maduras, naranja y mandarina. Un café excepcional de Cajamarca.",
    cta: "Comprar Ahora",
    href: "/products/peru-el-bambu",
    image: generatedImages.hero[0],
    objectPosition: "center",
  },
  {
    id: 3,
    title: "Costa Rica Colibrí",
    subtitle: "Honey Process",
    description: "Miel, cítricos y almendra desde la legendaria región de Tarrazú.",
    cta: "Explorar",
    href: "/products/costa-rica-colibri",
    image: generatedImages.hero[2],
    objectPosition: "center",
  },
  {
    id: 4,
    title: "Colombia Yipao",
    subtitle: "De Vuelta",
    description: "Panela, frutas tropicales y cítricos. La tradición del Eje Cafetero.",
    cta: "Ver Más",
    href: "/products/colombia-yipao",
    image: generatedImages.hero[3],
    objectPosition: "center",
  },
];

export const trustBadges = [
  { icon: "coffee", text: "Café fresco tostado semanalmente" },
  { icon: "calendar", text: "Operando desde 2016" },
  { icon: "shield", text: "Métodos de pago seguros" },
  { icon: "truck", text: "Envíos a todo Chile" },
  { icon: "gift", text: "Envío gratis sobre $35.000 para RM" },
];
