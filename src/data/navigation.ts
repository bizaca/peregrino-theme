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
  { label: "Contacto", href: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    title: "Perú El Bambú",
    subtitle: "Especialidad del Mes",
    description: "Notas de miel con frutas maduras, naranja y mandarina. Un café excepcional de Cajamarca.",
    cta: "Comprar Ahora",
    href: "/products/peru-el-bambu",
    image: "/images/hero/hero-1.jpg",
  },
  {
    id: 2,
    title: "Colombia Bolívar",
    subtitle: "Proceso Natural",
    description: "Frutos rojos, chocolate y caramelo. Desde las montañas de Antioquia.",
    cta: "Descubrir",
    href: "/products/colombia-ciudad-bolivar",
    image: "/images/hero/hero-2.jpg",
  },
  {
    id: 3,
    title: "Bolivia Caranavi",
    subtitle: "Recién Llegado",
    description: "Durazno, flores y acidez brillante. Una experiencia boliviana memorable.",
    cta: "Explorar",
    href: "/products/bolivia-caranavi",
    image: "/images/hero/hero-3.jpg",
  },
  {
    id: 4,
    title: "Colombia Yipao",
    subtitle: "De Vuelta",
    description: "Panela, frutas tropicales y cítricos. La tradición del Eje Cafetero.",
    cta: "Ver Más",
    href: "/products/colombia-yipao",
    image: "/images/hero/hero-4.jpg",
  },
];

export const trustBadges = [
  { icon: "coffee", text: "Café fresco tostado semanalmente" },
  { icon: "calendar", text: "Operando desde 2016" },
  { icon: "shield", text: "Métodos de pago seguros" },
  { icon: "truck", text: "Envíos a todo Chile" },
  { icon: "gift", text: "Envío gratis sobre $35.000 para RM" },
];
