"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

export interface CartItem {
  productId: string;
  name: string;
  size: string;
  grind: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size: string, grind: string) => void;
  updateQuantity: (productId: string, size: string, grind: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getItemKey(item: { productId: string; size: string; grind: string }) {
  return `${item.productId}-${item.size}-${item.grind}`;
}

const CART_STORAGE_KEY = "peregrino-cart";
const MAX_ITEM_QUANTITY = 20;

// ─── External cart store ───────────────────────────────────────────
// Keeps cart data in a module-level variable backed by localStorage.
// Using useSyncExternalStore avoids both set-state-in-effect and
// refs-during-render lint violations in React 19.

let _cartItems: CartItem[] = [];
const _listeners = new Set<() => void>();
let _initialized = false;
const EMPTY_CART: CartItem[] = [];

function _initStore() {
  if (_initialized) return;
  _initialized = true;
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) _cartItems = JSON.parse(raw);
  } catch { /* corrupted storage — start fresh */ }
}

function _emitChange() {
  for (const listener of _listeners) listener();
}

function _updateCart(updater: (prev: CartItem[]) => CartItem[]) {
  _cartItems = updater(_cartItems);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(_cartItems));
  _emitChange();
}

function subscribeCart(cb: () => void) {
  _listeners.add(cb);

  // Sync cart across browser tabs via the storage event
  const onStorage = (e: StorageEvent) => {
    if (e.key !== CART_STORAGE_KEY) return;
    try {
      _cartItems = e.newValue ? JSON.parse(e.newValue) : [];
    } catch {
      _cartItems = [];
    }
    cb();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    _listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getCartSnapshot(): CartItem[] {
  _initStore();
  return _cartItems;
}

function getCartServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

// ─── Provider ──────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    _updateCart((prev) => {
      const key = getItemKey(newItem);
      const existing = prev.find((item) => getItemKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          getItemKey(item) === key
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_ITEM_QUANTITY) }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: Math.min(quantity, MAX_ITEM_QUANTITY) }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (productId: string, size: string, grind: string) => {
      _updateCart((prev) =>
        prev.filter((item) => getItemKey(item) !== `${productId}-${size}-${grind}`)
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, grind: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, grind);
        return;
      }
      const clamped = Math.min(quantity, MAX_ITEM_QUANTITY);
      _updateCart((prev) =>
        prev.map((item) =>
          getItemKey(item) === `${productId}-${size}-${grind}`
            ? { ...item, quantity: clamped }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => _updateCart(() => []), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
