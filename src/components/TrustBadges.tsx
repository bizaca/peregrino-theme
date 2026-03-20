"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, CalendarDays, ShieldCheck, Truck, Gift } from "lucide-react";
import { trustBadges } from "@/data/navigation";

const iconMap: Record<string, React.ElementType> = {
  coffee: Coffee,
  calendar: CalendarDays,
  shield: ShieldCheck,
  truck: Truck,
  gift: Gift,
};

function GoldenDot() {
  return (
    <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#B8912A] shrink-0 mx-6" />
  );
}

function BadgeItem({ badge }: { badge: (typeof trustBadges)[number] }) {
  const Icon = iconMap[badge.icon];
  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap">
      <Icon size={15} className="text-[#8B6914] shrink-0" />
      <span className="text-sm font-medium text-[#0D2030]/70 tracking-wide uppercase">{badge.text}</span>
    </span>
  );
}

export default function TrustBadges() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trustBadges.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#EDE7DE] border-y border-[#D4CEC5]">
      {/* Desktop: infinite marquee ticker with golden dots */}
      <div className="hidden md:block overflow-hidden py-4">
        <div className="animate-marquee flex items-center w-max">
          {[...trustBadges, ...trustBadges].map((badge, index) => (
            <span key={`${badge.text}-${index}`} className="inline-flex items-center">
              <BadgeItem badge={badge} />
              <GoldenDot />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: rotating single badge */}
      <div className="md:hidden flex items-center justify-center h-14 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {(() => {
              const Icon = iconMap[trustBadges[current].icon];
              return <Icon size={15} className="text-[#8B6914]" />;
            })()}
            <span className="text-sm font-medium text-[#0D2030]/70 tracking-wide uppercase">
              {trustBadges[current].text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
