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
    image: "/images/categories/beans.jpg",
    href: "/products?category=granos",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Herramientas para el éxito cafetero",
    image: "/images/categories/accessories.jpg",
    href: "/products?category=accesorios",
  },
  {
    id: "packs",
    name: "Packs",
    description: "Dúos y tríos perfectos para regalar",
    image: "/images/categories/packs.jpg",
    href: "/products?category=packs",
  },
  {
    id: "infusiones",
    name: "Té e Infusiones",
    description: "Selección de tés especiales premium",
    image: "/images/categories/tea.jpg",
    href: "/products?category=infusiones",
  },
];
