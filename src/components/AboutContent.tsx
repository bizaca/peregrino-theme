"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Coffee, Leaf, Heart, Globe } from "lucide-react";
import { generatedImages } from "@/data/generated-images";

const values = [
  {
    icon: <Coffee size={24} />,
    title: "Calidad sin Compromiso",
    description:
      "Seleccionamos solo cafés que superan los 80 puntos SCA. Cada lote es catado y evaluado antes de ser aprobado para nuestras bolsas.",
  },
  {
    icon: <Leaf size={24} />,
    title: "Sostenibilidad",
    description:
      "Trabajamos con productores que practican agricultura sostenible, pagando precios justos que incentivan la calidad y el cuidado del medio ambiente.",
  },
  {
    icon: <Heart size={24} />,
    title: "Comercio Directo",
    description:
      "Compramos directamente a fincas y cooperativas, eliminando intermediarios. Esto garantiza mejor calidad para ti y mejores condiciones para el productor.",
  },
  {
    icon: <Globe size={24} />,
    title: "Trazabilidad Total",
    description:
      "Cada bolsa incluye información completa: finca, región, altitud, variedad, proceso y fecha de tueste. Sabemos exactamente de dónde viene tu café.",
  },
];

const timeline = [
  {
    year: "2016",
    title: "El primer tueste",
    description:
      "Comenzamos tostando en un pequeño espacio en Santiago, experimentando con granos de diferentes orígenes latinoamericanos.",
  },
  {
    year: "2018",
    title: "Primera tienda",
    description:
      "Abrimos nuestro primer local, un espacio donde la comunidad podía conocer de primera mano el proceso del café de especialidad.",
  },
  {
    year: "2020",
    title: "Relación directa",
    description:
      "Establecimos lazos directos con productores en Perú, Colombia y Bolivia, viajando a las fincas para seleccionar los mejores lotes.",
  },
  {
    year: "2022",
    title: "Expansión y comunidad",
    description:
      "Ampliamos nuestra capacidad de tueste y lanzamos nuestro programa de suscripciones, llegando a más hogares en Chile.",
  },
  {
    year: "2024",
    title: "Nuevos horizontes",
    description:
      "Incorporamos orígenes de Costa Rica y Brasil, y lanzamos nuestra línea de cápsulas compostables para llevar el café de especialidad a más personas.",
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="relative bg-dark-soft overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={generatedImages.about}
            alt="Peregrino Coffee Roastery"
            fill
            className="object-cover opacity-30"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyRDI5MjYiLz48L3N2Zz4="
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark-soft" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-light text-sm tracking-[0.3em] uppercase font-medium"
          >
            Desde 2016
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6"
          >
            Nuestra Historia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Somos tostadores de café de especialidad con raíces en Santiago.
            Buscamos los mejores granos de Latinoamérica para traer a tu taza
            una experiencia excepcional.
          </motion.p>
        </div>
      </div>

      {/* Story section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[520px] rounded-2xl overflow-hidden">
                <Image
                  src={generatedImages.about}
                  alt="Tostando café en Peregrino"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMkQyOTI2Ii8+PC9zdmc+"
                />
              </div>
              <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Quiénes Somos
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mt-3 mb-6 leading-tight">
                Más que café,
                <br />
                <span className="text-accent-gradient">una comunidad</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Peregrino nació de una pasión simple: encontrar los mejores cafés de
                  Latinoamérica y compartirlos con Chile. Lo que comenzó como un proyecto
                  personal de exploración cafetera se transformó en una comunidad de
                  amantes del buen café.
                </p>
                <p>
                  Nuestro nombre evoca el viaje — el peregrinaje que hace cada grano desde
                  las tierras altas de los Andes hasta tu taza. Cada café cuenta la historia
                  de su origen: el suelo volcánico de Colombia, las alturas de Perú, los
                  valles de Bolivia.
                </p>
                <p>
                  Creemos que el café de especialidad no es un lujo, sino una experiencia
                  que todos merecen conocer. Por eso trabajamos para hacerlo accesible
                  sin comprometer la calidad ni los valores que nos definen.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 pt-8 border-t border-border">
                <div>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-accent">8+</div>
                  <div className="text-text-tertiary text-xs md:text-sm mt-1">Años tostando</div>
                </div>
                <div>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-accent">5</div>
                  <div className="text-text-tertiary text-xs md:text-sm mt-1">Países de origen</div>
                </div>
                <div>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-accent">+80</div>
                  <div className="text-text-tertiary text-xs md:text-sm mt-1">Puntaje SCA mínimo</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-base-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
            >
              Lo Que Nos Mueve
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3"
            >
              Nuestros Valores
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface border border-border-light rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-shadow duration-300"
              >
                <div className="p-3 bg-accent-bg rounded-xl w-fit mb-4 text-accent">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
            >
              Nuestro Camino
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3"
            >
              El Viaje del Peregrino
            </motion.h2>
          </div>

          <div className="relative">
            {/* Timeline line — static background */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border-light md:-translate-x-px" />
            {/* Animated progress line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-accent/30 md:-translate-x-px origin-top"
            />

            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot with pulse ring */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-1.5 z-10"
                >
                  <div className="w-4 h-4 rounded-full bg-accent border-4 border-base" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent/20 animate-ping" />
                </motion.div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] bg-surface border border-border-light rounded-xl p-5 shadow-sm ${
                  index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                }`}>
                  <span className="text-accent font-heading text-2xl font-bold">
                    {event.year}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-dark mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-dark-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Conoce nuestros cafés
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg mb-8 max-w-lg mx-auto"
          >
            Descubre los sabores que hemos seleccionado para ti desde los mejores orígenes de Latinoamérica.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
            >
              Ver Productos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
