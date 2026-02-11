"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hola%2C%20me%20interesa%20saber%20más%20sobre%20sus%20cafés`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 lg:bottom-8 lg:right-8"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
