"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP: staggered reveal on scroll
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-gsap-card]");

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const categoryOrder: Record<string, number> = { granos: 0, capsulas: 1, infusiones: 2, packs: 3, accesorios: 4 };
  const featuredProducts = products
    .filter((p) => p.featured)
    .sort((a, b) => (categoryOrder[a.category] ?? 9) - (categoryOrder[b.category] ?? 9));

  return (
    <section className="py-12 md:py-16 bg-base-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
            >
              Nuestra Selección
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3"
            >
              Granos Destacados
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-0.5 bg-accent mt-4"
            />
          </div>

          {/* Navigation + View all */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/products"
              className="group flex items-center gap-1 text-sm text-accent hover:text-accent-dark font-medium transition-colors"
            >
              Ver todos
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 border border-border hover:border-accent text-dark-muted hover:text-accent active:scale-90 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 border border-border hover:border-accent text-dark-muted hover:text-accent active:scale-90 transition-all"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={(el) => { scrollRef.current = el; cardsRef.current = el; }}
            role="region"
            aria-label="Productos destacados"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") scroll("left");
              if (e.key === "ArrowRight") scroll("right");
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          >
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} data-gsap-card>
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: view all link */}
        <div className="flex md:hidden justify-center mt-8">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm text-accent font-medium border border-accent px-6 py-3 hover:bg-accent hover:text-white transition-all btn-press"
          >
            Ver todos los productos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
