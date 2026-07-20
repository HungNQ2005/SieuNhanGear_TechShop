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
  loadCart: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof localStorage !== "undefined") {
      try {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items]);

  const loadCart = async (accountId) => {
    try {
      const cartRes = await getCartByAccount(accountId);
      const cartList = Array.isArray(cartRes)
        ? cartRes
        : (Array.isArray(cartRes?.items)
            ? cartRes.items
            : (Array.isArray(cartRes?.data) ? cartRes.data : []));

      const productRes = await getProducts();
      const products = Array.isArray(productRes?.data)
        ? productRes.data
        : (Array.isArray(productRes) ? productRes : []);

      if (cartList.length > 0) {
        const fetchedItems = cartList.map((cartItem) => {
          const product = cartItem.product || products.find((p) => String(p.id || p._id) === String(cartItem.productId)) || {};

          return {
            ...product,
            quantity: cartItem.quantity || 1,
            accountId: cartItem.accountId,
            cartId: cartItem.id || cartItem._id,
          };
        });

        setItems(fetchedItems);
      }
    } catch (err) {
      console.error("Load cart failed:", err);
    }
  };

  const addToCart = (product, qty = 1) => {
    if (!product) return;
    setItems((current) => {
      const productId = product.id || product._id;
      const existing = current.find((item) => String(item.id || item._id) === String(productId));

      if (existing) {
        return current.map((item) =>
          String(item.id || item._id) === String(productId)
            ? {
                ...item,
                quantity: item.quantity + (qty || 1),
              }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: qty || 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setItems((current) =>
      current.map((item) =>
        String(item.id || item._id) === String(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems((current) =>
      current
        .map((item) =>
          String(item.id || item._id) === String(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => String(item.id || item._id) !== String(id)));
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

      totalItems: items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),

      totalPrice: items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0,
      ),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
