"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, Tag, ArrowUpDown } from "lucide-react";
import { products, formatPrice, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const origins = ["Todos", ...new Set(products.filter((p) => p.origin).map((p) => p.origin))];
const processes = ["Todos", ...new Set(products.filter((p) => p.process).map((p) => p.process))];

const allPrices = products.map((p) => p.variants[0].price);
const globalMinPrice = Math.min(...allPrices);
const globalMaxPrice = Math.max(...allPrices);

const categoryLabels: Record<ProductCategory, string> = {
  granos: "Granos",
  packs: "Packs",
  accesorios: "Accesorios",
  infusiones: "Infusiones",
  capsulas: "Cápsulas",
};

const categoryOrder: ProductCategory[] = ["granos", "packs", "infusiones", "accesorios"];

type SortOption = "featured" | "price-asc" | "price-desc" | "name" | "rating";
const sortLabels: Record<SortOption, string> = {
  featured: "Destacados",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  name: "Nombre A-Z",
  rating: "Mejor valorados",
};

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as ProductCategory | null;
  const urlFilter = searchParams.get("filter");

  const [search, setSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("Todos");
  const [selectedProcess, setSelectedProcess] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [minPrice, setMinPrice] = useState(globalMinPrice);
  const [maxPrice, setMaxPrice] = useState(globalMaxPrice);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const activeCategory = urlCategory || (selectedCategory !== "Todos" ? selectedCategory as ProductCategory : null);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.origin.toLowerCase().includes(search.toLowerCase()) ||
        p.tastingNotes.toLowerCase().includes(search.toLowerCase());
      const matchesOrigin =
        selectedOrigin === "Todos" || p.origin === selectedOrigin;
      const matchesProcess =
        selectedProcess === "Todos" || p.process === selectedProcess;
      const matchesCategory = !activeCategory || p.category === activeCategory;
      const matchesFilter =
        !urlFilter ||
        (urlFilter === "offers" &&
          p.variants.some((v) => v.originalPrice && v.originalPrice > v.price));
      const matchesPrice =
        p.variants[0].price >= minPrice && p.variants[0].price <= maxPrice;
      return matchesSearch && matchesOrigin && matchesProcess && matchesCategory && matchesFilter && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.variants[0].price - b.variants[0].price;
        case "price-desc":
          return b.variants[0].price - a.variants[0].price;
        case "name":
          return a.name.localeCompare(b.name, "es");
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [search, selectedOrigin, selectedProcess, activeCategory, urlFilter, sortBy, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero banner */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {urlFilter === "offers"
              ? "Ofertas"
              : urlCategory
                ? categoryLabels[urlCategory]
                : "Nuestra Selección"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            {urlFilter === "offers"
              ? "Aprovecha nuestras promociones y descuentos especiales en café de especialidad"
              : urlCategory
                ? `Explora nuestra selección de ${categoryLabels[urlCategory].toLowerCase()}`
                : "Cafés de especialidad tostados semanalmente con granos de los mejores orígenes de Latinoamérica"}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Active URL filter indicator */}
        {(urlCategory || urlFilter) && (
          <div className="flex items-center gap-2 mb-6">
            <Tag size={14} className="text-accent" />
            <span className="text-sm text-text-secondary">
              Filtrando por:{" "}
              <span className="font-medium text-accent">
                {urlFilter === "offers" ? "Ofertas" : categoryLabels[urlCategory!]}
              </span>
            </span>
            <Link
              href="/products"
              className="text-sm text-text-tertiary hover:text-accent-red transition-colors ml-1"
            >
              × Limpiar
            </Link>
          </div>
        )}

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="search"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, origen o notas..."
              aria-label="Buscar productos"
              className="w-full bg-surface border border-border pl-11 pr-4 py-3 text-dark placeholder:text-text-tertiary focus:outline-none input-focus text-sm"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="appearance-none bg-surface border border-border pl-10 pr-8 py-3 text-sm text-dark-muted font-medium cursor-pointer focus:outline-none input-focus"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ArrowUpDown
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Mostrar filtros de producto"
            className={cn(
              "flex items-center gap-2 px-5 py-3 border text-sm font-medium transition-all",
              showFilters
                ? "bg-accent text-white border-accent"
                : "bg-surface text-dark-muted border-border hover:border-accent"
            )}
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-surface border border-border-light"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category filter (only when no URL category) */}
              {!urlCategory && (
                <div>
                  <label className="text-sm font-medium text-dark mb-2 block">
                    Categoría
                  </label>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
                    <button
                      onClick={() => setSelectedCategory("Todos")}
                      aria-pressed={selectedCategory === "Todos"}
                      className={cn(
                        "px-3 py-1.5 text-sm transition-all",
                        selectedCategory === "Todos"
                          ? "bg-accent text-white"
                          : "bg-base-warm text-text-secondary hover:text-dark"
                      )}
                    >
                      Todos
                    </button>
                    {categoryOrder.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        aria-pressed={selectedCategory === cat}
                        className={cn(
                          "px-3 py-1.5 text-sm transition-all",
                          selectedCategory === cat
                            ? "bg-accent text-white"
                            : "bg-base-warm text-text-secondary hover:text-dark"
                        )}
                      >
                        {categoryLabels[cat]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-dark mb-2 block">
                  Origen
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por origen">
                  {origins.map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setSelectedOrigin(origin)}
                      aria-pressed={selectedOrigin === origin}
                      className={cn(
                        "px-3 py-1.5 text-sm transition-all",
                        selectedOrigin === origin
                          ? "bg-accent text-white"
                          : "bg-base-warm text-text-secondary hover:text-dark"
                      )}
                    >
                      {origin}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-dark mb-2 block">
                  Proceso
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por proceso">
                  {processes.map((process) => (
                    <button
                      key={process}
                      onClick={() => setSelectedProcess(process)}
                      aria-pressed={selectedProcess === process}
                      className={cn(
                        "px-3 py-1.5 text-sm transition-all",
                        selectedProcess === process
                          ? "bg-accent text-white"
                          : "bg-base-warm text-text-secondary hover:text-dark"
                      )}
                    >
                      {process}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div>
                <label className="text-sm font-medium text-dark mb-2 block">
                  Rango de precio
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary text-xs">$</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                        min={globalMinPrice}
                        max={maxPrice}
                        className="w-full bg-base-warm border border-border-light pl-7 pr-2 py-2 text-sm text-dark focus:outline-none input-focus"
                        aria-label="Precio mínimo"
                      />
                    </div>
                    <span className="text-text-tertiary text-sm">—</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary text-xs">$</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value) || globalMaxPrice)}
                        min={minPrice}
                        max={globalMaxPrice}
                        className="w-full bg-base-warm border border-border-light pl-7 pr-2 py-2 text-sm text-dark focus:outline-none input-focus"
                        aria-label="Precio máximo"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-text-tertiary">
                    {formatPrice(minPrice)} — {formatPrice(maxPrice)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset filters button */}
            <div className="mt-4 pt-4 border-t border-border-light flex justify-end">
              <button
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSelectedOrigin("Todos");
                  setSelectedProcess("Todos");
                  setMinPrice(globalMinPrice);
                  setMaxPrice(globalMaxPrice);
                  setSearch("");
                }}
                className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-text-tertiary text-sm mb-6">
          {filteredProducts.length} producto
          {filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} headingLevel="h2" />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-base-warm flex items-center justify-center mx-auto mb-5">
              <Search size={28} className="text-text-tertiary" />
            </div>
            <p className="font-heading text-xl font-semibold text-dark mb-2">
              No se encontraron productos
            </p>
            <p className="text-text-secondary text-sm max-w-sm mx-auto mb-6">
              Intenta con otros filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedOrigin("Todos");
                setSelectedProcess("Todos");
              }}
              className="text-accent hover:text-accent-dark text-sm font-medium transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
