"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { User, Package, Heart, Bell, ArrowLeft, Coffee } from "lucide-react";

const upcomingFeatures = [
  { icon: <Package size={20} />, title: "Mis Pedidos", desc: "Rastrea y revisa tu historial de pedidos" },
  { icon: <Heart size={20} />, title: "Favoritos", desc: "Guarda tus cafés preferidos para compras rápidas" },
  { icon: <User size={20} />, title: "Mi Perfil", desc: "Gestiona tu información y direcciones de envío" },
  { icon: <Bell size={20} />, title: "Notificaciones", desc: "Alertas de nuevos lanzamientos y ofertas exclusivas" },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"
          >
            <Coffee size={36} className="text-accent-light" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Mi Cuenta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-md mx-auto"
          >
            Estamos preparando tu espacio personal con el mismo cuidado que nuestro café.
          </motion.p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Upcoming features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-heading text-xl font-semibold text-dark mb-6 text-center">
            Pronto podrás
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-3 p-4 bg-surface border border-border-light rounded-xl"
              >
                <div className="p-2 bg-accent-bg rounded-lg text-accent shrink-0 h-fit">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-dark text-sm">{feature.title}</h3>
                  <p className="text-text-tertiary text-xs mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-base-warm rounded-2xl p-8"
        >
          <p className="text-text-secondary mb-4">
            Mientras tanto, explora nuestra selección de cafés de especialidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-full transition-all duration-300"
            >
              Ver Productos
            </Link>
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 text-text-secondary hover:text-dark font-medium px-6 py-3 transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Volver al Inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
