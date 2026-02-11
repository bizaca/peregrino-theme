"use client";

import { motion } from "framer-motion";
import { Building2, Coffee, Truck, BarChart3, Users, Wrench, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const audiences = [
  { icon: <Coffee size={24} />, label: "Cafeterías", description: "Cafés de especialidad y tercera ola" },
  { icon: <Building2 size={24} />, label: "Restaurantes", description: "Restaurantes y hoteles premium" },
  { icon: <Users size={24} />, label: "Oficinas", description: "Espacios de cowork y oficinas" },
  { icon: <Building2 size={24} />, label: "Tiendas", description: "Tiendas gourmet y delis" },
];

const benefits = [
  {
    icon: <Coffee size={24} />,
    title: "Café de Especialidad",
    description: "Granos seleccionados con puntaje SCA +80. Tostados semanalmente para máxima frescura.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Precios Competitivos",
    description: "Descuentos progresivos según volumen. Mientras más pidas, mejor precio obtienes.",
  },
  {
    icon: <Truck size={24} />,
    title: "Envío Programado",
    description: "Entregas semanales o quincenales directamente en tu local. Sin preocupaciones de stock.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Soporte Técnico",
    description: "Capacitación en preparación, calibración de equipos y asesoría en menú de café.",
  },
];

export default function WholesaleContent() {
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
            <Building2 size={14} className="text-accent-light" />
            <span className="text-white/60 text-sm">Programa B2B</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Mayoristas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Lleva café de especialidad a tu negocio. Trabajamos con cafeterías, restaurantes y oficinas en todo Chile.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Audiences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            ¿Para quién es nuestro programa?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {audiences.map((aud, index) => (
              <motion.div
                key={aud.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface border border-border-light rounded-2xl p-5 text-center hover:shadow-md hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-3 bg-accent-bg rounded-xl w-fit mx-auto mb-3 text-accent">
                  {aud.icon}
                </div>
                <h3 className="font-semibold text-dark mb-1">{aud.label}</h3>
                <p className="text-text-tertiary text-xs">{aud.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Lo Que Ofrecemos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 bg-surface border border-border-light rounded-2xl p-6 hover:shadow-md hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-3 bg-accent-bg rounded-xl h-fit text-accent shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-dark mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Volume pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Precios por Volumen
          </h2>
          <div className="bg-surface border border-border-light rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-3 gap-4 px-6 py-4 bg-dark-soft text-sm font-medium text-white">
              <span>Volumen mensual</span>
              <span>Descuento</span>
              <span>Incluye</span>
            </div>
            {[
              { volume: "5 - 10 kg", discount: "15%", includes: "Envío gratis RM", highlight: false },
              { volume: "10 - 25 kg", discount: "20%", includes: "Envío gratis Chile + capacitación", highlight: false },
              { volume: "25 - 50 kg", discount: "25%", includes: "Todo lo anterior + asesoría de menú", highlight: false },
              { volume: "50+ kg", discount: "Personalizado", includes: "Programa completo a medida", highlight: true },
            ].map((tier, index) => (
              <div
                key={tier.volume}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 px-6 py-5 ${
                  index !== 3 ? "border-b border-border-light" : ""
                } ${index % 2 === 1 ? "bg-base-warm/50" : ""} ${
                  tier.highlight ? "bg-accent-bg border-l-4 border-l-accent" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="sm:hidden text-text-tertiary text-xs">Volumen: </span>
                  <span className="font-medium text-dark">{tier.volume}</span>
                  {tier.highlight && (
                    <span className="text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>
                <div>
                  <span className={`font-semibold ${tier.highlight ? "text-accent text-lg" : "text-accent-dark"}`}>{tier.discount}</span>
                </div>
                <div>
                  <span className="text-text-secondary text-sm">{tier.includes}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-dark-soft rounded-2xl p-8 md:p-12"
        >
          <MessageCircle size={32} className="text-accent-light mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-semibold text-white mb-3">
            ¿Interesado en ser cliente mayorista?
          </h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Cuéntanos sobre tu negocio y prepararemos una propuesta personalizada.
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              "Hola, me interesa el programa mayorista de Peregrino Coffee. Mi negocio es:"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-8 py-4 rounded-full transition-all duration-300 btn-press"
          >
            Contactar por WhatsApp
          </a>
          <p className="text-white/40 text-sm mt-4">
            O escríbenos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-accent-light hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
