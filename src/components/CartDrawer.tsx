"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Save and restore focus, auto-focus close button on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the close button after animation settles
      const timer = setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector<HTMLButtonElement>("[aria-label='Cerrar carrito']");
        closeBtn?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (previousFocusRef.current) {
      if (document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Focus trap + Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, closeCart]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-accent" />
                <h2 id="cart-drawer-title" className="font-heading text-lg font-semibold text-dark">
                  Carrito ({totalItems})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-3 text-text-tertiary hover:text-dark rounded-full hover:bg-base-warm transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-border mb-4" />
                  <p className="text-text-secondary font-medium mb-2">
                    Tu carrito está vacío
                  </p>
                  <p className="text-text-tertiary text-sm mb-6">
                    Explora nuestra selección de cafés de especialidad
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-accent hover:text-accent-dark font-medium text-sm transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.grind}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex gap-4 p-3 bg-base-warm rounded-xl"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-base-dark shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YzRjBFQiIvPjwvc3ZnPg=="
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-dark text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-text-tertiary text-xs mt-0.5">
                          {item.size} · {item.grind}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-surface rounded-full border border-border-light">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.grind,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className={`p-2 transition-colors ${item.quantity <= 1 ? "text-text-tertiary/40 cursor-not-allowed" : "text-text-tertiary hover:text-dark"}`}
                              aria-label={`Reducir cantidad de ${item.name}`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium text-dark w-6 text-center" aria-live="polite" aria-atomic="true">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.grind,
                                  item.quantity + 1
                                )
                              }
                              disabled={item.quantity >= 20}
                              className={`p-2 transition-colors ${item.quantity >= 20 ? "text-text-tertiary/40 cursor-not-allowed" : "text-text-tertiary hover:text-dark"}`}
                              aria-label={`Aumentar cantidad de ${item.name}`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-accent-dark">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() =>
                                removeItem(item.productId, item.size, item.grind)
                              }
                              className="p-2 text-text-tertiary hover:text-accent-red transition-colors"
                              aria-label={`Eliminar ${item.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border-light px-6 py-4 space-y-4">
                {/* Free shipping progress */}
                {(() => {
                  const threshold = siteConfig.commerce.freeShippingThreshold;
                  const percentage = Math.min((totalPrice / threshold) * 100, 100);
                  const isFree = totalPrice >= threshold;
                  return (
                    <div className="bg-sage-bg rounded-lg px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sage text-sm font-medium">
                          {isFree
                            ? siteConfig.commerce.freeShippingLabel
                            : `Faltan ${formatPrice(threshold - totalPrice)} para envío gratis`}
                        </p>
                        <span className="text-sage text-xs font-semibold">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-sage/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            isFree ? "bg-emerald-500" : "bg-accent"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-dark font-heading">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full bg-accent hover:bg-accent-dark text-white font-medium py-3.5 rounded-full text-center transition-colors btn-press"
                  >
                    Ir al Carrito
                  </Link>
                  <button
                    onClick={closeCart}
                    className="block w-full text-text-secondary hover:text-dark font-medium py-2 text-sm transition-colors"
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
