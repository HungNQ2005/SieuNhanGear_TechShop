import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getProducts } from "../services/api";
import { createCart, getCartByAccount, updateCart } from "../services/CartService";
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
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const resolvedAccountId = user._id || user.id;
        if (resolvedAccountId) {
          setAccountId(resolvedAccountId);
        }
      }
    } catch (_) {}
  }, []);

  const normalizeCartPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.items)) return payload.items;
    if (payload && payload.data) return normalizeCartPayload(payload.data);
    return [];
  };

  const syncCartToServer = async (nextItems, resolvedAccountId = accountId) => {
    if (!resolvedAccountId) return;

    try {
      const payloadItems = (nextItems || []).map((item) => ({
        productId: item.productId ?? item.id,
        quantity: Number(item.quantity ?? 1),
        price: Number(item.price ?? 0),
      }));

      await createCart(resolvedAccountId, payloadItems);
    } catch (err) {
      console.error("Sync cart failed:", err);
    }
  };

  const loadCart = async (resolvedAccountId) => {
    const activeAccountId = resolvedAccountId || accountId;
    if (!activeAccountId) {
      setItems([]);
      return;
    }

    try {
      const cartPayload = await getCartByAccount(activeAccountId);
      const cartItems = normalizeCartPayload(cartPayload);

      const productRes = await getProducts();
      const products = Array.isArray(productRes?.data) ? productRes.data : [];

      const normalizedItems = cartItems
        .map((cartItem) => {
          const productId = cartItem.productId ?? cartItem.product?.id;
          const product = products.find((p) => p.id === productId);

          if (!product) return null;

          return {
            ...product,
            quantity: Number(cartItem.quantity ?? cartItem.qty ?? 1),
            accountId: activeAccountId ?? cartPayload?.userId ?? null,
            cartId: cartItem.id ?? cartItem._id ?? null,
            productId,
          };
        })
        .filter(Boolean);

      setItems((current) => {
        if (!normalizedItems.length) {
          return current.length ? current : [];
        }
        return normalizedItems;
      });
    } catch (err) {
      console.error("Load cart failed:", err);
      setItems((current) => current);
    }
  };

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      const next = existing
        ? current.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          )
        : [
            ...current,
            {
              ...product,
              quantity: 1,
            },
          ];

      syncCartToServer(next, accountId);
      return next;
    });
  };

  const increaseQuantity = (id) => {
    setItems((current) => {
      const next = current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      syncCartToServer(next, accountId);
      return next;
    });
  };

  const decreaseQuantity = (id) => {
    setItems((current) => {
      const next = current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
      syncCartToServer(next, accountId);
      return next;
    });
  };

  const removeItem = (id) => {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      syncCartToServer(next, accountId);
      return next;
    });
  };

  const clearCart = () => {
    setItems([]);
    syncCartToServer([], accountId);
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
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
