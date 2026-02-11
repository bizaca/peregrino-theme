"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { generatedImages } from "@/data/generated-images";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("error");
        return;
      }
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    },
    [email]
  );

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={generatedImages.newsletter}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/75 backdrop-blur-[2px]" />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
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
          noValidate
          className="max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full px-6 py-3.5 w-full"
              >
                <Check size={18} />
                <span className="font-medium">Te has suscrito correctamente</span>
              </motion.div>
            ) : (
              <motion.div key="form" className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="tu@email.com"
                    disabled={status === "loading"}
                    aria-label="Correo electrónico"
                    aria-describedby="newsletter-home-status"
                    aria-invalid={status === "error"}
                    className={`w-full bg-white/10 border text-white placeholder:text-white/40 rounded-full px-5 py-3.5 focus:outline-none transition-colors disabled:opacity-50 ${
                      status === "error"
                        ? "border-red-400/50 focus:border-red-400"
                        : "border-white/20 focus:border-accent-light"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 btn-press"
                >
                  {status === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Suscribirse
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div id="newsletter-home-status" aria-live="polite" className="mt-2 min-h-[1.25rem]">
            {status === "error" && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-red-400 text-xs"
              >
                <AlertCircle size={14} />
                Por favor ingresa un email válido
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
