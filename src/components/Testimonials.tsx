"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Catalina Vásquez",
    role: "Suscriptora desde 2022",
    rating: 5,
    text: "Desde que descubrí Peregrino no compro café en otro lado. El Perú El Bambú es una joya — notas dulces que hacen que cada mañana valga la pena.",
    product: "Perú El Bambú",
  },
  {
    name: "Rodrigo Sepúlveda",
    role: "Barista en Santiago",
    rating: 5,
    text: "Como barista, valoro la consistencia y frescura. Los granos de Peregrino siempre llegan recién tostados y con un perfil de sabor impecable.",
    product: "Colombia Ciudad Bolívar",
  },
  {
    name: "María José Torres",
    role: "Amante del café",
    rating: 5,
    text: "El servicio es increíble y los cafés superan las expectativas. La suscripción mensual es lo mejor: siempre tengo café fresco sin preocuparme.",
    product: "Suscripción Peregrino",
  },
  {
    name: "Felipe Contreras",
    role: "Chef en Providencia",
    rating: 5,
    text: "Usamos Peregrino en nuestro restaurante. La calidad del Costa Rica Colibrí como espresso es sobresaliente. Nuestros clientes siempre preguntan por la marca.",
    product: "Costa Rica Colibrí",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3"
          >
            Reseñas
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-0.5 bg-accent mx-auto mt-4"
          />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-surface border border-border-light rounded-2xl p-6 md:p-8"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-accent/10 absolute top-6 right-6"
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-dark leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-heading font-bold text-sm">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-dark font-medium text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-text-tertiary text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="text-accent/60 text-xs font-medium bg-accent-bg px-2.5 py-1 rounded-full">
                  {testimonial.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
