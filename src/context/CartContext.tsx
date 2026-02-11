"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

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

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount (avoids hydration mismatch)
  useEffect(() => {
    setItems(loadCart());
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
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
      setItems((prev) =>
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
      setItems((prev) =>
        prev.map((item) =>
          getItemKey(item) === `${productId}-${size}-${grind}`
            ? { ...item, quantity: clamped }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

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
      {children}
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
