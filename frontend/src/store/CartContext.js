import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getProducts } from "../services/api";
import { createCart, getCartByAccount } from "../services/CartService";

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
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items]);

  const normalizeCartPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.items)) return payload.items;
    if (payload && payload.data) return normalizeCartPayload(payload.data);
    return [];
  };

  const syncCartToServer = useCallback(async (nextItems, targetAccountId = accountId) => {
    if (!targetAccountId) return;

    try {
      const payloadItems = (nextItems || []).map((item) => ({
        productId: item.productId ?? item.id ?? item._id,
        quantity: Number(item.quantity ?? 1),
        price: Number(item.price ?? 0),
      }));

      await createCart(targetAccountId, payloadItems);
    } catch (err) {
      console.error("Sync cart failed:", err);
    }
  }, [accountId]);

  const loadCart = useCallback(async (resolvedAccountId) => {
    const activeAccountId = resolvedAccountId || accountId;
    if (!activeAccountId) {
      return;
    }

    try {
      const cartPayload = await getCartByAccount(activeAccountId);
      const cartItems = normalizeCartPayload(cartPayload);

      const productRes = await getProducts();
      const products = Array.isArray(productRes?.data)
        ? productRes.data
        : (Array.isArray(productRes) ? productRes : []);

      if (Array.isArray(cartItems)) {
        const normalizedItems = cartItems
          .map((cartItem) => {
            const productId = cartItem.productId ?? cartItem.product?.id ?? cartItem.product?._id;
            const product = cartItem.product || products.find((p) => String(p.id || p._id) === String(productId)) || {};

            return {
              ...product,
              id: product.id || product._id || productId,
              quantity: Number(cartItem.quantity ?? cartItem.qty ?? 1),
              accountId: activeAccountId ?? cartPayload?.userId ?? null,
              cartId: cartItem.id ?? cartItem._id ?? null,
              productId: Number(productId || product.id),
            };
          })
          .filter((item) => item.id);

        setItems(normalizedItems);
      }
    } catch (err) {
      console.error("Load cart failed:", err);
    }
  }, [accountId]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const resolvedAccountId = user._id || user.id;
        if (resolvedAccountId) {
          setAccountId(resolvedAccountId);
          loadCart(resolvedAccountId);
        }
      }
    } catch (_) {}
  }, [loadCart]);

  const addToCart = (product, qty = 1) => {
    if (!product) return;
    setItems((current) => {
      const productId = product.id || product._id;
      const existing = current.find((item) => String(item.id || item._id) === String(productId));

      const next = existing
        ? current.map((item) =>
            String(item.id || item._id) === String(productId)
              ? {
                  ...item,
                  quantity: item.quantity + (qty || 1),
                }
              : item,
          )
        : [
            ...current,
            {
              ...product,
              quantity: qty || 1,
            },
          ];

      syncCartToServer(next, accountId);
      return next;
    });
  };

  const increaseQuantity = (id) => {
    setItems((current) => {
      const next = current.map((item) =>
        String(item.id || item._id) === String(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      syncCartToServer(next, accountId);
      return next;
    });
  };

  const decreaseQuantity = (id) => {
    setItems((current) => {
      const next = current
        .map((item) =>
          String(item.id || item._id) === String(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
      syncCartToServer(next, accountId);
      return next;
    });
  };

  const removeItem = (id) => {
    setItems((current) => {
      const next = current.filter((item) => String(item.id || item._id) !== String(id));
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

      totalItems: items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),

      totalPrice: items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0,
      ),
    }),
    [items, loadCart, syncCartToServer],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
