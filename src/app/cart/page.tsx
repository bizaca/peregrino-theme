"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  User,
  Truck,
  Landmark,
  Copy,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { siteConfig, discountCodes } from "@/data/site-config";
import { regions, calculateShipping } from "@/data/shipping";
import { cn } from "@/lib/utils";

interface BuyerInfo {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rut: string;
  direccion: string;
  depto: string;
  region: string;
  comuna: string;
}

type FormErrors = Partial<Record<keyof BuyerInfo, string>>;

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rut: "",
    direccion: "",
    depto: "",
    region: "",
    comuna: "",
  });
  const [comentario, setComentario] = useState("");
  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
    description: string;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const shippingThreshold = siteConfig.commerce.freeShippingThreshold;

  const availableComunas = useMemo(() => {
    const region = regions.find((r) => r.value === buyerInfo.region);
    return region?.comunas ?? [];
  }, [buyerInfo.region]);

  const shippingResult = useMemo(() => {
    if (!buyerInfo.region) return null;
    return calculateShipping(buyerInfo.region, totalPrice, shippingThreshold);
  }, [buyerInfo.region, totalPrice, shippingThreshold]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    return Math.round(totalPrice * (appliedDiscount.percentage / 100));
  }, [totalPrice, appliedDiscount]);

  const grandTotal = useMemo(() => {
    const shipping = shippingResult?.cost ?? 0;
    return totalPrice - discountAmount + shipping;
  }, [totalPrice, discountAmount, shippingResult]);

  function handleRegionChange(value: string) {
    setBuyerInfo((prev) => ({ ...prev, region: value, comuna: "" }));
    if (attemptedSubmit) {
      setFormErrors((prev) => ({ ...prev, region: undefined, comuna: undefined }));
    }
  }

  function handleComunaChange(value: string) {
    setBuyerInfo((prev) => ({ ...prev, comuna: value }));
    if (attemptedSubmit) {
      setFormErrors((prev) => ({ ...prev, comuna: undefined }));
    }
  }

  function handleApplyDiscount() {
    const code = discountInput.trim().toUpperCase();
    if (!code) return;
    const match = discountCodes[code];
    if (match) {
      setAppliedDiscount({ code, ...match });
      setDiscountError("");
      setDiscountInput("");
    } else {
      setDiscountError("Código inválido");
      setAppliedDiscount(null);
    }
  }

  function handleRemoveDiscount() {
    setAppliedDiscount(null);
    setDiscountError("");
    setDiscountInput("");
  }

  function validateForm(): FormErrors {
    const errors: FormErrors = {};
    if (!buyerInfo.nombre.trim()) errors.nombre = "Ingresa tu nombre";
    if (!buyerInfo.apellido.trim()) errors.apellido = "Ingresa tu apellido";
    if (!buyerInfo.email.trim()) {
      errors.email = "Ingresa tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerInfo.email.trim())) {
      errors.email = "Email inválido";
    }
    if (!buyerInfo.telefono.trim()) errors.telefono = "Ingresa tu teléfono";
    if (!buyerInfo.rut.trim()) {
      errors.rut = "Ingresa tu RUT";
    } else if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(buyerInfo.rut.trim())) {
      errors.rut = "Formato inválido (ej: 12.345.678-9)";
    }
    if (!buyerInfo.direccion.trim()) errors.direccion = "Ingresa tu dirección";
    if (!buyerInfo.region) errors.region = "Selecciona una región";
    if (!buyerInfo.comuna) errors.comuna = "Selecciona una comuna";
    return errors;
  }

  function buildWhatsAppMessage(): string {
    const productLines = items
      .map(
        (item) =>
          `• ${item.name} (${item.size}, ${item.grind}) x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const regionObj = regions.find((r) => r.value === buyerInfo.region);
    const regionName = regionObj?.name ?? buyerInfo.region;

    let msg = `Hola, me gustaría hacer un pedido:\n\n`;
    msg += `*Datos del comprador:*\n`;
    msg += `Nombre: ${buyerInfo.nombre} ${buyerInfo.apellido}\n`;
    msg += `RUT: ${buyerInfo.rut}\n`;
    msg += `Email: ${buyerInfo.email}\n`;
    msg += `Teléfono: ${buyerInfo.telefono}\n`;
    msg += `Dirección: ${buyerInfo.direccion}${buyerInfo.depto ? `, ${buyerInfo.depto}` : ""}\n`;
    msg += `Región: ${regionName}\n`;
    msg += `Comuna: ${buyerInfo.comuna}\n\n`;
    msg += `*Productos:*\n${productLines}\n\n`;
    msg += `Subtotal: ${formatPrice(totalPrice)}\n`;
    if (appliedDiscount) {
      msg += `Descuento (${appliedDiscount.code}): -${formatPrice(discountAmount)}\n`;
    }
    if (shippingResult) {
      msg += `Envío: ${shippingResult.isFree ? "Gratis" : formatPrice(shippingResult.cost)}\n`;
    }
    msg += `*Total: ${formatPrice(grandTotal)}*\n`;
    if (comentario.trim()) {
      msg += `\n*Comentarios:*\n${comentario.trim()}\n`;
    }
    msg += `\n¡Gracias!`;
    return msg;
  }

  function handleCheckout() {
    setAttemptedSubmit(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const message = encodeURIComponent(buildWhatsAppMessage());
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`,
      "_blank"
    );
  }

  function updateField(field: keyof BuyerInfo, value: string) {
    setBuyerInfo((prev) => ({ ...prev, [field]: value }));
    if (attemptedSubmit && formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

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
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  const freeShippingProgress = Math.min(
    (totalPrice / shippingThreshold) * 100,
    100
  );
  const freeShipping = totalPrice >= shippingThreshold;

  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-dark">
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
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Seguir comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Left column: products + buyer form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart items */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.grind}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 md:gap-6 p-4 md:p-5 bg-surface border border-border-light"
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden bg-base-warm shrink-0">
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
                        <span
                          className="w-8 text-center font-medium text-dark text-sm"
                          aria-live="polite"
                          aria-atomic="true"
                        >
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

                      <span className="font-heading font-bold text-lg text-accent-dark">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-sm text-text-tertiary hover:text-accent-red transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Buyer info form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface border border-border-light p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <User size={20} className="text-accent" />
                <h2 className="font-heading text-xl font-semibold text-dark">
                  Datos del Comprador
                </h2>
              </div>

              <div className="space-y-4">
                {/* Nombre + Apellido */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={buyerInfo.nombre}
                      onChange={(e) => updateField("nombre", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        formErrors.nombre
                          ? "border-red-400"
                          : "border-border"
                      )}
                      placeholder="Juan"
                    />
                    {formErrors.nombre && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.nombre}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="apellido"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Apellido *
                    </label>
                    <input
                      id="apellido"
                      type="text"
                      value={buyerInfo.apellido}
                      onChange={(e) => updateField("apellido", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        formErrors.apellido
                          ? "border-red-400"
                          : "border-border"
                      )}
                      placeholder="Pérez"
                    />
                    {formErrors.apellido && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.apellido}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email + Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={buyerInfo.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        formErrors.email
                          ? "border-red-400"
                          : "border-border"
                      )}
                      placeholder="juan@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Teléfono *
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      value={buyerInfo.telefono}
                      onChange={(e) => updateField("telefono", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        formErrors.telefono
                          ? "border-red-400"
                          : "border-border"
                      )}
                      placeholder="+56 9 1234 5678"
                    />
                    {formErrors.telefono && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                {/* RUT */}
                <div>
                  <label
                    htmlFor="rut"
                    className="block text-sm font-medium text-dark mb-1.5"
                  >
                    RUT *
                  </label>
                  <input
                    id="rut"
                    type="text"
                    value={buyerInfo.rut}
                    onChange={(e) => updateField("rut", e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                      formErrors.rut
                        ? "border-red-400"
                        : "border-border"
                    )}
                    placeholder="12.345.678-9"
                  />
                  {formErrors.rut && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {formErrors.rut}
                    </p>
                  )}
                </div>

                {/* Dirección + Depto */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="direccion"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Dirección *
                    </label>
                    <input
                      id="direccion"
                      type="text"
                      value={buyerInfo.direccion}
                      onChange={(e) => updateField("direccion", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        formErrors.direccion
                          ? "border-red-400"
                          : "border-border"
                      )}
                      placeholder="Av. Providencia 1234"
                    />
                    {formErrors.direccion && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.direccion}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="depto"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Depto / Oficina
                    </label>
                    <input
                      id="depto"
                      type="text"
                      value={buyerInfo.depto}
                      onChange={(e) => updateField("depto", e.target.value)}
                      className="w-full px-4 py-2.5 bg-base border border-border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                      placeholder="Depto 56"
                    />
                  </div>
                </div>

                {/* Region + Comuna */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Región *
                    </label>
                    <select
                      id="region"
                      value={buyerInfo.region}
                      onChange={(e) => handleRegionChange(e.target.value)}
                      className={cn(
                        "w-full px-4 py-2.5 pr-10 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B6560%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat",
                        formErrors.region
                          ? "border-red-400"
                          : "border-border",
                        !buyerInfo.region && "text-text-tertiary"
                      )}
                    >
                      <option value="">Selecciona una región</option>
                      {regions.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.region && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.region}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="comuna"
                      className="block text-sm font-medium text-dark mb-1.5"
                    >
                      Comuna *
                    </label>
                    <select
                      id="comuna"
                      value={buyerInfo.comuna}
                      onChange={(e) => handleComunaChange(e.target.value)}
                      disabled={!buyerInfo.region}
                      className={cn(
                        "w-full px-4 py-2.5 pr-10 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B6560%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat",
                        formErrors.comuna
                          ? "border-red-400"
                          : "border-border",
                        !buyerInfo.region && "opacity-50 cursor-not-allowed",
                        !buyerInfo.comuna && "text-text-tertiary"
                      )}
                    >
                      <option value="">
                        {buyerInfo.region
                          ? "Selecciona una comuna"
                          : "Primero selecciona una región"}
                      </option>
                      {availableComunas.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {formErrors.comuna && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {formErrors.comuna}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping estimate banner */}
                <AnimatePresence>
                  {shippingResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg",
                          shippingResult.isFree
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-sky-50 border border-[#1B4F72]/30"
                        )}
                      >
                        <Truck
                          size={18}
                          className={
                            shippingResult.isFree
                              ? "text-emerald-600"
                              : "text-[#1B4F72]"
                          }
                        />
                        <div className="text-sm">
                          <span
                            className={cn(
                              "font-medium",
                              shippingResult.isFree
                                ? "text-emerald-700"
                                : "text-[#1B4F72]"
                            )}
                          >
                            {shippingResult.isFree
                              ? "Envío gratis"
                              : `Envío: ${formatPrice(shippingResult.cost)}`}
                          </span>
                          <span className="text-text-tertiary ml-2">
                            · {shippingResult.deliveryTime}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Comentarios */}
                <div>
                  <label
                    htmlFor="comentario"
                    className="block text-sm font-medium text-dark mb-1.5"
                  >
                    Comentarios o instrucciones especiales
                  </label>
                  <textarea
                    id="comentario"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-base border border-border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                    placeholder="Ej: Dejar en conserjería, horario de entrega preferido, etc."
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column: order summary */}
          <div>
            <div className="bg-surface border border-border-light p-6 sticky top-20 lg:top-28">
              <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                Resumen del Pedido
              </h2>

              {/* Shipping progress */}
              <div className="mb-6 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sage text-sm font-medium">
                    {freeShipping
                      ? "¡Envío gratis! (RM)"
                      : `Faltan ${formatPrice(shippingThreshold - totalPrice)} para envío gratis`}
                  </span>
                  <span className="text-sage text-xs font-semibold">
                    {Math.round(freeShippingProgress)}%
                  </span>
                </div>
                <div
                  className="w-full h-1.5 bg-sage/10 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Math.round(freeShippingProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={
                    freeShipping
                      ? "Envío gratis alcanzado"
                      : `${Math.round(freeShippingProgress)}% hacia envío gratis`
                  }
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      freeShipping ? "bg-emerald-500" : "bg-accent"
                    }`}
                  />
                </div>
              </div>

              {/* Discount code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Código de descuento
                </label>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-emerald-600" />
                      <span className="text-emerald-700 font-medium">
                        {appliedDiscount.code}
                      </span>
                      <span className="text-emerald-600">
                        — {appliedDiscount.description}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveDiscount}
                      className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountInput}
                      onChange={(e) => {
                        setDiscountInput(e.target.value);
                        if (discountError) setDiscountError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyDiscount();
                      }}
                      className={cn(
                        "flex-1 px-4 py-2.5 bg-base border rounded-lg text-dark text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        discountError ? "border-red-400" : "border-border"
                      )}
                      placeholder="Ej: PEREGRINO10"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
                {discountError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {discountError}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-dark font-medium">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600">
                      Descuento ({appliedDiscount.percentage}%)
                    </span>
                    <span className="text-emerald-600 font-medium">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Envío</span>
                  <span className="text-dark font-medium">
                    {!buyerInfo.region
                      ? "Por calcular"
                      : shippingResult?.isFree
                        ? "Gratis"
                        : formatPrice(shippingResult?.cost ?? 0)}
                  </span>
                </div>

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-dark font-medium">Total</span>
                  <span className="text-2xl font-bold text-dark font-heading">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Payment methods */}
              <p className="text-text-tertiary text-xs text-center uppercase tracking-widest mb-3">
                Métodos de pago
              </p>

              {/* Apple Pay */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg mb-2 btn-press"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Apple Pay
              </button>

              {/* Google Pay */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3.5 rounded-full border border-gray-300 transition-all duration-300 hover:shadow-lg mb-2 btn-press"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google Pay
              </button>

              {/* Credit / Debit Card */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg mb-4 btn-press"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Tarjeta de Crédito / Débito
              </button>

              {/* Bank Transfer */}
              <button
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg mb-2 btn-press"
              >
                <Landmark size={18} />
                Transferencia Bancaria
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    showBankDetails && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {showBankDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-2"
                  >
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-1 space-y-3">
                      <p className="text-sm text-emerald-800 font-medium">
                        Datos para transferencia:
                      </p>
                      <div className="space-y-1.5 text-sm text-emerald-900">
                        <div className="flex items-center justify-between">
                          <span>
                            <span className="text-emerald-600 font-medium">Banco:</span>{" "}
                            Itaú
                          </span>
                        </div>
                        <div>
                          <span className="text-emerald-600 font-medium">Cuenta Corriente:</span>{" "}
                          Nº 0210805676
                        </div>
                        <div>
                          <span className="text-emerald-600 font-medium">Razón Social:</span>{" "}
                          Inversiones BDL SpA
                        </div>
                        <div>
                          <span className="text-emerald-600 font-medium">RUT:</span>{" "}
                          76.477.431-0
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>
                            <span className="text-emerald-600 font-medium">Email:</span>{" "}
                            info@peregrinocoffee.cl
                          </span>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                "info@peregrinocoffee.cl"
                              )
                            }
                            className="p-1 text-emerald-500 hover:text-emerald-700 transition-colors"
                            aria-label="Copiar email"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-700 border-t border-emerald-200 pt-2.5">
                        Recuerda especificar el número de tu pedido al momento
                        de realizar la transferencia y enviar el comprobante al
                        email indicado.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-text-tertiary text-xs">o</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* WhatsApp checkout button */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg mb-3 btn-press"
              >
                <svg viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
                  <path d="M16.04 2A13.04 13.04 0 003 15.04a12.94 12.94 0 001.96 6.86L3 29l7.3-1.92a13.03 13.03 0 005.74 1.34A13.04 13.04 0 0016.04 2z" fill="currentColor" opacity="0.15"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.04 3.4a11.64 11.64 0 00-9.87 17.82l.26.42-1.1 4.01 4.12-1.08.4.24a11.6 11.6 0 005.92 1.62h.01c6.43 0 11.65-5.22 11.66-11.64a11.58 11.58 0 00-3.41-8.24A11.58 11.58 0 0016.04 3.4zm-5.63 17.3c-.25-.42-2.04-3.08-2.04-5.87 0-2.79 1.28-4.17 1.74-4.74.45-.56 1-.7 1.33-.7.33 0 .66.01.95.02.3.01.71-.12 1.11.85.41.99 1.39 3.4 1.51 3.65.12.24.2.53.04.85-.16.33-.24.53-.48.81-.24.29-.5.64-.72.86-.24.24-.48.5-.21.98.28.48 1.24 2.04 2.66 3.31 1.82 1.63 3.36 2.14 3.84 2.38.48.24.76.2 1.04-.12.28-.33 1.2-1.4 1.52-1.89.33-.48.65-.4 1.1-.24.44.16 2.82 1.33 3.3 1.57.48.24.8.36.92.56.12.2.12 1.16-.28 2.28-.4 1.12-2.36 2.14-3.3 2.28-.84.12-1.9.17-3.07-.19a28.4 28.4 0 01-2.78-1.03c-4.88-2.12-8.07-7.01-8.32-7.33z" fill="currentColor"/>
                </svg>
                Finalizar Pedido por WhatsApp
              </button>
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
