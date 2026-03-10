export interface Region {
  name: string;
  value: string;
  shippingCost: number;
  deliveryTime: string;
  comunas: string[];
}

export const regions: Region[] = [
  {
    name: "Arica y Parinacota",
    value: "arica",
    shippingCost: 8990,
    deliveryTime: "5-7 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Tarapacá",
    value: "tarapaca",
    shippingCost: 8990,
    deliveryTime: "5-7 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Antofagasta",
    value: "antofagasta",
    shippingCost: 6990,
    deliveryTime: "4-6 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Atacama",
    value: "atacama",
    shippingCost: 6990,
    deliveryTime: "4-6 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Coquimbo",
    value: "coquimbo",
    shippingCost: 6990,
    deliveryTime: "3-5 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Valparaíso",
    value: "valparaiso",
    shippingCost: 4990,
    deliveryTime: "2-3 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Región Metropolitana",
    value: "rm",
    shippingCost: 3990,
    deliveryTime: "1-2 días hábiles",
    comunas: [
      "Cerrillos",
      "Cerro Navia",
      "Conchalí",
      "El Bosque",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "Ñuñoa",
      "Pedro Aguirre Cerda",
      "Peñalolén",
      "Providencia",
      "Pudahuel",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Bernardo",
      "San Joaquín",
      "San Miguel",
      "San Ramón",
      "Santiago",
      "Vitacura",
      "Puente Alto",
      "Pirque",
      "San José de Maipo",
      "Colina",
      "Lampa",
      "Til Til",
      "Buin",
      "Calera de Tango",
      "Paine",
      "Melipilla",
      "Alhué",
      "Curacaví",
      "María Pinto",
      "San Pedro",
      "Talagante",
      "El Monte",
      "Isla de Maipo",
      "Padre Hurtado",
      "Peñaflor",
    ],
  },
  {
    name: "O'Higgins",
    value: "ohiggins",
    shippingCost: 4990,
    deliveryTime: "2-3 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Maule",
    value: "maule",
    shippingCost: 5990,
    deliveryTime: "3-4 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Ñuble",
    value: "nuble",
    shippingCost: 5990,
    deliveryTime: "3-4 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Biobío",
    value: "biobio",
    shippingCost: 5990,
    deliveryTime: "3-4 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Araucanía",
    value: "araucania",
    shippingCost: 5990,
    deliveryTime: "3-5 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Los Ríos",
    value: "losrios",
    shippingCost: 6990,
    deliveryTime: "4-5 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Los Lagos",
    value: "loslagos",
    shippingCost: 6990,
    deliveryTime: "4-5 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Aysén",
    value: "aysen",
    shippingCost: 8990,
    deliveryTime: "6-8 días hábiles",
    comunas: ["Todas las comunas"],
  },
  {
    name: "Magallanes",
    value: "magallanes",
    shippingCost: 8990,
    deliveryTime: "6-8 días hábiles",
    comunas: ["Todas las comunas"],
  },
];

export function calculateShipping(
  regionValue: string,
  subtotal: number,
  threshold: number
): { cost: number; isFree: boolean; deliveryTime: string } {
  const region = regions.find((r) => r.value === regionValue);
  if (!region) {
    return { cost: 0, isFree: false, deliveryTime: "" };
  }

  const isFree = regionValue === "rm" && subtotal >= threshold;
  return {
    cost: isFree ? 0 : region.shippingCost,
    isFree,
    deliveryTime: region.deliveryTime,
  };
}
