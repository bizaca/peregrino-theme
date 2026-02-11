"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const DISMISSED_KEY = "peregrino-announcement-dismissed";
const noop = () => () => {};
const getNotDismissed = () => !sessionStorage.getItem(DISMISSED_KEY);
const getTrue = () => true;

export default function AnnouncementBar() {
  // Server snapshot returns true so the bar renders in SSR (prevents CLS).
  // On client hydration, sessionStorage is checked; if dismissed, bar unmounts.
  const notDismissed = useSyncExternalStore(noop, getNotDismissed, getTrue);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);
  const isVisible = notDismissed && !manuallyDismissed;

  const handleDismiss = () => {
    setManuallyDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="relative animate-gradient-shift text-base text-center py-2.5 px-8 text-sm font-medium tracking-wider">
            <p className="text-base-warm">
              Todos los retiros en tienda reciben{" "}
              <span className="text-accent-light font-semibold">15% de descuento</span>{" "}
              en consumo de café
            </p>
            <button
              onClick={handleDismiss}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-3.5 text-text-tertiary hover:text-base-warm hover:bg-white/10 rounded-full transition-all"
              aria-label="Cerrar anuncio"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
