"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-dark-soft relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent-light text-sm tracking-[0.3em] uppercase font-medium"
        >
          Mantente Conectado
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mt-3 mb-4"
        >
          Únete a la Comunidad
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-base md:text-lg mb-8 max-w-lg mx-auto"
        >
          Recibe novedades, ofertas exclusivas y tips de preparación directamente
          en tu correo.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          {submitted ? (
            <div className="flex items-center justify-center gap-2 bg-sage/20 text-sage-light rounded-full px-6 py-3.5 w-full">
              <Check size={18} />
              <span className="font-medium">Te has suscrito correctamente</span>
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-full px-5 py-3.5 focus:outline-none focus:border-accent-light transition-colors"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300"
              >
                Suscribirse
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
