"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Clock, MessageCircle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const acceptedReasons = [
  "Producto dañado durante el envío",
  "Producto diferente al pedido",
  "Molienda incorrecta",
  "Empaque abierto o roto al recibirlo",
  "Producto vencido o sin fecha de tueste",
];

const notAcceptedReasons = [
  "Preferencia de sabor personal",
  "Empaque abierto por el cliente",
  "Pedido realizado hace más de 7 días",
  "Producto en buen estado sin defectos",
];

const steps = [
  {
    step: "1",
    title: "Contáctanos",
    description: "Escríbenos por WhatsApp o email dentro de los primeros 3 días después de recibir tu pedido.",
  },
  {
    step: "2",
    title: "Envía evidencia",
    description: "Comparte fotos del producto y empaque. Esto nos ayuda a resolver tu caso rápidamente.",
  },
  {
    step: "3",
    title: "Resolución",
    description: "Evaluamos tu caso en 24 horas y coordinamos el cambio o reposición sin costo adicional.",
  },
];

export default function ReturnsContent() {
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
            Cambios y Devoluciones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Tu satisfacción es nuestra prioridad. Si algo no está bien con tu pedido, lo solucionamos.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 bg-sage-bg border border-sage/10 rounded-2xl p-6 mb-12"
        >
          <ShieldCheck size={32} className="text-sage shrink-0" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-dark">
              Garantía de Satisfacción
            </h2>
            <p className="text-text-secondary text-sm">
              Si tu producto llega dañado o no corresponde a lo pedido, lo reponemos o reembolsamos sin costo. Sin preguntas.
            </p>
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-dark mb-8 text-center">
            Proceso de Cambio o Devolución
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-surface border border-border-light rounded-2xl p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark mb-2 mt-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accepted / Not accepted */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border-light rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} className="text-green-600" />
              <h3 className="font-heading text-lg font-semibold text-dark">
                Aceptamos cambios cuando
              </h3>
            </div>
            <ul className="space-y-3">
              {acceptedReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle size={14} className="text-green-600 shrink-0 mt-0.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border-light rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={20} className="text-accent-red" />
              <h3 className="font-heading text-lg font-semibold text-dark">
                No aplica cuando
              </h3>
            </div>
            <ul className="space-y-3">
              {notAcceptedReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm text-text-secondary">
                  <XCircle size={14} className="text-accent-red shrink-0 mt-0.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Important details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-base-warm rounded-2xl p-6 md:p-8 mb-12 border border-border-light"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-accent" />
            <h3 className="font-heading text-lg font-semibold text-dark">
              Plazos Importantes
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-dark mb-1">Plazo para solicitar cambio</p>
              <p className="text-text-secondary">3 días hábiles desde la recepción</p>
            </div>
            <div>
              <p className="font-medium text-dark mb-1">Tiempo de resolución</p>
              <p className="text-text-secondary">24-48 horas hábiles</p>
            </div>
            <div>
              <p className="font-medium text-dark mb-1">Envío de reposición</p>
              <p className="text-text-secondary">Sin costo adicional</p>
            </div>
            <div>
              <p className="font-medium text-dark mb-1">Reembolso</p>
              <p className="text-text-secondary">5-10 días hábiles según medio de pago</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-heading text-2xl font-semibold text-dark mb-3">
            ¿Necesitas hacer un cambio?
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Contáctanos y resolveremos tu caso lo antes posible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, necesito hacer un cambio/devolución de mi pedido")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300"
            >
              <MessageCircle size={16} />
              Contactar por WhatsApp
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 text-text-secondary hover:text-accent font-medium px-7 py-3.5 rounded-full border border-border hover:border-accent transition-all"
            >
              Ver FAQ
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
