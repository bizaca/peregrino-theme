"use client";

import { motion } from "motion/react";
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
    <section className="py-16 md:py-24 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#8B6914] text-sm tracking-[0.3em] uppercase font-medium"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#0D2030] mt-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reseñas
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-0.5 bg-[#8B6914] mx-auto mt-4"
          />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white border border-[#D4CEC5] p-6 md:p-8 hover:shadow-xl hover:shadow-[#8B6914]/5 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-[#8B6914]/10 absolute top-6 right-6"
              />

              {/* Golden stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#B8912A] text-[#B8912A]"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-[#0D2030] leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author with avatar initials */}
              <figcaption className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EDE7DE] flex items-center justify-center text-[#8B6914] font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[#0D2030] font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#0D2030]/50 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <span className="text-[#8B6914]/70 text-xs font-medium bg-[#EDE7DE] px-3 py-1.5">
                  {testimonial.product}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
