"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Clock, Phone, Navigation, Coffee } from "lucide-react";
import { siteConfig } from "@/data/site-config";
const locationImages = {
  providencia: "/images/locations/providencia.jpg",
  bilbao: "/images/locations/bilbao.jpg",
  apoquindo: "/images/locations/apoquindo.jpg",
  loreley: "/images/locations/loreley.jpg",
};

const locations = [
  {
    name: "Peregrino Providencia",
    address: "Ricardo Lyon 126, local 7, Providencia",
    phone: "+56 9 4347 2182",
    hours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb: 10:00 - 19:00 · Dom: 9:30 - 15:30",
    },
    features: ["Espresso Bar", "Brew Bar", "Retiro en tienda", "Venta de granos"],
    image: locationImages.providencia,
    mapUrl: "https://maps.google.com/?q=Ricardo+Lyon+126+Providencia+Santiago+Chile",
  },
  {
    name: "Peregrino Bilbao",
    address: "Av. Francisco Bilbao 2841, Providencia",
    phone: "+56 9 4347 2182",
    hours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb - Dom: 10:00 - 19:00",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    image: locationImages.bilbao,
    mapUrl: "https://maps.google.com/?q=Av+Francisco+Bilbao+2841+Providencia+Santiago+Chile",
  },
  {
    name: "Peregrino Apoquindo",
    address: "Av. Apoquindo 7014, Las Condes",
    phone: "+56 9 4347 2182",
    hours: {
      weekdays: "Lun - Vie: 8:30 - 19:30",
      weekends: "Sáb - Dom: 10:00 - 19:00",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    image: locationImages.apoquindo,
    mapUrl: "https://maps.google.com/?q=Av+Apoquindo+7014+Las+Condes+Santiago+Chile",
  },
  {
    name: "Peregrino Loreley",
    address: "Loreley 114, La Reina",
    phone: "+56 9 4347 2182",
    hours: {
      weekdays: "Lun - Vie: 9:30 - 19:30",
      weekends: "Sáb: 10:00 - 19:00 · Dom: 9:30 - 15:30",
    },
    features: ["Espresso Bar", "Retiro en tienda", "Venta de granos"],
    image: locationImages.loreley,
    mapUrl: "https://maps.google.com/?q=Loreley+114+La+Reina+Santiago+Chile",
  },
];

export default function LocationsContent() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Nuestros Locales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Visítanos y vive la experiencia del café de especialidad. Todos los retiros en tienda con 15% de descuento.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Location cards */}
        <div className="space-y-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-surface border border-border-light overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 md:h-auto md:col-span-2">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGMEVCIi8+PC9zdmc+"
                />
              </div>

              {/* Info */}
              <div className="md:col-span-3 p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-dark mb-4">
                  {location.name}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-dark font-medium">{location.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                    <div className="text-sm text-text-secondary">
                      <p>{location.hours.weekdays}</p>
                      <p>{location.hours.weekends}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-text-secondary text-sm">{location.phone}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {location.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 bg-accent-bg text-accent text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      <Coffee size={12} />
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium text-sm transition-colors"
                >
                  <Navigation size={14} />
                  Ver en Google Maps
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pickup promo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-accent-bg border border-accent/10 p-8 md:p-10 text-center"
        >
          <h2 className="font-heading text-2xl font-semibold text-dark mb-3">
            15% de descuento en retiro en tienda
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-6">
            Todos los pedidos que retires en nuestros locales reciben automáticamente un 15% de descuento en consumo de café.
            Haz tu pedido online y selecciona retiro en tienda.
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, me gustaría hacer un pedido para retiro en tienda")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 btn-press"
          >
            Hacer Pedido para Retiro
          </a>
        </motion.div>
      </div>
    </div>
  );
}
