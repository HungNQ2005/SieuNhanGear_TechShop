import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

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
useEffect(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setItems(JSON.parse(savedCart));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(items)
  );
}, [items]);
  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
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
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

 const decreaseQuantity = (id) => {
  setItems((current) =>
    current.flatMap((item) => {
      if (item.id !== id) return item;

      if (item.quantity === 1) {
        return []; // xóa sản phẩm
      }

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    })
  );
};

  const removeItem = (id) => {
    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({
      items,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,

      totalItems: items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),

      totalPrice: items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      ),
    }),
    [items]
  );
console.log("CartContext items:", items);
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}