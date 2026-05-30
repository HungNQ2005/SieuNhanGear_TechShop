import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext({
  items: [],
  addToCart: () => {},
  clearCart: () => {},
  totalItems: 0,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      clearCart,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
