"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, CalendarDays, ShieldCheck, Truck, Gift } from "lucide-react";
import { trustBadges } from "@/data/navigation";

const iconMap: Record<string, React.ElementType> = {
  coffee: Coffee,
  calendar: CalendarDays,
  shield: ShieldCheck,
  truck: Truck,
  gift: Gift,
};

export default function TrustBadges() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trustBadges.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-base-warm border-y border-border-light">
      {/* Desktop: show all badges */}
      <div className="hidden md:flex items-center justify-center max-w-7xl mx-auto px-6">
        {trustBadges.map((badge, index) => {
          const Icon = iconMap[badge.icon];
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 px-6 py-4 text-dark-muted"
            >
              <Icon size={17} className="text-accent shrink-0" />
              <span className="text-sm whitespace-nowrap">{badge.text}</span>
              {index < trustBadges.length - 1 && (
                <div className="w-px h-4 bg-border ml-6" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: rotating single badge */}
      <div className="md:hidden flex items-center justify-center h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-dark-muted"
          >
            {(() => {
              const Icon = iconMap[trustBadges[current].icon];
              return <Icon size={15} className="text-accent" />;
            })()}
            <span className="text-sm">{trustBadges[current].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
