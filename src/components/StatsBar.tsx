"use client";

import { motion } from "motion/react";

const stats = [
  { number: "2016", label: "Tostando desde" },
  { number: "+50", label: "Orígenes Probados" },
  { number: "100%", label: "Café de Especialidad" },
  { number: "+5.000", label: "Clientes Felices" },
];

export default function StatsBar() {
  return (
    <section className="py-14 md:py-20 bg-[#0D2030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <span
                className="block text-4xl md:text-5xl lg:text-6xl font-bold text-[#B8912A] mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.number}
              </span>
              <span className="text-white/60 text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
