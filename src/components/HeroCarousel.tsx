"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const slide = heroSlides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[75vh] md:h-[88vh] overflow-hidden bg-[#0D2030] focus-visible:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrusel de productos destacados"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Background image with slow zoom (Ken Burns) */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              style={{ objectPosition: slide.objectPosition ?? "center" }}
              priority={current === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwRDIwMzAiLz48L3N2Zz4="
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2030]/90 via-[#0D2030]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D2030]/50 to-transparent" />

          {/* Content — bottom left */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-16 md:pb-24">
              <div className="max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block text-[#B8912A] text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {slide.subtitle}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/60 text-base md:text-lg mb-8 leading-relaxed max-w-md"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link
                    href={slide.href}
                    className="group inline-flex items-center gap-3 bg-[#8B6914] hover:bg-[#B8912A] text-white font-semibold px-8 py-4 tracking-wider uppercase text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#8B6914]/30 btn-press"
                  >
                    {slide.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Badge bottom-right: Café del Mes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-16 md:bottom-24 right-6 md:right-12 hidden md:block"
          >
            <div className="bg-[#0D2030]/80 backdrop-blur-sm border border-[#B8912A]/30 px-5 py-4 text-center">
              <span className="block text-[#B8912A] text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
                Café del Mes
              </span>
              <span className="block text-white text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                {slide.title}
              </span>
              <span className="block text-white/50 text-xs mt-1">{slide.subtitle}</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-[#8B6914]/60 backdrop-blur-sm text-white transition-all duration-300 z-10 hidden sm:flex items-center justify-center"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-[#8B6914]/60 backdrop-blur-sm text-white transition-all duration-300 z-10 hidden sm:flex items-center justify-center"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} de {heroSlides.length}: {slide.title}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center z-10" role="tablist" aria-label="Slides del carrusel">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            role="tab"
            onClick={() => goTo(index)}
            className="flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label={`Ir a slide ${index + 1}`}
            aria-selected={index === current}
          >
            <span
              className={cn(
                "relative block transition-all duration-300 rounded-full overflow-hidden",
                index === current
                  ? "w-10 h-2 bg-white/20"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              )}
            >
              {index === current && (
                <motion.span
                  key={`progress-${current}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-0 bg-[#B8912A] rounded-full block"
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
