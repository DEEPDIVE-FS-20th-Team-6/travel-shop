"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: number | string;
  title: string;
  price: number;
  image?: string;
  category?: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQty: () => number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: CartItem["id"]) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.qty, 0);

  const getTotalQty = () =>
    cart.reduce((total, item) => total + item.qty, 0);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart, getTotalPrice, getTotalQty }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}