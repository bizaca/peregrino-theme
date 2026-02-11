"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Truck, Store, Clock, MapPin, Package, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { formatPrice } from "@/data/products";

const shippingZones = [
  {
    zone: "Región Metropolitana",
    time: "1-2 días hábiles",
    cost: `Gratis sobre ${formatPrice(siteConfig.commerce.freeShippingThreshold)}`,
    note: "Para pedidos menores, $3.990",
  },
  {
    zone: "Valparaíso / O'Higgins",
    time: "2-3 días hábiles",
    cost: "$4.990",
    note: null,
  },
  {
    zone: "Biobío / Maule / Araucanía",
    time: "3-4 días hábiles",
    cost: "$5.990",
    note: null,
  },
  {
    zone: "Resto de Chile",
    time: "4-6 días hábiles",
    cost: "$6.990 - $8.990",
    note: "Consultar zonas extremas",
  },
];

const steps = [
  {
    icon: <Package size={24} />,
    title: "Preparación",
    description: "Tu pedido es preparado y empacado con cuidado el mismo día o al día hábil siguiente.",
  },
  {
    icon: <Truck size={24} />,
    title: "Despacho",
    description: "Enviamos con Chilexpress o Starken. Recibirás un código de seguimiento por email.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Entrega",
    description: "Tu café llega a domicilio dentro del plazo estimado según tu zona.",
  },
];

export default function ShippingContent() {
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
            Envíos y Retiro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Enviamos café fresco a todo Chile. Envío gratis en la RM para compras sobre {formatPrice(siteConfig.commerce.freeShippingThreshold)}.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-surface border border-border-light rounded-2xl p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="p-3 bg-accent-bg rounded-xl w-fit mx-auto mb-4 text-accent">
                  {step.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping zones table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Zonas y Tarifas
          </h2>
          <div className="bg-surface border border-border-light rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-4 bg-base-warm border-b border-border-light text-sm font-medium text-dark">
              <span>Zona</span>
              <span>Tiempo estimado</span>
              <span>Costo</span>
              <span>Nota</span>
            </div>
            {shippingZones.map((zone, index) => (
              <div
                key={zone.zone}
                className={`grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 px-6 py-5 ${
                  index !== shippingZones.length - 1 ? "border-b border-border-light" : ""
                }`}
              >
                <div>
                  <span className="sm:hidden text-text-tertiary text-xs">Zona: </span>
                  <span className="font-medium text-dark">{zone.zone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-text-tertiary sm:hidden" />
                  <span className="text-text-secondary text-sm">{zone.time}</span>
                </div>
                <div>
                  <span className="font-semibold text-accent-dark">{zone.cost}</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-sm">{zone.note || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pickup section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="bg-accent-bg border border-accent/10 rounded-2xl p-6 md:p-8">
            <div className="p-3 bg-accent/10 rounded-xl w-fit mb-4 text-accent">
              <Store size={24} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-dark mb-3">
              Retiro en Tienda
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Retira tu pedido gratis en cualquiera de nuestros locales en Santiago.
              Todos los retiros reciben un <span className="font-semibold text-accent">15% de descuento</span> en consumo de café.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Disponible en 24-48 horas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Horario: Lun-Sáb 9:00 - 19:00
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Recibirás notificación cuando esté listo
              </li>
            </ul>
          </div>

          <div className="bg-sage-bg border border-sage/10 rounded-2xl p-6 md:p-8">
            <div className="p-3 bg-sage/10 rounded-xl w-fit mb-4 text-sage">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-heading text-xl font-semibold text-dark mb-3">
              Garantía de Frescura
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Todos nuestros cafés se despachan dentro de los primeros 14 días desde su fecha de tueste.
              Si tu pedido llega en mal estado, lo reponemos sin costo.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                Empacados con válvula unidireccional
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                Fecha de tueste en cada bolsa
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                Reposición garantizada si llega dañado
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-base-warm rounded-2xl p-8 md:p-12 border border-border-light"
        >
          <h3 className="font-heading text-2xl font-semibold text-dark mb-3">
            ¿Listo para pedir?
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Explora nuestra selección de cafés de especialidad y recibe tu pedido fresco en casa.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300"
          >
            Ver Productos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
