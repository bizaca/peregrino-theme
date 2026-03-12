export interface Location {
  name: string;
  slug: string;
  address: string;
  commune: string;
  region: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  /** Opening hours formatted for display (weekdays + weekends combined) */
  displayHours: {
    weekdays: string;
    weekends: string;
  };
  features: string[];
  googleMapsUrl: string;
  image: string;
}

export const locations: Location[] = [
  {
    name: "Peregrino Providencia",
    slug: "providencia",
    address: "Ricardo Lyon 126, local 7",
    commune: "Providencia",
    region: "Región Metropolitana",
    phone: "+56 9 4347 2182",
    coordinates: { lat: -33.4265, lng: -70.6145 },
    hours: {
      weekdays: "08:30",
      saturday: "10:00",
      sunday: "09:30",
    },
    displayHours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb: 10:00 - 19:00 · Dom: 9:30 - 15:30",
    },
    features: ["Espresso Bar", "Brew Bar", "Retiro en tienda", "Venta de granos"],
    googleMapsUrl: "https://maps.google.com/?q=Ricardo+Lyon+126+Providencia+Santiago+Chile",
    image: "/images/locations/providencia.jpg",
  },
  {
    name: "Peregrino Bilbao",
    slug: "bilbao",
    address: "Av. Francisco Bilbao 2841",
    commune: "Providencia",
    region: "Región Metropolitana",
    phone: "+56 9 4347 2182",
    coordinates: { lat: -33.4355, lng: -70.6096 },
    hours: {
      weekdays: "08:30",
      saturday: "10:00",
      sunday: "10:00",
    },
    displayHours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb - Dom: 10:00 - 19:00",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    googleMapsUrl: "https://maps.google.com/?q=Av+Francisco+Bilbao+2841+Providencia+Santiago+Chile",
    image: "/images/locations/bilbao.jpg",
  },
  {
    name: "Peregrino Apoquindo",
    slug: "apoquindo",
    address: "Av. Apoquindo 7014",
    commune: "Las Condes",
    region: "Región Metropolitana",
    phone: "+56 9 4347 2182",
    coordinates: { lat: -33.4080, lng: -70.5520 },
    hours: {
      weekdays: "08:30",
      saturday: "10:00",
      sunday: "10:00",
    },
    displayHours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb - Dom: 10:00 - 19:00",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    googleMapsUrl: "https://maps.google.com/?q=Av+Apoquindo+7014+Las+Condes+Santiago+Chile",
    image: "/images/locations/apoquindo.jpg",
  },
  {
    name: "Peregrino Loreley",
    slug: "loreley",
    address: "Loreley 114",
    commune: "La Reina",
    region: "Región Metropolitana",
    phone: "+56 9 4347 2182",
    coordinates: { lat: -33.4460, lng: -70.5570 },
    hours: {
      weekdays: "09:30",
      saturday: "10:00",
      sunday: "09:30",
    },
    displayHours: {
      weekdays: "Lun - Vie: 9:30 - 19:30",
      weekends: "Sáb: 10:00 - 19:00 · Dom: 9:30 - 15:30",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    googleMapsUrl: "https://maps.google.com/?q=Loreley+114+La+Reina+Santiago+Chile",
    image: "/images/locations/loreley.jpg",
  },
];
