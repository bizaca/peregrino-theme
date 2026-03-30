"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  // Desktop: GSAP seamless marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Wait for layout to measure width of one set of badges
    const totalWidth = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -totalWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(x as unknown as string) % totalWidth),
      },
    });

    return () => { tween.kill(); };
  }, []);

  // Mobile: GSAP rotating badge
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const children = el.children;
    if (children.length === 0) return;

    // Show first, hide rest
    gsap.set(children, { opacity: 0, y: 10 });
    gsap.set(children[0], { opacity: 1, y: 0 });

    const interval = setInterval(() => {
      const prev = currentIndex.current;
      const next = (prev + 1) % children.length;

      gsap.to(children[prev], { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" });
      gsap.fromTo(children[next], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.15 });

      currentIndex.current = next;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#EDE7DE] border-y border-[#D4CEC5]">
      {/* Desktop: GSAP infinite marquee ticker */}
      <div className="hidden md:block overflow-hidden py-4">
        <div ref={marqueeRef} className="flex items-center w-max">
          {[...trustBadges, ...trustBadges].map((badge, index) => (
            <span key={`${badge.text}-${index}`} className="inline-flex items-center">
              <BadgeItem badge={badge} />
              <GoldenDot />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: GSAP rotating single badge */}
      <div className="md:hidden relative h-14 overflow-hidden">
        <div ref={mobileRef} className="absolute inset-0 flex items-center justify-center">
          {trustBadges.map((badge, i) => {
            const Icon = iconMap[badge.icon];
            return (
              <div key={badge.text} className="absolute flex items-center gap-2">
                <Icon size={15} className="text-[#8B6914]" />
                <span className="text-sm font-medium text-[#0D2030]/70 tracking-wide uppercase">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
