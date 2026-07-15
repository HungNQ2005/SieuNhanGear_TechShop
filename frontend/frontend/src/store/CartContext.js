import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getProducts } from "../services/api";
import { getCartByAccount } from "../services/CartService";
const CartContext = createContext({
  items: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const loadCart = async (accountId) => {
    try {
      const cart = await getCartByAccount(accountId);

      const productRes = await getProducts();
      const products = productRes.data;

      const items = cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);

        return {
          ...product,
          quantity: cartItem.quantity,
          accountId: cartItem.accountId,
          cartId: cartItem.id,
        };
      });

      setItems(items);
    } catch (err) {
      console.error("Load cart failed:", err);
    }
  };

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setItems((current) => {
      const next = current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      return next;
    });
  };

  const decreaseQuantity = (id) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({
      items,
      loadCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,

      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    }),
    [items],
  );
  console.log("CartContext items:", items);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
