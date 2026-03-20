"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Truck,
  Store,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CalendarClock,
  IdCard,
  Mail,
  Coffee,
} from "lucide-react";
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
    zone: "Biobío / Maule / Araucanía / Ñuble",
    time: "3-4 días hábiles",
    cost: "$5.990",
    note: null,
  },
  {
    zone: "Antofagasta / Atacama / Coquimbo / Los Ríos / Los Lagos",
    time: "4-6 días hábiles",
    cost: "$6.990",
    note: null,
  },
  {
    zone: "Arica / Tarapacá / Aysén / Magallanes",
    time: "5-8 días hábiles",
    cost: "$8.990",
    note: "Zonas extremas",
  },
];

const steps = [
  {
    icon: <Package size={24} />,
    title: "Preparación",
    description:
      "Tu pedido es preparado y empacado con cuidado el mismo día o al día hábil siguiente.",
  },
  {
    icon: <Truck size={24} />,
    title: "Despacho",
    description:
      "Enviamos con Chilexpress o Starken. Recibirás un código de seguimiento por email.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Entrega",
    description:
      "Tu café llega a domicilio dentro del plazo estimado según tu zona.",
  },
];

const pickupRules = [
  {
    icon: <Clock size={18} />,
    text: "Disponible en un máximo de 2 días hábiles, a partir del día siguiente de la compra.",
  },
  {
    icon: <Store size={18} />,
    text: "Los pedidos son empaquetados en bodega y enviados a la sucursal seleccionada: Loreley, Apoquindo o Providencia.",
  },
  {
    icon: <CalendarClock size={18} />,
    text: "Plazo máximo de retiro: 30 días. Después de este período, los productos serán devueltos a origen.",
  },
  {
    icon: <Mail size={18} />,
    text: "Recibirás un email de notificación cuando tu pedido esté listo. No visites la tienda sin haber recibido esta confirmación.",
  },
  {
    icon: <IdCard size={18} />,
    text: "Se requiere identificación y firma al momento del retiro.",
  },
  {
    icon: <AlertCircle size={18} />,
    text: "Las tiendas físicas no procesan pedidos web bajo ninguna circunstancia.",
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
            Políticas de Despacho y Retiro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Enviamos café fresco a todo Chile. Envío gratis en la RM para
            compras sobre{" "}
            {formatPrice(siteConfig.commerce.freeShippingThreshold)}.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Promo banner */}
        <div className="bg-accent p-5 md:p-6 mb-12 flex items-center gap-4">
          <div className="p-3 bg-accent-dark shrink-0 hidden sm:block">
            <Coffee size={24} className="text-white" />
          </div>
          <p className="text-sm md:text-base leading-relaxed text-white">
            Todos los pedidos con{" "}
            <span className="font-bold">RETIRO EN TIENDA</span> reciben un{" "}
            <span className="font-bold">15% de descuento</span> en consumo en
            nuestros locales al momento de retirar tu pedido.
          </p>
        </div>

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
                className="relative bg-surface border border-border-light p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="p-3 bg-neutral-100 w-fit mx-auto mb-4 text-dark">
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

        {/* Delivery details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Plazos de Entrega
          </h2>
          <div className="bg-surface border border-border-light p-6 md:p-8 space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              Los plazos de entrega varían según la ubicación geográfica y la
              disponibilidad del producto. Las compras realizadas en comunas
              urbanas de la RM (Las Condes, Vitacura, Lo Barnechea,
              Providencia, Ñuñoa, Santiago, Peñalolén, La Reina, La Florida y
              Colina) serán entregadas en un plazo de{" "}
              <span className="font-semibold text-dark">
                1-2 días hábiles
              </span>
              .
            </p>
            <p>
              Las áreas suburbanas de la RM serán entregadas en un plazo de{" "}
              <span className="font-semibold text-dark">
                3-5 días hábiles
              </span>{" "}
              (sujeto a los plazos de la empresa de envíos).
            </p>
            <p>
              Los pedidos realizados de{" "}
              <span className="font-semibold text-dark">
                viernes a domingo
              </span>{" "}
              serán despachados el día lunes.
            </p>
            <div className="flex items-start gap-3 bg-sky-50 border border-[#1B4F72]/30 rounded-lg p-4 mt-2">
              <AlertCircle
                size={18}
                className="text-[#1B4F72] shrink-0 mt-0.5"
              />
              <p className="text-dark text-sm">
                Productos de alta demanda o durante eventos especiales (Cyber,
                ofertas flash) pueden experimentar retrasos en el despacho.
              </p>
            </div>
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
          <div
            role="table"
            aria-label="Tarifas de envío por zona"
            className="bg-surface border border-border-light overflow-hidden"
          >
            <div role="rowgroup" className="hidden sm:block">
              <div
                role="row"
                className="grid grid-cols-4 gap-4 px-6 py-4 bg-base-warm border-b border-border-light text-sm font-medium text-dark"
              >
                <span role="columnheader">Zona</span>
                <span role="columnheader">Tiempo estimado</span>
                <span role="columnheader">Costo</span>
                <span role="columnheader">Nota</span>
              </div>
            </div>
            <div role="rowgroup">
              {shippingZones.map((zone, index) => (
                <div
                  key={zone.zone}
                  role="row"
                  className={`grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-6 py-5 ${
                    index !== shippingZones.length - 1
                      ? "border-b border-border-light"
                      : ""
                  }`}
                >
                  <div role="cell">
                    <span className="sm:hidden text-text-tertiary text-xs">
                      Zona:{" "}
                    </span>
                    <span className="font-medium text-dark">{zone.zone}</span>
                  </div>
                  <div role="cell" className="flex items-center gap-1.5">
                    <Clock
                      size={14}
                      className="text-text-tertiary sm:hidden"
                    />
                    <span className="text-text-secondary text-sm">
                      {zone.time}
                    </span>
                  </div>
                  <div role="cell">
                    <span className="font-semibold text-dark">
                      {zone.cost}
                    </span>
                  </div>
                  <div role="cell">
                    <span className="text-text-tertiary text-sm">
                      {zone.note || "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Store pickup detailed section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Retiro en Tienda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup info */}
            <div className="bg-base-warm border border-border p-6 md:p-8">
              <div className="p-3 bg-white w-fit mb-4 text-dark">
                <Store size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-dark mb-3">
                Sucursales disponibles
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Retira tu pedido gratis en cualquiera de nuestros locales.
                Los pedidos son empaquetados en bodega y enviados a la sucursal
                que selecciones.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Loreley
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Apoquindo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Providencia
                </li>
              </ul>
            </div>

            {/* Pickup rules */}
            <div className="bg-surface border border-border-light p-6 md:p-8">
              <h3 className="font-heading text-xl font-semibold text-dark mb-4">
                Condiciones de retiro
              </h3>
              <ul className="space-y-4">
                {pickupRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-dark shrink-0 mt-0.5">
                      {rule.icon}
                    </span>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {rule.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Subscriptions + Freshness guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="bg-base-warm border border-border-light p-6 md:p-8">
            <div className="p-3 bg-white w-fit mb-4 text-dark">
              <CalendarClock size={24} />
            </div>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">
              Suscripciones
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Las suscripciones mensuales se despachan dentro de{" "}
              <span className="font-semibold text-dark">
                1-3 días hábiles
              </span>{" "}
              a partir de la fecha de pago. Recibirás tu café fresco cada mes
              sin necesidad de volver a hacer el pedido.
            </p>
          </div>

          <div className="bg-sage-bg border border-sage/10 p-6 md:p-8">
            <div className="p-3 bg-sage/10 w-fit mb-4 text-sage">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">
              Garantía de Frescura
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Todos nuestros cafés se despachan dentro de los primeros 14 días
              desde su fecha de tueste. Si tu pedido llega en mal estado, lo
              reponemos sin costo.
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
          className="text-center bg-base-warm p-6 sm:p-8 md:p-12 border border-border-light"
        >
          <h2 className="font-heading text-2xl font-semibold text-dark mb-3">
            ¿Listo para pedir?
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Explora nuestra selección de cafés de especialidad y recibe tu
            pedido fresco en casa.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 btn-press"
          >
            Ver Productos
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
