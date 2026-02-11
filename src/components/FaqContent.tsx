"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Package, Coffee, Truck, CreditCard, RotateCcw, HelpCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "Pedidos y Envíos",
    icon: <Truck size={20} />,
    items: [
      {
        question: "¿Cuánto tarda el envío?",
        answer:
          "Los envíos dentro de la Región Metropolitana se realizan en 1-2 días hábiles. Para el resto de Chile, los envíos tardan entre 3-5 días hábiles. Te enviaremos un número de seguimiento apenas tu pedido sea despachado.",
      },
      {
        question: "¿El envío es gratis?",
        answer:
          "Sí, todos los pedidos superiores a $35.000 tienen envío gratis dentro de la Región Metropolitana. Para otras regiones, el costo se calcula según destino. Retiro en tienda siempre es gratis.",
      },
      {
        question: "¿Puedo hacer retiro en tienda?",
        answer:
          "¡Por supuesto! Puedes retirar tu pedido en cualquiera de nuestras tiendas en Santiago. Además, todos los retiros en tienda reciben un 15% de descuento.",
      },
      {
        question: "¿Cómo hago seguimiento de mi pedido?",
        answer:
          "Una vez despachado tu pedido, recibirás un correo electrónico con el número de seguimiento de Chilexpress o Starken. También puedes escribirnos por WhatsApp y con gusto te informamos el estado.",
      },
    ],
  },
  {
    title: "Sobre el Café",
    icon: <Coffee size={20} />,
    items: [
      {
        question: "¿Cada cuánto tuestan el café?",
        answer:
          "Tostamos semanalmente en lotes pequeños para garantizar la máxima frescura. Cada bolsa indica la fecha de tueste. Recomendamos consumir el café entre 7 y 30 días después del tueste para disfrutar su mejor perfil de sabor.",
      },
      {
        question: "¿Qué significa café de especialidad?",
        answer:
          "El café de especialidad es aquel que obtiene un puntaje de 80 o más en la escala de la SCA (Specialty Coffee Association). Esto significa que ha sido cultivado, procesado y tostado con altos estándares de calidad, resultando en sabores complejos y distintivos.",
      },
      {
        question: "¿Qué molienda debo elegir?",
        answer:
          "Depende de tu método de preparación: Espresso para máquinas de café, Media para V60, Chemex y Aeropress, Gruesa para prensa francesa y cold brew, y Grano entero si tienes molino en casa. Si no estás seguro, escríbenos y te ayudamos.",
      },
      {
        question: "¿De dónde provienen sus cafés?",
        answer:
          "Trabajamos directamente con productores en Perú, Colombia, Bolivia, Costa Rica y Brasil. Cada origen tiene características únicas: desde los cafés frutales de Colombia hasta los chocolatosos de Brasil y los florales de Bolivia.",
      },
    ],
  },
  {
    title: "Pagos",
    icon: <CreditCard size={20} />,
    items: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Actualmente coordinamos el pago por WhatsApp, donde aceptamos transferencia bancaria, tarjeta de débito/crédito a través de link de pago, y MercadoPago. Estamos trabajando para habilitar pago directo en la web.",
      },
      {
        question: "¿Emiten boleta o factura?",
        answer:
          "Sí, emitimos boleta electrónica en todos los pedidos. Si necesitas factura, indícalo al hacer tu pedido por WhatsApp con tus datos de facturación.",
      },
    ],
  },
  {
    title: "Suscripciones",
    icon: <Package size={20} />,
    items: [
      {
        question: "¿Cómo funciona la suscripción?",
        answer:
          "Elige tu café favorito (o déjanos sorprenderte), selecciona la frecuencia (semanal, quincenal o mensual) y recibe café fresco en tu puerta. Puedes pausar, cambiar o cancelar tu suscripción en cualquier momento.",
      },
      {
        question: "¿La suscripción tiene descuento?",
        answer:
          "Sí, todos los suscriptores reciben un 10% de descuento en cada envío, además de acceso anticipado a ediciones limitadas y eventos exclusivos de cata.",
      },
      {
        question: "¿Puedo cambiar mi suscripción?",
        answer:
          "Puedes modificar la frecuencia, el café seleccionado o la molienda en cualquier momento. Solo escríbenos por WhatsApp al menos 2 días antes de tu próximo despacho.",
      },
    ],
  },
  {
    title: "Cambios y Devoluciones",
    icon: <RotateCcw size={20} />,
    items: [
      {
        question: "¿Puedo devolver un producto?",
        answer:
          "Si tu producto llegó dañado o no corresponde a lo pedido, contáctanos dentro de los primeros 3 días tras recibirlo. Haremos el cambio o devolución sin costo. Debido a la naturaleza del producto, no aceptamos devoluciones por gusto personal una vez abierto el empaque.",
      },
      {
        question: "¿Qué pasa si mi pedido llega dañado?",
        answer:
          "Contáctanos inmediatamente por WhatsApp con fotos del estado del producto. Enviaremos un reemplazo sin costo adicional en el próximo despacho disponible.",
      },
    ],
  },
];

function FaqAccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border-light last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 px-2 -mx-2 text-left group hover:bg-accent-bg/30 rounded-lg transition-colors"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "font-medium transition-colors",
          isOpen ? "text-accent" : "text-dark group-hover:text-accent"
        )}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className={cn(
            "transition-colors",
            isOpen ? "text-accent" : "text-text-tertiary"
          )} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm leading-relaxed pb-5">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqContent() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

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
            <HelpCircle size={14} className="text-accent-light" />
            <span className="text-white/60 text-sm">Centro de ayuda</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Preguntas Frecuentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Encuentra respuestas sobre nuestros cafés, envíos, suscripciones y más
          </motion.p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-10">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-bg rounded-lg text-accent">
                  {category.icon}
                </div>
                <h2 className="font-heading text-xl font-semibold text-dark">
                  {category.title}
                </h2>
              </div>

              {/* Questions */}
              <div className="bg-surface border border-border-light rounded-2xl px-6">
                {category.items.map((item, itemIndex) => {
                  const key = `${catIndex}-${itemIndex}`;
                  return (
                    <FaqAccordionItem
                      key={key}
                      item={item}
                      isOpen={openItems.has(key)}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-base-warm rounded-2xl p-8 md:p-12 border border-border-light"
        >
          <h3 className="font-heading text-2xl font-semibold text-dark mb-3">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Estamos para ayudarte. Escríbenos por WhatsApp y te responderemos lo antes posible.
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, tengo una consulta sobre sus productos")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 btn-press"
          >
            Contactar por WhatsApp
          </a>
          <p className="text-text-tertiary text-sm mt-4">
            O escríbenos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
