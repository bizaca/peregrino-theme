"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <ShoppingBag size={64} className="text-border mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-dark mb-3">
            Tu carrito está vacío
          </h1>
          <p className="text-text-secondary mb-8 max-w-sm mx-auto">
            Explora nuestra selección de cafés de especialidad y encuentra tu
            favorito
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 btn-press"
          >
            Explorar Productos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  const shippingThreshold = siteConfig.commerce.freeShippingThreshold;
  const freeShipping = totalPrice >= shippingThreshold;

  const whatsappMessage = encodeURIComponent(
    `Hola, me gustaría hacer un pedido:\n\n${items
      .map(
        (item) =>
          `• ${item.name} (${item.size}, ${item.grind}) x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n")}\n\nTotal: ${formatPrice(totalPrice)}\n\n¡Gracias!`
  );

  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark">
              Tu Carrito
            </h1>
            <p className="text-text-secondary mt-1">
              {items.length} producto{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent font-medium transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Seguir comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.productId}-${item.size}-${item.grind}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 md:gap-6 p-4 md:p-5 bg-surface border border-border-light rounded-2xl"
              >
                {/* Image */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-base-warm shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGMEVCIi8+PC9zdmc+"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading font-semibold text-dark text-lg">
                        {item.name}
                      </h2>
                      <p className="text-text-tertiary text-sm mt-0.5">
                        {item.size} · {item.grind}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.productId, item.size, item.grind)
                      }
                      className="p-2.5 text-text-tertiary hover:text-accent-red rounded-full hover:bg-accent-red/5 transition-colors shrink-0"
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-1 bg-base-warm rounded-full border border-border px-1">
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
                        className={`p-2.5 transition-colors ${item.quantity <= 1 ? "text-text-tertiary/40 cursor-not-allowed" : "text-text-secondary hover:text-dark"}`}
                        aria-label={`Reducir cantidad de ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-dark text-sm" aria-live="polite" aria-atomic="true">
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
                        className={`p-2.5 transition-colors ${item.quantity >= 20 ? "text-text-tertiary/40 cursor-not-allowed" : "text-text-secondary hover:text-dark"}`}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-heading font-bold text-lg text-accent-dark">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Clear cart */}
            <div className="text-right">
              <button
                onClick={clearCart}
                className="text-sm text-text-tertiary hover:text-accent-red transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-surface border border-border-light rounded-2xl p-6 sticky top-28">
              <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                Resumen del Pedido
              </h2>

              {/* Shipping progress */}
              {(() => {
                const percentage = Math.min((totalPrice / shippingThreshold) * 100, 100);
                return (
                  <div className="mb-6 bg-sage-bg rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sage text-sm font-medium">
                        {freeShipping
                          ? "¡Envío gratis! (RM)"
                          : `Faltan ${formatPrice(shippingThreshold - totalPrice)} para envío gratis`}
                      </span>
                      <span className="text-sage text-xs font-semibold">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <div
                      className="w-full h-1.5 bg-sage/10 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(percentage)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={freeShipping ? "Envío gratis alcanzado" : `${Math.round(percentage)}% hacia envío gratis`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          freeShipping ? "bg-emerald-500" : "bg-accent"
                        }`}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-dark font-medium">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Envío</span>
                  <span className="text-dark font-medium">
                    {freeShipping ? "Gratis" : "Por calcular"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-2xl font-bold text-dark font-heading">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg mb-3 btn-press"
              >
                Finalizar Pedido por WhatsApp
              </a>
              <p className="text-text-tertiary text-xs text-center">
                Impuestos incluidos · Coordinaremos envío y pago por WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
