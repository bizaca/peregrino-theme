"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { generatedImages } from "@/data/generated-images";

function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-heading text-2xl md:text-3xl font-bold text-accent">
      {isInView ? display : 0}{suffix}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={generatedImages.about}
                alt="Peregrino Coffee Roastery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative elements — hidden on mobile to prevent overflow */}
            <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl" />
            <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 border-2 border-sage/20 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              Nuestra Historia
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3 mb-6 leading-tight">
              Tostadores de Café
              <br />
              <span className="text-accent-gradient">desde 2016</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                En Peregrino Coffee Roasters, cada grano cuenta una historia. Desde nuestros
                inicios en 2016, nos hemos dedicado a buscar los mejores cafés de especialidad
                de Latinoamérica, tostándolos con precisión para revelar su carácter único.
              </p>
              <p>
                Trabajamos directamente con productores en Perú, Colombia, Bolivia, Costa Rica
                y Brasil, asegurando prácticas sostenibles y precios justos. Cada lote es
                tostado semanalmente en pequeñas cantidades para garantizar la máxima frescura.
              </p>
              <p>
                Nuestra misión es simple: llevar café excepcional a tu taza, manteniendo la
                integridad del origen y la pasión del productor en cada sorbo.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <AnimatedStat value={8} suffix="+" />
                <div className="text-text-tertiary text-xs md:text-sm mt-1">Años de experiencia</div>
              </div>
              <div>
                <AnimatedStat value={5} />
                <div className="text-text-tertiary text-xs md:text-sm mt-1">Países de origen</div>
              </div>
              <div>
                <AnimatedStat value={100} suffix="%" />
                <div className="text-text-tertiary text-xs md:text-sm mt-1">Especialidad</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
