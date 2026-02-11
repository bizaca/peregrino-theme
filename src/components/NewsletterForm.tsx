"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateEmail(email)) {
        setStatus("error");
        setErrorMessage("Por favor ingresa un email válido");
        return;
      }

      setStatus("loading");

      // Simulate API call (replace with real endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // For now, always succeed (mock)
      setStatus("success");
      setEmail("");

      // Reset after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    },
    [email]
  );

  return (
    <div>
      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
        Newsletter
      </h3>
      <p className="text-white/50 text-sm mb-4">
        Recibe novedades, ofertas exclusivas y tips de preparación.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-2">
        <div className="flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="tu@email.com"
            disabled={status === "loading" || status === "success"}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors disabled:opacity-50"
            aria-describedby="newsletter-status"
            aria-invalid={status === "error"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success" || !email.trim()}
            className="bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:hover:bg-accent text-white rounded-full p-2.5 transition-colors shrink-0"
            aria-label="Suscribirse al newsletter"
          >
            {status === "loading" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {/* Status feedback with aria-live for screen readers */}
        <div id="newsletter-status" aria-live="polite" className="min-h-[1.25rem]">
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-emerald-400 text-xs"
              >
                <CheckCircle size={14} />
                Te has suscrito exitosamente
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-red-400 text-xs"
              >
                <AlertCircle size={14} />
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
