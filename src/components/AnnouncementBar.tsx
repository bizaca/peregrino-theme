"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "peregrino-announcement-dismissed";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-dark text-base text-center py-2.5 px-8 text-sm font-medium tracking-wider">
      <p className="text-base-warm">
        Todos los retiros en tienda reciben{" "}
        <span className="text-accent-light font-semibold">15% de descuento</span>{" "}
        en consumo de café
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-base-warm transition-colors"
        aria-label="Cerrar anuncio"
      >
        <X size={16} />
      </button>
    </div>
  );
}
