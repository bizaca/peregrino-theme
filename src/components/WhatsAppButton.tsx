"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function WhatsAppButton() {
  const pathname = usePathname();

  const whatsappUrl = useMemo(() => {
    let message = "Hola, me interesa saber más sobre sus cafés";

    if (pathname.startsWith("/products/")) {
      const slug = pathname.replace("/products/", "");
      const productName = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      message = `Hola, me interesa el producto "${productName}". ¿Me pueden dar más información?`;
    } else if (pathname === "/subscriptions") {
      message = "Hola, me gustaría saber más sobre sus suscripciones de café";
    } else if (pathname === "/wholesale") {
      message = "Hola, me interesa información sobre venta mayorista";
    }

    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  }, [pathname]);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 lg:bottom-8 lg:right-8"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
