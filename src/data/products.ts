export interface ProductVariant {
  size: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  origin: string;
  region: string;
  process: string;
  varietals: string;
  altitude: string;
  tastingNotes: string;
  description: string;
  variants: ProductVariant[];
  grindOptions: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

export const grindOptions = [
  "Grano Entero",
  "Prensa Francesa",
  "Moka Italiana",
  "Americana",
  "V60",
  "Chemex",
  "Kalita",
  "Aeropress",
  "Espresso",
  "Turco",
];

export const products: Product[] = [
  {
    id: "peru-el-bambu",
    name: "Perú El Bambú",
    slug: "peru-el-bambu",
    origin: "Perú",
    region: "Cajamarca, Chirinos",
    process: "Lavado",
    varietals: "Catuai, Caturra, Catimor",
    altitude: "1,700 - 2,000 msnm",
    tastingNotes: "Miel con frutas maduras, Naranja y Mandarina",
    description:
      "Un café excepcional de la región de Cajamarca, Perú. Cultivado a gran altitud, este café ofrece una complejidad sorprendente con notas dulces de miel que se entrelazan con frutas cítricas maduras.",
    variants: [
      { size: "250g", price: 10266, originalPrice: 12500 },
      { size: "500g", price: 19500, originalPrice: 24000 },
      { size: "1kg", price: 37000, originalPrice: 46000 },
    ],
    grindOptions,
    rating: 4.8,
    reviewCount: 24,
    badge: "Especialidad del Mes",
    image: "/images/products/peru-bambu.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "colombia-ciudad-bolivar",
    name: "Colombia Ciudad Bolívar",
    slug: "colombia-ciudad-bolivar",
    origin: "Colombia",
    region: "Antioquia, Ciudad Bolívar",
    process: "Natural",
    varietals: "Castillo, Colombia",
    altitude: "1,800 - 2,100 msnm",
    tastingNotes: "Frutos rojos, Chocolate, Caramelo",
    description:
      "Desde las montañas de Antioquia, este café de proceso natural desarrolla una dulzura intensa con capas de frutos rojos y un final achocolatado que perdura en el paladar.",
    variants: [
      { size: "250g", price: 17800 },
      { size: "500g", price: 34000 },
      { size: "1kg", price: 65000 },
    ],
    grindOptions,
    rating: 4.9,
    reviewCount: 18,
    badge: "Nuevo",
    image: "/images/products/colombia-bolivar.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "capsulas-pasadena-blend",
    name: "Cápsulas Pasadena Blend",
    slug: "capsulas-pasadena-blend",
    origin: "Blend",
    region: "Sudamérica",
    process: "Mixto",
    varietals: "Blend Especial",
    altitude: "Varios",
    tastingNotes: "Nuez, Chocolate con leche, Cuerpo medio",
    description:
      "Nuestro blend insignia ahora en formato cápsula compatible con Nespresso. La misma experiencia premium en la comodidad de tu hogar.",
    variants: [{ size: "10 cápsulas", price: 6990 }],
    grindOptions: [],
    rating: 4.5,
    reviewCount: 32,
    image: "/images/products/capsulas-pasadena.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "bolivia-caranavi",
    name: "Bolivia Caranavi",
    slug: "bolivia-caranavi",
    origin: "Bolivia",
    region: "Caranavi, La Paz",
    process: "Lavado",
    varietals: "Typica, Caturra",
    altitude: "1,600 - 1,900 msnm",
    tastingNotes: "Durazno, Flores, Acidez brillante",
    description:
      "Un café boliviano que sorprende con su perfil floral y afrutado. La acidez brillante y las notas de durazno lo convierten en una experiencia memorable.",
    variants: [
      { size: "250g", price: 11239 },
      { size: "500g", price: 21000 },
      { size: "1kg", price: 40000 },
    ],
    grindOptions,
    rating: 4.7,
    reviewCount: 12,
    badge: "Nuevo",
    image: "/images/products/bolivia-caranavi.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "costa-rica-colibri",
    name: "Costa Rica Colibrí",
    slug: "costa-rica-colibri",
    origin: "Costa Rica",
    region: "Tarrazú",
    process: "Honey",
    varietals: "SL-28, Catuai",
    altitude: "1,500 - 1,800 msnm",
    tastingNotes: "Miel, Cítricos, Almendra",
    description:
      "Proveniente de la legendaria región de Tarrazú, este café de proceso honey combina dulzura natural con una acidez cítrica vibrante y un final de almendra tostada.",
    variants: [
      { size: "250g", price: 13100 },
      { size: "500g", price: 25000 },
      { size: "1kg", price: 48000 },
    ],
    grindOptions,
    rating: 4.6,
    reviewCount: 15,
    image: "/images/products/costa-rica-colibri.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "pack-blend-500",
    name: "Pack Blend 500g",
    slug: "pack-blend-500",
    origin: "Blend",
    region: "Sudamérica",
    process: "Mixto",
    varietals: "Blend Especial",
    altitude: "Varios",
    tastingNotes: "Equilibrado, Chocolate, Nuez",
    description:
      "Nuestro pack de 500g con dos variedades de blend cuidadosamente seleccionadas. Ideal para quienes buscan consistencia y sabor día a día.",
    variants: [{ size: "500g", price: 39015, originalPrice: 45900 }],
    grindOptions,
    rating: 4.4,
    reviewCount: 28,
    badge: "-15%",
    image: "/images/products/pack-blend.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "mega-blend-pasadena",
    name: "Mega Blend Pasadena",
    slug: "mega-blend-pasadena",
    origin: "Blend",
    region: "Sudamérica",
    process: "Mixto",
    varietals: "Blend Premium",
    altitude: "Varios",
    tastingNotes: "Intenso, Cacao, Caramelo oscuro",
    description:
      "Un kilo completo de nuestro blend más vendido. Pasadena ofrece un perfil intenso y balanceado, perfecto para espresso y métodos de filtrado.",
    variants: [{ size: "1kg", price: 64980, originalPrice: 72200 }],
    grindOptions,
    rating: 4.8,
    reviewCount: 45,
    badge: "-10%",
    image: "/images/products/mega-pasadena.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "mega-blend-italian",
    name: "Mega Blend Italian",
    slug: "mega-blend-italian",
    origin: "Blend",
    region: "Sudamérica",
    process: "Mixto",
    varietals: "Blend Italian Roast",
    altitude: "Varios",
    tastingNotes: "Tostado oscuro, Bitter chocolate, Cuerpo pesado",
    description:
      "Para los amantes del café intenso. Nuestro tueste italiano ofrece un cuerpo pesado con notas de chocolate amargo y un final persistente.",
    variants: [{ size: "1kg", price: 62100, originalPrice: 69000 }],
    grindOptions,
    rating: 5.0,
    reviewCount: 38,
    badge: "-10%",
    image: "/images/products/mega-italian.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "brasil-finca-furnas",
    name: "Brasil Finca Furnas",
    slug: "brasil-finca-furnas",
    origin: "Brasil",
    region: "Minas Gerais, Furnas",
    process: "Natural",
    varietals: "Bourbon Amarillo",
    altitude: "1,100 - 1,300 msnm",
    tastingNotes: "Nuez de Brasil, Chocolate con leche, Dulce",
    description:
      "Un café brasileño clásico de la región de Minas Gerais. Cuerpo cremoso con dulzura natural, notas de nuez y un final suave de chocolate con leche.",
    variants: [
      { size: "250g", price: 13300 },
      { size: "500g", price: 25500 },
      { size: "1kg", price: 49000 },
    ],
    grindOptions,
    rating: 5.0,
    reviewCount: 22,
    image: "/images/products/brasil-furnas.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "pasadena-blend",
    name: "Pasadena Blend",
    slug: "pasadena-blend",
    origin: "Blend",
    region: "Sudamérica",
    process: "Mixto",
    varietals: "Blend Signature",
    altitude: "Varios",
    tastingNotes: "Equilibrado, Nuez, Caramelo",
    description:
      "Nuestro blend insignia. Una mezcla equilibrada que funciona perfectamente en cualquier método de preparación. Suave, dulce y consistente.",
    variants: [
      { size: "250g", price: 12700 },
      { size: "500g", price: 24000 },
      { size: "1kg", price: 46000 },
    ],
    grindOptions,
    rating: 4.7,
    reviewCount: 56,
    image: "/images/products/pasadena-blend.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "colombia-yipao",
    name: "Colombia Yipao",
    slug: "colombia-yipao",
    origin: "Colombia",
    region: "Quindío",
    process: "Lavado",
    varietals: "Castillo, Caturra",
    altitude: "1,700 - 2,000 msnm",
    tastingNotes: "Panela, Frutas tropicales, Cítricos",
    description:
      "Inspirado en la tradición cafetera del Eje Cafetero colombiano. Un café vibrante con dulzura de panela y un viaje tropical en cada taza.",
    variants: [
      { size: "250g", price: 14500 },
      { size: "500g", price: 27500 },
      { size: "1kg", price: 53000 },
    ],
    grindOptions,
    rating: 4.6,
    reviewCount: 19,
    badge: "De Vuelta",
    image: "/images/products/colombia-yipao.jpg",
    inStock: true,
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CL")}`;
}

export function getDiscountPercentage(
  price: number,
  originalPrice: number
): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
