"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, Repeat, Gift, Star, Check, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { formatPrice } from "@/data/products";

const plans = [
  {
    name: "Explorador",
    description: "Perfecto para empezar tu viaje cafetero",
    frequency: "1 bolsa / mes",
    price: 9990,
    features: [
      "250g de café de especialidad",
      "Café rotativo del mes",
      "Molienda a elección",
      "10% de descuento permanente",
      "Envío gratis (RM)",
    ],
    popular: false,
  },
  {
    name: "Peregrino",
    description: "Nuestro plan más popular para amantes del café",
    frequency: "2 bolsas / mes",
    price: 17990,
    features: [
      "2 x 250g de café de especialidad",
      "Elige tu café o déjanos sorprenderte",
      "Molienda a elección",
      "10% de descuento permanente",
      "Envío gratis a todo Chile",
      "Acceso anticipado a ediciones limitadas",
    ],
    popular: true,
  },
  {
    name: "Maestro",
    description: "Para los que no pueden vivir sin café fresco",
    frequency: "4 bolsas / mes",
    price: 32990,
    features: [
      "4 x 250g de café de especialidad",
      "Selección premium personalizada",
      "Molienda a elección",
      "15% de descuento permanente",
      "Envío gratis a todo Chile",
      "Invitaciones a catas exclusivas",
      "Regalos sorpresa trimestrales",
    ],
    popular: false,
  },
];

const benefits = [
  {
    icon: <Coffee size={24} />,
    title: "Café Siempre Fresco",
    description: "Tostamos y despachamos semanalmente. Tu café siempre llega en su punto óptimo de frescura.",
  },
  {
    icon: <Repeat size={24} />,
    title: "Flexible y Sin Compromiso",
    description: "Cambia, pausa o cancela tu suscripción en cualquier momento. Sin permanencia mínima.",
  },
  {
    icon: <Gift size={24} />,
    title: "Descuentos Exclusivos",
    description: "Los suscriptores reciben descuentos permanentes en todos sus envíos y acceso anticipado a nuevos lanzamientos.",
  },
  {
    icon: <Star size={24} />,
    title: "Experiencias Únicas",
    description: "Accede a catas virtuales, guías de preparación y una comunidad apasionada por el café.",
  },
];

export default function SubscriptionsContent() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6"
          >
            <Repeat size={14} className="text-accent-light" />
            <span className="text-white/60 text-sm">Café fresco cada mes</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Suscripciones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Recibe café de especialidad tostado semanalmente, directo a tu puerta. Sin compromiso, siempre fresco.
          </motion.p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative bg-surface rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-accent shadow-xl shadow-accent/10 md:scale-105 hover:shadow-2xl hover:shadow-accent/15 card-shine"
                  : "border-border-light hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                  Más Popular
                </div>
              )}
              <h3 className="font-heading text-xl font-bold text-dark mb-1">
                {plan.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {plan.description}
              </p>
              <div className="mb-1">
                <span className="font-heading text-3xl font-bold text-accent-dark">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-text-tertiary text-sm">/mes</span>
              </div>
              <p className="text-text-tertiary text-xs mb-6">{plan.frequency}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Hola, me gustaría suscribirme al plan ${plan.name} (${plan.frequency}, ${formatPrice(plan.price)}/mes)`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center font-medium py-3.5 rounded-full transition-all duration-300 btn-press ${
                  plan.popular
                    ? "bg-accent hover:bg-accent-dark text-white"
                    : "bg-base-warm hover:bg-accent hover:text-white text-dark border border-border"
                }`}
              >
                Suscribirme
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-dark"
          >
            ¿Por qué suscribirse?
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="p-3 bg-accent-bg rounded-xl w-fit mx-auto mb-4 text-accent">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                {benefit.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-base-warm py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-dark text-center mb-12"
          >
            ¿Cómo funciona?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines between steps (desktop only) */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-px border-t-2 border-dashed border-accent/30" />

            {[
              { step: "1", title: "Elige tu plan", desc: "Selecciona el plan que más se ajuste a tu consumo de café." },
              { step: "2", title: "Personaliza", desc: "Elige tu café favorito, molienda y frecuencia de envío." },
              { step: "3", title: "Disfruta", desc: "Recibe café fresco en tu puerta. Cambia o pausa cuando quieras." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative z-10"
              >
                <div className="w-12 h-12 rounded-full bg-accent text-white font-heading text-xl font-bold flex items-center justify-center mx-auto mb-4 ring-4 ring-base-warm">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border-light rounded-2xl p-8 md:p-12"
          >
            <MessageCircle size={32} className="text-accent mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-semibold text-dark mb-3">
              ¿Tienes dudas sobre las suscripciones?
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Escríbenos por WhatsApp y te ayudamos a elegir el plan perfecto para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, tengo preguntas sobre las suscripciones de café")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 text-accent hover:text-accent-dark font-medium px-7 py-3.5 rounded-full border border-border hover:border-accent transition-all"
              >
                Ver FAQ
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
