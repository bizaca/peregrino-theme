import { generatedImages } from "./generated-images";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: "granos",
    name: "Granos",
    description: "La mejor selección de granos tostados frescos",
    image: generatedImages.categories.beans,
    href: "/products?category=granos",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Herramientas para el éxito cafetero",
    image: generatedImages.categories.accessories,
    href: "/products?category=accesorios",
  },
  {
    id: "packs",
    name: "Packs",
    description: "Dúos y tríos perfectos para regalar",
    image: generatedImages.categories.packs,
    href: "/products?category=packs",
  },
  {
    id: "infusiones",
    name: "Té e Infusiones",
    description: "Selección de tés especiales premium",
    image: generatedImages.categories.tea,
    href: "/products?category=infusiones",
  },
];
